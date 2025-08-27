This section guides you to set up and prepare your server to run WSO2 Open Banking Accelerator.

### Step 1: Set up WSO2 Open Banking Accelerator for WSO2 Identity Server
Copy the extracted accelerator directory into the root directory of the WSO2 Identity Server. 

| File                           | Directory location to place the Accelerator |
|--------------------------------|---------------------------------------------|
| `wso2-obiam-accelerator-4.x.0` | `<IS_HOME>`                                 |

!!! tip
    This documentation will refer to the above-extracted directory of the accelerator as `<OB_IS_ACCELERATOR_HOME>`.

### Step 2: Configure database scripts

!!! note 
    WSO2 Open Banking Accelerator is [compatible](../install-and-setup/prerequisites.md#compatibility) with the following DBMSs:
    
     - MySQL 8.0
     - Oracle 19c
     - Microsoft SQL Server 2022
     - PostgreSQL 17.2
     
This section explains how to set up the solution with a MySQL 8.0 database server. For other DBMS, see 
[Setting up databases](../install-and-setup/setting-up-databases.md).

1. Open the `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/repository/conf/configure.properties` file.

2. Configure the hostnames of the Identity Server.

3. Configure databases related properties and database names.

4. Modify the product version in the `IS_PRODUCT` and `PRODUCT_CONF_PATH` parameters to match with the base product version.
 
### Step 3: Set up the IS server 
1. Run the merge script in `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin`:

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

<!--4. Extract the `wso2is-extensions` zip file of the relevant API Manager version.

5. Follow the given instructions and copy the relevant files to the given directory paths. 

     1. Open the `<IS_EXTENSION>/dropins` folder.
     2. Copy the following JAR files to the `<IS_HOME>/repository/components/dropins` folder.
         - `wso2is.key.manager.core`
         - `wso2is.notification.event.handlers`
     3. Open the `<IS_EXTENSION>/webapps` folder.
     4. Copy the `keymanager-operations.war` file to the `<IS_HOME>/repository/deployment/server/webapps` folder.-->
    
### Step 4: Start the server

1. Run the following command in `<IS_HOME>/bin`:
```
./wso2server.sh
```

