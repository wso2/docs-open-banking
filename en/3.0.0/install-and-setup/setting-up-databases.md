# Setting up databases

Once you have successfully prepared the environment for the deployment, you can configure the databases.

note

WSO2 Open Banking Accelerator is [compatible](/en/3.0.0/install-and-setup/prerequisites/.md#compatibility) with the following DBMSs:

* MySQL 8.0
* Oracle 19c
* Microsoft SQL Server 2017
* PostgreSQL 13

## Creating databases[​](#creating-databases "Direct link to Creating databases")

1. Create the following databases:

   * `openbank_apimgtdb`
   * `openbank_am_configdb`
   * `openbank_govdb`
   * `openbank_userdb`
   * `openbank_iskm_configdb`
   * `openbank_openbankingdb`

2. If you are using the [Data Publishing](/en/3.0.0/learn/data-publishing/.md) feature, create the following database as well:

   * `openbank_ob_reporting_statsdb`

3. According to your DBMS, place the compatible JDBC drivers in the following directories:

   * `<APIM_HOME>/repository/components/lib`
   * `<IS_HOME>/repository/components/lib`

   tip

   The supported JDBC driver versions are as follows:

   | DBMS version              | JDBC driver version               |
   | ------------------------- | --------------------------------- |
   | MySQL 8.0                 | `mysql-connector-java-5.1.44.jar` |
   | Oracle 19c                | `ojdbc10.jar`                     |
   | Microsoft SQL Server 2017 | `sqljdbc41.jar`                   |
   | PostgreSQL 13             | `postgresql-42.2.17.jar`          |

## Configuring datasources[​](#configuring-datasources "Direct link to Configuring datasources")

1. The databases above have a respective datasource. Add or update the default datasource configurations in `<APIM_HOME>/repository/conf/deployment.toml` with your database configurations.

   * Given below is the relevant datasource configuration for each database:

     | Database               | TOML configuration                     |
     | ---------------------- | -------------------------------------- |
     | openbank\_apimgtdb     | `[database.apim_db]`                   |
     | openbank\_am\_configdb | `[database.config]`                    |
     | openbank\_govdb        | `[database.shared_db]`                 |
     | openbank\_userdb       | `[[datasource]]`<br />`id="WSO2UM_DB"` |

     * Configure the datasources by following the sample below:

   - MySQL
   - Oracle
   - MS SQL
   - PostgreSQL

   ```
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

   ```
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

   ```
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

   ```
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

2. Add or update the default datasource configurations in `<IS_HOME>/repository/conf/deployment.toml` with your database configurations.

   * Given below is the relevant datasource configuration for each database:

   | Database                 | TOML configuration                     |
   | ------------------------ | -------------------------------------- |
   | openbank\_apimgtdb       | `[database.identity_db]`               |
   | openbank\_govdb          | `[database.shared_db]`                 |
   | openbank\_userdb         | `[database.user]`                      |
   | openbank\_iskm\_configdb | `[database.config]`                    |
   | openbank\_openbankingdb  | `[[datasource]]`<br />`id="WSO2OB_DB"` |

   * Configure the datasources by following the sample below:

   - MySQL
   - Oracle
   - MS SQL
   - PostgreSQL

   ```
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

   ```
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

   ```
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

   ```
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

## Creating database tables[​](#creating-database-tables "Direct link to Creating database tables")

To create the database tables, go to the following locations and execute the relevant database script against the given database.

These locations contain database scripts for all the supported database types, choose the script according to your DBMS.

| Database                 | Script location                            |
| ------------------------ | ------------------------------------------ |
| openbank\_apimgtdb       | `<APIM_HOME>/dbscripts/apimgt`             |
| openbank\_am\_configdb   | `<APIM_HOME>/dbscripts`                    |
| openbank\_govdb          | `<APIM_HOME>/dbscripts`                    |
| openbank\_userdb         | `<APIM_HOME>/dbscripts`                    |
| openbank\_iskm\_configdb | `<IS_HOME>/dbscripts`                      |
| openbank\_openbankingdb  | `<IS_HOME>/dbscripts/open-banking/consent` |

Increase the column size of the following table columns:

Execute the relevant SQL command against the `openbank_apimgtdb` database.

1. Increase the column size of the `VALUE` column in the `SP_METADATA` table:

   * MySQL
   * MSSQL
   * Oracle
   * PostgreSQL

   ```
   ALTER TABLE SP_METADATA MODIFY VALUE VARCHAR(4096);
   ```

   ```
    ALTER TABLE SP_METADATA ALTER COLUMN VALUE VARCHAR(4096);
   ```

   ```
   ALTER TABLE C##OB_APIMGTDB.sp_metadata MODIFY VALUE VARCHAR2(4000);
   ```

   ```
   ALTER TABLE SP_METADATA ALTER column VALUE type VARCHAR(4096);
   ```

2. Increase the column size of the `INPUTS` column in the `AM_APPLICATION_REGISTRATION` table:

   * MySQL
   * MSSQL
   * Oracle
   * PostgreSQL

   ```
   ALTER TABLE AM_APPLICATION_REGISTRATION MODIFY INPUTS VARCHAR(7500);
   ```

   ```
    ALTER TABLE AM_APPLICATION_REGISTRATION ALTER COLUMN INPUTS VARCHAR(7500);  
   ```

   ```
   ALTER TABLE C##OB_APIMGTDB.am_application_registration MODIFY INPUTS VARCHAR2(4000); 
   ```

   ```
   ALTER TABLE AM_APPLICATION_REGISTRATION ALTER column INPUTS type VARCHAR(7500);
   ```

For MySQL databases:

The consent attributes are stored in the `ATT_VALUE` field of `OB_CONSENT_ATTRIBUTE` table, which is in the `openbank_openbankingdb` database.

Per consent, when the aggregated character length of all consent attribute values is greater than 1024 characters, increase the `group_concat_max_len` value. By default, this value is 1024.

```
SHOW VARIABLES LIKE 'group_concat_max_len';

SET GLOBAL group_concat_max_len = 10000;
```

To permanently persist this change in the MySQL server, update the `my.cnf` file as follows:

```
[mysqld]

group_concat_max_len=10000
```
