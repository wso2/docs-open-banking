According to your open banking requirements, you can customize the capabilities of WSO2 Open Banking Accelerator. This 
section explains how to get started with implementing customizations and implementing your own toolkit.

##Create a new Maven project 

1. Download and install Apache Maven. 

    !!! note
        For more information on downloading and installing Maven, refer to [Apache Maven](https://maven.apache.org/download.cgi) documentation. 
        *This link directs you to an external site. All copyrights in its content are subject to the terms of the Apache 
        license and are not owned by WSO2.*

2. Download or clone the [open-banking-sample-toolkit](https://github.com/DivyaPremanantha/open-banking-sample-toolkit) project.
3. Follow the README file of the `open-banking-sample-toolkit` project and create your own toolkit.

##Add JAR files to Maven Repository 

!!! tip "Before you begin:"
    - Set up WSO2 Open Banking Identity Server and API Manager accelerators.
        - Go to the `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin` directory and run the `merge.sh` script to copy the 
        accelerator files to the Identity Server.
        
            ``` shell 
            ./ merge.sh
            ```
        
        - Go to the `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/bin` directory and run the `merge.sh` script to copy the 
        accelerator files to the API Manager.
        
            ``` shell 
            ./ merge.sh
            ```

1. Download the zip file available [here](../assets/attachments/install_scripts.zip) and extract it.
2. According to your operating system, select and copy the relevant `install` script.
 
    The `install` script will install WSO2 Identity Server, API Manager, and Open Banking specific JAR files to your 
    local Maven Repository.
    
3. Go to the `<IS_HOME>` directory and place the relevant `install` file. 
4. According to your operating system, run the `<IS_HOME>/install` file.

       ``` shell tab='On Linux'  
        ./install.sh
       ```
       
       ``` shell tab='On Windows'  
        ./install.ps1
       ```
   
5. Go to the `<APIM_HOME>` directory and place a copy of the relevant `install` file. 
6. Run the `<APIM_HOME>/install` file.

       ``` shell tab='On Linux'  
        ./install.sh
       ```
       
       ``` shell tab='On Windows'  
        ./install.ps1
       ```

!!! note
    When you [update](/install-and-setup/setting-up-servers#getting-wso2-updates) the products/accelerators with WSO2 
    Updates, repeat the above steps and install the latest versions of the JAR files in the Maven Repository. 

## Customize WSO2 Open Banking extensions 

You can use WSO2 Open Banking Accelerator capabilities and customize them according to your open banking requirements. 

Given below is a sample implementation of how to customize the 
[Request Object Validator](custom-request-object-validator.md). Follow the sample and perform any required validations:

``` java
import com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.OBRequestObjectValidator;
import com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.models.OBRequestObject;
import com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.models.ValidationResponse;

import java.util.Map;

/*
 * This is a sample class to extend the request object validations
 * */
public class ExtendedRequestObjectValidator extends OBRequestObjectValidator {

    public ValidationResponse validateOBConstraints(OBRequestObject obRequestObject, Map<String, Object> dataMap) {

        //This is a sample validation that can be performed
        String aud = obRequestObject.getClaimsSet().getClaim("aud").toString();

        if (!aud.equals("sample value")) {
            return new ValidationResponse(false, "Incorrect aud value");
        }
        return new ValidationResponse(true);
    }

}
```

Once implemented, build a JAR file for the project and place it in the `<IS_HOME>/repository/components/dropins` 
directory. See the [Configure your customizations](#configure-your-customizations) section to learn how to configure 
this JAR file.

!!! info
    You can follow the same approach and customize the extension points in WSO2 Open Banking Accelerator. For extension 
    points and more information on customizing, see [Introduction to Toolkit](develop-toolkit.md).

### Configure your customizations 

Once you implement your customizations, follow the instructions in the respective page to configure the extended classes. 

For example, to configure a custom request object validator, see the **Configuring** section in the
[Custom Request Object Validator](/develop/custom-request-object-validator#configuring-a-custom-request-object-validator).

### Test your customizations 

The [sample](../assets/attachments/open-banking-sample-toolkit.zip) Maven project, referenced in the 
"Create a new Maven project" section contains a sample unit test. Refer to the sample and write your own tests for the 
customization.

## Enable debugging on server

You can simply debug the extended class by starting the base products in debug mode. 

- To start WSO2 Identity Server in debug mode, use the following command:

    - The value of `<DEBUG_PORT>` can be any port number and this is used for remote debugging from your IDE.

        ```shell tab="Format"
        ./wso2server.sh --debug <DEBUG_PORT>
        ```
      
        ``` shell tab="Sample"
        ./wso2server.sh --debug 5005
        ```
  
- To start WSO2 API Manager in debug mode, use the following command:

    - The value of `<DEBUG_PORT>` can be any port number and this is used for remote debugging from your IDE.

        ```shell tab="Format"
        ./api-manager.sh --debug <DEBUG_PORT>
        ```
      
        ```shell tab="Sample"
        ./api-manager.sh --debug 5006
        ```

- When the server is starting, the following message is displayed: 

    ``` shell
    Listening for transport dt_socket at address: 5005
    ```
  
- Now you can start debugging from your IDE using the same port mentioned in `<DEBUG_PORT>`.

 