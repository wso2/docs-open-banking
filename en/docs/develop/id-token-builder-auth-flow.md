## Writing a custom ID Token Builder

The default ID Token Builder in WSO2 Open Banking provides the pairwise subject calculation for authorization and token 
flow.

If the API consumer application supports the sector identifier URI parameter, the pairwise subject calculation is 
performed using the **sector identifier URI**. Otherwise, the calculation is performed using the **callback URI**.

Given below is the Fully Qualified Name (FQN) of the default ID Token Builder: 

``` java
com.wso2.openbanking.accelerator.identity.idtoken.OBIDTokenBuilder
```

You can implement a custom ID Token Builder for the **Authorization flow** by overriding the following method of this class:

### getSubjectClaim method

This method contains the pairwise subject calculation logic. You can customize it according to your requirements. Given 
below is the method signature:

``` java
getSubjectClaim(OAuthAuthzReqMessageContext authzReqMessageContext,
                                OAuth2AuthorizeRespDTO authorizeRespDTO,
                                String clientId,
                                String spTenantDomain,
                                AuthenticatedUser authorizedUser) throws IdentityOAuth2Exception;
```

## Configuring a custom ID Token Builder

To configure the custom ID Token Builder, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Add the following tags and configure your custom ID Token Builder using its FQN:

   ``` toml
   [oauth.oidc.extensions]
   id_token_builder = "com.wso2.openbanking.accelerator.identity.idtoken.OBIDTokenBuilder"
   ```
   
!!! note
    If `id_token_builder` is not configured, the default ID Token Builder `DefaultIDTokenBuilder` is used for the 
    `subject` claim calculation. 