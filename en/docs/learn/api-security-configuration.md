###Configuring MTLS Enforcement Executor
You can apply the `MTLSEnforcementExecutor` executor to check if a Mutual Transport Layer Security (MTLS) certificate is 
present in the API request:

- The relevant configuration is in the `<APIM_HOME>/repository/conf/deployment.toml` file as follows:
```toml
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.mtls.cert.validation.executor.MTLSEnforcementExecutor"
priority = 1
``` 

###Configuring certificate revocation validation
You can apply the `CertRevocationValidationExecutor` executor to perform the Online Certificate Status Protocol (OCSP) and 
Certificate Revocation List (CRL) certificate revocation validation in the API request:

- The relevant configuration is in the `<APIM_HOME>/repository/conf/deployment.toml` file as follows:
```toml
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.mtls.cert.validation.executor.CertRevocationValidationExecutor"
priority = 2
```

!!!tip
    By default, WSO2 Open Banking API Manager executes the certificate revocation validation. However, you can set a proxy
    and execute the certificate revocation validation. In that case, configure the proxy in `<APIM_HOME>/repository/conf/deployment.toml`
    as follows:
    ```toml
    [open_banking.gateway.certificate_management.certificate.revocation.proxy]
    enabled = true
    host = "PROXY_HOSTNAME"
    port = 8080
    ```

###Configuring external API consumer validation

!!!note
    By default, WSO2 Open Banking Accelerator supports a sample API flow to get account information and to initiate a 
    payment. Therefore, the following configuration exists in `<APIM_HOME>/repository/conf/deployment.toml` by default:
    ```toml
    [open_banking.gateway.tpp_management.tpp_validation]
    enabled = false
    implementation_path = ""
    cache_expiry = 3600
    [open_banking.gateway.tpp_management.psd2_role_validation]
    enabled = true
    [[open_banking.gateway.tpp_management.allowed_scopes]]
    name = "accounts"
    roles = "AISP, PISP"
    [[open_banking.gateway.tpp_management.allowed_scopes]]
    name = "payments"
    roles = "PISP"
    ```
 
By default, external API consumer validation is enforced in two occurrences:

- API-level 
- Dynamic Client Registration (DCR)
 
    1. You can apply the `APITPPValidationExecutor` executor to compare the roles in the transport certificate against 
    roles in the request scope: 

        - An example given below to find how  `APITPPValidationExecutor`  applies to the sample Accounts API in `<APIM_HOME>/repository/conf/deployment.toml`:
```toml
[[open_banking.gateway.openbanking_gateway_executors.type]]
name = "Accounts"
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.tpp.validation.executor.APITPPValidationExecutor"
priority = 3
``` 

    2. For Dynamic Client Registration, apply `DCRTPPValidationExecutor` to validate the roles in the transport certificate against 
    the roles in the API consumer's SSA.

        - The relevant configuration is in the `<APIM_HOME>/repository/conf/deployment.toml` file as follows:
```toml
[[open_banking.gateway.openbanking_gateway_executors.type]]
name = "DCR"
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.tpp.validation.executor.DCRTPPValidationExecutor"
priority = 3
```

According to the open banking standard, you can extend the validation capabilities. For more information, see [Custom API 
Consumer Validation](../develop/custom-api-consumer-validation.md).
