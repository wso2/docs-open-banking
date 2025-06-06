WSO2 Open Banking Accelerator consists of endpoints to manage consents. You can customize relevant functionalities of these consent endpoints
according to your specification requirements using the OpenAPI  based extension points available. This section explains the 
Consent Authorize component and how to customize its functionalities.

!!! note
Make sure to refer  Developer guide for OpenAPI based extensions from [documentation](../develop/openapi-extensions-developer-guide.md)

The Consent Authorize extension point relates to the loading of the consent approval page and eventually persisting 
the consent provided by the users. This consists of 2 endpoints. 

## Populate Consent Authorization Screen

The OpenAPI extension for populate consent authorization screen provides the extendibility to validate and populate the consent grant screen with Open Banking
specification specific consent data and consumer data. The data setting from this extension point will be sent to the consent 
page to display to the user. 
!!! note 
    This information that is sent and displayed on the consent page depends on the specification that you adhere to. The default consent page in WSO2 Open Banking
accelerator do support showing consent data and accounts data binding to the permissions.

### OpenAPI Extensions
| OpenAPI Extension                 | Description                                                                                                                    | OpenAPI Definition                                                                                                                                       |
|-----------------------------------|--------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| populate-consent-authorize-screen | handle specification speicifc custom validations and set consent data and consumer data which need to show in consent grant UI | [populate-consent-authorize-screen/post](https://ob.docs.wso2.com/en/4.0.0/references/accelerator-extensions-api/#tag/Consent/paths/~1populate-consent-authorize-screen/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extensions.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "http://<hostname of external service>:<port of the external service>/api/reference-implementation/ob/uk"

allowed_extensions = [ "populate-consent-authorize-screen" ]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
``` 

## Persist

The second extension point of the Consent Authorize component is the Persist Flow. The Persistent functionality is engaged once the 
user approves/denies the consent via an API invocation made from the consent page. When the `/persist` endpoint is 
invoked, the OpenAPI extension implementation to persist are also invoked and the data required for persistence will be provided from the extension point. 

### OpenAPI Extensions
| OpenAPI Extension          | Description                              | OpenAPI Definition                                                                                                                                           |
|----------------------------|------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| persist-authorized-consent | handle user granted consent data storing | [persist-authorized-consent/post](https://ob.docs.wso2.com/en/4.0.0/references/accelerator-extensions-api/#tag/Consent/paths/~1persist-authorized-consent/post) |

### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extension.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "http://<hostname of external service>:<port of the external service>/api/reference-implementation/ob/uk"

allowed_extensions = ["persist_authorized_consent"]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
```
