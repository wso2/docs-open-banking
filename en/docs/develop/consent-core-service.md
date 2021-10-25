## Using Consent Core Service

The consent management [extension points](consent-management-manage.md) can invoke the Consent core service. WSO2 Open 
Banking Accelerator handles consent creation, update, deletion, and any other consent related functionality using a 
service named `ConsentCoreService`. This is an interface, which you can simply invoke via any WSO2 Identity Server 
extension. The Fully Qualified Name (FQN) of `ConsentCoreService` is as follows:

``` java
com.wso2.openbanking.accelerator.consent.mgt.service.ConsentCoreService
```

!!! note
    The `com.wso2.openbanking.accelerator.consent.service-3.0.0.jar` JAR file inside the 
    `<IS_HOME>/repository/components/dropins` directory contains the Java implementation related to consent 
    management core services.
    
According to your requirements, invoke the relevant methods of this service. Given below is a brief description of each 
method.

### createAuthorizableConsent method

This method lets you create a consent by performing the following:

 - Stores any available consent attributes
 - Creates an audit record for the consent creation
 - If the `isImplicitAuth` parameter is set to `true`, creates an authorization resource
 - If a periodical job for consent expiration is enabled, in order to make a consent eligible for expiration,
    - Append the `ExpirationDateTime` UTC timestamp attribute to `consentResource.getConsentAttributes()`.
 
Given below is the method signature:

``` java
 DetailedConsentResource createAuthorizableConsent(ConsentResource consentResource,String userID,String authStatus,String authType,boolean isImplicitAuth) throws ConsentManagementException;
```

### createExclusiveConsent method

This method lets you create an exclusive consent by performing the following:

 - Updates existing consent statuses and deactivate their account mappings
 - Creates an audit record for the consent update
 - Creates a new authorizable consent
 - If a periodical job for consent expiration is enabled, in order to make a consent eligible for expiration,
    - Append the `ExpirationDateTime` UTC timestamp attribute to `consentResource.getConsentAttributes()`.

``` java
DetailedConsentResource createExclusiveConsent(ConsentResource consentResource, 
  String userID, String authStatus,
  String authType, String applicableExistingConsentsStatus,
  String newExistingConsentStatus, boolean isImplicitAuth)
throws ConsentManagementException;
```

### createConsentFile method

This method lets you create a consent file by performing the following:

- Validates the status of the consent a per the "applicableStatusToFileUpload" parameter
- Creates the consent file
- Updates the status of the consent
- Creates audit records for necessary consent updates

```
boolean createConsentFile(ConsentFile consentFileResource, String newConsentStatus, String userID, String applicableStatusToFileUpload) throws ConsentManagementException;
```

### revokeConsent method

This method lets you revoke a consent by performing the following: 

 - Retrieves the consent for status validation
 - Updates the existing status of the consent
 - Creates an audit record for the consent update
 - Updates the account mapping status as inactive

``` java
boolean revokeConsent(String consentID, String revokedConsentStatus) throws ConsentManagementException;
```

To revoke tokens related to a consent, invoke the method by setting the `shouldRevokeTokens` flag `true`.

``` java
boolean revokeConsent(String consentID, String revokedConsentStatus, String userID, boolean shouldRevokeTokens) throws ConsentManagementException;
```

### revokeExistingApplicableConsents method

This method lets you revoke existing consents for a given combination of `clientID`, `userID`, `consent type`, and 
`status` parameters. It also revokes any tokens related to the consents if the `shouldRevokeTokens` flag is set to `true`.

``` java
boolean revokeExistingApplicableConsents(String clientID, String userID, String consentType, String applicableStatusToRevoke, String revokedConsentStatus, boolean shouldRevokeTokens) throws ConsentManagementException;
```

### getConsent method

This method lets you retrieve a consent with or without its attributes by performing the following: 

- Retrieves the consent for status validation
- Optionally retrieves consent attributes according to the value of the withConsentAttributes flag
- Checks whether the retrieved consent involves a file
  
``` java
ConsentResource getConsent(String consentID, boolean withConsentAttributes) throws ConsentManagementException;
```
### storeConsentAttributes method

This method lets you store consent attributes related to a particular consent. 
  
``` java
boolean storeConsentAttributes(String consentID, Map<String, String> consentAttributes) throws ConsentManagementException
```

### getConsentAttributes method
    
This method lets you retrieve consent attributes related to a particular consent.
    
``` java
ConsentAttributes getConsentAttributes(String consentID) throws ConsentManagementException;
```
    
You can use the same method to retrieve consent attributes for a provided list of attribute keys related to a 
particular consent.

``` java
ConsentAttributes getConsentAttributes(String consentID, ArrayList<String> consentAttributeKeys) throws ConsentManagementException;
```

### getConsentAttributesByName method

This method lets you retrieve consent attributes for a provided attribute name.

``` java
Map<String, String> getConsentAttributesByName(String attributeName) throws ConsentManagementException;
```

### getConsentIdByConsentAttributeNameAndValue method

This method lets you retrieve the consent Id for a provided attribute name and attribute value.

``` java
ArrayList<String> getConsentIdByConsentAttributeNameAndValue(String attributeName, String attributeValue) throws ConsentManagementException;
```

### deleteConsentAttributes method

This method lets you delete a provided list of consent attributes for a particular consent.

``` java
boolean deleteConsentAttributes(String consentID, ArrayList<String> attributeKeysList) throws ConsentManagementException;
```

### getConsentFile method

This method lets you retrieve the consent file for a given consent.
  
``` java
ConsentFile getConsentFile(String consentID) throws ConsentManagementException;
```

### getAuthorizationResource method

This method lets you retrieve an authorization resource for a given authorization ID.
 
``` java
AuthorizationResource getAuthorizationResource(String authorizationID) throws ConsentManagementException;
```

### searchConsentStatusAuditRecords method
    
This method lets you search audit records. This is useful for auditing purposes and all input parameters are optional. 
 
!!! note
    If all parameters are null, all audit records are returned.
      
``` java
ArrayList<ConsentStatusAuditRecord> searchConsentStatusAuditRecords(String consentID, String status, String actionBy, Long fromTime, Long toTime, String statusAuditID) throws ConsentManagementException;
```

### reAuthorizeExistingAuthResource method

This method lets you update the account mappings in consent reauthorization scenarios. 

 - The account mappings are updated according to the additions/removals in the new authorization 
 - Updates the status of a consent with a provided status 
 - Amends accounts

``` java
boolean reAuthorizeExistingAuthResource(String consentID, String authID, String userID, Map<String, ArrayList<String>> accountIDsMapWithPermissions, String currentConsentStatus, String newConsentStatus) throws ConsentManagementException;
```
### reAuthorizeConsentWithNewAuthResource method

This method lets you update the account mappings in consent reauthorization scenarios. 

 - The account mappings are updated according to the additions/removals in the new authorization 
 - When reauthorizing with this method a new authorization resource is created
 - Existing authorizations are updated with a provided status
 - Updates the status of a consent with a provided status 
 - Amends accounts

``` java
boolean reAuthorizeConsentWithNewAuthResource(String consentID, String userID, Map<String, ArrayList<String>> accountIDsMapWithPermissions, String currentConsentStatus, String newConsentStatus, String newExistingAuthStatus, String newAuthStatus, String newAuthType) throws ConsentManagementException;
```
### getDetailedConsent method
 
This method lets you retrieve detailed consent for a given consent ID. A detailed consent includes the following in 
addition to consent resource-specific data: 

 - Relative consent authorization data
 - Relative consent account mapping data 
 - Relative consent attributes
 
``` java
DetailedConsentResource getDetailedConsent(String consentID) throws ConsentManagementException;
```

### createConsentAuthorization method
      
This method lets you create an authorization resource for a consent.
    
```java
AuthorizationResource createConsentAuthorization(AuthorizationResource authorizationResource) throws ConsentManagementException;
```

### createConsentAccountMappings method

This method lets you create account ID and permission mappings for a relevant authorized user. A permission map 
represents permissions related to each accountID.

``` java
ArrayList<ConsentMappingResource> createConsentAccountMappings(String authID, Map<String, ArrayList<String>> accountIDsMapWithPermissions) throws ConsentManagementException;
```

###deactivateAccountMappings method

This method lets you deactivate account bindings for provided account mapping IDs.

``` java
boolean deactivateAccountMappings(ArrayList<String> accountMappingIDs) throws ConsentManagementException;
```

### searchDetailedConsents method

This method lets you search detailed consents for given lists of parameters. These lists may contain any number of 
elements and the conjunctive results are returned. 

The following **optional lists** can be passed to retrieve detailed consents. 

!!! note
    If all the given lists are null, all consents related to other search parameters will be returned.

- A list of consent IDs
- A list of client IDs
- A list of consent types
- A list of consent statuses
- A list of user IDs

``` java
ArrayList<DetailedConsentResource> searchDetailedConsents(ArrayList<String> consentIDs, ArrayList<String> clientIDs, ArrayList<String> consentTypes, ArrayList<String> consentStatuses, ArrayList<String> userIDs, Long fromTime, Long toTime, Integer limit, Integer offset) throws ConsentManagementException;
```
### bindUserAccountsToConsent method

This method lets you bind a user and accounts to a consent. 

``` java
boolean bindUserAccountsToConsent(ConsentResource consentResource, String userID, String authID, Map<String, ArrayList<String>> accountIDsMapWithPermissions, String newAuthStatus, String newCurrentConsentStatus) throws ConsentManagementException;
```

Use the same method to bind users and accounts to consent while ignoring account permissions.

``` java
public boolean bindUserAccountsToConsent(ConsentResource consentResource, String userID, String authID, ArrayList<String> accountIDs, String newAuthStatus, String newCurrentConsentStatus) throws ConsentManagementException;
```

### searchAuthorizations method

This method lets you search authorization resources for a given input parameter. 

!!! note
    Both `consent ID` and `user ID` are optional parameters. If both are null, all authorization resources will be 
    returned.
 
``` java
ArrayList<AuthorizationResource> searchAuthorizations(String consentID, String userID) throws ConsentManagementException;
```

You can use the same method to search authorization resources for a given consent ID.

``` java
ArrayList<AuthorizationResource> searchAuthorizations(String consentID) throws ConsentManagementException;
```

### searchAuthorizationsForUser method

This method lets you search authorization resources for a given user ID.

``` java
ArrayList<AuthorizationResource> searchAuthorizationsForUser(String userID) throws ConsentManagementException;
```

### amendConsentData method

This method lets you amend the consent receipt or validity period. It is mandatory to provide the consent ID with 
either the consent receipt or validity period. When the consent is amended, an audit record is created to indicate that 
however the status of the consent won't be changed.

``` java
ConsentResource amendConsentData(String consentID, String consentReceipt, Long consentValidityTime, String userID) throws ConsentManagementException;
```

### updateConsentStatus method

This method lets you update the status of the consent for a given consent Id and user Id.

``` java
ConsentResource updateConsentStatus(String consentId, String newConsentStatus) throws ConsentManagementException;
```

