# KeyID Provider

Deprecated Documentation

This feature is **deprecated** and is only intended for migrating customers. Please transition to the **OpenAPI based extensions** for all new implementations.

The key ID (kid) parameter is used to identify a unique key. This value allows identity providers such as WSO2 Identity Server to provide a simple name to identify their signing key, and then repeat that identifier in the tokens they issue. For more information on scenarios where the kid value is used, see [WSO2 Identity Server documentation](https://is.docs.wso2.com/en/5.11.0/learn/validating-jwt-based-on-jwks/#!).

WSO2 Open Banking Accelerator provides the `OBKeyIDProvider` class, which is an extension point you can customize according to your requirements.

## OBKeyIDProvider[​](#obkeyidprovider "Direct link to OBKeyIDProvider")

To configure a kid calculation logic according to your open banking requirements, use the `OBKeyIDProvider` class.

```
com.wso2.openbanking.accelerator.identity.keyidprovider.OBKeyIDProvider;
```

### getKeyId method[​](#getkeyid-method "Direct link to getKeyId method")

The method contains the KeyID calculation logic. You can customize it according to your requirements. Given below is the method signature:

```
public String getKeyId(Certificate certificate, JWSAlgorithm signatureAlgorithm, String tenantDomain) throws IdentityOAuth2Exception;
```

## Configuring a kid value[​](#configuring-a-kid-value "Direct link to Configuring a kid value")

To configure a kid value, follow these steps:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Add the following to configure the kid value in signing certificates:

   ```
   [[open_banking.identity]]

   signing_certificate_kid=”123”
   ```
