# Using Manual Client Registration Flow

This page explains how to onboard API consumers using the Manual Client Registration.

Before you begin:

See the [Configurations](/en/latest/learn/manual-client-registration-configuration/.md) section and configure Manual Client Registration.

## Configure FS Key Manager in WSO2 API Manager[​](#configure-fs-key-manager-in-wso2-api-manager "Direct link to Configure FS Key Manager in WSO2 API Manager")

1. Sign in to the Admin Portal of API Manager at `https://<APIM_HOSTNAME>:9443/admin` using admin credentials.

2. Go to Key Managers on the left main menu. Click on **Add Key Manager** button. ![add-key-manager](/en/latest/assets/images/add-key-manager-7af041047f9f9769e14fd3ffb3f19223.png)

3. Enter a Name and Display Name, and select **fsKeyManager** as the Key Manager Type. ![key-manager-basic-details](/en/latest/assets/images/key-manager-basic-details-c9bc5243ca0c1604713bc14c259ba47d.png)

4. Enter the **Well-known-url** and **Issuer** as below.

   | Field          | Value                                                                      |
   | -------------- | -------------------------------------------------------------------------- |
   | Well-known-url | `https://<IS_HOSTNAME>:9446/oauth2/token/.well-known/openid-configuration` |
   | Issuer         | `https://<IS_HOSTNAME>:9446/oauth2/token`                                  |

5. Under the **Key Manager Endpoints** section, provide the following values:

   note

   You can use `https://<IS_HOSTNAME>:9446/oauth2/token/.well-known/openid-configuration` as the Well-known URL, and click on Import to populate most of the fields mentioned below, Grant types, and the Certificates section.

   If the Import button is used, verify all the auto imported values with the ones mentioned below.

   | Configuration                | Values                                                             |
   | ---------------------------- | ------------------------------------------------------------------ |
   | Issuer                       | `https://<IS_HOSTNAME>:9446/oauth2/token`                          |
   | Client Registration Endpoint | `https://<IS_HOSTNAME>:9446/api/identity/oauth2/dcr/v1.1/register` |
   | Introspection Endpoint       | `https://<IS_HOSTNAME>:9446/oauth2/introspect`                     |
   | Token Endpoint               | `https://<IS_HOSTNAME>:9446/oauth2/token`                          |
   | Display Token Endpoint       | `https://<IS_HOSTNAME>:9446/oauth2/token`                          |
   | Revoke Endpoint              | `https://<IS_HOSTNAME>:9446/oauth2/revoke`                         |
   | Display Revoke Endpoint      | `https://<IS_HOSTNAME>:9446/oauth2/revoke`                         |
   | UserInfo Endpoint            | `https://<IS_HOSTNAME>:9446/scim2/Me`                              |
   | Authorize Endpoint           | `https://<IS_HOSTNAME>:9446/oauth2/authorize`                      |
   | Scope Management Endpoint    | `https://<IS_HOSTNAME>:9446/api/identity/oauth2/v1.0/scopes`       |

6. Under **Grant types**, provide all the following:

   * Client\_credentials
   * Refresh\_token
   * Authorization\_code
   * urn:ietf:params:oauth:grant-type
     <!-- -->
     :jwt-bearer

7. Under the **Certificates** section, select JWKS. Enter `https://<IS_HOSTNAME>:9446/oauth2/jwks` as the URL.

8. Under **Connector Configurations**, provide the following values:

   | Configuration                                           | Values                                                   |
   | ------------------------------------------------------- | -------------------------------------------------------- |
   | Username                                                | Authorization server admin username                      |
   | Password                                                | Authorization server admin password                      |
   | WSO2 Identity Server 7 API Resource Management Endpoint | `https://<IS_HOSTNAME>:9446/api/server/v1/api-resources` |
   | WSO2 Identity Server 7 Roles Endpoint                   | `https://<IS_HOSTNAME>:9446/scim2/v2/Roles`              |

9. Enable the Role creation in WSO2 Identity Server 7 by ticking as below. ![enable-role-validation](/en/latest/assets/images/enable-role-validation-85b6757fe609918d43fe58135e97af1a.png)

10. Set **Key Manager Permission** to **Public**. ![km-permisiion](/en/latest/assets/images/km-permisiion-249ae3a3ea0394c0677af4a785598d14.png)

11. Under **Advanced Configuration**, provide the following values:

    | Configuration                     | Values            |
    | --------------------------------- | ----------------- |
    | Token Generation                  | Tick (Mandatory)  |
    | Out Of Band Provisioning          | Tick (Mandatory)  |
    | Oauth App Creation                | Tick (Mandatory)  |
    | Token Validation Method           | Self Validate JWT |
    | Token Handling Options (Optional) | JWT               |

12. Click on **Add** button to create the Key Manager. Key Manager will be displayed as below. ![km-both-enabled](/en/latest/assets/images/km-both-enabled-b2232bc928de7354e2bb7e9db936bf4e.png)

13. Disable the Resident Key Manager. ![km-display](/en/latest/assets/images/km-display-eca8d3a13611f9ac7f99ef9e5127b726.png)

## Create Application using Manual Client Registration[​](#create-application-using-manual-client-registration "Direct link to Create Application using Manual Client Registration")

### Step 1: Sign up as a TPP[​](#step-1-sign-up-as-a-tpp "Direct link to Step 1: Sign up as a TPP")

1. Go to the Developer portal at `https://<APIM_HOST>:9443/devportal`.

2. Go to the **Applications** tab.<br />![applications\_tab](/en/latest/assets/images/applications-tab-31dc0ab5ead3719573455cd5922ae523.png)

3. In the Sign-in form, click **Create Account**.<br />![sign\_in](/en/latest/assets/images/sign-in-form-7c6b47ea8f9a96c66d0b216e57355309.png)

4. Provide a username and click **Proceed Self Register**.<br />![start\_signing\_in](/en/latest/assets/images/start-signing-up-b5f8ecc1f57e66b1c642e13df4377595.png)<br />

5. Fill out the **Create New Account** form to complete registration.

6. Read terms and conditions and click the checkbox to agree to the terms and conditions.<br />![terms\_conditions](/en/latest/assets/images/read-the-policies-1bc3a6fa434711bdf8a2b0e138398c8e.png)

7. Click Register.

### Step 2: Sign in to the Developer Portal as the TPP[​](#step-2-sign-in-to-the-developer-portal-as-the-tpp "Direct link to Step 2: Sign in to the Developer Portal as the TPP")

1. Now, sign in to the Developer portal (`https://<APIM_HOST>:9443/devportal`) as the TPP.

2. Enter the username and the password you entered when signing up as a TPP.

3. Click Continue. Now, you are on the home page of the Developer Portal.

### Step 3: Create an application[​](#step-3-create-an-application "Direct link to Step 3: Create an application")

1. In the Developer Portal, go to the Applications tab. ![applications\_tab](/en/latest/assets/images/applications-tab-31dc0ab5ead3719573455cd5922ae523.png)

2. Click **ADD NEW APPLICATION**. [applications\_tab](/en/latest/assets/img/learn/mcr/create-new-application.png)

3. Enter the following application details. ![applications\_details](/en/latest/assets/images/enter-application-details-35131c662a0a23f9440aa1886e4902ee.png)

4. Click **SAVE**. The Developer Portal displays the created application as follows: ![created\_application](/en/latest/assets/images/created-application-46f818ba0e63a5f6236c03ddeb27a8dd.png)

The application created via the Developer Portal allows you to observe statistics of APIs, subscribe to APIs, and access the subscribed APIs.

### Step 4: Subscribe to API[​](#step-4-subscribe-to-api "Direct link to Step 4: Subscribe to API")

1. Go to the APIs tab in the Developer portal.![click\_apis](/en/latest/assets/images/click-apis-8564fe51146cbd686389574e98574d18.png)

2. Select the API. ![select\_api](/en/latest/assets/images/select-api-56b8c8d0c1ddd701b16f096c5665294f.png)

3. Go to **Subscriptions** at the bottom of the API and select **SUBSCRIBE**.

4. Select **your application** from the drop-down list then set the **Throttling Policy** and click **SUBSCRIBE**. Once subscribed, the application can access all the supported services of the API resources.

### Step 5: Generate keys[​](#step-5-generate-keys "Direct link to Step 5: Generate keys")

The TPP application requires a Client ID (Consumer Key) to access the subscribed API.

1. Go to the **Applications** tab in the Developer Portal.

2. From the application list, select your application, which has subscribed to the API.

3. Select **Production Keys** > **OAuth2 Tokens or Sandbox Keys** > **OAuth2 Tokens** according to the type of key you require: a. Production Keys: Generates access tokens in the production environment. b. Sandbox Keys: Generates access tokens in the sandbox environment. ![generate\_keys](/en/latest/assets/images/generate-keys-2c12856fc0a8b8ee995142aac42fad80.png)

4. Provide the requested information as defined below:

   | Field                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
   | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Grant Types             | Determine the credentials that are used to generate the access token. - Code: Relates to the authorisation code grant type and is applicable when consuming the API as a user. **It is mandatory to select the code grant type for regulatory applications.**<br />- Client Credentials: Relates to the client credentials grant type and is applicable when consuming the API as an application.<br />- Refresh Token: To renew an expired access token. |
   | Callback URL            | The URL used by the TPP to receive the authorization code sent from the bank. The authorisation code can be used later to generate an OAuth2 access token.<br />**This is a mandatory field for the authorization code grant type.**                                                                                                                                                                                                                      |
   | Enable PKCE             | Enable if you want to enable PKCE support for your application                                                                                                                                                                                                                                                                                                                                                                                            |
   | Support PKCE Plain text | Enable if you want to enable PKCE Plain Text support for your application                                                                                                                                                                                                                                                                                                                                                                                 |
   | Application Certificate | This is the content of the application certificate (.PEM). For Regulatory applications, it is mandatory to use an application certificate                                                                                                                                                                                                                                                                                                                 |
   | Regulatory Application  | The type of application. If your application complies with the Open Banking Regulation, it is a Regulatory application.                                                                                                                                                                                                                                                                                                                                   |

   ![enter\_application\_details](/en/latest/assets/images/enter-application-details-1-d93d2c49ed4d541fbcc6e2d0b2f04d86.png)

   ![enter\_application\_details](/en/latest/assets/images/enter-application-details-2-ead6929d157a3ecf2beeca5fa5093f11.png)

5. Click **GENERATE KEYS** to generate production or sandbox keys.

6. It generates the consumer key and consumer secret and displays them at the top of the page.

   ![generated-keys](/en/latest/assets/images/generated-keys-567abce0f38e1cfb419dee95e53c799e.png)
