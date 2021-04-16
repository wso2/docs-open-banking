To configure a KeyID calculation logic according to your open banking requirements, use the following class:

## OBKeyIDProvider

``` java
com.wso2.openbanking.accelerator.identity.keyidprovider.OBKeyIDProvider;
```
### getKeyId method

The method contains the KeyID calculation logic. You can customize it according to your requirements. Given below is 
the method signature.

``` java
public String getKeyId(Certificate certificate, JWSAlgorithm signatureAlgorithm, String tenantDomain) throws IdentityOAuth2Exception;
```

## Configurations

To configure the KID value, follow these steps:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
2. Add the following to configure the KID value in signing certificates:

    ``` toml
    [[open_banking.identity]]
    signing_certificate_kid=”123”
    ```