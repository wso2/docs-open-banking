Once you have successfully prepared the environment for the deployment, you can configure the databases.

!!! note 
    WSO2 Open Banking Accelerator is [compatible](prerequisites.md#compatibility) with the following DBMSs:
    
     - MySQL 8.0
     - Oracle 19c
     - Microsoft SQL Server 2022
     - PostgreSQL 17.2

## Creating databases

1. Create the following databases:

    - `fs_identitydb`  
    - `fs_userdb` 
    - `fs_iskm_configdb`  
    - `fs_consentdb`
    
<!-- 2. If you are using the [Data Publishing](../learn/data-publishing.md) feature, create the following 
    database as well:
    
    - `openbank_ob_reporting_statsdb`
-->

2. According to your DBMS, place the compatible JDBC drivers in the following directories:
 
    <!-- `<APIM_HOME>/repository/components/lib`-->
    - `<IS_HOME>/repository/components/lib` 

    !!! tip 
        The supported JDBC driver versions are as follows:
        
        | DBMS version              | JDBC driver version              |
        |---------------------------|----------------------------------|
        | MySQL 8.0                 | `mysql-connector-java-5.1.44.jar`|
        | Oracle 19c                | `ojdbc11.jar`                    |
        | Microsoft SQL Server 2022 | `mssql-jdbc-12.10.0.jre11.jar`   |
        | PostgreSQL 17.2           | `postgresql-42.2.17.jar`         |
         

## Configuring datasources

<!-- 1. The databases above have a respective datasource. Add or update the default datasource 
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
-->
      
1. Add or update the default datasource configurations in `<IS_HOME>/repository/conf/deployment.toml` with your 
database configurations.  

    - Given below is the relevant datasource configuration for each database:
    
    | Database         | TOML configuration                      |
    |------------------|-----------------------------------------|
    | fs_identitydb    | `[database.identity_db]`                |
    | fs_iskm_configdb | `[database.shared_db]`                  |
    | fs_iskm_configdb | `[database.config] `                    |
    | fs_userdb        | `[database.user]`                       |
    | fs_consentdb     | `[[datasource]]` <br/> `id="WSO2FS_DB"` |
    
   - Configure the datasources by following the sample below: 
 
    ``` toml tab="MySQL"
    [database.config]
    url = "jdbc:mysql://localhost:3306/fs_iskm_configdb?autoReconnect=true&amp;useSSL=false"
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
    commitOnReturn=true
    ```

    ``` toml tab="Oracle"
    [database.config]
    url = "jdbc:oracle:thin:@localhost:1521/ORCLCDB"
    username = "fs_iskm_configdb"
    password = "ws2carbon"
    driver = "oracle.jdbc.driver.OracleDriver"

    [database.config.pool_options]
    maxActive = "150"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1 FROM DUAL"
    validationInterval="30000"
    defaultAutoCommit=false
    commitOnReturn=true
    ```
   
    ``` toml tab="MS SQL"
    [database.config]
    url = "jdbc:sqlserver://localhost:1433;databaseName=fs_iskm_configdb;encrypt=false"
    username = "sa"
    password = "ws2carbon"
    driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"

    [database.config.pool_options]
    maxActive = "150"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1"
    validationInterval="30000"
    defaultAutoCommit=false
    commitOnReturn=true
    ```

    ``` toml tab="PostgreSQL"
    [database.config]
    url = "jdbc:postgresql://localhost:5432/fs_iskm_configdb"
    username = "postgres"
    password = "ws2carbon"
    driver = "org.postgresql.Driver"

    [database.config.pool_options]
    maxActive = "150"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1"
    validationInterval="30000"
    defaultAutoCommit=false
    commitOnReturn=true
    ```
   
## Creating database tables

To create the database tables, go to the following locations and execute the relevant database script against the 
given database. 

These locations contain database scripts for all the supported database types, choose the script 
according to your DBMS. 

| Database             | Script location                                                                                                   |
|----------------------|-------------------------------------------------------------------------------------------------------------------|
| fs_identitydb        | `<IS_HOME>/dbscripts/identity` and `<IS_HOME>/dbscripts/consent`                                                  |
| fs_userdb            | `<IS_HOME>/dbscripts`                                                                                             |
| fs_iskm_configdb     | `<IS_HOME>/dbscripts `                                                                                            |
| fs_consentdb         | `<IS_HOME>/dbscripts/financial-services/consent` and `<IS_HOME>/dbscripts/financial-services/event-notifications` |

!!! note "Increase the column size of the following table columns:"

     Execute the relevant SQL command against the `fs_identitydb` database.
     
     1. Increase the column size of the `VALUE` column in the `SP_METADATA` table:
     
     
         ```sql tab='MySQL'
         ALTER TABLE SP_METADATA MODIFY VALUE VARCHAR(4096);
         ```
         
         ```sql tab='MSSQL'
          ALTER TABLE SP_METADATA ALTER COLUMN VALUE VARCHAR(4096);
         ```
         
         ```sql tab='Oracle'
         ALTER TABLE fs_identitydb.sp_metadata MODIFY VALUE VARCHAR(4000);
         ```
         
         ```sql tab='PostgreSQL'
         ALTER TABLE SP_METADATA ALTER column VALUE type VARCHAR(4096);
         ```

!!! note "Overcome the failure in deleting applications in PostgreSQL database".

    If you are using PostgreSQL, you might encounter an error when deleting applications. To overcome this, execute the 
    following SQL command against the `fs_identitydb` database:
    
    ```sql
    ALTER TABLE SP_APPLICATION DROP CONSTRAINT IF EXISTS sp_application_name_key;
    ```



!!! tip "For MySQL databases:"
    The consent attributes are stored in the `ATT_VALUE` field of `FS_CONSENT_ATTRIBUTE` table, which is in 
    the `fs_consentdb` database. 

    Per consent, when the aggregated character length of all consent attribute values is greater than 1024 characters, 
    increase the `group_concat_max_len` value. By default, this value is 1024.

    ``` sql
    SHOW VARIABLES LIKE 'group_concat_max_len';
    SET GLOBAL group_concat_max_len = 10000;
    ```

    To permanently persist this change in the MySQL server, update the `my.cnf` file as follows:

    ``` sql
    [mysqld]
    group_concat_max_len=10000
    ```
