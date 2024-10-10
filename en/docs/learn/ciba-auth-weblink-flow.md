# Try out CIBA Auth WebLink Flow

CIBA Auth WebLink flow can be used to send the auth web link as a notification to the user's mobile device. User uses the weblink 
to go through the authentication and authorization flow. This flow can be used with multiple user authorization scenarios as well. Below are the main steps involved in the flow,

### Create an application [using DCR](dynamic-client-registration-try-out.md). Include the CIBA grant type in the DCR request object as follows:

   ``` json
     "grant_types": [
        "client_credentials",
        "authorization_code",
        "refresh_token",
        "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "urn:openid:params:grant-type:ciba"
      ],
   ```
### Initiate a consent.

### Sending CIBA Request

1. Invoke the CIBA request available in the [Postman collection](https://www.getpostman.com/collections/34a4fa4b9184ae3b4821). (`login_hint` parameter inside the request object is default set to identify the user's email, Behaviour of this value can be customised by extending the `CIBAWebLinkAuthenticator` class and overriding `getAuthenticatedUsers()` method. )

2. The response is as follows:

    ```json
    {
       "auth_req_id":"293c00d5-b318-484b-8f7a-54b1048a4832",
       "interval":2,
       "expires_in":3600
    }
    ```

3. At the same time, SMS notification with Auth WebLink should receive to user's mobile device. Click it and open in mobile browser.

4. Provide approval for the consent as guided by the application.

### Retrieving Access Token

1. After receiving the above response for the CIBA request, you can poll the token endpoint to get the
   access token. Until the user provides the approval via the auth flow in mobile browser, you will receive a response indicating
   pending authorization.

2. Once the user completes and submits the approval, the token will be returned.

## Assumptions
- User's mobile number should be configured.
- Users will receive the notification as web links to authenticate and authorize the consent.
- For multiple users involved scenarios, Identity server will assume only one user is authenticated (ID Token will contain the details of only one user (Ex: Primary user) ) and the OB consent tables will contain the authentication status of other users. (This user's identity can be customised by extending and overriding `OBCibaResponseTypeHandler.issue()` method.)

## Setting up flow

- Follow the [Quick Start Guide](../get-started/quick-start-guide.md) and set up the base products and accelerators.
- Open the `<IS_HOME>/repository/conf/deployment.toml` file:
- Add the following under the ` [[resource.access_control]]` tags:

     ``` toml
     [[resource.access_control]]
     context="(.*)/oauth2/ciba(.*)"
     secure="false"
     http_method="all"
     ```

- Register `urn:openid:params:grant-type:ciba` as a custom grant type:

     ``` toml
     [[oauth.custom_grant_type]]
     name="urn:openid:params:grant-type:ciba"
     grant_handler="com.wso2.openbanking.accelerator.identity.grant.type.handlers.OBCibaGrantHandler"
     grant_validator="org.wso2.carbon.identity.oauth.ciba.grant.CibaGrantValidator"

     [oauth.custom_grant_type.properties]
     IdTokenAllowed=true
     ```

- Add the following custom response type:

     ``` toml
     [[oauth.custom_response_type]]
     name = "cibaAuthCode"
     class = "com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBCibaResponseTypeHandler"
     validator = "com.wso2.openbanking.accelerator.identity.auth.extensions.response.validator.OBCibaResponseTypeValidator"
     ```   

- Add CIBA request object validator:

     ``` toml
     [oauth.oidc.extensions]
     ciba_request_object_validator="com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.OBCIBARequestObjectValidationExtension"
     ```

- Change consent steps in `<IS_HOME>/repository/conf/deployment.toml`, 
      - Add `com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.CIBAConsentPersistStep` , `com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.CIBAWebAuthLinkConsentPersistStep` and set its priority to 2 and 3. Update the priority of other steps accordingly.

     ``` toml
     [[open_banking.consent.authorize_steps.persist]]
     class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.CIBAConsentPersistStep"
     priority = 2
   
     [[open_banking.consent.authorize_steps.persist]]
     class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.CIBAWebAuthLinkConsentPersistStep"
     priority = 3
     ```

- Configuring **CIBA Web Link Authenticator**
      - This section provides sample configurations and resources to configure a service provider application to support both CIBA and redirect based flows such as `code id_token`.
      - **CIBA Web Link Authenticator** will send the auth weblinks to the users, Upon clicking these links will go through auth flow in the browser of user's mobile devices. 
      - Below two authenticator steps are needed to configure:
         - Step 1: Basic Authenticator - for all browser based authentication flows.
         - Step 2: CIBA Web Link Authenticator - for CIBA flow
     
       - Open `<IS_HOME>/repository/conf/deployment.toml` file and add the following configs:

                 ``` toml
                 [open_banking.sca.primaryauth]
                 name = "BasicAuthenticator"
                 display = "basic"
    
                 [open_banking.sca.idp]
                 name = "CIBA-Weblink"
                  ```

      - Open the `<IS_HOME>/repository/conf/common.auth.script.js` and update its content as follows:

  ```javascript
     var psuChannel = 'Online Banking';
     var isCiba;
     var isCibaWebLink;
   
     function onLoginRequest(context) {
     var responseType = context.request.params.response_type[0];
     var CIBAWebLinkParam = context.request.params.ciba_web_auth_link;
    
     if (responseType.indexOf("cibaAuthCode") >= 0) {
         isCiba = true;
     } else {
         isCiba = false;
     }

     if (CIBAWebLinkParam != null) {
         isCibaWebLink = true;
     } else {
         isCibaWebLink = false;
     }

     if (!isCiba) {
         executeStep(1, {
             onSuccess: function (context) {
                 publishAuthData(context, "AuthenticationSuccessful", {'psuChannel': psuChannel});
             },
             onFail: function (context) {
                 publishAuthData(context, "AuthenticationFailed", {'psuChannel': psuChannel});
             }
         });
     } else {
          if (isCibaWebLink) {
              executeStep(1, {
                 onSuccess: function (context) {
                     publishAuthData(context, "AuthenticationSuccessful", {'psuChannel': psuChannel});
                 },
                 onFail: function (context) {
                     publishAuthData(context, "AuthenticationFailed", {'psuChannel': psuChannel});
                 }
             });
          } else {
              executeStep(2, {
                 onSuccess: function (context) {
                     publishAuthData(context, "AuthenticationSuccessful", {'psuChannel': psuChannel});
                 },
                 onFail: function (context) {
                     publishAuthData(context, "AuthenticationFailed", {'psuChannel': psuChannel});
                 }
             });
          }
      }
     }
  ```

- Adding SMS Notification provider configurations.
      - Accelerator default uses the SMSNotificationProvider to send the Auth WebLink to the user's mobile phone. However, this can be customised by creating `CustomNotificationProvider` by implementing `NotificationProvider`.
      - Below are the default configurations to be added in `<IS_HOME>/repository/conf/deployment.toml` file to send the Auth WebLink via SMS.

```toml
[[event_handler]]
name= "cibaWebLinkNotificationHandler"
subscriptions =["CIBA_WEBLINK_NOTIFICATION_EVENT"]

[open_banking.identity.ciba.auth_web_link]
# allowed_auth_url_parameters parameter is used to filter the Auth WebLink URL parameters.
allowed_auth_url_parameters = ["client_id", "scope", "response_type", "nonce", "redirect_uri", "binding_message"]
# redirect_endpoint config defines the user's succesfull authorisations redirect endpoint. This page displays the succesful CIBA flow completions.
redirect_endpoint = "https://localhost:9446/authenticationendpoint/ciba.jsp"
# custom `NotificationProvider` extention can be added using below config.
notification_provider = "com.wso2.openbanking.accelerator.consent.extensions.ciba.authenticator.weblink.notification.provider.SMSNotificationProvider"

[open_banking.identity.ciba.auth_web_link.sms_notification]
# SMS service URL is added below.
sms_url = "https://localhost:9446/sample/sms/service"
# SMS service request headers can be defined as below.
[[open_banking.identity.ciba.auth_web_link.sms_notification.header]]
name = "Accept"
value = "application/json"
[[open_banking.identity.ciba.auth_web_link.sms_notification.header]]
name = "Authorization"
value = "**"
```

- Adding sample redirect endpoint.
    - After successful authorisation user should be redirected to a page which displays the user to return back to originating device (Ex: PoS device).
    - Download the `ciba.jsp` file available <a href="../../assets/attachments/ciba.jsp" download> here </a>.
    - Copy this file to `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint` location.

- **CIBA Web Link Authenticator** contains below methods to override in-order for customisations.
    - `generateWebAuthLink()` - Can be used to generate customised auth webLink URLs.
    - `getAuthenticatedUsers()` - Can be used to customise identifying the users based on the login_hint parameter.

- **SMSNotificationProvider** contains below methods to override in-order for customisations.
    - `setHeaders()` - Can be used to set custom headers in SMS service request.
    - `getPayload()` - Can use to send custom payload via an SMS.

### Multi auth user flows.

For example of multi authorisation flow, we can think joint account scenario where all the users need to approve the consent. Below steps are mainly involved for multi auth user flows,

- Sending CIBA request with login_hint.
- Identifying multiple users involved in the CIBA request using the given `login_hint`.
- Sending auth weblinks via SMS for **each** user.
- Access token can **only** be retrieved after all users have approved the consents.
- Currently `getAuthenticatedUsers()` method is identifying list of users (Ex: `admin@wso2.com, ann@wso2.com`) , However this can be customised to identify users based on any input (Ex: Bank account number etc.)