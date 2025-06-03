This section guides you to set up and prepare the servers to run WSO2 Open Banking Accelerator.

## Installing base products

WSO2 Open Banking Accelerator is a technology stack catered to speed up the implementation of an open banking solution.
The accelerators run on top of WSO2 Identity Server, which are referred to as base products.

1. Before setting up the accelerator, download and install the base products.

   | Base Product              | Version                                                                     | 
   |---------------------------|-----------------------------------------------------------------------------|
   | WSO2 Identity Server      | [7.1.0](https://wso2.com/identity-server/)                                  |
   | WSO2 Identity Server      | [7.0.0](https://wso2.com/identity-and-access-management/previous-releases/) |

## Installing WSO2 Open Banking Accelerator

!!! tip "Before you begin"
See the environment [compatibility](prerequisites.md) to determine whether the current accelerator version is
compatible with your operating system.

1. Download and extract the latest WSO2 Open Banking Accelerator 4.0.0 version.

    - Current latest version [4.0.0](https://github.com/wso2/financial-services-accelerator/releases/tag/v4.0.0).

2. WSO2 Open Banking Accelerator contains the following accelerator.

    - wso2-fsiam-accelerator-4.x.0

3. Go to the root directory of WSO2 Identity Server. The root directory is the product home.

   !!! tip
   This documentation will refer to the product home as `<IS_HOME>`.

4. Place the relevant accelerator zip file and extract it in its respective product home:

   | File                             | Directory location to place the Accelerator |
   |----------------------------------|---------------------------------------------|
   | wso2-fsiam-accelerator-4.0.0.zip | `<IS_HOME>`                                 |

   !!! tip
   This documentation will refer to the above-extracted directory of the accelerator as `<FS_IS_ACCELERATOR_HOME>`.

## Getting WSO2 Updates

The WSO2 Update tool delivers hotfixes and updates seamlessly on top of products as WSO2 Updates. They include
improvements that are released by WSO2. You need to update the base products and accelerators using the relevant script.

1. Go to `<IS_HOME>/bin` and run the WSO2 Update tool:

    ```bash tab='On Linux'
    ./wso2update_linux 
    ```

    ```bash tab='On Mac'
    ./wso2update_darwin
    ```

    ```bash tab='On Windows'
    ./wso2update_windows.exe
    ```

2. Go to `<FS_IS_ACCELERATOR_HOME>/bin` and run the WSO2 Update tool:

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

!!! tip
When you obtain WSO2 Updates, always run the `merge.sh` script in the Accelerator to reflect the
latest changes. Follow steps 1 to 3 in the [Setting up Accelerator](#setting-up-accelerator) section for instructions.

## Setting up Accelerator

1. To copy the accelerator files to the Identity Server, go to the `<IS_HOME>/<FS_IS_ACCELERATOR_HOME>/bin` directory
   and run the merge script as follows:

    ```bash tab='On Linux'
    ./merge.sh
    ```

    ```bash tab='On Mac'
    ./merge.sh
    ```

    ```bash tab='On Windows'
    ./merge.ps1
    ```

??? warning "If you are using windows platform..."
If you are using windows platform, since the merge.ps1 file is not digitally signed yet,
your powershell might prevent you from running this script normally. In that case you
may need to run it in a powershell instance where its execution policy is set to bypass mode.

    Use the following command to run it in execution policy bypassed powershell environment.

    ```
    powershell -executionpolicy bypass .\merge.ps1
    ```

    IMPORTANT : Do not run any other unverified scripts using this way. This is a temporary solution.

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

The WSO2 Open Banking Accelerator may run in different machines/servers. It is mandatory to open the ports of each server to
allow a successful data flow. The instances mentioned below specify the ports that need to be opened:

| Instance/Product     | 	Port    | Usage                                                                                                       |
|----------------------|----------|-------------------------------------------------------------------------------------------------------------|
| WSO2 Identity Server | 9446     | HTTPS servlet transport <br/> The default URL of the Management Console is `https://<IS_HOST>:9446/console` |

## Exchanging the certificates

??? warning "If you are using the default keystore available in the product, click here to see how to update keystore..."
If you are using the default keystore available in the product, update them by removing any unnecessary or expired
Root CA Certificates.

```bash tab='wso2is-7.1.0'
    1. The keystore is available in the `<IS_HOME>/repository/resources/security/wso2carbon.p12` files.
    
    2. Use the following command to list and identify problematic certificates:
      
          keytool -list -v -keystore wso2carbon.p12
    
    3. Remove the certificates using the alias as follows: 
      
          keytool -delete -alias <ALIAS_TO_REMOVE> -keystore wso2carbon.p12
```

```bash tab='wso2is-7.0.0'
    1. The keystore is available in the `<IS_HOME>/repository/resources/security/wso2carbon.jks` files.
    
    2. Use the following command to list and identify problematic certificates:
      
          keytool -list -v -keystore wso2carbon.jks
    
    3. Remove the certificates using the alias as follows: 
          
          keytool -delete -alias <ALIAS_TO_REMOVE> -keystore wso2carbon.jks
```

!!! optional "If you are using multiple servers, click here to see how to exchange the certificates..."
In order to enable secure communication, we need to install the certificates of each component in others. This will
facilitate a Secure Socket Layer (SSL). Follow the steps below to implement this:

!!! tip "Creating new keystore"

     1. Create a new keystore by following the [Identity Server documentation](https://is.docs.wso2.com/en/latest/deploy/security/keystores/create-new-keystores/).
     2. Configure the new keystore by following the [Identity Server documentation](https://is.docs.wso2.com/en/latest/deploy/security/keystores/configure-keystores/).

1. Generate a key against the keystore of a particular server. For example, server A with an alias and common name that
   is equal to the hostname.

    ``` bash
    keytool -genkey -alias <keystore_alias> -keyalg RSA -keysize 2048 -validity 3650 -keystore <keystore_path> -storepass <keystore_password> -keypass <key password> -noprompt
    ```

2. Export the public certificate of the newly generated key pair.

    ``` bash
    keytool -export -alias <cert_alias> -file <certificate_path> -keystore <keystore path>>
    ```

3. Import the public cert of Server A to client truststores of all the servers including Server A.

    ``` bash
    keytool -import -trustcacerts -alias <cert_alias> -file <certificate_path> -keystore <trustore_path> -storepass <keystore_password> -noprompt
    ```

4. Repeat above steps for all the servers.

5. If there is an Active Directory/LDAP configured in your deployment, add the Active Directory certificate to the
   client-truststore of all the servers.

6. Upload Root and Issuer certificates.

   - Upload the [root and issuer certificates](https://drive.google.com/drive/folders/1jjiJQVMbSaTQ7ZOwYeY32LeAc--5LgNC) of OBIE to the client-truststore in <IS_HOME>/repository/resources/security/ 
   using the following command:

    ``` bash
    keytool -import -alias <alias> -file <certificate_location> -keystore <truststore_location> -storepass wso2carbon
    ```

## Copying the deployment.toml

WSO2 Open Banking Accelerator contains TOML-based configurations. All the server-level configurations of the instance
can be applied using a single configuration file, which is the `deployment.toml` file.

1. Replace the existing `deployment.toml` file in the Identity Server as follows:

    - Go to the `<IS_HOME>/<FS_IS_ACCELERATOR_HOME>/repository/resources` directory.

    - Rename `wso2is-7.x.x-deployment.toml` to `deployment.toml` based on your base product version.

    - Copy the `deployment.toml` file to the `<IS_HOME>/repository/conf` directory to replace the existing file.

2. For instructions on how to configure the deployment.toml file, see the following topics:

    - [Configuring Identity Server for open banking](configuring-identity-server-for-ob.md)
