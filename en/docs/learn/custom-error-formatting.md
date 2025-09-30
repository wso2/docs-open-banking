The [customErrorFormatter.xml](https://github.com/wso2/financial-services-apim-mediation-policies/blob/main/common/custom-error-formatter/customErrorFormatter.xml) file  is used to format error responses in a consistent JSON structure. This sequence processes error properties set by various policies and generates a standardized error response.

## Configuration Steps

### 1. Update the APIM Configuration
To ensure the sequence file is not removed during runtime synchronization, add the following configuration to the APIM `deployment.toml` file:

```toml
[apim.sync_runtime_artifacts.gateway]
skip_list.sequences = ["customErrorFormatter.xml"]
```

### 2. Modify the `_cors_request_handler_.xml` File
Add the following line before the closing `</sequence>` tag in the `_cors_request_handler_.xml` file located at `<APIM_HOME>/repository/deployment/server/synapse-configs/default/sequences/_cors_request_handler_.xml`:

```xml
<sequence key="customErrorFormatter"/>
```

### 3. Deploy the `customErrorFormatter.xml` File
Place the `customErrorFormatter.xml` file in the following location:

```
<APIM_HOME>/repository/deployment/server/synapse-configs/default/sequences
```

## Error Variables

The following variables are used in the `customErrorFormatter.xml` file to construct the error response. These variables should be set in the message context by the policies:

- **ERROR_CODE**: The textual representation of HTTP status codes.  
  Example: `401 = "Unauthorized"`

- **ERROR_TITLE**: Indicates the policy that returned the error.  
  Example: `"MTLS Enforcement Error"` if the error is returned from the MTLS enforcement policy.

- **ERROR_DESCRIPTION**: A descriptive message about the error.

### Note
- Ensure that these variables are set in any custom policies you define.
- To send a custom HTTP status code to the client, set the message context property `CUSTOM_HTTP_SC` to the required status code. Eg: `401`.
- To understand the error codes sent by vanilla WSO2 API Manager have a look at this documentation: [APIM Error Codes](https://apim.docs.wso2.com/en/latest/troubleshooting/error-handling/).
