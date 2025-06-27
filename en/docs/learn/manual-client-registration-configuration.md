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

## Configure WSO2 Identity Server 7.1.0

1. Add following configurations in the `<IS_HOME>/repository/conf/deployment.toml` file.

    ```
    [[event_listener]]
    id = "token_revocation"
    type = "org.wso2.carbon.identity.core.handler.AbstractIdentityHandler"
    name = "org.wso2.is.notification.ApimOauthEventInterceptor"
    order = 1

    [event_listener.properties]
    notification_endpoint = "https://<APIM_HOST>:<APIM_PORT>/internal/data/v1/notify"
    username = "${admin.username}"
    password = "${admin.password}"
    'header.X-WSO2-KEY-MANAGER' = "WSO2-IS"
    ```

2. Download [notification.event.handlers-2.0.5.jar](https://maven.wso2.org/nexus/content/repositories/releases/org/wso2/km/ext/wso2is/wso2is.notification.event.handlers/2.0.5/wso2is.notification.event.handlers-2.0.5.jar) and add it to `<IS_HOME>/repository/components/dropins` folder.

3. Change the following config to false to disable FAPI.
    ```
    [oauth.dcr]
    enable_fapi_enforcement=false
    ```

4. Restart the IS server