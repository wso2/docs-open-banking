# Regulatory Aggregator - Quick Start Guide

This section guides you to set up WSO2 Open Banking Accelerator as a Regulatory Aggregator.

## Setting up JAVA\_HOME[​](#setting-up-java_home "Direct link to Setting up JAVA_HOME")

1. Install Oracle Java 8 or above to your node.
2. Set your `JAVA_HOME` environment variable to point to the directory where the Java Development Kit (JDK) is installed. For more information, see [Setting up JAVA\_HOME](/en/latest/install-and-setup/setting-up-servers/.md#setting-up-java_home).

## Installing base products[​](#installing-base-products "Direct link to Installing base products")

The accelerators run on top of WSO2 Identity Server and WSO2 API Manager, which are referred to as base products. Before setting up the accelerator, download and install the base products:

* Install [WSO2 Identity Server 5.11.0](https://wso2.com/identity-server/#)
* Install [WSO2 API Manager 4.1.0](https://wso2.com/api-manager/) or [WSO2 API Manager 4.0.0](https://wso2.com/api-management/previous-releases/)

## Installing WSO2 Open Banking Accelerator[​](#installing-wso2-open-banking-accelerator "Direct link to Installing WSO2 Open Banking Accelerator")

1. If you have an active WSO2 Open Banking subscription, contact us via [WSO2 Online Support System](https://support.wso2.com/) to download Open Banking Accelerator 3.0.0.

   note

   If you don't have a WSO2 Open Banking subscription, [contact us](https://wso2.com/solutions/financial/open-banking/#contact) for more information.

2. Extract the downloaded WSO2 Open Banking Accelerator zip files. WSO2 Open Banking Accelerator contains the following accelerators.

   * wso2-obiam-accelerator-3.0.0
   * wso2-obam-accelerator-3.0.0

3. Go to the root directories of WSO2 Identity Server and API Manager. These root directories are the product homes.

   tip

   This documentation will refer to the product homes as `<IS_HOME>` and `<APIM_HOME>` respectively.

## Getting WSO2 Updates[​](#getting-wso2-updates "Direct link to Getting WSO2 Updates")

The WSO2 Update tool delivers hotfixes and updates seamlessly on top of products as WSO2 Updates. They include improvements that are released by WSO2. You need to update the base products and accelerators using the relevant script.

1. Go to the `/bin` directory and run the WSO2 Update tool:

   * On Linux
   * On Mac
   * On Windows

   ```
   ./wso2update_linux 
   ```

   ```
   ./wso2update_darwin
   ```

   ```
   ./wso2update_windows.exe
   ```

2. Repeat this step for all the products and accelerators. For more information, see [Getting WSO2 Updates](/en/latest/install-and-setup/setting-up-servers/.md#getting-wso2-updates).

## Setting up servers[​](#setting-up-servers "Direct link to Setting up servers")

This setup consists of the following components. We are using 2 WSO2 Identity Servers (vanilla) as the identity servers of banks ABC and DCB. However, you can use any standard identity servers with this setup.

tip

Port offsets are mentioned assuming that this setup is done using a single node. If you are using multiple nodes, you can ignore the port offsets.

![regulatory\_aggregator\_setuo](/en/latest/assets/images/setup-af6a13cea06fa25d9744e34578e128ba.png)

1. Take 3 copies of the updated WSO2 Identity Server.
2. Place 2 of them in a preferred location in the node. These 2 will be the identity servers of the banks.

## Setting up accelerators[​](#setting-up-accelerators "Direct link to Setting up accelerators")

This section explains how to set up the remaining WSO2 Identity Server and API Manager.

1. Place the Identity Server and API Manager base products in the node.

2. Place the relevant accelerator in their respective product homes:

   | Accelerator                  | Directory location to place the Accelerator |
   | ---------------------------- | ------------------------------------------- |
   | wso2-obiam-accelerator-3.0.0 | `<IS_HOME>`                                 |
   | wso2-obam-accelerator-3.0.0  | `<APIM_HOME>`                               |

   tip

   This documentation will refer to above accelerator root directories as `<OB_IS_ACCELERATOR_HOME>` and `<OB_APIM_ACCELERATOR_HOME>` respectively.

3. To copy the accelerator files to the API Manager server, go to the `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/bin` directory and run the `merge.sh` script as follows:

   ```
   ./merge.sh
   ```

4. To copy the accelerator files to the Identity Server, go to the `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin` directory and run the `merge.sh` script as follows:

   ```
   ./merge.sh
   ```

5. To configure the Identity Server with the API Manager, install [WSO2 IS Connector](https://apim.docs.wso2.com/en/4.0.0/assets/attachments/administer/wso2is-extensions-1.2.10.zip).

6. Extract the `wso2is-extensions` zip file. Copy the following files to the Identity Server as follows:

   | File to copy                                                                     | Copy to                                          |
   | -------------------------------------------------------------------------------- | ------------------------------------------------ |
   | `wso2is-extensions-1.2.10/dropins/wso2is.key.manager.core-1.2.10.jar`            | `<IS_HOME>/repository/components/dropins`        |
   | `wso2is-extensions-1.2.10/dropins/wso2is.notification.event.handlers-1.2.10.jar` | `<IS_HOME>/repository/components/dropins`        |
   | `wso2is-extensions-1.2.10/webapps/keymanager-operations.war`                     | `<IS_HOME>/repository/deployment/server/webapps` |

## Configuring database scripts[​](#configuring-database-scripts "Direct link to Configuring database scripts")

1. Open the `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/conf/configure.properties` file.

2. Configure the hostnames of the API Manager and Identity Server.

3. Configure databases related properties and database names.

4. Open the `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/repository/conf/configure.properties` file and repeat steps 2 and 3.

5. Run the configure.sh files in `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/bin` and `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin` respectively:

   ```
   ./configure.sh
   ```

## Configuring regulatory aggregator[​](#configuring-regulatory-aggregator "Direct link to Configuring regulatory aggregator")

1. Download the regulatory aggregator resources.

2. Copy the following files to the Open Banking Identity Server:

   | File to copy                                                            | Copy to                                   |
   | ----------------------------------------------------------------------- | ----------------------------------------- |
   | `com.wso2.openbanking.sample.aggregator.gateway-3.0.0.96-SNAPSHOT.jar`  | `<APIM_HOME>/repository/components/libs`  |
   | `com.wso2.openbanking.sample.aggregator.identity-3.0.0.96-SNAPSHOT.jar` | `<IS_HOME>/repository/components/libs`    |
   | `org.wso2.carbon.identity.custom.federated.authenticator-1.0.0.jar`     | `<IS_HOME>/repository/components/dropins` |

3. Copy the provided `api#openbanking#backend.war` file to the `<BANK_IS_HOME>/repository/deployment/server/webapps` directories of ABC and DCB banks' identity servers.

   * This is to provide mock bank APIs from ABC and DCB banks.

4. Open the `<ABC_IS_HOME>/repository/conf/deployment.toml` file of ABC bank and configure it as follows:

   a. Set the `offset` to 1:

   ```
   [server]

   offset = 1
   ```

   b. Add the following configurations to the end of the file. This is to protect the added web application with OAuth2 Authentication.

   ```
   [[resource.access_control]]

   context = "(.*)/api/openbanking/backend/(.*)"

   secure="true"

   http_method="all"

   permissions=["/permission/admin"]

   allowed_auth_handlers = "OAuthAuthentication"
   ```

5. Repeat step 4 for DBC bank's `<DBC_IS_HOME>/repository/conf/deployment.toml`. But set the `offset` to **2**.

6. Configure an executor: a. Open the `<APIM_HOME>/repository/conf/deployment.toml` file. b. Locate the **executors** section and add the following as the 6th executor of the `Default` flow.

   ```
   [[open_banking.gateway.openbanking_gateway_executors.type.executors]] name = "com.wso2.openbanking.sample.aggregator.gateway.AggregatorExecutor" priority = 6
   ```

   For example: ![executors](/en/latest/assets/images/executors-7bf54cf788ad95acd6e096e3d1556478.png)

7. Configure the Open Banking Identity Server:

   a. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

   b. Under the `[authentication.endpoint.redirect_params]` tag, add 5 additional parameters as follows:

   ```
   parameters = ["sessionDataKeyConsent","relyingParty", "authenticators", "authFailureMsg", "authFailure", "scope", "client_id","redirect_uri", "response_type", "state"]
   ```

   c. Change the class parameter under the `[[oauth.custom_response_type]]` tag as follows:

   ```
   class = "com.wso2.openbanking.sample.aggregator.identity.AggregatorHybridResponseTypeHandler"
   ```

   d. Update the following `[open_banking.dcr]` configurations:

   ```
   jwks_url_sandbox = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks"

   jwks_url_production = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks"

   applicationupdater = "com.wso2.openbanking.sample.aggregator.identity.AggregatorApplicationUpdaterImpl"
   ```

   e. Locate the `[[open_banking.consent.authorize_steps.retrieve]]` tag with `priority=2` to and change its class to `class = "com.wso2.openbanking.sample.aggregator.identity.AggregatorConsentDisplayStep"`.

   For example: ![authorize\_steps](/en/latest/assets/images/authorize-steps1-8c43397d746d26cbaf92d952cfaff30e.png)

   f. Locate the `[[open_banking.consent.authorize_steps.persist]]` tag with `priority=1` to and change its class to `class = "com.wso2.openbanking.sample.aggregator.identity.AggregatorConsentCreateStep"`.

   For example: ![authorize\_steps](data:image/png;base64,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)

   g. Change the `validator` attribute under the `[open_banking.consent.validation]` tag as follows:

   ```
   validator="com.wso2.openbanking.sample.aggregator.identity.AggregatorConsentValidator"
   ```

   h. Update the value of `request_object_validator` under the `[open_banking.identity.extensions]` tag:

   ```
   request_object_validator="com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.OBRequestObjectValidator"
   ```

   i. Under the `[open_banking.identity.extensions]` tag, add the given new parameter:

   ```
   response_type_handler="com.wso2.openbanking.sample.aggregator.identity.OBAggregatorResponseTypeHandler"  
   ```

8. Upload the root and issuer certificates in OBIE ([Sandbox certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox)/ [Production certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/80544075/OB+Root+and+Issuing+Certificates+for+Production)) to the client trust stores:

   * `<APIM_HOME>/repository/resources/security/client-truststore.jks`
   * `<IS_HOME>/repository/resources/security/client-truststore.jks`

   Use the following command:

   ```
   keytool -import -alias <alias> -file <certificate_location> -storetype JKS -keystore <truststore_location> -storepass wso2carbon
   ```

## Starting Servers[​](#starting-servers "Direct link to Starting Servers")

1. Start all Identity Servers (including the ABC and DBC banks' servers). Go to the `<IS_HOME>/bin` directory using a terminal and run the `wso2server` script:

   * On Linux/macOS
   * On Windows

   ```
   ./wso2server.sh
   ```

   ```
   ./wso2server.bat
   ```

2. Start the API Manager server. Go to the `<APIM_HOME>/bin` directory using a terminal and run the `api-manager` script:

   * On Linux/MacOS
   * On Windows

   ```
   ./api-manager.sh
   ```

   ```
   ./api-manager.bat
   ```

## Creating Service Providers[​](#creating-service-providers "Direct link to Creating Service Providers")

This section explains how to create Service Providers in the Identity Servers at the banks.

1. Log in to the Management Console of ABC bank's Identity Server at `https://localhost:9444/carbon/` using admin credentials.
2. On the **Main** menu, click **Identity > Service Providers > Add**.
   <br />
   ![add\_sp](/en/latest/assets/images/add-sp-709c4bc6b90ee83a7e7eac18c08ea80b.png)
3. Fill in the **Service Provider Name** as **ABC\_BANK**: ![add\_sp\_details](/en/latest/assets/images/add-sp-details-bc73b98c974a9d9aa114e1a2ed390b63.png)
4. Click **Register** to add the new service provider. The Service Provider Details page appears.
5. Expand the **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** section.
6. Click **Configure**.
7. Set the **Callback URL** to `https://localhost:9446/commonauth`.
8. Click **Add**. Note that `client key` and `client secret` get generated. Note these values for future use. ![sp\_keys\_generated](/en/latest/assets/images/sp-keys-06e30504f9a77d83d8082d559d2dcee3.png)
9. Expand the **Local and Outbound Authentication Configuration** section.
10. Select the **Skip Login Consent** box. ![skip-login-consent](/en/latest/assets/images/skip-login-consent-eb5f3c4f0a646b95453b92dcc73f9405.png)
11. Click **Update** and save the configurations.
12. Log in to the Management Console of DBC bank's Identity Server at `https://localhost:9445/carbon/` and repeat the same steps to create the **DBC\_BANK** Service Provider.

## Configuring a Federated Authenticator[​](#configuring-a-federated-authenticator "Direct link to Configuring a Federated Authenticator")

This section explains how to configure a Federated Authenticator in the Open Banking Identity Server.

1. Log in to the Management Console of the Identity Server at `https://localhost:9446/carbon/` using admin credentials.

2. On the **Main** tab, click **Identity > Identity Providers > Add**.

   ![add\_idp](/en/latest/assets/images/add-idp-90bb64b7a39a955f51240a19b39e890e.png)

3. Fill in the **Identity Provider Name** as **Bank-Identity-Server**.

4. Expand **Federated Authenticators > Custom Federated Authenticator**.

5. Fill in the information regarding ABC and DCB banks.

   * Provide the `client key` and `client secret` generated from the section [above](#creating-service-providers).
   * Extract the authorization endpoint and token endpoint from the well-known endpoints of each bank's identity server.
   * Set the **Callback URL** to `https://localhost:9446/commonauth`. ![federated\_authenticator\_conf](/en/latest/assets/images/custom-federated-auth-3e156d69e6fec88e3119d487127b77b4.png)

6. Click **Register**.

## Configuring Adaptive Authentication Script[​](#configuring-adaptive-authentication-script "Direct link to Configuring Adaptive Authentication Script")

This section explains how to configure an Authentication Script in the Open Banking Identity Server.

Before you begin

Follow the [Dynamic Client Registration](/en/latest/get-started/dynamic-client-registration/.md) documentation and create a DCR Application.

1. Log in to the Management Console of the Identity Server at `https://localhost:9446/carbon/` using admin credentials.

2. On the **Main** menu, click **Identity > Service Providers > List**. The list of service providers you added appears.

3. Locate the service provider generated for DCR and click on the corresponding **Edit** link.

4. Expand **Local & Outbound Authentication Configuration**.

5. Select **Advanced Configuration** as the Authentication Type.

6. Use the following script for **Script Based Adaptive Authentication**:

   ```
   var onLoginRequest = function(context) {

       executeStep(1, {

           stepOptions: {

               forceAuth: 'true'

           }

       }, {});

   };
   ```

7. Make sure that the previously created **Bank-Identity-Server** is the selected Authentication Step. For example: ![authentication\_script](/en/latest/assets/images/authentication_script-2034bfa21f0c71c76b34dd434838539e.png)

8. Click **Update**.

## Deploying Accounts API[​](#deploying-accounts-api "Direct link to Deploying Accounts API")

Log in to API Publisher, Deploy, and Publish the Accounts API by following the [Try out API Flow](/en/latest/get-started/try-out-flow/.md) documentation.

note

Use the provided `accounts-dynamic-endpoint-insequence.xml` file as the Message Mediation instead of the default file.
