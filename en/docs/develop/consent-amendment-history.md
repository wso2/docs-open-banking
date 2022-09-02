Any change that is performed on an active consent is considered as an amendment. WSO2 Open Banking provides 
the Consent Amendment History feature to retrieve details related to the amendments done to a consent. With this feature, 
you can achieve your open banking requirements related to consent amendment, which are specific to the relevant specification.

The [Asynchronous Event Executor Framework](https://ob.docs.wso2.com/en/latest/develop/custom-event-executor/#writing-a-custom-event-executor)
is utilized for the consent amendment history persistence. The following event executor is available in the 
accelerator to persist the consent amendment data to the database asynchronously:

```xml
com.wso2.openbanking.accelerator.consent.extensions.event.executors.ConsentAmendmentHistoryEventExecutor
```

!!! info
    This is only available as a WSO2 Update from **WSO2 Open Banking Identity Server Accelerator Level
    3.0.0.33** onwards. For more information on updating,
    see [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

Given below is a summary of details related to this feature:

### Consent Amendment History Retrieval Endpoint

This endpoint retrieves the consent amendment history when the consent ID is provided as a query parameter. The response includes the current consent and an array of consent history data objects.

```xml
GET https://<IS_HOST>:9446/api/openbanking/consent/admin/consent-amendment-history?consentId=<CONSENT-ID>
```

You can implement consent amendment history feature to handle data related to consent amendment history and generate toolkit-specific
representation for the data according to your open banking specification, by extending the following class:

```java
com.wso2.openbanking.accelerator.consent.extensions.admin.impl.DefaultConsentAdminHandler
```
You can override the `handleConsentAmendmentHistoryRetrieval` method to generate a representation of the consent history data which is specific to the relevant specification.

Given below is a brief explanation of the Consent Core Service methods you can use or override in your toolkits to achieve Consent Amendment and Consent Amendment History requirements according to the specification:

!!! note
    Following methods can be accessible from [Consent Core Service](../consent-core-service/).

### amendDetailedConsent method

This method amends an entire detailed consent with new values passed to the method. Given below is the method signature:

``` java
DetailedConsentResource amendDetailedConsent(
    String consentID,
    String consentReceipt,
    Long consentValidityTime,
    String authID,
    Map < String, ArrayList < String >> accountIDsMapWithPermissions,
    String newConsentStatus,
    Map < String, String > consentAttributes,
    String userID,
    Map < String, Object > additionalAmendmentData) throws ConsentManagementException;
```

Input parameters:

- `consentID`: consent ID of the consent that needs to be amended
- `consentReceipt`: new consent receipt
- `consentValidityTime`: new consent validity time
- `authID`: authorization ID of the user who invoked the amendment
- `accountIDsMapWithPermissions`: accounts IDs with relevant permissions
- `newConsentStatus`: new consent status
- `consentAttributes`: new consent attributes in a key value map
- `userID`: user ID of the user who invoked the amendment to create audit record
- `additionalAmendmentData`: a data map to pass any additional data that needs to be amended in the consent
    - Following 2 data attributes with the respective key values can be passed in `additionalAmendmentData`. However, if no additional data is available for the amendment, keep this map empty.
        1. Additional Authorization Resources
            - Key: user ID (for each Authorization Resource in the map)
            - Value: a map of Authorization Resources

        2. Additional Mapping Resources
            - Key: user ID (for each mapping resources List in the map)
            - Value: a map of mapping resources List

### storeConsentAmendmentHistory method

This method stores the details of the previous consent when a consent amendment happens. Given below is the method signature:

``` java
boolean storeConsentAmendmentHistory(
    String consentID,
    ConsentHistoryResource consentHistoryResource,
    DetailedConsentResource detailedCurrentConsent)
throws ConsentManagementException
```
Input parameters:

- `consentID`: consent ID of the consent. This is a mandatory parameter.
- `consentHistoryResource`: a model that includes the detailed consent resource and other history parameters (for example: amended Timestamp, reason caused the amendment) of the previous consent. This is a mandatory parameter.
- `currentConsentResource`: detailed consent resource of the existing consent. This is an optional parameter.

### getConsentAmendmentHistoryData method

This method retrieves the consent amendment history for a given consent. Given below is the method signature:

``` java
Map < String, ConsentHistoryResource > getConsentAmendmentHistoryData(
    String consentID)
throws ConsentManagementException
```
Input parameter:

- `consentID`: consent ID of the consent. This is a mandatory parameter.

### Data model

The following table explains the data model associated with `ConsentHistoryResource`.

??? tip "Click here to see the data model associated with `ConsentHistoryResource`."
            
    | Parameter      | Type   | Description  | 
    | ---------|-------| -----------|
    |consentID | String | The consent ID of the consent to which the history belongs |
    |timestamp | long | The timestamp that the amendment occurred|
    |reason | String | The reason caused the amendment on the consent |
    |detailedConsentResource | DetailedConsentResource | The detailed consent data of the consent which existed prior to the amendment |

### Configuring the Consent Amendment History feature

1. Once implemented, build a JAR file for the Consent Amendment History feature.

2. To configure the database tables related to the Consent Amendment History feature:

       1. Go to the `<IS_HOME>/carbon-home/dbscripts/open-banking/consent-history` directory.

       2. Execute the relevant script according to your database type against the `OB_CONSENT_HISTORY` database.

3. Place the above-created custom JAR file in the `<IS_HOME>/repository/components/lib` directory.

4. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

5. Locate the `[open_banking.consent.admin]` tag.

6. Configure the Consent Amendment History feature using the Fully Qualified Name (FQN) of the new class you wrote by extending `DefaultConsentAdminHandler`. For example:

    ```toml
    [open_banking.consent.admin]
    handler="com.wso2.openbanking.accelerator.consent.extensions.admin.impl.DefaultConsentAdminHandler"
    ```

7. Add the following configuration and set the `enabled` tag to `true`.

    ```toml
    [open_banking.consent.amendment_history]
    enabled=true
    ```

8. Configure the event executor with the required priority. For example:

    ```toml
    [[open_banking.event.event_executors]]
    name = "com.wso2.openbanking.accelerator.common.event.executor.DefaultOBEventExecutor"
    priority = 1

    [[open_banking.event.event_executors]]
    name = "com.wso2.openbanking.accelerator.consent.extensions.event.executors.ConsentAmendmentHistoryEventExecutor"
    priority = 2
    ```