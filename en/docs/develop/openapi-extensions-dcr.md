# OpenAPI Extensions for DCR

WSO2 Open Banking Accelerator supports Dynamic Client Registration (DCR). The DCR endpoint is according to OAuth2 DCR and DCRM specifications and it supports accepting custom client metadata and storage for Open Banking specification requirements. To configure DCR to accept and validate such Open Banking specification-specific data in Client-related operations (create, retrieve, update), it provides a set of OpenAPI based extension points as explained below.


!!! note
    Make sure to refer to the Developer guide for OpenAPI-based extensions from the [documentation](../develop/openapi-extensions-developer-guide.md).


## Client Creation

The OpenAPI extension for dynamic client creation provides the extensibility to validate the incoming dynamic client registration request attributes and store custom client data according to Open Banking specification requirements. The data set from this extension point will be stored as client metadata.

### OpenAPI Extensions

| OpenAPI Extension           | Description                                                                              | OpenAPI Definition                                                                                                                                |
|-----------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| pre-process-client-creation | Handle specification-specific custom validations and set custom client data to be stored | [pre-process-client-creation/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Client/paths/~1pre-process-client-creation/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enable it as below. Make sure `allowed_extensions` contains the OpenAPI extensions mentioned in the above table.

    ``` toml
    [financial_services.extensions.endpoint]
    enabled = true
    base_url = "<BASE_URL_OF_THE_EXTENSION>"

    allowed_extensions = [ "pre_process_client_creation" ]

    [financial_services.extensions.endpoint.security]
    # supported types : Basic-Auth or OAuth2
    type = "Basic-Auth"
    username = ""
    password = ""
    ```

## Client Update

The OpenAPI extension for dynamic client update provides the extensibility to validate the incoming dynamic client update request attributes and store custom client data according to Open Banking specification requirements. The data set from this extension point will be stored as updated client metadata.

### OpenAPI Extensions

| OpenAPI Extension         | Description                                                                               | OpenAPI Definition                                                                                                                                           |
|---------------------------|-------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pre-process-client-update | Handle specification-specific custom validations and set custom client data to be updated | [pre-process-client-update/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Client/paths/~1pre-process-client-update/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enable it as below. Make sure `allowed_extensions` contains the OpenAPI extensions mentioned in the above table.

    ``` toml
    [financial_services.extensions.endpoint]
    enabled = true
    base_url = "<BASE_URL_OF_THE_EXTENSION>"

    allowed_extensions = [ "pre_process_client_update" ]

    [financial_services.extensions.endpoint.security]
    # supported types : Basic-Auth or OAuth2
    type = "Basic-Auth"
    username = ""
    password = ""
    ```

## Client Retrieval

The OpenAPI extension for dynamic client data retrieval provides the extensibility to validate the incoming dynamic client registration GET request attributes and send back a customized response according to Open Banking specification requirements. 

### OpenAPI Extensions

| OpenAPI Extension            | Description                                                                     | OpenAPI Definition                                                                                                                                                 |
|------------------------------|-----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pre-process-client-retrieval | Handle specification-specific custom validations and send back a custom response | [pre-process-client-retrieval/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Client/paths/~1pre-process-client-retrieval/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enable it as below. Make sure `allowed_extensions` contains the OpenAPI extensions mentioned in the above table.

    ``` toml
    [financial_services.extensions.endpoint]
    enabled = true
    base_url = "<BASE_URL_OF_THE_EXTENSION>"

    allowed_extensions = [ "pre_process_client_retrieval" ]

    [financial_services.extensions.endpoint.security]
    # supported types : Basic-Auth or OAuth2
    type = "Basic-Auth"
    username = ""
    password = ""
    ```
