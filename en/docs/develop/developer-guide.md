According to your open banking requirements, you can customize the capabilities of WSO2 Open Banking Accelerator. This 
section explains how to get started with implementing customizations and implementing your own toolkit.

##Create a new Maven project 

1. Download and install Apache Maven. 

    !!! note
        For more information on downloading and installing Maven, refer to [Apache Maven](https://maven.apache.org/download.cgi) documentation.  

2. Click [here](../assets/attachments/open-banking-sample-toolkit.zip) to download a sample Maven project.
3. Follow the sample project and create your own new Maven project.

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

1. Download the `install.sh` script available [here](../assets/attachments/install.sh).
    The `install.sh` script will install WSO2 Identity Server, API Manager, and Open Banking specific JAR files to your 
    local Maven Repository.
2. Go to the `<IS_HOME>` directory and place the `install.sh` file. 
3. Run the `<IS_HOME>/install.sh` file.

    ``` shell 
    ./install.sh
    ```
   
4. Go to the `<APIM_HOME>` directory and place a copy of the downloaded `install.sh` file. 
5. Run the `<APIM_HOME>/install.sh` file.

    ``` shell 
    ./install.sh
    ```

!!! note
    When you [update](/install-and-setup/setting-up-servers#getting-wso2-updates) the products/accelerators with WSO2 
    Updates, repeat the above steps and install the latest versions of the JAR files in the Maven Repository. 

## Customize WSO2 Open Banking extensions 

You can use WSO2 Open Banking Accelerator capabilities and customize them according to your open banking requirements. 
For more information on implementing a toolkit for customizations, see [Introduction to Toolkit](develop-toolkit.md).

### Configure your customizations 

Once you implement your customizations, follow the instructions in the respective page to configure the extended classes. 

For example, to configure a custom request object validator, see the **Configuring** section in the
[Custom Request Object Validator](custom-request-object-validator.md).

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
        ./api-manager.sh --debug 5005
        ```

- When the server is starting, the following message is displayed: 

    ``` shell
    Listening for transport dt_socket at address: 5005
    ```
  
- Now you can start debugging from your IDE using the same port mentioned in `<DEBUG_PORT>`.

 