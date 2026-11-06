---
title: "Identity Server Configuration Catalog"
---
# Configuration Catalog for Identity Server

The configuration model of WSO2 Identity Server is based on the `toml` format. The `<IS_HOME>/repository/conf/deployment.toml`
file is the single source used to configure and tune various features.

This document describes all the configuration parameters that are used in the Identity Server for WSO2 Open Banking.

## Instructions for use

> Select the configuration sections, parameters, and values that are required for your use and add them to the `.toml` file.





## Server


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="2" type="checkbox" id="_tab_2" />{" "}
                <label className="tab-selector" htmlFor="_tab_2"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[server]
hostname = "localhost"
node_ip = "127.0.0.1"
base_path = "https://$ref{server.hostname}:\${carbon.management.port}"
serverDetails = "WSO2 IS as KM 5.11.0"
mode = "single"
userAgent = "WSO2 IS as KM 5.11.0"
offset = 3`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[server]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"This includes configurations required for deploying an Identity Server node."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>hostname</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>"localhost"</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>{"\"localhost\",\"127.0.0.1\",\"<any-ip-address>\",\"<any-hostname>\""}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The hostname of the machine hosting the Identity Server instance.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"node_ip"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>127.0.0.1</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The IP address of the machine hosting the Identity Server instance.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"base_path"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"${carbon.protocol}://${carbon.host}:${carbon.management.port}"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Defines the base path URL to access the server.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>serverDetails</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>WSO2 IS as KM 5.11.0</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Description of the server.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>mode</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>single</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>single,ha</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Defines the type of deployment, whether it is a single node deployment or a High Availability (HA) cluster.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>userAgent</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>WSO2 IS as KM 5.11.0</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>offset</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> integer </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>3</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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



## Primary keystore


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="3" type="checkbox" id="_tab_3" />{" "}
                <label className="tab-selector" htmlFor="_tab_3"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[keystore.primary]
name = "wso2carbon.jks"
password = "wso2carbon"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[keystore.primary]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"Configurations related to the primary keystore."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>name</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>wso2carbon.jks</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The filename of the primary keystore.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>wso2carbon</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The password of the keystore file</p>
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="4" type="checkbox" id="_tab_4" />{" "}
                <label className="tab-selector" htmlFor="_tab_4"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[tenant_mgt]
enable_email_domain = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[tenant_mgt]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"Configurations related to tenant users."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"enable_email_domain"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="5" type="checkbox" id="_tab_5" />{" "}
                <label className="tab-selector" htmlFor="_tab_5"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[super_admin]
username = "admin@wso2.com"
password = "wso2123"
create_admin_account = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[super_admin]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"This includes the configurations related to the super admin user."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"admin@wso2.com"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The username of the super admin user.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>wso2123</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The password of the super admin user.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"create_admin_account"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="6" type="checkbox" id="_tab_6" />{" "}
                <label className="tab-selector" htmlFor="_tab_6"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[realm_manager]
data_source= "WSO2USER_DB"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[realm_manager]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"This includes the datasource configurations for the user management database."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"data_source"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"WSO2USER_DB"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="7" type="checkbox" id="_tab_7" />{" "}
                <label className="tab-selector" htmlFor="_tab_7"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[user_store]
type = "database_unique_id"
class = "org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager"
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[user_store]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"This includes the configurations related to the user store."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>type</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"database_unique_id"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>class</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>org.wso2.carbon.user.core.jdbc.UniqueIDJDBCUserStoreManager</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="8" type="checkbox" id="_tab_8" />{" "}
                <label className="tab-selector" htmlFor="_tab_8"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[user_store.properties]
UsernameJavaRegEx = "a-zA-Z0-9@._-{3,30}$"
UsernameJavaScriptRegEx = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,4}$"
SCIMEnabled = false
IsBulkImportSupported = false
LeadingOrTrailingSpaceAllowedInUserName = false
UsernameWithEmailJavaScriptRegEx = "^[\\\\S]{3,30}$"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[user_store.properties]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>UsernameJavaRegEx</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"a-zA-Z0-9@._-{3,30}$"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>A regular expression to validate usernames. By default, strings have a length of 5 to 30. Only non-empty characters are allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>UsernameJavaScriptRegEx</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The regular expression used by the front-end components for username validation.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>SCIMEnabled</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>This is to configure whether the user store is supported for SCIM provisioning.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>IsBulkImportSupported</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>This is to configure whether the user store is supported for bulk imports.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>LeadingOrTrailingSpaceAllowedInUserName</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>This is to configure whether the username can contain leading or trailing spaces.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>UsernameWithEmailJavaScriptRegEx</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"^[\\S]{3,30}$"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="9" type="checkbox" id="_tab_9" />{" "}
                <label className="tab-selector" htmlFor="_tab_9"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[authorization_manager]
class = "org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager"
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[authorization_manager]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"This includes the configurations related to the authorization manager."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>class</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>org.wso2.carbon.user.core.authorization.JDBCAuthorizationManager</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="10" type="checkbox" id="_tab_10" />{" "}
                <label className="tab-selector" htmlFor="_tab_10"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[authorization_manager.properties]
AdminRoleManagementPermissions = "/permission"
AuthorizationCacheEnabled = true
GetAllRolesOfUserEnabled = false`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[authorization_manager.properties]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>AdminRoleManagementPermissions</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>/permission</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Sets the registry path where the authorization information (role-based permissions) are stored. </p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>AuthorizationCacheEnabled</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>To enable authorization cache.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>GetAllRolesOfUserEnabled</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="11" type="checkbox" id="_tab_11" />{" "}
                <label className="tab-selector" htmlFor="_tab_11"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[database.shared_db]
url = "jdbc:mysql://localhost:3306/openbank_govdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[database.shared_db]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"Configurations related to the databases shared between nodes."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>url</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"jdbc:mysql://localhost:3306/openbank_govdb?autoReconnect=true&amp;useSSL=false"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>{"The database connection URL that your DBMS JDBC driver uses to connect to the openbank_govdb database."}</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The username used for the database connection</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The password used for the database connection</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>driver</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.mysql.jdbc.Driver</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="12" type="checkbox" id="_tab_12" />{" "}
                <label className="tab-selector" htmlFor="_tab_12"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[database.shared_db.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[database.shared_db.pool_options]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>maxActive</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>150</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>maxWait </code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>60000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>minIdle</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>5</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>testOnBorrow</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>validationQuery</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>SELECT 1</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>SELECT 1,SELECT 1 FROM DUAL</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database. For Oracle DBMS, use "SELECT 1 FROM DUAL".</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>validationInterval</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>30000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>defaultAutoCommit</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="13" type="checkbox" id="_tab_13" />{" "}
                <label className="tab-selector" htmlFor="_tab_13"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[database.identity_db]
url = "jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[database.identity_db]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>url</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"jdbc:mysql://localhost:3306/openbank_apimgtdb?autoReconnect=true&amp;useSSL=false"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>{"The database connection URL that your DBMS JDBC driver uses to connect to the openbank_apimgtdb database, which contains API Manager data."}</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The username used for the database connection</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The password used for the database connection</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>driver</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.mysql.jdbc.Driver</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="14" type="checkbox" id="_tab_14" />{" "}
                <label className="tab-selector" htmlFor="_tab_14"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[database.identity_db.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[database.identity_db.pool_options]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>maxActive</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>150</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>maxWait </code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>60000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>minIdle</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>5</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>testOnBorrow</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>validationQuery</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>SELECT 1</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>SELECT 1,SELECT 1 FROM DUAL</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database. For Oracle DBMS, use "SELECT 1 FROM DUAL".</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>validationInterval</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>30000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>defaultAutoCommit</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="15" type="checkbox" id="_tab_15" />{" "}
                <label className="tab-selector" htmlFor="_tab_15"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[database.config]
url = "jdbc:mysql://localhost:3306/openbank_iskm_configdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[database.config]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"Configurations related to the API Manager config registry database."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>url</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"jdbc:mysql://localhost:3306/openbank_am_configdb?autoReconnect=true&amp;useSSL=false"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>{"The database connection URL that your DBMS JDBC driver uses to connect to the openbank_am_configdb database."}</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The username used for the database connection</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The password used for the database connection</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>driver</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.mysql.jdbc.Driver</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="16" type="checkbox" id="_tab_16" />{" "}
                <label className="tab-selector" htmlFor="_tab_16"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[database.config.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[database.config.pool_options]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>maxActive</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>150</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>maxWait </code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>60000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>minIdle</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>5</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>testOnBorrow</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>validationQuery</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>SELECT 1</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>SELECT 1,SELECT 1 FROM DUAL</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database. For Oracle DBMS, use "SELECT 1 FROM DUAL".</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>validationInterval</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>30000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>defaultAutoCommit</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="17" type="checkbox" id="_tab_17" />{" "}
                <label className="tab-selector" htmlFor="_tab_17"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[database.user]
url = "jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&useSSL=false"
username = "root"
password = "root"
driver = "com.mysql.jdbc.Driver"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[database.user]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>url</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&amp;useSSL=false"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>{"The database connection URL that your DBMS JDBC driver uses to connect to the openbank_userdb database, which contains user management data."}</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The username used for the database connection</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The password used for the database connection</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>driver</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.mysql.jdbc.Driver</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="18" type="checkbox" id="_tab_18" />{" "}
                <label className="tab-selector" htmlFor="_tab_18"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[database.user.pool_options]
maxActive = "150"
maxWait = "60000"
minIdle ="5"
testOnBorrow = true
validationQuery="SELECT 1"
#Use below for oracle
#validationQuery="SELECT 1 FROM DUAL"
validationInterval="30000"
defaultAutoCommit=false`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[database.user.pool_options]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>maxActive</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>150</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>maxWait</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>60000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>minIdle</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>5</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>testOnBorrow</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>validationQuery</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>SELECT 1</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>SELECT 1,SELECT 1 FROM DUAL</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database. For Oracle DBMS, use "SELECT 1 FROM DUAL".</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>validationInterval</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>30000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>defaultAutoCommit</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="19" type="checkbox" id="_tab_19" />{" "}
                <label className="tab-selector" htmlFor="_tab_19"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[[datasource]]
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
pool_options.defaultAutoCommit=false`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[datasource]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"Configurations related to the user manager datasource."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>id</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"WSO2OB_DB"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The datasource used by the user manager.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>url</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"jdbc:mysql://localhost:3306/openbank_userdb?autoReconnect=true&amp;useSSL=false"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>{"The database connection URL that your DBMS JDBC driver uses to connect to the openbank_userdb database."}</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The username used for the database connection</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>root</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The password used for the database connection</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>driver</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.mysql.jdbc.Driver</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>com.mysql.jdbc.Driver, com.microsoft.sqlserver.jdbc.SQLServerDriver, oracle.jdbc.driver.OracleDriver, org.postgresql.Driver</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The name of the JDBC driver.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"jmx_enable"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Use this parameter to enable JMX for the database connection.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"pool_options.maxActive"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>150</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"pool_options.maxWait"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>60000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"pool_options.minIdle"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>5</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"pool_options.testOnBorrow"} </code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"pool_options.validationQuery"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>SELECT 1</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>SELECT 1,SELECT 1 FROM DUAL</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database. For Oracle DBMS, use "SELECT 1 FROM DUAL".</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"pool_options.validationInterval"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>30000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Tuning parameters. Change according to the preferred database.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"pool_options.defaultAutoCommit"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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



## Authentication endpoints


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="20" type="checkbox" id="_tab_20" />{" "}
                <label className="tab-selector" htmlFor="_tab_20"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[authentication.endpoints]
login_url = "https://localhost:9446/authenticationendpoint/login.do"
retry_url = "https://localhost:9446/authenticationendpoint/retry.do"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[authentication.endpoints]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"The URLs of the authentication web application."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"login_url"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"https://localhost:9446/authenticationendpoint/login.do"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"retry_url"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"https://localhost:9446/authenticationendpoint/retry.do"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="21" type="checkbox" id="_tab_21" />{" "}
                <label className="tab-selector" htmlFor="_tab_21"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[authentication.endpoint.redirect_params]
filter_policy = "include"
remove_on_consume_from_api = "true"
parameters = ["sessionDataKeyConsent","relyingParty", "authenticators", "authFailureMsg", "authFailure"]
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[authentication.endpoint.redirect_params]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"filter_policy"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>include</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code> </code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>When the action is set to include, the defined parameters will be sent to the authentication endpoint as a query parameter.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"remove_on_consume_from_api"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>parameters</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"[\"sessionDataKeyConsent\",\"relyingParty\", \"authenticators\", \"authFailureMsg\", \"authFailure\"]"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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



## OAuth endpoints


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="22" type="checkbox" id="_tab_22" />{" "}
                <label className="tab-selector" htmlFor="_tab_22"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[oauth.endpoints]
oauth2_consent_page = "\${carbon.protocol}://localhost:\${carbon.management.port}/ob/authenticationendpoint/oauth2_authz.do"
oidc_consent_page = "\${carbon.protocol}://localhost:\${carbon.management.port}/ob/authenticationendpoint/oauth2_consent.do"
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[oauth.endpoints]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"The OAuth endpoints for the Identity Server."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"oauth2_consent_page"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"${carbon.protocol}://localhost:${carbon.management.port}/ob/authenticationendpoint/oauth2_authz.do"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"oidc_consent_page"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"${carbon.protocol}://localhost:${carbon.management.port}/ob/authenticationendpoint/oauth2_consent.do"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="23" type="checkbox" id="_tab_23" />{" "}
                <label className="tab-selector" htmlFor="_tab_23"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[authentication.authenticator.sms_otp.parameters]
EnableAccountLockingForFailedAttempts = true
BackupCode = false
TokenExpiryTime = 60
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[authentication.authenticator.sms_otp.parameters]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>EnableAccountLockingForFailedAttempts</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>To enable account locking for each type of OTP attempt, set it to true.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>BackupCode</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>To set up backup codes.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>TokenExpiryTime</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>60</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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



## Custom Authenticator


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="24" type="checkbox" id="_tab_24" />{" "}
                <label className="tab-selector" htmlFor="_tab_24"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[[authentication.custom_authenticator]]
name = "IdentifierExecutor"
parameters.ValidateUsername = true
parameters.throttleLimit = 3
parameters.throttleTimePeriod = 300
parameters.authRequestURL = "https://localhost:9446/api/identity/auth/v1.1/data/AuthRequestKey/"
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[authentication.custom_authenticator]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>name</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>IdentifierExecutor</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The name of the custom authenticator.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>parameters.ValidateUsername</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want your username validated first, the value of this parameter should be changed to true.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>parameters.throttleLimit</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>3</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configure the throttle limit. </p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>parameters.throttleTimePeriod</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>300</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configure the time period for throttling. </p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>parameters.authRequestURL</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"https://localhost:9446/api/identity/auth/v1.1/data/AuthRequestKey/"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The authorization request URL.</p>
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



## Signing certificate configurations


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="25" type="checkbox" id="_tab_25" />{" "}
                <label className="tab-selector" htmlFor="_tab_25"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.identity]
signing_certificate_kid="123"
client_transport_cert_as_header_enabled = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.identity]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"signing_certificate_kid"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>123</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configure the key ID (kid) value for the signing certificate of the bank. The same value is configured as the kid of the ID Token.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"client_transport_cert_as_header_enabled"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>TRUE</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>To send the client certificate as a transport header, set this to true.</p>
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



## Consent ID claim


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="26" type="checkbox" id="_tab_26" />{" "}
                <label className="tab-selector" htmlFor="_tab_26"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.identity]
consent_id_claim_name="consent_id"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.identity]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"consent_id_claim_name"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"consent_id"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>{"By default, the consent ID is available in the JWT token under the custom claim name;consent_id. To change the default claim name, use this  configuration."}</p>
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



## Adaptive authentication event publisher


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="27" type="checkbox" id="_tab_27" />{" "}
                <label className="tab-selector" htmlFor="_tab_27"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[authentication.adaptive.event_publisher]
url = "http://localhost:8006/"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[authentication.adaptive.event_publisher]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>url</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"http://localhost:8006/"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configure the event publisher URL for adaptive authentication with the hostname of the Identity Server.</p>
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



## Data publishing configurations


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="28" type="checkbox" id="_tab_28" />{" "}
                <label className="tab-selector" htmlFor="_tab_28"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.data_publishing]
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
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.data_publishing]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"Configurations related to the data publishing in Identity Server."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>enable</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>FALSE</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>To enable the data publishing feature.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>username</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"$ref{super_admin.username}@carbon.super"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Credentials to access WSO2 Streaming Integrator.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>password</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"$ref{super_admin.password}"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Credentials to access WSO2 Streaming Integrator.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"server_url"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"{tcp://<SI_HOST>:7612}"}</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>{"{tcp://<SI_NODE_1_HOST>:7612, tcp://<SI_NODE_2_HOST>:7612, ...}"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The TCP port of Open Banking Business Intelligence Worker. If the setup mode is HA, configure TCP ports of all the nodes comma seperated.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"auth_url"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"{tcp://<SI_HOST>:7612}"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The SSL authentication URL of Open Banking Business Intelligence Worker. This is an optional configuration.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>protocol</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>Thrift</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>Thrift</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The protocol used to publish Open Banking data.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"pool_size"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>10</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Defines the maximum number of instances that can reside in the pool.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"queue_size"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>32768</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"worker_thread_count"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>10</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"pool_wait_time_Ms"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>60000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Defines the maximum waiting time to retrieve an instance from the pool.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"auth_data_publisher"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>{"{ssl://<SI_HOST>:7612}"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configures a custom data publishing class using its FQN.</p>
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



## Data publishing stream


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="29" type="checkbox" id="_tab_29" />{" "}
                <label className="tab-selector" htmlFor="_tab_29"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[[open_banking.data_publishing.thrift.stream]]
name="AuthenticationInputStream"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.data_publishing.thrift.stream]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>name</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>AuthenticationInputStream</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Define a stream for publishing data.</p>
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



## Data publishing attributes


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="30" type="checkbox" id="_tab_30" />{" "}
                <label className="tab-selector" htmlFor="_tab_30"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[[open_banking.data_publishing.thrift.stream.attributes]]
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
type="long"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.data_publishing.thrift.stream.attributes]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>name</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Define an attribute for publishing data.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>priority</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Define the priority for a data publishing attribute.</p>
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



## Regulatory issuer - DCR \{#regulatory-issuer-dcr\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="31" type="checkbox" id="_tab_31" />{" "}
                <label className="tab-selector" htmlFor="_tab_31"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[[open_banking.dcr.regulatory_issuers.iss]]
name = "OpenBanking Ltd"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.regulatory_issuers.iss]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>name</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configure the issuer (iss) of the SSA in the following tag. If not specified, the application is considered a non-regulatory application.</p>
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



## Dynamic Client Registrations (DCR) configurations


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="32" type="checkbox" id="_tab_32" />{" "}
                <label className="tab-selector" htmlFor="_tab_32"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr]
validator = "com.wso2.openbanking.accelerator.identity.dcr.validation.DefaultRegistrationValidatorImpl"
jwks_url_sandbox = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/9b5usDpbNtmxDcTzs7GzKp.jwks"
jwks_url_production = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/9b5usDpbNtmxDcTzs7GzKp.jwks"
applicationupdater = "com.wso2.openbanking.accelerator.identity.listener.application.ApplicationUpdaterImpl"
use_softwareIdForAppName = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"Configurations for Dynamic Client Registration."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>validator</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configure the issuer (iss) of the SSA in the following tag. If not specified, the application is considered a non-regulatory application. Configure your custom DCR validator here. By default, the DefaultRegistrationValidatorImpl class is configured as given here.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"jwks_url_sandbox"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.wso2.openbanking.accelerator.identity.dcr.validation.DefaultRegistrationValidatorImpl</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"jwks_url_production"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>The JWKS endpoints that are used for validating the SSA signature.</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>applicationupdater</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you have modified the Application Listener interface, for example, adding OAuth 2.0 properties or for data publishing requirements, the Application Listener invokes methods that are overridden from a class. Configure the following tag with the name of the class that is extended to do so.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"use_softwareIdForAppName"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>If you have modified the Application Listener interface, for example, adding OAuth 2.0 properties or for data publishing requirements, the Application Listener invokes methods that are overridden from a class. Configure the following tag with the name of the class that is extended to do so.</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Sets the software id as the name of the application. </p>
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



## JWKS retrieval connection timeout


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="33" type="checkbox" id="_tab_33" />{" "}
                <label className="tab-selector" htmlFor="_tab_33"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.jwks_retriever]
connection_timeout = 3000
read_timeout = 3000
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.jwks_retriever]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                                {"When retrieving the JSON web keys related to the API consumer application, the time-out values when connecting to the JWKS endpoint of the Open Banking directory."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"connection_timeout"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> integer </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>3000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p></p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"read_timeout"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> integer </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>3000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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



## DCR request - configure issuer parameter \{#dcr-request-configure-issuer-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="34" type="checkbox" id="_tab_34" />{" "}
                <label className="tab-selector" htmlFor="_tab_34"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.issuer]
allowed_values = ["value1, value2, value3”]
#required = false`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.issuer]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is a mandatory request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter optional, add this tag and set it to false. Otherwise, this is considered as a mandatory request parameter in the DCR request. </p>
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



## DCR request - configure audience parameter \{#dcr-request-configure-audience-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="35" type="checkbox" id="_tab_35" />{" "}
                <label className="tab-selector" htmlFor="_tab_35"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.audience]
allowed_values = ["value1, value2, value3”]
#required = false`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.audience]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is a mandatory request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter optional, add this tag and set it to false. Otherwise, this is considered as a mandatory request parameter in the DCR request. </p>
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



## DCR request - configure token_endpoint_authentication parameter \{#dcr-request-configure-token_endpoint_authentication-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="36" type="checkbox" id="_tab_36" />{" "}
                <label className="tab-selector" htmlFor="_tab_36"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.audience]
allowed_values = ["value1, value2, value3”]
#required = false`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.token_endpoint_authentication]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is a mandatory request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter optional, add this tag and set it to false. Otherwise, this is considered as a mandatory request parameter in the DCR request. </p>
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



## DCR request - configure id_token_signed_response_alg parameter \{#dcr-request-configure-id_token_signed_response_alg-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="37" type="checkbox" id="_tab_37" />{" "}
                <label className="tab-selector" htmlFor="_tab_37"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.id_token_signed_response_alg]
allowed_values = ["value1, value2, value3”]
#required = false`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.id_token_signed_response_alg]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is a mandatory request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter optional, add this tag and set it to false. Otherwise, this is considered as a mandatory request parameter in the DCR request. </p>
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



## DCR request - configure software_statement parameter \{#dcr-request-configure-software_statement-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="38" type="checkbox" id="_tab_38" />{" "}
                <label className="tab-selector" htmlFor="_tab_38"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.software_statement]
allowed_values = ["value1, value2, value3”]
#required = false`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.software_statement]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is a mandatory request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter optional, add this tag and set it to false. Otherwise, this is considered as a mandatory request parameter in the DCR request. </p>
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



## DCR request - configure grant_types parameter \{#dcr-request-configure-grant_types-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="39" type="checkbox" id="_tab_39" />{" "}
                <label className="tab-selector" htmlFor="_tab_39"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.grant_types]
allowed_values = ["value1, value2, value3”]
#required = false`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.grant_types]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is a mandatory request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter optional, add this tag and set it to false. Otherwise, this is considered as a mandatory request parameter in the DCR request. </p>
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



## DCR request - configure scope parameter \{#dcr-request-configure-scope-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="40" type="checkbox" id="_tab_40" />{" "}
                <label className="tab-selector" htmlFor="_tab_40"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.scope]
allowed_values = ["accounts", "payments"]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.scope]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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



## DCR request - configure application_type parameter \{#dcr-request-configure-application_type-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="41" type="checkbox" id="_tab_41" />{" "}
                <label className="tab-selector" htmlFor="_tab_41"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.application_type]
allowed_values = ["web"]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.application_type]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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



## DCR request - configure response_types parameter \{#dcr-request-configure-response_types-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="42" type="checkbox" id="_tab_42" />{" "}
                <label className="tab-selector" htmlFor="_tab_42"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.response_types]
allowed_values = ["value1, value2, value3”]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.response_types]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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



## DCR request - configure callback_uris parameter \{#dcr-request-configure-callback_uris-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="43" type="checkbox" id="_tab_43" />{" "}
                <label className="tab-selector" htmlFor="_tab_43"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.callback_uris]
allowed_values = ["value1, value2, value3”]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.callback_uris]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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



## DCR request - configure token_endpoint_auth_signing_alg parameter \{#dcr-request-configure-token_endpoint_auth_signing_alg-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="44" type="checkbox" id="_tab_44" />{" "}
                <label className="tab-selector" htmlFor="_tab_44"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.token_endpoint_auth_signing_alg]
allowed_values = ["value1, value2, value3”]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.token_endpoint_auth_signing_alg]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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



## DCR request - configure software_id parameter \{#dcr-request-configure-software_id-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="45" type="checkbox" id="_tab_45" />{" "}
                <label className="tab-selector" htmlFor="_tab_45"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.software_id]
allowed_values = ["value1, value2, value3”]
#required = true
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.software_id]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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



## DCR request - configure id_token_encryption_response_alg parameter \{#dcr-request-configure-id_token_encryption_response_alg-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="46" type="checkbox" id="_tab_46" />{" "}
                <label className="tab-selector" htmlFor="_tab_46"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.id_token_encryption_response_alg]
allowed_values = ["value1, value2, value3”]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.id_token_encryption_response_alg]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered an optional request parameter in the DCR request. </p>
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



## DCR request - configure id_token_encryption_response_enc parameter \{#dcr-request-configure-id_token_encryption_response_enc-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="47" type="checkbox" id="_tab_47" />{" "}
                <label className="tab-selector" htmlFor="_tab_47"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.id_token_encryption_response_enc]
allowed_values = ["value1, value2, value3”]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.id_token_encryption_response_enc]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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



## DCR request - configure request_object_signing_algorithm parameter \{#dcr-request-configure-request_object_signing_algorithm-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="48" type="checkbox" id="_tab_48" />{" "}
                <label className="tab-selector" htmlFor="_tab_48"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.request_object_signing_algorithm]
allowed_values = ["value1, value2, value3”]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.request_object_signing_algorithm]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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



## DCR request - configure tls_client_auth_subject_dn parameter \{#dcr-request-configure-tls_client_auth_subject_dn-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="49" type="checkbox" id="_tab_49" />{" "}
                <label className="tab-selector" htmlFor="_tab_49"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.tls_client_auth_subject_dn]
allowed_values = ["value1, value2, value3”]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.tls_client_auth_subject_dn]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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



## DCR request - configure backchannel_token_delivery_mode parameter \{#dcr-request-configure-backchannel_token_delivery_mode-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="50" type="checkbox" id="_tab_50" />{" "}
                <label className="tab-selector" htmlFor="_tab_50"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.backchannel_token_delivery_mode]
allowed_values = ["value1, value2, value3”]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.backchannel_token_delivery_mode]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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



## DCR request - configure backchannel_authentication_request_signing_alg parameter \{#dcr-request-configure-backchannel_authentication_request_signing_alg-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="51" type="checkbox" id="_tab_51" />{" "}
                <label className="tab-selector" htmlFor="_tab_51"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.backchannel_authentication_request_signing_alg g]
allowed_values = ["value1, value2, value3”]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.backchannel_authentication_request_signing_alg]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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



## DCR request - configure backchannel_client_notification_endpoint parameter \{#dcr-request-configure-backchannel_client_notification_endpoint-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="52" type="checkbox" id="_tab_52" />{" "}
                <label className="tab-selector" htmlFor="_tab_52"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.backchannel_client_notification_endpoint]
allowed_values = ["value1, value2, value3”]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.backchannel_client_notification_endpoint]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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



## DCR request - configure backchannel_user_code_parameter_supported parameter \{#dcr-request-configure-backchannel_user_code_parameter_supported-parameter\}


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="53" type="checkbox" id="_tab_53" />{" "}
                <label className="tab-selector" htmlFor="_tab_53"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.dcr.registration.backchannel_user_code_parameter_supported]
allowed_values = ["value1, value2, value3”]
#required = true`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.dcr.registration.backchannel_user_code_parameter_supported]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"allowed_values"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>According to your specification different types of values are allowed in the registration request. WSO2 Open Banking Accelerator provides the capability to configure the parameters and the values they allow. By default, this is an optional request parameter in the DCR registration request.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>required</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> boolean </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>true,false</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If you want to make this request parameter mandatory, add this tag and set it to true. Otherwise, this is considered  an optional request parameter in the DCR request. </p>
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="54" type="checkbox" id="_tab_54" />{" "}
                <label className="tab-selector" htmlFor="_tab_54"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.sca.primaryauth]
name = "IdentifierExecutor"
display = "ob-identifier-first"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.sca.primaryauth]"}</code>
                            <p>
                                {"Configures the primary authenticator."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>name</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>BasicAuthenticator,IdentifierExecutor</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The name of the primary authenticator to be engaged in the authentication flow.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>display</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>basic,ob-identifier-first</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="55" type="checkbox" id="_tab_55" />{" "}
                <label className="tab-selector" htmlFor="_tab_55"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`#[open_banking.sca.idp]
#name = "FacebookIdP"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.sca.idp]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>name</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configure the identity provider as the secondary authentication method. The example given here is for SMS OTP.</p>
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



## Signature validation algorithms


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="56" type="checkbox" id="_tab_56" />{" "}
                <label className="tab-selector" htmlFor="_tab_56"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[[open_banking.signature_validation.allowed_algorithms.algorithms]]
algorithm = "PS256"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.signature_validation.allowed_algorithms.algorithms]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>algorithm</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>PS256</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configure the algorithms that are allowed during signature validation. These algorithms are used for token endpoint authentication assertion signature, request object signature, and id token signature validations.</p>
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="57" type="checkbox" id="_tab_57" />{" "}
                <label className="tab-selector" htmlFor="_tab_57"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.consent.manage]
handler="com.wso2.openbanking.accelerator.consent.extensions.manage.impl.DefaultConsentManageHandler"
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.consent.manage]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>handler</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.wso2.openbanking.accelerator.consent.extensions.manage.impl.DefaultConsentManageHandler</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configures a custom Consent Manage component.</p>
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



## Consent validator


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="58" type="checkbox" id="_tab_58" />{" "}
                <label className="tab-selector" htmlFor="_tab_58"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.consent.validation]
validator="com.wso2.openbanking.accelerator.consent.extensions.validate.impl.DefaultConsentValidator"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.consent.validation]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>validator</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.wso2.openbanking.accelerator.consent.extensions.validate.impl.DefaultConsentValidator</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configures a custom Consent Validate component.</p>
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



## Consent validation signature


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="59" type="checkbox" id="_tab_59" />{" "}
                <label className="tab-selector" htmlFor="_tab_59"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.consent.validation.signature]
alias="wso2carbon"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.consent.validation.signature]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>alias</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>wso2carbon</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configures the certificate alias available in the truststore of the Identity Server. This should be the certificate that is used to sign the consent validate JWT, which is sent from the gateway.</p>
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



## Consent authorization steps


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="60" type="checkbox" id="_tab_60" />{" "}
                <label className="tab-selector" htmlFor="_tab_60"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[[open_banking.consent.authorize_steps.retrieve]]
class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.NonRegulatoryConsentStep"
priority = 1

[[open_banking.consent.authorize_steps.retrieve]]
class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.DefaultConsentRetrievalStep"
priority = 2`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.consent.authorize_steps.retrieve]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>class</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configures custom retrieval steps and their order. The steps are invoked based on the configured priority order. In the retrieval steps, there is a non-regulatory step configured as the priority order 1001. Make sure to configure any custom step before this step.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>priority</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> integer </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code></code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="61" type="checkbox" id="_tab_61" />{" "}
                <label className="tab-selector" htmlFor="_tab_61"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[[open_banking.consent.authorize_steps.persist]]
class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.DefaultConsentPersistStep"
priority = 1`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.consent.authorize_steps.persist]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>class</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.DefaultConsentPersistStep</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configures a custom Consent Persistent Steps Manage components and their order.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>priority</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> integer </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>1</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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



## Authentication web app configuration


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="62" type="checkbox" id="_tab_62" />{" "}
                <label className="tab-selector" htmlFor="_tab_62"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.identity.authentication_webapp]
servlet_extension = "com.wso2.openbanking.accelerator.authentication.webapp.impl.OBDefaultAuthServletImpl"
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.identity.authentication_webapp]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"servlet_extension"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.wso2.openbanking.accelerator.authentication.webapp.impl.OBDefaultAuthServletImpl</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>When you are customizing the layout of the consent page, use this to configure a custom implementation for OBAuthServletInterface. </p>
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



## Identity Server extensions


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="63" type="checkbox" id="_tab_63" />{" "}
                <label className="tab-selector" htmlFor="_tab_63"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.identity.extensions]
request_object_validator="com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.DefaultOBRequestObjectValidator"
claim_provider="com.wso2.openbanking.accelerator.identity.claims.OBDefaultClaimProvider"
response_type_handler="com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBResponseTypeHandler"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.identity.extensions]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"request_object_validator"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.DefaultOBRequestObjectValidator</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configures a custom request object validator using its Fully Qualified Name (FQN).</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"claim_provider"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.wso2.openbanking.accelerator.identity.claims.OBDefaultClaimProvider</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configures a custom claim provider using its Fully Qualified Name (FQN).</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"response_type_handler"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBResponseTypeHandler</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configures a custom response type handler using its Fully Qualified Name (FQN).</p>
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



## OAuth OIDC extensions


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="64" type="checkbox" id="_tab_64" />{" "}
                <label className="tab-selector" htmlFor="_tab_64"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[oauth.oidc.extensions]
id_token_builder = "com.wso2.openbanking.accelerator.identity.idtoken.OBIDTokenBuilder",
request_object_validator = "com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.OBRequestObjectValidationExtension"`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[oauth.oidc.extensions]"}</code>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"id_token_builder"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.wso2.openbanking.accelerator.identity.idtoken.OBIDTokenBuilder</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configures a custom ID Token Builder using its FQN.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"request_object_validator"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.OBRequestObjectValidationExtension</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>The extension for the request object validator.</p>
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



## Response types


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="65" type="checkbox" id="_tab_65" />{" "}
                <label className="tab-selector" htmlFor="_tab_65"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[[oauth.custom_response_type]]
name = "code"
class = "com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBCodeResponseTypeHandlerExtension"

[[oauth.custom_response_type]]
name = "code id_token"
class = "com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBHybridResponseTypeHandlerExtension"
`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[oauth.custom_response_type]"}</code>{" "}
                            <span className="badge-required">Required</span>
                            <p>
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>name</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>code</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>{"code,code id_token"}</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>Configures OIDC response types.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>class</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> string </span>{" "}
                                            <span className="badge-required">Required</span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBCodeResponseTypeHandlerExtension</code></span>
                                        </div>
                                        <div className="param-possible">
                                            <span className="param-possible-values">Possible Values: <code>com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBCodeResponseTypeHandlerExtension,com.wso2.openbanking.accelerator.identity.auth.extensions.response.handler.OBHybridResponseTypeHandlerExtension</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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

## HTTP connection pool


<div className="mb-config-catalog">
    <section>
        <div className="mb-config-options">
            <div className="superfences-tabs">
            <input name="66" type="checkbox" id="_tab_66" />{" "}
                <label className="tab-selector" htmlFor="_tab_66"><i className="icon fa fa-code"></i></label>
                <div className="superfences-content">
                    <div className="mb-config-example">
<pre><code className="toml">{`[open_banking.http_connection_pool]
max_connections = 2000
max_connections_per_route = 1500`}</code></pre>
                    </div>
                </div>
                <div className="doc-wrapper">
                    <div className="mb-config">
                        <div className="config-wrap">
                            <code>{"[open_banking.http_connection_pool]"}</code>
                            <p>
                                {"Configure the maximum number of connections for the HTTP connection pool."}
                            </p>
                        </div>
                        <div className="params-wrap">
                            <div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"max_connections"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> integer </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>2000</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
                                        <p>If not configured, the default value of 2000 will be used.</p>
                                    </div>
                                </div>
                            </div><div className="param">
                                <div className="param-name">
                                  <span className="param-name-wrap"> <code>{"max_connections_per_route"}</code> </span>
                                </div>
                                <div className="param-info">
                                    <div>
                                        <p>
                                            <span className="param-type string"> integer </span>
                                        </p>
                                        <div className="param-default">
                                            <span className="param-default-value">Default: <code>1500</code></span>
                                        </div>
                                    </div>
                                    <div className="param-description">
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
