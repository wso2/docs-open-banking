# Set up Accelerators with WSO2 Identity Server

This section guides you to set up and prepare your server to run WSO2 Open Banking Accelerator.

## Step 1: Set up WSO2 Open Banking Accelerator for WSO2 Identity Server[​](#step-1-set-up-wso2-open-banking-accelerator-for-wso2-identity-server "Direct link to Step 1: Set up WSO2 Open Banking Accelerator for WSO2 Identity Server")

Copy the extracted accelerator directory into the root directory of the WSO2 Identity Server.

| File                           | Directory location to place the Accelerator |
| ------------------------------ | ------------------------------------------- |
| `wso2-fsiam-accelerator-4.x.0` | `<IS_HOME>`                                 |

tip

This documentation will refer to the above-extracted directory of the accelerator as `<OB_IS_ACCELERATOR_HOME>`.

## Step 2: Configure database scripts[​](#step-2-configure-database-scripts "Direct link to Step 2: Configure database scripts")

note

WSO2 Open Banking Accelerator is [compatible](/en/latest/install-and-setup/prerequisites/.md#compatibility) with the following DBMSs:

* MySQL 8.0
* Oracle 19c
* Microsoft SQL Server 2022
* PostgreSQL 17.2

This section explains how to set up the solution with a MySQL 8.0 database server. For other DBMS, see [Setting up databases](/en/latest/install-and-setup/setting-up-databases/.md).

1. Open the `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/repository/conf/configure.properties` file.

2. Configure the hostnames of the Identity Server.

3. Configure database-related properties and database names.

4. Modify the product version in the `IS_PRODUCT` and `PRODUCT_CONF_PATH` parameters to match the base product version.

## Step 3: Set up the IS server[​](#step-3-set-up-the-is-server "Direct link to Step 3: Set up the IS server")

1. Run the merge script in `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin`:

   * On Linux
   * On Mac
   * On Windows

   ```
   ./merge.sh
   ```

   ```
   ./merge.sh
   ```

   ```
   ./merge.ps1
   ```

2. Run the configure file in `<IS_HOME>/<OB_IS_ACCELERATOR_HOME>/bin`:

   * Linux
   * On Mac
   * On Windows

   ```
   ./configure.sh
   ```

   ```
   ./configure.sh
   ```

   ```
   ./configure.ps1
   ```

   If you are using Windows platform...

   If you are using Windows platform, since the `merge.ps1` and `configure.ps1` files are not digitally signed yet, your PowerShell might prevent you from running them normally. In that case, you may need to run these scripts in a PowerShell instance where its execution policy is set to bypass mode.

   Use the following command to run these scripts in execution policy bypassed PowerShell environment:

   ```
   powershell -executionpolicy bypass .\merge.ps1
   ```

   ```
   powershell -executionpolicy bypass .\configure.ps1
   ```

   **IMPORTANT**: Do not run any other unverified scripts using this method. This is a temporary solution.

3. Run the database script that resides in the `<IS_HOME>/dbscripts/financial-services/event-notifications` directory to create database tables for the event notification feature in the `fs_consentdb` database.

<!-- -->

## Step 4: Upload Root and Issuer Certificates[​](#step-4-upload-root-and-issuer-certificates "Direct link to Step 4: Upload Root and Issuer Certificates")

Upload the root and issuer certificates of OBIE ([Sandbox Certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/252018873/OB+Root+and+Issuing+Certificates+for+Sandbox) | [Production Certificates](https://openbanking.atlassian.net/wiki/spaces/DZ/pages/80544075/OB+Root+and+Issuing+Certificates+for+Production)) to the client trust stores in `<IS_HOME>/repository/resources/security/client-truststore.p12` using the following command:

```
keytool -import -alias <alias> -file <certificate_location> -keystore <truststore_location> -storepass wso2carbon
```

## Step 5: Start the Server[​](#step-5-start-the-server "Direct link to Step 5: Start the Server")

1. Run the following command in `<IS_HOME>/bin`:

   ```
   ./wso2server.sh
   ```
