The Event Creation API allows storing event notification information as a JSON, which can be customized according to your use case.

!!! note
    Make sure to refer  Developer guide for OpenAPI based extensions from [documentation](../develop/openapi-extensions-developer-guide.md)

The OpenAPI extension for event subscription provides the extendibility to validate the incoming event creation request.

### OpenAPI Extensions
| OpenAPI Extension           | Description                                                                              | OpenAPI Definition                                                                                                                                |
|-----------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| validate-event-creation | handle event creation validations | [validate-event-creation/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Event-Creation/paths/~1validate-event-creation/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extensions.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "<BASE_URL_OF THE EXTENSION>"

allowed_extensions = [ "validate-event-creation" ]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
``` 