According to your open banking requirements, you can customize the capabilities of WSO2 Open Banking Accelerator. This
section explains how to get started with implementing customizations and implementing your own toolkit.

# Implementing Accelerator Extension Points in WSO2 API Manager
### Implement your customizations

The OpenAPI for WSO2 OB APIM Accelerators can be found from [here](../references/accelerator-extensions-api.md). You can generate the client according to your prefferred programming
language and implement the customizations in each of the extension points.
You can deploy the toolkit implementation in any preffered hosting option externally to WSO2 Identity Server.
The toolkit REST API implementation can be secured with Basic Authentication or OAuth2.
### Configure your customizations

Once you implement your customizations, you have to enable OpenAPI based extensions from the WSO2 Open Banking APIM Accelerator.
Find the following configuration in the deployment.toml file which resides in <APIM_HOME>/repository/conf folder and enable it to configure the external service extension.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "<base_url>"

allowed_extensions = ["pre-process-application-creation", "pre-process-application-update"]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
```

### Test your customizations

You can use specification compliance related testing cases toverify the Open Banking flows are working as expected with the implemented
customizations

