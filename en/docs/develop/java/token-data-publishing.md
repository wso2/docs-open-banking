The WSO2 Identity Server provides OAuth Grant Handlers that let you define a data publishing logic for token related 
data. Based on the Grant Type of your token, you can use the following Grant Handlers to publish data:

## OBAuthorizationCodeGrantHandler
  
This is an authorization code grant handler.
  
``` java
com.wso2.openbanking.accelerator.identity.grant.type.handlers.OBAuthorizationCodeGrantHandler
```

## OBClientCredentialsGrantHandler 

This is a client credentials grant handler.

``` java
com.wso2.openbanking.accelerator.identity.grant.type.handlers.OBClientCredentialsGrantHandler
```

## OBPasswordGrantHandler

This is a password grant handler.

``` java
com.wso2.openbanking.accelerator.identity.grant.type.handlers.OBPasswordGrantHandler
```

## OBRefreshGrantHandler

This is a refresh grant handler.
    
``` java
com.wso2.openbanking.accelerator.identity.grant.type.handlers.OBRefreshGrantHandler
```

For more information on these classes, see [Grant Handlers](grant-handlers.md). All these Grant Handlers contain the 
`publishUserAccessTokenData` method.

### publishUserAccessTokenData method

This method lets you add a data publishing logic. Given below is the method signature.

``` java
public void publishUserAccessTokenData(OAuth2AccessTokenRespDTO oAuth2AccessTokenRespDTO);
```

 - Inside this method, invoke the [`publishData` method](custom-data-publishing.md#publishdata-method) in the 
 `OBDataPublisherUtil` class to publish data. For more information, see [Custom Data Publishing](custom-data-publishing.md).