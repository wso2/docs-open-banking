# Configuring the Accelerator

WSO2 Open Banking Accelerator configurations are applied through the `deployment.toml` file of the Identity Server and 
the API Manager. Both configuration catalogs contain a large number of optional, feature-specific parameters in 
addition to the settings that **must** be configured for the accelerator to function correctly.

This page consolidates only the **Required** configurations, i.e., the configurations marked `Required` in the full 
configuration catalogs, into a single checklist you can use when setting up or reviewing an accelerator deployment.

!!! tip
    - For the complete list of configurations, including optional and feature-specific parameters, see the 
    [Identity Server Configuration Catalog for open banking](../references/config-catalog-is.md) and the 
    [API Manager Configuration Catalog for open banking](../references/config-catalog-apim.md).
    - For a guided, step-by-step walkthrough of setting up the `deployment.toml` files, see 
    [Configuring Identity Server](configuring-identity-server-for-ob.md) and 
    [Configuring API Manager](configuring-api-manager-for-ob.md).

## Identity Server

The following are the configuration sections and parameters marked `Required` in the 
[Identity Server Configuration Catalog](../references/config-catalog-is.md).

### `[server]`

Configurations required for deploying an Identity Server node.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `hostname` | string | `"localhost"` | The hostname of the machine hosting the Identity Server instance. |
| `node_ip` | string | `127.0.0.1` | The IP address of the machine hosting the Identity Server instance. |


### `[super_admin]`

Configurations related to the super admin user.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `username` | string | `admin@wso2.com` | The username of the super admin user. |
| `password` | string | `wso2123` | The password of the super admin user. |
| `create_admin_account` | boolean | `TRUE` | Creates a new user with the given super admin details. |

!!! note
    We strongly recommend changing the default super admin credentials in production deployments.

### `[open_banking.identity]` (signing certificate)

Configures the bank's signing certificate details used for token signing.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `signing_certificate_kid` | string | `123` | The key ID (`kid`) value for the bank's signing certificate; the same value is used as the `kid` of the ID token. |
| `client_transport_cert_as_header_enabled` | boolean | `TRUE` | Sends the client's mTLS transport certificate as a header. |

### `[open_banking.dcr.regulatory_issuers.iss]`

Configures the recognized regulatory SSA issuer(s) for Dynamic Client Registration (DCR).

| Parameter | Type | Default | Description |
|---|---|---|---|
| `name` | string | e.g. `"OpenBanking Ltd"` | The issuer (`iss`) of the SSA. If not specified, the application is treated as non-regulatory. |

### `[open_banking.dcr]`

Configurations related to Dynamic Client Registration.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `jwks_url_sandbox` | string | Sandbox JWKS endpoint URL | The JWKS endpoint used to validate the SSA signature in the sandbox environment. |
| `jwks_url_production` | string | Production JWKS endpoint URL | The JWKS endpoint used to validate the SSA signature in the production environment. |

### `[open_banking.consent.validation.signature]`

Configures the certificate used to verify the consent-validation JWT signature sent from the gateway.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `alias` | string | `wso2carbon` | The certificate alias in the Identity Server truststore used to verify the signed consent-validate JWT sent from the gateway. |

## API Manager

The following are the configuration sections and parameters marked `Required` in the 
[API Manager Configuration Catalog](../references/config-catalog-apim.md).

### `[server]`

Configurations required for deploying an API Manager server node.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `hostname` | string | `"localhost"` | The hostname of the machine hosting the API Manager instance. |
| `node_ip` | string | `127.0.0.1` | The IP address of the machine hosting the API Manager instance. |

### `[super_admin]`

Configurations related to the super admin user.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `username` | string | `admin@wso2.com` | The username of the super admin user. |
| `password` | string | `wso2123` | The password of the super admin user. |
| `create_admin_account` | boolean | `TRUE` | Creates a new user with the given super admin details. |

!!! note
    We strongly recommend changing the default super admin credentials in production deployments.

### `[apim.oauth_config]`

Contains OAuth-related configurations.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `enable_outbound_auth_header` | boolean | `TRUE` | If TRUE, forwards the auth header to the backend as received from the client. |
| `white_listed_scopes` | string (array) | `["^device_.*", "openid", "^OB_.*", "^TIME_.*"]` | Scopes exempt from role validation for API requests. |

### `[open_banking.gateway.consent.validation]`

Configures the Consent Validation service endpoint.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `endpoint` | string | `https://localhost:9446/api/openbanking/consent/validate` | The custom Consent Validation service endpoint. |

### `[open_banking.dcr]`

Configurations related to Dynamic Client Registration.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `token_endpoint` | string | `https://<APIM_HOST>:9443/oauth2/token` | The hostname of the API Manager server token endpoint. |
| `use_softwareIdForAppName` | boolean | `TRUE` | Uses the `software_id` as the name of the application. |

### `[open_banking.dcr.regulatory_api]`

Configures the regulatory APIs that DCR applications should be subscribed to.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `api_name` | string | `CDR-DynamicClientRegistration` | The regulatory API name to subscribe DCR applications to. |
| `roles` | string | `AISP,PISP` | The SSA roles that the API consumer application will play. |

### `[open_banking.gateway.certificate_management.certificate]`

Certificate management configuration.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `cache_expiry` | integer | `3600` | The cache expiry time (in seconds) for certificate data. |

### `[open_banking.gateway.certificate_management.certificate.revocation]`

Configurations related to certificate revocation validation.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `enabled` | boolean | `TRUE` | Enables certificate revocation validation. |
