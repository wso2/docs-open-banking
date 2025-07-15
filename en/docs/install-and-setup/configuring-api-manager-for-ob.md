WSO2 Open Banking Accelerator contains TOML-based configurations. All the server-level configurations of the 
API Manager instance can be applied using a single configuration file, which is the `deployment.toml` file. 

## Configuring deployment.toml

Follow the steps below to configure the `deployment.toml` file and set up the default open banking flow for WSO2 API 
Manager.

!!! tip
    If you want to customize and learn more about TOML configurations, see 
    [API Manager Configuration Catalog for open banking](../references/config-catalog-apim.md).

1. Replace the `deployment.toml` file as explained in the 
[Setting up the servers](setting-up-servers.md#copying-the-deploymenttoml) section.
 
2. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.

3. Set the hostname of the API Manager:

    ``` toml
    [server]
    hostname = "<APIM_HOST>" 
    ```

4. Configure super admin credentials.
    ```
    [super_admin]
    username = "<APIM_SUPER_ADMIN_USERNAME>"
    password = "<APIM_SUPER_ADMIN_PASSWORD>"
    create_admin_account = true
    ```

5. Configure the following configs to enable email as username.
    ``` toml
    [tenant_mgt]
    enable_email_domain = true

    [realm_manager]
    data_source= "WSO2USER_DB"

    [user_store]
    type = "database_unique_id"
    class = "org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager"
    ```

6. Update the datasource configurations with your database properties, such as the username, password, JDBC URL for the 
database server, and the JDBC driver. 

    - Given below are sample configurations for a MySQL database. For other DBMS types and more information, 
    see [Setting up databases](setting-up-databases.md).
   
    ```toml tab='shared_db'
    [database.shared_db]
    url = "jdbc:mysql://localhost:3306/am_configdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='apim_db'
    [database.apim_db]
    url = "jdbc:mysql://localhost:3306/apimgtdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='config'
    [database.config]
    url = "jdbc:mysql://localhost:3306/am_configdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='user'
    [database.user]
    url = "jdbc:mysql://localhost:3306/userdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```

7. Update the following configurations with the hostname of the Identity Server.  
   
    ``` toml
    [apim.key_manager]
    service_url = "https://<IS_HOSTNAME>:9446/services/"
    username = "<IS_SUPER_ADMIN_USERNAME>"
    password = "<IS_SUPER_ADMIN_PASSWORD>"
    ```

8. Disable subscription validation as follows.
    
    ``` toml
    [apim.key_manager]
    allow_subscription_validation_disabling = true
    ```

9. Configure the following to skip dropping the AUTH header from gateway and to configure allowed scopes.
    
    ``` toml
    [apim.oauth_config]
    enable_outbound_auth_header = true
    white_listed_scopes = ["^device_.*", "openid", "^FS_.*", "^TIME_.*"]
    ```

10. Configure the admin username for following features as follows.
    
    ``` toml
    [apim.throttling]
    username = "$ref{super_admin.username}@carbon.super"

    [apim.throttling.policy_deploy]
    username = "$ref{super_admin.username}@carbon.super"

    [apim.throttling.jms]
    password = "$ref{super_admin.password}"
    username = "am_admin!wso2.com!carbon.super"
    ```

11. Add the following config to support JWT content type.
    
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

12. Add following to configure transport layer configs.
    
    ``` toml
    [transport.passthru_https.sender.parameters]
    HostnameVerifier = "AllowAll"

    [passthru_http]
    "http.headers.preserve"="Content-Type,Date"

    [transport.passthru_https.listener.parameters]
    HttpsProtocols = "TLSv1.2"
    PreferredCiphers = "TLS_DHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_DHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
    ```

13. Enable certificate chain validation as the following.
    
    ``` toml
    [apimgt.mutual_ssl]
    enable_certificate_chain_validation = true
    ```

14. Enable certificate revocation validation as follows.
    
    ``` toml
    [transport.passthru_https.listener.cert_revocation_validation]
    enable = true
    allow_cert_expiry_validation = true
    allow_full_cert_chain_validation = false
    cache_delay = 1000
    cache_size = 1024
    ```

15. Add the following configurations to enable the external service extension.

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
   
## Starting servers

1. Go to the `<APIM_HOME>/bin` directory using a terminal.

2. Run the `api-manager.sh` script as follows:

    ``` bash
    ./api-manager.sh
    ``` 
