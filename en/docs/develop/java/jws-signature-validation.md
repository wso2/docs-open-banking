The WSO2 Open Banking Accelerator provides the JWS Signature Validation executor if you want to validate the
signature of the API requests signed by the API consumer. Signature validations ensure that the received
requests are not tampered with. Furthermore, you can handle different content types, retrieve public signing keys, 
validate claims, and validate the message signature using the JWS Signature Validation executor. 

You can implement this executor to perform the following:

- Validate JWS header claim
- Retrieve critical claims
- Retrieve HTTP header name
- Handle errors for requests with signature header

You can implement a custom JWS Signature Validation by extending the following class:

``` java
com.wso2.openbanking.accelerator.gateway.executor.jws.JwsRequestSignatureHandlingExecutor
```

Given below is a brief explanation of the methods you need to implement.

###getSignatureHeaderName method

This method lets you retrieve the header name of the HTTP header that contains the JWS Signature. 

``` java
public String getSignatureHeaderName() {
    return "x-jws-signature";
}
```

The returned value is assigned to a private variable named `SIGNATURE_HEADER_NAME`, which is useful in retrieving the 
JWS Signature value from the request headers. 

``` java
Map<String, String> requestHeaders = obapiRequestContext. getMsgInfo(). getHeaders();

String jwsSignature = requestHeaders.get(SIGNATURE_HEADER_NAME);
```

### preProcessValidation method

This method lets you identify requests that should be accommodated for signature validation. This method returns true/false 
to continue the `preProcessRequest` method of the executor. 

At the accelerator level, this method returns `true` if the request does not contain errors and validation is
enabled for all requests except for `GET` and `DELETE` requests. This behaviour can be changed by overriding the method
in an extended class.

``` java
/**
* Method to validate if the request mandates to execute JWS Signature Validation.
*
* @param obapiRequestContext OB request context object
* @param requestHeaders OB request header Map
*/
public Boolean preProcessValidation(OBAPIRequestContext obapiRequestContext, Map<String, String> requestHeaders) {

}
```

### validateClaims method

This method lets you validate the claims sent in the JWS Header. The default return value is set to `true`.

Override this method in an extended class to define the validation for different claims.

``` java
/**
* Claims to be validated in the JWS header.
*
* @param obapiRequestContext OB request context object
* @param claims jose header claims
* @param appName application name
* @param jwksURI jwksUrl in URL format
* @return boolean
*/
public boolean validateClaims(OBAPIRequestContext obapiRequestContext,
                             JWSHeader claims, String appName, String jwksURI) {
   return true;
}
```

### differedCriticalClaims method

This method lets you define critical parameters of the JWS Header. When verifying the signature, pass a list of 
critical claims.

```` java
/**
* critical parameters for validation.
*
* @return list of critical claims
*/
public String[] differedCriticalClaims() {
   return new String[0];
}
````

Once implemented, build a JAR file for the project.

##Configuring a custom JWS Signature Validation Executor

1. Place the above-created JAR file in the `<APIM_HOME>/repository/components/lib` directory.
2. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
3. Add the Fully Qualified Name (FQN) of the created executor under the 
`open_banking.gateway.openbanking_gateway_executors.type.executors` tag with a higher priority 
than `ConsentEnforcementExecutor`. For example:

    ``` toml
    [[open_banking.gateway.openbanking_gateway_executors.type.executors]]
    name = "com.wso2.openbanking.accelerator.gateway.executors.jws.JwsRequestSignatureHandlingExecutor"
    priority = 2
    
    [[open_banking.gateway.openbanking_gateway_executors.type.executors]]
    name = "com.wso2.openbanking.accelerator.gateway.executor.impl.consent.ConsentEnforcementExecutor"
    priority = 3
    ```

4. Enable validation and define the valid signing algorithms for the JWS sent in the request header:

    ``` toml
    [open_banking.jws_signature.signature_validation]
    enabled=true
    
    [[open_banking.jws_signature.signature_validation.allowed_algorithms]]
    algorithm="PS256"
    
    [[open_banking.jws_signature.signature_validation.allowed_algorithms]]
    algorithm="ES256"
    ```
   
5. The signing keys used for validation by an application are cached. The default expiration time for cache 
   modification and access are 60 minutes. To change these values, add and configure the following:

    ``` toml
    [open_banking.common.identity.cache]
    cache_modified_expiry_minuites=30
    cache_access_expiry_minuites=30
    ```
   
6. Save the above configurations and restart the API Manager server.