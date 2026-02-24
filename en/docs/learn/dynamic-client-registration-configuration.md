## Configuring DCR in WSO2 Identity Server

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. DCR API can create FAPI compliant applications. If you wnat to make you application FAPI complaint then enable the below config and add the JWKS Endpoint to validate the SSA Sigmnature.
```
[oauth.dcr]
enable_fapi_enforcement=true
ssa_jkws= "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks"
```

3. To avoid returning null values in DCR Response set the below config to false.
```
[oauth.dcrm]
return_null_fields_in_response=false
```

4. Configure the names of the primary authenticator to be engaged in the authentication flow and the identity provider if SMS OTP is used as the secondary authentication method.
``` toml
[financial_services.app_registration.sca.primaryauth]
name = "BasicAuthenticator"
display = "basic"

[financial_services.app_registration.sca.idp]
name = "SMSOTP"
step = 2
```

5. To set a conditional auth script to the application, put the conditional auth script inside the `<IAM_HOME>/repository/conf` folder and config the file name below.
```
[financial_services.app_registration.conditional.auth.script]
filename="auth-script.js"
```

6. Configure the issuer (iss) of the SSA in the following tag. If not specified, the application is considered 
a non-regulatory application.
``` toml
[[open_banking.dcr.regulatory_issuers.iss]]
name = "OpenBanking Ltd"
```     

## Configuring DCR request parameters

According to your specification different types of values are allowed in the registration request. WSO2 Open 
Banking Accelerator provides the capability to configure the parameters and the values they allow.
    
- By default, the following values are configured in th deployment toml file. 
        
    ``` toml
    [[financial_services.app_registration.dcr.params]]
    name = "SoftwareId"
    key = "software_id"
    required = false
    include_in_response = true

    [[financial_services.app_registration.dcr.params]]
    name = "Scope"
    key = "scope"
    required = true
    include_in_response = true
    allowed_values = ["accounts", "payments", "fundsconfirmations"]

    [[financial_services.app_registration.dcr.params]]
    name = "RedirectUris"
    key = "redirect_uris"
    required = true
    include_in_response = true

    [[financial_services.app_registration.dcr.params]]
    name = "GrantTypes"
    key = "grant_types"
    required = true
    include_in_response = true
    allowed_values = ["authorization_code", "refresh_token", "client_credentials"]

    [[financial_services.app_registration.dcr.params]]
    name = "SoftwareStatement"
    key = "software_statement"
    required = true
    include_in_response = true

    [[financial_services.app_registration.dcr.params]]
    name = "ApplicationType"
    key = "application_type"
    required = true
    include_in_response = true
    allowed_values = ["web"]

    [[financial_services.app_registration.dcr.params]]
    name = "TokenEndpointAuthMethod"
    key = "token_endpoint_auth_method"
    required = true
    include_in_response = true

    [[financial_services.app_registration.dcr.params]]
    name = "IdTokenSignatureAlgorithm"
    key = "id_token_signed_response_alg"
    required = true
    include_in_response = true

    [[financial_services.app_registration.dcr.params]]
    name = "RequestObjectSignatureAlgorithm"
    key = "request_object_signing_alg"
    required = true
    include_in_response = true

    [[financial_services.app_registration.dcr.params]]
    name = "Iss"
    key = "iss"
    required = true
    include_in_response = false

    [[financial_services.app_registration.dcr.params]]
    name = "Iat"
    key = "iat"
    required = true
    include_in_response = false

    [[financial_services.app_registration.dcr.params]]
    name = "Exp"
    key = "exp"
    required = true
    include_in_response = false

    [[financial_services.app_registration.dcr.params]]
    name = "Jti"
    key = "jti"
    required = true
    include_in_response = false

    [[financial_services.app_registration.dcr.params]]
    name = "Aud"
    key = "aud"
    required = true
    include_in_response = false
    ```
    
- If you want to make any of the above parameters optional, add the `required` tag and set it to `false`. For 
    example:
    ``` toml
    [[financial_services.app_registration.dcr.params]]
    name = "Aud"
    key = "aud"
    required = false
    include_in_response = false
    ```

- If you want to remove any parameter sending in the response, add the `include_in_response` tag and set it to `false`. For example:
    ``` toml
    [[financial_services.app_registration.dcr.params]]
    name = "Aud"
    key = "aud"
    required = false
    include_in_response = false
    ```

- To configure the allowed values for them, open the `<IS_HOME>/repository/conf/deployment.toml` file and add the `allowed_values` tag as below.
    ``` toml
    [[financial_services.app_registration.dcr.params]]
    name = "ApplicationType"
    key = "application_type"
    required = true
    include_in_response = true
    allowed_values = ["web"]
    ```


## Configuring inbuilt DCR request validators 

WSO2 Open Banking Accelerator provides a set of built-in validators that perform request validations. The Accelerator also offers the flexibility to enable, disable, and configure these validators based on the toolkit developer’s requirements.

```
[[financial_services.app_registration.dcr.validators.validator]]
name = "RequiredParamsValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.RequiredParamsValidator"
enable = true
priority = 1

[[financial_services.app_registration.dcr.validators.validator]]
name = "IssuerValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.IssuerValidator"
enable = true
priority = 2

[[financial_services.app_registration.dcr.validators.validator]]
name = "RedirectUriFormatValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.RedirectUriFormatValidator"
enable = true
priority = 3

[[financial_services.app_registration.dcr.validators.validator]]
name = "RedirectUriMatchValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.RedirectUriMatchValidator"
enable = true
priority = 4

[[financial_services.app_registration.dcr.validators.validator]]
name = "UriHostnameValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.UriHostnameValidator"
enable = true
priority = 5

[[financial_services.app_registration.dcr.validators.validator]]
name = "SSAIssuerValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.SSAIssuerValidator"
enable = true
priority = 6
allowed_values = ["OpenBanking Ltd"]

[[financial_services.app_registration.dcr.validators.validator]]
name = "RequestJTIValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.RequestJTIValidator"
enable = true
priority = 7

[[financial_services.app_registration.dcr.validators.validator]]
name = "SSAJTIValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.SSAJTIValidator"
enable = false
priority = 8

[[financial_services.app_registration.dcr.validators.validator]]
name = "TokenEndpointAuthSigningAlgValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.TokenEndpointAuthSigningAlgValidator"
enable = true
priority = 9
```