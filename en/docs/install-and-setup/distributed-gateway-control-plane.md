The WSO2 API-M server can be deployed as an all-in-one deployment or as a distributed deployment. In the distributed setup, 
the API-M server profiles are deployed as separate API-M nodes.

Given below are the API-M nodes you can have in a distributed deployment by default.

| API-M Node (Profile)                           | Description                                                                                                                                             |
|------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|
| Gateway Worker Node                            | API-M nodes running the Gateway profile.                                                                                                                |
| Control Plane Node                             | API-M nodes running the Control Plane profile. The Control Plane includes the Traffic Manager, Key Manager, Publisher, and Developer Portal components. |

See [WSO2 API Manager Distributed Deployment documentation](https://apim.docs.wso2.com/en/4.3.0/install-and-setup/setup/distributed-deployment/understanding-the-distributed-deployment-of-wso2-api-m/) 
for more information on the distributed deployment of WSO2 API Manager.

This document provides instructions on how to set up the financial services accelerator with Identity Server and 
distributed Gateway and Control Plane nodes of WSO2 API Manager.

## Prerequisites

- Configure the JAVA_HOME environment variable to reference the directory where the Java Development Kit (JDK) is installed on the server.
    For more information, see [Setting up JAVA_HOME](https://ob.docs.wso2.com/en/latest/install-and-setup/setting-up-servers/#setting-up-java_home).
- Ensure that all necessary ports are open on each server to facilitate successful data communication.
    For more information, see [Configuring ports](https://ob.docs.wso2.com/en/latest/install-and-setup/setting-up-servers/#configuring-ports).

## Step 1: Setting Up WSO2 Financial Services IAM Accelerator

See [WSO2 Open Banking IAM Accelerator documentation](setting-up-servers-with-is.md)
for instructions on how to set up the WSO2 Open Banking IAM Accelerator.

### Configure WSO2 Identity Server

!!!note 
    Follow the below steps if you are planning to use Manual Client Registration through DevPortal. Else skip this section.
    
1. Add following configurations in the <IS_HOME>/repository/conf/deployment.toml file.
    ``` toml
    [[event_listener]]
    id = "token_revocation"
    type = "org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
    name = "org.wso2.is.notification.ApimOauthEventInterceptor"
    order = 1
    
    [event_listener.properties]
    notification_endpoint = "https://<APIM_CP_HOST>:<APIM_PORT>/internal/data/v1/notify"
    username = "${admin.username}"
    password = "${admin.password}"
    'header.X-WSO2-KEY-MANAGER' = "WSO2-IS"
    ```

2. Download [notification.event.handlers-2.0.5.jar](https://maven.wso2.org/nexus/content/repositories/releases/org/wso2/km/ext/wso2is/wso2is.notification.event.handlers/2.0.5/wso2is.notification.event.handlers-2.0.5.jar) and add it to `<IS_HOME>/repository/components/dropins` folder.
3. Change the following config to false to disable FAPI.
    ```
    [oauth.dcr]
    enable_fapi_enforcement=false
    ```

4. Restart the IS server

## Step 2: Setting Up WSO2 API-M Distributed Gateway and Control Plane

### Installing base products

1. Download and install the API-M base product. The following documentation provides the instruction to install below base product combination:

| Base Product              | Combination                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| WSO2 Identity Server      | [7.0.0](https://wso2.com/identity-and-access-management/previous-releases/) |
| WSO2 API Manager          | [4.3.0](https://wso2.com/api-management/previous-releases/)                 |

!!! note
    Two instances are required to set up the AM distributed deployment.

    - Instance 1: AM Gateway Profile  
    - Instance 2: AM Control Plane Profile

This document uses the following placeholders to refer to the following products:

| Product                           | Placeholder      |
|-----------------------------------|------------------|
| WSO2 API-M Gateway Instance       | `<APIM_GW_HOME>` |
| WSO2 API-M Control Plane Instance | `<APIM_CP_HOME>` |

### Getting WSO2 Updates

The WSO2 Update tool delivers hotfixes and updates seamlessly on top of products as WSO2 Updates. 
See [Getting WSO2 Updates](https://ob.docs.wso2.com/en/latest/install-and-setup/setting-up-servers/#getting-wso2-updates) to get the latest updates for the WSO2 API Manager.

### Exchanging the Certificates
Generate a separate SSL certificate for each WSO2 API-M nodes and Identity Server (IS) node, and import them into both the keystore and truststore.
This will prevent hostname mismatch issues related to SSL certificates.

!!!note
    The same primary keystore should be used for all API Manager instances to decrypt the registry resources. 
    For more information, see [Configuring the Primary Keystore](https://apim.docs.wso2.com/en/4.3.0/install-and-setup/setup/security/configuring-keystores/configuring-keystores-in-wso2-api-manager/#configuring-the-primary-keystore).

Follow the steps [Exchanging the certificates](https://ob.docs.wso2.com/en/latest/install-and-setup/setting-up-servers/#exchanging-the-certificates) 
to exchange the certificates between the WSO2 API-M nodes and Identity Server.

### Setting Up WSO2 API-M Server and Start the Profiles

### Setting up Databases
You can create the necessary databases for the API-M deployment on a separate server and configure each node to connect to the appropriate databases.
Follow the instructions in the [Setting up databases](setting-up-databases.md) to create and configure the databases.

### Installing WSO2 Open Banking API-M Artifacts

!!! note
    Follow the below steps if you are planning to use Manual Client Registration through DevPortal. Else skip this section.

1. Download the configuration files from the following locations:

    - [financial-services.xml.j2](https://github.com/wso2/financial-services-accelerator/blob/main/financial-services-accelerator/accelerators/fs-apim/carbon-home/repository/resources/conf/templates/repository/conf/financial-services.xml.j2)
    - [financial-services.xml](https://github.com/wso2/financial-services-accelerator/blob/main/financial-services-accelerator/accelerators/fs-apim/carbon-home/repository/conf/financial-services.xml)

2. Download and extract the latest Open Banking Accelerator 4.1.x AM Artifacts.

    - Latest release: [Version 4.1.1](https://github.com/wso2/financial-services-accelerator/releases/tag/v4.1.1)

   The WSO2 Open Banking AM Accelerator contains the following artifacts:

    - `org.wso2.financial.services.accelerator.common-4.1.x.jar`
    - `org.wso2.financial.services.accelerator.keymanager-4.1.x.jar`

3. Copy the downloaded WSO2 Open Banking API-M artifacts to the respective directories of both Gateway node and Control Plane node. 
Use the table to locate the respective directories of the base products:

    | File                                                            | Directory location to place the artifact                          |
    |-----------------------------------------------------------------|-------------------------------------------------------------------|
    | `org.wso2.financial.services.accelerator.common-4.1.x.jar`      | `<APIM_HOME>/repository/components/dropins`                       |
    | `org.wso2.financial.services.accelerator.keymanager-4.1.x.jar`  | `<APIM_HOME>/repository/components/dropins`                       |
    | `financial-services.xml.j2`                                     | `<APIM_HOME>/repository/resources/conf/templates/repository/conf` |
    | `financial-services.xml`                                        | `<APIM_HOME>/repository/conf`                                     |

4. Download the API-M Meditation Artifacts: [fs-apim-mediation-artifacts-1.0.0.zip](https://github.com/wso2/financial-services-apim-mediation-policies/releases/tag/v1.0.0).
5. Extract the downloaded zip file.
   Use the table to locate the respective directories of both Gateway node and Control Plane node:

   | File                                              | Directory location to place the artifact                                        |
   |---------------------------------------------------|---------------------------------------------------------------------------------|
   | `consent-enforcement-payload-mediator-1.0.0.jar`  | `<APIM_HOME>/repository/component/lib`                                          |
   | `mtls-header-enforcement-mediator-1.0.0.jar`      | `<APIM_HOME>/repository/component/lib`                                          |
   | `customErrorFormatter.xml`                        | `<APIM_HOME>/repository/deployment/server/synapse-configs/default/sequences`    |

### Configure the Gateway Node
Configure the Gateway to communicate with the Control Plane.

1. Run profile optimization scripts on the gateway profile.
    - Navigate to `<APIM_GW_HOME>/bin` and run the following command:
      ```bash
        sh profileSetup.sh -Dprofile=gateway-worker
      ```

2. Open the `<APIM_GW_HOME>/repository/conf/deployment.toml` file.
3. Set the hostname of the API Manager:
    ``` toml
    [server]
    hostname = "<APIM_GW_HOST>" 
    ```
4. Configure server role.
    ``` toml
    [server]
    server_role = "gateway-worker"
    ```

5. Configure super admin credentials.
    ```
    [super_admin]
    username = "<APIM_SUPER_ADMIN_USERNAME>"
    password = "<APIM_SUPER_ADMIN_PASSWORD>"
    create_admin_account = true
    ```

6. Configure the following configs to enable email as username.
    ``` toml
    [tenant_mgt]
    enable_email_domain = true

    [realm_manager]
    data_source= "WSO2USER_DB"

    [user_store]
    type = "database_unique_id"
    class = "org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager"
    ```
   
7. Update the datasource configurations with your database properties, such as the username, password, JDBC URL for the 
   database server, and the JDBC driver. Sample shows configuring datasource using MySQL.
8. Remove am-config and user management DB configs from gateway node and the add shared_db and apim db.
    - Given below are sample configurations for a MySQL database. For other DBMS types and more information, see [Setting up databases](setting-up-databases.md).

         ```toml tab='shared_db'
         [database.shared_db]
         url = "jdbc:mysql://<DB_HOST>:3306/am_configdb?autoReconnect=true&amp;useSSL=false"
         username = "root"
         password = "root"
         driver = "com.mysql.jdbc.Driver"
         ```
    
         ```toml tab='apim_db'
         [database.apim_db]
         url = "jdbc:mysql://<DB_HOST>:3306/apimgtdb?autoReconnect=true&amp;useSSL=false"
         username = "root"
         password = "root"
         driver = "com.mysql.jdbc.Driver"
         ```

9. Update the following configurations with the hostname of the Identity Server to connect the Gateway to the Key 
Manager component in the Control Plane:
    ``` toml
    [apim.key_manager]
    service_url = "https://<IS_HOST>:9446/services/"
    username = "<IS_SUPER_ADMIN_USERNAME>"
    password = "<IS_SUPER_ADMIN_PASSWORD>"
    ```

10. Disable subscription validation as follows.
    ``` toml
    [apim.key_manager]
    allow_subscription_validation_disabling = true
    ```

11. Configure the following traffic manager configurations.
    ``` toml
    [apim.throttling]
    service_url = "https://<APIM_CP_HOST>:9443/services/"
    throttle_decision_endpoints = ["tcp://<APIM_CP_HOST>:5672"]
    username= "$ref{super_admin.username}@carbon.super"
    password= "$ref{super_admin.password}"

    [apim.throttling.policy_deploy]
    username = "$ref{super_admin.username}@carbon.super"

    [apim.throttling.jms]
    username="<NAME_OF_APIM_SUPER_ADMIN_USER>!wso2.com!carbon.super"
    password = "$ref{super_admin.password}"

    [apim.event_hub.jms]
    username="<NAME_OF_APIM_SUPER_ADMIN_USER>!wso2.com!carbon.super"
    password= "$ref{super_admin.password}"

    [[apim.throttling.url_group]]
    traffic_manager_urls = ["tcp://<APIM_CP_HOST>:9611"]
    traffic_manager_auth_urls = ["ssl://<APIM_CP_HOST>:9711"]
    ```

12. Add the following config to support JWT content type.
    ``` toml
    [[blocking.custom_message_formatters]]
    class = "org.apache.axis2.format.PlainTextFormatter"
    content_type = "application/jwt"

    [[blocking.custom_message_builders]]
    class = "org.apache.axis2.format.PlainTextBuilder"
    content_type = "application/jwt"

    [[custom_message_formatters]]
    class = "org.apache.axis2.format.PlainTextFormatter"
    content_type = "application/jwt"

    [[custom_message_builders]]
    class = "org.apache.axis2.format.PlainTextBuilder"
    content_type = "application/jwt"
    ```

13. Add the following to configure transport layer configs.
    ``` toml
    [transport.passthru_https.sender.parameters]
    HostnameVerifier = "AllowAll"

    [passthru_http]
    "http.headers.preserve"="Content-Type,Date"

    [transport.passthru_https.listener.parameters]
    HttpsProtocols = "TLSv1.2"
    PreferredCiphers = "TLS_DHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_DHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
    ```
    
14. Enable certificate chain validation as the following.
    ``` toml
    [apimgt.mutual_ssl]
    enable_certificate_chain_validation = true
    ```
    
15. Disable certificate_revocation.
    ``` toml
    [transport.passthru_https.listener.cert_revocation_validation]
    enable = false
    allow_cert_expiry_validation = false
    allow_full_cert_chain_validation = false
    cache_delay = 1000
    cache_size = 1024
    ```

16. Configure the following to skip dropping the AUTH header from gateway and to configure allowed scopes.
    ``` toml
    [apim.oauth_config]
    enable_outbound_auth_header = true
    white_listed_scopes = ["^device_.*", "openid", "^FS_.*", "^TIME_.*"]
    ```

17. Configure publisher url.
    ``` toml
    [financial_services]
    publisher_url="https://<APIM_CP_HOST>:9443/publisher"
    ```
    
18. Add the following configurations to enable the external service extension.
    ``` toml
    [financial_services.extensions.endpoint]
    enabled = true
    allowed_extensions = ["pre-process-application-creation", "pre-process-application-update"]
    base_url = "<EXTERNAL_SERVICE_URL>"
    retry_count = 5
    connect_timeout = 5000
    read_timeout = 5000

    [financial_services.extensions.endpoint.security]
    # supported types : Basic-Auth or OAuth2
    type = "Basic-Auth"
    username = "<EXTERNAL_SERVICE_USERNAME>"
    password = "<EXTERNAL_SERVICE_PASSWORD>"
    ```

#### Configure custom error response

1. Add the following configuration to the gateway node to skip removing the sequence file:
    ``` toml
    [apim.sync_runtime_artifacts.gateway]
    skip_list.sequences = ["customErrorFormatter.xml"]
    ```

2. Add this line before the closing of the sequence tag `</sequence>` in the `_cors_request_handler_.xml` file found in 
location `<APIM_GW_HOME>/repository/deployment/server/synapse-configs/default/sequences/_cors_request_handler_.xml`:
    ``` xml
    <sequence key="customErrorFormatter"/>
    ```

3. Copy the `customErrorFormatter.xml` file resides in `fs-apim-mediation-artifacts-1.0.0/custom-sequences` directory 
to the `<APIM_GW_HOME>/repository/deployment/server/synapse-configs/default/sequences`.

4. Remove the following configurations from gateway deployment.toml.
    ``` toml
    [apim.jwt]
    [apim.cache.gateway_token]
    [apim.cache.resource]
    [apim.cache.jwt_claim]
    ```
!!!tip
    Download a sample deployment.toml configuration file [here](../assets/attachments/gateway_deployment.toml).


### Configure the Control Plane Node
Configure the Control Plane to communicate with the Gateway.

1. Run profile optimization scripts on the control plane profile.
    - Navigate to `<APIM_CP_HOME>/bin` and run the following command:
      ```bash
        sh profileSetup.sh -Dprofile=control-plane
      ```
      
2. Open the `<APIM_CP_HOME>/repository/conf/deployment.toml` file.
3. Set the hostname of the API Manager:
    ``` toml
    [server]
    hostname = "<APIM_CP_HOST>" 
    ```
   
4. Configure server role.
    ``` toml
    [server]
    server_role = "control-plane"
    ```

5. Configure super admin credentials.
    ```
    [super_admin]
    username = "<APIM_SUPER_ADMIN_USERNAME>"
    password = "<APIM_SUPER_ADMIN_PASSWORD>"
    create_admin_account = true
    ```

6. Configure the following configs to enable email as username.
    ``` toml
    [tenant_mgt]
    enable_email_domain = true

    [realm_manager]
    data_source= "WSO2USER_DB"

    [user_store]
    type = "database_unique_id"
    class = "org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager"
    ```

7. Update the datasource configurations with your database properties, such as the username, password, JDBC URL for the database server, and the JDBC driver. Sample shows configuring datasource using MySQL.
    - Given below are sample configurations for a MySQL database. For other DBMS types and more information, see [Setting up databases](setting-up-databases.md).

         ```toml tab='apim_db'
         [database.apim_db]
         url = "jdbc:mysql://<DB_HOST>:3306/apimgtdb?autoReconnect=true&amp;useSSL=false"
         username = "root"
         password = "root"
         driver = "com.mysql.jdbc.Driver"
         ```
      
         ```toml tab='shared_db'
         [database.shared_db]
         url = "jdbc:mysql://<DB_HOST>:3306/am_configdb?autoReconnect=true&amp;useSSL=false"
         username = "root"
         password = "root"
         driver = "com.mysql.jdbc.Driver"
         ```
      
         ```toml tab='config'
         [database.config]
         url = "jdbc:mysql://<DB_HOST>:3306/am_configdb?autoReconnect=true&amp;useSSL=false"
         username = "root"
         password = "root"
         driver = "com.mysql.jdbc.Driver"
         ```
      
         ```toml tab='user management'
         [[datasource]]
         id="WSO2UM_DB"
         url = "jdbc:mysql://<DB_HOST>:3306/userdb?autoReconnect=true&amp;useSSL=false"
         username = "root"
         password = "root"
         driver = "com.mysql.jdbc.Driver"
         jmx_enable=false
         pool_options.maxActive = "150"
         pool_options.maxWait = "60000"
         pool_options.minIdle = "5"
         pool_options.testOnBorrow = true
         pool_options.validationQuery="SELECT 1"
         pool_options.validationInterval="30000"
         pool_options.defaultAutoCommit=true
         ```

8. Update the following configurations with the hostname of the Identity Server.
    ``` toml
    [apim.key_manager]
    service_url = "https://<IS_HOST>:9446/services/"
    username = "<IS_SUPER_ADMIN_USERNAME>"
    password = "<IS_SUPER_ADMIN_PASSWORD>"
    ```

9. Disable subscription validation as follows.
    ``` toml
    [apim.key_manager]
    allow_subscription_validation_disabling = true
    ```
   
10. Configure the gateway environment.
    ``` toml
    [apim]
    gateway_type = "Regular,APK,AWS"

    [[apim.gateway.environment]]
    name = "Default"
    type = "hybrid"
    gateway_type = "Regular"
    provider = "wso2"
    display_in_api_console = true
    description = "This is a hybrid gateway that handles both production and sandbox token traffic."
    show_as_token_endpoint_url = true
    service_url = "https://<APIM_GW_HOST>:${mgt.transport.https.port}/services/"
    username= "${super_admin.username}"
    password= "${super_admin.password}"
    ws_endpoint = "ws://<APIM_GW_HOST>:9099"
    wss_endpoint = "wss://<APIM_GW_HOST>:8099"
    http_endpoint = "http://<APIM_GW_HOST>:8280"
    https_endpoint = "https://<APIM_GW_HOST>:8243"
    websub_event_receiver_http_endpoint = "http://<APIM_GW_HOST>:9021"
    websub_event_receiver_https_endpoint = "https://<APIM_GW_HOST>:8021"
    ```

    !!! info
        This configuration is used for deploying APIs to the Gateway and for connecting the Developer Portal component 
        to the Gateway if the Gateway is shared across tenants. If the Gateway is not used by multiple tenants, you can 
        create a Gateway Environment using the Admin Portal. Note that in the above configurations, service_url points 
        to the 9443 port of the Gateway node, while http_endpoint and https_endpoint points to the http and https nio 
        ports (8280 and 8243).

11. Configure the following traffic manager configurations.
    ``` toml
    [apim.throttling]
    throttle_decision_endpoints = ["tcp://<APIM_CP_HOST>:5672"]
    username= "$ref{super_admin.username}@carbon.super"
    password= "$ref{super_admin.password}"

    [apim.throttling.policy_deploy]
    username = "$ref{super_admin.username}@carbon.super"
    password = "$ref{super_admin.password}"

    [apim.throttling.jms]
    username = "am_admin!wso2.com!carbon.super"
    password = "$ref{super_admin.password}"

    [apim.event_hub.jms]
    username="am_admin!wso2.com!carbon.super"
    password= "$ref{super_admin.password}"

    [[apim.throttling.url_group]]
    traffic_manager_urls = ["tcp://<APIM_CP_HOST>:9611"]
    traffic_manager_auth_urls = ["ssl://<APIM_CP_HOST>:9711"]
    ```

12. Add the following configuration to increase the header size.
    ``` toml
    [transport.https.properties]
    maxHttpHeaderSize = 16384
    ```

13. Configure token exchange.

    ``` toml
    [oauth.grant_type.token_exchange]
    enable = true
    allow_refresh_tokens = true
    iat_validity_period = "1h"
    ```   

14. Configure cache invalidation.
    ``` toml
    [apim.cache_invalidation]
    enable = true
    domain = "control-plane-domain"
    ```
    
15. To configure additional application attributes for Manual Client Registration, follow the steps in [Configuring Additional Attributes](https://ob.docs.wso2.com/en/latest/tryout-flows/accelerator-with-is-and-apim/setup-fskm-artifacts/#configuring-additional-attributes).

### Start the servers

1. Start the Control Plane Node.
   - Navigate to the `<APIM_CP_HOME>/bin` directory and run the following command:
     ```bash
     sh api-manager.sh -Dprofile=control-plane
     ```
2. Start the Gateway Worker Node. 
   - Navigate to the `<APIM_GW_HOME>/bin` directory and run the following command:
      ```bash
      sh api-manager.sh -Dprofile=gateway-worker
      ```
