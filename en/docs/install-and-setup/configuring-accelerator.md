# Configuring the Accelerator

WSO2 Open Banking Accelerator configurations are applied through the `deployment.toml` file of the Identity Server and 
the API Manager. Both configuration catalogs contain a large number of optional, feature-specific parameters in 
addition to the settings that **must** be configured for the accelerator to function correctly.

!!! tip
    - For the complete list of configurations, including optional and feature-specific parameters, see the 
    [Identity Server Configuration Catalog for open banking](../references/config-catalog-is.md) and the 
    [API Manager Configuration Catalog for open banking](../references/config-catalog-apim.md).
    - For a guided, step-by-step walkthrough of setting up the `deployment.toml` files, see 
    [Configuring Identity Server](configuring-identity-server-for-ob.md) and 
    [Configuring API Manager](configuring-api-manager-for-ob.md).

## Identity Server

Given below are some of the key configuration sections and parameters marked `Required` in the 
[Identity Server Configuration Catalog](../references/config-catalog-is.md).

### `[super_admin]`

Configurations related to the super admin user. We strongly recommend changing the default super admin credentials in production deployments.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `username` | string | `is_admin@wso2.com` | The username of the super admin user. |
| `password` | string | `wso2123` | The password of the super admin user. |

!!!Note
We recommend encrypting the plain-text secrets using the secure vault implementation 

### `[financial_services.consent.pre_initiated]` and `[financial_services.consent.scope_based]`

Configure the scopes for pre_initiated and scope_based flow below. If not configured, all scopes will be considered as pre initiated. If a scope is configured in both the configs it will be considered as a pre-initiated consent.

```
[financial_services.consent.pre_initiated]
scopes=["payments", "fundsconfirmations"]

[financial_services.consent.scope_based]
scopes=["accounts"]
```

### `[financial_services.consent.validation]`

Configures the consent validation component.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `jwt.payload.enabled` | boolean | `true` | Enables JWT signature validation of the consent validation payload. Required when the payload is sent as a signed payload. |
| `signature.alias` | string | `wso2carbon` | The certificate alias in the Identity Server truststore used to verify the signed consent-validate JWT sent from the gateway. |

### `[financial_services.consent.payments]`

Configures the paymnet flow.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `max_instructed_amount` | integer | `1000` | Maximum amount each payment can acoomadate | 

## API Manager

Given below are some of the key configuration sections and parameters marked `Required` in the 
[API Manager Configuration Catalog](../references/config-catalog-apim.md).

### `[super_admin]`

Configurations related to the super admin user. We strongly recommend changing the default super admin credentials in production deployments.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `username` | string | `am_admin@wso2.com` | The username of the super admin user. |
| `password` | string | `wso2123` | The password of the super admin user. |
| `create_admin_account` | boolean | `TRUE` | Creates a new user with the given super admin details. |

!!!Note
We recommend encrypting the plain-text secrets using the secure vault implementation 

### `[apim.oauth_config]`

Configurations related to OAuth.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `enable_outbound_auth_header` | boolean | `TRUE` | Sends the auth header to the backend as received from the client. |
| `white_listed_scopes` | string (array) | `["^device_.*", "openid", "^FS_.*", "^TIME_.*"]` | Scopes that skip role validation for API requests. |
