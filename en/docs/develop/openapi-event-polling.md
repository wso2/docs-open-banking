The Event Polling API facilitates storing and retrieving event notifications according to the above specifications without altering the information in the event information JSON.

!!! note
    Make sure to refer  Developer guide for OpenAPI based extensions from [documentation](../develop/openapi-extensions-developer-guide.md)

The OpenAPI extension for event polling provides the extendibility to validate the incoming event polling request attributes and construct the response payload according to custom requirements. 

### OpenAPI Extensions
| OpenAPI Extension           | Description                                                                              | OpenAPI Definition                                                                                                                                |
|-----------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| validate-event-polling | handle event polling validations & storing data | [validate-event-polling/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Event-Polling/paths/~1validate-event-polling/post) |
| enrich-event-polling-response | handle post event-polling response generation | [enrich-event-polling-response/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Event-Polling/paths/~1enrich-event-polling-response/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extensions.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "<BASE_URL_OF THE EXTENSION>"

allowed_extensions = [ "validate-event-polling", "enrich-event-polling-response" ]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
``` 