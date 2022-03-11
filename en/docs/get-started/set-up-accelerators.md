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

3.Copy the following files to the given directory paths:

 | File to copy | Location to  |
 |---------|---------    |
 |`wso2is-extensions-1.2.10/dropins/wso2is.key.manager.core-1.2.10.jar`|`<IS_HOME>/repository/components/dropins`|
 |`wso2is-extensions-1.2.10/dropins/wso2is.notification.event.handlers-1.2.10.jar`|`<IS_HOME>/repository/components/dropins`|
 |`wso2is-extensions-1.2.10/webapps/keymanager-operations.war`|`<IS_HOME>/repository/deployment/server/webapps`|

### Step 4: Start servers

1. Run the following command in `<IS_HOME>/bin`:
```
./wso2server.sh
```
2. Run the following command in `<APIM_HOME>/bin`:
```
./api-manager.sh
```
