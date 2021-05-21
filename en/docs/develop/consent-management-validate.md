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
The following table explains the data available in `ConsentValidator`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| headers   | JSONObject            | The request headers sent in the request. |
| payload   | JSONObject            | The payload sent in the request. |
| requestPath   | String            | The path invoked in the request. |
| consentId | String                | The consent ID related to the current resource request. This consent ID is bound to the user access token used. |
| comprehensiveConsent  | DetailedConsentResource   | The comprehensive consent object related to the consent that is being validated. This object contains all the details related to the consent. |

### Configuration 

To configure the customized Consent Validate component, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    
2. Add the following tag and configure it with the customized component.
``` xml
[open_banking.consent.validation]
validator="com.wso2.openbanking.accelerator.consent.extensions.validate.impl.DefaultConsentValidator"
```

3. Configure the certificate alias available in the truststore of Identity Server. This certificate signs the consent 
validate JWT, which is sent from the gateway.
``` xml
[open_banking.consent.validation.signature]
alias="wso2carbon"
```

    !!! note
        Given below is a sample decoded JWT:
        
        ``` json
        {
           "headers":{
              "Authorization":"Bearer eyJ4NXQiOiJNell4TW1Ga09H6WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01...kdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ",
              "Content-Length":"265",
              "Content-Type":"application/json"
           },
           "consentId":"bbacc510-91c0-4bf4-a641-e25cfa782e42",
           "resource":"\/aisp\/statements?fromStatementDateTime=2021-05-12T12%3A24%3A50.799%2B05%3A30&toStatementDateTime=2021-05-12T12%3A24%3A50.799%2B05%3A30",
           "context":"\/statements"
        }
        ```
        
        All header values including the bearer token is included in `header`. 
