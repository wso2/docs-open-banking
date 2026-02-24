# Built-in Validations in WSO2 Open Banking Consent Management

The WSO2 Open Banking Consent Management endpoints perform mandatory validations before invoking any OpenAPI-based extensions, ensuring that all required checks are completed upfront. This section provides a detailed overview of the validations included in each of the consent management endpoint workflows.

## Built-in Validations in Consent Manage Endpoint

### Consent Manage Create Endpoint

The following built-in validations are performed by the Consent Manage Create endpoint in WSO2 Open Banking before invoking OpenAPI extensions:

- `x-fapi-interaction-id` validation – Checks whether the request contains the `x-fapi-interaction-id` header. If absent, a new UUID is generated and added as `x-fapi-interaction-id` in the response headers.
- Client ID presence validation – Ensures that the client ID is included in the request.
- Client ID validity check – Verifies that the client ID in the request corresponds to a valid, existing client in the system.
- Request path validation – Confirms that the request path is not null.
- Idempotency validation – Ensures that the request is idempotent, preventing duplicate operations.

After performing the above validations, the Consent Manage Create endpoint invokes the `pre-process-consent-creation` OpenAPI extension to execute toolkit-specific validations.

### Consent Manage Retrieval Endpoint

The following built-in validations are performed by the Consent Manage Retrieval endpoint in WSO2 Open Banking before invoking OpenAPI extensions:

- `x-fapi-interaction-id` validation – Checks whether the request contains the `x-fapi-interaction-id` header. If absent, a new UUID is generated and added as `x-fapi-interaction-id` in the response headers.
- Client ID presence validation – Ensures that the client ID is included in the request.
- Client ID validity check – Verifies that the client ID in the request corresponds to a valid, existing client in the system.
- Request path validation – Confirms that the request path is not null.
- Consent ID validation – Extracts the consent ID from the request path and verifies whether it exists in the system.
- Consent-bound client ID validation – Ensures that the client ID in the request matches the client ID associated with the consent.

After performing the above validations, the Consent Manage Retrieval endpoint invokes the `pre-process-consent-retrieval` OpenAPI extension to execute toolkit-specific validations.

### Consent Manage Revoke Endpoint

The following built-in validations are performed by the Consent Manage Revoke endpoint in WSO2 Open Banking before invoking OpenAPI extensions:

- `x-fapi-interaction-id` validation – Checks whether the request contains the `x-fapi-interaction-id` header. If absent, a new UUID is generated and added as `x-fapi-interaction-id` in the response headers.
- Client ID presence validation – Ensures that the client ID is included in the request.
- Client ID validity check – Verifies that the client ID in the request corresponds to a valid, existing client in the system.
- Request path validation – Confirms that the request path is not null.
- Consent ID validation – Extracts the consent ID from the request path and verifies whether it exists in the system.
- Consent-bound client ID validation – Ensures that the client ID in the request matches the client ID associated with the consent.

After performing the above validations, the Consent Manage Revoke endpoint invokes the `pre-process-consent-revoke` OpenAPI extension to execute toolkit-specific validations.

### Consent Manage File Upload Endpoint

The following built-in validations are performed by the Consent Manage File Upload endpoint in WSO2 Open Banking before invoking OpenAPI extensions:

- `x-fapi-interaction-id` validation – Checks whether the request contains the `x-fapi-interaction-id` header. If absent, a new UUID is generated and added as `x-fapi-interaction-id` in the response headers.
- Client ID presence validation – Ensures that the client ID is included in the request.
- Client ID validity check – Verifies that the client ID in the request corresponds to a valid, existing client in the system.
- Request path validation – Confirms that the request path is not null.
- Consent ID validation – Extracts the consent ID from the request path and verifies whether it exists in the system.
- Consent-bound client ID validation – Ensures that the client ID in the request matches the client ID associated with the consent.
- Idempotency validation – Ensures that the request is idempotent, preventing duplicate operations.

After performing the above validations, the Consent Manage File Upload endpoint invokes the `pre-process-consent-file-upload` OpenAPI extension to execute toolkit-specific validations.

### Consent Manage File Retrieval Endpoint

The following built-in validations are performed by the Consent Manage File Retrieval endpoint in WSO2 Open Banking before invoking OpenAPI extensions:

- `x-fapi-interaction-id` validation – Checks whether the request contains the `x-fapi-interaction-id` header. If absent, a new UUID is generated and added as `x-fapi-interaction-id` in the response headers.
- Client ID presence validation – Ensures that the client ID is included in the request.
- Client ID validity check – Verifies that the client ID in the request corresponds to a valid, existing client in the system.
- Request path validation – Confirms that the request path is not null.
- Consent ID validation – Extracts the consent ID from the request path and verifies whether it exists in the system.
- Consent-bound client ID validation – Ensures that the client ID in the request matches the client ID associated with the consent.

After performing the above validations, the Consent Manage File Retrieval endpoint invokes the `pre-process-consent-file-retrieval` OpenAPI extension to execute toolkit-specific validations.

## Built-in Validations in Consent Validation Endpoint

The following built-in validations are performed by the Consent Validation endpoint in WSO2 Open Banking before invoking OpenAPI extensions:

- JWT request payload signature validation – Ensures the JWT request payload is correctly signed.
- Consent ID validation – Verifies that the consent ID bound to the token exists in the system.
- Consent payload validation – Confirms that the payload associated with the consent is not null and is a valid JSON object.
- User ID validation – Ensures that the user ID bound to the token matches the user ID in the consent associated with the token.
- Client ID validation – Ensures that the client ID bound to the token matches the client ID in the consent associated with the token.

After performing the above validations, the Consent Validation endpoint invokes the `validate-consent-access` OpenAPI extension to execute toolkit-specific validations.