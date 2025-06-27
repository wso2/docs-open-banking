This page explains how to onboard API consumers using the Manual Client Registration. 

## Set up WSO2 Open Banking APIM Artifacts

1. Download and extract the latest Open Banking Accelerator 4.0.0 APIM Artifacts. 

    - Current latest version [4.1.0](https://github.com/wso2/financial-services-accelerator/releases/tag/v4.1.0).
              
2. WSO2 Open Banking AM Accelerator contains the following artifacts: 
   
    - org.wso2.financial.services.accelerator.common-4.1.0.jar
    - org.wso2.financial.services.accelerator.keymanager-4.1.0.jar

3. Download the configuration files from the locations given below.

    - [financial-services.xml.j2](https://github.com/wso2/financial-services-accelerator/blob/main/financial-services-accelerator/accelerators/fs-apim/carbon-home/repository/resources/conf/templates/repository/conf/financial-services.xml.j2)
    - [financial-services.xml](https://github.com/wso2/financial-services-accelerator/blob/main/financial-services-accelerator/accelerators/fs-apim/carbon-home/repository/conf/financial-services.xml)

4. Copy the downloaded artifacts to the respective directories of the base product. Use the table to locate the respective directories of the base products:

| File                                                           | Directory location to place the artifact                          |
|----------------------------------------------------------------|-----------------------------------------------------------------  |
| `org.wso2.financial.services.accelerator.common-4.0.0.jar`     | `<APIM_HOME>/repository/components/dropins`                       |
| `org.wso2.financial.services.accelerator.keymanager-4.0.0.jar` | `<APIM_HOME>/repository/components/dropins`                       |
| `financial-services.xml.j2`                                    | `<APIM_HOME>/repository/resources/conf/templates/repository/conf` |
| `financial-services.xml`                                       | `<APIM_HOME>/repository/conf`       |

## Configuring Additional Attributes

Before creating the application, need to enable the additional fields from the DevPortal. To enable additional fields follow the below steps.
 
1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
2. Follow the given format and configurate all additional properties:
    
    ``` toml
    [[financial_services.keymanager.application.type.attributes]]
    name="regulatory"
    label="Regulatory Application"
    type="select"
    tooltip="Is this a Regulatory Application?"
    values="true,false"
    default=""
    required="true"
    mask="false"
    multiple="false"
    priority="1"

    [[financial_services.keymanager.application.type.attributes]]
    name = "sp_certificate"
    label="Application Certificate"
    type="input"
    tooltip="Application Certificate - Mandatory if private_key_jwt Token method is selected"
    default=""
    required="false"
    mask="false"
    multiple="false"
    priority="2"
    ```

3. The configured properties will be available to fill in the Developer Portal when creating an API consumer/TPP application.

4. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

5. Change the following config to false to disable FAPI.
    ```
    [oauth.dcr]
    enable_fapi_enforcement=false
    ```

## Configure IS as Key Manager

### Configure WSO2 Identity Server 7.1.0

1. Add following configurations in the `<IS_HOME>/repository/conf/deployment.toml` file.

    ```
    [[event_listener]]
    id = "token_revocation"
    type = "org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
    name = "org.wso2.is.notification.ApimOauthEventInterceptor"
    order = 1

    [event_listener.properties]
    notification_endpoint = "https://<APIM_HOST>:<APIM_PORT>/internal/data/v1/notify"
    username = "${admin.username}"
    password = "${admin.password}"
    'header.X-WSO2-KEY-MANAGER' = "WSO2-IS"
    ```

2. Download [notification.event.handlers-2.0.5.jar](https://maven.wso2.org/nexus/content/repositories/releases/org/wso2/km/ext/wso2is/wso2is.notification.event.handlers/2.0.5/wso2is.notification.event.handlers-2.0.5.jar) and add it to `<IS_HOME>/repository/components/dropins` folder.

3. Restart the IS server

### Configure Key Manager in WSO2 API Manager

1. Sign in to the Admin Portal of API Manager at `https://<APIM_HOSTNAME>:9443/admin` using admin credentials.

2. Go to Key Managers on the left main menu. Click on **Add Key Manager** button.
    ![add-key-manager](../../assets/img/learn/mcr/custom-km/add-key-manager.png)

3. Enter a Name and Display Name, and select **fsKeyManager** as the Key Manager Type.
    ![key-manager-basic-details](../../assets/img/learn/mcr/custom-km/key-manager-basic-details.png)

4. Enter the **Well-known-url** and **Issuer** as below.

    | Field | Value |
    | ----- | ----- |
    | Well-known-url | `https://<IS_HOSTNAME>:9446/oauth2/token/.well-known/openid-configuration` |
    | Issuer | `https://<IS_HOSTNAME>:9446/oauth2/token` |

5. Under the **Key Manager Endpoints** section, provide the following values:

    !!! note
        You can use `https://<IS_HOSTNAME>:9446/oauth2/token/.well-known/openid-configuration` as the Well-known URL, and click on Import to populate most of the fields mentioned below, Grant types, and the Certificates section. 

        If the Import button is used, verify all the auto imported values with the onces mentioned below.


    | Configuration | Values |
    | ------------- | ------ |
    | Issuer | `https://<IS_HOSTNAME>:9446/oauth2/token` |
    | Client Registration Endpoint | `https://<IS_HOSTNAME>:9446/api/identity/oauth2/dcr/v1.1/register` |
    | Introspection Endpoint | `https://<IS_HOSTNAME>:9446/oauth2/introspect` |
    | Token Endpoint | `https://<IS_HOSTNAME>:9446/oauth2/token` |
    | Display Token Endpoint | `https://<IS_HOSTNAME>:9446/oauth2/token` |
    | Revoke Endpoint | `https://<IS_HOSTNAME>:9446/oauth2/revoke` |
    | Display Revoke Endpoint | `https://<IS_HOSTNAME>:9446/oauth2/revoke` |
    | UserInfo Endpoint | `https://<IS_HOSTNAME>:9446/scim2/Me` |
    | Authorize Endpoint | `https://<IS_HOSTNAME>:9446/oauth2/authorize` |
    | Scope Management Endpoint | `https://<IS_HOSTNAME>:9446/api/identity/oauth2/v1.0/scopes` |

6. Under **Grant types**, provide all the following: 
    - Client_credentials
    - Refresh_token
    - Authorization_code
    - urn:ietf:params:oauth:grant-type:jwt-bearer
    
7. Under the **Certificates** section, select JWKS. Enter `https://<IS_HOSTNAME>:9446/oauth2/jwks` as the URL.

8. Under **Connector Configurations**, provide the following values:

    | Configuration | Values |
    | ------------- | ------ |
    | Username | Authorization server admin username |  
    | Password | Authorization server admin password |
    | WSO2 Identity Server 7 API Resource Management Endpoint | `https://<IS_HOSTNAME>:9446/api/server/v1/api-resources` |
    | WSO2 Identity Server 7 Roles Endpoint | `https://<IS_HOSTNAME>:9446/scim2/v2/Roles` |

9. Enable the Role creation is WSO2 Identity Server 7 as by ticking as below.
    ![enable-role-validation](../../assets/img/learn/mcr/custom-km/enable-role-validation.png)

10. Set **Key Manager Permission** to **Public**.
    ![km-permisiion](../../assets/img/learn/mcr/custom-km/km-permisiion.png)

11. Under **Advanced Configuration**, provide the following values:

    | Configuration | Values |
    | ------------- | ------ |
    | Token Generation | Tick (Mandatory) |
    | Out Of Band Provisioning | Tick (Mandatory) |     
    | Oauth App Creation | Tick (Mandatory)
    | Token Validation Method | Self Validate JWT |
    | Token Handling Options (Optional) | JWT |

12. Click on **Add** button to create the Key Manager. Key Manager will be displayed as below.
    ![km-both-enabled](../../assets/img/learn/mcr/custom-km/km-both-enabled.png)

13. Disable the Resident Key Manager.
    ![km-display](../../assets/img/learn/mcr/custom-km/km-display.png)

## Create Application using Manual Client Registration

### Step 1: Sign up as a TPP

1. Go to the Developer portal at `https://<APIM_HOST>:9443/devportal`.

2. Go to the **Applications** tab. <br/> ![applications_tab](../../assets/img/learn/mcr/applications-tab.png)

3. In the Sign-in form, click **Create Account**. <br/> ![sign_in](../../assets/img/learn/mcr/sign-in-form.png)

4. Provide a username and click **Proceed Self Register**. <br/> ![start_signing_in](../../assets/img/learn/mcr/start-signing-up.png) <br/>

5. Fill out the **Create New Account** form to complete registration.

6. Read terms and conditions and click the checkbox to agree to the terms and conditions. <br/>![terms_conditions](../../assets/img/learn/mcr/read-the-policies.png)

7. Click Register.

### Step 2: Sign in to the Developer Portal as the TPP

1. Now, sign in to the [Developer portal](https://<APIM_HOST>:9443/devportal) as the TPP.

2. Enter the username and the password you entered when signing up as a TPP.

3. Click Continue. Now, you are on the home page of the Developer Portal.

### Step 3: Create an application

1. In the Developer Portal, go to the Applications tab. ![applications_tab](../../assets/img/learn/mcr/applications-tab.png)

2. Click **ADD NEW APPLICATION**. [applications_tab](../../assets/img/learn/mcr/create-new-application.png)  

3. Enter the following application details.  ![applications_details](../../assets/img/learn/mcr/enter-application-details.png)

4. Click **SAVE**. The Developer Portal displays the created application as follows: ![created_application](../../assets/img/learn/mcr/created-application.png)

 
The application created via the Developer Portal allows you to observe statistics of APIs, subscribe to APIs, and access the subscribed APIs.

### Step 4: Subscribe to API

1. Go to the APIs tab in the Developer portal.![click_apis](../../assets/img/learn/mcr/click-apis.png)

2. Select the API. ![select_api](../../assets/img/learn/mcr/select-api.png)

3. Go to **Subscriptions** at the bottom of the API and select **SUBSCRIBE**.

4. Select **your application** from the drop-down list then set the **Throttling Policy** and click **SUBSCRIBE**. Once subscribed, the application can access all the supported services of the API resources.

### Step 5: Generate keys

The TPP application requires a Client ID (Consumer Key) to access the subscribed API.

1. Go to the **Applications** tab in the Developer Portal.

2. From the application list, select your application, which has subscribed to the API.

3. Select **Production Keys** > **OAuth2 Tokens or Sandbox Keys** > **OAuth2 Tokens** according to the type of key you require:
    a. Production Keys: Generates access tokens in the production environment.
    b. Sandbox Keys: Generates access tokens in the sandbox environment. 
     ![generate_keys](../../assets/img/learn/mcr/generate-keys.png)

4. Provide the requested information as defined below:

    | Field | Description |
    |-------|-------------|
    | Grant Types | Determine the credentials that are used to generate the access token. <ul> <li> Code: Relates to the authorisation code grant type and is applicable when consuming the API as a user. **It is mandatory to select the code grant type for regulatory applications.** </li> <li> Client Credentials: Relates to the client credentials grant type and is applicable when consuming the API as an application. </li> <li> Refresh Token: To renew an expired access token. </li> </ul> |
    | Callback URL | The URL used by the TPP to receive the authorization code sent from the bank. The authorisation code can be used later to generate an OAuth2 access token. <br/> **This is a mandatory field for the authorization code grant type.** |
    | Enable PKCE | Enable if you want to enable PKCE support for your application |
    | Support PKCE Plain text | Enable if you want to enable PKCE Plain Text support for your application |
    | Application Certificate | This is the content of the application certificate (.PEM). For Regulatory applications, it is mandatory to use an application certificate |
    | Regulatory Application | The type of application. If your application complies with the Open Banking Regulation, it is a Regulatory application. |

    ![enter_application_details](../../assets/img/learn/mcr/enter-application-details-1.png)

    ![enter_application_details](../../assets/img/learn/mcr/enter-application-details-2.png)

5. Click **GENERATE KEYS** to generate production or sandbox keys.

6. It generates the consumer key and consumer secret and displays them at the top of the page.

    ![generated-keys](../../assets/img/learn/mcr/generated-keys.png)
