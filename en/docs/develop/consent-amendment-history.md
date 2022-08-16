Any change that is performed on an active consent is considered as an **amendment**. WSO2 Open Banking provides 
the Consent Amendment History feature to retrieve details related to the consent amendment history. You can utilize this 
feature in toolkits to achieve requirements related to consent amendment which are specific for the relevant specification.

The [Asynchronous Event Executor](https://ob.docs.wso2.com/en/latest/develop/custom-event-executor/#writing-a-custom-event-executor) 
is utilized for the consent amendment history persistence, and a dedicated event executor is available to persist this 
consent amendment data to the database asynchronously.

!!! info
    This is only available as a WSO2 Update from **WSO2 Open Banking Identity Server Accelerator Level
    3.0.0.33** onwards. For more information on updating,
    see [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

Given below is a summary of details related to this extension.

### Consent Amendment History Retrieval Endpoint

This endpoint retrieves the consent amendment history when the consent ID is provided as a query parameter. The response includes the current consent and an array of consent history data objects.

``` xml
GET https://<IS_HOST>:9446/api/openbanking/consent/admin/consent-amendment-history?consentId=<CONSENT-ID>
```

To enable consent amendmeqnt history feature, extend the following class:

```java
com.wso2.openbanking.accelerator.consent.extensions.admin.impl.DefaultConsentAdminHandler
```
Override the `handleConsentAmendmentHistoryRetrieval` method to generate a representation of the consent history data which is specific to the toolkit.

Given below is a brief explanation of the methods you need to implement:

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
- `accountIDsMapWithPermissions`: accounts IDs with relative permissions
- `newConsentStatus`: new consent status
- `consentAttributes`: new consent attributes key and values map
- `userID`: user ID of the user who invoked the amendment to create audit record
- `additionalAmendmentData`: a data map to pass any additional data that needs to be amended in the consent
    - Following 2 data attributes with the respective key values can be passed in `additionalAmendmentData`. However, if no additional data is available for the amendment, keep this map empty.
        1. Additional Authorization Resources
            - Value: a map of Authorization Resources
            - Key: user ID (for each Authorization Resource in the map)

        2. Additional Mapping Resources
            - Value: a map of mapping resources List 
            - Key: user ID (for each mapping resources List in the map)

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

- `consentID`: consent ID of the consent
- `consentHistoryResource`: a model that includes the detailed consent resource and other history parameters (eg: amended Timestamp, reason caused the amendment) of the previous consent
- `currentConsentResource`: detailed consent resource of the existing consent

!!!note
    Providing `consentID` and `consentHistoryResource` is mandatory, while providing `currentConsentResource` is optional.

### getConsentAmendmentHistoryData method

This method retrieves the consent amendment history for a given consent. Given below is the method signature:

``` java
Map < String, ConsentHistoryResource > getConsentAmendmentHistoryData(
    String consentID)
throws ConsentManagementException
```
Input parameter:

- `consentID`: consent ID of the consent

!!!note
    Providing `consentID` is mandatory.

### Data model

??? tip "Click here to see the data model associated with `ConsentHistoryResource`."
            
    | Parameter      | Type   | Description  | 
    | ---------|-------| -----------|
    |consentID | String | The consent ID of the consent to which the history belongs |
    |timestamp | long | The timestamp that the amendment occurred|
    |reason | String | The reason caused the amendment on the consent |
    |detailedConsentResource | DetailedConsentResource | The detailed consent data of the consent which existed prior to the amendment |

### Configuration

!!! tip "Prerequisites"
    Create the following database and execute the given scripts:

    - `ob_consent_history`
    - Sample table creation script is given below:
        
        ```tab="MySQL"
        CREATE TABLE IF NOT EXISTS OB_CONSENT_HISTORY (
            TABLE_ID VARCHAR(10) NOT NULL,
            RECORD_ID VARCHAR(255) NOT NULL,
            HISTORY_ID VARCHAR(255) NOT NULL,
            CHANGED_VALUES JSON NOT NULL,
            REASON VARCHAR(255) NOT NULL,
            EFFECTIVE_TIMESTAMP BIGINT NOT NULL,
            PRIMARY KEY (TABLE_ID,RECORD_ID,HISTORY_ID)
        )
        ENGINE INNODB;
        ```
       
        ```tab="MS SQL"
        CREATE TABLE OB_CONSENT_HISTORY (
            TABLE_ID VARCHAR(10) NOT NULL,
            RECORD_ID VARCHAR(255) NOT NULL,
            HISTORY_ID VARCHAR(255) NOT NULL,
            CHANGED_VALUES NVARCHAR(max) NOT NULL,
            REASON VARCHAR(255) NOT NULL,
            EFFECTIVE_TIMESTAMP BIGINT NOT NULL,
            PRIMARY KEY (TABLE_ID,RECORD_ID,HISTORY_ID)
        );
        ```

        ```tab="Oracle"
        CREATE TABLE OB_CONSENT_HISTORY (
            TABLE_ID VARCHAR(10) NOT NULL,
            RECORD_ID VARCHAR(255) NOT NULL,
            HISTORY_ID VARCHAR(255) NOT NULL,
            CHANGED_VALUES CLOB NOT NULL,
            REASON VARCHAR(255) NOT NULL,
            EFFECTIVE_TIMESTAMP NUMBER NOT NULL,
            PRIMARY KEY (TABLE_ID,RECORD_ID,HISTORY_ID)
        );
        ```
        
        ```tab="PostgreSQL"
        CREATE TABLE IF NOT EXISTS OB_CONSENT_HISTORY (
            TABLE_ID VARCHAR(10) NOT NULL,
            RECORD_ID VARCHAR(255) NOT NULL,
            HISTORY_ID VARCHAR(255) NOT NULL,
            CHANGED_VALUES JSON NOT NULL,
            REASON VARCHAR(255) NOT NULL,
            EFFECTIVE_TIMESTAMP BIGINT NOT NULL,
            PRIMARY KEY (TABLE_ID,RECORD_ID,HISTORY_ID)
        );
        ```

To configure the Consent Amendment History feature, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Enable the `[open_banking.consent.amendment_history]` tag.
```xml
[open_banking.consent.amendment_history]
enabled=true
```
3. Configure the event executor with the required priority. For example:
```xml
[[open_banking.event.event_executors]]
name = "com.wso2.openbanking.accelerator.common.event.executor.DefaultOBEventExecutor"
priority = 1

[[open_banking.event.event_executors]]
name = "com.wso2.openbanking.accelerator.consent.extensions.event.executors.ConsentAmendmentHistoryEventExecutor"
priority = 2
```