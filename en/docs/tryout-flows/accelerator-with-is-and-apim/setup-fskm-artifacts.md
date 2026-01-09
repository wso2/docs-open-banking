## Configuring Additional Attributes

Before creating the application, need to enable the additional fields from the DevPortal. To enable additional fields follow the below steps.
 
1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
2. Follow the given format and configure all additional properties:
    
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
