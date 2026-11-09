# Configuring Identity Server

WSO2 Open Banking Accelerator contains TOML-based configurations. All the server-level configurations of the Identity Server instance can be applied using a single configuration file, which is the `deployment.toml` file.

## Configuring deployment.toml[​](#configuring-deploymenttoml "Direct link to Configuring deployment.toml")

Follow the steps below to configure the `deployment.toml` file and set up the default open banking flow for WSO2 Identity Server.

tip

If you want to customize and learn more about TOML configurations, see [Identity Server Configuration Catalog for open banking](/en/latest/references/config-catalog-is/.md).

1. Replace the `deployment.toml` file as explained in the [Setting up the servers](/en/latest/install-and-setup/setting-up-servers/.md#copying-the-deploymenttoml) section.

2. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

3. Set the hostname of the Identity Server:

   ```
   [server]    

   hostname = "<IS_HOST>"   
   ```

4. Configure the username and password of the super admin user.

   ```
   [super_admin]

   username = "<SUPER_ADMIN_USERNAME>"

   password = "<SUPER_ADMIN_PASSWORD>" 
   ```

5. Update the datasource configurations with your database properties, such as the username, password, JDBC URL for the database server, and the JDBC driver.

   * Given below are sample configurations for a MySQL database. For other DBMS types and more information, see [Setting up databases](/en/latest/install-and-setup/setting-up-databases/.md).

   - identity\_db
   - shared\_db
   - config
   - user
   - WSO2FS\_DB

   ```
   [database.identity_db]

   url = "jdbc:mysql://localhost:3306/fs_identitydb?autoReconnect=true&amp;useSSL=false"

   username = "root"

   password = "root"

   driver = "com.mysql.jdbc.Driver"
   ```

   ```
   [database.shared_db]

   url = "jdbc:mysql://localhost:3306/fs_iskm_configdb?autoReconnect=true&amp;useSSL=false"

   username = "root"

   password = "root"

   driver = "com.mysql.jdbc.Driver"
   ```

   ```
   [database.config]

   url = "jdbc:mysql://localhost:3306/fs_iskm_configdb?autoReconnect=true&amp;useSSL=false"

   username = "root"

   password = "root"

   driver = "com.mysql.jdbc.Driver"
   ```

   ```
   [database.user]

   url = "jdbc:mysql://localhost:3306/fs_userdb?autoReconnect=true&amp;useSSL=false"

   username = "root"

   password = "root"

   driver = "com.mysql.jdbc.Driver"
   ```

   ```
   [[datasource]]

   id="WSO2OB_DB"

   url = "jdbc:mysql://localhost:3306/fs_consentdb?autoReconnect=true&amp;useSSL=false"

   username = "root"

   password = "root"

   driver = "com.mysql.jdbc.Driver"
   ```

6. Configure the authentication endpoints with the hostname of the Identity Server.

   ```
   [authentication.endpoints]  

   login_url = "https://<IS_HOST>:9446/authenticationendpoint/login.do"    

   retry_url = "https://<IS_HOST>:9446/authenticationendpoint/retry.do"
   ```

   ```
   [oauth.endpoints.v2]    

   oauth2_consent_page = "${carbon.protocol}://<IS_HOST>:${carbon.management.port}/fs/authenticationendpoint/oauth2_authz.do"

   oidc_consent_page = "${carbon.protocol}://<IS_HOST>:${carbon.management.port}/fs/authenticationendpoint/oauth2_consent.do"
   ```

7. Configure the consent portal parameters with the hostname of the Identity Server.

   ```
   [financial_services.consent.portal.params]

   identity_server_base_url="https://<IS_HOST>:9446"
   ```

8. Configure a periodical consent expiration job as follows:

   ```
   [financial_services.consent.periodical_expiration]

   # This property needs to be true in order to run the consent expiration periodical updater.

   enabled=true

   # Cron value for the periodical updater. "0 0 0 * * ?" cron will describe as 00:00:00am every day

   cron_value="0 0 0 * * ?"

   # This value to be update for expired consents.

   expired_consent_status_value="Expired"

   # The current consent statuses that are eligible to be expired. (Comma separated value list)

   eligible_statuses="authorised"
   ```

   * In order to identify the consent expiration time, relevant consents need to maintain the `ExpirationDateTime` attribute which contains a UTC timestamp. A consent is not eligible for periodical consent expiration if the `ExpirationDateTime` attribute is not available for that particular consent.

   Click here to see the configurations for periodical consent expiration in a clustered setup.

   * Add the `quartz.properties` file to `<IS_HOME>/repository/conf` and enable clustering by configuring the datasources according to the [Quartz Configuration Reference](http://www.quartz-scheduler.org/documentation/quartz-2.1.7/configuration/).

   * Create a new database and use the database scripts available [here](https://github.com/quartz-scheduler/quartz/tree/quartz-2.3.x/quartz-core/src/main/resources/org/quartz/impl/jdbcjobstore) to create the quartz cluster tables.

   * Add following jars to the `<IS_HOME>/repository/component/lib` directory.

     <!-- -->

     * [mchange-commons-java-0.2.20.jar](https://repo1.maven.org/maven2/com/mchange/mchange-commons-java/0.2.20/mchange-commons-java-0.2.20.jar)
     * [c3p0-0.9.5.4.jar](https://repo1.maven.org/maven2/com/mchange/c3p0/0.9.5.4/c3p0-0.9.5.4.jar)

   * Copy the same `quartz.properties` file to each instance in the cluster and update the `instanceId`.

   * Click [here](/en/latest/assets/attachments/quartz.properties) to download a sample `quartz.properties` configuration file.

   note

   To stop the execution of the consent expiration periodical updater and trigger the expiration job, add the configuration as follows:

   ```
   [financial_services.consent.periodical_expiration]

   # This property needs to be true in order to run the consent expiration periodical updater.

   enabled=false

   # This value to be update for expired consents.

   expired_consent_status_value="Expired"

   # The current consent statuses that are eligible to be expired. (Comma separated value list)

   eligible_statuses="authorised"
   ```

   Given below is the custom endpoint provided to trigger the consent expiration job:

   ```
   https://<IS_HOST>:9446/api/openbanking/consent/admin/expire-consents
   ```

   Refer to the [Consent REST API documentation](/en/latest/references/consent-rest-api/.md) for more information.

9. Configure the HTTP connection pool using below configuration:

   ```
   [financial_services.http_connection_pool]

   max_connections = 2000

   max_connections_per_route = 1500
   ```

10. Configure application\_mgt configuration to enable application role validation:

    ```
    [application_mgt]

    enable_role_validation = true
    ```

11. Configure the `is_pre_initiated_consent` parameter to specify whether consent should be pre-initiated prior to the authorization flow, or dynamically created during the authorization process.

    ```
    [financial_services.consent]

    is_pre_initiated_consent=true
    ```

12. Configure the `auth_flow_consent_id_source` parameter to specify the source from which the consent ID should be retrieved during the authorization request. Supported values include `requestObject` and `requestParam`.

    ```
    [financial_services.consent]

    auth_flow_consent_id_source="requestObject"
    ```

    note

    * The `json_path` should be configured if the `auth_flow_consent_id_source` is set to `requestObject` to extract
      <br />
      <!-- -->
      the consent ID from the request object.

    ```
      [financial_services.consent.consent_id_extraction]

      json_path="/id_token/openbanking_intent_id/value"
    ```

    * The `key` should be configured if the `auth_flow_consent_id_source` is set to `requestParam` to determine the key of the request parameter. Eg: "scope" is currently only supported for specifications like Berlin flow, where the consent ID is included in the scope.

    ```
     [financial_services.consent.consent_id_extraction]

     key="scope"
    ```

    Optional

    * Configure consent\_id\_regex to extract the consent ID from the value obtained via requestParam or requestObject. commonly used in Berlin flows to extract it from the scope attribute. This is primarily used in Berlin compliance solution to parse the consent ID from the scope attribute.

    ```
      [financial_services.consent.consent_id_extraction]

      regex_pattern=":([a-fA-F0-9-]+)"
    ```

13. Use following configuration to determine whether the consent ID should be appended to the token, id\_token and introspection responses.

    ```
    [financial_services.identity]

    consent_id_claim_name="consent_id"

    append_consent_id_to_token_id_token=false

    append_consent_id_to_authz_id_token=true

    append_consent_id_to_access_token=true

    append_consent_id_to_token_introspect_response=false
    ```

14. Enable idempotency validation using below configuration:

    note

    Add the required API resources to the `allowed_api_resources` list.

    ```
        [financial_services.consent.idempotency]

        enabled=true

        allowed_time_duration=1440

        header_name="x-idempotency-key"

        allowed_for_all_apis=false

        allowed_api_resources=["domestic-payment-consents"]
    ```

15. Configure `drop_unregistered_scopes` to drop unregistered scopes from the consent request.

    ```
    [oauth]

    drop_unregistered_scopes = true
    ```

Click here to see the configurations to enable external service extension.

Add the following resource access control if you are deploying the external service within the Identity Server.

```
    [[resource.access_control]]

    allowed_auth_handlers = ["BasicAuthentication"]

    context = "<REFERENCE_IMPLEMENTATION_CONTEXT>"

    http_method = "all"

    secure = "true"
```

Add the following resource access control to configure the backend.

```
    [[resource.access_control]]

    context = "<BACKEND_CONTEXT>"

    http_method = "all"

    secure = "false"
```

Add the following configurations to enable the external service extension.

```
    [financial_services.extensions.endpoint]

    enabled = true

    # allowed extensions: "pre_process_client_creation", "pre_process_consent_creation"

    allowed_extensions = ["pre_process_client_creation", "pre_process_client_update", "pre_process_client_retrieval",

    "pre_process_consent_creation", "enrich_consent_creation_response", "pre_process_consent_file_upload",

    "enrich_consent_file_response", "pre_process_consent_retrieval", "validate_consent_file_retrieval",

    "pre_process_consent_revoke", "enrich_consent_search_response", "populate_consent_authorize_screen",

    "persist_authorized_consent", "validate_consent_access", "issue_refresh_token", "validate_authorization_request",

    "validate_event_subscription", "enrich_event_subscription_response", "validate_event_creation",

    "validate_event_polling", "enrich_event_polling_response", "map_accelerator_error_response"]

    base_url = "<EXTERNAL_SERVICE_URL>"

    retry_count = 5

    connect_timeout = 5

    read_timeout = 5



    [financial_services.extensions.endpoint.security]

    # supported types : Basic-Auth or OAuth2

    type = "Basic-Auth"

    username = "<SUPER_ADMIN_USERNAME>"

    password = "<SUPER_ADMIN_PASSWORD>"
```

## Starting servers[​](#starting-servers "Direct link to Starting servers")

1. Go to the `<IS_HOME>/bin` directory using a terminal.

2. Run the `wso2server.sh` script as follows:

   ```
   ./wso2server.sh
   ```
