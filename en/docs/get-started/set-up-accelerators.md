This section guides you to set up and prepare your servers to run WSO2 Open Banking Accelerator.

### Step 1: Set up accelerators 
Copy the extracted accelerator directories into the root directories of the respective base products. Use the table to 
locate the respective root directory of the base products:

| File | Directory location to place the Accelerator |
|---------|---------    |
|`wso2-obiam-accelerator-3.0.0`|`<IS_HOME>`|
|`wso2-obam-accelerator-3.0.0`|`<APIM_HOME>`|

### Step 2: Configure database scripts

!!! note 
    WSO2 Open Banking Accelerator is [compatible](../install-and-setup/prerequisites.md#compatibility) with the following DBMSs:
    
     - MySQL 8.0
     - Oracle 19c
     - Microsoft SQL Server 2017
     - PostgreSQL 13
     
This section explains how to set up the solution with a MySQL 8.0 database server. For other DBMS, see 
[Setting up databases](../install-and-setup/setting-up-databases.md).

1. Open the `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/conf/configure.properties` file.

2. Configure the hostnames of the API Manager and Identity Server.

3. Configure databases related properties and database names.

4. Open the `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/repository/conf/configure.properties` file and repeat step 2 and 3.
     
### Step 3: Set up servers 
1. Run the `merge.sh` script in `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/bin` and 
`<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin` respectively:
    ```
    ./merge.sh
    ```

2. Run the configure.sh files in `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/bin` and 
`<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin` respectively:
    ```
    ./configure.sh
    ```

3. Extract the `wso2is-extensions` zip file.

4. Follow the given instructions and copy the relevant files to the given directory paths. 

     1. Open the `<IS_EXTENSION>/dropins` folder.
     2. Copy the following JAR files to the `<IS_HOME>/repository/components/dropins` folder.
         - `wso2is.key.manager.core`
         - `wso2is.notification.event.handlers`
     3. Open the `<IS_EXTENSION>/webapps` folder.
     4. Copy the `keymanager-operations.war` file to the `<IS_HOME>/repository/deployment/server/webapps` folder.
    
### Step 4: Start servers

??? warning "If you are using JDK 17 with WSO2 Identity Server 6.0.0, you need to enable adaptive authentication. Click here to see how it is done..."

     For JDK 17 runtime, adaptive authentication is disabled by default and it is required to enable adaptive authentication. To enable adaptive authentication: 

     1. Go to `<IS_HOME>/bin`. 
     2. Run the following command:

         ```toml tab='On Mac'
         ./adaptive.sh
         ```
         
         ```toml tab='On Windows'
         ./adaptive.bat
         ```

     See [Adaptive Authentication - Prerequisites](https://is.docs.wso2.com/en/6.0.0/guides/adaptive-auth/configure-adaptive-auth/#prerequisites) for more information.

1. Run the following command in `<IS_HOME>/bin`:
```
./wso2server.sh
```
2. Run the following command in `<APIM_HOME>/bin`:
```
./api-manager.sh
```
