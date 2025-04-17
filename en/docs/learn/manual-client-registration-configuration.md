## Configuring Additional Attributes

You need to configure all additional properties as follows:
 
    1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
    2. Follow the given format and configurate all additional properties:
        
        ``` toml tab="Format"
        [[open_banking.keymanager.application.type.attributes]]
        name="<Name>" - The application property will be saved in SP_METADATA table with this name
        label="<Lable>" - The UI will show this label 
        type="<input,select>" - Define whether the field is a input field or a dropdown
        tooltip="<Placeholder>"
        values="<allowed values>" - If it is a dropdown, add comma separated values to the list
        default="" - The default selected value
        required="true" - Whether this is mandatory property
        mask="false"
        multiple="false"
        priority="1"
        ```
       
        ``` toml tab="Sample"
        [[open_banking.keymanager.application.type.attributes]]
        name="REGULATORY"
        label="Regulatory Application"
        type="select"
        tooltip="Is this a Regulatory Application?"
        values="true,false"
        default=""
        required="true"
        mask="false"
        multiple="false"
        priority="1"
        ```

    3. The configured properties will be available to fill in the Developer Portal when creating an API consumer/TPP application.
