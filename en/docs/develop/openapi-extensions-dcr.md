WSO2 Open Banking Accelerator support dynamic client registration(DCR) .The DCR endpoint is according to OAuth2 DCR and DCRM specifications and it supports accepting
custom client metadata and store for Open Banking specification requirements. To configure DCR to accept and validate such Open Banking
specification specific data in Client related operations (create ,read,update), it has provided set of OpenAPI based extension points as explained below.


!!! note
Make sure to refer  Developer guide for OpenAPI based extensions from [documentation](../develop/openapi-extensions-developer-guide.md)


## Client Creation

The OpenAPI extension for dynamic client creation  provides the extendibility to validate the incoming dynamic client registration request attributes and store custom client data according to Open Banking
specificatio requirements. The data setting from this extension point will be stored as client metadata

### OpenAPI Extensions
| OpenAPI Extension           | Description                                                                              | OpenAPI Definition                                                                                                                                |
|-----------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| pre-process-client-creation | handle specification speicifc custom validations and set custom client data to be stored | [preprocess-client-creation/post](https://ob.docs.wso2.com/en/4.0.0/references/accelerator-extensions-api/#tag/Client/paths/~1pre-process-client-creation/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extensions.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "http://<hostname of external service>:<port of the external service>/api/reference-implementation/ob/uk"

allowed_extensions = [ "pre_process_client_creation" ]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
``` 

## Client Update

The OpenAPI extension for dynamic client update  provides the extendibility to validate the incoming dynamic client update request attributes and store custom client data according to Open Banking
specificatio requirements. The data setting from this extension point will be stored as updated client metadata

### OpenAPI Extensions
| OpenAPI Extension         | Description                                                                              | OpenAPI Definition                                                                                                                                          |
|---------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pre-process-client-update | handle specification speicifc custom validations and set custom client data to be update | [preprocess-client-update/post](https://ob.docs.wso2.com/en/4.0.0/references/accelerator-extensions-api/#tag/Client/paths/~1pre-process-client-update/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extensions.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "http://<hostname of external service>:<port of the external service>/api/reference-implementation/ob/uk"

allowed_extensions = [ "pre_process_client_update" ]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
``` 
## Client Retrieval

The OpenAPI extension for dynamic client data retrieval  provides the extendibility to validate the incoming dynamic client registration GET request attributes and send back a customized response according to Open Banking
specificatio requirements. 

### OpenAPI Extensions
| OpenAPI Extension            | Description                                                                     | OpenAPI Definition                                                                                                                                                |
|------------------------------|---------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pre-process-client-retrieval | handle specification speicifc custom validations and set back a custom response | [preprocess-client-retrieval/post](https://ob.docs.wso2.com/en/4.0.0/references/accelerator-extensions-api/#tag/Client/paths/~1pre-process-client-retrieval/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extensions.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "http://<hostname of external service>:<port of the external service>/api/reference-implementation/ob/uk"

allowed_extensions = [ "pre_process_client_retrieval" ]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
``` 