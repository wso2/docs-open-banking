# ID Token Builder

## Writing a custom ID Token Builder[​](#writing-a-custom-id-token-builder "Direct link to Writing a custom ID Token Builder")

The default ID Token Builder in WSO2 Open Banking provides the pairwise subject calculation for authorization and token flow.

If the API consumer application supports the sector identifier URI parameter, the pairwise subject calculation is performed using the **sector identifier URI**. Otherwise, the calculation is performed using the **callback URI**.

Given below is the Fully Qualified Name (FQN) of the default ID Token Builder:

```
com.wso2.openbanking.accelerator.identity.idtoken.OBIDTokenBuilder
```

You can implement a custom ID Token Builder for the **Token flow** by overriding the following method of this class:

### getSubjectClaim method[​](#getsubjectclaim-method "Direct link to getSubjectClaim method")

This method contains the pairwise subject calculation logic. You can customize it according to your requirements. Given below is the method signature:

```
getSubjectClaim(OAuthTokenReqMessageContext tokenReqMessageContext,

                                OAuth2AccessTokenRespDTO tokenRespDTO,

                                String clientId,

                                String spTenantDomain,

                                AuthenticatedUser authorizedUser) throws IdentityOAuth2Exception;
```

## Configuring a custom ID Token Builder[​](#configuring-a-custom-id-token-builder "Direct link to Configuring a custom ID Token Builder")

To configure the custom ID Token Builder, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Add the following tags and configure your custom ID Token Builder using its FQN:

   ```
   [oauth.oidc.extensions]

   id_token_builder = "com.wso2.openbanking.accelerator.identity.idtoken.OBIDTokenBuilder"
   ```

   note

   If `id_token_builder` is not configured, the default ID Token Builder `DefaultIDTokenBuilder` is used for `subject` claim calculation.

3. If you need to return the subject claim of the id token as a PPID, add the following configurations and set the value to `true`.

   ```
   [open_banking.identity] 

   enable_PPID = true
   ```
