##Writing a Custom Response Type Handler

The Response Type handler contains an extension. According to your requirements, you can extend and override the methods 
in the `OBResponseTypeHandler` class to support the following functions:

   - Set a new refresh token validity period
   - Set a new scope

!!!tip "Before you begin:"
    - Make sure the following configurations exist in `<IS_HOME>/repository/conf/deployment.toml`:
    ``` xml
    [[oauth.custom_response_type]]
    name = "code"
    class = "com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBCodeResponseTypeHandlerExtension"
    
    [[oauth.custom_response_type]]
    name = "code id_token"
    class = "com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBHybridResponseTypeHandlerExtension"
    ```

To write a custom Response Type handler, extend the following class:
``` java
com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBResponseTypeHandler
```
To extend the validation capabilities according to your requirements, override relevant methods of this class. Given 
below is a brief description of each method.

###updateRefreshTokenValidityPeriod method
This method allows you to set validity period for the refresh tokens. For example:
``` java
public long updateRefreshTokenValidityPeriod(OAuthAuthzReqMessageContext oAuthAuthzReqMessageContext) {
return 3600;
}
```

###updateApprovedScopes method
This method lets you set a new scope to the authorization request. See the below example to append any prefix to the scope,
``` java
public String[] updateApprovedScopes(OAuthAuthzReqMessageContext oAuthAuthzReqMessageContext) {
  String[] scopes = oAuthAuthzReqMessageContext.getApprovedScope()
  String sessionDataKey = oAuthAuthzReqMessageContext.getAuthorizationReqDTO().getSessionDataKey();
  String consentID = getConsentIDFromSessionData(sessionDataKey);
  if (consentID.isEmpty()) {
    log.error("Consent-ID retrieved from request object claims is empty");
    return scopes;
  }
  String consentScope = OB_CONSENT_ID_PREFIX + consentID;
  String[] updatedScopes = (String[]) ArrayUtils.addAll(scopes, new String[] {
    consentScope
  });
  if (log.isDebugEnabled()) {
    log.debug("Updated scopes: " + Arrays.toString(updatedScopes));
  }
  return updatedScopes;
}
```

##Configuring a custom Response Type handler
1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
2. Add the following tag and configure the classpath of the extended class.
``` xml
[open_banking.identity.extensions]
response_type_handler="your.extended.class.class"
```
