# OpenAPI Extensions for Consent Authorization

WSO2 Open Banking Accelerator consists of endpoints to manage consents. You can customize relevant functionalities of these consent endpoints according to your specification requirements using the OpenAPI based extension points available. This section explains the Consent Authorize component and how to customize its functionalities.

!!! note
    Make sure to refer to the Developer guide for OpenAPI based extensions from the [documentation](../develop/openapi-extensions-developer-guide.md).

The Consent Authorize extension point relates to the loading of the consent approval page and eventually persisting the consent provided by the users. This consists of 2 endpoints. 

## Populate Consent Authorization Screen

The OpenAPI extension for populating the consent authorization screen provides the extensibility to validate and populate the consent grant screen with Open Banking specification-specific consent data and consumer data. The data set from this extension point will be sent to the consent page to display to the user.

!!! note
    This information that is sent and displayed on the consent page depends on the specification that you adhere to. The default consent page in WSO2 Open Banking Accelerator supports showing consent data and accounts data binding to the permissions.

### OpenAPI Extensions

| OpenAPI Extension                 | Description                                                                                                                      | OpenAPI Definition                                                                                                                                                             |
|-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| populate-consent-authorize-screen | Handle specification-specific custom validations and set consent data and consumer data which need to show in consent grant UI | [populate-consent-authorize-screen/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Consent/paths/~1populate-consent-authorize-screen/post) |

### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enable it as below. Make sure `allowed_extensions` contains the OpenAPI extensions mentioned in the above table.

    ``` toml
    [financial_services.extensions.endpoint]
    enabled = true
    base_url = "<BASE_URL_OF_THE_EXTENSION>"
    allowed_extensions = [ "populate-consent-authorize-screen" ]

    [financial_services.extensions.endpoint.security]
    # supported types : Basic-Auth or OAuth2
    type = "Basic-Auth"
    username = ""
    password = ""
    ``` 

## Persist

The second extension point of the Consent Authorize component is the Persist Flow. The Persistent functionality is engaged once the user approves/denies the consent via an API invocation made from the consent page. When the `/persist` endpoint is invoked, the OpenAPI extension implementation to persist is also invoked and the data required for persistence will be provided from the extension point. 

### OpenAPI Extensions

| OpenAPI Extension          | Description                                | OpenAPI Definition                                                                                                                                               |
|----------------------------|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| persist-authorized-consent | Handle user-granted consent data storage | [persist-authorized-consent/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Consent/paths/~1persist-authorized-consent/post) |

### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enable it as below. Make sure `allowed_extensions` contains the OpenAPI extension mentioned in the above table.

    ``` toml
    [financial_services.extensions.endpoint]
    enabled = true
    base_url = "<BASE_URL_OF_THE_EXTENSION>"
    allowed_extensions = ["persist_authorized_consent"]

    [financial_services.extensions.endpoint.security]
    # supported types : Basic-Auth or OAuth2
    type = "Basic-Auth"
    username = ""
    password = ""
    ```
