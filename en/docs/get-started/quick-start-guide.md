WSO2 Open Banking Accelerator is a technology stack catered to speed up the implementation of an open banking solution. 
You can use the WSO2 Open Banking Accelerator on top of the WSO2 Identity Server and API Manager to obtain an environment 
for Identity Access Management and API management in open banking. 

Follow the instructions to find how you can quickly set up and try out a basic flow.

!!! tip "Prerequisites"
    1. Download Oracle JDK 1.8 to the local environment.
        - In the environment variables, update the JAVA_HOME and PATH variables. For instance, you can do this on a Mac/Linux server by adding the following to the ~/.bashrc file:
        ```
        export JAVA_HOME="<JDK_LOCATION>"
        export PATH=$PATH:$JAVA_HOME/bin
        ```
    2. Download and extract the following base products:
        1. WSO2 Identity Server (IS) 5.11.0 
        2. WSO2 API Manager (APIM) 4.0.0
        3. WSO2 Streaming Integrator (SI) 4.0.0
    3. To configure the Identity Server with the API Manager, download WSO2 IS Connector from
     [here](https://apim.docs.wso2.com/en/4.0.0/assets/attachments/administer/wso2is-extensions-1.2.10.zip).
    4. If you have an active WSO2 Open Banking subscription, contact us via [WSO2 Online Support System](https://support.wso2.com/) 
       to download Open Banking Accelerator 3.0.0.
       
        !!! note
            If you don't have a WSO2 Open Banking subscription, [contact us](https://wso2.com/solutions/financial/open-banking/#contact) 
            for more information.
              
    5. WSO2 Open Banking Accelerator contains the following accelerators.
   
         - wso2-ob-is-accelerator-3.0.0
         - wso2-ob-apim-accelerator-3.0.0
         - wso2-ob-bi-accelerator-3.0.0
            
    6. Setup a database server using any of the following:
         - Mysql 5.7 or above
         - Microsoft SQL Server 2017
         - Oracle 19c
         - PostgreSQL 13.0
         
        !!!note
            We do not recommend configuring H2 database in the production environment.

- This document uses the following placeholders to refer to the following products:
        
| Product | Placeholder |
|---------|---------    |
|WSO2 Identity Server|`<IS_HOME>`|
|WSO2 API Manager|`<APIM_HOME>`|
|WSO2 Open Banking Identity Server Accelerator|`<OB_IS_ACCELERATOR_HOME>`|
|WSO2 Open Banking API Manager Accelerator |`<OB_APIM_ACCELERATOR_HOME>`|
