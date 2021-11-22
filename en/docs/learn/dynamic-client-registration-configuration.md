## Configuring DCR in WSO2 Identity Server

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Configure the issuer (iss) of the SSA in the following tag. If not specified, the application is considered 
a non-regulatory application.
``` toml
[[open_banking.dcr.regulatory_issuers.iss]]
name = "OpenBanking Ltd"
```

3. If you have modified the Application Listener interface, for example, adding OAuth 2.0 properties or for data 
publishing requirements, the Application Listener invokes methods that are overridden from a class. Configure the following 
tag with the name of the class that is extended to do so.
``` toml
[open_banking.dcr]
applicationupdater = "com.wso2.openbanking.accelerator.identity.listener.application.ApplicationUpdaterImpl"
```

4. The following configuration sets the software id as the name of the application. By default, this configuration is
set to `true`.
``` toml
[open_banking.dcr]
use_softwareIdForAppName = true
```

5. Configure the name of the claim regarding the jwks endpoint that is issued for the SSA. You can refer to the SSA for 
this value. For example, the `software_jwks_endpoint` claim.
``` toml
[open_banking.dcr] 
jwks_endpoint_name = "software_jwks_endpoint" 
```

6. Configure the names of the primary authenticator to be engaged in the authentication flow and the identity provider 
if SMS OTP is used as the secondary authentication method.
``` toml
[open_banking.sca.primaryauth]
name = "BasicAuthenticator"
display = "basic"

[open_banking.sca.idp]
name = "SMSAuthentication"
```

## Configuring DCR in WSO2 API Manager

1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.

2. If you want to change the internal REST API endpoints of the API Manager configure the following tags. By default, 
the API Manager 4.0 endpoints are configured.
``` toml
[[open_banking.dcr.apim_rest_endpoints]]
app_creation = "api/am/devportal/v2/applications"
key_generation = "api/am/devportal/v2/applications/application-id/map-keys"
api_retrieve = "api/am/devportal/v2/apis"
api_subscribe = "api/am/devportal/v2/subscriptions/multiple"
```

3. Configure the hostname of the API Manager server for the token endpoint.
``` toml
[open_banking.dcr]
token_endpoint = https://<APIM_HOST>:9443/oauth2/token
```   

4. The following configuration sets the software id as the name of the application. By default, this configuration is 
set to `true`.
```toml
[open_banking.dcr]
use_softwareIdForAppName = true
```

5. Configure the claim name in the SSA that mentions the software. If the `use_softwareIdForAppName` configuration is 
set to `false`, the name of the application is set using the value of the given claim.
```toml
[open_banking.dcr]
app_name_claim = "software_client_name"
```

6. Configure the name of the claim regarding the jwks endpoint that is issued for the SSA. You can refer to the SSA 
for this value. For example, the `software_jwks_endpoint` claim.
``` toml
[open_banking.dcr]
jwks_endpoint_name = "software_jwks_endpoint"
```

7. By default, a JWT is expected at the DCR endpoint. If you want to **send a json payload**, add the following 
configurations and set the value to `false`.
``` toml
[open_banking.dcr]
isRequestJWT = false
```

8. Configure the names of all regulatory applications. By default, the DCR API is configured.   
``` toml
[[open_banking.dcr.regulatory_api]]
api_name = "CDR-DynamicClientRegistration"
```

9. Configure the timeout values when validating the signature of the request.
``` toml
[open_banking.dcr.jwks_retriever]
connection_timeout = 3000
read_timeout = 3000
```

## Configuring a custom DCR validator

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
2. Find the following configuration and replace that with your extended class. By default, the 
`DefaultRegistrationValidatorImpl` class is configured as follows: 
````toml
[open_banking.dcr]
validator = "com.wso2.openbanking.accelerator.identity.dcr.validation.DefaultRegistrationValidatorImpl"
````
3. Configure the jwks endpoint that is used for validating the SSA signature. 
```toml
[open_banking.dcr]
jwks_url_sandbox = "https://keystore.openbankingtest.org.uk/keystore/openbanking.jwks"
jwks_url_production = "https://keystore.openbankingtest.org.uk/keystore/openbanking.jwks"
```       
4. Configure the algorithms that are allowed during signature validation. These algorithms are used for token endpoint 
authentication assertion signature, request object signature, and id token signature validations.
```toml
[[open_banking.signature_validation.allowed_algorithms]]
name = "PS256"
```

!!! note "Configuring DCR request parameters" 
    - According to your specification different types of values are allowed in the registration request. WSO2 Open 
    Banking Accelerator provides the capability to configure the parameters and the values they allow.
        - By default, the following values are configured as mandatory parameters. To configure 
        the allowed values for them, open the `<IS_HOME>/repository/conf/deployment.toml` file and add the following 
        tags.
            
              ````toml
              [open_banking.dcr.registration.issuer] 
              allowed_values = ["value1, value2, value3”]
               
              [open_banking.dcr.registration.audience] 
              allowed_values = ["value1, value2, value3”]
              
              [open_banking.dcr.registration.token_endpoint_authentication] 
              allowed_values = ["value1, value2, value3”]
              
              [open_banking.dcr.registration.id_token_signed_response_alg] 
              allowed_values = ["value1, value2, value3”]
              
              [open_banking.dcr.registration.software_statement] 
              allowed_values = ["value1, value2, value3”]
              
              [open_banking.dcr.registration.grant_types] 
              allowed_values = ["value1, value2, value3”]
              ````
      
           - If you want to make any of the above parameters optional, add the `required` tag and set it to `false`. For 
           example:
              ````toml
              [open_banking.dcr.registration.issuer]
              required = false
              allowed_values = ["accounts", "payments"]
              ````
              
    - By default, the following values are configured as optional parameters. To configure 
    the allowed values for them:
        - Open the `<IS_HOME>/repository/conf/deployment.toml` file, add the relevant tags and configure the values 
        allowed.
         
            ````toml
            [open_banking.dcr.registration.scope]
            allowed_values = ["accounts", "payments"]
            
            [open_banking.dcr.registration.application_type] 
            allowed_values = ["web"]
            
            [open_banking.dcr.registration.response_types]  
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.callback_uris]  
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.token_endpoint_auth_signing_alg] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.software_id] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.id_token_encryption_response_alg] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.id_token_encryption_response_enc] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.request_object_signing_algorithm] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.tls_client_auth_subject_dn] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.backchannel_token_delivery_mode] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.backchannel_authentication_request_signing_alg] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.backchannel_client_notification_endpoint] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.backchannel_user_code_parameter_supported] 
            allowed_values = ["value1, value2, value3”]
     
            ```` 
        
           - If you want to make any of the above parameters mandatory, add the `required` tag and set it to `true`. 
           For example:
        ````toml
        [open_banking.dcr.registration.scope]
        required = true
        allowed_values = ["accounts", "payments"]
        ````
        