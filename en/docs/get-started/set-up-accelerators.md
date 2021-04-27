### Step 1: Set up Accelerators
1. Copy and extract the accelerator zip files in the root directory of the respective base products. Use the table to 
locate the respective root directory of the base products:

    | File | Directory location to place the Accelerator |
    |---------|---------    |
    |wso2ob-is-accelerator-3.0.0.zip|`<IS_HOME>`|
    |wso2ob-apim-accelerator-3.0.0.zip|`<APIM_HOME>`|
    
2. Go to `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/bin` and `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin` and give the execution 
permission to merge.sh script using the following command:
```xml
chmod +x merge.sh
```
3. Run the following command `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOM>/bin/merge.sh` and 
`<OB_IS_ACCELERATOR_HOME>/bin/merge.sh` scripts:
```
./merge.sh
```
4. Run the configure.sh files in `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/bin` and 
`<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin` respectively:
```
./configure.sh
```
5.Copy the following files to the given directory paths:

    | File to copy | Copy to |
    | -------------| ------- |
    | wso2is-extensions-1.2.10/dropins/wso2is.key.manager.core-1.2.10.jar |	`<IS_HOME>/repository/components/dropins`|
    | wso2is-extensions-1.2.10/dropins/wso2is.notification.event.handlers-1.2.10.jar | `<IS_HOME>/repository/components/dropins` |
    | wso2is-extensions-1.2.10/webapps/keymanager-operations.war |	`<IS_HOME>/repository/deployment/server/webapps` |

### Step 2: Start Servers

1. Run the following command in `<IS_HOME>/bin`:
```
./wso2server.sh
```
2. Run the following command in `<APIM_HOME>/bin`:
```
./wso2server.sh
```
