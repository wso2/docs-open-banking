Once you have successfully prepared the environment for the deployment, you can configure the databases.

!!! note 
    WSO2 Open Banking Accelerator is [compatible](prerequisites.md#compatibility) with the following DBMSs:
    
     - MySQL 8.0
     - Oracle 19c
     - Microsoft SQL Server 2022
     - PostgreSQL 17.2

## Creating databases

1. Create the following databases:

    - For Identity Server create following databases.
        - `fs_identitydb`  
        - `fs_userdb` 
        - `fs_iskm_configdb`  
        - `fs_consentdb`

    - If you are setting up with WSO2 API Manager create following databases.
        - `fs_apimgtdb`
        - `fs_am_configdb`
        - `fs_am_userdb` 

    Commands to create the Databases in MySQL
    ``` 
    DROP DATABASE IF EXISTS fs_identitydb; 
    CREATE DATABASE fs_identitydb;
    ALTER DATABASE fs_identitydb CHARACTER SET latin1 COLLATE latin1_swedish_ci;
    ```

2. According to your DBMS, place the compatible JDBC drivers in the following directories:
 
    - `<APIM_HOME>/repository/components/lib`
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

    - Configure the datasource for `consentdb` by following the sample below: 
    
    ``` toml tab="MySQL"
    [[datasource]]
    id="WSO2FS_DB"
    url = "jdbc:mysql://localhost:3306/fs_consentdb?autoReconnect=true&amp;useSSL=false"
    username = "root"
    password = "root"
    driver = "com.mysql.jdbc.Driver"
    jmx_enable=false
    pool_options.maxActive = "150"
    pool_options.maxWait = "60000"
    pool_options.minIdle = "5"
    pool_options.testOnBorrow = true
    pool_options.validationQuery="SELECT 1"
    #Use below for oracle
    #validationQuery="SELECT 1 FROM DUAL"
    pool_options.validationInterval="30000"
    pool_options.defaultAutoCommit=true
    ```
   
    ``` toml tab="Oracle"
    [[datasource]]
    id="WSO2FS_DB"
    url = "jdbc:oracle:thin:fs_consentdb/password@localhost:1521:root"
    username = "apimgtdb"
    password = "password"
    driver = "oracle.jdbc.driver.OracleDriver"
    jmx_enable=false
    pool_options.maxActive = "150"
    pool_options.maxWait = "60000"
    pool_options.minIdle = "5"
    pool_options.testOnBorrow = true
    pool_options.validationQuery="SELECT 1"
    #Use below for oracle
    #validationQuery="SELECT 1 FROM DUAL"
    pool_options.validationInterval="30000"
    pool_options.defaultAutoCommit=true
    ```
   
    ``` toml tab="MS SQL"
    [[datasource]]
    id="WSO2FS_DB"
    url = "jdbc:sqlserver://localhost:1433;databaseName=fs_consentdb"
    username = "root"
    password = "root"
    driver = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
    jmx_enable=false
    pool_options.maxActive = "150"
    pool_options.maxWait = "60000"
    pool_options.minIdle = "5"
    pool_options.testOnBorrow = true
    pool_options.validationQuery="SELECT 1"
    #Use below for oracle
    #validationQuery="SELECT 1 FROM DUAL"
    pool_options.validationInterval="30000"
    pool_options.defaultAutoCommit=true
    ```
    
    ``` toml tab="PostgreSQL"
    [[datasource]]
    id="WSO2FS_DB"
    url = "jdbc:postgresql://localhost:5432/fs_consentdb"
    username = "postgres"
    password = "root"
    driver = "org.postgresql.Driver"
    jmx_enable=false
    pool_options.maxActive = "150"
    pool_options.maxWait = "60000"
    pool_options.minIdle = "5"
    pool_options.testOnBorrow = true
    pool_options.validationQuery="SELECT 1"
    #Use below for oracle
    #validationQuery="SELECT 1 FROM DUAL"
    pool_options.validationInterval="30000"
    pool_options.defaultAutoCommit=true
    ```

2. Add or update the default datasource configurations in `<APIM_HOME>/repository/conf/deployment.toml` with your database configurations. This step is required of your setting up with WSO2 API Manager.

    - Given below is the relevant datasource configuration for each database:
   
        |Database|TOML configuration|
        |--------|----------|
        | fs_apimgtdb|`[database.apim_db]`|
        | fs_am_configdb|`[database.config]`|
        | fs_am_configdb|`[database.shared_db]`|
        | fs_am_userdb|`[database.user]`|

   - Configure the datasources by following the sample below: 
    
    ``` toml tab="MySQL"
    [database.apim_db]
    url = "jdbc:mysql://localhost:3306/fs_apimgtdb?autoReconnect=true&amp;useSSL=false"
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
    defaultAutoCommit=true
    ```
   
    ``` toml tab="Oracle"
    [database.apim_db]
    url = "jdbc:oracle:thin:f_apimgtdb/password@localhost:1521:root"
    username = "fs_apimgtdb"
    password = "password"
    driver = "oracle.jdbc.driver.OracleDriver"
    
    [database.apim_db.pool_options]
    maxActive = "150"
    maxWait = "60000"
    minIdle ="5"
    testOnBorrow = true
    validationQuery="SELECT 1 FROM DUAL"
    validationInterval="30000"
    defaultAutoCommit=true
    ```
   
    ``` toml tab="MS SQL"
    [database.apim_db]
    url = "jdbc:sqlserver://localhost:1433;databaseName=fs_apimgtdb"
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
    defaultAutoCommit=true
    ```
    
    ``` toml tab="PostgreSQL"
    [database.apim_db]
    url = "jdbc:postgresql://localhost:5432/fs_apimgtdb"
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
    defaultAutoCommit=true
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
| fs_apimgtdb          | `<APIM_HOME>/dbscripts/apimgt ` |
| fs_am_configdb       | `<APIM_HOME>/dbscripts` |
| fs_am_userdb         | `<APIM_HOME>/dbscripts` |

!!! note "Increase the column size of the following table columns:"

    1. Execute the relevant SQL command against the `fs_identitydb` and `apimgtdb` database. Increase the column size of the `VALUE` column in the `SP_METADATA` table:
     
     
         ```sql tab='MySQL'
         ALTER TABLE SP_METADATA MODIFY VALUE VARCHAR(4096);
         ```
         
         ```sql tab='MSSQL'
          ALTER TABLE SP_METADATA ALTER COLUMN VALUE VARCHAR(4096);
         ```
         
         ```sql tab='Oracle'
         ALTER TABLE fs_identitydb.SP_METADATA MODIFY VALUE VARCHAR(4000);
         ```
         
         ```sql tab='PostgreSQL'
         ALTER TABLE SP_METADATA ALTER column VALUE type VARCHAR(4096);
         ```

    2. Execute the relevant SQL command against the `fs_apimgtdb` database. Increase the column size of the `VALUE` column in the `SP_METADATA` table:
     
     
         ```sql tab='MySQL'
         ALTER TABLE AM_APPLICATION_REGISTRATION MODIFY VALUE VARCHAR(7500);
         ```
         
         ```sql tab='MSSQL'
          ALTER TABLE AM_APPLICATION_REGISTRATION ALTER COLUMN VALUE VARCHAR(7500);
         ```
         
         ```sql tab='Oracle'
         ALTER TABLE apimgtdb.AM_APPLICATION_REGISTRATION MODIFY VALUE VARCHAR2(4000);
         ```
         
         ```sql tab='PostgreSQL'
         ALTER TABLE AM_APPLICATION_REGISTRATION ALTER column VALUE type VARCHAR(7500);


!!! note 
    "Overcome the failure in deleting applications in PostgreSQL database".

    If you are using PostgreSQL, you might encounter an error when deleting applications. To overcome this, execute the 
    following SQL command against the `fs_identitydb` database:
        
    1. Find the constraint name using the following command

    ``` sql
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'AUTHORIZED_SCOPE'::regclass
    AND contype = 'f'
    AND conkey = (
        SELECT ARRAY[attnum]
        FROM pg_attribute
        WHERE attrelid = 'AUTHORIZED_SCOPE'::regclass
        AND attname = 'APP_ID'
    );
    ```

    2. Then delete the constraint

    ``` sql
    ALTER TABLE AUTHORIZED_SCOPE
    DROP CONSTRAINT <constraint_name>;
    ```

    3. Add the updated constraint

    ``` sql
    ALTER TABLE AUTHORIZED_SCOPE
    ADD CONSTRAINT fk_app_id
    FOREIGN KEY (APP_ID) REFERENCES SP_APP(UUID) ON DELETE CASCADE;
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
