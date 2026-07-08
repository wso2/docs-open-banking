 
A pushed authorization request contains authentication and authorization 
request parameters, which will be used in the Pushed Authorization endpoint 
of WSO2 Open Banking Accelerator. The Pushed Authorization endpoint returns
a `request_uri` with an expiration time as a reference to the details sent 
in the pushed authorization request.

##Default Pushed Authorization Request validations

The Pushed Auth Request Validator uses the existing validation layer of WSO2 Open Banking Accelerator
to enforce validations. By default, the following validations are available in the validation layer:

- Repeated parameter validation for all parameters: checks the pushed authorization request body 
  for any repeated parameters

When the `request` parameter is available:

!!! note
    The `request` parameter value which will be referred to as `request object` from here onwards should be a 
    Signed JWT(JWS) or an Encrypted JWT(JWE). It can be signed and encrypted as well. In this scenario, it must 
    be signed before being encrypted.

- Validation of form body parameters - verifies that only client authentication 
  parameters (such as `client_id`, `client_assertion`, `client_assertion_type`) are present in the request form body. 
  Other parameters must be included in the request object.

- Validation of client id - validates the `client id` claim of the request object.

- Validation of redirect URI - validates the redirect URI to check whether it matches with the registered redirect URIs.

- Validation of request object signature algorithm - checks if the correct signing algorithm is used.
  
- Validation of request object signature - verifies the signature of the request object.
  
- Validation of the nonce claim - checks whether the nonce claim is available for response types requesting `id_token`.
  
- Validation of the scope claim - checks whether the scope claim contains scopes that are registered with the client 
  application.
  
- Validation of the audience claim - checks if the audience claim matches the token endpoint URL.
  
- Validation of the issuer claim - checks whether the issuer claim matches the client_id.
  
- Validation of invalid claims in request object - check whether the `request` and `request_uri` claims are 
  present in the request object.

##Writing a Custom Pushed Auth Request Validator

You can extend the default validations in WSO2 Open Banking Accelerator and add more validations according to your 
open banking requirements:

- To implement a custom Pushed Auth Request validator, extend the following class:

``` java
com.wso2.openbanking.accelerator.identity.push.auth.extension.request.validator.PushAuthRequestValidator
```

Given below is a brief explanation of the methods you need to implement.

###validateAdditionalParams method

This method performs the additional validations you add. Given below is the method signature:

``` java
public void validateAdditionalParams(Map<String, Object> parameters) throws PushAuthRequestValidatorException
```

Input parameters

- `Map<String, Object> parameters` - contains pushed authorization request parameters obtained from the HTTP servlet request

Output parameter

- `void`

!!! note
    When a valid request object is present as a request parameter, the default implementation of the accelerator 
    decodes the request object JWT and adds the following parameters to the Map<String, Object> parameters map.

1. Key - `"decodedJWTBody"`, Value - `<decoded request object JWT body>`
2. Key - `"decodedJWTHeader"`, Value - `<decoded request object JWT header>`

For example:

- Extend the `PushAuthRequestValidator` class and override the `validateAdditionalParams` method in your extended 
  class as follows:

``` java
    @Override
    public void validateAdditionalParams(Map<String, Object> parameters) throws PushAuthRequestValidatorException {
    
       JSONObject requestObjectJsonBody;
       if (parameters.containsKey(“decodedJWTBody”) &&
               parameters.get(“decodedJWTBody”) instanceof JSONObject) {
    
           requestObjectJsonBody = (JSONObject) parameters.get(“decodedJWTBody”);
       } else {
           log.error("Invalid push authorisation request");
           throw new PushAuthRequestValidatorException(HttpStatus.SC_BAD_REQUEST,
                   “invalid_request”, "Invalid push authorisation request");
       }
    
       if (!isValidSharingDuration(requestObjectJsonBody)) {
           log.error("Invalid sharing_duration value");
           throw new PushAuthRequestValidatorException(HttpStatus.SC_BAD_REQUEST,
                   “invalid_request”, "Invalid sharing_duration value");
       }
    }
    
    private boolean isValidSharingDuration(JSONObject requestObjectJsonBody) {
    
       String sharingDurationString = StringUtils.EMPTY;
       JSONObject claims = requestObjectJsonBody.get(“claims”) != null ?
               (JSONObject) requestObjectJsonBody.get(“claims”) : null;
       if (claims != null && claims.containsKey(“sharing_duration”)
               && StringUtils.isNotBlank(claims.getAsString(“sharing_duration”))) {
           sharingDurationString = claims.getAsString(“sharing_duration”);
       }
       int sharingDuration = sharingDurationString.isEmpty() ? 0 : Integer.parseInt(sharingDurationString);
       //If the sharing_duration value is negative then the authorisation should fail.
       return sharingDuration >= 0;
    }

```

###createErrorResponse method

This method allows you to modify error responses. Given below is the method signature:

``` java
public PushAuthErrorResponse createErrorResponse(int httpStatusCode, String errorCode, String errorDescription)
```

Input parameters

- `int httpStatusCode` - the HTTP status code

- `String errorCode` - the error code according to the open banking specification. For example, `inavlid_request`

- `String errorDescription` - an appropriate error description

Output parameter

- `PushAuthErrorResponse` - the model class for error response

The `PushAuthErrorResponse` model class contains the following fields:

- `private int httpStatusCode`
- `private JSONObject payload`

Model class:

``` java
 public class PushAuthErrorResponse {

   private int httpStatusCode = 0;
   private JSONObject payload = null;

   public int getHttpStatusCode() {

       return httpStatusCode;
   }
   public void setHttpStatusCode(int httpStatusCode) {

       this.httpStatusCode = httpStatusCode;
   }

   public JSONObject getPayload() {

       return payload;
   }
   public void setPayload(JSONObject payload) {

       this.payload = payload;
   }
 }
```

For example:

``` java
public PushAuthErrorResponse createErrorResponse(int httpStatusCode, String errorCode, String errorDescription) {

   PushAuthErrorResponse pushAuthErrorResponse = new PushAuthErrorResponse();
   JSONObject errorResponse = new JSONObject();
   errorResponse.put("error_description", errorDescription);
   errorResponse.put("error”, errorCode);
   pushAuthErrorResponse.setPayload(errorResponse);
   pushAuthErrorResponse.setHttpStatusCode(httpStatusCode);

   return pushAuthErrorResponse;
}
```

Once implemented, build a JAR file for the project.

##Configuring a Custom Pushed Auth Request Validator

1. Place the above-created JAR file in the `<IS_HOME>/repository/components/lib` directory.
2. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
3. Find the `[open_banking.identity.extensions]` tag and configure it using the Fully Qualified Name (FQN) of 
   your custom Pushed Auth Request Validator. For example:
   
       ``` toml
       [open_banking.identity.extensions]
       push_auth_request_validator="com.wso2.openbanking.accelerator.identity.push.auth.extension.request.validator.PushAuthRequestValidator"
       ```
       
4. Save the above configurations and restart the Identity Server.
