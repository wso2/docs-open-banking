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
    
2. If you are using the [Data Publishing](../advanced/data-publishing.md) feature, create the following 
    databases as well:
    
    - `openbank_ob_reporting_statsdb`
    - `openbank_ob_reporting_summarizeddb`

3. According to your DBMS, place the compatible JDBC drivers in the following directories:
 
    - `<APIM_HOME>/repository/components/lib`  
    - `<IS_HOME>/repository/components/lib` 
    

## Configuring datasources

1. The databases above have a respective datasource. Add or update the default datasource 
configurations in `<APIM_HOME>/repository/conf/deployment.toml` with your database configurations. 

    - This database to datasource mapping is as follows:
   
        |Database|TOML configuration|
        |--------|----------|
        |openbank_apimgtdb|`[database.apim_db]`|
        |openbank_am_configdb|`[database.config]`|
        |openbank_govdb|`[database.shared_db]`|
        |openbank_userdb|`[[datasource]]` <br/> `id="WSO2UM_DB"`|

   - Configure the above datasources by following the sample below: 
    
    ```toml
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
2. Add or update the default datasource configurations in `<IS_HOME>/repository/conf/deployment.toml` with your 
database configurations.  

    - This database to datasource mapping is as follows:
    
    |Database|TOML configuration|
    |--------|----------|
    |openbank_apimgtdb|`[database.identity_db]`|
    |openbank_govdb|`[database.shared_db]`|
    |openbank_userdb|`[database.user] `|
    |openbank_iskm_configdb | `[database.config]` |
    |openbank_openbankingdb | `[[datasource]]` <br/> `id="WSO2OB_DB"`|
    
   - Configure the above datasources by following the sample below: 
 
    ```toml
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
    #Use below for oracle
    #validationQuery="SELECT 1 FROM DUAL"
    validationInterval="30000"
    defaultAutoCommit=false
    ```
   
## Creating database tables

To create the database tables, go to the following locations and execute the relevant database script against the 
given database. These locations contain database scripts for all the supported database types, choose the script 
according to your DBMS. 

| Database | Script location |
| -------- | ----------------- |
|openbank_apimgtdb| `<APIM_HOME>/dbscripts/apimgt`|
|openbank_am_configdb | `<APIM_HOME>/dbscripts`|
|openbank_govdb| `<APIM_HOME>/dbscripts `|
|openbank_userdb| `<APIM_HOME>/dbscripts `|
|openbank_iskm_configdb| `<IS_HOME>/dbscripts `|
|openbank_openbankingdb| `<IS_HOME>/dbscripts/open-banking/consent`|