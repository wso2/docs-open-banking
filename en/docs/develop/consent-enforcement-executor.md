The Consent Enforcement executor ensures that the API consumer application is performing an action on the requested 
resource with the permission of that resource owner. In an open banking scenario, the bank customer is the resource 
owner who grants permission. Then, the API consumer applications can access their bank details including the 
resources created on behalf of the bank customer. The given permission or in other words consent is an agreement 
between the customer and the bank and the API consumer applications must align with this consent agreement. 

**Consent Enforcement** is the process of validating whether the application is abiding by the above-mentioned consent. 
This process identifies whether a particular request sent by an API consumer application is valid or not, based on the 
actions that the application wants to perform on a resource. 

All the API requests that come towards the open banking gateway go through a set of 
[executors](custom-gateway-executor.md). The Consent Enforcement executor is a mandatory executor that is available in 
the Open Banking Accelerator by default.

## How Consent Enforcement Executor Works

- When a request reaches the Consent Enforcement executor, the executor verifies whether a consent ID is available in 
the request as it is mandatory for the Consent Enforcement process.
    
    !!! note
        The Consent ID is included as a JWT claim in the JWT access tokens. In certain open banking specifications, the 
        API consumer applications can invoke an API and create a consent with the client credentials grant type. In 
        these scenarios, the Consent ID is not included in the JWT access token and those requests are omitted from the 
        Consent Enforcement process. 
        
- The Consent Enforcement executor generates a JWT token for requests with the Consent ID parameter. The generated JWT 
token contains request-headers, request-payload, request-path, and a Consent ID. 

- This token is then signed with the API Manager’s Gateway node’s signing certificate before sending its payload to a 
Consent Validation service via a REST API request. 

- The Consent Validation service validates the request against the consent data in the database. Given below is the 
format of the request:

    ``` xml
    {
       "headers":{
          "content-type":"application/json",
          "headerName":"headerValue",
          ...
       },
       "payload":{
          "key1":"value1",
          "key2":"value2",
          ...
       },
       "consentId":"5f4e0ded-4768-4bd3-adb9-7a9587415b05",
       "resourceParams":{
          "resource":"/aisp/accounts?fromDateTime=2021-05-12T12%3A24%3A50.799%2B05%3A30&toDateTime=2021-05-12T12%3A24%3A50.799%2B05%3A30",
          "context":"/open-bankingv3.1/aisp",
          "httpMethod":"POST"
       },
       "userId":"admin@wso2.com@carbon.super@carbon.super",
       "electedResource":"/accounts"
    }
    ```

- The response that is shared with the Consent Enforcement executor contains the validation status. The format of the 
response is as follows:

    ``` xml
    {
       "isValid":true,
       "modifiedPayload":{
          "key1":"value1",
          "key2":"value2",
          ...
       },
       "consentInformation":“eyJhbG…….sw5c”
    }
    ```

??? tip "Click here to see an explanation of the response attributes..."
    
    | Parameter  	| Type     | Description 				| Mandatory/Optional	|
    | ------------	|----------| ----------------------------------------	|--------------------	|
    | isValid	| boolean  | Specifies the validity of the consent.	| Mandatory		|
    | modifiedPayload | JSON   | Specifies if the payload was modified during the validation process. For example, during a file payment request. | Optional |
    | consentInformation | JWT (String) |The value of the consent info header. For example, `accounts` or `funds confirmation`. |Optional |
    | errorCode	| String  | The error code for the consent validation error. |Optional (Mandatory when the isValid parameter is false) |
    | errorMessage	| String  | The error message for the consent validation error. | Optional (Mandatory when the isValid parameter is false) |
    | httpCode	| integer | The HTTP response status code for the invocation. |Optional  (Mandatory when the isValid parameter is false) |
         
- Based on the response, the request either proceeds to the bank backend or sends back an error response. In certain 
scenarios, the bank backend requires more consent information to proceed further. The Consent Validation service 
responds with the `consentInformation` attribute. The Consent Enforcement executor adds this attribute as a request header 
and sends it to the bank backend. 

- The Consent Validation service can modify the request payload as well. If it performs any modifications, it is 
mentioned in the response to the Consent Enforcement executor.

    !!! note
        If you want to add/remove the default validations performed during the Consent Validation service, follow 
        the [Consent Validate endpoint](consent-management-validate.md) documentation.

## Configuration               
If you want to change the default WSO2 Consent Validation service and use your own consent validation service, you need 
to configure it as follows:

!!! tip 
    If you want to use the **default WSO2 Consent Enforcement executor with a customized Consent Validation service**, make 
    sure to adhere to the above request-response formats. 

1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
2. Follow the given sample and add the tags to configure a custom Consent Validation service.

   ``` xml
   [open_banking.gateway.consent.validation]
   endpoint = "https://localhost:9446/api/openbanking/consent/validate"
   ```
