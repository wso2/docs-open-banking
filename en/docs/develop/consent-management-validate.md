WSO2 Open Banking Accelerator consists of endpoints to manage consents. You can customize relevant components 
according to your requirements using the extension points available. This section explains the Consent Validate 
component and how to customize the `/validate` endpoint.

The Consent Validate implements the validations that are required when the resource endpoints are invoked with a user 
access token. The `ConsentValidateData` object provides data such as the request path, detailed consent to perform 
necessary validations. 

An object named `ConsentValidationResult` is also passed to this extension. It carries the validation details and 
contains a property that specifies whether the request is valid or not. By default, the value is set to false. 
If the validation fails, the error message is sent as the response. Here, you can also configure the error code,
response code as well as a custom error payload. If you have set `modifiedPayload`, it is prioritized over a 
generic error response.

Given below is a summary of details related to this extension.

### Endpoint
``` xml
https://<IS_HOST>:9446/api/openbanking/consent/validate
```

### Interface
``` java
com.wso2.openbanking.accelerator.consent.extensions.validate.model.ConsentValidator
```
### Method 
The following method is available in the interface.
``` java
public void validate(ConsentValidateData consentValidateData, ConsentValidationResult consentValidationResult) throws ConsentException;
```

### Error Handling
In any of the consent extensions, if an error scenario occurs and you need to send an error response make sure to throw 
a `ConsentException`.

### Data
The following table explains the data available in `ConsentValidateData`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| headers   | JSONObject            | The request headers sent in the request. |
| body   | JSONObject            | The payload sent in the request. |
| electedResource   | String            | The path invoked in the request. For example: `/accounts/{AccountId}`|
| consentId | String                | The consent ID related to the current resource request. This consent ID is bound to the user access token used. |
| userId | String                | The user ID related to the current resource request. This user ID is retrieved from the user access token. |
| clientId | String                | The ID of the TPP application related to the current resource request. This client ID is retrieved from the user access token.|
| comprehensiveConsent  | DetailedConsentResource   | The comprehensive consent object related to the consent that is being validated. This object contains all the details related to the consent. |
| resourceParams | Map<String, String>                | A map containing the full resource path with query parameters (ex: `aisp/accounts/{AccountId}?queryParam=urlEncodedQueryParamValue`), HTTP method, and context (ex: `/open-banking/v3.1/aisp`) of the request. |

The following table explains the data available in `ConsentValidationResult`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| isValid | boolean | An attribute to identify whether the consent is in a valid state or not. |
| modifiedPayload | JSONObject | Optionally used to set a modified error payload to be sent with the consent validation response. If a modified payload is set, it is given priority over creating a generic error response using the message and code information. |
| consentInformation | JSONObject | Used to set the consent data to the consent validation result. This data will be sent to the bank backend. |

### Configuration 

To configure the customized Consent Validate component, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    
2. Add the following tag and configure it with the customized component.
``` xml
[open_banking.consent.validation]
validator="com.wso2.openbanking.accelerator.consent.extensions.validate.impl.DefaultConsentValidator"
```

3. Configure the certificate alias available in the truststore of the Identity Server. This should be the certificate that 
is used to sign the consent validate JWT, which is sent from the gateway.
``` xml
[open_banking.consent.validation.signature]
alias="wso2carbon"
```

    !!! note
        Given below is a sample decoded JWT:
        
        ``` json   
        {
           "headers":{
              "Authorization":"Bearer eyJ4NXQiOiJOVGRtWmpNNFpEazNOalkwWXpjNU1tWm1PRGd3TVRFM01XWXdOREU1TVdSbFpEZzROemM0WkEiLCJraWQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZ19SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJhZG1pbkB3c28yLmNvbUBjYXJib24uc3VwZXIiLCJhdXQiOiJBUFBMSUNBVElPTl9VU0VSIiwiYXVkIjoiWURjRzRmNDlHMTNrV2ZWc25xZGh6OGdiYTJ3YSIsIm5iZiI6MTYyOTA5ODc5MSwiYXpwIjoiWURjRzRmNDlHMTNrV2ZWc25xZGh6OGdiYTJ3YSIsInNjb3BlIjoiYWNjb3VudHMgY29uc2VudF9pZDVmNGUwZGVkLTQ3NjgtNGJkMy1hZGI5LTdhOTU4NzQxNWIwNSBvcGVuaWQiLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDZcL29hdXRoMlwvdG9rZW4iLCJjbmYiOnsieDV0I1MyNTYiOiJ2WW9VWVJTUTdDZ29ZeE5NV1dPekM4dU5mUXJpczRwWFFYMFptaXRSeHpzIn0sImV4cCI6MTYyOTEwMjM5MSwiaWF0IjoxNjI5MDk4NzkxLCJqdGkiOiI2NmU1Y2MyNS1hMjQ1LTRmNWQtOWZiZS1iNzQ5ZTdkZmVlZDAiLCJjb25zZW50X2lkIjoiNWY0ZTBkZWQtNDc2OC00YmQzLWFkYjktN2E5NTg3NDE1YjA1In0.ZIhP4DMxwrlH1JO4T-8E6K_4L4jd4pnpaw3yCydZhFDK8-c946VHqgFKMTx0VQp7X4L5eOEEuT8qwzEC9FQLSVRcRNQGPwo5FJwlnMd6flTRJZ7f3xBt0u1RobVdHodfv21guM-WkkX3WNlVPK3EDelsmL6_MWmsdzjNMCuDcQCjmKv6wlmCvEHR9WKaSTZ2qz5R4zPEJbM-5fOq3F27x_qWEEURgAGVIh3f2v_fOwjdknQ-9bDxhQPcNaNHmUq4XICCOuxYcTi3tYzsw9DQT8qCv2j2K4X71p5h5WFkqn_iG1gLV9izEp-Xvpsxg4vAfZ5Lqu4ADrQMuPQlrIUCbQ",
              "Accept":"application\/json",
              "Content-Type":"application\/json; charset=UTF-8"
           },
           "body":{
                "Data": {
                    "Permissions": [
                        "ReadAccountsBasic",
                        "ReadAccountsDetail",
                        "ReadBalances"
                    ],
                    "ExpirationDateTime": "2021-08-21T12:55:29.279+05:30",
                    "TransactionFromDateTime": "2021-08-16T12:55:29.331+05:30",
                    "TransactionToDateTime": "2021-08-19T12:55:29.331+05:30"
                },
                "Risk": {

                }
            },
           "consentId":"5f4e0ded-4768-4bd3-adb9-7a9587415b05",
           "resourceParams":{
              "resource":"\/aisp\/accounts?fromDateTime=2021-05-12T12%3A24%3A50.799%2B05%3A30&toDateTime=2021-05-12T12%3A24%3A50.799%2B05%3A30",
              "context":"\/open-banking\/v3.1\/aisp",
              "httpMethod":"POST"
           },
           "clientId":"1n38TwWOPfOjPkqplqvdbXBtYfsa",
           "userId":"admin@wso2.com@carbon.super@carbon.super",
           "electedResource":"\/accounts"
        }
        ```
        
        All header values including the bearer token is included in `header`. 
