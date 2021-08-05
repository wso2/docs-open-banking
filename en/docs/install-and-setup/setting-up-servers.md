This section guides you to set up and prepare the servers to run WSO2 Open Banking Accelerator.

##Installing base products
WSO2 Open Banking Accelerator is a technology stack catered to speed up the implementation of an open banking solution.
The accelerators run on top of WSO2 Identity Server and WSO2 API Manager, which are referred to as base 
products. Before setting up the accelerator, download and install the base products:

- Install [WSO2 Identity Server 5.11.0](https://wso2.com/identity-and-access-management/#)
- Install [WSO2 API Manager 4.0.0](https://wso2.com/api-manager/#)
- Install [WSO2 Streaming Integrator 4.0.0](https://wso2.com/integration/streaming-integrator/#)
- To configure the Identity Server with the API Manager, install 
[WSO2 IS Connector](https://apim.docs.wso2.com/en/4.0.0/assets/attachments/administer/wso2is-extensions-1.2.10.zip)

## Installing WSO2 Open Banking Accelerator 

!!! tip "Before you begin"
    See the environment [compatibility](prerequisites.md) to determine whether the current accelerator version is 
    compatible with your operating system.
    
1. If you have an active WSO2 Open Banking subscription, contact us via [WSO2 Online Support System](https://support.wso2.com/) 
to download Open Banking Accelerator 3.0.0.

    !!! note
        If you don't have a WSO2 Open Banking subscription, [contact us](https://wso2.com/solutions/financial/open-banking/#contact) 
        for more information.
    
2. Extract the downloaded WSO2 Open Banking Accelerator zip files. WSO2 Open Banking Accelerator contains the following 
accelerators.

    - wso2-obiam-accelerator-3.0.0
    - wso2-obam-accelerator-3.0.0
    - wso2-obbi-accelerator-3.0.0

3. Go to the root directories of WSO2 Identity Server, API Manager and Streaming Integrator. These root directories are the product 
homes.
 
    !!! tip
        This documentation will refer to the product homes as `<IS_HOME>`,`<APIM_HOME>`, and `<SI_HOME>` respectively.

4. Place the relevant accelerator zip files and extract them in their respective product homes:

    |File| Directory location to place the Accelerator|
    |----| -------------------------------------------|
    |wso2-obiam-accelerator-3.0.0| `<IS_HOME>`|
    |wso2-obam-accelerator-3.0.0.zip| `<APIM_HOME>`|
    |wso2-obbi-accelerator-3.0.0.zip| `<SI_HOME>`|
     
    !!! tip
        This documentation will refer to the above-extracted directories of the accelerators as 
        `<OB_IS_ACCELERATOR_HOME>`,`<OB_APIM_ACCELERATOR_HOME>`, `<OB_BI_ACCELERATOR_HOME>` respectively.

## Getting WSO2 Updates

The WSO2 Update tool delivers hotfixes and updates seamlessly on top of products as WSO2 Updates. They include 
improvements that are released by WSO2. You need to update the base products and accelerators using the relevant script.

1. Go to `<PRODUCT_HOME>/bin` and run the WSO2 Update tool:

    - Repeat this step for the WSO2 Identity Server, API Manager, and Stream Integrator products.
    
        ```bash tab='On Linux'
        ./wso2update_linux 
        ```
        
        ```bash tab='On Mac'
        ./wso2update_darwin
        ```
        
        ```bash tab='On Windows'
        ./wso2update_windows.exe
        ```

2. Go to `<ACCELERATOR_HOME>/bin` and run the WSO2 Update tool:

    - Repeat this step for the WSO2 Open Banking Identity Server, API Manager, and Business Intelligence accelerators.

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

## Setting up Accelerator

1. To copy the accelerator files to the API Manager server, go to the `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/bin` 
directory and run the `merge.sh` script as follows:

    ``` shell 
    ./merge.sh
    ```
 
2. To copy the accelerator files to the Identity Server, go to the `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin` directory 
and run the `merge.sh` script as follows:
   
    ``` shell 
    ./merge.sh
    ```

3. Extract the `wso2is-extensions` zip file. Copy the following files to the Identity Server as follows:

    | File to copy | Copy to |
    | -------------| ------- |
    | `wso2is-extensions-1.2.10/dropins/wso2is.key.manager.core-1.2.10.jar` |	`<IS_HOME>/repository/components/dropins`|
    | `wso2is-extensions-1.2.10/dropins/wso2is.notification.event.handlers-1.2.10.jar` | `<IS_HOME>/repository/components/dropins` |
    | `wso2is-extensions-1.2.10/webapps/keymanager-operations.war` | `<IS_HOME>/repository/deployment/server/webapps` |
      
4. To copy the accelerator files to the Streaming Integrator, go to the `<SI_HOME>/<OB_BI_ACCELERATOR_HOME>/bin` 
directory and run the `merge.sh` script as follows:

    ``` shell 
    ./merge.sh
    ``` 
       
## Setting up JAVA_HOME

Set your `JAVA_HOME` environment variable to point to the directory where the Java Development Kit (JDK) is installed 
on the server.

!!! info
    Environment variables are global system variables accessible by all the processes running under the operating system.
    
1. Open the .bashrc file (.bash_profile file on Mac) in your home directory using a file editor.

2. Add the following two lines at the bottom of the file. Replace the `<JDK_LOCATION>` placeholder with  the actual 
directory where the JDK is installed.
        ``` bash
        export JAVA_HOME="<JDK_LOCATION>"
        export PATH=$PATH:$JAVA_HOME/bin
        ```
3. Save the file. To verify that the `JAVA_HOME` variable is set correctly, execute the following command. This 
should retrieve the JDK installation path:
        ``` bash
        echo $JAVA_HOME
        ```
        
## Configuring ports

The open banking solution may run in different machines/servers. It is mandatory to open the ports of each server to 
allow a successful data flow. The instances mentioned below specify the ports that need to be opened:

|Instance/Product |	Port | Usage |
|-----------------|------| ------|
| WSO2 Identity Server | 9446 | HTTPS servlet transport <br/> The default URL of the Management Console is `https://<IS_HOST>:9446/carbon` |
| WSO2 API Manager | 9443 | HTTPS servlet transport <br/>  The default URL of the Management Console is `https://<APIM_HOST>:9443/carbon` |
| | 8243 |  NIO/PT transport HTTPS port |
| WSO2 Streaming Integrator | 9444 | HTTPS netty transport |
| | 7612 | Thrift TCP port to receive events from clients |
| | 7712 | Thrift SSL port for secure transport where the client is authenticated |

## Exchanging the certificates

??? warning "If you are using the default keystores available in the products, click here to see how to update keystores..."
    If you are using the default keystores available in the products, update them by removing any unnecessary or expired 
    Root CA Certificates.
    
    1. The keystores are available in the `<IS_HOME>/repository/resources/security/wso2carbon.jks` and 
    `<APIM_HOME>/repository/resources/security/wso2carbon.jks` files.
    
    2. Use the following command to list and identify problematic certificates:
    ``` bash 
    keytool -list -v -keystore wso2carbon.jks
    ```
    
    3. Remove the certificates using the alias as follows: 
    ``` bash
    keytool -delete -alias <ALIAS_TO_REMOVE> -keystore wso2carbon.jks
    ```

In order to enable secure communication, we need to install the certificates of each component in others. This will 
facilitate a Secure Socket Layer (SSL). Follow the steps below to implement this:

1. Generate a key against the keystore of a particular server. For example, server A with an alias and common name that 
is equal to the hostname.

    ``` bash
    keytool -genkey -alias <keystore_alias> -keyalg RSA -keysize 2048 -validity 3650 -keystore <keystore_path> -storepass <keystore_password> -keypass <key password> -noprompt
    ```
 
2. Export the public certificate of the newly generated key pair.  

    ``` bash
    keytool -export -alias <cert_alias> -file <certificate_path> -keystore <keystore path>>
    ```

3. Import the public cert of Server A to the client truststores of all the servers including Server A.

    ``` bash
    keytool -import -trustcacerts -alias <cert_alias> -file <certificate_path> -keystore <trustore_path> -storepass <keystore_password> -noprompt
    ```

4. Repeat above steps for all the servers.

5. If there is an Active Directory/LDAP configured in your deployment, add the Active Directory certificate to the 
client-truststore of all the servers.

## Copying the deployment.toml

WSO2 Open Banking Accelerator contains TOML-based configurations. All the server-level configurations of the instance 
can be applied using a single configuration file, which is the `deployment.toml` file. 

1. Replace the existing `deployment.toml` file in the API Manager as follows:

    - Go to the `<APIM_HOME>/<OB_APIM_ACCELERATOR_HOME>/repository/resources` directory.
    
    - Rename `wso2am-4.0.0-deployment.toml` to `deployment.toml`.
    
    - Copy the `deployment.toml` file to the `<APIM_HOME>/repository/conf` directory and replace the existing file.
        
2. Replace the existing `deployment.toml` file in the Identity Server as follows:

    - Go to the `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/repository/resources` directory.
    
    - Rename `wso2is-5.11.0-deployment.toml` to `deployment.toml`.
    
    - Copy the `deployment.toml` file to the `<IS_HOME>/repository/conf` directory to replace the existing file.
     
3. Replace the existing `deployment.yaml` file in the Streaming Integrator as follows:

    - Go to the `<SI_HOME>/<OB_BI_ACCELERATOR_HOME>/repository/resources` directory.
    
    - Rename `wso2si-4.0.0-deployment.yaml` to `deployment.yaml`.
    
    - Copy the `deployment.yaml` file to the `<SI_HOME>/conf/server` directory to replace the existing file.
     
3. For instructions on how to configure the deployment.toml file, see the following topics:

    - [Configuring Identity Server for open banking](configuring-identity-server-for-ob.md)
    - [Configuring API Manager for open banking](configuring-api-manager-for-ob.md)

    !!! note
        For instructions on configuring Streaming Integrator for open banking, see 
        [Try out publishing data](../learn/data-publishing-tryout.md).
