# Configuration Catalog for Identity Server

The configuration model of WSO2 Identity Server is based on the `toml` format. The `<IS_HOME>/repository/conf/deployment.toml` file is the single source used to configure and tune various features.

This document describes all the configuration parameters that are used in the Identity Server for WSO2 Open Banking.

## Instructions for use[​](#instructions-for-use "Direct link to Instructions for use")

> Select the configuration sections, parameters, and values that are required for your use and add them to the `.toml` file.

## Server[​](#server "Direct link to Server")

\[ ]**

```
[server]
hostname = "localhost"
node_ip = "127.0.0.1"
base_path = "https://$ref{server.hostname}:${carbon.management.port}"
serverDetails = "WSO2 IS as KM 7.2.0"
mode = "single"
userAgent = "WSO2 IS as KM 7.2.0"
offset = 3
```

`[server]` Required

This includes configurations required for deploying an Identity Server node.

`hostname`

string Required

Default: `"localhost"`

Possible Values:

<!-- -->

`"localhost","127.0.0.1","<any-ip-address>","<any-hostname>"`

The hostname of the machine hosting the Identity Server instance.

`node_ip`

string Required

Default: `127.0.0.1`

The IP address of the machine hosting the Identity Server instance.

`base_path`

string Required

Default:

<!-- -->

`${carbon.protocol}://${carbon.host}:${carbon.management.port}`

Defines the base path URL to access the server.

`serverDetails`

string Required

Default:

<!-- -->

`WSO2 IS as KM 7.2.0`

Description of the server.

`mode`

string Required

Default: `single`

Possible Values: `single,ha`

Defines the type of deployment, whether it is a single node deployment or a High Availability (HA) cluster.

`userAgent`

string Required

Default: `WSO2 IS as KM 7.2.0`

`offset`

integer Required

Default: `3`

Port offset allows you to run multiple WSO2 products, multiple instances of a WSO2 product, or multiple WSO2 product clusters on the same server or virtual machine (VM). Port offset defines the number by which all ports defined in the runtime such as the HTTP/S ports will be offset. For example, if the default HTTP port is 9443 and the port offset is 3, the effective HTTP port will be 9446. Therefore, for each additional WSO2 product instance, set the port offset to a unique value so that they can all run on the same server without any port conflicts.

## Tenant management[​](#tenant-management "Direct link to Tenant management")

\[ ]**

```
[tenant_mgt]
enable_email_domain = true
```

`[tenant_mgt]` Required

Configurations related to tenant users.

`enable_email_domain`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

Enable email login for tenant users.

## Super admin[​](#super-admin "Direct link to Super admin")

\[ ]**

```
[super_admin]
username = "is_admin@wso2.com"
password = "wso2123"
create_admin_account = true
```

`[super_admin]` Required

This includes the configurations related to the super admin user.

`username`

string Required

Default: `is_admin@wso2.com`

The username of the super admin user.

`password`

string Required

Default: `wso2123`

The password of the super admin user.

`create_admin_account`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

Set this to true, to create a new user with the super admin details given.

## User management database[​](#user-management-database "Direct link to User management database")

\[ ]**

```
[realm_manager]
data_source= "WSO2USER_DB"
```

`[realm_manager]` Required

This includes the datasource configurations for the user management database.

`data_source`

string Required

Default: `WSO2USER_DB`

The datasource used by the user manager.

## User store[​](#user-store "Direct link to User store")

\[ ]**

```
[user_store]
type = "database_unique_id"
class = "org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager"
```

`[user_store]` Required

This includes the configurations related to the user store.

`type`

string Required

Default: `database_unique_id`

`class`

string Required

Default:

<!-- -->

`org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager`

## User store properties[​](#user-store-properties "Direct link to User store properties")

\[ ]**

```
[user_store.properties]
UsernameJavaRegEx = "a-zA-Z0-9@._-{3,30}$"
UsernameJavaScriptRegEx = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
SCIMEnabled = false
IsBulkImportSupported = false
LeadingOrTrailingSpaceAllowedInUserName = false
UsernameWithEmailJavaScriptRegEx = "^[\\S]{3,30}$"
```

`[user_store.properties]` Required

`UsernameJavaRegEx`

string Required

Default: `a-zA-Z0-9@._-{3,30}$`

A regular expression to validate usernames. By default, strings have a length of 5 to 30. Only non-empty characters are allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.

`UsernameJavaScriptRegEx`

string Required

Default: `^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$`

The regular expression used by the front-end components for username validation.

`SCIMEnabled`

boolean Required

Default: `FALSE`

Possible Values: `true,false`

This is to configure whether the user store is supported for SCIM provisioning.

`IsBulkImportSupported`

boolean Required

Default: `FALSE`

Possible Values: `true,false`

This is to configure whether the user store is supported for bulk imports.

`LeadingOrTrailingSpaceAllowedInUserName`

boolean Required

Default: `FALSE`

Possible Values: `true,false`

This is to configure whether the username can contain leading or trailing spaces.

`UsernameWithEmailJavaScriptRegEx`

string Required

Default: `^[\S]{3,30}$`

A regular expression to validate usernames that contain an email address. By default, strings have a length of 3 to 30. Only non-empty characters are allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.

## Authorization manager[​](#authorization-manager "Direct link to Authorization manager")

\[ ]**

```
[authorization_manager]
class = "org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager"
```

`[authorization_manager]` Required

This includes the configurations related to the authorization manager.

`class`

string Required

Default: `org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager`

The Authorization Manager for your server.

## Authorization manager properties[​](#authorization-manager-properties "Direct link to Authorization manager properties")

\[ ]**

```
[authorization_manager.properties]
AdminRoleManagementPermissions = "/permission"
AuthorizationCacheEnabled = true
GetAllRolesOfUserEnabled = false
```

`[authorization_manager.properties]` Required

`AdminRoleManagementPermissions`

string Required

Default: `/permission`

Sets the registry path where the authorization information (role-based permissions) are stored.

`AuthorizationCacheEnabled`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

To enable authorization cache.

`GetAllRolesOfUserEnabled`

boolean Required

Default: `FALSE`

Possible Values: `true,false`

Enable this if there are any performance issues in the production environment. Enabling this property affects the performance when the user logs in. This depends on the users, roles and permission stats.

## Shared database configurations[​](#shared-database-configurations "Direct link to Shared database configurations")

\[ ]**

```
[database.shared_db]
url = "jdbc:mysql://localhost:3306/fs_iskm_configdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.shared_db]` Required

Configurations related to the databases shared between nodes.

`url`

string Required

Default: `jdbc:mysql://localhost:3306/fs_iskm_configdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the fs\_iskm\_configdb database.

`username`

string Required

Default: `root`

The username used for the database connection

`password`

string Required

Default: `root`

The password used for the database connection

`driver`

string Required

Default: `com.mysql.jdbc.Driver`

Possible Values: `com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver`

The name of the JDBC driver.

## Shared database connection pool configurations[​](#shared-database-connection-pool-configurations "Direct link to Shared database connection pool configurations")

\[ ]**

```
[database.shared_db.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false
```

`[database.shared_db.pool_options]` Required

`maxActive`

string Required

Default: `150`

Tuning parameters. Change according to the preferred database.

`maxWait`

string Required

Default: `60000`

Tuning parameters. Change according to the preferred database.

`minIdle`

string Required

Default: `5`

Tuning parameters. Change according to the preferred database.

`testOnBorrow`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

Tuning parameters. Change according to the preferred database.

`validationQuery`

string Required

Default: `SELECT 1`

Possible Values: `SELECT 1,SELECT 1 FROM DUAL`

Tuning parameters. Change according to the preferred database. For Oracle DBMS, use "SELECT 1 FROM DUAL".

`validationInterval`

string Required

Default: `30000`

Tuning parameters. Change according to the preferred database.

`defaultAutoCommit`

boolean Required

Default: `FALSE`

Possible Values: `true,false`

Tuning parameters. Change according to the preferred database.

## Identity database configurations[​](#identity-database-configurations "Direct link to Identity database configurations")

\[ ]**

```
[database.identity_db]
url = "jdbc:mysql://localhost:3306/fs_identitydb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.identity_db]` Required

`url`

string Required

Default: `jdbc:mysql://localhost:3306/fs_identitydb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the fs\_identitydb database, which contains Identity data.

`username`

string Required

Default: `root`

The username used for the database connection

`password`

string Required

Default: `root`

The password used for the database connection

`driver`

string Required

Default: `com.mysql.jdbc.Driver`

Possible Values: `com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver`

The name of the JDBC driver.

## Identity database connection pool configurations[​](#identity-database-connection-pool-configurations "Direct link to Identity database connection pool configurations")

\[ ]**

```
[database.identity_db.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false
```

`[database.identity_db.pool_options]` Required

`maxActive`

string Required

Default: `150`

Tuning parameters. Change according to the preferred database.

`maxWait`

string Required

Default: `60000`

Tuning parameters. Change according to the preferred database.

`minIdle`

string Required

Default: `5`

Tuning parameters. Change according to the preferred database.

`testOnBorrow`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

Tuning parameters. Change according to the preferred database.

`validationQuery`

string Required

Default: `SELECT 1`

Possible Values: `SELECT 1,SELECT 1 FROM DUAL`

Tuning parameters. Change according to the preferred database. For Oracle DBMS, use "SELECT 1 FROM DUAL".

`validationInterval`

string Required

Default: `30000`

Tuning parameters. Change according to the preferred database.

`defaultAutoCommit`

boolean Required

Default: `FALSE`

Possible Values: `true,false`

Tuning parameters. Change according to the preferred database.

## Identity config registry database[​](#identity-config-registry-database "Direct link to Identity config registry database")

\[ ]**

```
[database.config]
url = "jdbc:mysql://localhost:3306/fs_iskm_configdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.config]` Required

Configurations related to the Identity config registry database.

`url`

string Required

Default: `jdbc:mysql://localhost:3306/fs_iskm_configdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the fs\_iskm\_configdb database.

`username`

string Required

Default: `root`

The username used for the database connection

`password`

string Required

Default: `root`

The password used for the database connection

`driver`

string Required

Default: `com.mysql.jdbc.Driver`

Possible Values: `com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver`

The name of the JDBC driver.

## Config registry database connection pool configurations[​](#config-registry-database-connection-pool-configurations "Direct link to Config registry database connection pool configurations")

\[ ]**

```
[database.config.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false
```

`[database.config.pool_options]` Required

`maxActive`

string Required

Default: `150`

Tuning parameters. Change according to the preferred database.

`maxWait`

string Required

Default: `60000`

Tuning parameters. Change according to the preferred database.

`minIdle`

string Required

Default: `5`

Tuning parameters. Change according to the preferred database.

`testOnBorrow`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

Tuning parameters. Change according to the preferred database.

`validationQuery`

string Required

Default: `SELECT 1`

Possible Values: `SELECT 1,SELECT 1 FROM DUAL`

Tuning parameters. Change according to the preferred database. For Oracle DBMS, use "SELECT 1 FROM DUAL".

`validationInterval`

string Required

Default: `30000`

Tuning parameters. Change according to the preferred database.

`defaultAutoCommit`

boolean Required

Default: `FALSE`

Possible Values: `true,false`

Tuning parameters. Change according to the preferred database.

## User Management database configurations[​](#user-management-database-configurations "Direct link to User Management database configurations")

\[ ]**

```
[database.user]
url = "jdbc:mysql://localhost:3306/fs_userdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.user]` Required

`url`

string Required

Default: `jdbc:mysql://localhost:3306/fs_userdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the fs\_userdb database, which contains user management data.

`username`

string Required

Default: `root`

The username used for the database connection

`password`

string Required

Default: `root`

The password used for the database connection

`driver`

string Required

Default: `com.mysql.jdbc.Driver`

Possible Values: `com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver`

The name of the JDBC driver.

## User Management database connection pool configurations[​](#user-management-database-connection-pool-configurations "Direct link to User Management database connection pool configurations")

\[ ]**

```
[database.user.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false
```

`[database.user.pool_options]` Required

`maxActive`

string Required

Default: `150`

Tuning parameters. Change according to the preferred database.

`maxWait`

string Required

Default: `60000`

Tuning parameters. Change according to the preferred database.

`minIdle`

string Required

Default: `5`

Tuning parameters. Change according to the preferred database.

`testOnBorrow`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

Tuning parameters. Change according to the preferred database.

`validationQuery`

string Required

Default: `SELECT 1`

Possible Values: `SELECT 1,SELECT 1 FROM DUAL`

Tuning parameters. Change according to the preferred database. For Oracle DBMS, use "SELECT 1 FROM DUAL".

`validationInterval`

string Required

Default: `30000`

Tuning parameters. Change according to the preferred database.

`defaultAutoCommit`

boolean Required

Default: `FALSE`

Possible Values: `true,false`

Tuning parameters. Change according to the preferred database.

## Open Banking Consent datasource[​](#open-banking-consent-datasource "Direct link to Open Banking Consent datasource")

\[ ]**

```
[[datasource]]
id="WSO2OB_DB"
url = "jdbc:mysql://localhost:3306/fs_consentdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
jmx_enable=false
pool_options.maxActive = "150"
pool_options.maxWait = "60000"
pool_options.minIdle = "5"
pool_options.testOnBorrow = true
pool_options.validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
pool_options.validationInterval="30000"
pool_options.defaultAutoCommit=false
```

`[datasource]` Required

Configurations related to the open banking consent datasource.

`id`

string Required

Default: `WSO2FS_DB`

The datasource used by the open banking.

`url`

string Required

Default: `jdbc:mysql://localhost:3306/fs_consentdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the fs\_consentdb database.

`username`

string Required

Default: `root`

The username used for the database connection

`password`

string Required

Default: `root`

The password used for the database connection

`driver`

string Required

Default: `com.mysql.jdbc.Driver`

Possible Values: `com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver`

The name of the JDBC driver.

`jmx_enable`

boolean Required

Default: `FALSE`

Possible Values: `true,false`

Use this parameter to enable JMX for the database connection.

`pool_options.maxActive`

string Required

Default: `150`

Tuning parameters. Change according to the preferred database.

`pool_options.maxWait`

string Required

Default: `60000`

Tuning parameters. Change according to the preferred database.

`pool_options.minIdle`

string Required

Default: `5`

Tuning parameters. Change according to the preferred database.

`pool_options.testOnBorrow`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

Tuning parameters. Change according to the preferred database.

`pool_options.validationQuery`

string Required

Default: `SELECT 1`

Possible Values: `SELECT 1,SELECT 1 FROM DUAL`

Tuning parameters. Change according to the preferred database. For Oracle DBMS, use "SELECT 1 FROM DUAL".

`pool_options.validationInterval`

string Required

Default: `30000`

Tuning parameters. Change according to the preferred database.

`pool_options.defaultAutoCommit`

boolean Required

Default: `FALSE`

Possible Values: `true,false`

Tuning parameters. Change according to the preferred database.

## Primary keystore[​](#primary-keystore "Direct link to Primary keystore")

\[ ]**

```
[keystore.primary]
name = "wso2carbon.p12"
password = "wso2carbon"
type="PKCS12"
```

`[keystore.primary]` Required

Configurations related to the primary keystore.

`file_name`

string Required

Default: `wso2carbon.p12`

The filename of the primary keystore.

`password`

string Required

Default: `wso2carbon`

The password of the keystore file

`type`

string Required

Default: `PKCS12`

The type of the keystore file

## Truststore[​](#truststore "Direct link to Truststore")

\[ ]**

```
[truststore]
file_name="client-truststore.p12"
password="wso2carbon"
type="PKCS12"
```

`[truststore]` Required

Configurations related to the truststore.

`file_name`

string Required

Default: `client-truststore.p12`

The filename of the truststore.

`password`

string Required

Default: `wso2carbon`

The password of the truststore file

`type`

string Required

Default: `PKCS12`

The type of the truststore file

## Authentication endpoints[​](#authentication-endpoints "Direct link to Authentication endpoints")

\[ ]**

```
[authentication.endpoints]
login_url = "https://localhost:9446/authenticationendpoint/login.do"
retry_url = "https://localhost:9446/authenticationendpoint/retry.do"
```

`[authentication.endpoints]` Required

The URLs of the authentication web application.

`login_url`

string Required

Default: `https://localhost:9446/authenticationendpoint/login.do`

`retry_url`

string Required

Default: `https://localhost:9446/authenticationendpoint/retry.do`

## Authentication endpoint redirect parameters[​](#authentication-endpoint-redirect-parameters "Direct link to Authentication endpoint redirect parameters")

\[ ]**

```
[authentication.endpoint.redirect_params]
filter_policy = "include"
remove_on_consume_from_api = "true"
parameters = ["sessionDataKeyConsent","relyingParty", "authenticators", "authFailureMsg", "authFailure"]
```

`[authentication.endpoint.redirect_params]` Required

`filter_policy`

string Required

Default: `include`

Possible Values:``

When the action is set to include, the defined parameters will be sent to the authentication endpoint as a query parameter.

`remove_on_consume_from_api`

string Required

Default: `TRUE`

`parameters`

string Required

Default: `["sessionDataKeyConsent","relyingParty", "authenticators", "authFailureMsg", "authFailure"]`

## SMS OTP Authenticator parameters[​](#sms-otp-authenticator-parameters "Direct link to SMS OTP Authenticator parameters")

\[ ]**

```
[authentication.authenticator.sms_otp.parameters]
EnableAccountLockingForFailedAttempts = true
BackupCode = false
TokenExpiryTime = 60
```

`[authentication.authenticator.sms_otp.parameters]` Required

`EnableAccountLockingForFailedAttempts`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

To enable account locking for each type of OTP attempt, set it to true.

`BackupCode`

string Required

Default: `FALSE`

Possible Values: `true,false`

To set up backup codes.

`TokenExpiryTime`

string Required

Default: `60`

Set up the expiration time for the token.

## OAuth endpoints[​](#oauth-endpoints "Direct link to OAuth endpoints")

\[ ]**

```
[oauth.endpoints.v2]
oauth2_consent_page = "${carbon.protocol}://localhost:${carbon.management.port}/fs/authenticationendpoint/oauth2_authz.do"
oidc_consent_page = "${carbon.protocol}://localhost:${carbon.management.port}/fs/authenticationendpoint/oauth2_consent.do"
```

`[oauth.endpoints.v2]` Required

The OAuth endpoints for the Identity Server.

`oauth2_consent_page`

string Required

Default: `${carbon.protocol}://localhost:${carbon.management.port}/fs/authenticationendpoint/oauth2_authz.do`

`oidc_consent_page`

string Required

Default: `${carbon.protocol}://localhost:${carbon.management.port}/fs/authenticationendpoint/oauth2_consent.do`

## OAuth DCR[​](#oauth-dcr "Direct link to OAuth DCR")

\[ ]**

```
[oauth.dcr]
enable_fapi_enforcement=true
ssa_jkws= "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks"
```

`[oauth.dcr]`

OAuth DCR Endpoint configurations

`enable_fapi_enforcement`

boolean

Default: `true`

By default, all applications created via OAuth DCR endpoint will be FAPI enforced. If you wnt to change it change this to false

`ssa_jkws`

string

Default: `https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks`

Add the org jwks endpoint to validate the signature of the SSA

## Accelerator Service Extension Configuration[​](#accelerator-service-extension-configuration "Direct link to Accelerator Service Extension Configuration")

\[ ]**

```
[financial_services.extensions.endpoint]
enabled = false
allowed_extensions = ["pre_process_client_creation", "pre_process_client_update", "pre_process_client_retrieval",
"pre_process_consent_creation", "enrich_consent_creation_response", "pre_process_consent_file_upload",
"enrich_consent_file_response", "pre_process_consent_retrieval", "validate_consent_file_retrieval",
"pre_process_consent_revoke", "enrich_consent_search_response", "populate_consent_authorize_screen",
"persist_authorized_consent", "validate_consent_access", "issue_refresh_token", "validate_authorization_request",
"validate_event_subscription", "enrich_event_subscription_response", "validate_event_creation",
"validate_event_polling", "enrich_event_polling_response", "map_accelerator_error_response"]
base_url = ""
retry_count = 5
connect_timeout = 5
read_timeout = 5
```

`[financial_services.extensions.endpoint]`

`enabled`

boolean

Default: `false`

This configuration will enable the Accelerator Service Extension

`allowed_extensions`

string

Default: `["pre_process_client_creation", "pre_process_client_update", "pre_process_client_retrieval", "pre_process_consent_creation", "enrich_consent_creation_response", "pre_process_consent_file_upload", "enrich_consent_file_response", "pre_process_consent_retrieval", "validate_consent_file_retrieval", "pre_process_consent_revoke", "enrich_consent_search_response", "populate_consent_authorize_screen", "persist_authorized_consent", "validate_consent_access", "issue_refresh_token", "validate_authorization_request", "validate_event_subscription", "enrich_event_subscription_response", "validate_event_creation", "validate_event_polling", "enrich_event_polling_response", "map_accelerator_error_response"]`

This configuration will be used to enable the required extension points

`base_url`

string

Base URL of the implemented Accelerator Extensions

`retry_count`

integer

Default: `5`

This configuration will be used to configure the no of retry counts for the extension points

`connect_timeout`

integer

Default: `5`

This configuration will be used to configure the connection timeout for the extension points

`read_timeout`

integer

Default: `5`

This configuration will be used to configure the read timeout for the extension points

## Accelerator Service Extension Endpoint Security Configuration[​](#accelerator-service-extension-endpoint-security-configuration "Direct link to Accelerator Service Extension Endpoint Security Configuration")

\[ ]**

```
[financial_services.extensions.endpoint.security]
type = "Basic-Auth"
username = ""
password = ""
```

`[financial_services.extensions.endpoint.security]`

`username`

string

Basic Auth username of the Accelerator Extension

`password`

string

Basic Auth password of the Accelerator Extension

## Primary authenticator[​](#primary-authenticator "Direct link to Primary authenticator")

\[ ]**

```
[financial_services.app_registration.sca.primaryauth]
name = ""
display = ""
```

`[financial_services.app_registration.sca.primaryauth]`

Configures the primary authenticator.

`name`

string

Default:``

Possible Values: `BasicAuthenticator,IdentifierExecutor`

The name of the primary authenticator to be engaged in the authentication flow.

`display`

string

Default:``

Possible Values: `basic,identifier-first`

## Identity provider configurations[​](#identity-provider-configurations "Direct link to Identity provider configurations")

\[ ]**

```
[financial_services.app_registration.sca.idp]
name = "FacebookIdP"
step = 2
```

`[financial_services.app_registration.sca.idp]`

`name`

string

Default:``

Configure the identity provider as the secondary authentication method. The example given here is for SMS OTP.

`step`

integer

Default:``

Configure the at which step the identity provider should be configured.

## Conditional Auth Script configurations[​](#conditional-auth-script-configurations "Direct link to Conditional Auth Script configurations")

\[ ]**

```
[financial_services.app_registration.conditional.auth.script]
filename=""
```

`[financial_services.app_registration.conditional.auth.script]`

`filename`

string

Default:``

Put the conditional auth script inside the \<IAM\_HOME>/repository/conf folder and config the file name.

## Open Banking DCR - Configure Request Parameters[​](#open-banking-dcr-configure-request-parameters "Direct link to Open Banking DCR - Configure Request Parameters")

\[ ]**

```
[[financial_services.app_registration.dcr.params]]
name = "SoftwareId"
key = "software_id"
required = false
include_in_response = true
```

`[[financial_services.app_registration.dcr.params]]`

`name`

string

Sample: `Scope`

Name of the DCR Request Attribute

`key`

string

Sample: `scope`

Key of the paramater in the DCR Request Attribute

`required`

boolean

Sample: `false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered as a optional request parameter in the DCR request.

`include_in_response`

boolean

Sample: `true`

If you want to include this parameter in the DCR Response, set this tag to true.

`allowed_values`

string

Sample: `["accounts", "payments", "fundsconfirmations"]`

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow.

Following attributes are by default included in deployment.toml file. You can modify these according to the specification. Also can add new configurations for parameters that are not specified below

```

[[financial_services.app_registration.dcr.params]]
name = "SoftwareId"
key = "software_id"
required = false
include_in_response = true

[[financial_services.app_registration.dcr.params]]
name = "Scope"
key = "scope"
required = true
include_in_response = true
allowed_values = ["accounts", "payments", "fundsconfirmations"]

[[financial_services.app_registration.dcr.params]]
name = "RedirectUris"
key = "redirect_uris"
required = true
include_in_response = true

[[financial_services.app_registration.dcr.params]]
name = "GrantTypes"
key = "grant_types"
required = true
include_in_response = true
allowed_values = ["authorization_code", "refresh_token", "client_credentials"]

[[financial_services.app_registration.dcr.params]]
name = "SoftwareStatement"
key = "software_statement"
required = true
include_in_response = true

[[financial_services.app_registration.dcr.params]]
name = "ApplicationType"
key = "application_type"
required = true
include_in_response = true
allowed_values = ["web"]

[[financial_services.app_registration.dcr.params]]
name = "TokenEndpointAuthMethod"
key = "token_endpoint_auth_method"
required = true
include_in_response = true

[[financial_services.app_registration.dcr.params]]
name = "IdTokenSignatureAlgorithm"
key = "id_token_signed_response_alg"
required = true
include_in_response = true

[[financial_services.app_registration.dcr.params]]
name = "RequestObjectSignatureAlgorithm"
key = "request_object_signing_alg"
required = true
include_in_response = true

[[financial_services.app_registration.dcr.params]]
name = "Iss"
key = "iss"
required = true
include_in_response = false

[[financial_services.app_registration.dcr.params]]
name = "Iat"
key = "iat"
required = true
include_in_response = false

[[financial_services.app_registration.dcr.params]]
name = "Exp"
key = "exp"
required = true
include_in_response = false

[[financial_services.app_registration.dcr.params]]
name = "Jti"
key = "jti"
required = true
include_in_response = false

[[financial_services.app_registration.dcr.params]]
name = "Aud"
key = "aud"
required = true
include_in_response = false
```

## Open Banking DCR - Request Validators Configuration[​](#open-banking-dcr-request-validators-configuration "Direct link to Open Banking DCR - Request Validators Configuration")

\[ ]**

```
[[financial_services.app_registration.dcr.validators.validator]]
name = "RequiredParamsValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.RequiredParamsValidator"
enable = true
priority = 1
[[financial_services.app_registration.dcr.validators.validator]]
name = "IssuerValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.IssuerValidator"
enable = true
priority = 2
[[financial_services.app_registration.dcr.validators.validator]]
name = "RedirectUriFormatValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.RedirectUriFormatValidator"
enable = true
priority = 3
[[financial_services.app_registration.dcr.validators.validator]]
name = "RedirectUriMatchValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.RedirectUriMatchValidator"
enable = true
priority = 4
[[financial_services.app_registration.dcr.validators.validator]]
name = "UriHostnameValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.UriHostnameValidator"
enable = true
priority = 5
[[financial_services.app_registration.dcr.validators.validator]]
name = "SSAIssuerValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.SSAIssuerValidator"
enable = true
priority = 6
allowed_values = ["OpenBanking Ltd"]
[[financial_services.app_registration.dcr.validators.validator]]
name = "RequestJTIValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.RequestJTIValidator"
enable = true
priority = 7
[[financial_services.app_registration.dcr.validators.validator]]
name = "SSAJTIValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.SSAJTIValidator"
enable = false
priority = 8
[[financial_services.app_registration.dcr.validators.validator]]
name = "TokenEndpointAuthSigningAlgValidator"
class = "org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.TokenEndpointAuthSigningAlgValidator"
enable = true
priority = 9
```

`[[financial_services.app_registration.dcr.validators.validator]]`

`name`

string

Sample: `SSAIssuerValidator`

Name of the Validator.

`class`

string

Sample: `org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.SSAIssuerValidator`

FQN of the Validator.

`enable`

boolean

Default: `true`

If you want to disbae the validator, you can change this tag to false.

`priority`

integer

Sample: `1`

Priority of the Validator.

`allowed_values`

string

Sample: `["OpenBanking Ltd"]`

Allowed values of the Validator.

## Open Banking DCR - Regulatory Issuer Configuration[​](#open-banking-dcr-regulatory-issuer-configuration "Direct link to Open Banking DCR - Regulatory Issuer Configuration")

\[ ]**

```
[[financial_services.app_registration.dcr.regulatory_issuers.iss]]
name = "OpenBanking Ltd"
```

`[[financial_services.app_registration.dcr.regulatory_issuers.iss]]`

`name`

string

Default: `OpenBanking Ltd`

Regulatory Issuers supported by the system

## Auth Flow Consent ID Source Configuration[​](#auth-flow-consent-id-source-configuration "Direct link to Auth Flow Consent ID Source Configuration")

\[ ]**

```
[financial_services.consent]
auth_flow_consent_id_source="requestObject"
```

`[financial_services.consent]`

`auth_flow_consent_id_source`

string

Default: `requestObject`

This configuration is used to identify the source of the consent ID in the authorization request. Can be either "requestObject" or "requestParam"

## Pre Initiated Consent Scopes Configuration[​](#pre-initiated-consent-scopes-configuration "Direct link to Pre Initiated Consent Scopes Configuration")

\[ ]**

```
[financial_services.consent.pre_initiated]
scopes=["accounts", "payments", "fundsconfirmations"]
```

`[financial_services.consent.pre_initiated]`

This configuration is used to define the scopes for which consent has already been initiated prior to the consent authorization step.

`scopes`

string

Default: `["accounts", "payments", "fundsconfirmations"]`

Configure the scopes that are pre initiated. If not configured, all scopes will be considered as pre initiated. If a scopes is configured in both configs it will be condsidered as a pre-initiated consent

## Scope Based Consent Scopes Configuration[​](#scope-based-consent-scopes-configuration "Direct link to Scope Based Consent Scopes Configuration")

\[ ]**

```
[financial_services.consent.scope_based]
scopes=[]
```

`[financial_services.consent.scope_based]`

This configuration is used to define the scopes for which consent has not been initiated prior to the consent authorization step.

`scopes`

string

Default: `[]`

Configure the scopes that the consent has not been created before. If not configured, all scopes will be considered as pre initiated. If a scopes is configured in both configs it will be condsidered as a pre-initiated consent

## Auth flow Consent Id Extraction Configuration[​](#auth-flow-consent-id-extraction-configuration "Direct link to Auth flow Consent Id Extraction Configuration")

\[ ]**

```
[financial_services.consent.consent_id_extraction]
json_path="/id_token/openbanking_intent_id/value"
# key="key-name"
# regex_pattern="regex-pattern"
```

`[financial_services.consent.consent_id_extraction]`

This configuration is used to define the json path to retrieve the consent ID from the request object.

`json_path`

string

Default: `"/id_token/openbanking_intent_id/value"`

Configure the json path to the parameter to retrieve the consent ID starting from the root level of the request object. Must be configured if "auth\_flow\_consent\_id\_source" is set to "requestObject"

`key`

string

Default: `"key-name"`

Configure the key name to extract the consent ID from request params. Must be configured if "auth\_flow\_consent\_id\_source" is set to "requestParam"

`regex_pattern`

string

Default: `"regex_pattern"`

Configure the regex pattern to extract consent ID from the request.

## Consent manage handler[​](#consent-manage-handler "Direct link to Consent manage handler")

\[ ]**

```
[financial_services.consent.manage]
handler="org.wso2.financial.services.accelerator.consent.mgt.extensions.manage.impl.DefaultConsentManageHandler"
validator="org.wso2.financial.services.accelerator.consent.mgt.extensions.manage.impl.DefaultConsentManageValidator"
```

`[financial_services.consent.manage]` Required

`handler`

string Required

Default: `org.wso2.financial.services.accelerator.consent.mgt.extensions.manage.impl.DefaultConsentManageHandler`

Configures a custom Consent Manage component.

`validator`

string Required

Default: `org.wso2.financial.services.accelerator.consent.mgt.extensions.manage.impl.DefaultConsentManageValidator`

Configures a custom Consent Manage validator component.

## Allowed Headers for Consent Manage Handler Extension[​](#allowed-headers-for-consent-manage-handler-extension "Direct link to Allowed Headers for Consent Manage Handler Extension")

\[ ]**

```
[financial_services.consent.manage_extension]
allowed_headers = ["x-wso2-client-id"]
```

`[financial_services.consent.manage_extension]` Required

`allowed_headers`

string Required

Default: `["x-wso2-client-id"]`

Configure the headers that need to passed to the consent manage extension.

## Consent authorization retrieval steps[​](#consent-authorization-retrieval-steps "Direct link to Consent authorization retrieval steps")

\[ ]**

```
[[financial_services.consent.authorize_steps.retrieve]]
class = "org.wso2.financial.services.accelerator.consent.mgt.extensions.authorize.impl.DefaultConsentRetrievalStep"
priority = 1

[[financial_services.consent.authorize_steps.retrieve]]
class = "org.wso2.financial.services.accelerator.consent.mgt.extensions.authorize.impl.NonRegulatoryConsentStep"
priority = 2
```

`[financial_services.consent.authorize_steps.retrieve]` Required

`class`

string Required

Default:``

Configures custom retrieval steps and their order. The steps are invoked based on the configured priority order. In the retrieval steps, there is a non-regulatory step configured as the priority order 1001. Make sure to configure any custom step before this step.

`priority`

integer Required

Default:``

## Consent persistent steps[​](#consent-persistent-steps "Direct link to Consent persistent steps")

\[ ]**

```
[[financial_services.consent.authorize_steps.persist]]
class = "org.wso2.financial.services.accelerator.consent.mgt.extensions.authorize.impl.DefaultConsentPersistStep"
priority = 1
```

`[financial_services.consent.authorize_steps.persist]` Required

`class`

string Required

Default: `org.wso2.financial.services.accelerator.consent.mgt.extensions.authorize.impl.DefaultConsentPersistStep`

Configures a custom Consent Persistent Steps Manage components and their order.

`priority`

integer Required

Default: `1`

The steps are invoked based on the configured priority order.

## Consent validation Configuration[​](#consent-validation-configuration "Direct link to Consent validation Configuration")

\[ ]**

```
[financial_services.consent.validation]
validator="org.wso2.financial.services.accelerator.consent.mgt.extensions.validate.impl.DefaultConsentValidator"
signature.alias="wso2carbon"
jwt.payload.enabled=true
```

`[financial_services.consent.validation]` Required

`validator`

string Required

Default: `org.wso2.financial.services.accelerator.consent.mgt.extensions.validate.impl.DefaultConsentValidator`

Configures a custom Consent Validate component.

`signature.alias`

string Required

Default: `wso2carbon`

Configures the certificate alias available in the truststore of the Identity Server. This should be the certificate that is used to sign the consent validate JWT, which is sent from the gateway.

`jwt.payload.enabled`

boolean Required

Default: `e`

Enable the consent validation payload JWT signature validation. Needs to enable if the consent validation payload is sent as a signed payload.

## Consent Expiration Periodical Job Configuration[​](#consent-expiration-periodical-job-configuration "Direct link to Consent Expiration Periodical Job Configuration")

\[ ]**

```
[financial_services.consent.periodical_expiration]
enabled=true
cron_value="0 0 0 * * ?"
expired_consent_status_value="Expired"
eligible_statuses="authorised"
```

`[financial_services.consent.periodical_expiration]` Required

`enabled`

boolean Required

Default: `true`

Enable the consent expiration periodical job. This property needs to be true in order to run the consent expiration periodical updater.

`cron_value`

string Required

Default: `"0 0 0 * * ?"`

Cron value for the periodical updater. "0 0 0 \* \* ?" cron will describe as 00:00:00am every day.

`expired_consent_status_value`

string Required

Default: `Expired`

This value to be update for expired consents.

`eligible_statuses`

string Required

Default: `authorised`

The current consent statuses that are eligible to be expired. (Comma separated value list).

## Consent Selfcare Portal Client Credentials Configuration[​](#consent-selfcare-portal-client-credentials-configuration "Direct link to Consent Selfcare Portal Client Credentials Configuration")

\[ ]**

```
[financial_services.consent.portal.client_credentials]
client_id=""
client_secret=""
```

`[financial_services.consent.portal.client_credentials]` Required

`client_id`

string Required

Default:``

Add the client ID of the IS Application created to handle consent selfcare portal

`client_secret`

string Required

Default:``

Add the client secret of the IS Application created to handle consent selfcare portal

## Consent Selfcare Portal Parameter Configuration[​](#consent-selfcare-portal-parameter-configuration "Direct link to Consent Selfcare Portal Parameter Configuration")

\[ ]**

```
[financial_services.consent.portal.params]
identity_server_base_url="https://localhost:9446"
application_name_param="client_name"
application_logo_uri_param="software_logo_uri"
```

`[financial_services.consent.portal.params]` Required

`identity_server_base_url`

string Required

Default: `https://localhost:9446`

Base URL of the identity server

`application_name_param`

string Required

Default: `client_name`

Property key from the DCR Request to extract the application name to display in the portal

`application_logo_uri_param`

string Required

Default: `software_logo_uri`

Property key from the DCR Request to extract the application logo to display in the portal

## Idempotency Validation Configuration[​](#idempotency-validation-configuration "Direct link to Idempotency Validation Configuration")

\[ ]**

```
[financial_services.consent.idempotency]
enabled=false
allowed_time_duration=1440
header_name="x-idempotency-key"
allowed_for_all_apis=false
allowed_api_resources=["payment-consents"]
```

`[financial_services.consent.idempotency]` Required

`enabled`

boolean Required

Default: `false`

Change this tag value to true to enable idempotency validation

`allowed_time_duration`

integer Required

Default: `1440`

Time duration where an idempotency key cannot be replayed.

`header_name`

string Required

Default: `x-idempotency-key`

Key of the idempotency key value in the header

`allowed_for_all_apis`

boolean Required

Default: `false`

Change this value to true to apply idempotency validation for all APIs

`allowed_api_resources`

string Required

Default: `["payment-consents"]`

Configure the API resource paths that the idempotency validation should be applied

## Consent Authorize JSP Configuration[​](#consent-authorize-jsp-configuration "Direct link to Consent Authorize JSP Configuration")

\[ ]**

```
[financial_services.consent.authorize_jsp]
path="fs_default.jsp"
```

`[financial_services.consent.authorize_jsp]` Required

`path`

string Required

Default: `fs_default.jsp`

JSP File to be load in the consent authorize flow

## Token Consent Binding Configuration[​](#token-consent-binding-configuration "Direct link to Token Consent Binding Configuration")

\[ ]**

```
[financial_services.identity]
consent_id_claim_name="consent_id"
append_consent_id_to_token_id_token=false
append_consent_id_to_authz_id_token=true
append_consent_id_to_access_token=false
append_consent_id_to_token_introspect_response=false
```

`[financial_services.identity]` Required

`consent_id_claim_name`

string Required

Default: `consent_id`

By default, the consent ID is available in the JWT token under the custom claim name;consent\_id. To change the default claim name, use this configuration.

`append_consent_id_to_token_id_token`

boolean Required

Default: `false`

Configure whether to append the consent id to the id\_token of the token response.

`append_consent_id_to_authz_id_token`

boolean Required

Default: `false`

Configure whether to append the consent id to the id\_token of the Authorization response.

`append_consent_id_to_access_token`

boolean Required

Default: `false`

Configure whether to append the consent id to the JWT Access Token.

`append_consent_id_to_token_introspect_response`

boolean Required

Default: `false`

Configure whether to append the consent id to the Introspection response.

## Authentication web app configuration[​](#authentication-web-app-configuration "Direct link to Authentication web app configuration")

\[ ]**

```
[financial_services.identity.authentication_webapp]
servlet_extension="org.wso2.financial.services.accelerator.consent.mgt.extensions.authservlet.impl.FSDefaultAuthServletImpl"
```

`[financial_services.identity.authentication_webapp]`

`servlet_extension`

string

Default: `org.wso2.financial.services.accelerator.consent.mgt.extensions.authservlet.impl.FSDefaultAuthServletImpl`

When you are customizing the layout of the consent page, use this to configure a custom implementation for FSAuthServletInterface.

## HTTP connection pool[​](#http-connection-pool "Direct link to HTTP connection pool")

\[ ]**

```
[financial_services.http_connection_pool]
max_connections = 2000
max_connections_per_route = 1500
```

`[financial_services.http_connection_pool]`

Configure the maximum number of connections for the HTTP connection pool.

`max_connections`

integer

Default: `2000`

If not configured, the default value of 2000 will be used.

`max_connections_per_route`

integer

Default: `1500`

If not configured, the default value of 1500 will be used.
