This section guides you to set up and prepare your server to run WSO2 Open Banking Accelerator.

## Set up WSO2 Identity Server

### Step 1: Install WSO2 Open Banking IAM Accelerator
Copy the extracted accelerator directory into the root directory of the WSO2 Identity Server. 

| File                           | Directory location to place the Accelerator |
|--------------------------------|---------  |
| `wso2-fsiam-accelerator-4.0.0` |`<IS_HOME>`|

!!! tip
    This documentation will refer to the above-extracted directory of the accelerator as `<OB_IS_ACCELERATOR_HOME>`.

### Step 2: Configure database scripts

!!! note 
    WSO2 Open Banking Accelerator is [compatible](../install-and-setup/prerequisites.md#compatibility) with the following DBMSs:
    
     - MySQL 8.0
     - Oracle 19c
     - Microsoft SQL Server 2017
     - PostgreSQL 13
     
This section explains how to set up the solution with a MySQL 8.0 database server. For other DBMS, see 
[Setting up databases](../install-and-setup/setting-up-databases.md).

This section explains how to set up the solution with a MySQL 8.0 database server. For other DBMS, see Setting up databases.

1. Place the compatible JDBC drivers in the `<IS_HOME>/repository/components/lib` folder. Supported JDBC driver for MySQL 8.0 : mysql-connector-java-5.1.44.jar
2. Open the `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/repository/conf/configure.properties` file.
3. Configure database-related properties and database names.

### Step 3: Set up the IS server 
1. Open and configure the configure.properties file resides in ` <IS_HOME>/<OB_IS_ACCELERATOR_HOME>/repository/conf` folder.
    a. Configure the hostnames of the API Manager and Identity Server.

    b. Configure the admin credentials of the Identity Server.

    c. Update the “IS_PRODUCT” to `wso2is-<IS_VERSION>`.

    d. Update the “PRODUCT_CONF_PATH” to `repository/resources/wso2is-<IS_VERSION>-deployment.toml`.


    !!!note
        Use the Identity Server version deploying as the IS_VERSION.

2. Run the merge script in `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin`:

    ``` bash tab='On Linux'
    ./merge.sh
    ```

    ``` bash tab='On Mac'
    ./merge.sh
    ```
    
    ``` powershell tab='On Windows'
    ./merge.ps1
    ```

3. Run the configure file in `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin`:

    ``` bash tab="MySQL"
    ./configure.sh
    ```

    ``` bash tab='On Mac'
    ./configure.sh
    ```
    
    ``` powershell tab='On Windows'
    ./configure.ps1
    ```

    ??? warning "If you are using windows platform..."
        If you are using windows platform, since the merge.ps1 and configure.ps1 files are not digitally signed yet,
        your powershell might prevent you from running them normally. In that case you may need to run these
        scripts in a powershell instance where its execution policy is set to bypass mode.
        
        Use the following command to run these scripts in execution policy bypassed powershell environment.
    
        ```
        powershell -executionpolicy bypass .\merge.ps1
        ```
    
        ```
        powershell -executionpolicy bypass .\configure.ps1
        ```
    
        IMPORTANT : Do not run any other unverified scripts using this way. This is a temporary solution.

4. Run the db script resides in `<IS_HOME>/dbscripts/financial-services/event-notifications` directory to create database tables for event notification feature in `fs_consentdb` database. 

## Setting Up WSO2 API Manager

### Step 1: Install WSO2 Open Banking AM Accelerator
Copy the extracted accelerator directory into the root directory of the WSO2 API Manager. 

| File                           | Directory location to place the Accelerator |
|--------------------------------|-----------  |
| `wso2-fsam-accelerator-4.0.0`  |`<APIM_HOME>`|

!!! tip
    This documentation will refer to the above-extracted directory of the accelerator as `<OB_APIM_ACCELERATOR_HOME>`.

### Step 2: Configure database scripts

!!! note 
    WSO2 Open Banking Accelerator is [compatible](../install-and-setup/prerequisites.md#compatibility) with the following DBMSs:
    
     - MySQL 8.0
     - Oracle 19c
     - Microsoft SQL Server 2017
     - PostgreSQL 13
     
This section explains how to set up the solution with a MySQL 8.0 database server. For other DBMS, see 
[Setting up databases](../install-and-setup/setting-up-databases.md).

This section explains how to set up the solution with a MySQL 8.0 database server. For other DBMS, see Setting up databases.

1. Place the compatible JDBC drivers in the `<APIM_HOME>/repository/components/lib` folder. Supported JDBC driver for MySQL 8.0 : mysql-connector-java-5.1.44.jar
2. Open the `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/conf/configure.properties` file.
3. Configure database-related properties and database names.

### Step 3: Set up the APIM server 
1. Open and configure the configure.properties file resides in ` <APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/conf` folder.
    a. Configure the hostnames of the API Manager and Identity Server.

    b. Configure the admin credentials of the API Manager and Identity Server.

    c. Configure the admin name.

    d. Update the “PRODUCT_CONF_PATH” to `repository/resources/wso2am-<APIM_VERSION>-deployment.toml`.


    !!!note
        Use the API MAnager version deploying as the APIM_VERSION.

2. Run the merge script in `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/bin`:

    ``` bash tab='On Linux'
    ./merge.sh
    ```

    ``` bash tab='On Mac'
    ./merge.sh
    ```
    
    ``` powershell tab='On Windows'
    ./merge.ps1
    ```

3. Run the configure file in `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/bin`:

    ``` bash tab="MySQL"
    ./configure.sh
    ```

    ``` bash tab='On Mac'
    ./configure.sh
    ```
    
    ``` powershell tab='On Windows'
    ./configure.ps1
    ```

    ??? warning "If you are using windows platform..."
        If you are using windows platform, since the merge.ps1 and configure.ps1 files are not digitally signed yet,
        your powershell might prevent you from running them normally. In that case you may need to run these
        scripts in a powershell instance where its execution policy is set to bypass mode.
        
        Use the following command to run these scripts in execution policy bypassed powershell environment.
    
        ```
        powershell -executionpolicy bypass .\merge.ps1
        ```
    
        ```
        powershell -executionpolicy bypass .\configure.ps1
        ```
    
        IMPORTANT : Do not run any other unverified scripts using this way. This is a temporary solution.

## Exchanging the certificates

In order to enable secure communication, we need to install the certificates of each component in others. This will facilitate a Secure Socket Layer (SSL). Follow the steps below to implement this:

!!!note
    Here Server A can be either IS, APIM or any other product.

1. Generate a key against the keystore of a particular server. For example, server A with an alias and common name that is equal to the hostname.
    ```
    keytool -genkey -alias <keystore_alias> -keyalg RSA -keysize 2048 -validity 3650 -keystore <keystore_path> -storepass <keystore_password> -keypass <key password> -noprompt
    ```

2. Export the public certificate of the newly generated key pair.
    ```
    keytool -export -alias <cert_alias> -file <certificate_path> -keystore <keystore path>>
    ```

3. Import the public cert of Server A to the client truststores of all the servers including Server A.
    ```
    keytool -import -trustcacerts -alias <cert_alias> -file <certificate_path> -keystore <trustore_path> -storepass <keystore_password> -noprompt
    ```

4. Repeat above steps for all the servers.

## Uploading Root and Issuer certificates

Upload the root and issuer certificates ofin OBIE ([Sandbox Certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox) | [Production Certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/80544075/OB+Root+and+Issuing+Certificates+for+Production)) to the client trust stores in `<IS_HOME>/repository/resources/security/client-truststore.p12` and `<APIM_HOME>/repository/resources/security/client-truststore.jks` using the following command:

    ```
    keytool -import -alias <alias> -file <certificate_location> -keystore <truststore_location> -storepass wso2carbon
    ```


## Start servers

1. Run the following command in <IS_HOME>/bin:
    ```
    ./wso2server.sh
    ```

2. Run the following command in <APIM_HOME>/bin:
    ```
    ./api-manager.sh
    ```
