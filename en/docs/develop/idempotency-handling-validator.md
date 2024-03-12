The idempotency validator is used to validate idempotency of the requests. Idempotency validator will be a part of the key manager and will used to validate the idempotency of the  consent related requests. If the same request is repeated within the configured allowed time, the response is returned from the key manager without calling the back end. 


!!! info
    This is only available as a WSO2 Update from **WSO2 Open Banking Identity Server Accelerator Level 3.0.0.48** and 
    **WSO2 Open Banking API Manager Accelerator Level 3.0.0.25** onwards. For more information on updating, see 
    [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

Idempotency Validator will use the Idempotency Key stored as a Consent Attribute to identify that the idempotency key has been replayed. Hence toolkit developers has to store idempotency key as a consent attrubute in order to this validation to work as expected.

To achieve the above, use the following method in Consent Core Service:
```java
boolean storeConsentAttributes(String consentID, Map<String, String> consentAttributes) throws ConsentManagementException;
```

Toolkit Developers can use the following method to validate idempotency:

```java
public static IdempotencyValidationResult validateIdempotency(String idempotencyKeyName, String idempotencyKeyValue, String request, String clientId)
```

This method will first check whether idempotency validation is enabled. Then it will check the follwoing,
- Idempotency key exists in the database 
- Payloads are similar
- The request is received within the allowed time

If either of the above condition is false, `validateIdempotency` method will throw a `ConsentManagementException` with an error message.

Input parameters

- `idempotencyKeyName` - Idempotency Key Name
- `idempotencyKeyValue` - Idempotency Key Value
- `request` - Request Payload
- `clientId` - Client ID from the request

`validateIdempotency` method will return `IdempotencyValidationResult` as the output after the validation. `IdempotencyValidationResult` contains following parameters.

| Field | Description |
| ------------- | ----------- |
| `isIdempotent` | boolean value specifying whether the idempotency key in replayed or not |
| `isValid` | boolean value specifying whether the idempotency validation result  |
| `consent` | Detailed Consent resource retrived from the database|
| `consentId` | Consent Id retrived from the database|


A sample open banking idempotency handling executor implementation is given below:

```java
/**
     * Method to check whether the request is a valid idempotent request.
     *
     * @param consentManageData  Consent Manage Data object
     * @return whether the request is idempotent
     */
    public static boolean isIdempotent(ConsentManageData consentManageData) {

        String idempotencyKeyName = ConsentExtensionConstants.IDEMPOTENCY_KEY;

        Object request = consentManageData.getPayload();
        try {
            IdempotencyValidationResult result = IdempotencyValidator.validateIdempotency(idempotencyKeyName,
                    consentManageData.getHeaders().get(ConsentExtensionConstants.X_IDEMPOTENCY_KEY),
                    request.toString(), consentManageData.getClientId());
            if (result.isIdempotent()) {
                // Idempotency key has been replayed
                if (result.isValid()) {
                    // Idempotency key has been replayed, Payloads are similar and request has been received
                    // within the allowed time hence return the response of the previous request
                    consentManageData.setResponsePayload(ConsentManageUtil.getInitiationResponse((JSONObject) request,
                            result.getConsent(), consentManageData, ConsentExtensionConstants.PAYMENTS));
                    consentManageData.setResponseStatus(ResponseStatus.CREATED);
                    return true;
                } else {
                    log.error(ErrorConstants.IDEMPOTENCY_KEY_FRAUDULENT);
                    throw new ConsentException("Idempotency check failed.");
                }
            }
        } catch (ConsentManagementException e) {
            log.error(ErrorConstants.IDEMPOTENCY_KEY_FRAUDULENT, e);
            throw new ConsentException("Idempotency check failed.", e);
        }

        return false;
    }
```

## Configuring Open Banking Idempotency Validation

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
3. Add the below configurations for open banking idempotency handling executor:

    ```toml
    [open_banking.consent.idempotency]
    enabled = true
    allowed_time_duration = 1440
    ```

    The following table explains the configurations used in open banking idempotency handling executor:
    
    | Configuration Name  	| Default Value     | Type 				| Description	                                                                                                                                                                            |
    | ------------	|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------	|
    | `open_banking.consent.idempotency.enabled` | `false`   | boolean | This enables the idempotency validator. Idempotency validation works only if this is set to `true`. Otherwise, the open banking idempotency validator will be disabled. |
    | `open_banking.consent.idempotency.allowed_time_duration` | `1440` | integer | The idempotency available time for the requests. This is checked in the `isRequestReceivedWithinAllowedTime` method.                                                                    |