WSO2 Open Banking Accelerator contains TOML-based configurations. All the server-level configurations of the Identity 
Server instance can be applied using a single configuration file, which is the `deployment.toml` file. 

## Configuring deployment.toml

Follow the steps below to configure the `deployment.toml` file and set up the default open banking flow for WSO2 
Identity Server.

!!! tip
    If you want to customize and learn more about TOML configurations, see 
    [Identity Server Configuration Catalog for open banking](../references/config-catalog-is.md).

1. Replace the `deployment.toml` file as explained in the 
[Setting up the servers](setting-up-servers.md#copying-the-deploymenttoml) section.
 
2. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

3. Set the hostname of the Identity Server:

    ``` toml
    [server]	
    hostname = "<IS_HOST>"	 
    ```
   
4. Update the datasource configurations with your database properties, such as the username, password, JDBC URL for the 
database server, and the JDBC driver. 

    - Given below are sample configurations for a MySQL database. For other DBMS types and more information, 
    see [Setting up databases](setting-up-databases.md).

    ```toml tab='shared_db'
    [database.shared_db]
    url = "jdbc:mysql://localhost:3306/openbank_govdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
   
    ```toml tab='identity_db'
    [database.identity_db]
    url = "jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
     
    ```toml tab='config'
    [database.config]
    url = "jdbc:mysql://localhost:3306/openbank_iskm_configdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='user'
    [database.user]
    url = "jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='WSO2OB_DB'
    [[datasource]]
    id="WSO2OB_DB"
    url = "jdbc:mysql://localhost:3306/openbank_openbankingdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```

5. 	Configure the authentication endpoints with the hostname of the Identity Server.

    ``` toml
    [authentication.endpoints]	
    login_url = "https://<IS_HOST>:9446/authenticationendpoint/login.do"	
    retry_url = "https://<IS_HOST>:9446/authenticationendpoint/retry.do"
    ```
   
    ``` toml
    [oauth.endpoints]	
    oauth2_consent_page = "${carbon.protocol}://<IS_HOST>:${carbon.management.port}/ob/authenticationendpoint/oauth2_authz.do"	
    oidc_consent_page = "${carbon.protocol}://<IS_HOST>:${carbon.management.port}/ob/authenticationendpoint/oauth2_consent.do"
    ```
   
6. Configure the following endpoints for the `token_revocation` event listener:
 
    - Configure `TokenEndpointAlias` with the hostname of the Identity Server.
    - Configure `notification_endpoint` with the hostname of the API Manager.  

    ``` toml
    [[event_listener]]	
    id = "token_revocation"	
    ...
    [event_listener.properties]
    TokenEndpointAlias= "https://<IS_HOST>:9446/oauth2/token"	
    notification_endpoint = "https://<APIM_HOST>:9443/internal/data/v1/notify"	
    ```

7. Add and configure the following tags:
    - `signing_certificate_kid`: Configure the `kid` value for the signing certificate of the bank. The same value is 
    configured as `kid` of the ID Token.
    - `client_transport_cert_as_header_enabled`: To send the client certificate as a transport header, set this to `true`.

    ``` toml
    [open_banking.identity]
    signing_certificate_kid="123"
    client_transport_cert_as_header_enabled = true
    ```

8. Configure the event publisher URL for adaptive authentication with the hostname of the Identity Server.

    ``` toml
    [authentication.adaptive.event_publisher]	
    url = "http://<IS_HOST>:8006/"
    ```

9. Update access control configurations for the `consentmgr` resource as follows: 

    ``` toml
    [[resource.access_control]]
    context = "(.*)/consentmgr(.*)"
    secure="false"
    http_method="GET,DELETE"
    ```
   
10. Configure a periodical consent expiration job as follows:

    !!! info
        This is available only as a WSO2 Update and is effective from October 18, 2021. For more information on updating 
        WSO2 Open Banking, see [Getting WSO2 Updates](setting-up-servers.md#getting-wso2-updates).

    ``` toml
    [open_banking.consent.periodical_expiration]
    # This property needs to be true in order to run the consent expiration periodical updater.
    enabled=true
    # Cron value for the periodical updater. "0 0 0 * * ?" cron will describe as 00:00:00am every day
    cron_value="0 0 0 * * ?"
    # This value to be update for expired consents.
    expired_consent_status_value="Expired"
    # These consent statuses will only be consider when checking for expired consents. (Comma separated value list)
    eligible_statuses="authorised"
    ```   
    
    - In order to identify the consent expiration time, relevant consents need to maintain the `ExpirationDateTime` 
    attribute which contains a UTC timestamp. A consent is not eligible for periodical consent expiration if 
    the `ExpirationDateTime` attribute is not available for that particular consent.
    
    ??? info "Click here to see the configurations for periodical consent expiration in a clustered setup."
       
        - Add the `quartz.properties` file to `<IS_HOME>/repository/conf` and enable clustering by configuring the
          datasources according to the
          [Quartz Configuration Reference](http://www.quartz-scheduler.org/documentation/quartz-2.1.7/configuration/).
        - Create a new database and use the database scripts available 
          [here](https://github.com/quartz-scheduler/quartz/tree/quartz-2.3.x/quartz-core/src/main/resources/org/quartz/impl/jdbcjobstore)
          to create the quartz cluster tables.
        - Add following jars to the `<IS_HOME>/repository/component/lib` directory.
            - [mchange-commons-java-0.2.20.jar](https://repo1.maven.org/maven2/com/mchange/mchange-commons-java/0.2.20/mchange-commons-java-0.2.20.jar)
            - [c3p0-0.9.5.4.jar](https://repo1.maven.org/maven2/com/mchange/c3p0/0.9.5.4/c3p0-0.9.5.4.jar)
        - Copy the same `quartz.properties` file to each instance in the cluster and update the `instanceId`. 
        - Click [here](../assets/attachments/quartz.properties) to download a sample `quartz.properties` configuration file.
       
11. Add the following tags and configure the HTTP connection pool:

    !!! info
        This is available only as a WSO2 Update and is effective from October 07, 2021. For more information on updating 
        WSO2 Open Banking, see [Getting WSO2 Updates](setting-up-servers.md#getting-wso2-updates).

    ``` toml
    [open_banking.http_connection_pool]
    max_connections = 2000
    max_connections_per_route = 1500	
    ```
    
12. If you want to use the [Data publishing](../learn/data-publishing.md) feature:

    - Enable the feature and configure the `server_url` and `auth_url` properties with the hostname of WSO2 Streaming 
    Integrator.

    ``` toml
    [open_banking.data_publishing]	
    enable = true	
    username="$ref{super_admin.username}@carbon.super"	
    password="$ref{super_admin.password}"	
    server_url = "{tcp://<SI_HOST>:7612}"	
    ```   
   
## Starting servers

1. Go to the `<IS_HOME>/bin` directory using a terminal.

2. Run the `wso2server.sh` script as follows:

    ``` bash
    ./wso2server.sh
    ``` 