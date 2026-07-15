The Token Filters perform the validations that happen in the token authentication flow. You can customize these filters 
according to your open banking requirements. Listed below are the available Token Filters:

## DefaultTokenFilter 

Customize the following class to modify the token request, response, or error handling. 
``` java
com.wso2.openbanking.accelerator.identity.token.DefaultTokenFilter
```

!!! note 
    
    If the WSO2 Identity Server is fronted by a load-balancer, a mutual TLS handshake needs to be ensured. Since a 
    certificate cannot be passed through the request header with the default configuration, disable the default 
    functionality as follows:
    
    1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    2. Set the following configuration to `false`. By default, this is set to `true`. 
    
    ``` toml
    [open_banking.identity]
    client_transport_cert_as_header_enabled=false
    ```
    
### handleFilterRequest method

This method lets you modify the token request. Given below is the method signature.

``` java
public ServletRequest handleFilterRequest(ServletRequest request) throws ServletException;
```

### handleFilterResponse method

This method lets you modify the token response. Given below is the method signature.
    
``` java
public ServletResponse handleFilterResponse(ServletResponse response) throws ServletException;
```    
   
### handleValidationFailure method

This method lets you handle the error response in scenarios where the validation fails. Given below is the method signature.
    
``` java
public void handleValidationFailure(HttpServletResponse response, int status, String error, String errorMessage) throws IOException;
```

## OBIdentityFilterValidator  
   
To perform validations at the filter level use the following class:

``` java
com.wso2.openbanking.accelerator.identity.token.validators.OBIdentityFilterValidator
```
   
### Validate method

This method lets you perform validations at the filter level. Given below is the method signature.

``` java
void validate(ServletRequest request, String clientId) throws TokenFilterException, ServletException;
```

The following validators are implemented by extending `OBIdentityFilterValidator`. You can customize them by extending 
the respective class and overriding the `validate` method, which is explained above.

!!! note 
    In addition to extending the below validators, you can directly extend the `OBIdentityFilterValidator` class and 
    develop your own validators.

 - MTLSEnforcementValidator validator
      
    This enforces that a certificate needs to be passed during token creation. This certificate is then bound to the 
    access token.
     
    ``` java
    com.wso2.openbanking.accelerator.identity.token.validators.MTLSEnforcementValidator 
    ```
   
 - ClientAuthenticatorValidator validator

    This validates whether the token request follows the client authentication method format that was registered through 
    Dynamic Client Registration. 
    
    ``` java
    com.wso2.openbanking.accelerator.identity.token.validators.ClientAuthenticatorValidator  
    ```

 - SignatureAlgorithmEnforcementValidator method

    This validates whether the client assertion is signed with the algorithm that was registered through Dynamic Client Registration. 
    
    ``` java
    com.wso2.openbanking.accelerator.identity.token.validators.SignatureAlgorithmEnforcementValidator 
    ```

### Configuring a custom validator

1. Once you implement the custom validator, build a JAR file for the project and place it in the 
`<IS_HOME>/repository/components/dropins` directory.

2. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

3. Add the following tags and configure your validator using its Fully Qualified Name (FQN):
    ``` toml
    [[open_banking.identity.token_filter_validators]] 
    class = <CUSTOM_VALIDATOR_FQN>
    ```
4. Save the configurations and restart the Identity Server.