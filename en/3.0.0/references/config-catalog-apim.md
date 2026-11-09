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
data_source= "WSO2UM_DB"
```

`[realm_manager]` Required

This includes the datasource configurations for the user management database.

`data_source`

string Required

Default: `WSO2UM_DB`

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
[database.apim_db]
url = "jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"
```

`[database.apim_db]` Required

Database configurations related to API Manager.

`url`

string Required

Default: `jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&amp;useSSL=false`

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
url = "jdbc:mysql://localhost:3306/openbank_am_configdb?autoReconnect=true&useSSL=false"
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

## User Manager datasource[​](#user-manager-datasource "Direct link to User Manager datasource")

\[ ]**

```
[[datasource]]
id="WSO2UM_DB"
url = "jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&useSSL=false"
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

Default: `WSO2UM_DB`

The datasource used by user manager.

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
skip_list.sequences = ["jsonConverter.xml"]
gateway_labels =["Default"]
```

`[apim.sync_runtime_artifacts.gateway]` Required

`skip_list.sequences`

string Required

Default: `["jsonConverter.xml"]`

The list of artifacts to skip during runtime.

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

## Key Manager token cache¶[​](#key-manager-token-cache "Direct link to Key Manager token cache¶")

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
enable = true
config_endpoint = "https://analytics-event-auth.st.choreo.dev/auth/v1"
auth_token = ""
properties.'publisher.reporter.class' = "com.wso2.openbanking.accelerator.gateway.reporter.OBAnalyticsMetricReporter"
```

`[apim.analytics]` Required

`enable`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

Use this to enable data publishing in the API Manager.

`config_endpoint`

string Required

Default: `https://analytics-event-auth.st.choreo.dev/auth/v1`

`auth_token`

string Required

Default:``

`properties.'publisher.reporter.class'`

string Required

Default: `com.wso2.openbanking.accelerator.gateway.reporter.OBAnalyticsMetricReporter`

A mandatory config for OB analytics. Defines the metric reporter implementation of WSO2 Open Banking.

## API Manager - Key Manager configurations[​](#api-manager-key-manager-configurations "Direct link to API Manager - Key Manager configurations")

\[ ]**

```
[apim.key_manager]
service_url = "https://localhost:9446${carbon.context}services/"
type = "WSO2-IS"
key_manager_client_impl = "org.wso2.carbon.apimgt.impl.AMDefaultKeyManagerImpl"
#username = "$ref{super_admin.username}"
#password = "$ref{super_admin.password}"
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

`key_manager_client_impl`

string Required

Default: `org.wso2.carbon.apimgt.impl.AMDefaultKeyManagerImpl`

`username`

string

Default: `$ref{super_admin.username}`

Credentials of the super admin user in the Key Manager node.

`password`

string

Default: `$ref{super_admin.password}`

Credentials of the super admin user in the Key Manager node.

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

## API Manager - Key Manager URLs[​](#api-manager-key-manager-urls "Direct link to API Manager - Key Manager URLs")

\[ ]**

```
[apim.key_manager.configuration]
ServerURL = "https://localhost:9446${carbon.context}services/"
Username = "${admin.username}"
Password = "${admin.password}"
TokenURL = "https://localhost:${https.nio.port}/token"
RevokeURL = "https://localhost:${https.nio.port}/revoke"
```

`[apim.key_manager.configuration]` Required

Configure URLs related to the Key Manager server.

`ServerURL`

string Required

Default: `https://localhost:9446${carbon.context}services/`

`Username`

string Required

Default: `${admin.username}`

`Password`

string Required

Default: `${admin.password}`

`TokenURL`

string Required

Default: `https://localhost:${https.nio.port}/token`

`RevokeURL`

string Required

Default: `https://localhost:${https.nio.port}/revoke`

## OAuth configurations[​](#oauth-configurations "Direct link to OAuth configurations")

\[ ]**

```
[apim.oauth_config]
enable_outbound_auth_header = true
white_listed_scopes = ["^device_.*", "openid", "^OB_.*", "^TIME_.*"]
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

Default: `["^device_.*", "openid", "^OB_.*", "^TIME_.*"]`

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
username = "admin@wso2.com@carbon.super"
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

Default: `admin@wso2.com@carbon.supe`

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

## MTLS Header to invoke APIs secured with Mutual SSL[​](#mtls-header-to-invoke-apis-secured-with-mutual-ssl "Direct link to MTLS Header to invoke APIs secured with Mutual SSL")

\[ ]**

```
[apimgt.mutual_ssl]
certificate_header = "
"
enable_client_validation = false
client_certificate_encode = false
```

`[apimgt.mutual_ssl]`

`certificate_header`

string

Sample: `ssl.client.auth.cert.X509`

By default, the WSO2 API Manager retrieves the client certificate from the X-WSO2-CLIENT-CERTIFICATE HTTP header. If you want to change the header name config it here.

`enable_client_validation`

boolean

Sample: `false`

This property needs to be true if the MutualSSL connection is established between the load balancer and the Gateway.

`client_certificate_encode`

boolean

Sample: `false`

This property needs to be true if the certificate should be decoded when it is passed from the load balancer to the Gateway.

## Consent validation service[​](#consent-validation-service "Direct link to Consent validation service")

\[ ]**

```
[open_banking.gateway.consent.validation]
endpoint = "https://localhost:9446/api/openbanking/consent/validate"
```

`[open_banking.gateway.consent.validation]` Required

`endpoint`

string

Default: `https://localhost:9446/api/openbanking/consent/validate`

Configure a custom Consent Validation service.

## Dynamic Client Registration[​](#dynamic-client-registration "Direct link to Dynamic Client Registration")

\[ ]**

```
[open_banking.dcr]
#jwks_endpoint_name = ""
#app_name_claim = " "
token_endpoint = "https://localhost:9443/oauth2/token"
use_softwareIdForAppName = true
```

`[open_banking.dcr]` Required

Configurations related to Dynamic Client Registration.

`jwks_endpoint_name`

string

Default:``

Configure the name of the claim regarding the jwks endpoint that is issued for the SSA. You can refer to the SSA for this value.

`app_name_claim`

string

Default:``

Configure the claim name in the SSA that mentions the software. If the use\_softwareIdForAppName configuration is set to false, the name of the application is set using the value of the given claim.

`token_endpoint`

string Required

Default: `https://<APIM_HOST>:9443/oauth2/token`

The hostname of the API Manager server for the token endpoint.

`use_softwareIdForAppName`

boolean Required

Default: `TRUE`

To set the software id as the name of the application. By default, this configuration is set to true.

## DCR - JWKS endpoint connection timeout[​](#dcr-jwks-endpoint-connection-timeout "Direct link to DCR - JWKS endpoint connection timeout")

\[ ]**

```
#[open_banking.dcr.jwks_retriever]
#connection_timeout = 3000
#read_timeout = 3000
```

`[open_banking.dcr.jwks_retriever]`

Configure the timeout value, when validating the signature of the request.

`connection_timeout`

string

Default: `3000`

The timeout values when validating the signature of the request.

`read_timeout`

string

Default: `3000`

The timeout values when validating the signature of the request.

## DCR - Regulatory APIs configurations[​](#dcr-regulatory-apis-configurations "Direct link to DCR - Regulatory APIs configurations")

\[ ]**

```
[[open_banking.dcr.regulatory_api]]
api_name = "CDR-DynamicClientRegistration"
roles = "AISP,PISP"

[[open_banking.dcr.regulatory_api]]
api_name = "AccountandTransactionAPI"
roles = "AISP"
```

`[open_banking.dcr.regulatory_api]` Required

`api_name`

string Required

Default: `CDR-DynamicClientRegistration`

The regulatory APIs, which should be subscribed to by DCR applications.

`roles`

string Required

Default: `AISP,PISP`

The roles in the SSA that the API consumer application will be playing.

## API Manager internal REST APIs[​](#api-manager-internal-rest-apis "Direct link to API Manager internal REST APIs")

\[ ]**

```
[[open_banking.dcr.apim_rest_endpoints]]
app_creation = "api/am/devportal/v2/applications"
key_generation = "api/am/devportal/v2/applications/application-id/map-keys"
api_retrieve = "api/am/devportal/v2/apis"
api_subscribe = "api/am/devportal/v2/subscriptions/multiple"
```

`[open_banking.dcr.apim_rest_endpoints]`

If you want to change the internal REST API endpoints of the API Manager, configure the following tags. By default, the API Manager 4.1 endpoints are configured.

`app_creation`

string

Default: `api/am/devportal/v2/applications`

`key_generation`

string

Default: `api/am/devportal/v2/applications/application-id/map-keys`

`api_retrieve`

string

Default: `api/am/devportal/v2/apis`

`api_subscribe`

string

Default: `api/am/devportal/v2/subscriptions/multiple`

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
```

`[open_banking.data_publishing]` Required

Configurations related to the data publishing in API Manager.

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

The TCP port of Open Banking Business Intelligence Worker.

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

Defines the maximum numer of instances that can reside in the pool.

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

## Data publishing stream[​](#data-publishing-stream "Direct link to Data publishing stream")

\[ ]**

```
[[open_banking.data_publishing.thrift.stream]]
name="APIInputStream"
```

`[open_banking.data_publishing.thrift.stream]` Required

`name`

string

Default:``

Define a stream for publishing data.

## Data publishing attributes[​](#data-publishing-attributes "Direct link to Data publishing attributes")

\[ ]**

```
[[open_banking.data_publishing.thrift.stream.attributes]]
name="consentId"
priority=1
[[open_banking.data_publishing.thrift.stream.attributes]]
name="consumerId"
priority=2
[[open_banking.data_publishing.thrift.stream.attributes]]
name="clientId"
priority=3
[[open_banking.data_publishing.thrift.stream.attributes]]
name="userAgent"
priority=4
required=true
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

## Gateway Executors[​](#gateway-executors "Direct link to Gateway Executors")

\[ ]**

```
[[open_banking.gateway.openbanking_gateway_executors.type]]
name = "DCR"
```

`[open_banking.gateway.openbanking_gateway_executors.type]` Required

`name`

string Required

Default: `Default`

Possible Values: `Default, DCR, Accounts, Payments`

The Gateway Executors will engage in the configured API flow.

## Gateway Executor configurations[​](#gateway-executor-configurations "Direct link to Gateway Executor configurations")

\[ ]**

```
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.mtls.cert.validation.executor.MTLSEnforcementExecutor"
priority = 1
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.api.resource.access.validation.APIResourceAccessValidationExecutor"
priority = 2
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.dcr.DCRExecutor"
priority = 3
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.error.handler.OBDefaultErrorHandler"
priority = 1000
```

`[open_banking.gateway.openbanking_gateway_executors.type.executors]` Required

`name`

string Required

Default:``

Possible Values: `For example, \"com.wso2.openbanking.accelerator.gateway.executor.impl.tpp.validation.executor.DCRTPPValidationExecutor\",\"com.wso2.openbanking.accelerator.gateway.executor.impl.mtls.cert.validation.executor.MTLSEnforcementExecutor\",\"com.wso2.openbanking.accelerator.gateway.executor.impl.api.resource.access.validation.APIResourceAccessValidationExecutor\",\"com.wso2.openbanking.accelerator.gateway.executor.impl.mtls.cert.validation.executor.CertRevocationValidationExecutor\"`

Configure Gateway Executors for a particular API flow.

`priority`

string Required

Default:``

Set the priority of the executor.

## Gateway certificate management[​](#gateway-certificate-management "Direct link to Gateway certificate management")

\[ ]**

```
[open_banking.gateway.certificate_management.certificate]
cache_expiry = 3600
```

`[open_banking.gateway.certificate_management.certificate]` Required

`cache_expiry`

integer Required

Default: `3600`

Set the cache expiry time.

## Certificate revocation validation[​](#certificate-revocation-validation "Direct link to Certificate revocation validation")

\[ ]**

```
[open_banking.gateway.certificate_management.certificate.revocation]
enabled = true
retry_count = 3
```

`[open_banking.gateway.certificate_management.certificate.revocation]` Required

Configurations related to certificate revocation validation

`enabled`

boolean Required

Default: `TRUE`

To enable certificate revocation validation, set the value to true.

`retry_count`

integer Required

Default: `3`

## Certificate revocation validation - proxy[​](#certificate-revocation-validation-proxy "Direct link to Certificate revocation validation - proxy")

\[ ]**

```
[open_banking.gateway.certificate_management.certificate.revocation.proxy]
enabled = false
host = "PROXY_HOSTNAME"
port = 8080
```

`[open_banking.gateway.certificate_management.certificate.revocation.proxy]` Required

Configurations related to the proxy that performs certificate revocation validation.

`enabled`

boolean Required

Default: `FALSE`

By default, WSO2 Open Banking API Manager executes the certificate revocation validation. However, you can set a proxy and execute the certificate revocation validation. In that case, set the value to true.

`host`

string Required

Default: `PROXY_HOSTNAME`

The certificate revocation validations will happen via this proxy host.

`port`

integer Required

Default: `8080`

The certificate revocation validations will happen via this proxy port.

## API consumer validation configurations[​](#api-consumer-validation-configurations "Direct link to API consumer validation configurations")

\[ ]**

```
[open_banking.gateway.tpp_management.tpp_validation]
enabled = false
implementation_path = ""
cache_expiry = 3600
```

`[open_banking.gateway.tpp_management.tpp_validation]` Required

Configurations related to the validation of API consumer applications.

`enabled`

boolean Required

Default: `FALSE`

Configure a custom API Consumer Validation Executor.

`implementation_path`

string

Default:``

The FQN of your custom API Consumer Validation Executor.

`cache_expiry`

string Required

Default: `3600`

The expiry duration of the cache.

## API consumer role validation[​](#api-consumer-role-validation "Direct link to API consumer role validation")

\[ ]**

```
[open_banking.gateway.tpp_management.psd2_role_validation]
enabled = true
```

`[open_banking.gateway.tpp_management.psd2_role_validation]` Required

`enabled`

boolean Required

Default: `TRUE`

Possible Values: `true,false`

Set this to true, to compare the PSD2 roles against the certificate of API consumer applications.

## Allowed scopes for API consumer applications[​](#allowed-scopes-for-api-consumer-applications "Direct link to Allowed scopes for API consumer applications")

\[ ]**

```
[[open_banking.gateway.tpp_management.allowed_scopes]]
name = "accounts"
roles = "AISP, PISP"
[[open_banking.gateway.tpp_management.allowed_scopes]]
name = "payments"
roles = "PISP"
```

`[open_banking.gateway.tpp_management.allowed_scopes]` Required

`name`

string Required

Default:``

Possible Values: `accounts, payments`

Defines an allowed scope for API consumer applications.

`roles`

string Required

Default:``

Possible Values: `AISP, PISP`

The roles of API consumer applications are matched against these roles.

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
