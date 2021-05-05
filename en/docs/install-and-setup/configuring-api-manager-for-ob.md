WSO2 Open Banking Accelerator contains TOML-based configurations. All the server-level configurations of the 
API Manager instance can be applied using a single configuration file, which is the `deployment.toml` file. 

## Configuring deployment.toml

Follow the steps below to configure the `deployment.toml` file and set up the default open banking flow for WSO2 API 
Manager.

!!! tip
    If you want to customize and learn more about TOML configurations, see 
    [API Manager Configuration Catalog for open banking](../refernces/config-catalog-apim.md).

1. Replace the `deployment.toml` file as explained in the 
[Setting up the servers](setting-up-servers.md#copying-the-deploymenttoml) section.
 
2. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.

3. Set the hostname of the API Manager:

    ``` toml
    [server]
    hostname = "<APIM_HOST>" 
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
    
    ```toml tab='apim_db'
    [database.apim_db]
    url = "jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='config'
    [database.config]
    url = "jdbc:mysql://localhost:3306/openbank_am_configdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```
    
    ```toml tab='WSO2UM_DB'
    [[datasource]]
    id="WSO2UM_DB"
    url = "jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    ```

5. Update the following configurations with the hostname of the Identity Server.  
   
    ``` toml
    [apim.key_manager]
    service_url = "https://<IS_HOST>:9446${carbon.context}services/"
    ```
   
    ``` toml
    [apim.key_manager.configuration]
    ServerURL = "https://<IS_HOST>:9446${carbon.context}services/"
    ```
   
    ``` toml
    [open_banking.dcr]
    #jwks_endpoint_name = ""
    #app_name_claim = " "
    token_endpoint = "https://<IS_HOST>:9446/oauth2/token"
    ```

6. If you want to use the [Data publishing](../learn/data-publishing.md) feature:
   
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
   
## Starting servers

1. Go to the `<APIM_HOME>/bin` directory using a terminal.

2. Run the `wso2server.sh` script as follows:

    ``` bash
    ./wso2server.sh
    ``` 
