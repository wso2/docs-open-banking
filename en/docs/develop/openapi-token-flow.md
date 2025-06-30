This section covers the OpenAPI based accelerator extension provided for the OAuth2 token generation flow. 
!!! note
Make sure to refer  Developer guide for OpenAPI based extensions from [documentation](../develop/openapi-extensions-developer-guide.md)


## Issue Refresh Token

This OpenAPI extension implementation  determines if the generated oauth2 token has a refresh token or not according to  the Open Banking  specification requirements. 

### OpenAPI Extensions
| OpenAPI Extension   | Description                                                         | OpenAPI Definition                                                                                                                               |
|---------------------|---------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| issue-refresh-token | handle OAuth2 refresh token issuance according to the specification | [issue-refresh-token/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Token/paths/~1issue-refresh-token/post) |


### Configuration

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extensions.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "<BASE_URL_OF THE EXTENSION>"

allowed_extensions = [ "issue_refresh_token" ]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
``` 