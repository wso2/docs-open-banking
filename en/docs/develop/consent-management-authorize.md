WSO2 Open Banking Accelerator consists of endpoints to manage consents. You can customize relevant components 
according to your requirements using the extension points available. This section explains the 
Consent Authorize component and how to customize its endpoints.

!!! note 
    When the Consent web application is deployed in a distributed manner with a load balancer, this extension requires 
    the implementation of session affinity.

The Consent Authorize extension point relates to the loading of the consent approval page and eventually persisting 
the consent provided by the users. This consists of 2 endpoints. 

## Retrieve

The Retrieval Steps extension provides the ability to add extensions to the `jsonObject`, which is sent to the consent 
page to display to the user. Additionally, you can use these steps for reasons such as data reporting requirements and 
customizing data for the consent page.

!!! note 
    This information that is sent and displayed on the consent page depends on the specification that you adhere to. 

The data provided to Retrieval Steps and the changes that can be done are as follows:

### Endpoint
``` xml
https://<IS_HOST>:9446/api/openbanking/consent/authorize/retrieve/{session-data-key}
```

### Interface
``` java
com.wso2.openbanking.accelerator.consent.extensions.authorize.model.ConsentRetrievalStep
```

### Method
The following method is available in the interface.
``` java
void execute(ConsentData consentData, JSONObject jsonObject) throws ConsentException;
```

### Error Handling
In any of the consent extensions, if an error scenario occurs and you need to send an error response make sure to throw 
a `ConsentException`.

### Data 
The following table explains the data available in `ConsentRetrieveData`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| sessionDataKey| String    | The session data key of the current authorization consent. If required, this can be used as a unique identifier. |
| userId        | String    | The user ID of the currently authenticated user. |
| spQueryParams | String    | The query parameters related to the current consent invocation. This contains details such as the request object of the authorize request. |
| scopeString   | String    | The scopes that the user is being authorized for. |
| application   | String    | The application that is requesting consent from the user to make requests on behalf of them. |
| consentId     | String    | The consent ID of the currently requested consent. This has to be set in the retrieval steps. |
| requestHeaders| Map<String, String>   | Any request headers sent from the client UI during the consent flow. |
| consentResource   | ConsentResource   | The consent resource object of the consent that is currently requested. |
| authResource  | AuthorizationResource | The authorization resource object of the current authorization. |

### Configuration 

To configure the customized Retrieval Steps, follow the given instructions:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Add the following tags to configure the steps and their order. The steps are invoked based on the configured priority 
order. 

!!! tip 
    In the retrieval steps, there is a non-regulatory step configured as the priority order 1001. Make sure to configure 
    any custom step before this step.

``` xml
[[open_banking.consent.authorize_steps.retrieve]]
class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.ConsentRetrievalStep1"
priority = 1

[[open_banking.consent.authorize_steps.retrieve]]
class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.ConsentRetrievalStep2"
priority = 2
```

---

## Persist

The second endpoint of the Consent Authorize component is the Persist Flow. The Persistent Steps are engaged once the 
user approves/denies the consent via an API invocation made from the consent page. When the `/persist` endpoint is 
invoked, the steps to persist are also invoked and the data required for persistence will be provided to these steps. 

### Endpoint
``` xml
https://<IS_HOST>:9446/api/openbanking/consent/authorize/persist/{session-data-key}
```

!!!note
    It is mandatory to send the `approval` parameter in the payload of this request. The `approval` parameter is a 
    boolean value that specifies whether the customer has authorized the consent or not. 

### Interface
``` java
com.wso2.openbanking.accelerator.consent.extensions.authorize.model.ConsentPersistStep
```

### Method 
The following method is available in the interface.
``` java
void execute(ConsentPersistData consentPersistData) throws ConsentException;
```

### Error Handling
In any of the consent extensions, if an error scenario occurs and you need to send an error response make sure to throw 
a `ConsentException`.

### Data 
The following table explains the data available in `ConsentPersistData`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| payload   | JSONObject            | The payload of the persistent request. |
| headers   | Map<String, String>   | The request headers of the persistent request. |
| consentData | ConsentData | The consent data object used in the retrieval flow, which is populated via cache. |
| approval | boolean                | A boolean value that represents whether the approval was granted by the user.|
| metadata | Map<String, Object>    | Additional metadata sent to the steps. |

### Configuration 

To configure the customized Persistent Steps Manage component, follow the given instructions:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Add the following tags to configure the steps and their order. The steps are invoked based on the configured priority 
order. 

``` xml
[[open_banking.consent.authorize_steps.persist]]
class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.ConsentPersistStep1"
priority = 1

[[open_banking.consent.authorize_steps.persist]]
class = "com.wso2.openbanking.accelerator.consent.extensions.authorize.impl.ConsentPersistStep2"
priority = 2
```
