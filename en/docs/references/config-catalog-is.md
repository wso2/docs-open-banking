# Configuration Catalog for Identity Server

The configuration model of WSO2 Identity Server is based on the `toml` format. The `<IS_HOME>/repository/conf/deployment.toml`
file is the single source used to configure and tune various features.

This document describes all the configuration parameters that are used in the Identity Server for WSO2 Open Banking.

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
<pre>
<code class="toml">[server]
hostname = "localhost"
node_ip = "127.0.0.1"
base_path = "https://$ref{server.hostname}:${carbon.management.port}"
serverDetails = "WSO2 IS as KM 7.2.0"
mode = "single"
userAgent = "WSO2 IS as KM 7.2.0"
offset = 3
</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[server]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                This includes configurations required for deploying an Identity Server node.
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
                                            <span class="param-possible-values">Possible Values: 
                                                <code>&quot;localhost&quot;,&quot;127.0.0.1&quot;,&quot;&lt;any-ip-address&gt;&quot;,&quot;&lt;any-hostname&gt;&quot;</code>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The hostname of the machine hosting the Identity Server instance.</p>
                                    </div>
                                </div>
                            </div><div class="param">
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
                                        <p>The IP address of the machine hosting the Identity Server instance.</p>
                                    </div>
                                </div>
                            </div><div class="param">
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
                                            <span class="param-default-value">Default: <code>${carbon.protocol}://${carbon.host}:${carbon.management.port}</code>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Defines the base path URL to access the server.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>serverDetails</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>WSO2 IS as KM 7.2.0</code>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Description of the server.</p>
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
                                  <span class="param-name-wrap"> <code>userAgent</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>WSO2 IS as KM 7.2.0</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div><div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>offset</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> integer </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>3</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Port offset allows you to run multiple WSO2 products, multiple instances of a WSO2 product, or multiple WSO2 product clusters on the same server or virtual machine (VM). Port offset defines the number by which all ports defined in the runtime such as the HTTP/S ports will be offset. For example, if the default HTTP port is 9443 and the port offset is 3, the effective HTTP port will be 9446. Therefore, for each additional WSO2 product instance, set the port offset to a unique value so that they can all run on the same server without any port conflicts.</p>
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
            <input name="4" type="checkbox" id="_tab_4">
                <label class="tab-selector" for="_tab_4"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[tenant_mgt]
enable_email_domain = true
</code>
</pre>
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

## Super admin

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="5" type="checkbox" id="_tab_5">
                <label class="tab-selector" for="_tab_5"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[super_admin]
username = "is_admin@wso2.com"
password = "wso2123"
create_admin_account = true
</code>
</pre>
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
                                            <span class="param-default-value">Default: <code>is_admin@wso2.com</code></span>
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
                            </div><div class="param">
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
            <input name="6" type="checkbox" id="_tab_6">
                <label class="tab-selector" for="_tab_6"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[realm_manager]
data_source= "WSO2USER_DB"</code>
</pre>
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

## User store

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="7" type="checkbox" id="_tab_7">
                <label class="tab-selector" for="_tab_7"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[user_store]
type = "database_unique_id"
class = "org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager"
</code>
</pre>
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
                                        <p></p>
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
                                            <span class="param-default-value">Default: 
                                                <code>org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager</code>
                                            </span>
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

## User store properties

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="8" type="checkbox" id="_tab_8">
                <label class="tab-selector" for="_tab_8"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[user_store.properties]
UsernameJavaRegEx = "a-zA-Z0-9@._-{3,30}$"
UsernameJavaScriptRegEx = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
SCIMEnabled = false
IsBulkImportSupported = false
LeadingOrTrailingSpaceAllowedInUserName = false
UsernameWithEmailJavaScriptRegEx = "^[\\S]{3,30}$"</code>
</pre>
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
            <input name="9" type="checkbox" id="_tab_9">
                <label class="tab-selector" for="_tab_9"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[authorization_manager]
class = "org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager"
</code>
</pre>
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
            <input name="10" type="checkbox" id="_tab_10">
                <label class="tab-selector" for="_tab_10"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[authorization_manager.properties]
AdminRoleManagementPermissions = "/permission"
AuthorizationCacheEnabled = true
GetAllRolesOfUserEnabled = false</code>
</pre>
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
            <input name="11" type="checkbox" id="_tab_11">
                <label class="tab-selector" for="_tab_11"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[database.shared_db]
url = "jdbc:mysql://localhost:3306/fs_iskm_configdb?autoReconnect=true&amp;useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"</code>
</pre>
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
                                            <span class="param-default-value">Default: <code>jdbc:mysql://localhost:3306/fs_iskm_configdb?autoReconnect=true&amp;amp;useSSL=false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The database connection URL that your DBMS JDBC driver uses to connect to the fs_iskm_configdb database. </p>
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
            <input name="12" type="checkbox" id="_tab_12">
                <label class="tab-selector" for="_tab_12"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[database.shared_db.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false</code>
</pre>
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

## Identity database configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="13" type="checkbox" id="_tab_13">
                <label class="tab-selector" for="_tab_13"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[database.identity_db]
url = "jdbc:mysql://localhost:3306/fs_identitydb?autoReconnect=true&amp;useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[database.identity_db]</code>
                            <span class="badge-required">Required</span>
                            <p>
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
                                            <span class="param-default-value">Default: <code>jdbc:mysql://localhost:3306/fs_identitydb?autoReconnect=true&amp;amp;useSSL=false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The database connection URL that your DBMS JDBC driver uses to connect to the fs_identitydb database, which contains Identity data.</p>
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

## Identity database connection pool configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="14" type="checkbox" id="_tab_14">
                <label class="tab-selector" for="_tab_14"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[database.identity_db.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[database.identity_db.pool_options]</code>
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

## Identity config registry database

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="15" type="checkbox" id="_tab_15">
                <label class="tab-selector" for="_tab_15"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[database.config]
url = "jdbc:mysql://localhost:3306/fs_iskm_configdb?autoReconnect=true&amp;useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[database.config]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to the Identity config registry database.
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
                                            <span class="param-default-value">Default: <code>jdbc:mysql://localhost:3306/fs_iskm_configdb?autoReconnect=true&amp;amp;useSSL=false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The database connection URL that your DBMS JDBC driver uses to connect to the fs_iskm_configdb database. </p>
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
            <input name="16" type="checkbox" id="_tab_16">
                <label class="tab-selector" for="_tab_16"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[database.config.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false
</code>
</pre>
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

## User Management database configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="17" type="checkbox" id="_tab_17">
                <label class="tab-selector" for="_tab_17"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[database.user]
url = "jdbc:mysql://localhost:3306/fs_userdb?autoReconnect=true&amp;useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[database.user]</code>
                            <span class="badge-required">Required</span>
                            <p>
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
                                            <span class="param-default-value">Default: <code>jdbc:mysql://localhost:3306/fs_userdb?autoReconnect=true&amp;amp;useSSL=false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The database connection URL that your DBMS JDBC driver uses to connect to the fs_userdb database, which contains user management data.</p>
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

## User Management database connection pool configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="18" type="checkbox" id="_tab_18">
                <label class="tab-selector" for="_tab_18"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[database.user.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false</code>
</pre>
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
                                  <span class="param-name-wrap"> <code>maxWait</code> </span>
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

## Open Banking Consent datasource

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="19" type="checkbox" id="_tab_19">
                <label class="tab-selector" for="_tab_19"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[[datasource]]
id="WSO2OB_DB"
url = "jdbc:mysql://localhost:3306/fs_consentdb?autoReconnect=true&amp;useSSL=false"
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
pool_options.defaultAutoCommit=false</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[datasource]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to the open banking consent datasource.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>id</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>WSO2FS_DB</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The datasource used by the open banking.</p>
                                    </div>
                                </div>
                            </div>
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
                                            <span class="param-default-value">Default: <code>jdbc:mysql://localhost:3306/fs_consentdb?autoReconnect=true&amp;amp;useSSL=false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The database connection URL that your DBMS JDBC driver uses to connect to the fs_consentdb database. </p>
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
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>jmx_enable</code> </span>
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
                                        <p>Use this parameter to enable JMX for the database connection.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>pool_options.maxActive</code> </span>
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
                                  <span class="param-name-wrap"> <code>pool_options.maxWait</code> </span>
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
                                  <span class="param-name-wrap"> <code>pool_options.minIdle</code> </span>
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
                                  <span class="param-name-wrap"> <code>pool_options.testOnBorrow </code> </span>
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
                                  <span class="param-name-wrap"> <code>pool_options.validationQuery</code> </span>
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
                                  <span class="param-name-wrap"> <code>pool_options.validationInterval</code> </span>
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
                                  <span class="param-name-wrap"> <code>pool_options.defaultAutoCommit</code> </span>
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

## Primary keystore

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="3" type="checkbox" id="_tab_3">
                <label class="tab-selector" for="_tab_3"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[keystore.primary]
name = "wso2carbon.p12"
password = "wso2carbon"
type="PKCS12"</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[keystore.primary]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to the primary keystore.
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
                                            <span class="param-default-value">Default: <code>wso2carbon.p12</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The filename of the primary keystore.</p>
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
                                        <p>The password of the keystore file</p>
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
                                            <span class="param-default-value">Default: <code>PKCS12</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The type of the keystore file</p>
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

## Truststore

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="3" type="checkbox" id="_tab_3">
                <label class="tab-selector" for="_tab_3"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[truststore]
file_name="client-truststore.p12"
password="wso2carbon"
type="PKCS12"</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[truststore]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                Configurations related to the truststore.
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
                                            <span class="param-default-value">Default: <code>client-truststore.p12</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The filename of the truststore.</p>
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
                                        <p>The password of the truststore file</p>
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
                                            <span class="param-default-value">Default: <code>PKCS12</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The type of the truststore file</p>
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

## Authentication endpoints

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="20" type="checkbox" id="_tab_20">
                <label class="tab-selector" for="_tab_20"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[authentication.endpoints]
login_url = "https://localhost:9446/authenticationendpoint/login.do"
retry_url = "https://localhost:9446/authenticationendpoint/retry.do"</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[authentication.endpoints]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                The URLs of the authentication web application.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>login_url</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>https://localhost:9446/authenticationendpoint/login.do</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>retry_url</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>https://localhost:9446/authenticationendpoint/retry.do</code></span>
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

## Authentication endpoint redirect parameters

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="21" type="checkbox" id="_tab_21">
                <label class="tab-selector" for="_tab_21"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[authentication.endpoint.redirect_params]
filter_policy = "include"
remove_on_consume_from_api = "true"
parameters = ["sessionDataKeyConsent","relyingParty", "authenticators", "authFailureMsg", "authFailure"]</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[authentication.endpoint.redirect_params]</code>
                            <span class="badge-required">Required</span>
                            <p> 
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>filter_policy</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>include</code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code> </code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>When the action is set to include, the defined parameters will be sent to the authentication endpoint as a query parameter.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>remove_on_consume_from_api</code> </span>
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
                                    </div>
                                    <div class="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>parameters</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>[&quot;sessionDataKeyConsent&quot;,&quot;relyingParty&quot;, &quot;authenticators&quot;, &quot;authFailureMsg&quot;, &quot;authFailure&quot;]</code></span>
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

## SMS OTP Authenticator parameters

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="23" type="checkbox" id="_tab_23">
                <label class="tab-selector" for="_tab_23"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[authentication.authenticator.sms_otp.parameters]
EnableAccountLockingForFailedAttempts = true
BackupCode = false
TokenExpiryTime = 60
</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[authentication.authenticator.sms_otp.parameters]</code>
                            <span class="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                    <span class="param-name-wrap"> <code>EnableAccountLockingForFailedAttempts</code> </span>
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
                                        <p>To enable account locking for each type of OTP attempt, set it to true.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>BackupCode</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
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
                                        <p>To set up backup codes.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>TokenExpiryTime</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>60</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Set up the expiration time for the token.</p>
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

## OAuth endpoints

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="22" type="checkbox" id="_tab_22">
                <label class="tab-selector" for="_tab_22"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[oauth.endpoints.v2]
oauth2_consent_page = "${carbon.protocol}://localhost:${carbon.management.port}/fs/authenticationendpoint/oauth2_authz.do"
oidc_consent_page = "${carbon.protocol}://localhost:${carbon.management.port}/fs/authenticationendpoint/oauth2_consent.do"
</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[oauth.endpoints.v2]</code>
                            <span class="badge-required">Required</span>
                            <p>
                                The OAuth endpoints for the Identity Server.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>oauth2_consent_page</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>${carbon.protocol}://localhost:${carbon.management.port}/fs/authenticationendpoint/oauth2_authz.do</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>oidc_consent_page</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>${carbon.protocol}://localhost:${carbon.management.port}/fs/authenticationendpoint/oauth2_consent.do</code></span>
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

## OAuth DCR 

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="26" type="checkbox" id="_tab_26">
                <label class="tab-selector" for="_tab_26"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[oauth.dcr]
enable_fapi_enforcement=true
ssa_jkws= "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks"
</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[oauth.dcr]</code>
                            <p>OAuth DCR Endpoint configurations</p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enable_fapi_enforcement</code> </span>
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
                                        <p>By default, all applications created via OAuth DCR endpoint will be FAPI enforced. If you wnt to change it change this to false</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>ssa_jkws</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>  
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Add the org jwks endpoint to validate the signature of the SSA</p>
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

## Accelerator Service Extension Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="26" type="checkbox" id="_tab_26">
                <label class="tab-selector" for="_tab_26"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[financial_services.extensions.endpoint]
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
read_timeout = 5</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.extensions.endpoint]</code>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enabled</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>This configuration will enable the Accelerator Service Extension</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>allowed_extensions</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>["pre_process_client_creation", "pre_process_client_update", "pre_process_client_retrieval",
                                            "pre_process_consent_creation", "enrich_consent_creation_response", "pre_process_consent_file_upload",
                                            "enrich_consent_file_response", "pre_process_consent_retrieval", "validate_consent_file_retrieval",
                                            "pre_process_consent_revoke", "enrich_consent_search_response", "populate_consent_authorize_screen",
                                            "persist_authorized_consent", "validate_consent_access", "issue_refresh_token", "validate_authorization_request",
                                            "validate_event_subscription", "enrich_event_subscription_response", "validate_event_creation",
                                            "validate_event_polling", "enrich_event_polling_response", "map_accelerator_error_response"]</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>This configuration will be used to enable the required extension points</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>base_url</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                    </div>
                                    <div class="param-description">
                                        <p>Base URL of the implemented Accelerator Extensions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>retry_count</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> integer </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>5</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>This configuration will be used to configure the no of retry counts for the  extension points</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>connect_timeout</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> integer </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>5</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>This configuration will be used to configure the connection timeout for the  extension points</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>read_timeout</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> integer </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>5</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>This configuration will be used to configure the read timeout for the  extension points</p>
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

## Accelerator Service Extension Endpoint Security Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="26" type="checkbox" id="_tab_26">
                <label class="tab-selector" for="_tab_26"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[financial_services.extensions.endpoint.security]
type = "Basic-Auth"
username = ""
password = ""</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.extensions.endpoint.security]</code>
                            <p>
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
                                        </p>
                                    </div>
                                    <div class="param-description">
                                        <p>Basic Auth username of the Accelerator Extension</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                    </div>
                                    <div class="param-description">
                                        <p>Basic Auth password of the Accelerator Extension</p>
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

## Primary authenticator

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="54" type="checkbox" id="_tab_54">
                <label class="tab-selector" for="_tab_54"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[financial_services.app_registration.sca.primaryauth]
name = ""
display = ""</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.app_registration.sca.primaryauth]</code>
                            <p>
                                Configures the primary authenticator.
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
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>BasicAuthenticator,IdentifierExecutor</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The name of the primary authenticator to be engaged in the authentication flow.</p>
                                    </div>
                                </div>
                            </div><div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>display</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div class="param-possible">
                                            <span class="param-possible-values">Possible Values: <code>basic,identifier-first</code></span>
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

## Identity provider configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="55" type="checkbox" id="_tab_55">
                <label class="tab-selector" for="_tab_55"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[financial_services.app_registration.sca.idp]
name = "FacebookIdP"
step = 2</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.app_registration.sca.idp]</code>
                            <p>
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
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configure the identity provider as the secondary authentication method. The example given here is for SMS OTP.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>step</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> integer </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configure the at which step the identity provider should be configured.</p>
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

## Conditional Auth Acript configurations

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="55" type="checkbox" id="_tab_55">
                <label class="tab-selector" for="_tab_55"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[financial_services.app_registration.conditional.auth.script]
filename=""</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.app_registration.conditional.auth.script]</code>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>filename</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Put the conditional auth script inside the <IAM_HOME>/repository/conf folder and config the file name.</p>
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

## Open Banking DCR - Configure Request Parameters

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="55" type="checkbox" id="_tab_55">
                <label class="tab-selector" for="_tab_55"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[[financial_services.app_registration.dcr.params]]
name = "SoftwareId"
key = "software_id"
required = false
include_in_response = true</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[[financial_services.app_registration.dcr.params]]</code>
                            <p>
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
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Sample: <code>Scope</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Name of the DCR Request Attribute</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>key</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Sample: <code>scope</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Key of the paramater in the DCR Request Attribute</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Sample: <code>false</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered as a optional request parameter in the DCR request.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>include_in_response</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Sample: <code>true</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>If you want to include this parameter in the DCR Response, set this tag to true.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>allowed_values</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Sample: <code>["accounts", "payments", "fundsconfirmations"]</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="param-description">
                            <p>Following attributes are by default included in deployment.toml file. You can modify these according to the specification. Also can add new configurations for parameters that are not specified below</p>
<pre>
<code class="toml">
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
</code>
</pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

## Open Banking DCR - Request Validators Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="26" type="checkbox" id="_tab_26">
                <label class="tab-selector" for="_tab_26"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[[financial_services.app_registration.dcr.validators.validator]]
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
priority = 9</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[[financial_services.app_registration.dcr.validators.validator]]</code>
                            <p>
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
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Sample: <code>SSAIssuerValidator</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Name of the Validator.</p>
                                    </div>
                                </div>
                            </div>
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
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Sample: <code>org.wso2.financial.services.accelerator.identity.extensions.client.registration.dcr.validators.SSAIssuerValidator</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>FQN of the Validator.</p>
                                    </div>
                                </div>
                            </div>
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
                                            <span class="param-default-value">Default: <code>true</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>If you want to disbae the validator, you can change this tag to false.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>priority</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> integer </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Sample: <code>1</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Priority of the Validator.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>allowed_values</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Sample: <code>["OpenBanking Ltd"]</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Allowed values of the Validator.</p>
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

## Open Banking DCR - Regulatory Issuer Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="26" type="checkbox" id="_tab_26">
                <label class="tab-selector" for="_tab_26"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[[financial_services.app_registration.dcr.regulatory_issuers.iss]]
name = "OpenBanking Ltd"</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[[financial_services.app_registration.dcr.regulatory_issuers.iss]]</code>
                            <p>
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
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>OpenBanking Ltd</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Regulatory Issuers supported by the system</p>
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

## Auth Flow Consent ID Source Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="26" type="checkbox" id="_tab_26">
                <label class="tab-selector" for="_tab_26"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[financial_services.consent]
auth_flow_consent_id_source="requestObject"</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent]</code>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>auth_flow_consent_id_source</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>requestObject</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>This configuration is used to identify the source of the consent ID in the authorization request. Can be either "requestObject" or "requestParam" </p>
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

## Pre Initiated Consent Scopes Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="26" type="checkbox" id="_tab_26">
                <label class="tab-selector" for="_tab_26"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[financial_services.consent.pre_initiated]
scopes=["accounts", "payments", "fundsconfirmations"]</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.pre_initiated]</code>
                            <p>This configuration is used to define the scopes for which consent has already been initiated prior to the consent authorization step.</p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>scopes</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>["accounts", "payments", "fundsconfirmations"]</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configure the scopes that are pre initiated. If not configured, all scopes will be considered as pre initiated. If a scopes is configured in both configs it will be condsidered as a pre-initiated consent </p>
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

## Scope Based Consent Scopes Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="26" type="checkbox" id="_tab_26">
                <label class="tab-selector" for="_tab_26"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[financial_services.consent.scope_based]
scopes=[]</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.scope_based]</code>
                            <p>This configuration is used to define the scopes for which consent has not been initiated prior to the consent authorization step.</p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>scopes</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>[]</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configure the scopes that the consent has not been created before. If not configured, all scopes will be considered as pre initiated. If a scopes is configured in both configs it will be condsidered as a pre-initiated consent </p>
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

## Auth flow Consent Id Extraction Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="26" type="checkbox" id="_tab_26">
                <label class="tab-selector" for="_tab_26"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre>
<code class="toml">[financial_services.consent.consent_id_extraction]
json_path="/id_token/openbanking_intent_id/value"
# key="key-name"
# regex_pattern="regex-pattern"</code>
</pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.consent_id_extraction]</code>
                            <p>This configuration is used to define the json path to retrieve the consent ID from the request object.</p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>json_path</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>"/id_token/openbanking_intent_id/value"</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configure the json path to the parameter to retrieve the consent ID starting from the root level of the request object. Must be configured if "auth_flow_consent_id_source" is set to "requestObject"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>key</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>"key-name"</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configure the key name to extract the consent ID from request params. Must be configured if "auth_flow_consent_id_source" is set to "requestParam"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>regex_pattern</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>"regex_pattern"</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configure the regex pattern to extract consent ID from the request.</p>
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

## Consent manage handler

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">           
            <input name="57" type="checkbox" id="_tab_57">
                <label class="tab-selector" for="_tab_57"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[financial_services.consent.manage]
handler="org.wso2.financial.services.accelerator.consent.mgt.extensions.manage.impl.DefaultConsentManageHandler"
validator="org.wso2.financial.services.accelerator.consent.mgt.extensions.manage.impl.DefaultConsentManageValidator"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.manage]</code>
                            <span class="badge-required">Required</span>
                            <p> 
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>handler</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>org.wso2.financial.services.accelerator.consent.mgt.extensions.manage.impl.DefaultConsentManageHandler</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configures a custom Consent Manage component.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>validator</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>org.wso2.financial.services.accelerator.consent.mgt.extensions.manage.impl.DefaultConsentManageValidator</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configures a custom Consent Manage validator component.</p>
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

## Allowed Headers for Consent Manage Handler Extension

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">           
            <input name="57" type="checkbox" id="_tab_57">
                <label class="tab-selector" for="_tab_57"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[financial_services.consent.manage_extension]
allowed_headers = ["x-wso2-client-id"]</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.manage_extension]</code>
                            <span class="badge-required">Required</span>
                            <p> 
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>allowed_headers</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>["x-wso2-client-id"]</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configure the headers that need to passed to the consent manage extension.</p>
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

## Consent authorization retrieval steps

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="60" type="checkbox" id="_tab_60">
                <label class="tab-selector" for="_tab_60"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[[financial_services.consent.authorize_steps.retrieve]]
class = "org.wso2.financial.services.accelerator.consent.mgt.extensions.authorize.impl.DefaultConsentRetrievalStep"
priority = 1

[[financial_services.consent.authorize_steps.retrieve]]
class = "org.wso2.financial.services.accelerator.consent.mgt.extensions.authorize.impl.NonRegulatoryConsentStep"
priority = 2</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.authorize_steps.retrieve]</code>
                            <span class="badge-required">Required</span>
                            <p>
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
                                            <span class="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configures custom retrieval steps and their order. The steps are invoked based on the configured priority order. In the retrieval steps, there is a non-regulatory step configured as the priority order 1001. Make sure to configure any custom step before this step.</p>
                                    </div>
                                </div>
                            </div><div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>priority</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> integer </span>
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

## Consent persistent steps

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="61" type="checkbox" id="_tab_61">
                <label class="tab-selector" for="_tab_61"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[[financial_services.consent.authorize_steps.persist]]
class = "org.wso2.financial.services.accelerator.consent.mgt.extensions.authorize.impl.DefaultConsentPersistStep"
priority = 1</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.authorize_steps.persist]</code>
                            <span class="badge-required">Required</span>
                            <p>
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
                                            <span class="param-default-value">Default: <code>org.wso2.financial.services.accelerator.consent.mgt.extensions.authorize.impl.DefaultConsentPersistStep</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configures a custom Consent Persistent Steps Manage components and their order.</p>
                                    </div>
                                </div>
                            </div><div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>priority</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> integer </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>1</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The steps are invoked based on the configured priority order.</p>
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

## Consent validation Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="58" type="checkbox" id="_tab_58">
                <label class="tab-selector" for="_tab_58"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[financial_services.consent.validation]
validator="org.wso2.financial.services.accelerator.consent.mgt.extensions.validate.impl.DefaultConsentValidator"
signature.alias="wso2carbon"
jwt.payload.enabled=true</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.validation]</code>
                            <span class="badge-required">Required</span>
                            <p>  
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>validator</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>org.wso2.financial.services.accelerator.consent.mgt.extensions.validate.impl.DefaultConsentValidator</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configures a custom Consent Validate component.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>signature.alias</code> </span>
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
                                        <p>Configures the certificate alias available in the truststore of the Identity Server. This should be the certificate that is used to sign the consent validate JWT, which is sent from the gateway.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>jwt.payload.enabled</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>e</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable the consent validation payload JWT signature validation. Needs to enable if the consent validation payload is sent as a signed payload.</p>
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

## Consent Expiration Periodical Job Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="58" type="checkbox" id="_tab_58">
                <label class="tab-selector" for="_tab_58"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[financial_services.consent.periodical_expiration]
enabled=true
cron_value="0 0 0 * * ?"
expired_consent_status_value="Expired"
eligible_statuses="authorised"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.periodical_expiration]</code>
                            <span class="badge-required">Required</span>
                            <p>  
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enabled</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> boolean </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>true</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Enable the consent expiration periodical job. This property needs to be true in order to run the consent expiration periodical updater.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>cron_value</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>"0 0 0 * * ?"</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Cron value for the periodical updater. "0 0 0 * * ?" cron will describe as 00:00:00am every day.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>expired_consent_status_value</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>Expired</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>This value to be update for expired consents.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>eligible_statuses</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>authorised</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>The current consent statuses that are eligible to be expired. (Comma separated value list).</p>
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

## Consent Selfcare Portal Client Credentials Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="58" type="checkbox" id="_tab_58">
                <label class="tab-selector" for="_tab_58"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[financial_services.consent.portal.client_credentials]
client_id=""
client_secret=""</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.portal.client_credentials]</code>
                            <span class="badge-required">Required</span>
                            <p>  
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>client_id</code> </span>
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
                                        <p>Add the client ID of the IS Application created to handle consent selfcare portal</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>client_secret</code> </span>
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
                                        <p>Add the client secret of the IS Application created to handle consent selfcare portal</p>
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

## Consent Selfcare Portal Parameter Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="58" type="checkbox" id="_tab_58">
                <label class="tab-selector" for="_tab_58"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[financial_services.consent.portal.params]
identity_server_base_url="https://localhost:9446"
application_name_param="client_name"
application_logo_uri_param="software_logo_uri"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.portal.params]</code>
                            <span class="badge-required">Required</span>
                            <p>  
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>identity_server_base_url</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>https://localhost:9446</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Base URL of the identity server</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>application_name_param</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>client_name</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Property key from the DCR Request to extract the application name to display in the portal </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>application_logo_uri_param</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>software_logo_uri</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Property key from the DCR Request to extract the application logo to display in the portal </p>
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

## Idempotency Validation Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="58" type="checkbox" id="_tab_58">
                <label class="tab-selector" for="_tab_58"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[financial_services.consent.idempotency]
enabled=false
allowed_time_duration=1440
header_name="x-idempotency-key"
allowed_for_all_apis=false
allowed_api_resources=["payment-consents"]</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.idempotency]</code>
                            <span class="badge-required">Required</span>
                            <p>  
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>enabled</code> </span>
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
                                    </div>
                                    <div class="param-description">
                                        <p>Change this tag value to true to enable idempotency validation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>allowed_time_duration</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> integer </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>1440</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Time duration where an idempotency key cannot be replayed.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>header_name</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>x-idempotency-key</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Key of the idempotency key value in the header</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>allowed_for_all_apis</code> </span>
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
                                    </div>
                                    <div class="param-description">
                                        <p>Change this value to true to apply idempotency validation for all APIs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>allowed_api_resources</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>["payment-consents"]</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>Configure the API resource paths that the idempotency validation should be applied</p>
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

## Consent Authorize JSP Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="58" type="checkbox" id="_tab_58">
                <label class="tab-selector" for="_tab_58"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[financial_services.consent.authorize_jsp]
path="fs_default.jsp"
</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.consent.authorize_jsp]</code>
                            <span class="badge-required">Required</span>
                            <p>  
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>path</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>fs_default.jsp</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>JSP File to be load in the consent authorize flow</p>
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

## Token Consent Binding Configuration

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="58" type="checkbox" id="_tab_58">
                <label class="tab-selector" for="_tab_58"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[financial_services.identity]
consent_id_claim_name="consent_id"
append_consent_id_to_token_id_token=false
append_consent_id_to_authz_id_token=true
append_consent_id_to_access_token=false
append_consent_id_to_token_introspect_response=false
</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.identity]</code>
                            <span class="badge-required">Required</span>
                            <p>  
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>consent_id_claim_name</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                            <span class="badge-required">Required</span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>consent_id</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>By default, the consent ID is available in the JWT token under the custom claim name;consent_id. To change the default claim name, use this  configuration.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>append_consent_id_to_token_id_token</code> </span>
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
                                    </div>
                                    <div class="param-description">
                                        <p>Configure whether to append the consent id to the id_token of the token response.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>append_consent_id_to_authz_id_token</code> </span>
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
                                    </div>
                                    <div class="param-description">
                                        <p>Configure whether to append the consent id to the id_token of the Authorization response.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>append_consent_id_to_access_token</code> </span>
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
                                    </div>
                                    <div class="param-description">
                                        <p>Configure whether to append the consent id to the JWT Access Token.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>append_consent_id_to_token_introspect_response</code> </span>
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
                                    </div>
                                    <div class="param-description">
                                        <p>Configure whether to append the consent id to the Introspection response.</p>
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

## Authentication web app configuration


<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="62" type="checkbox" id="_tab_62">
                <label class="tab-selector" for="_tab_62"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[financial_services.identity.authentication_webapp]
servlet_extension="org.wso2.financial.services.accelerator.consent.mgt.extensions.authservlet.impl.FSDefaultAuthServletImpl"</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.identity.authentication_webapp]</code>
                            <p>
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>servlet_extension</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> string </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>org.wso2.financial.services.accelerator.consent.mgt.extensions.authservlet.impl.FSDefaultAuthServletImpl</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>When you are customizing the layout of the consent page, use this to configure a custom implementation for FSAuthServletInterface. </p>
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

## HTTP connection pool

<div class="mb-config-catalog">
    <section>
        <div class="mb-config-options">
            <div class="superfences-tabs">
            <input name="66" type="checkbox" id="_tab_66">
                <label class="tab-selector" for="_tab_66"><i class="icon fa fa-code"></i></label>
                <div class="superfences-content">
                    <div class="mb-config-example">
<pre><code class="toml">[financial_services.http_connection_pool]
max_connections = 2000
max_connections_per_route = 1500</code></pre>
                    </div>
                </div>
                <div class="doc-wrapper">
                    <div class="mb-config">
                        <div class="config-wrap">
                            <code>[financial_services.http_connection_pool]</code>
                            <p>
                                Configure the maximum number of connections for the HTTP connection pool.
                            </p>
                        </div>
                        <div class="params-wrap">
                            <div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>max_connections</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> integer </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>2000</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>If not configured, the default value of 2000 will be used.</p>
                                    </div>
                                </div>
                            </div><div class="param">
                                <div class="param-name">
                                  <span class="param-name-wrap"> <code>max_connections_per_route</code> </span>
                                </div>
                                <div class="param-info">
                                    <div>
                                        <p>
                                            <span class="param-type string"> integer </span>
                                        </p>
                                        <div class="param-default">
                                            <span class="param-default-value">Default: <code>1500</code></span>
                                        </div>
                                    </div>
                                    <div class="param-description">
                                        <p>If not configured, the default value of 1500 will be used.</p>
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