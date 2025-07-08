This section guides you to set up and prepare your server to run WSO2 Open Banking Accelerator.

## Set up WSO2 Identity Server

### Step 1: Install WSO2 Open Banking IAM Accelerator
Copy the extracted accelerator directory into the root directory of the WSO2 Identity Server. 

| File                           | Directory location to place the Accelerator |
|--------------------------------|---------  |
| `wso2-fsiam-accelerator-4.0.0` |`<IS_HOME>`|

!!! tip
    This documentation will refer to the above-extracted directory of the accelerator as `<OB_IS_ACCELERATOR_HOME>`.

### Step 2: Configure database scripts

!!! note 
    WSO2 Open Banking Accelerator is [compatible](../install-and-setup/prerequisites.md#compatibility) with the following DBMSs:
    
     - MySQL 8.0
     - Oracle 19c
     - Microsoft SQL Server 2017
     - PostgreSQL 13
     
This section explains how to set up the solution with a MySQL 8.0 database server. For other DBMS, see 
[Setting up databases](../install-and-setup/setting-up-databases.md).

This section explains how to set up the solution with a MySQL 8.0 database server. For other DBMS, see Setting up databases.

1. Place the compatible JDBC drivers in the `<IS_HOME>/repository/components/lib` folder. Supported JDBC driver for MySQL 8.0 : mysql-connector-java-5.1.44.jar
2. Open the `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/repository/conf/configure.properties` file.
3. Configure database-related properties and database names.

### Step 3: Set up the IS server 
1. Open and configure the configure.properties file resides in ` <IS_HOME>/<OB_IS_ACCELERATOR_HOME>/repository/conf` folder.
    a. Configure the hostnames of the API Manager and Identity Server.

    b. Configure the admin credentials of the Identity Server.

    c. Update the “IS_PRODUCT” to `wso2is-<IS_VERSION>`.

    d. Update the “PRODUCT_CONF_PATH” to `repository/resources/wso2is-<IS_VERSION>-deployment.toml`.


!!!note
    Use the Identity Server version deploying as the IS_VERSION.

2. Run the merge script in `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin`:

    ``` bash tab='On Linux'
    ./merge.sh
    ```

    ``` bash tab='On Mac'
    ./merge.sh
    ```
    
    ``` powershell tab='On Windows'
    ./merge.ps1
    ```

2. Run the configure file in `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin`:

    ``` bash tab="MySQL"
    ./configure.sh
    ```

    ``` bash tab='On Mac'
    ./configure.sh
    ```
    
    ``` powershell tab='On Windows'
    ./configure.ps1
    ```

    ??? warning "If you are using windows platform..."
        If you are using windows platform, since the merge.ps1 and configure.ps1 files are not digitally signed yet,
        your powershell might prevent you from running them normally. In that case you may need to run these
        scripts in a powershell instance where its execution policy is set to bypass mode.
        
        Use the following command to run these scripts in execution policy bypassed powershell environment.
    
        ```
        powershell -executionpolicy bypass .\merge.ps1
        ```
    
        ```
        powershell -executionpolicy bypass .\configure.ps1
        ```
    
        IMPORTANT : Do not run any other unverified scripts using this way. This is a temporary solution.

3. Run the db script resides in `<IS_HOME>/dbscripts/financial-services/event-notifications` directory to create database 
   tables for event notification feature in `fs_consentdb` database. 

## Setting Up WSO2 API Manager

### Step 1: Configure databases

1. Create the following databases:
    - apimgtdb 
    - am_configdb
    - userdb

    Commands to create the Databases in MySQL
    ``` 
    DROP DATABASE IF EXISTS apimgtdb; 
    CREATE DATABASE apimgtdb;
    ALTER DATABASE apimgtdb CHARACTER SET latin1 COLLATE latin1_swedish_ci;
    ```

2. Given below is the relevant datasource configuration for each database:

| Database       | TOML configuration                |
| -------------- | --------------------------------  |
| apimgtdb    | [database.apim_db]                |
| am_configdb | [database.config]                 | 
| am_configdb | [database.shared_db]              |
| userdb      | [[datasource]]<br/>id="WSO2UM_DB" |

3. Place the compatible JDBC drivers in the `<IS_HOME>/repository/components/lib` folder. Supported JDBC driver for MySQL 8.0 : mysql-connector-java-5.1.44.jar

4. Creating database tables.

To create the database tables, go to the following locations and execute the relevant database script against the given database. These locations contain database scripts for all the supported database types, choose the script according to your DBMS.

| Database         | Script location                                                    |
| ---------------- | ------------------------------------------------------------------ |
| `apimgtdb`    | `<APIM_HOME>/dbscripts/apimgt `                                    | 
| `am_configdb` | `<APIM_HOME>/dbscripts`                                            |
| `userdb`      | `<APIM_HOME>/dbscripts`                                            |

5. Execute the relevant SQL command against the apimgtdb database.

    a. Increase the column size of the VALUE column in the SP_METADATA table: (Command given in MySQL)
        ```
        ALTER TABLE SP_METADATA MODIFY VALUE VARCHAR(4096);
        ```

    b. Increase the column size of the INPUTS column in the AM_APPLICATION_REGISTRATION table: (Command given in MySQL)
        ```
        ALTER TABLE AM_APPLICATION_REGISTRATION MODIFY INPUTS VARCHAR(7500);
        ```

### Step 2: Set up the APIM server 

Open the `<APIM_HOME>/repository/conf/deployment.toml` file and do the following changes.

1. Configure the hostname.
    ```
    [server]
    hostname = "<APIM_HOSTNAME>"
    ```

2. Configure super admin credentials.
    ```
    [super_admin]
    username = "am_admin@wso2.com"
    password = "wso2123"
    create_admin_account = true
    ```

3. Configure the following configs to enable email as username.
    ```
    [tenant_mgt]
    enable_email_domain = true

    [realm_manager]
    data_source= "WSO2UM_DB"

    [user_store]
    type = "database_unique_id"
    class = "org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager"
    ```

4. Update the datasource configurations with your database properties, such as the username, password, JDBC URL for the database server, and the JDBC driver. Sample shows configuring datasource using MySQL.
    ```
    [database.apim_db]
    url = "jdbc:mysql://localhost:3306/apimgtdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdb`c.Driver"

    [database.apim_db.pool_options]
    maxActive = "150"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1"
    validationInterval="30000"
    defaultAutoCommit=true
    ```

    !!!note 
        Similarly configure the `database.shared_db` for registry data and `database.config` for am configs.

5. Configure the user db as follows.
    ```
    [[datasource]]
    id="WSO2UM_DB"
    url = "jdbc:mysql://localhost:3306/userdb?autoReconnect=true&amp;useSSL=false"
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

    !!!note 
        User DB must be shared in APIM and IS, hence use the same database used in IS as the user DB.

6. Configure key manager details as follows.
    ```
    [apim.key_manager]
    service_url = "https://<IS_HOSTNAME>:9446/services/"
    username = "<IS_SUPER_ADMIN_USERNAME>"
    password = "<IS_SUPER_ADMIN_PASSWORD>"
    ```

7. Disable subscription validation as follows.
    ```
    [apim.key_manager]
    allow_subscription_validation_disabling = true
    ```

8. Configure the following to skip dropping the AUTH header from gateway and to configure allowed scopes.
    ```
    [apim.oauth_config]
    enable_outbound_auth_header = true
    white_listed_scopes = ["^device_.*", "openid", "^FS_.*", "^TIME_.*"]
    ```

9. Configure the admin username for following features as follows.
    ```
    [apim.throttling]
    username = "$ref{super_admin.username}@carbon.super"

    [apim.throttling.policy_deploy]
    username = "$ref{super_admin.username}@carbon.super"

    [apim.throttling.jms]
    password = "$ref{super_admin.password}"
    username = "am_admin!wso2.com!carbon.super"
    ```

10. Add the following config to support JWT content type.
    ```
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

11. Add following to configure transport layer configs.
    ```
    [transport.passthru_https.sender.parameters]
    HostnameVerifier = "AllowAll"

    [passthru_http]
    "http.headers.preserve"="Content-Type,Date"

    [transport.passthru_https.listener.parameters]
    HttpsProtocols = "TLSv1.2"
    PreferredCiphers = "TLS_DHE_RSA_WITH_AES_128_GCM_SHA256,TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256,TLS_DHE_RSA_WITH_AES_256_GCM_SHA384, TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384"
    ```

12. Enable certificate chain validation as the following.
    ```
    [apimgt.mutual_ssl]
    enable_certificate_chain_validation = true
    ```

13. Enable certificate revocation validation as follows.
    ```
    [transport.passthru_https.listener.cert_revocation_validation]
    enable = true
    allow_cert_expiry_validation = true
    allow_full_cert_chain_validation = false
    cache_delay = 1000
    cache_size = 1024
    ```

## Exchanging the certificates

In order to enable secure communication, we need to install the certificates of each component in others. This will facilitate a Secure Socket Layer (SSL). Follow the steps below to implement this:

!!!note
    Here Server A can be either IS, APIM or any other product.

1. Generate a key against the keystore of a particular server. For example, server A with an alias and common name that is equal to the hostname.
    ```
    keytool -genkey -alias <keystore_alias> -keyalg RSA -keysize 2048 -validity 3650 -keystore <keystore_path> -storepass <keystore_password> -keypass <key password> -noprompt

2. Export the public certificate of the newly generated key pair.
    ```
    keytool -export -alias <cert_alias> -file <certificate_path> -keystore <keystore path>>
    ```

3. Import the public cert of Server A to the client truststores of all the servers including Server A.
    ```
    keytool -import -trustcacerts -alias <cert_alias> -file <certificate_path> -keystore <trustore_path> -storepass <keystore_password> -noprompt
    ```

4. Repeat above steps for all the servers.

## Uploading Root and Issuer certificates

Upload the root and issuer certificates ofin OBIE ([Sandbox Certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox) | [Production Certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/80544075/OB+Root+and+Issuing+Certificates+for+Production)) to the client trust stores in `<IS_HOME>/repository/resources/security/client-truststore.p12` and `<APIM_HOME>/repository/resources/security/client-truststore.jks` using the following command:

    ```
    keytool -import -alias <alias> -file <certificate_location> -keystore <truststore_location> -storepass wso2carbon
    ```


## Start servers

1. Run the following command in <IS_HOME>/bin:
    ```
    ./wso2server.sh
    ```

2. Run the following command in <APIM_HOME>/bin:
    ```
    ./api-manager.sh
    ```
