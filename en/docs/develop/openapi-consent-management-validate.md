# OpenAPI Extensions for Consent Validation

WSO2 Open Banking Accelerator consists of endpoints to handle the consent life cycle of the Open Banking flow. You can customize relevant accelerator component functionality according to your Open Banking/Open Finance specification requirements using the extension points available. This section explains the Consent Validate component and how to incorporate custom validations to the `/validate` endpoint as an OpenAPI extension implementation.

!!! note
    Make sure to refer to the Developer guide for OpenAPI based extensions from the [documentation](../develop/openapi-extensions-developer-guide.md).


## OpenAPI Extensions

| OpenAPI Extension       | Description                                                                      | OpenAPI Definition                                                                                                                                         |
|-------------------------|----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| validate-consent-access | Handle specification-specific custom validations before data access | [validate-consent-access/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Consent/paths/~1validate-consent-access/post) |

## Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enable it as below. Make sure `allowed_extensions` contains the OpenAPI extension mentioned in the above table.

    ``` toml
    [financial_services.extensions.endpoint]
    enabled = true
    base_url = "<BASE_URL_OF_THE_EXTENSION>"

    allowed_extensions = ["validate_consent_access"]

    [financial_services.extensions.endpoint.security]
    # supported types : Basic-Auth or OAuth2
    type = "Basic-Auth"
    username = ""
    password = ""
    ```
    
??? tip "Given below is a sample decoded JWT"
    
    ```
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
        
All header values including the bearer token are included in `header`. 
