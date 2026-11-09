# Token data publishing

The WSO2 Identity Server provides OAuth Grant Handlers that let you define a data publishing logic for token related data. Based on the Grant Type of your token, you can use the following Grant Handlers to publish data:

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

For more information on these classes, see [Grant Handlers](/en/4.0.0/develop/java/grant-handlers/.md). All these Grant Handlers contain the `publishUserAccessTokenData` method.

### publishUserAccessTokenData method[​](#publishuseraccesstokendata-method "Direct link to publishUserAccessTokenData method")

This method lets you add a data publishing logic. Given below is the method signature.

```
public void publishUserAccessTokenData(OAuth2AccessTokenRespDTO oAuth2AccessTokenRespDTO);
```

* Inside this method, invoke the [`publishData` method](/en/4.0.0/develop/java/custom-data-publishing/.md#publishdata-method) in the `OBDataPublisherUtil` class to publish data. For more information, see [Custom Data Publishing](/en/4.0.0/develop/java/custom-data-publishing/.md).
