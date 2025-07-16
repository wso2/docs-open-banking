Open Banking Specifications require banks to notify any changes related to consent to the Third Party Application Provider (TPP). To achieve this, the specifications includes an API called the Event Notification API, including the flows and common functionality to allow a TPP to receive event notifications. 

In order to receive event notifications, TPPs has to register themselves using Event Subscription API. Event Subscription API allows TPPS to subscribe to a set of event types providng a redirect URL optionally.

!!! note
    Make sure to refer  Developer guide for OpenAPI based extensions from [documentation](../develop/openapi-extensions-developer-guide.md)

The OpenAPI extension for event subscription provides the extendibility to validate the incoming event subscription request attributes, return any attributes to store and construct the response payload according to custom requirements.

### OpenAPI Extensions
| OpenAPI Extension           | Description                                                                              | OpenAPI Definition                                                                                                                                |
|-----------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| validate-event-subscription | handle event subscription validations & storing data | [validate-event-subscription/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Event-Subscription/paths/~1validate-event-subscription/post) |
| enrich-event-subscription-response | handle post event-subscription-creation response generation | [enrich-event-subscription-response/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Event-Subscription/paths/~1enrich-event-subscription-response/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extensions.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "<BASE_URL_OF THE EXTENSION>"

allowed_extensions = [ "validate-event-subscription", "enrich-event-subscription-response" ]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
``` 