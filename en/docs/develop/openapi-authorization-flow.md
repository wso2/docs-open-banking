This section covers the OpenAPI based extension provided for the user authorization flow.
!!! note
    Make sure to refer  Developer guide for OpenAPI based extensions from [documentation](../develop/openapi-extensions-developer-guide.md)


## Validate Authorize Request

The OpenAPI extension for validate client sending authorize API requests to ensure request parameters are according to  the way
allowed in the Open Banking  specificatio requirements.

### OpenAPI Extensions
| OpenAPI Extension              | Description                                                                                    | OpenAPI Definition                                                                                                                                            |
|--------------------------------|------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|
| validate-authorization-request | handle specification specific custom validations for the client sending /authorization request | [validate-authorization-request/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Authorize/operation/preUserAuthorization) |


### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extensions.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "<BASE_URL_OF THE EXTENSION>"

allowed_extensions = [ "validate_authorization_request" ]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
``` 