During the [consent authorization process](../learn/consent-authorization-intro.md), an API consumer requests the banking 
information that the API consumer application needs to access. Then, the bank redirects the bank user to a webpage where 
it displays the banking information that the API consumer application needs to access. This is known as the **Consent Grant Page**. 
WSO2 Open Banking Accelerator contains a default consent page, which can be customized to display consent details according 
to your requirements. The following topics explain the page structure and extension points where you can customize the consent page furthermore.

## Customizing the layout of the consent grant screen

The [Populate Consent Authorization Screen extension](../develop/openapi-consent-management-authorize.md) provides the flexibility to customize the consent grant screen in alignment with the UX guidelines defined by Open Banking specifications. Based on the response payload returned by this extension, the Accelerator dynamically adjusts the layout of the consent grant screen. This section explains the different consent screen layouts that correspond to various response configurations.

??? tip "Click here to see the response of the Populate Consent Authorization Screen extension."
    ```
    {
        "data": {
            "consentData": {
            "type": "accounts",
            "basicConsentData": {
                "titleOne": [
                "descriptionPointOne",
                "descriptionPointTwo"
                ],
                "titleTwo": "paragraphDescription"
            },
            "permissions": [
                {
                "uid": "permission-uid",
                "displayValues": [
                    "permissionOne",
                    "permissionTwo"
                ],
                "initiatedAccounts": [
                    {
                    "displayName": "accountOne",
                    "accountId": "1234"
                    },
                    {
                    "displayName": "accountTwo",
                    "accountId": "5678"
                    }
                ]
                }
            ],
            "initiatedAccountsForConsent": [
                {
                "displayName": "accountOne",
                "accountId": "1234"
                }
            ],
            "allowMultipleAccounts": true,
            "isReauthorization": true,
            "consentMetadata" : {}
            },
            "consumerData": {
            "accounts": [
                {
                "displayName": "accountThree",
                "accountId": "1234",
                "selected": false
                }
            ]
            }
        },
        "status": "SUCCESS",
        "responseId": "request-uuid"
    }   
    ```

The response of the Populate Consent Authorization Screen extension consists of two main objects.

1. Consent Data

`consentData` encompasses all consent related data derived from the consent initiation request that needs to be sent for populating the consent authorization page. This includes,

- Consent type
- Basic consent details
- Requested permissions
- Accounts linked to each requested permission
- Accounts linked to the complete requested consent
- Whether multiple account selection is allowed
- Whether this is a re-authorization of a previously authorized consent
- Additional metadata for the consent persistence step (not shown on the page)

The table below describes the data elements included in the '`consentData` object'.

| Data Elements | Type | Description | 
| ------------- | ---- | ----------- |
| initiatedAccountsForConsent | Array | Accounts linked to the entire consent. Users cannot select or deselect these accounts <br/>If permissions are specified, these accounts are shown under each permission. <br/> If no permissions are specified, they are shown for the entire consent.|
| permissions | Array | Permissions to be displayed in the consent grant page. Each permission can have `initiatedAccounts`; a list of accounts to which each of the permissions are requested at consent initiation.
| allowMultipleAccounts | boolean | Decides whether multiple accounts are allowed per permission / consent |
| isReauthorization | boolean | Indicates whether the authorization is for a consent that has already been authorized |
| type | string | Type of the consent being authorized |
| basicConsentData | Object | Includes separate lists of consent related bullet point text phrases to display on the consent page. |
| consentMetadata | Object | Additional data hidden from the PSU but sent to the persist-authorized-consent endpoint for use by the service extension. |

2. Consumer Data

The `consumerData` object contains all consumer-related information retrieved from the banking backend. This includes the accounts the user can access, which are available for selection when neither `initiatedAccountsForConsent` nor `initiatedAccounts` for a permission are provided.

| Data Elements | Type | Description | 
| ------------- | ---- | ----------- |
| accounts | Object | Set of accounts of the user. It include the display name and an optional selected property, set to either true or false. If true, the account will be pre-selected when displayed, before any user action. |

## Customize the theme of the consent page

The consent page displays the banking information that the API consumer application needs to access. 
Below is the consent page designed for the sample Account Information Service API available in WSO2 Open Banking Accelerator:
![consent-webpage](../assets/img/develop/customizing-consent-page/information-in-the-consent-page.png)

If the bank wishes to customize the theme of the existing consent page, they can modify the files in the following 
directories: 

| Requirement | Path to the relevant file |
|---------|---------    |
|Change the style sheet|`<IS_HOME>/repository/deployment/server/webapps/ob#authenticationendpoint/css`|
|Change the images|`<IS_HOME>/repository/deployment/server/webapps/ob#authenticationendpoint/images`|
|Change the existing JavaScript files|`<IS_HOME>/repository/deployment/server/webapps/ob#authenticationendpoint/js`|
|Change the default font|`<IS_HOME>/repository/deployment/server/webapps/ob#authenticationendpoint/fonts`|

