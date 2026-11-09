# Configuration Catalog for API Manager

The configuration model of WSO2 API Manager is based on the `toml` format. The `<APIM_HOME>/repository/conf/deployment.toml` file is the single source used to configure and tune various features.

This document describes all the configuration parameters that are used in API Manager for WSO2 Open Banking.

## Instructions for use[​](#instructions-for-use "Direct link to Instructions for use")

> Select the configuration sections, parameters, and values that are required for your use and add them to the `.toml` file.

## Server[​](#server "Direct link to Server")

\[ ]**

```
[server]
hostname = "localhost"
node_ip = "127.0.0.1"
#offset=0
mode = "single" #single or ha
base_path = "${carbon.protocol}://${carbon.host}:${carbon.management.port}"
#discard_empty_caches = false
server_role = "default"
```

`[server]` Required

This includes configurations required for deploying an API Manager server node.

`hostname`

string Required

Default: `"localhost"`

Possible Values: `"localhost","127.0.0.1","<any-ip-address>","<any-hostname>"`

The hostname of the machine hosting the API Manager instance.

`node_ip`

string Required

Default: `127.0.0.1`

The IP address of the machine hosting the API Manager instance.

`offset`

integer

Default: `0`

Port offset allows you to run multiple WSO2 products, multiple instances of a WSO2 product, or multiple WSO2 product clusters on the same server or virtual machine (VM). Port offset defines the number by which all ports defined in the runtime such as the HTTP/S ports will be offset. For example, if the default HTTP port is 9443 and the port offset is 1, the effective HTTP port will be 9444. Therefore, for each additional WSO2 product instance, set the port offset to a unique value so that they can all run on the same server without any port conflicts.

`mode`

string Required

Default: `single`

Possible Values: `single,ha`

Defines the type of deployment, whether it is a single node deployment or a High Availability (HA) cluster.

`base_path`

string Required

Default: `${carbon.protocol}://${carbon.host}:${carbon.management.port}`

Defines the base path URL to access the server.

`discard_empty_caches`

boolean

Default: `FALSE`

Possible Values: `true,false`

Set this property to true, in order to discard empty caches.

`server_role`

string Required

Default: `default`

Possible Values: `"default","api-devportal","api-key-manager","api-publisher","gateway-worker","traffic-manager"`

The profile name of the API Manager instance.

## Super admin[​](#super-admin "Direct link to Super admin")

\[ ]**

```
[super_admin]
username = "am_admin@wso2.com"
password = "wso2123"
create_admin_account = true
```

`[super_admin]` Required

This includes the configurations related to the super admin user.

`username`

string Required

Default: `am_admin@wso2.com`

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

Configure the type of the user store.

`class`

string Required

Default: `org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager`

Configure the user store manager class. The default primary user store configuration is for JDBC user stores.

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
url = "jdbc:mysql://localhost:3306/fs_am_configdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.shared_db]` Required

Configurations related to the databases shared between nodes.

`url`

string Required

Default: `jdbc:mysql://localhost:3306/fs_am_configdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the fs\_am\_configdb database.

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
[database.apim_db]
url = "jdbc:mysql://localhost:3306/fs_apimgtdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.apim_db]` Required

Database configurations related to API Manager.

`url`

string Required

Default: `jdbc:mysql://localhost:3306/fs_apimgtdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the openbank\_apimgtdb database.

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
[database.apim_db.pool_options]
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

`[database.apim_db.pool_options]` Required

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
url = "jdbc:mysql://localhost:3306/fs_am_configdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.config]` Required

Configurations related to the API Manager config registry database.

`url`

string Required

Default: `jdbc:mysql://localhost:3306/fs_am_configdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the fs\_am\_configdb database.

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

## User Manager datasource[​](#user-manager-datasource "Direct link to User Manager datasource")

\[ ]**

```
[database.user]
url = "jdbc:mysql://localhost:3306/fs_am_userdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.user]` Required

Configurations related to the API Manager config registry database.

`url`

string Required

Default: `jdbc:mysql://localhost:3306/fs_am_userdb?autoReconnect=true&amp;useSSL=false`

The database connection URL that your DBMS JDBC driver uses to connect to the fs\_am\_userdb database.

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

## User manager database connection pool configurations[​](#user-manager-database-connection-pool-configurations "Direct link to User manager database connection pool configurations")

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

## Keystore TLS[​](#keystore-tls "Direct link to Keystore TLS")

\[ ]**

```
[keystore.tls]
file_name =  "wso2carbon.jks"
type =  "JKS"
password =  "wso2carbon"
alias =  "wso2carbon"
key_password =  "wso2carbon"
```

`[keystore.tls]` Required

Configurations related to the keystore that contains the TLS certificate.

`file_name`

string Required

Default: `wso2carbon.jks`

The filename of the Transport Layer Security (TLS) keystore.

`type`

string Required

Default: `JKS`

Possible Values: `TRUE`

The type of the keystore file.

`password`

string Required

Default: `wso2carbon`

The password of the keystore file.

`alias`

string Required

Default: `wso2carbon`

The alias of the keystore file.

`key_password`

string Required

Default: `wso2carbon`

The password of the private key.

## Primary keystore[​](#primary-keystore "Direct link to Primary keystore")

\[ ]**

```
#[keystore.primary]
#file_name =  "wso2carbon.jks"
#type =  "JKS"
#password =  "wso2carbon"
#alias =  "wso2carbon"
#key_password =  "wso2carbon"
```

`[keystore.primary]`

Configurations related to the primary keystore. Primary Keystore is used for signing and encrypting data that is externally exposed.

`file_name`

string

Default: `wso2carbon.jks`

The filename of the primary keystore.

`type`

string

Default: `JKS`

The type of the primary keystore file.

`password`

string

Default: `wso2carbon`

The password of the keystore file.

`alias`

string

Default: `wso2carbon`

The alias of the primary keystore file.

`key_password`

string

Default: `wso2carbon`

The password of the private key.

## Internal keystore[​](#internal-keystore "Direct link to Internal keystore")

\[ ]**

```
#[keystore.internal]
#file_name =  "wso2carbon.jks"
#type =  "JKS"
#password =  "wso2carbon"
#alias =  "wso2carbon"
#key_password =  "wso2carbon"
```

`[keystore.internal]`

Configurations related to the internal keystore. The Internal Keystore is used for encrypting internal critical data including passwords and other confidential information in configuration files.

`file_name`

string

Default: `wso2carbon.jks`

The filename of the primary keystore.

`type`

string

Default: `JKS`

The type of the primary keystore file.

`password`

string

Default: `wso2carbon`

The password of the keystore file.

`alias`

string

Default: `wso2carbon`

The alias of the primary keystore file.

`key_password`

string

Default: `wso2carbon`

The password of the private key.

## API Manager Gateway environment configurations[​](#api-manager-gateway-environment-configurations "Direct link to API Manager Gateway environment configurations")

\[ ]**

```
[[apim.gateway.environment]]
name = "Default"
type = "hybrid"
gateway_type = "Regular"
display_in_api_console = true
description = "This is a hybrid gateway that handles both production and sandbox token traffic."
show_as_token_endpoint_url = true
service_url = "https://localhost:${mgt.transport.https.port}/services/"
username= "${admin.username}"
password= "${admin.password}"
ws_endpoint = "ws://localhost:9099"
wss_endpoint = "wss://localhost:8099"
http_endpoint = "http://localhost:${http.nio.port}"
https_endpoint = "https://localhost:${https.nio.port}"
websub_event_receiver_http_endpoint = "http://localhost:9021"
websub_event_receiver_https_endpoint = "https://localhost:8021"
```

`[apim.gateway.environment]` Required

Configuring the gateways used by API Manager.

`name`

string Required

Default: `Production and Sandbox`

The name of the gateways used by the API Manager. Use any preferred value.

`type`

string Required

Default: `hybrid`

Type of the gateway.

`display_in_api_console`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

Displays the environment under 'Try it' in the API Developer Portal, in the API console.

`description`

string Required

Default: `This is a hybrid gateway that handles both production and sandbox token traffic.`

Describe the function of the gateway.

`show_as_token_endpoint_url`

string Required

Default: `TRUE`

Possible Values: `true,false`

This is used to construct the sample cURL request in the API Developer Portal.

`service_url`

string Required

Default: `https://localhost:${mgt.transport.https.port}/services/`

APIs will be published using this URL

`username`

string Required

Default: `${admin.username}`

The credentials used to publish APIs.

`password`

string Required

Default: `${admin.password}`

The credentials used to publish APIs.

`ws_endpoint`

string Required

Default: `ws://localhost:9099`

The WebSocket (WS) endpoint.

`wss_endpoint`

string Required

Default: `wss://localhost:8099`

The WebSocket Secure (WSS) endpoint.

`http_endpoint`

string Required

Default: `http://localhost:${http.nio.port}`

The Hypertext Transfer Protocol (HTTP) endpoint.

`https_endpoint`

string Required

Default: `https://localhost:${https.nio.port}`

The Hypertext Transfer Protocol Secure (HTTPS) endpoint.

## Configure the Gateway environment[​](#configure-the-gateway-environment "Direct link to Configure the Gateway environment")

\[ ]**

```
[apim.sync_runtime_artifacts.gateway]
gateway_labels =["Default"]
```

`[apim.sync_runtime_artifacts.gateway]` Required

`gateway_labels`

string Required

Default: `["Default"]`

## Gateway token cache[​](#gateway-token-cache "Direct link to Gateway token cache")

\[ ]**

```
#[apim.cache.gateway_token]
#enable = true
#expiry_time = "900s"
```

`[apim.cache.gateway_token]`

Configurations related to Gateway token cache.

`enable`

boolean

Default: `TRUE`

Possible Values: `true,false`

Enable the gateway token cache. WSO2 recommends enabling this feature by default. The token validation request checks with the cached value.

`expiry_time`

string

Default: `900s`

Set the cache expiry time in seconds. The recommended value is 900 seconds.

## Gateway cache resource[​](#gateway-cache-resource "Direct link to Gateway cache resource")

\[ ]**

```
#[apim.cache.resource]
#enable = true
#expiry_time = "900s"
```

`[apim.cache.resource]`

`enable`

boolean

Default: `TRUE`

Possible Values: `true,false`

Enable the gateway resource cache.

`expiry_time`

string

Default: `900s`

Set the cache expiry time in seconds. The recommended value is 900 seconds.

## Key Manager token cache[​](#key-manager-token-cache "Direct link to Key Manager token cache")

\[ ]**

```
#[apim.cache.km_token]
#enable = false
#expiry_time = "15m"
```

`[apim.cache.km_token]`

`enable`

boolean

Default: `TRUE`

Possible Values: `true,false`

Enable the Key Manager token cache. The token validation request checks with the value cached at the Key Manager. At any given time you should only have one cache enabled, which is either the Key Manager cache or the API Gateway cache. WSO2 does not recommend using both caches at the same time.

`expiry_time`

string

Default: `15m`

Set the cache expiry time in minutes.

## Cache recent APIs[​](#cache-recent-apis "Direct link to Cache recent APIs")

\[ ]**

```
#[apim.cache.recent_apis]
#enable = false
```

`[apim.cache.recent_apis]`

`enable`

boolean

Default: `FALSE`

Possible Values: `true,false`

Enable cache for recently added APIs in the API Developer Portal. This expires in 15 minutes by default.

## Cache scopes[​](#cache-scopes "Direct link to Cache scopes")

\[ ]**

```
#[apim.cache.scopes]
#enable = true
```

`[apim.cache.scopes]`

`enable`

boolean

Default: `TRUE`

Possible Values: `true,false`

Enable cache for scopes. This expires in 15 minutes by default.

## Cache publisher roles[​](#cache-publisher-roles "Direct link to Cache publisher roles")

\[ ]**

```
#[apim.cache.publisher_roles]
#enable = true
```

`[apim.cache.publisher_roles]`

`enable`

boolean

Default: `TRUE`

Possible Values: `true,false`

Enable cache for publisher roles. Expires in 15 minutes by default

## Cache JWT claims[​](#cache-jwt-claims "Direct link to Cache JWT claims")

\[ ]**

```
#[apim.cache.jwt_claim]
#enable = true
#expiry_time = "15m"
```

`[apim.cache.jwt_claim]`

`enable`

boolean

Default: `TRUE`

Possible Values: `true,false`

Enable JWT claim cache. The user's claims used to create the JWT are cached.

`expiry_time`

string

Default: `15m`

Set the cache expiry time. Would be the same as the JWT expiry time.

## Cache tags[​](#cache-tags "Direct link to Cache tags")

\[ ]**

```
#[apim.cache.tags]
#expiry_time = "2m"
```

`[apim.cache.tags]`

`expiry_time`

string

Default: `2m`

Set when the tag cache expires. This option is disabled when not defined.

## API Manager Analytics configurations[​](#api-manager-analytics-configurations "Direct link to API Manager Analytics configurations")

\[ ]**

```
[apim.analytics]
enable = false
auth_token = ""
```

`[apim.analytics]` Required

`enable`

boolean Required

Default: `false`

Possible Values: `true,false`

Use this to enable data publishing in the API Manager.

`auth_token`

string Required

Default:``

## API Manager - Key Manager configurations[​](#api-manager-key-manager-configurations "Direct link to API Manager - Key Manager configurations")

\[ ]**

```
[apim.key_manager]
enable_lightweight_apikey_generation = true
service_url = "https://localhost:9446/services/"
username = "is_admin@wso2.com"
password = "wso2123"
allow_subscription_validation_disabling = true
#pool.init_idle_capacity = 50
#pool.max_idle = 100
#key_validation_handler_type = "default"
#key_validation_handler_type = "custom"
#key_validation_handler_impl = "org.wso2.carbon.apimgt.keymgt.handlers.DefaultKeyValidationHandler"
```

`[apim.key_manager]` Required

`service_url`

string Required

Default: `https://localhost:9446${carbon.context}services/`

The URL that offers services of the Key Manager.

`type`

string Required

Default: `WSO2-IS`

`username`

string

Default: `is_admin@wso2.com`

Credentials of the super admin user in the Key Manager node.

`password`

string

Default: `wso2123`

Credentials of the super admin user in the Key Manager node.

`allow_subscription_validation_disabling`

boolean

Default: `true`

DIsable the API Subscription Validation.

`pool.init_idle_capacity`

string

Default: `50`

The minimum number of clients created, to connect to the key manager.

`pool.max_idle`

string

Default: `100`

The maximum number of clients created, to connect to the key manager.

`key_validation_handler_type`

string

Default: `default`

Possible Values: `default, custom`

If the type is set to \`custom\`, then provide the \`key\_validation\_handler\_impl\` value.

`key_validation_handler_impl`

string

Default: `org.wso2.carbon.apimgt.keymgt.handlers.DefaultKeyValidationHandler`

Provide a custom key validation handler implementation. To do this, set \`key\_validation\_handler\_type\` to \`custom\`.

## OAuth configurations[​](#oauth-configurations "Direct link to OAuth configurations")

\[ ]**

```
[apim.oauth_config]
enable_outbound_auth_header = true
white_listed_scopes = ["^device_.*", "openid", "^FS_.*", "^TIME_.*"]
#auth_header = "Authorization"
#revoke_endpoint = "https://localhost:${https.nio.port}/revoke"
#enable_token_encryption = false
#enable_token_hashing = false
```

`[apim.oauth_config]` Required

Contains OAuth-related configurations.

`enable_outbound_auth_header`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

If \`TRUE\`, sends the Auth header to the backend as received from the client.

`white_listed_scopes`

string Required

Default: `["^device_.*", "openid", "^FS_.*", "^TIME_.*"]`

To skip role validation for a scope in an API's request, add the scope to the white list.

`auth_header`

string

Default: `Authorization`

A valid authorization header for OAuth configurations.

`revoke_endpoint`

string

Default: `https://localhost:${https.nio.port}/revoke`

The token revocation endpoint used in the API Developer Portal

`enable_token_encryption`

string

Default: `FALSE`

If set to TRUE, the token stored in the database will be encrypted/decrypted when reading and storing. For more information, see [Extension Points for OAuth](https://is.docs.wso2.com/en/5.11.0/learn/extension-points-for-oauth/#extension-points-for-oauth).

`enable_token_hashing`

string

Default: `FALSE`

Set to TRUE to enable hashing. For more information, see [Setting Up OAuth Token Hashing](https://is.docs.wso2.com/en/5.11.0/learn/setting-up-oauth-token-hashing).

## Developer Portal configurations[​](#developer-portal-configurations "Direct link to Developer Portal configurations")

\[ ]**

```
[apim.devportal]
#url = "https://localhost:${mgt.transport.https.port}/devportal"
#enable_application_sharing = false
#if application_sharing_type, application_sharing_impl both defined priority goes to application_sharing_impl
#application_sharing_type = "default" #changed type, saml, default #todo: check the new config for rest api
#application_sharing_impl = "org.wso2.carbon.apimgt.impl.SAMLGroupIDExtractorImpl"
display_multiple_versions = true
#display_deprecated_apis = false
enable_comments = false
enable_ratings = false
enable_forum = false
#enable_anonymous_mode=true
```

`[apim.devportal]` Required

Configurations related to the API Developer Portal.

`url`

string

Default: `https://localhost:${mgt.transport.https.port}/devportal`

Possible Values: `true,false`

The public API Developer Portal URL

`enable_application_sharing`

boolean

Default: `FALSE`

Possible Values: `true,false`

Enable application sharing according to the claims.

`application_sharing_type`

string

Default: `default`

Possible Values: `true,false`

Use the \`application\_sharing\_impl\` as the default implementation.

`application_sharing_impl`

string

Default: `org.wso2.carbon.apimgt.impl.SAMLGroupIDExtractorImpl`

Possible Values: `true,false`

Need to define if the application\_sharing\_type is custom. If both \`application\_sharing\_type\` and \`application\_sharing\_impl\` are defined, take value from application\_sharing\_impl.

`display_multiple_versions`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

If TRUE, displays all API versions under the API listing.

`display_deprecated_apis`

boolean

Default: `FALSE`

Possible Values: `true,false`

If TRUE displays all the deprecated APIs under the API listing.

`enable_comments`

boolean Required

Default: `FALSE`

Possible Values: `true,false`

To enable adding comments on the API.

`enable_ratings`

boolean Required

Default: `FALSE`

Possible Values: `true,false`

To enable rating the API with a star-based rating.

`enable_forum`

string

Default: `TRUE`

`enable_anonymous_mode`

boolean

Default: `TRUE`

Possible Values: `true,false`

If set to \`TRUE\`, you can access the Developer Portal anonymously.

## CORS configurations[​](#cors-configurations "Direct link to CORS configurations")

\[ ]**

```
[apim.cors]
allow_origins = "*"
allow_methods = ["GET","PUT","POST","DELETE","PATCH","OPTIONS"]
allow_headers = ["authorization","Access-Control-Allow-Origin","Content-Type","SOAPAction","apikey"]
allow_credentials = false
```

`[apim.cors]` Required

Configures CORS headers on the Publisher and the Gateway.

`allow_origins`

string

Default: `*`

Denotes "Access-Control-Allow-Origin" response header. Specify an origin to share the response with.

`allow_methods`

string

Default: `GET,PUT,POST,DELETE,PATCH,OPTIONS`

Configures the methods allowed by the access control.

`allow_headers`

string

Default: `authorization,Access-Control-Allow-Origin,Content-Type,SOAPAction`

Configures the type of headers allowed by the access control.

`allow_credentials`

string

Default: `FALSE`

Specifying this header to true means that the server allows cookies (or other user credentials) to be included on cross-origin requests. It is false by default and if you set it to true then make sure that the Access-Control-Allow-Origin header does not contain the wildcard (\*)

## Throttling configurations[​](#throttling-configurations "Direct link to Throttling configurations")

\[ ]**

```
[apim.throttling]
username = "$ref{super_admin.username}@carbon.super"
#enable_data_publishing = true
#enable_policy_deploy = true
#enable_blacklist_condition = true
#enable_persistence = true
#throttle_decision_endpoints = ["tcp://localhost:5672","tcp://localhost:5672"]
```

`[apim.throttling]` Required

Configurations related to API Manager traffic control.

`username`

string Required

Default: `$ref{super_admin.username}@carbon.super`

`enable_data_publishing`

boolean

Default: `TRUE`

Possible Values: `true,false`

Enable publishing of requests and throttling data.

`enable_policy_deploy`

boolean

Default: `TRUE`

Possible Values: `true,false`

Enable deployment of throttling policies.

`enable_blacklist_condition`

boolean

Default: `TRUE`

Possible Values: `true,false`

Enable blocking conditions from the admin portal.

`enable_persistence`

boolean

Default: `TRUE`

Possible Values: `true,false`

Enable persisting current counter state of the Traffic Manager.

`throttle_decision_endpoints`

boolean

Default: `["tcp://localhost:5672","tcp://localhost:5672"]`

Define a set of JMS connections as an array.

## Throttling Policy Deploy configurations[​](#throttling-policy-deploy-configurations "Direct link to Throttling Policy Deploy configurations")

\[ ]**

```
[apim.throttling.policy_deploy]
username = "$ref{super_admin.username}@carbon.super"
```

`[apim.throttling.policy_deploy]` Required

Configurations related to API Manager traffic control.

`username`

string Required

Default: `$ref{super_admin.username}@carbon.super`

## Throttling JMS configurations[​](#throttling-jms-configurations "Direct link to Throttling JMS configurations")

\[ ]**

```
[apim.throttling.jms]
password = "$ref{super_admin.password}"
username = "am_admin!wso2.com!carbon.super"
```

`[apim.throttling.jms]` Required

Configurations related to API Manager traffic control.

`username`

string Required

Default: `am_admin!wso2.com!carbon.super`

`password`

string Required

Default: `$ref{super_admin.password}`
