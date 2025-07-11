## Set up WSO2 Open Banking APIM Artifacts

1. Download and extract the latest Open Banking Accelerator 4.0.0 APIM Artifacts. 

    - Current latest version [4.1.0](https://github.com/wso2/financial-services-accelerator/releases/tag/v4.1.0).
              
2. WSO2 Open Banking AM Accelerator contains the following artifacts: 
   
    - org.wso2.financial.services.accelerator.common-4.1.0.jar
    - org.wso2.financial.services.accelerator.keymanager-4.1.0.jar

3. Download the configuration files from the locations given below.

    - [financial-services.xml.j2](https://github.com/wso2/financial-services-accelerator/blob/main/financial-services-accelerator/accelerators/fs-apim/carbon-home/repository/resources/conf/templates/repository/conf/financial-services.xml.j2)
    - [financial-services.xml](https://github.com/wso2/financial-services-accelerator/blob/main/financial-services-accelerator/accelerators/fs-apim/carbon-home/repository/conf/financial-services.xml)

4. Copy the downloaded artifacts to the respective directories of the base product. Use the table to locate the respective directories of the base products:

| File                                                           | Directory location to place the artifact                          |
|----------------------------------------------------------------|-----------------------------------------------------------------  |
| `org.wso2.financial.services.accelerator.common-4.0.0.jar`     | `<APIM_HOME>/repository/components/dropins`                       |
| `org.wso2.financial.services.accelerator.keymanager-4.0.0.jar` | `<APIM_HOME>/repository/components/dropins`                       |
| `financial-services.xml.j2`                                    | `<APIM_HOME>/repository/resources/conf/templates/repository/conf` |
| `financial-services.xml`                                       | `<APIM_HOME>/repository/conf`       |

5. Download the sample [Banking backend](../../assets/attachments/api#fs#backend.war) and place it inside `<APIM_HOME>/repository/deployment/server/webapps` folder.

## Configuring Additional Attributes

Before creating the application, need to enable the additional fields from the DevPortal. To enable additional fields follow the below steps.
 
1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
2. Follow the given format and configurate all additional properties:
    
    ``` toml
    [[financial_services.keymanager.application.type.attributes]]
    name="regulatory"
    label="Regulatory Application"
    type="select"
    tooltip="Is this a Regulatory Application?"
    values="true,false"
    default=""
    required="true"
    mask="false"
    multiple="false"
    priority="1"

    [[financial_services.keymanager.application.type.attributes]]
    name = "sp_certificate"
    label="Application Certificate"
    type="input"
    tooltip="Application Certificate - Mandatory if private_key_jwt Token method is selected"
    default=""
    required="false"
    mask="false"
    multiple="false"
    priority="2"
    ```

3. The configured properties will be available to fill in the Developer Portal when creating an API consumer/TPP application.

4. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

5. Change the following config to false to disable FAPI.
    ```
    [oauth.dcr]
    enable_fapi_enforcement=false
    ```