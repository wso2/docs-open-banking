# JWT Secured Authorization Response Mode (JARM) for OAuth 2.0

WSO2 Open Banking adheres to the [JWT Secured Authorization Response Mode for OAuth 2.0 (JARM) specification](https://bitbucket.org/openid/fapi/src/master/oauth-v2-jarm.md),
which defines a new JWT-based mode to encode OAuth authorization responses.

!!!info
    This is only available as a WSO2 Update from **WSO2 Identity Server Level 6.0.0.96** onwards. For more information
    on updating, see [Updating WSO2 Products](https://updates.docs.wso2.com/en/latest/).

## Enabling JARM for WSO2 Open Banking

By default, JARM response modes are not enabled in WSO2 Open Banking. To enable JARM, follow the steps below:

1. Open the `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/repository/conf/deployment.toml` file.

2. Add the following configurations:

    ```toml
    [oauth.jarm]
    jarm_response_jwt_validity = 7200
    
    [[oauth.response_mode]]
    name = "jwt"
    class = "org.wso2.carbon.identity.oauth2.responsemode.provider.jarm.impl.JwtResponseModeProvider"
    
    [[oauth.response_mode]]
    name = "query.jwt"
    class = "org.wso2.carbon.identity.oauth2.responsemode.provider.jarm.impl.QueryJwtResponseModeProvider"
    
    [[oauth.response_mode]]
    name = "fragment.jwt"
    class = "org.wso2.carbon.identity.oauth2.responsemode.provider.jarm.impl.FragmentJwtResponseModeProvider"
    
    [[oauth.response_mode]]
    name = "form_post.jwt"
    class = "org.wso2.carbon.identity.oauth2.responsemode.provider.jarm.impl.FormPostJwtResponseModeProvider"
    ```

For more information on JARM, see the [JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)](https://is.docs.wso2.com/en/6.0.0/references/concepts/authorization/jarm) documentation.