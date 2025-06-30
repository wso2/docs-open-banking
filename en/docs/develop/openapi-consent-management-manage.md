WSO2 Open Banking IAM Accelerator v4.0.0 onwards support OpenAPI based extensions for consent management customizations.

Generally regional open banking specifications do have different flavors of request/response formats for consent management
endpoints which covers consent creation, update,retrieval and revoke.

At the accelerator level,it has identified possible customization points used for specification
compliances and those extension points can be implemented by specification compliance layer as a REST
API in preferred programming language and deploy externally to WSO2 Identity Server.

!!! note
    Make sure to refer  Developer guide for OpenAPI based extensions from [documentation](../develop/openapi-extensions-developer-guide.md)

### OpenAPI Extensions
| OpenAPI Extension                | Description                                                                       | OpenAPI Definition                                                                                                                                                       |
|----------------------------------|-----------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pre-process-consent-creation     | handle specification speicifc validations & obtain custom consent data to be stored. | [pre-process-consent-creation/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Consent/paths/~1pre-process-consent-creation/post)     |
| enrich-consent-creation-response | handle altering consent response according to specification.                      | [enrich-consent-creation-response/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Consent/paths/~1pre-process-consent-creation/post) |
| pre-process-consent-file-upload  | handle specification speicifc  validations related to consent file upload requests. | [pre-process-consent-file-upload/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Consent/paths/~1pre-process-consent-creation/post)  |
| enrich-consent-file-response     | handle altering consent file upload response                                      | [enrich-consent-file-response/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Consent/paths/~1pre-process-consent-creation/post)     |
| pre-process-consent-retrieval    | handle specification speicifc validations and alter consent retrieval response    | [pre-process-consent-retrieval/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Consent/paths/~1pre-process-consent-creation/post)    |
| validate-consent-file-retrieval  | handle specification speicifc validations for consent-file retrieval              | [validate-consent-file-retrieval/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Consent/paths/~1pre-process-consent-creation/post)  |
| pre-process-consent-revoke       | handle specification speicifc validations and alter consent retrieval response    | [pre-process-consent-revoke/post](https://ob.docs.wso2.com/en/latest/references/accelerator-extensions-api/#tag/Consent/paths/~1pre-process-consent-creation/post)       |

### Configuration 

To enable, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    
2. Locate the following tag and enabke it as below and make sure allowed_extensions contains above table mentioned OpenAPI extensions.

``` toml
[financial_services.extensions.endpoint]
enabled = true
base_url = "<BASE_URL_OF THE EXTENSION>"

allowed_extensions = [ "pre_process_consent_creation",
"enrich_consent_creation_response", "pre_process_consent_retrieval", "pre_process_consent_file_upload", "enrich-consent-file-response"
"pre_process_consent_revoke", validate-consent-file-retrieval  ]

[financial_services.extensions.endpoint.security]
# supported types : Basic-Auth or OAuth2
type = "Basic-Auth"
username = ""
password = ""
``` 
