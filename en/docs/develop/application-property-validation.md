When onboarding API consumer/TPP applications **via WSO2 API Manager Developer Portal**, you can request additional 
application properties. To do this, implement the following interface and extend the default capabilities of 
application creation in Key Manager:

``` java
com.wso2.openbanking.accelerator.keymanager.OBKeyManagerExtensionInterface
```

Given below is a brief explanation of the methods you need to implement.

### validateAdditionalProperties method

This method lets you write validations for the additional properties. 

``` java
/**
* Validate additional properties
*
* @param obAdditionalProperties OB Additional Properties Map
* @throws APIManagementException when failed to validate a given property
*/
void validateAdditionalProperties(Map<String, ConfigurationDto> obAdditionalProperties)
       throws APIManagementException;
```

### doPreCreateApplication method

This method lets you change the `oAuthAppRequest` before the application creation.

``` java
/**
* Do changes to app request before creating the app at toolkit level
*
* @param oAuthAppRequest OAuth Application Request
* @param additionalProperties Values for additional property list defined in the config
* @throws APIManagementException when failed to validate a given property
*/
void doPreCreateApplication(OAuthAppRequest oAuthAppRequest, HashMap<String, String> additionalProperties)
       throws APIManagementException;
```

### doPreUpdateApplication method

This method lets you update the `oAuthAppRequest` before updating the application.

``` java
/**
* Do changes to app request before updating the app at toolkit level
*
* @param oAuthAppRequest OAuth Application Request
* @param  additionalProperties Values for additional property list defined in the config
* @throws APIManagementException when failed to validate a given property
*/

void doPreUpdateApplication(OAuthAppRequest oAuthAppRequest, HashMap<String, String> additionalProperties)
       throws APIManagementException;
```

### doPreUpdateSpApp method

A service provider is created on behalf of the application. This method lets you perform changes to the service provider
before updating its properties.

``` java
/**
* Do changes to service provider before updating the service provider properties
*
* @param oAuthConsumerAppDTO oAuth application DTO
* @param serviceProvider Service provider application
* @param  additionalProperties Values for additional property list defined in the config
* @throws APIManagementException when failed to validate a given property
*/
void doPreUpdateSpApp(OAuthConsumerAppDTO oAuthConsumerAppDTO, ServiceProvider serviceProvider,
HashMap<String, String> additionalProperties) throws APIManagementException;
}
```

##Configuring the extended OBKeyManagerExtensionInterface

!!! tip "Prerequisites"
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

Once implemented, build a JAR file for your OBKeyManagerExtensionInterface:

1. Place the JAR file in the `<APIM_HOME>/repository/components/lib` directory.
2. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
3. Add the following tags and configure the customization using its Fully Qualified Name (FQN):

    ``` toml
    [open_banking.keymanager.extension.impl]
    class = "com.wso2.openbanking.berlin.keymanager.BerlinKeyManagerExtensionImpl"
    ```
   
4. Restart the API Manager server.
