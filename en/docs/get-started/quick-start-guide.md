WSO2 Open Banking Accelerator is a technology stack catered to speed up the implementation of an open banking solution. 
You can use the WSO2 Open Banking Accelerator on top of the WSO2 Identity Server and API Manager to obtain an environment for Identity Access Management and API management in open banking. 

This section guides you on how to set up the solution in a local environment. Follow the instructions to find how you 
can quickly set up and try out a basic flow.

!!! tip "Prerequisites"
    1. Download Open Java Development Kit (OpenJDK) version 11 ,17 or 21 to the local environment based on the base product versions you use.

        !!!info
            See [Compatibility](../install-and-setup/prerequisites.md#compatibility) for compatible JDK versions.

    2. In the environment variables, update the JAVA_HOME and PATH variables. For instance, you can do this on a Mac/Linux server by adding the following to the ~/.bashrc file:
        ```
        export JAVA_HOME="<JDK_LOCATION>"
        export PATH=$PATH:$JAVA_HOME/bin
        ```
    
    3. Setup a database server using any of the following:
         - MySQL 8.0
         - Oracle 19c
         - Microsoft SQL Server 2022
         - PostgreSQL 17.2
         
        !!!info
            See [Compatibility](../install-and-setup/prerequisites.md#compatibility) if you are using MySQL 8.0.

        !!!note
            We do not recommend configuring H2 database in the production environment.

## Installing WSO2 Open Banking Accelerator for WSO2 Identity Server

### Installing base products

1. Download and extract the required base products:

    - WSO2 Identity Server -7.1.0 ,7.0.0
    - WSO2 API Manager - 4.5.0, 4.4.0

### Installing WSO2 Open Banking IAM Accelerator
1. Download and extract the latest Open Banking Accelerator 4.0.0 version. 

    - Current latest version [4.0.0](https://github.com/wso2/financial-services-accelerator/releases/download/v4.0.0/wso2-fsiam-accelerator-4.0.0.zip).
              
2. WSO2 Open Banking Accelerator contains the following accelerators:
   
    - wso2-fsiam-accelerator-4.x.0
    

!!!note 
    This document uses the following placeholders to refer to the following products:
        
        | Product                                       | Placeholder                |
        |-----------------------------------------------|----------------------------|
        | WSO2 Identity Server                          | `<IS_HOME>`                |
        | WSO2 API Manager                              | `<APIM_HOME>`              |
        | WSO2 Open Banking Identity Server Accelerator | `<OB_IS_ACCELERATOR_HOME>` |

## Getting WSO2 Updates

The WSO2 Update tool delivers hotfixes and updates seamlessly on top of products as WSO2 Updates. They include 
improvements that are released by WSO2. You need to update the base products and accelerators using the relevant script.

1. Go to `<PRODUCT_HOME>/bin` and run the WSO2 Update tool:

    - Repeat this step for the WSO2 Identity Server and API Manager products.
    
        ```bash tab='On Linux'
        ./wso2update_linux 
        ```
        
        ```bash tab='On Mac'
        ./wso2update_darwin
        ```
        
        ```bash tab='On Windows'
        ./wso2update_windows.exe
        ```

2. Go to `<OB_IS_ACCELERATOR_HOME>/bin` and run the WSO2 Update tool:

    - Repeat this step for the WSO2 Open Banking Identity Server accelerator.

        ```bash tab='On Linux'
        ./wso2update_linux 
        ```
        
        ```bash tab='On Mac'
        ./wso2update_darwin
        ```
        
        ```bash tab='On Windows'
        ./wso2update_windows.exe
        ```
   
For more information, see the [WSO2 Updates documentation](https://updates.docs.wso2.com/en/latest/updates/overview/).
