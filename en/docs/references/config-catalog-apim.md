# Configuration Catalog for API Manager

The configuration model of WSO2 API Manager is based on the `toml` format. The `<APIM_HOME>/repository/conf/deployment.toml`
file is the single source used to configure and tune various features.

This document describes all the configuration parameters that are used in API Manager for WSO2 Open Banking.

## Instructions for use

> Select the configuration sections, parameters, and values that are required for your use and add them to the `.toml` file.

## Server

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="2" type="checkbox" id="_tab_2">
                <label class="tab-selector" for="_tab_2"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[server]
hostname = "localhost"
node_ip = "127.0.0.1"
#offset=0
mode = "single" #single or ha
base_path = "${carbon.protocol}://${carbon.host}:${carbon.management.port}"
#discard_empty_caches = false
server_role = "default"
</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[server]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                This includes configurations required for deploying an API Manager server node.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>hostname</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>&quot;localhost&quot;</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>&quot;localhost&quot;,&quot;127.0.0.1&quot;,&quot;&lt;any-ip-address&gt;&quot;,&quot;&lt;any-hostname&gt;&quot;</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The hostname of the machine hosting the API Manager instance.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>node_ip</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>127.0.0.1</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The IP address of the machine hosting the API Manager instance.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>offset</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> integer </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>0</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Port offset allows you to run multiple WSO2 products, multiple instances of a WSO2 product, or multiple WSO2 product clusters on the same server or virtual machine (VM). Port offset defines the number by which all ports defined in the runtime such as the HTTP/S ports will be offset. For example, if the default HTTP port is 9443 and the port offset is 1, the effective HTTP port will be 9444. Therefore, for each additional WSO2 product instance, set the port offset to a unique value so that they can all run on the same server without any port conflicts.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>mode</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>single</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>single,ha</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Defines the type of deployment, whether it is a single node deployment or a High Availability (HA) cluster.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>base_path</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>${carbon.protocol}://${carbon.host}:${carbon.management.port}</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Defines the base path URL to access the server.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>discard_empty_caches </code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Set this property to true, in order to discard empty caches.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>server_role</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>default</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>&quot;default&quot;,&quot;api-devportal&quot;,&quot;api-key-manager&quot;,&quot;api-publisher&quot;,&quot;gateway-worker&quot;,&quot;traffic-manager&quot;</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The profile name of the API Manager instance.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Super admin

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="3" type="checkbox" id="_tab_3">
                <label class="tab-selector" for="_tab_3"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[super_admin]
username = "am_admin@wso2.com"
password = "wso2123"
create_admin_account = true</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[super_admin]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                This includes the configurations related to the super admin user.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>am_admin@wso2.com</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The username of the super admin user.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2123</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The password of the super admin user.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>create_admin_account</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Set this to true, to create a new user with the super admin details given.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## User management database

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="4" type="checkbox" id="_tab_4">
                <label class="tab-selector" for="_tab_4"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[realm_manager]
data_source= "WSO2USER_DB"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[realm_manager]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                This includes the datasource configurations for the user management database.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>data_source</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>WSO2USER_DB</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The datasource used by the user manager.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Tenant management

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="16" type="checkbox" id="_tab_16">
                <label class="tab-selector" for="_tab_16"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[tenant_mgt]
enable_email_domain = true</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[tenant_mgt]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to tenant users.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_email_domain</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable email login for tenant users.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## User store

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="5" type="checkbox" id="_tab_5">
                <label class="tab-selector" for="_tab_5"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[user_store]
type = "database_unique_id"
class = "org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[user_store]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                This includes the configurations related to the user store.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>type</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>database_unique_id</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configure the type of the user store.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>class</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configure the user store manager class. The default primary user store configuration is for JDBC user stores.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## User store properties

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="6" type="checkbox" id="_tab_6">
                <label class="tab-selector" for="_tab_6"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[user_store.properties]
UsernameJavaRegEx = "a-zA-Z0-9@._-{3,30}$"
UsernameJavaScriptRegEx = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
SCIMEnabled = false
IsBulkImportSupported = false
LeadingOrTrailingSpaceAllowedInUserName = false
UsernameWithEmailJavaScriptRegEx = "^[\\S]{3,30}$"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[user_store.properties]</code>
                            <span class="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>UsernameJavaRegEx</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>a-zA-Z0-9@._-{3,30}$</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>A regular expression to validate usernames. By default, strings have a length of 5 to 30. Only non-empty characters are allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>UsernameJavaScriptRegEx</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The regular expression used by the front-end components for username validation.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>SCIMEnabled</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>This is to configure whether the user store is supported for SCIM provisioning.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>IsBulkImportSupported</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>This is to configure whether the user store is supported for bulk imports.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>LeadingOrTrailingSpaceAllowedInUserName</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>This is to configure whether the username can contain leading or trailing spaces.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>UsernameWithEmailJavaScriptRegEx</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>^[\S]{3,30}$</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>A regular expression to validate usernames that contain an email address. By default, strings have a length of 3 to 30. Only non-empty characters are allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Authorization manager

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="7" type="checkbox" id="_tab_7">
                <label class="tab-selector" for="_tab_7"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[authorization_manager]
class = "org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[authorization_manager]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                This includes the configurations related to the authorization manager.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>class</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The Authorization Manager for your server.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Authorization manager properties

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="8" type="checkbox" id="_tab_8">
                <label class="tab-selector" for="_tab_8"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[authorization_manager.properties]
AdminRoleManagementPermissions = "/permission"
AuthorizationCacheEnabled = true
GetAllRolesOfUserEnabled = false</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[authorization_manager.properties]</code>
                            <span class="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>AdminRoleManagementPermissions</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>/permission</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Sets the registry path where the authorization information (role-based permissions) are stored. </p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>AuthorizationCacheEnabled</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>To enable authorization cache.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>GetAllRolesOfUserEnabled</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable this if there are any performance issues in the production environment. Enabling this property affects the performance when the user logs in. This depends on the users, roles and permission stats.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Shared database configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="9" type="checkbox" id="_tab_9">
                <label class="tab-selector" for="_tab_9"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[database.shared_db]
url = "jdbc:mysql://localhost:3306/fs_am_configdb?autoReconnect=true&amp;useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[database.shared_db]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to the databases shared between nodes.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>url</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>jdbc:mysql://localhost:3306/fs_am_configdb?autoReconnect=true&amp;amp;useSSL=false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The database connection URL that your DBMS JDBC driver uses to connect to the fs_am_configdb database. </p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The username used for the database connection</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The password used for the database connection</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>driver</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>com.mysql.jdbc.Driver</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The name of the JDBC driver.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Shared database connection pool configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="10" type="checkbox" id="_tab_10">
                <label class="tab-selector" for="_tab_10"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[database.shared_db.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[database.shared_db.pool_options]</code>
                            <span class="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>maxActive</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>150</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>maxWait </code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>60000</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>minIdle</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>5</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>testOnBorrow</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>validationQuery</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>SELECT 1</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>SELECT 1,SELECT 1 FROM DUAL</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database. For Oracle DBMS, use &quot;SELECT 1 FROM DUAL&quot;.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>validationInterval</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>30000</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>defaultAutoCommit</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## API Manager database configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="11" type="checkbox" id="_tab_11">
                <label class="tab-selector" for="_tab_11"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[database.apim_db]
url = "jdbc:mysql://localhost:3306/fs_apimgtdb?autoReconnect=true&amp;useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[database.apim_db]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Database configurations related to API Manager.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>url</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>jdbc:mysql://localhost:3306/fs_apimgtdb?autoReconnect=true&amp;amp;useSSL=false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The database connection URL that your DBMS JDBC driver uses to connect to the openbank_apimgtdb database. </p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The username used for the database connection</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The password used for the database connection</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>driver</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>com.mysql.jdbc.Driver</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The name of the JDBC driver.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## API Manager database connection pool configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="12" type="checkbox" id="_tab_12">
                <label class="tab-selector" for="_tab_12"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[database.apim_db.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[database.apim_db.pool_options]</code>
                            <span class="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>maxActive</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>150</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>maxWait </code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>60000</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>minIdle</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>5</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>testOnBorrow</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>validationQuery</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>SELECT 1</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>SELECT 1,SELECT 1 FROM DUAL</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database. For Oracle DBMS, use &quot;SELECT 1 FROM DUAL&quot;.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>validationInterval</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>30000</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>defaultAutoCommit</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## API Manager config registry database

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="13" type="checkbox" id="_tab_13">
                <label class="tab-selector" for="_tab_13"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[database.config]
url = "jdbc:mysql://localhost:3306/fs_am_configdb?autoReconnect=true&amp;useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[database.config]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to the API Manager config registry database.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>url</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>jdbc:mysql://localhost:3306/fs_am_configdb?autoReconnect=true&amp;amp;useSSL=false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The database connection URL that your DBMS JDBC driver uses to connect to the fs_am_configdb database. </p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The username used for the database connection</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The password used for the database connection</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>driver</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>com.mysql.jdbc.Driver</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The name of the JDBC driver.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Config registry database connection pool configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="14" type="checkbox" id="_tab_14">
                <label class="tab-selector" for="_tab_14"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[database.config.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[database.config.pool_options]</code>
                            <span class="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>maxActive</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>150</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>maxWait </code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>60000</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>minIdle</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>5</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>testOnBorrow</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>validationQuery</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>SELECT 1</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>SELECT 1,SELECT 1 FROM DUAL</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database. For Oracle DBMS, use &quot;SELECT 1 FROM DUAL&quot;.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>validationInterval</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>30000</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>defaultAutoCommit</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## User Manager datasource

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="13" type="checkbox" id="_tab_13">
                <label class="tab-selector" for="_tab_13"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[database.user]
url = "jdbc:mysql://localhost:3306/fs_am_userdb?autoReconnect=true&amp;useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[database.user]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to the API Manager config registry database.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>url</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>jdbc:mysql://localhost:3306/fs_am_userdb?autoReconnect=true&amp;amp;useSSL=false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The database connection URL that your DBMS JDBC driver uses to connect to the fs_am_userdb database. </p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The username used for the database connection</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The password used for the database connection</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>driver</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>com.mysql.jdbc.Driver</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The name of the JDBC driver.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## User manager database connection pool configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="14" type="checkbox" id="_tab_14">
                <label class="tab-selector" for="_tab_14"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[database.user.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[database.user.pool_options]</code>
                            <span class="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>maxActive</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>150</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>maxWait </code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>60000</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>minIdle</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>5</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>testOnBorrow</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>validationQuery</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>SELECT 1</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>SELECT 1,SELECT 1 FROM DUAL</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database. For Oracle DBMS, use &quot;SELECT 1 FROM DUAL&quot;.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>validationInterval</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>30000</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>defaultAutoCommit</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Keystore TLS

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="17" type="checkbox" id="_tab_17">
                <label class="tab-selector" for="_tab_17"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[keystore.tls]
file_name =  "wso2carbon.jks"
type =  "JKS"
password =  "wso2carbon"
alias =  "wso2carbon"
key_password =  "wso2carbon"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[keystore.tls]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to the keystore that contains the TLS certificate.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>file_name</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2carbon.jks</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The filename of the Transport Layer Security (TLS) keystore.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>type</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>JKS</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>TRUE</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The type of the keystore file.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2carbon</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The password of the keystore file.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>alias</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2carbon</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The alias of the keystore file.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>key_password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2carbon</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The password of the private key.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Primary keystore

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="18" type="checkbox" id="_tab_18">
                <label class="tab-selector" for="_tab_18"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">#[keystore.primary]
#file_name =  "wso2carbon.jks"
#type =  "JKS"
#password =  "wso2carbon"
#alias =  "wso2carbon"
#key_password =  "wso2carbon"
</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[keystore.primary]</code>
                            <p>
                                Configurations related to the primary keystore. Primary Keystore is used for signing and encrypting data that is externally exposed.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>file_name</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2carbon.jks</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The filename of the primary keystore.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>type</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>JKS</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The type of the primary keystore file.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2carbon</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The password of the keystore file.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>alias</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2carbon</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The alias of the primary keystore file.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>key_password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2carbon</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The password of the private key.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Internal keystore

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="19" type="checkbox" id="_tab_19">
                <label class="tab-selector" for="_tab_19"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">#[keystore.internal]
#file_name =  "wso2carbon.jks"
#type =  "JKS"
#password =  "wso2carbon"
#alias =  "wso2carbon"
#key_password =  "wso2carbon"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[keystore.internal]</code>
                            <p>
                                Configurations related to the internal keystore. The Internal Keystore is used for encrypting internal critical data including passwords and other confidential information in configuration files.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>file_name</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2carbon.jks</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The filename of the primary keystore.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>type</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>JKS</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The type of the primary keystore file.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2carbon</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The password of the keystore file.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>alias</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2carbon</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The alias of the primary keystore file.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>key_password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2carbon</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The password of the private key.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## API Manager Gateway environment configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="20" type="checkbox" id="_tab_20">
                <label class="tab-selector" for="_tab_20"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[[apim.gateway.environment]]
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
websub_event_receiver_https_endpoint = "https://localhost:8021"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.gateway.environment]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configuring the gateways used by API Manager.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>name</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>Production and Sandbox</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The name of the gateways used by the API Manager. Use any preferred value.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>type</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>hybrid</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Type of the gateway.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>display_in_api_console</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Displays the environment under &#39;Try it&#39; in the API Developer Portal, in the API console.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>description</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>This is a hybrid gateway that handles both production and sandbox token traffic.</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Describe the function of the gateway.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>show_as_token_endpoint_url</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>This is used to construct the sample cURL request in the API Developer Portal.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>service_url</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>https://localhost:${mgt.transport.https.port}/services/</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>APIs will be published using this URL</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>${admin.username}</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The credentials used to publish APIs.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>${admin.password}</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The credentials used to publish APIs.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>ws_endpoint</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>ws://localhost:9099</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The WebSocket (WS) endpoint.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>wss_endpoint</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wss://localhost:8099</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The WebSocket Secure (WSS) endpoint.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>http_endpoint</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>http://localhost:${http.nio.port}</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The Hypertext Transfer Protocol (HTTP) endpoint.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>https_endpoint</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>https://localhost:${https.nio.port}</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The Hypertext Transfer Protocol Secure (HTTPS) endpoint.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Configure the Gateway environment

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="21" type="checkbox" id="_tab_21">
                <label class="tab-selector" for="_tab_21"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[apim.sync_runtime_artifacts.gateway]
gateway_labels =["Default"]</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.sync_runtime_artifacts.gateway]</code>
                            <span class="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>gateway_labels</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>[&quot;Default&quot;]</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Gateway token cache

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="22" type="checkbox" id="_tab_22">
                <label class="tab-selector" for="_tab_22"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">#[apim.cache.gateway_token]
#enable = true
#expiry_time = "900s"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.cache.gateway_token]</code>
                            <p>
                                Configurations related to Gateway token cache.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable the gateway token cache. WSO2 recommends enabling this feature by default. The token validation request checks with the cached value.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>expiry_time</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>900s</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Set the cache expiry time in seconds. The recommended value is 900 seconds.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Gateway cache resource

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="23" type="checkbox" id="_tab_23">
                <label class="tab-selector" for="_tab_23"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">#[apim.cache.resource]
#enable = true
#expiry_time = "900s"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.cache.resource]</code>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable the gateway resource cache.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>expiry_time</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>900s</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Set the cache expiry time in seconds. The recommended value is 900 seconds.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Key Manager token cache

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="24" type="checkbox" id="_tab_24">
                <label class="tab-selector" for="_tab_24"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">#[apim.cache.km_token]
#enable = false
#expiry_time = "15m"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.cache.km_token]</code>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable the Key Manager token cache. The token validation request checks with the value cached at the Key Manager. At any given time you should only have one cache enabled, which is either the Key Manager cache or the API Gateway cache. WSO2 does not recommend using both caches at the same time.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>expiry_time</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>15m</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Set the cache expiry time in minutes.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Cache recent APIs

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="25" type="checkbox" id="_tab_25">
                <label class="tab-selector" for="_tab_25"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">#[apim.cache.recent_apis]
#enable = false</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.cache.recent_apis]</code>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable cache for recently added APIs in the API Developer Portal. This expires in 15 minutes by default.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Cache scopes

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="26" type="checkbox" id="_tab_26">
                <label class="tab-selector" for="_tab_26"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">#[apim.cache.scopes]
#enable = true</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.cache.scopes]</code>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable cache for scopes. This expires in 15 minutes by default.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Cache publisher roles

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="27" type="checkbox" id="_tab_27">
                <label class="tab-selector" for="_tab_27"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">#[apim.cache.publisher_roles]
#enable = true</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.cache.publisher_roles]</code>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable cache for publisher roles. Expires in 15 minutes by default</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Cache JWT claims


<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="28" type="checkbox" id="_tab_28">
                <label class="tab-selector" for="_tab_28"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">#[apim.cache.jwt_claim]
#enable = true
#expiry_time = "15m"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.cache.jwt_claim]</code>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable JWT claim cache. The user&#39;s claims used to create the JWT are cached.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>expiry_time</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>15m</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Set the cache expiry time. Would be the same as the JWT expiry time.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Cache tags

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="29" type="checkbox" id="_tab_29">
                <label class="tab-selector" for="_tab_29"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">#[apim.cache.tags]
#expiry_time = "2m"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.cache.tags]</code>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>expiry_time</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>2m</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Set when the tag cache expires. This option is disabled when not defined.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## API Manager Analytics configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="30" type="checkbox" id="_tab_30">
                <label class="tab-selector" for="_tab_30"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[apim.analytics]
enable = false
auth_token = ""
</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.analytics]</code>
                            <span class="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>false</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Use this to enable data publishing in the API Manager.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>auth_token</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## API Manager - Key Manager configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="31" type="checkbox" id="_tab_31">
                <label class="tab-selector" for="_tab_31"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[apim.key_manager]
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
</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.key_manager]</code>
                            <span class="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>service_url</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>https://localhost:9446${carbon.context}services/</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The URL that offers services of the Key Manager.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>type</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>WSO2-IS</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>is_admin@wso2.com</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Credentials of the super admin user in the Key Manager node.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>wso2123</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Credentials of the super admin user in the Key Manager node.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>allow_subscription_validation_disabling</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>true</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>DIsable the API Subscription Validation.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>pool.init_idle_capacity</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>50</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The minimum number of clients created, to connect to the key manager.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>pool.max_idle</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>100</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The maximum number of clients created, to connect to the key manager.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>key_validation_handler_type</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>default</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>default, custom</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>If the type is set to `custom`, then provide the `key_validation_handler_impl` value.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>key_validation_handler_impl</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>org.wso2.carbon.apimgt.keymgt.handlers.DefaultKeyValidationHandler</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Provide a custom key validation handler implementation. To do this, set `key_validation_handler_type` to `custom`.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## OAuth configurations


<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="33" type="checkbox" id="_tab_33">
                <label class="tab-selector" for="_tab_33"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[apim.oauth_config]
enable_outbound_auth_header = true
white_listed_scopes = ["^device_.*", "openid", "^FS_.*", "^TIME_.*"]
#auth_header = "Authorization"
#revoke_endpoint = "https://localhost:${https.nio.port}/revoke"
#enable_token_encryption = false
#enable_token_hashing = false</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.oauth_config]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Contains OAuth-related configurations.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_outbound_auth_header</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>If `TRUE`, sends the Auth header to the backend as received from the client.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>white_listed_scopes</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>[&quot;^device_.*&quot;, &quot;openid&quot;, &quot;^FS_.*&quot;, &quot;^TIME_.*&quot;]</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>To skip role validation for a scope in an API&#39;s request, add the scope to the white list.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>auth_header</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>Authorization</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>A valid authorization header for OAuth configurations.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>revoke_endpoint</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>https://localhost:${https.nio.port}/revoke</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The token revocation endpoint used in the API Developer Portal</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_token_encryption</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>If set to TRUE, the token stored in the database will be encrypted/decrypted when reading and storing. For more information, see <a href="https://is.docs.wso2.com/en/5.11.0/learn/extension-points-for-oauth/#extension-points-for-oauth">Extension Points for OAuth</a>.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_token_hashing</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Set to TRUE to enable hashing. For more information, see <a href="https://is.docs.wso2.com/en/5.11.0/learn/setting-up-oauth-token-hashing">Setting Up OAuth Token Hashing</a>.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Developer Portal configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="34" type="checkbox" id="_tab_34">
                <label class="tab-selector" for="_tab_34"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[apim.devportal]
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
#enable_anonymous_mode=true</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.devportal]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to the API Developer Portal.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>url</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>https://localhost:${mgt.transport.https.port}/devportal</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The public API Developer Portal URL</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_application_sharing</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable application sharing according to the claims.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>application_sharing_type</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>default</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Use the `application_sharing_impl` as the default implementation.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>application_sharing_impl</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>org.wso2.carbon.apimgt.impl.SAMLGroupIDExtractorImpl</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Need to define if the application_sharing_type is custom. If both `application_sharing_type` and `application_sharing_impl` are defined, take value from application_sharing_impl.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>display_multiple_versions</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>If TRUE, displays all API versions under the API listing.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>display_deprecated_apis</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>If TRUE displays all the deprecated APIs under the API listing.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_comments</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>To enable adding comments on the API.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_ratings</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>To enable rating the API with a star-based rating.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_forum</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_anonymous_mode</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>If set to `TRUE`, you can access the Developer Portal anonymously.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## CORS configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="35" type="checkbox" id="_tab_35">
                <label class="tab-selector" for="_tab_35"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[apim.cors]
allow_origins = "*"
allow_methods = ["GET","PUT","POST","DELETE","PATCH","OPTIONS"]
allow_headers = ["authorization","Access-Control-Allow-Origin","Content-Type","SOAPAction","apikey"]
allow_credentials = false</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.cors]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configures CORS headers on the Publisher and the Gateway.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>allow_origins</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>*</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Denotes &quot;Access-Control-Allow-Origin&quot; response header. Specify an origin to share the response with.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>allow_methods</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>GET,PUT,POST,DELETE,PATCH,OPTIONS</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configures the methods allowed by the access control.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>allow_headers</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>authorization,Access-Control-Allow-Origin,Content-Type,SOAPAction</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configures the type of headers allowed by the access control.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>allow_credentials</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Specifying this header to true means that the server allows cookies (or other user credentials) to be included on cross-origin requests.

 It is false by default and if you set it to true then make sure that the Access-Control-Allow-Origin header does not contain the wildcard (*)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Throttling configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="36" type="checkbox" id="_tab_36">
                <label class="tab-selector" for="_tab_36"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[apim.throttling]
username = "$ref{super_admin.username}@carbon.super"
#enable_data_publishing = true
#enable_policy_deploy = true
#enable_blacklist_condition = true
#enable_persistence = true
#throttle_decision_endpoints = ["tcp://localhost:5672","tcp://localhost:5672"]</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.throttling]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to API Manager traffic control.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>$ref{super_admin.username}@carbon.super</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_data_publishing</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable publishing of requests and throttling data.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_policy_deploy</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable deployment of throttling policies.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_blacklist_condition</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable blocking conditions from the admin portal.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_persistence</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable persisting current counter state of the Traffic Manager.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>throttle_decision_endpoints</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>[&quot;tcp://localhost:5672&quot;,&quot;tcp://localhost:5672&quot;]</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Define a set of JMS connections as an array.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Throttling Policy Deploy configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="36" type="checkbox" id="_tab_36">
                <label class="tab-selector" for="_tab_36"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[apim.throttling.policy_deploy]
username = "$ref{super_admin.username}@carbon.super"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.throttling.policy_deploy]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to API Manager traffic control.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>$ref{super_admin.username}@carbon.super</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Throttling JMS configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="36" type="checkbox" id="_tab_36">
                <label class="tab-selector" for="_tab_36"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[apim.throttling.jms]
password = "$ref{super_admin.password}"
username = "am_admin!wso2.com!carbon.super"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[apim.throttling.jms]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to API Manager traffic control.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>am_admin!wso2.com!carbon.super</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>$ref{super_admin.password}</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
