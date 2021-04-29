WSO2 Open Banking Accelerator contains TOML-based configurations. All the server-level configurations of the Identity 
Server instance can be applied using a single configuration file, which is the `deployment.toml` file. 

Follow the steps below to configure the `deployment.toml` file and set up the default open banking flow for WSO2 
Identity Server.

!!! tip
    If you want to customize and learn more about TOML configurations, see 
    [Identity Server Configuration Catalog for open banking](../refernces/config-catalog-is.md).

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

    Given below are sample configurations for a MySQL database. For more information, 
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
   
6. Configure the following endpoints for the `private_key_jwt_authenticator` event listener:
 
    - Configure `TokenEndpointAlias` with the hostname of the Identity Server.
    - Configure `notification_endpoint` with the hostname of the API Manager.  

    ``` toml
    [[event_listener]]	
    id = "private_key_jwt_authenticator"	
    ...
    TokenEndpointAlias= "https://<IS_HOST>:9446/oauth2/token"	
    notification_endpoint = "https://<APIM_HOST>:9443/internal/data/v1/notify"	
    ```

7. Configure the event publisher URL for adaptive authentication with the hostname of the Identity Server.

    ``` toml
    [authentication.adaptive.event_publisher]	
    url = "http://<IS_HOST>:8006/"
    ```

8. If you want to use the [Data publishing](../learn/data-publishing.md) feature:

    - Enable the feature and configure the `server_url` and `auth_url` properties with the hostname of WSO2 Streaming 
    Integrator.

    ``` toml
    [open_banking.data_publishing]	
    enable = true	
    username="$ref{super_admin.username}@carbon.super"	
    password="$ref{super_admin.password}"	
    server_url = "{tcp://<SI_HOST>:7612}"	
    auth_url = "{ssl://<SI_HOST>:7612}"
    ```   