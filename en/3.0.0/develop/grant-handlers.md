# Grant Handlers

The WSO2 Identity Server provides OAuth Grant Handlers that are useful when you want to support an OAuth flow that is different from standard grant types. They validate the grant, scopes, and access delegation. For more information, see [Identity Server documentation](https://is.docs.wso2.com/en/5.11.0/learn/extension-points-for-oauth/#oauth-grant-handler).

The following Grant Handlers in WSO2 Open Banking Accelerator are based on OAuth Grant Handlers. They let you modify the token response and define a data publishing logic for token related data.

## OBAuthorizationCodeGrantHandler[​](#obauthorizationcodegranthandler "Direct link to OBAuthorizationCodeGrantHandler")

This is an authorization code grant handler.

```
com.wso2.openbanking.accelerator.identity.grant.type.handlers.OBAuthorizationCodeGrantHandler
```

## OBClientCredentialsGrantHandler[​](#obclientcredentialsgranthandler "Direct link to OBClientCredentialsGrantHandler")

This is a client credentials grant handler.

```
com.wso2.openbanking.accelerator.identity.grant.type.handlers.OBClientCredentialsGrantHandler
```

## OBPasswordGrantHandler[​](#obpasswordgranthandler "Direct link to OBPasswordGrantHandler")

This is a password grant handler.

```
com.wso2.openbanking.accelerator.identity.grant.type.handlers.OBPasswordGrantHandler
```

## OBRefreshGrantHandler[​](#obrefreshgranthandler "Direct link to OBRefreshGrantHandler")

This is a refresh grant handler.

```
com.wso2.openbanking.accelerator.identity.grant.type.handlers.OBRefreshGrantHandler
```

warning

When overriding the above Grant Handlers, do not override the `issue` method with the following method signature.

```
public OAuth2AccessTokenRespDTO issue(OAuthTokenReqMessageContext tokReqMsgCtx) throws IdentityOAuth2Exception;
```

Instead of overriding the `issue` method, use the `executeInitialStep` and `publishUserAccessTokenData` methods to cater to your requirements. Given below is a brief explanation of the methods you can use in the above Grant Handlers:

### executeInitialStep method[​](#executeinitialstep-method "Direct link to executeInitialStep method")

This method lets you modify the token response and add any additional claims. Given below is the method signature.

```
public void executeInitialStep(OAuth2AccessTokenRespDTO oAuth2AccessTokenRespDTO, OAuthTokenReqMessageContext tokReqMsgCtx);
```

### publishUserAccessTokenData method[​](#publishuseraccesstokendata-method "Direct link to publishUserAccessTokenData method")

This method lets you add a data publishing logic. Given below is the method signature.

```
public void publishUserAccessTokenData(OAuth2AccessTokenRespDTO oAuth2AccessTokenRespDTO);
```
