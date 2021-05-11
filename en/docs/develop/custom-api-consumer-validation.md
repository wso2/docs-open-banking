TPP validation allows banks to validate API consumers from the National Competent Authorities (NCAs). This is done by 
validating the transport layer certificate an API consumer has obtained. 

!!!note
    By default, WSO2 Open Banking Accelerator supports a sample API flow to get account information and to initiate a 
    payemnt. Therefore, the following configuration exists in `<APIM_HOME>/repository/conf/deployment.toml` by default:
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

According to your requirements, you can extend and override the methods in the `TPPValidationService` class.

To write a custom Response Type handler, extend the following class:
```java
com.wso2.openbanking.accelerator.gateway.executor.service.TPPValidationService.java
```

To extend the validation capabilities according to your requirements, override relevant methods of this class. Given 
below is a brief description of each method.

####validate method

Validates the roles and returns a boolean response as follows:

- `True` if the roles matches
- `False` if the roles mismatches

Given below is the method signature:
```java
boolean validate(X509Certificate peerCertificate,
  List < PSD2RoleEnum > requiredPSD2Roles, Map < String, Object > metadata)
throws TPPValidationException;
```

####getCacheKey method

Returns the cache key used for caching the responses and an ID that is unique to the API flow. Given below is the method 
signature:
```java
String getCacheKey(X509Certificate peerCertificate,
  List < PSD2RoleEnum > requiredPSD2Roles, Map < String, Object > metadata)
throws TPPValidationException;
```

####Configuration

- Open `<APIM_HOME>/repository/conf/deployment.toml` and locate the following configuration to:
    1. Set value as `enable`.
    2. Add the implmented class under `implementation_path`.
    
    ```toml
    [open_banking.gateway.tpp_management.tpp_validation]
    enabled = false
    implementation_path = "<FQN of the extended class>"
    cache_expiry = 3600
    ```





