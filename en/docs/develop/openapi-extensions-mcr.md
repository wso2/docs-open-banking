WSO2 Open Banking Accelerator support manual client registration(MCR) via DevPortal. Manual Client Regitration extension allows to provide a custom value to the client id of the application and store any additional attributes against the application.


!!! note
Make sure to refer  Developer guide for OpenAPI based extensions from [documentation](../develop/openapi-extensions-developer-guide-am.md)


## Application Creation

The OpenAPI extension for application creation  provides the extendibility to provide a custom value to the client id of the application and store any additional attributes against the application. The data setting from this extension point will be stored as client metadata

### OpenAPI Extensions
| OpenAPI Extension           | Description                                                                              | OpenAPI Definition                                                                                                                                |
|-----------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| pre-process-application-creation | handle pre validations & changes to the consumer application creation | [pre-process-application-creation/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Application/paths/~1pre-process-application-creation/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extensions.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "<BASE_URL_OF THE EXTENSION>"

allowed_extensions = [ "pre-process-application-creation" ]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
``` 

## Application Update

The OpenAPI extension for application update provides the extendibility to store any additional attributes against the application.. The data setting from this extension point will be stored as updated client metadata

### OpenAPI Extensions
| OpenAPI Extension         | Description                                                                              | OpenAPI Definition                                                                                                                                           |
|---------------------------|------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pre-process-application-update | handle pre validations & changes to the consumer application update | [pre-process-application-update/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Client/paths/~1pre-process-application-update/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extensions.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "<BASE_URL_OF THE EXTENSION>"

allowed_extensions = [ "pre-process-application-update" ]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
``` 
