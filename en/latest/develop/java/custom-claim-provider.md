# Custom Claim Provider

Deprecated Documentation

This feature is **deprecated** and is only intended for migrating customers. Please transition to the **OpenAPI based extensions** for all new implementations.

## Writing a custom claim provider[​](#writing-a-custom-claim-provider "Direct link to Writing a custom claim provider")

The `OBClaimProvider` class is an extension that lets you customize and create your own claim provider and add additional claims to the authorization and/or token responses. You can add any claims according to your open banking requirements.

```
com.wso2.openbanking.accelerator.identity.claims.OBClaimProvider
```

To customize claims, override relevant methods of this class. Given below is a brief description of each method.

### getAdditionalClaims method - Authorization response[​](#getadditionalclaims-method-authorization-response "Direct link to getAdditionalClaims method - Authorization response")

This method lets you add additional claims to the authorization response. Given below is the method signature.

```
@Override

public Map < String, Object > getAdditionalClaims(OAuthAuthzReqMessageContext authAuthzReqMessageContext,

  OAuth2AuthorizeRespDTO authorizeRespDTO)

throws IdentityOAuth2Exception;
```

Click here to see a sample implementation:

Given below is a sample implementation of the `getAdditionalClaims` method. You can add the required claims to a map and return it as follows:

```
@Override

public Map < String, Object > getAdditionalClaims(OAuthAuthzReqMessageContext authAuthzReqMessageContext,

  OAuth2AuthorizeRespDTO authorizeRespDTO)

throws IdentityOAuth2Exception {



  Map < String, Object > claims = new HashMap < > ();

  //auth_time claim indicates the time when authentication occurs

  claims.put(AUTH_TIME_CLAIM, authAuthzReqMessageContext.getCodeIssuedTime());



  return claims;



}
```

### getAdditionalClaims method - Access token response[​](#getadditionalclaims-method-access-token-response "Direct link to getAdditionalClaims method - Access token response")

This method lets you add additional claims to the access token response. Given below is the method signature.

```
@Override

public Map < String, Object > getAdditionalClaims(OAuthTokenReqMessageContext tokenReqMessageContext,

  OAuth2AccessTokenRespDTO tokenRespDTO)

throws IdentityOAuth2Exception;
```

Once implemented, build a JAR file for your custom claim provider and place it in the `<IS_HOME>/repository/components/dropins` directory.

## Configuring a custom claim provider[​](#configuring-a-custom-claim-provider "Direct link to Configuring a custom claim provider")

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
2. Add the following tags and configure your custom claim provider using its Fully Qualified Name (FQN) :

```
[open_banking.identity.extensions]

claim_provider="com.wso2.openbanking.accelerator.identity.claims.OBDefaultClaimProvider"
```

## Configuring Claims for an Identity Provider[​](#configuring-claims-for-an-identity-provider "Direct link to Configuring Claims for an Identity Provider")

Configuring claims for an identity provider involves mapping the claims available in the identity provider to claims that are local to the WSO2 Identity Server. This is done so that the Identity Server can identify the user attributes in the response sent from the identity provider.

For more information, see [Configuring Claims for an Identity Provider](https://is.docs.wso2.com/en/5.9.0/learn/configuring-claims-for-an-identity-provider/#configuring-claims-for-an-identity-provider) in WSO2 Identity Server documentation.
