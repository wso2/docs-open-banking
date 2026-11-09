# Consent Manager

After a certain period, bank customers may need to view, update, or revoke consents they have granted to API consumer applications to access account data. **Consent Manager** is an application in WSO2 Open Banking that supports all these requirements and manages consents.

tip

You can use the [/admin endpoint in Consent REST API](/en/3.0.0/references/consent-rest-api/.md#/Admin) to retrieve consent details and customize Consent Manager. For example,

```
curl -X GET "https://localhost:9446/api/openbanking/consent/admin/search?consentIDs=12345&clientIDs=5678&consentTypes=accounts&consentStatuses=authorized&userIDs=user1&fromTime=12012020&toTime=12012021&limit=10&offset=0" -H "accept: application/json"
```

note

* Bank officers with the `CustomerCareOfficerRole` role and bank customers can access the Consent Manager.
* Customer Care Officers have privileges such as Advanced Search options and the ability to view the consents of all bank customers.

## Configuring servers[​](#configuring-servers "Direct link to Configuring servers")

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file and update access control configurations for the `consentmgr` resource as follows:

   ```
   [[resource.access_control]]

   context = "(.*)/consentmgr(.*)"

   secure="false"

   http_method="GET,DELETE"
   ```

2. Open the `<APIM_HOME>/repository/conf/deployment.toml` file and add the following gateway executor configurations for the Consent flow:

   ```
   [[open_banking.gateway.openbanking_gateway_executors.type]]

   name = "Consent"

   [[open_banking.gateway.openbanking_gateway_executors.type.executors]]

   name = "com.wso2.openbanking.accelerator.gateway.executor.impl.selfcare.portal.UserPermissionValidationExecutor"

   priority = 1
   ```

3. Restart the Identity Server and API Manager servers respectively.

## Creating users and roles[​](#creating-users-and-roles "Direct link to Creating users and roles")

Follow [Configuring users and roles](/en/3.0.0/install-and-setup/configuring-users-and-roles/.md) and do the following:

1. Create a user and assign the `CustomerCareOfficerRole` role.

2. Create 2 other users and assign them only the `Internal/subscriber` role.

## Publishing Self-Care Portal API[​](#publishing-self-care-portal-api "Direct link to Publishing Self-Care Portal API")

1. Sign in to the API Publisher Portal at `https://<APIM_HOST>:9443/publisher` with `creator/publisher` privileges.

2. On the homepage, go to **REST API** and select **Import Open API**. ![import\_API](/en/3.0.0/assets/images/step-2-285da24b2b0bc7883dcc6833839feb42.png)

3. Select **OpenAPI File/Archive**.

4. Download the `scp-swagger.yaml` file available [here ](../../assets/attachments/scp-swagger.yaml).

5. Click **Browse File to Upload** and use the `scp-swagger.yaml` file.

6. Click **Next**.

7. Set the value for **Endpoint** as follows:

   ```
   https://<IS_HOST>:9446/api/openbanking/consent
   ```

   * Replace the placeholder with the hostname of Identity Server.

8. Click **Create**.

9. Go to **Portal Configurations > Subscriptions > Select Business Plan as 'Unlimited'** using the left menu pane.

10. Add a custom policy. Follow the instructions given below according to the API Manager version you are using:

    Click here to see how to add a custom policy if you are using API Manager 4.0.0...

    1. Go to **Develop > API Configurations > Runtime** using the left menu pane.<br />![select\_runtime](/en/3.0.0/assets/images/select-runtime-9e6f6f3c93e75c49ca3d31be0da9c629.png)

    2. Click the edit button under **Request > Message Mediation**. ![message\_mediation](data:image/png;base64,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)

    3. Now, select the **Custom Policy** option.

    4. Download the `scp-insequence.xml` file available [here ](../../assets/attachments/scp-insequence.xml)and use it as the Mediation Policy.

    5. Upload the `scp-insequence.xml` file and click **SELECT**.

    6. Scroll down and click **SAVE**.

    Click here to see how to add a custom policy if you are using API Manager 4.1.0 or 4.2.0...

    1. Go to **Develop -> API Configurations -> Policies** in the left menu pane.<br /><br />

       ![select\_policies](/en/3.0.0/assets/images/select-policies-5d7935fd04a408753ac9bb83df15cd74.png)

    2. On the **Policy List** card, click on **Add New Policy**.

    3. Fill in the **Create New Policy**.

    4. Download the `scp-insequence.xml` file available [here ](../../assets/attachments/scp-insequence.xml)and use it as the Mediation Policy.

    5. Upload the `scp-insequence.xml` file and click **SELECT**.

    6. Scroll down and click **Save**. Upon successful creation of the policy, you receive an alert as shown below:<br /><br />

       ![successful](/en/3.0.0/assets/images/successful-2cfca6cc1ecdd161d44574d0fe646cef.png)

    7. Expand the API endpoint you want from the list of API endpoints. For example: ![expand\_api\_endpoint](/en/3.0.0/assets/images/expand-api-endpoint-cea547a0a7a5c1bbf18797dd24c301a6.png)

    8. Expand the HTTP method from the API endpoint you selected. For example: ![expand\_http\_method](../assets/img/get-started/quick-start-guide/expand-http-method.png)

    9. Drag and drop the previously created policy to the **Request Flow** of the API endpoint. ![request\_flow](/en/3.0.0/assets/images/request-flow-4aa869e47a0c2e5864d6a12c6b929ca3.png)

    10. Select **Apply to all resources** and click **Save**.

    11. Scroll down and click **Save**.

11. If you are migrating from WSO2 Open Banking 2.0 to 3.0, add `CustomerCareOfficer` role to the `consents:read_all` scope.

    Click here to see how to add a role to the scope

    1. Go to **Develop > API Configurations > Local Scopes** using the left menu pane.

    2. Click the edit button in scope **consents<!-- -->:read\_all**.

    3. Add `CustomerCareOfficer` to the **Roles** and hit Enter. ![add-CustomerCareOfficer](/en/3.0.0/assets/images/add-CustomerCareOfficer-b1c805466732b147b7d9be75187f2104.png)

    4. Click **Update**.

12. Go to **Overview** using the left menu pane.

13. Click **Deploy**.

14. Set the API Gateways configurations and deploy the API.

15. Go back to **Overview**.

16. Click **Publish**.

## Subscribing to Self-Care Portal API[​](#subscribing-to-self-care-portal-api "Direct link to Subscribing to Self-Care Portal API")

1. Sign in to the Developer Portal at `https://<APIM_HOST>:9443/devportal` with `Internal/subscriber` privileges.

2. Go to the **Applications** tab and click **ADD NEW APPLICATION**. ![create\_new\_application](/en/3.0.0/assets/images/create-new-application-ed9351de24a45cf388875af5e4c5d0f4.png)

3. Enter `consentmgr` as the name of the application and click **Save**. ![consent\_manager\_application](/en/3.0.0/assets/images/consent-application-89fbaff8ef95246e224d8bbef08de6f1.png)

4. Go to the left menu pane and select **Production Keys** or **Sandbox Keys** to generate keys.

5. Set the **Grant Types** to **Refresh Token** and **Code**.

   [![](/en/3.0.0/assets/images/generate-keys-b4ac227e8bec1551fc1cffb570af280d.png)](/en/3.0.0/assets/img/learn/consent-manager/generate-keys.png)

   If these grant types are not visible in the Developer Portal, click here to see how to configure them.

   Follow the steps below and configure the Grant Types for the Key Manager according to your Open Banking specification:

   1. Sign in to the Admin Portal of API Manager at `https://<APIM_HOST>:9443/admin`.

   2. Go to the `Key Managers` tab using the left menu pane.

   3. Select the **OBKM** key manager. ![obkm\_keymanager](/en/3.0.0/assets/images/keymanager-obkm-651089ed0c47cad0fc1527341a39b73e.png)

   4. Enter the required grant types and press enter. ![configure\_grant\_types](/en/3.0.0/assets/images/grant-types-45c3408724ae34e1e4351c674514cbd6.png)

   5. Scroll down and click **Update**.

   For more information see, [Configure Identity Server as the Key Manager](/en/3.0.0/learn/dynamic-client-registration-try-out/.md#step-2-configure-is-as-key-manager).

6. Set the **Callback URL** to `https://<IS_HOST>:9446/consentmgr/scp_oauth2_callback`.

   * Replace the placeholder with the hostname of the Identity Server.

7. Leave their default values for other configurations.

8. Scroll down and click **GENERATE KEYS**.

9. A message box will display the access token.

10. You can see that the consumer key and consumer secret are generated for the `consentmgr` application.

11. Now, go to the left menu pane and select **Subscriptions**.

12. Click **SUBSCRIBE APIS**. ![subscribe\_to\_apis](/en/3.0.0/assets/images/subscribe-to-consent-api-5c1ccde1eea9d2658cf37f6bfd8d7c59.png)

13. Find the **SelfCarePortalAPI** from the list and click the **Subscribe** button corresponding to it.

14. If you are using **WSO2 Identity Server 6.0.0**, follow the below instructions:

    1. Sign in to the Management Console at `https://<IS_HOST>:9446/carbon/`.

    2. In the **Main** tab, click **Identity -> Service Providers -> List**.

    3. Select the Service Provider of the `consentmgr` application, and click the corresponding **Edit** icon.

    4. Expand the **Claim Configuration** section.

    5. Select **<http://wso2.org/claims/username>** from the **Subject Claim URI** list.

    6. Click **Update** to save the configurations.

## Configuring Consent Manager[​](#configuring-consent-manager "Direct link to Configuring Consent Manager")

note

We recommend that you use the latest version of the WSO2 Open Banking Identity Server Accelerator.

1. Open the `<IS_HOME>/repository/deployment/server/webapps/consentmgr/runtime-config.js` file.

2. Follow the below instructions if you are using **WSO2 Open Banking Identity Server Accelerator at U2 level 3.0.0.76 or above**,

   * If the Consent Manager Portal is deployed on the WSO2 Identity Server, use the default configuration given below.

     ```
     window.env = {

         // This option can be retrieved in "src/index.js" with "window.env.API_URL".

         USE_DEFAULT_CONFIGS: true,

         SERVER_URL: 'https://localhost:9446',

         SPEC: 'Default',

         TENANT_DOMAIN: 'carbon.super',

         NUMBER_OF_CONSENTS: 20,

         VERSION: '3.0.0'

       };
     ```

   * If you are using a different server instance for the Identity Server, update the above configurations as follows.

     1. Set the `USE_DEFAULT_CONFIGS` parameter to `false`.

     2. Update the `SERVER_URL` parameter with the URL of the Identity Server.

   Click here to see how to configure the above if you are not using the latest version of the WSO2 Open Banking Identity Server Accelerator.

   Update the `SERVER_URL` parameter with the URL to the Identity Server. For example:

   ```
   window.env = {

       // This option can be retrieved in "src/index.js" with "window.env.API_URL".

       SERVER_URL: 'https://localhost:9446',

       TENANT_DOMAIN: 'carbon.super',

       NUMBER_OF_CONSENTS: 25,

       VERSION: '3.0.0'

     };
   ```

3. If you are using **WSO2 Open Banking Identity Server Accelerator at U2 level 3.0.0.73 or above**, open the `<IS_HOME>/repository/conf/deployment.toml` file and update the configurations.

   | Configuration                 | Description                                                                             |
   | ----------------------------- | --------------------------------------------------------------------------------------- |
   | `identity_server_base_url`    | The hostname of the Identity Server.                                                    |
   | `api_manager_server_base_url` | The hostname of the API Manager.                                                        |
   | `client_id`                   | The Consumer Key of the [application created](#subscribing-to-self-care-portal-api).    |
   | `client_secret`               | The Consumer Secret of the [application created](#subscribing-to-self-care-portal-api). |

   For example,

   ```
   [open_banking.consent.portal.client_credentials]

   client_id="2zB5s9wGHWVwmlrvHdWa6Mwc4vsa"

   client_secret="cqblprasAniVfi02IXGFvp8VREAa"



   [open_banking.consent.portal.params]

   identity_server_base_url="https://localhost:9446"

   api_manager_server_base_url="https://localhost:8243"
   ```

   Click here to see how to configure the above if you are not using the latest version of the WSO2 Open Banking Identity Server Accelerator.

   Open the `<IS_HOME>/repository/deployment/server/webapps/consentmgr/WEB-INF/web.xml` file and update the configurations.

   | Configuration           | Description                                                                             |
   | ----------------------- | --------------------------------------------------------------------------------------- |
   | `identityServerBaseUrl` | The hostname of the Identity Server.                                                    |
   | `apiManagerServerUrl`   | The hostname of the API Manager.                                                        |
   | `scpClientKey`          | The Consumer Key of the [application created](#subscribing-to-self-care-portal-api).    |
   | `scpClientSecret`       | The Consumer Secret of the [application created](#subscribing-to-self-care-portal-api). |

   For example,

   ```
   <context-param>

       <param-name>identityServerBaseUrl</param-name>

       <param-value>https://localhost:9446</param-value>

   </context-param>

   <context-param>

       <param-name>apiManagerServerUrl</param-name>

       <param-value>https://localhost:8243</param-value>

   </context-param>

   <context-param>

       <param-name>scpClientKey</param-name>

       <param-value>2zB5s9wGHWVwmlrvHdWa6Mwc4vsa</param-value>

   </context-param>

   <context-param>

       <param-name>scpClientSecret</param-name>

       <param-value>cqblprasAniVfi02IXGFvp8VREAa</param-value>

   </context-param>
   ```

## Using Consent Manager[​](#using-consent-manager "Direct link to Using Consent Manager")

1. Go to the Consent Manager application at `https://<IS_HOST>:9446/consentmgr`

2. Sign in with the credentials provided by the bank.

3. The `consentmgr` application requests access to your profile. To grant access, click **Continue**.

   ![consentmgr request access](/en/3.0.0/assets/images/consentmgr-request-access-687018883117c76a0063fbc4fca4135b.png)

4. You are redirected to the homepage of the Consent Manager portal.

   ![consent manger homepage](/en/3.0.0/assets/images/consent-manger-homepage-784ba3a318335417910aa77213eb5d0e.png)

The three tabs are as follows:

* **Active**: Lists active consents that can access your account/payment information.
* **Expired**: Lists expired consent that cannot access your account/payment information anymore.
* **Withdrawn**: Lists the consents that you have revoked.

tip

Use the **Search** button to search consents.

### Viewing consent details[​](#viewing-consent-details "Direct link to Viewing consent details")

* To view consent details, click the respective `Action` button.

  ![view consent](/en/3.0.0/assets/images/view-consent-b57497cabab5089e58e11eabb3c53119.png)

* You can view the details such as the associated API consumer application, consent granted date, consent expiry date, account numbers, and permissions that you have granted.

  ![consent details](/en/3.0.0/assets/images/consent-details-f59562ea62f2fc277dca94cfe6e5648f.png)

### Revoking a consent[​](#revoking-a-consent "Direct link to Revoking a consent")

* To revoke a consent, review the details and click **Stop Sharing**.

  ![consent details](/en/3.0.0/assets/images/stop-sharing-3472093a5c32995921419857f38b3ea6.png)

* Revoking a consent consists of 2 steps:

  * Step 1: The first step shows the impact of withdrawing the consent.

    ![stop sharing step 1](/en/3.0.0/assets/images/stop-sharing-step1-6ce819aad546201a4f4969f77827fd7b.png)

  * Step 2: Displays the information the consent has access to.

    ![stop sharing step 2](/en/3.0.0/assets/images/stop-sharing-step2-ca70097855cf07460b23ed9001b4019f.png)

* Once you click **Stop Sharing**, the status of the consent changes to `withdrawn`. You can find this consent in the **Withdrawn** tab now.

note

To learn about customizing the Consent Manager Portal, see the [Customize the Consent Manager Portal](/en/3.0.0/develop/customize-consent-manager-portal/.md) documentation.
