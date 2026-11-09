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
serverDetails = "WSO2 IS as KM 5.11.0"
mode = "single"
userAgent = "WSO2 IS as KM 5.11.0"
offset = 3
```

`[server]` Required

This includes configurations required for deploying an Identity Server node.

`hostname`

string Required

Default: `"localhost"`

Possible Values: `"localhost","127.0.0.1","<any-ip-address>","<any-hostname>"`

The hostname of the machine hosting the Identity Server instance.

`node_ip`

string Required

Default: `127.0.0.1`

The IP address of the machine hosting the Identity Server instance.

`base_path`

string Required

Default: `${carbon.protocol}://${carbon.host}:${carbon.management.port}`

Defines the base path URL to access the server.

`serverDetails`

string Required

Default: `WSO2 IS as KM 5.11.0`

Description of the server.

`mode`

string Required

Default: `single`

Possible Values: `single,ha`

Defines the type of deployment, whether it is a single node deployment or a High Availability (HA) cluster.

`userAgent`

string Required

Default: `WSO2 IS as KM 5.11.0`

`offset`

integer Required

Default: `3`

Port offset allows you to run multiple WSO2 products, multiple instances of a WSO2 product, or multiple WSO2 product clusters on the same server or virtual machine (VM). Port offset defines the number by which all ports defined in the runtime such as the HTTP/S ports will be offset. For example, if the default HTTP port is 9443 and the port offset is 3, the effective HTTP port will be 9446. Therefore, for each additional WSO2 product instance, set the port offset to a unique value so that they can all run on the same server without any port conflicts.

## Primary keystore[​](#primary-keystore "Direct link to Primary keystore")

\[ ]**

```
[keystore.primary]
name = "wso2carbon.jks"
password = "wso2carbon"
```

`[keystore.primary]` Required

Configurations related to the primary keystore.

`name`

string Required

Default: `wso2carbon.jks`

The filename of the primary keystore.

`password`

string Required

Default: `wso2carbon`

The password of the keystore file

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
username = "admin@wso2.com"
password = "wso2123"
create_admin_account = true
```

`[super_admin]` Required

This includes the configurations related to the super admin user.

`username`

string Required

Default: `admin@wso2.com`

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

Default: `org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager`

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
url = "jdbc:mysql://localhost:3306/openbank_govdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.shared_db]` Required

Configurations related to the databases shared between nodes.

`url`

string Required

Default: `jdbc:mysql://localhost:3306/openbank_govdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the openbank\_govdb database.

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

## API Manager database configurations[​](#api-manager-database-configurations "Direct link to API Manager database configurations")

\[ ]**

```
[database.identity_db]
url = "jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.identity_db]` Required

`url`

string Required

Default: `jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the openbank\_apimgtdb database, which contains API Manager data.

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

## API Manager database connection pool configurations[​](#api-manager-database-connection-pool-configurations "Direct link to API Manager database connection pool configurations")

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

## API Manager config registry database[​](#api-manager-config-registry-database "Direct link to API Manager config registry database")

\[ ]**

```
[database.config]
url = "jdbc:mysql://localhost:3306/openbank_iskm_configdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.config]` Required

Configurations related to the API Manager config registry database.

`url`

string Required

Default: `jdbc:mysql://localhost:3306/openbank_am_configdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the openbank\_am\_configdb database.

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
url = "jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.user]` Required

`url`

string Required

Default: `jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the openbank\_userdb database, which contains user management data.

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

## User Manager datasource[​](#user-manager-datasource "Direct link to User Manager datasource")

\[ ]**

```
[[datasource]]
id="WSO2OB_DB"
url = "jdbc:mysql://localhost:3306/openbank_openbankingdb?autoReconnect=true&useSSL=false"
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

Configurations related to the user manager datasource.

`id`

string Required

Default: `WSO2OB_DB`

The datasource used by the user manager.

`url`

string Required

Default: `jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the openbank\_userdb database.

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

## OAuth endpoints[​](#oauth-endpoints "Direct link to OAuth endpoints")

\[ ]**

```
[oauth.endpoints]
oauth2_consent_page = "${carbon.protocol}://localhost:${carbon.management.port}/ob/authenticationendpoint/oauth2_authz.do"
oidc_consent_page = "${carbon.protocol}://localhost:${carbon.management.port}/ob/authenticationendpoint/oauth2_consent.do"
```

`[oauth.endpoints]` Required

The OAuth endpoints for the Identity Server.

`oauth2_consent_page`

string Required

Default: `${carbon.protocol}://localhost:${carbon.management.port}/ob/authenticationendpoint/oauth2_authz.do`

`oidc_consent_page`

string Required

Default: `${carbon.protocol}://localhost:${carbon.management.port}/ob/authenticationendpoint/oauth2_consent.do`

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

## Custom Authenticator[​](#custom-authenticator "Direct link to Custom Authenticator")

\[ ]**

```
[[authentication.custom_authenticator]]
name = "IdentifierExecutor"
parameters.ValidateUsername = true
parameters.throttleLimit = 3
parameters.throttleTimePeriod = 300
parameters.authRequestURL = "https://localhost:9446/api/identity/auth/v1.1/data/AuthRequestKey/"
```

`[authentication.custom_authenticator]` Required

`name`

string Required

Default: `IdentifierExecutor`

The name of the custom authenticator.

`parameters.ValidateUsername`

string Required

Default: `TRUE`

If you want your username validated first, the value of this parameter should be changed to true.

`parameters.throttleLimit`

string Required

Default: `3`

Configure the throttle limit.

`parameters.throttleTimePeriod`

string Required

Default: `300`

Configure the time period for throttling.

`parameters.authRequestURL`

string Required

Default: `https://localhost:9446/api/identity/auth/v1.1/data/AuthRequestKey/`

The authorization request URL.

## Signing certificate configurations[​](#signing-certificate-configurations "Direct link to Signing certificate configurations")

\[ ]**

```
[open_banking.identity]
signing_certificate_kid="123"
client_transport_cert_as_header_enabled = true
```

`[open_banking.identity]` Required

`signing_certificate_kid`

string Required

Default: `123`

Configure the key ID (kid) value for the signing certificate of the bank. The same value is configured as the kid of the ID Token.

`client_transport_cert_as_header_enabled`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

To send the client certificate as a transport header, set this to true.

## Consent ID claim[​](#consent-id-claim "Direct link to Consent ID claim")

\[ ]**

```
[open_banking.identity]
consent_id_claim_name="consent_id"
```

`[open_banking.identity]`

`consent_id_claim_name`

string

Default: `consent_id`

By default, the consent ID is available in the JWT token under the custom claim name;consent\_id. To change the default claim name, use this configuration.

## Adaptive authentication event publisher[​](#adaptive-authentication-event-publisher "Direct link to Adaptive authentication event publisher")

\[ ]**

```
[authentication.adaptive.event_publisher]
url = "http://localhost:8006/"
```

`[authentication.adaptive.event_publisher]` Required

`url`

string Required

Default: `http://localhost:8006/`

Configure the event publisher URL for adaptive authentication with the hostname of the Identity Server.

## Data publishing configurations[​](#data-publishing-configurations "Direct link to Data publishing configurations")

\[ ]**

```
[open_banking.data_publishing]
enable = false
username="$ref{super_admin.username}@carbon.super"
password="$ref{super_admin.password}"
server_url = "{tcp://localhost:7612}"
#auth_url = "{ssl://localhost:7612}"
protocol = "Thrift"
pool_size = 10
queue_size = 32768
worker_thread_count = 10
pool_wait_time_Ms = 60000
auth_data_publisher = "com.wso2.openbanking.accelerator.authentication.data.publisher.extension.DefaultAuthDataPublisher"
```

`[open_banking.data_publishing]` Required

Configurations related to the data publishing in Identity Server.

`enable`

boolean Required

Default: `FALSE`

To enable the data publishing feature.

`username`

string Required

Default: `$ref{super_admin.username}@carbon.super`

Credentials to access WSO2 Streaming Integrator.

`password`

string Required

Default: `$ref{super_admin.password}`

Credentials to access WSO2 Streaming Integrator.

`server_url`

string Required

Default: `{tcp://<SI_HOST>:7612}`

Possible Values: `{tcp://<SI_NODE_1_HOST>:7612, tcp://<SI_NODE_2_HOST>:7612, ...}`

The TCP port of Open Banking Business Intelligence Worker. If the setup mode is HA, configure TCP ports of all the nodes comma seperated.

`auth_url`

string

Default: `{tcp://<SI_HOST>:7612}`

The SSL authentication URL of Open Banking Business Intelligence Worker. This is an optional configuration.

`protocol`

string Required

Default: `Thrift`

Possible Values: `Thrift`

The protocol used to publish Open Banking data.

`pool_size`

string Required

Default: `10`

Defines the maximum number of instances that can reside in the pool.

`queue_size`

string Required

Default: `32768`

`worker_thread_count`

string Required

Default: `10`

`pool_wait_time_Ms`

string Required

Default: `60000`

Defines the maximum waiting time to retrieve an instance from the pool.

`auth_data_publisher`

string

Default: `{ssl://<SI_HOST>:7612}`

Configures a custom data publishing class using its FQN.

## Data publishing stream[​](#data-publishing-stream "Direct link to Data publishing stream")

\[ ]**

```
[[open_banking.data_publishing.thrift.stream]]
name="AuthenticationInputStream"
```

`[open_banking.data_publishing.thrift.stream]` Required

`name`

string

Default: `AuthenticationInputStream`

Define a stream for publishing data.

## Data publishing attributes[​](#data-publishing-attributes "Direct link to Data publishing attributes")

\[ ]**

```
[[open_banking.data_publishing.thrift.stream.attributes]]
name="userId"
priority=1
[[open_banking.data_publishing.thrift.stream.attributes]]
name="authenticationStep"
priority=2
[[open_banking.data_publishing.thrift.stream.attributes]]
name="authenticationStatus"
priority=3
required=true
[[open_banking.data_publishing.thrift.stream.attributes]]
name="authenticationApproach"
priority=4
required=true
[[open_banking.data_publishing.thrift.stream.attributes]]
name="psuChannel"
priority=5
[[open_banking.data_publishing.thrift.stream.attributes]]
name="timestamp"
priority=6
required=true
type="long"
```

`[open_banking.data_publishing.thrift.stream.attributes]` Required

`name`

string

Default:``

Define an attribute for publishing data.

`priority`

string

Default:``

Define the priority for a data publishing attribute.

## Regulatory issuer - DCR[​](#regulatory-issuer-dcr "Direct link to Regulatory issuer - DCR")

\[ ]**

```
[[open_banking.dcr.regulatory_issuers.iss]]
name = "OpenBanking Ltd"
```

`[open_banking.dcr.regulatory_issuers.iss]` Required

`name`

string Required

Default:``

Configure the issuer (iss) of the SSA in the following tag. If not specified, the application is considered a non-regulatory application.

## Dynamic Client Registrations (DCR) configurations[​](#dynamic-client-registrations-dcr-configurations "Direct link to Dynamic Client Registrations (DCR) configurations")

\[ ]**

```
[open_banking.dcr]
validator = "com.wso2.openbanking.accelerator.identity.dcr.validation.DefaultRegistrationValidatorImpl"
jwks_url_sandbox = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/9b5usDpbNtmxDcTzs7GzKp.jwks"
jwks_url_production = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/9b5usDpbNtmxDcTzs7GzKp.jwks"
applicationupdater = "com.wso2.openbanking.accelerator.identity.listener.application.ApplicationUpdaterImpl"
use_softwareIdForAppName = true
```

`[open_banking.dcr]` Required

Configurations for Dynamic Client Registration.

`validator`

string Required

Default:``

Configure the issuer (iss) of the SSA in the following tag. If not specified, the application is considered a non-regulatory application. Configure your custom DCR validator here. By default, the DefaultRegistrationValidatorImpl class is configured as given here.

`jwks_url_sandbox`

string Required

Default: `com.wso2.openbanking.accelerator.identity.dcr.validation.DefaultRegistrationValidatorImpl`

`jwks_url_production`

string Required

Default: `The JWKS endpoints that are used for validating the SSA signature.`

`applicationupdater`

string Required

Default:``

If you have modified the Application Listener interface, for example, adding OAuth 2.0 properties or for data publishing requirements, the Application Listener invokes methods that are overridden from a class. Configure the following tag with the name of the class that is extended to do so.

`use_softwareIdForAppName`

boolean Required

Default: `If you have modified the Application Listener interface, for example, adding OAuth 2.0 properties or for data publishing requirements, the Application Listener invokes methods that are overridden from a class. Configure the following tag with the name of the class that is extended to do so.`

Possible Values: `true,false`

Sets the software id as the name of the application.

## JWKS retrieval connection timeout[​](#jwks-retrieval-connection-timeout "Direct link to JWKS retrieval connection timeout")

\[ ]**

```
[open_banking.dcr.jwks_retriever]
connection_timeout = 3000
read_timeout = 3000
```

`[open_banking.dcr.jwks_retriever]` Required

When retrieving the JSON web keys related to the API consumer application, the time-out values when connecting to the JWKS endpoint of the Open Banking directory.

`connection_timeout`

integer Required

Default: `3000`

`read_timeout`

integer Required

Default: `3000`

## DCR request - configure issuer parameter[​](#dcr-request-configure-issuer-parameter "Direct link to DCR request - configure issuer parameter")

\[ ]**

```
[open_banking.dcr.registration.issuer]
allowed_values = ["value1, value2, value3”]
#required = false
```

`[open_banking.dcr.registration.issuer]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is a mandatory request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter optional, add this tag and set it to false. Otherwise, this is considered as a mandatory request parameter in the DCR request.

## DCR request - configure audience parameter[​](#dcr-request-configure-audience-parameter "Direct link to DCR request - configure audience parameter")

\[ ]**

```
[open_banking.dcr.registration.audience]
allowed_values = ["value1, value2, value3”]
#required = false
```

`[open_banking.dcr.registration.audience]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is a mandatory request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter optional, add this tag and set it to false. Otherwise, this is considered as a mandatory request parameter in the DCR request.

## DCR request - configure token\_endpoint\_authentication parameter[​](#dcr-request-configure-token_endpoint_authentication-parameter "Direct link to DCR request - configure token_endpoint_authentication parameter")

\[ ]**

```
[open_banking.dcr.registration.audience]
allowed_values = ["value1, value2, value3”]
#required = false
```

`[open_banking.dcr.registration.token_endpoint_authentication]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is a mandatory request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter optional, add this tag and set it to false. Otherwise, this is considered as a mandatory request parameter in the DCR request.

## DCR request - configure id\_token\_signed\_response\_alg parameter[​](#dcr-request-configure-id_token_signed_response_alg-parameter "Direct link to DCR request - configure id_token_signed_response_alg parameter")

\[ ]**

```
[open_banking.dcr.registration.id_token_signed_response_alg]
allowed_values = ["value1, value2, value3”]
#required = false
```

`[open_banking.dcr.registration.id_token_signed_response_alg]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is a mandatory request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter optional, add this tag and set it to false. Otherwise, this is considered as a mandatory request parameter in the DCR request.

## DCR request - configure software\_statement parameter[​](#dcr-request-configure-software_statement-parameter "Direct link to DCR request - configure software_statement parameter")

\[ ]**

```
[open_banking.dcr.registration.software_statement]
allowed_values = ["value1, value2, value3”]
#required = false
```

`[open_banking.dcr.registration.software_statement]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is a mandatory request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter optional, add this tag and set it to false. Otherwise, this is considered as a mandatory request parameter in the DCR request.

## DCR request - configure grant\_types parameter[​](#dcr-request-configure-grant_types-parameter "Direct link to DCR request - configure grant_types parameter")

\[ ]**

```
[open_banking.dcr.registration.grant_types]
allowed_values = ["value1, value2, value3”]
#required = false
```

`[open_banking.dcr.registration.grant_types]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is a mandatory request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter optional, add this tag and set it to false. Otherwise, this is considered as a mandatory request parameter in the DCR request.

## DCR request - configure scope parameter[​](#dcr-request-configure-scope-parameter "Direct link to DCR request - configure scope parameter")

\[ ]**

```
[open_banking.dcr.registration.scope]
allowed_values = ["accounts", "payments"]
#required = true
```

`[open_banking.dcr.registration.scope]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure application\_type parameter[​](#dcr-request-configure-application_type-parameter "Direct link to DCR request - configure application_type parameter")

\[ ]**

```
[open_banking.dcr.registration.application_type]
allowed_values = ["web"]
#required = true
```

`[open_banking.dcr.registration.application_type]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure response\_types parameter[​](#dcr-request-configure-response_types-parameter "Direct link to DCR request - configure response_types parameter")

\[ ]**

```
[open_banking.dcr.registration.response_types]
allowed_values = ["value1, value2, value3”]
#required = true
```

`[open_banking.dcr.registration.response_types]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure callback\_uris parameter[​](#dcr-request-configure-callback_uris-parameter "Direct link to DCR request - configure callback_uris parameter")

\[ ]**

```
[open_banking.dcr.registration.callback_uris]
allowed_values = ["value1, value2, value3”]
#required = true
```

`[open_banking.dcr.registration.callback_uris]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure token\_endpoint\_auth\_signing\_alg parameter[​](#dcr-request-configure-token_endpoint_auth_signing_alg-parameter "Direct link to DCR request - configure token_endpoint_auth_signing_alg parameter")

\[ ]**

```
[open_banking.dcr.registration.token_endpoint_auth_signing_alg]
allowed_values = ["value1, value2, value3”]
#required = true
```

`[open_banking.dcr.registration.token_endpoint_auth_signing_alg]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure software\_id parameter[​](#dcr-request-configure-software_id-parameter "Direct link to DCR request - configure software_id parameter")

\[ ]**

```
[open_banking.dcr.registration.software_id]
allowed_values = ["value1, value2, value3”]
#required = true
```

`[open_banking.dcr.registration.software_id]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure id\_token\_encryption\_response\_alg parameter[​](#dcr-request-configure-id_token_encryption_response_alg-parameter "Direct link to DCR request - configure id_token_encryption_response_alg parameter")

\[ ]**

```
[open_banking.dcr.registration.id_token_encryption_response_alg]
allowed_values = ["value1, value2, value3”]
#required = true
```

`[open_banking.dcr.registration.id_token_encryption_response_alg]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure id\_token\_encryption\_response\_enc parameter[​](#dcr-request-configure-id_token_encryption_response_enc-parameter "Direct link to DCR request - configure id_token_encryption_response_enc parameter")

\[ ]**

```
[open_banking.dcr.registration.id_token_encryption_response_enc]
allowed_values = ["value1, value2, value3”]
#required = true
```

`[open_banking.dcr.registration.id_token_encryption_response_enc]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure request\_object\_signing\_algorithm parameter[​](#dcr-request-configure-request_object_signing_algorithm-parameter "Direct link to DCR request - configure request_object_signing_algorithm parameter")

\[ ]**

```
[open_banking.dcr.registration.request_object_signing_algorithm]
allowed_values = ["value1, value2, value3”]
#required = true
```

`[open_banking.dcr.registration.request_object_signing_algorithm]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure tls\_client\_auth\_subject\_dn parameter[​](#dcr-request-configure-tls_client_auth_subject_dn-parameter "Direct link to DCR request - configure tls_client_auth_subject_dn parameter")

\[ ]**

```
[open_banking.dcr.registration.tls_client_auth_subject_dn]
allowed_values = ["value1, value2, value3”]
#required = true
```

`[open_banking.dcr.registration.tls_client_auth_subject_dn]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure backchannel\_token\_delivery\_mode parameter[​](#dcr-request-configure-backchannel_token_delivery_mode-parameter "Direct link to DCR request - configure backchannel_token_delivery_mode parameter")

\[ ]**

```
[open_banking.dcr.registration.backchannel_token_delivery_mode]
allowed_values = ["value1, value2, value3”]
#required = true
```

`[open_banking.dcr.registration.backchannel_token_delivery_mode]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure backchannel\_authentication\_request\_signing\_alg parameter[​](#dcr-request-configure-backchannel_authentication_request_signing_alg-parameter "Direct link to DCR request - configure backchannel_authentication_request_signing_alg parameter")

\[ ]**

```
[open_banking.dcr.registration.backchannel_authentication_request_signing_alg g]
allowed_values = ["value1, value2, value3”]
#required = true
```

`[open_banking.dcr.registration.backchannel_authentication_request_signing_alg]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure backchannel\_client\_notification\_endpoint parameter[​](#dcr-request-configure-backchannel_client_notification_endpoint-parameter "Direct link to DCR request - configure backchannel_client_notification_endpoint parameter")

\[ ]**

```
[open_banking.dcr.registration.backchannel_client_notification_endpoint]
allowed_values = ["value1, value2, value3”]
#required = true
```

`[open_banking.dcr.registration.backchannel_client_notification_endpoint]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## DCR request - configure backchannel\_user\_code\_parameter\_supported parameter[​](#dcr-request-configure-backchannel_user_code_parameter_supported-parameter "Direct link to DCR request - configure backchannel_user_code_parameter_supported parameter")

\[ ]**

```
[open_banking.dcr.registration.backchannel_user_code_parameter_supported]
allowed_values = ["value1, value2, value3”]
#required = true
```

`[open_banking.dcr.registration.backchannel_user_code_parameter_supported]`

`allowed_values`

string Required

Default:``

According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.

`required`

boolean

Default:``

Possible Values: `true,false`

If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request.

## Primary authenticator[​](#primary-authenticator "Direct link to Primary authenticator")

\[ ]**

```
[open_banking.sca.primaryauth]
name = "IdentifierExecutor"
display = "ob-identifier-first"
```

`[open_banking.sca.primaryauth]`

Configures the primary authenticator.

`name`

string

Default:``

Possible Values: `BasicAuthenticator,IdentifierExecutor`

The name of the primary authenticator to be engaged in the authentication flow.

`display`

string

Default:``

Possible Values: `basic,ob-identifier-first`

## Identity provider configurations[​](#identity-provider-configurations "Direct link to Identity provider configurations")

\[ ]**

```
#[open_banking.sca.idp]
#name = "FacebookIdP"
```

`[open_banking.sca.idp]`

`name`

string

Default:``

Configure the identity provider as the secondary authentication method. The example given here is for SMS OTP.

## Signature validation algorithms[​](#signature-validation-algorithms "Direct link to Signature validation algorithms")

\[ ]**

```
[[open_banking.signature_validation.allowed_algorithms.algorithms]]
algorithm = "PS256"
```

`[open_banking.signature_validation.allowed_algorithms.algorithms]`

`algorithm`

string

Default: `PS256`

Configure the algorithms that are allowed during signature validation. These algorithms are used for token endpoint authentication assertion signature, request object signature, and id token signature validations.

## Consent manage handler[​](#consent-manage-handler "Direct link to Consent manage handler")

\[ ]**

```
[open_banking.consent.manage]
handler="com.wso2.openbanking.accelerator.consent.extensions.manage.impl.DefaultConsentManageHandler"
```

`[open_banking.consent.manage]` Required

`handler`

string Required

Default: `com.wso2.openbanking.accelerator.consent.extensions.manage.impl.DefaultConsentManageHandler`

Configures a custom Consent Manage component.

## Consent validator[​](#consent-validator "Direct link to Consent validator")

\[ ]**

```
[open_banking.consent.validation]
validator="com.wso2.openbanking.accelerator.consent.extensions.validate.impl.DefaultConsentValidator"
```

`[open_banking.consent.validation]` Required

`validator`

string Required

Default: `com.wso2.openbanking.accelerator.consent.extensions.validate.impl.DefaultConsentValidator`

Configures a custom Consent Validate component.

## Consent validation signature[​](#consent-validation-signature "Direct link to Consent validation signature")

\[ ]**

```
[open_banking.consent.validation.signature]
alias="wso2carbon"
```

`[open_banking.consent.validation.signature]` Required

`alias`

string Required

Default: `wso2carbon`

Configures the certificate alias available in the truststore of the Identity Server. This should be the certificate that is used to sign the consent validate JWT, which is sent from the gateway.

## Consent authorization steps[​](#consent-authorization-steps "Direct link to Consent authorization steps")

\[ ]**

```
[[open_banking.consent.authorize_steps.retrieve]]
class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.NonRegulatoryConsentStep"
priority = 1

[[open_banking.consent.authorize_steps.retrieve]]
class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.DefaultConsentRetrievalStep"
priority = 2
```

`[open_banking.consent.authorize_steps.retrieve]` Required

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
[[open_banking.consent.authorize_steps.persist]]
class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.DefaultConsentPersistStep"
priority = 1
```

`[open_banking.consent.authorize_steps.persist]` Required

`class`

string Required

Default: `com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.DefaultConsentPersistStep`

Configures a custom Consent Persistent Steps Manage components and their order.

`priority`

integer Required

Default: `1`

The steps are invoked based on the configured priority order.

## Authentication web app configuration[​](#authentication-web-app-configuration "Direct link to Authentication web app configuration")

\[ ]**

```
[open_banking.identity.authentication_webapp]
servlet_extension = "com.wso2.openbanking.accelerator.authentication.webapp.impl.OBDefaultAuthServletImpl"
```

`[open_banking.identity.authentication_webapp]`

`servlet_extension`

string

Default: `com.wso2.openbanking.accelerator.authentication.webapp.impl.OBDefaultAuthServletImpl`

When you are customizing the layout of the consent page, use this to configure a custom implementation for OBAuthServletInterface.

## Identity Server extensions[​](#identity-server-extensions "Direct link to Identity Server extensions")

\[ ]**

```
[open_banking.identity.extensions]
request_object_validator="com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.DefaultOBRequestObjectValidator"
claim_provider="com.wso2.openbanking.accelerator.identity.claims.OBDefaultClaimProvider"
response_type_handler="com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBResponseTypeHandler"
```

`[open_banking.identity.extensions]`

`request_object_validator`

string Required

Default: `com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.DefaultOBRequestObjectValidator`

Configures a custom request object validator using its Fully Qualified Name (FQN).

`claim_provider`

string

Default: `com.wso2.openbanking.accelerator.identity.claims.OBDefaultClaimProvider`

Configures a custom claim provider using its Fully Qualified Name (FQN).

`response_type_handler`

string

Default: `com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBResponseTypeHandler`

Configures a custom response type handler using its Fully Qualified Name (FQN).

## OAuth OIDC extensions[​](#oauth-oidc-extensions "Direct link to OAuth OIDC extensions")

\[ ]**

```
[oauth.oidc.extensions]
id_token_builder = "com.wso2.openbanking.accelerator.identity.idtoken.OBIDTokenBuilder",
request_object_validator = "com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.OBRequestObjectValidationExtension"
```

`[oauth.oidc.extensions]`

`id_token_builder`

string Required

Default: `com.wso2.openbanking.accelerator.identity.idtoken.OBIDTokenBuilder`

Configures a custom ID Token Builder using its FQN.

`request_object_validator`

string Required

Default: `com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.OBRequestObjectValidationExtension`

The extension for the request object validator.

## Response types[​](#response-types "Direct link to Response types")

\[ ]**

```
[[oauth.custom_response_type]]
name = "code"
class = "com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBCodeResponseTypeHandlerExtension"

[[oauth.custom_response_type]]
name = "code id_token"
class = "com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBHybridResponseTypeHandlerExtension"
```

`[oauth.custom_response_type]` Required

`name`

string Required

Default: `code`

Possible Values: `code,code id_token`

Configures OIDC response types.

`class`

string Required

Default: `com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBCodeResponseTypeHandlerExtension`

Possible Values: `com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBCodeResponseTypeHandlerExtension,com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBHybridResponseTypeHandlerExtension`

## HTTP connection pool[​](#http-connection-pool "Direct link to HTTP connection pool")

\[ ]**

```
[open_banking.http_connection_pool]
max_connections = 2000
max_connections_per_route = 1500
```

`[open_banking.http_connection_pool]`

Configure the maximum number of connections for the HTTP connection pool.

`max_connections`

integer

Default: `2000`

If not configured, the default value of 2000 will be used.

`max_connections_per_route`

integer

Default: `1500`

If not configured, the default value of 1500 will be used.
