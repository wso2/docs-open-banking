According to your open banking requirements, you can customize the capabilities of WSO2 Open Banking Accelerator. This
section explains how to get started with implementing customizations and implementing your own toolkit.

# Implementing Accelerator Extension Points in WSO2 Identity Server
### Implement your customizations

The OpenAPI for WSO2 OB IS Accelerators can be found from [here](../references/accelerator-extensions-api.md). You can generate the client according to your prefferred programming
language and implement the customizations in each of the extension points.
You can deploy the toolkit implementation in any preffered hosting option externally to WSO2 Identity Server.
The toolkit REST API implementation can be secured with Basic Authentication or OAuth2.
### Configure your customizations

Once you implement your customizations, you have to enable OpenAPI based extensions from the WSO2 Open Banking IS Accelerator.
Find the following configuration in the deployment.toml file which resides in <IS_HOME>/repository/conf folder and enable it to configure the external service extension.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "http://<hostname of external service>:<port of the external service>/api/reference-implementation/ob/uk"

allowed_extensions = ["pre_process_client_creation", "pre_process_client_update", "pre_process_client_retrieval", "pre_process_consent_creation",
"enrich_consent_creation_response", "pre_process_consent_retrieval", "pre_process_consent_bulk_retrieval",
"pre_process_consent_revoke", "populate_consent_authorize_screen", "persist_authorized_consent", "validate_consent_access",
"validate_refresh_token_issuance", "validate_authorization_request", "enrich_event_subscription_response",
"validate_event_creation", "validate_event_polling", "enrich_event_polling_response", "map_accelerator_error_response"]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
```

### Test your customizations

You can use specification compliance related testing cases toverify the Open Banking flows are working as expected with the implemented
customizations

