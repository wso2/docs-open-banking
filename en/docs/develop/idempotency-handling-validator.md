The idempotency validator is used to validate idempotency of the requests. It will be a part of the key manager and will used to validate the idempotency of the  consent related requests. If the same request is repeated within the configured allowed time, the response is returned from the key manager without calling the back end. 

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
public IdempotencyValidationResult validateIdempotency(ConsentManageData consentManageData) throws IdempotencyValidationException
```

This method will first check whether idempotency validation is enabled. Then it will check the follwoing,
- Idempotency key exists in the database 
- Payloads are similar
- The request is received within the allowed time

If either of the above condition is false, `validateIdempotency` method will throw a `ConsentManagementException` with an error message.

`validateIdempotency` method will return `IdempotencyValidationResult` as the output after the validation. `IdempotencyValidationResult` contains following parameters.

| Field | Description |
| ------------- | ----------- |
| `isIdempotent` | boolean value specifying whether the idempotency key in replayed or not |
| `isValid` | boolean value specifying whether the idempotent request is valid or not |
| `consent` | Detailed Consent resource retrieved from the database|
| `consentId` | Consent Id retrieved from the database|

Since there are different requirements in different regions, you can extend and override the following public methods in the `IdempotencyValidator` class and implement them according to your requirements.

 | Method Name  	| Parameter     | 	Return Type 	| Purpose of the Method  |
    | ------------	|----------|------------------------ |--------------------	|
    | `getIdempotencyAttributeName` | `String resourcePath`   | String | To get the Idempotency Attribute Name store in consent Attributes.|
    | `getIdempotencyHeaderName` | None | String | To get the Idempotency Header Name according to the request. |
    | `getCreatedTimeOfPreviousRequest` | `String resourcePath` , `String consentId` | String | To get created time fof the previous. |
    | `getPayloadOfPreviousRequest` | `String resourcePath` , `String consentId` | String | To get payload of the previous request. |
    | `isPayloadSimilar` | `ConsentManageData consentManageData`, `String consentReceipt` | boolean | To compare whether payloads are equal. |

A sample open banking idempotency validator implementation is given below:

```java
/**
 * Class to handle idempotency related operations.
 */
public class IdempotencyValidatorImpl extends IdempotencyValidator {

    private static final Log log = LogFactory.getLog(UKIdempotencyValidator.class);

    /**
     * Method to get the Idempotency Attribute Name store in consent Attributes.
     *
     * @param resourcePath     Resource Path
     * @return idempotency Attribute Name.
     */
    @Override
    public String getIdempotencyAttributeName(String resourcePath) {
        if (resourcePath.contains("/file")) {
            return "FileUploadIdempotencyKey";
        } else {
            return "IdempotencyKey";
        }
    }

    /**
     * Method to get the Idempotency Header Name according to the request.
     *
     * @return idempotency Header Name.
     */
    @Override
    public String getIdempotencyHeaderName() {
        return "x-idempotency-key";
    }


    /**
     * Method to get created time from the Detailed Consent Resource.
     *
     * @param resourcePath     Resource Path
     * @param consentId        ConsentId
     * @return Created Time.
     */
    @Override
    public long getCreatedTimeOfPreviousRequest(String resourcePath, String consentId) {
        DetailedConsentResource consentRequest = null;
        try {
            consentRequest = consentCoreService.getDetailedConsent(consentId);
        } catch (ConsentManagementException e) {
            log.error(IdempotencyConstants.CONSENT_RETRIEVAL_ERROR, e);
            return 0L;
        }
        if (consentRequest == null) {
            return 0L;
        }
        return consentRequest.getCreatedTime();
    }

    /**
     * Method to get payload from request.
     *
     * @param resourcePath     Resource Path
     * @param consentId        ConsentId
     * @return Map containing the payload.
     */
    @Override
    public String getPayloadOfPreviousRequest(String resourcePath, String consentId) {
            DetailedConsentResource consentRequest = null;
        try {
            consentRequest = consentCoreService.getDetailedConsent(consentId);
        } catch (ConsentManagementException e) {
            log.error(IdempotencyConstants.CONSENT_RETRIEVAL_ERROR, e);
            return null;
        }
        if (consentRequest == null) {
            return null;
        }
        return consentRequest.getReceipt();
    }

    /**
     * Method to compare whether payloads are equal.
     *
     * @param consentManageData   Consent Manage Data Object
     * @param consentReceipt      Payload received from database
     * @return   Whether payloads are equal
     */
    @Override
    public boolean isPayloadSimilar(ConsentManageData consentManageData, String consentReceipt) {

        if (payload == null || consentReceipt == null) {
            return false;
        }

        JsonNode expectedNode = new ObjectMapper().readTree(payload);
        JsonNode actualNode = new ObjectMapper().readTree(consentReceipt);
        return expectedNode.equals(actualNode);
    }
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