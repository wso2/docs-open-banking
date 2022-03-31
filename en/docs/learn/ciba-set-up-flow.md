!!! tip "Before you begin:"
    1. Follow the [Quick Start Guide](../get-started/quick-start-guide.md) and set up the base products and accelerators.
  
    2. Upload the root and issuer certificates in OBIE ([Sandbox certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox)/
    [Production certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/80544075/OB+Root+and+Issuing+Certificates+for+Production))
    to the client trust stores in `<APIM_HOME>/repository/resources/security/client-truststore.jks` and
    `<IS_HOME>/repository/resources/security/client-truststore.jks` using the following command:

           ```
           keytool -import -alias <alias> -file <certificate_location> -storetype JKS -keystore <truststore_location> -storepass wso2carbon
           ```

    3. Restart the Identity Server and API Manager instances. 


1. Update the keystore of the Identity Server to establish communication between the server and the mobile phone.
   - To communicate with devices in the same local network, use the IP of each device.
   - Update the keystore certificate with private IP of the Identity Server as the Subject Alternative Name (SAN). 
   - Create a new keystore at `<IS_HOME>/repository/resources/security` and use the IP you configured above. For example:

    ``` 
    keytool -genkey -alias wso2carbon -keyalg RSA -keystore wso2carbon.jks -keysize 2048 -ext SAN="IP:192.168.8.193,DNS:localhost"
    ```
   
2. Export the public key from the new keystore

    ``` 
    keytool -exportcert -alias wso2carbon -keystore wso2carbon.jks -rfc -file wso2carbon.pem
    ```

3. Import the above public certificate to the truststore of Identity Server and API Manager.

    ``` 
    keytool -import -alias wso2is -file wso2carbon.pem -keystore client-truststore.jks -storepass wso2carbon
    ```

4. Deploy the [Dynamic Client Registration (DCR) API](dynamic-client-registration-try-out.md) and change the endpoint 
configuration with the IP address of the Identity Server.

    - When [Configuring IS as Key Manager](dynamic-client-registration-try-out.md##step-2-configure-is-as-key-manager), 
      change the hostnames of the URLs to the IP address above.
    - Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    - Update the following configuration with the JWKS URL of the certificates that you will use to sign the SSA for DCR.
    
      ``` toml
      [open_banking.dcr]
      jwks_url_sandbox = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/ykNOgWd2RgnuoLRRyWBkaY.jwks"
      jwks_url_production = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/ykNOgWd2RgnuoLRRyWBkaY.jwks"
      ```

## Configuring CIBA Push Authenticator

1. Go to the `<IS_HOME>/repository/deployment/server/webapps/api/WEB-INF` directory.
2. Open the `beans.xml` file and add the following `import resource` and `bean class` tags:
    
    ``` xml
    <beans ...>
        ...
        <import resource="classpath:META-INF/cxf/user-push-device-handler-v1-cxf.xml"/>
        <jaxrs:server id="users" address="/users/v1">
            <jaxrs:serviceBeans>
               ...
               <bean class="org.wso2.carbon.identity.api.user.push.device.handler.v1.MeApi"/>
            </jaxrs:serviceBeans>
        </jaxrs:server>
    </beans>
    ```

3. Open the `<IS_HOME>/repository/conf/deployment.toml` file and add the following under the ` [[resource.access_control]]` tags:

    - Locate the following tags and add `OAuthAuthentication` under `allowed_auth_handlers`:
    
       ``` toml
       [[resource.access_control]]
       context = "(.*)/api/users/v1/me/push-auth/(.*)"
       secure="true"
       http_method="GET, HEAD, POST, PUT, DELETE, PATCH"
       allowed_auth_handlers = ["BasicAuthentication", “OAuthAuthentication”]
       ```

    - Add the following tags:

       ``` toml
       [[resource.access_control]]
       context = "(.*)/push-auth/discovery-data"
       secure="true"
       http_method="GET"
       allowed_auth_handlers = ["BasicAuthentication","OAuthAuthentication"]
       ```

4. Change consent steps in `<IS_HOME>/repository/conf/deployment.toml` as follows:

    - Add `com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.CIBAConsentRetrievalStep` and set its 
      priority to 2. Update the priority of other steps accordingly.
   
    - Change the priority of `com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.CIBAConsentPersistStep`
    to 1. Update the priority of other steps accordingly.
    
           ``` toml
           #================consent management==============
           [[open_banking.consent.authorize_steps.retrieve]]
           class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.NonRegulatoryConsentStep"
           priority = 1
    
           [[open_banking.consent.authorize_steps.retrieve]]
           class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.CIBAConsentRetrievalStep"
           priority = 2
    
           [[open_banking.consent.authorize_steps.retrieve]]
           class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.DefaultConsentRetrievalStep"
           priority = 3
    
           [[open_banking.consent.authorize_steps.persist]]
           class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.CIBAConsentPersistStep"
           priority = 1
    
           [[open_banking.consent.authorize_steps.persist]]
           class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.DefaultConsentPersistStep"
           priority = 2
           ```

5. Create a database table for Push Authentication:

    - Execute the following SQL against the `openbank_apimgtdb` database, which is used as the identity database:
    

        ```sql tab="MySQL"
        CREATE TABLE IF NOT EXISTS PUSH_AUTHENTICATION_DEVICE (
        ID VARCHAR(255) NOT NULL,
        USER_ID VARCHAR(255) NOT NULL,
        NAME VARCHAR(45) NOT NULL,
        MODEL VARCHAR(45) NOT NULL,
        PUSH_ID VARCHAR(255) NOT NULL,
        PUBLIC_KEY VARCHAR(2048) NOT NULL,
        REGISTRATION_TIME TIMESTAMP,
        LAST_USED_TIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (USER_ID, PUSH_ID));
        ```

## Configuring CIBA 

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file:

2. Add the following under the ` [[resource.access_control]]` tags:

     ``` toml
     [[resource.access_control]]
     context="(.*)/oauth2/ciba(.*)"
     secure="false"
     http_method="all"
     ```
   
3. Register `urn:openid:params:grant-type:ciba` as a custom grant type:

     ``` toml
     [[oauth.custom_grant_type]]
     name="urn:openid:params:grant-type:ciba"
     grant_handler="org.wso2.carbon.identity.oauth.ciba.grant.CibaGrantHandler"
     grant_validator="org.wso2.carbon.identity.oauth.ciba.grant.CibaGrantValidator"

     [oauth.custom_grant_type.properties]
     IdTokenAllowed=true
     ```

4. Add the following custom response type:

     ``` toml
     [[oauth.custom_response_type]]
     name = "cibaAuthCode"
     class = "org.wso2.carbon.identity.oauth.ciba.handlers.CibaResponseTypeHandler"
     validator = "org.wso2.carbon.identity.oauth.ciba.handlers.CibaResponseTypeValidator"
     ```   

5. Add CIBA request object validator

     ``` toml
     [oauth.oidc.extensions]
     ciba_request_object_validator="com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.OBCIBARequestObjectValidationExtension"
     ```
   
6. Restart the servers to reflect the changes. 

## Configuring Push Authenticator IDP

1. Log in to the Identity Server Management Console at `https://<IS_HOST>:9446/carbon` as an admin user.
2. Go to **Identity Providers > Add**.
3. Register a new IDP for Push Authentication. Use the name **CIBA-Push-Auth**.
4. Go to **Federated Authenticators > CIBA Push Authentication Configuration** and enable the Push Authenticator.
5. IDP configurations:
   - Firebase Server Key: Create an [FCM project](https://fcm.googleapis.com/fcm/send) when setting up the mobile 
   application. Add the Server Key of that application here. You can obtain it from the 
   [Firebase Console](https://console.firebase.google.com) of your project.

Now, this Push Authenticator (CIBA-Push-Auth) is available as a federated authenticator option inside any Service Provider 
application in the Identity Server. 

!!! tip
    Refer to the Postman collection [here](https://www.getpostman.com/collections/34a4fa4b9184ae3b4821), for sample 
    requests in the Accounts Information Service API.

## Configuring Authenticator 

This section provides sample configurations and resources to configure a service provider application to support both 
CIBA and redirect based flows such as code.  

!!! note
    If an application uses only the CIBA flow, set up **Push Authenticator** as the authenticator for the service provider.

In this example two authenticator steps are configured:

   - Step 1: Basic Authenticator - for Code flow
   - Step 2: Push Authenticator - for CIBA flow
   
<br/>

1. Open `<IS_HOME>/repository/conf/deployment.toml` file and add the following configs:

    ``` toml
    [open_banking.sca.primaryauth]
    name = "BasicAuthenticator"
    display = "basic"
    
    [open_banking.sca.idp]
    name = "CIBA-Push-Auth"
    ```

2. Open the `<IS_HOME>/repository/conf/common.auth.script.js` and update its content as follows:

    ```javascript
    var psuChannel = 'Online Banking';
    var isCiba;
     
    function onLoginRequest(context) {
       var responseType = context.request.params.response_type[0];
     
       if (responseType.indexOf("code") >= 0) {
           isCiba = false;
       } else {
           isCiba = true;
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
    ```

You can configure authentication steps according to your requirements. For more information see 
[Configuring authentication steps by customizing Application Management Listener](../develop/customize-authentication-steps.md).

## Creating an application with DCR

 Create an application [using DCR](dynamic-client-registration-try-out.md). Include the CIBA grant type in the DCR 
 request object as follows: 

   ``` json
     "grant_types": [
        "client_credentials",
        "authorization_code",
        "refresh_token",
        "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "urn:openid:params:grant-type:ciba"
      ],
   ```
   
!!! tip 
    Refer to the Postman collection [here](https://www.getpostman.com/collections/34a4fa4b9184ae3b4821), for sample
    requests in the Accounts Information Service API.

## Trying out CIBA flow

1. Before you begin, install the mobile application on a device. Then, register the device in the Identity Server under 
the user of that device/account.

2. To try out the flow with a sample application provided by WSO2, follow 
[Try out CIBA with a sample React Native app](ciba-with-sample-react-native-app.md).

3. To develop a mobile application for CIBA, follow the 
[Develop a mobile application for CIBA](../develop/mobile-application-for-ciba.md) documentation.

### Sending Push Authentication Request

1. Use the push-authentication sample request available in the 
[Postman collection](https://www.getpostman.com/collections/34a4fa4b9184ae3b4821) and invoke the endpoint.

2. The response is as follows:

    ```json
    {
       "auth_req_id":"293c00d5-b318-484b-8f7a-54b1048a4832",
       "interval":2,
       "expires_in":3600
    }
    ```
   
3. At the same time, a notification should pop up on your mobile device. Open it via your mobile application.

4. The application will make the consent retrieval and consent persistence requests to obtain and persist consent data.

5. Provide approval for the consent as guided by the application. 

### Retrieving Access Token 

1. After receiving the above response for the Push Authentication Request, you can poll the token endpoint to get the 
access token. Until the user provides the approval via the mobile device, you will receive a response indicating 
awaiting authorization.

2. Once the user completes and submits the approval, the token will be returned.


