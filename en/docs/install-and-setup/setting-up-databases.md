Once you have successfully prepared the environment for the deployment, you can configure the databases.

!!! note 
    WSO2 Open Banking Accelerator is [compatible](prerequisites.md#compatibility) with the following DBMSs:
    
     - MySQL 8.0
     - Oracle 19c
     - Microsoft SQL Server 2017
     - PostgreSQL 13

## Creating databases

1. Create the following databases:

    - `openbank_apimgtdb`  
    - `openbank_am_configdb` 
    - `openbank_govdb`  
    - `openbank_userdb`  
    - `openbank_iskm_configdb` 
    - `openbank_openbankingdb`  
    
2. If you are using the [Data Publishing](../learn/data-publishing.md) feature, create the following 
    database as well:
    
    - `openbank_ob_reporting_statsdb`

3. According to your DBMS, place the compatible JDBC drivers in the following directories:
 
    - `<APIM_HOME>/repository/components/lib`  
    - `<IS_HOME>/repository/components/lib` 

    !!! tip 
        The supported JDBC driver versions are as follows:
        
        | DBMS version | JDBC driver version |
        |--------------|---------------------|
        | MySQL 8.0 | `mysql-connector-java-5.1.44.jar` <br> By default, this file available in the above locations.  |
        | Oracle 19c | `ojdbc10.jar` |
        | Microsoft SQL Server 2017 | `sqljdbc41.jar` |
        | PostgreSQL 13 | `postgresql-42.2.17.jar` |
         

## Configuring datasources

1. The databases above have a respective datasource. Add or update the default datasource 
configurations in `<APIM_HOME>/repository/conf/deployment.toml` with your database configurations. 

    - Given below is the relevant datasource configuration for each database:
   
        |Database|TOML configuration|
        |--------|----------|
        |openbank_apimgtdb|`[database.apim_db]`|
        |openbank_am_configdb|`[database.config]`|
        |openbank_govdb|`[database.shared_db]`|
        |openbank_userdb|`[[datasource]]` <br/> `id="WSO2UM_DB"`|

   - Configure the datasources by following the sample below: 
    
    ``` toml tab="MySQL"
    [database.apim_db]
    url = "jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    
    [database.apim_db.pool_options]
    maxActive = "150"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1"
    validationInterval="30000"
    defaultAutoCommit=false
    ```
   
    ``` toml tab="Oracle"
    [database.apim_db]
    url = "jdbc:oracle:thin:openbank_apimgtdb/password@localhost:1521:root"
    username = "openbank_apimgtdb"
    password = "password"
    driver = "oracle.jdbc.driver.OracleDriver"
    
    [database.apim_db.pool_options]
    maxActive = "150"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1 FROM DUAL"
    validationInterval="30000"
    defaultAutoCommit=false
    ```
   
    ``` toml tab="MS SQL"
    [database.apim_db]
    url = "jdbc:sqlserver://localhost:1433;databaseName=openbank_apimgtdb"
    username = "root"
    password = "root"
    driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
    
    [database.apim_db.pool_options]
    maxActive = "300"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1"
    validationInterval="30000"
    defaultAutoCommit=false
    ```
    
    ``` toml tab="PostgreSQL"
    [database.apim_db]
    url = "jdbc:postgresql://localhost:5432/openbank_apimgtdb"
    username = "postgres"
    password = "root"
    driver = "org.postgresql.Driver"
    
    [database.apim_db.pool_options]
    maxActive = "150"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1"
    validationInterval="30000"
    defaultAutoCommit=false
    ```
      
2. Add or update the default datasource configurations in `<IS_HOME>/repository/conf/deployment.toml` with your 
database configurations.  

    - Given below is the relevant datasource configuration for each database:
    
    |Database|TOML configuration|
    |--------|----------|
    |openbank_apimgtdb|`[database.identity_db]`|
    |openbank_govdb|`[database.shared_db]`|
    |openbank_userdb|`[database.user] `|
    |openbank_iskm_configdb | `[database.config]` |
    |openbank_openbankingdb | `[[datasource]]` <br/> `id="WSO2OB_DB"`|
    
   - Configure the datasources by following the sample below: 
 
    ``` toml tab="MySQL"
    [database.config]
    url = "jdbc:mysql://localhost:3306/openbank_iskm_configdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    
    [database.config.pool_options]
    maxActive = "150"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1"
    validationInterval="30000"
    defaultAutoCommit=false
    ```

    ``` toml tab="Oracle"
    [database.config]
    url = "jdbc:oracle:thin:openbank_iskm_configdb/password@localhost:1521:root"
    username = "openbank_iskm_configdb"
    password = "password"
    driver = "oracle.jdbc.driver.OracleDriver"
    
    [database.config.pool_options]
    maxActive = "150"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1 FROM DUAL"
    validationInterval="30000"
    defaultAutoCommit=false
    ```
   
    ``` toml tab="MS SQL"
    [database.config]
    url = "jdbc:sqlserver://localhost:1433;databaseName=openbank_iskm_configdb"
    username = "root"
    password = "root"
    driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
    
    [database.config.pool_options]
    maxActive = "300"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1"
    validationInterval="30000"
    defaultAutoCommit=false
    ```

    ``` toml tab="PostgreSQL"
    [database.config]
    url = "jdbc:postgresql://localhost:5432/openbank_iskm_configdb"
    username = "postgres"
    password = "root"
    driver = "org.postgresql.Driver"
    
    [database.config.pool_options]
    maxActive = "150"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1"
    validationInterval="30000"
    defaultAutoCommit=false
    ```
   
## Creating database tables

To create the database tables, go to the following locations and execute the relevant database script against the 
given database. 

These locations contain database scripts for all the supported database types, choose the script 
according to your DBMS. 

| Database | Script location |
| -------- | ----------------- |
|openbank_apimgtdb| `<APIM_HOME>/dbscripts/apimgt`|
|openbank_am_configdb | `<APIM_HOME>/dbscripts`|
|openbank_govdb| `<APIM_HOME>/dbscripts `|
|openbank_userdb| `<APIM_HOME>/dbscripts `|
|openbank_iskm_configdb| `<IS_HOME>/dbscripts `|
|openbank_openbankingdb| `<IS_HOME>/dbscripts/open-banking/consent`|

!!! note "Increase the column size of the following table columns:"

     Execute the relevant SQL command against the `openbank_apimgtdb` database.
     
     1. Increase the column size of the `VALUE` column in the `SP_METADATA` table:
     
     
         ```sql tab='MySQL'
         ALTER TABLE SP_METADATA MODIFY VALUE VARCHAR(4096);
         ```
         
         ```sql tab='MSSQL'
          ALTER TABLE SP_METADATA ALTER COLUMN VALUE VARCHAR(4096);
         ```
         
         ```sql tab='Oracle'
         ALTER TABLE C##OB_APIMGTDB.sp_metadata MODIFY VALUE VARCHAR2(4000);
         ```
         
         ```sql tab='PostgreSQL'
         ALTER TABLE SP_METADATA ALTER column VALUE type VARCHAR(4096);
         ```  
              
     2. Increase the column size of the `INPUTS` column in the `AM_APPLICATION_REGISTRATION` table:
                         
         ```sql tab='MySQL'
         ALTER TABLE AM_APPLICATION_REGISTRATION MODIFY INPUTS VARCHAR(7500);
         ```
         
         ```sql tab='MSSQL'
          ALTER TABLE AM_APPLICATION_REGISTRATION ALTER COLUMN INPUTS VARCHAR(7500);  
         ```
         
         ```sql tab='Oracle'
         ALTER TABLE C##OB_APIMGTDB.am_application_registration MODIFY INPUTS VARCHAR2(4000); 
         ```
         
         ```sql tab='PostgreSQL'
         ALTER TABLE AM_APPLICATION_REGISTRATION ALTER column INPUTS type VARCHAR(7500);
         ```              
         