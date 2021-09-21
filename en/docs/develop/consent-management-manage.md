WSO2 Open Banking Accelerator consists of endpoints to manage consents. You can customize relevant components 
according to your requirements using the extension points available. This section explains the 
Consent Manage component and how to customize the `/manage` endpoint.

The Consent Manage component processes requests based on specification requirements. The extension point of 
this component is the `ConsentManageHandler` interface. It contains methods that support HTTP GET, POST, 
DELETE, PUT, and PATCH methods. The interface also contains `ConsentManageData` object that holds data related to 
the request. Given below is a summary of details related to this extension.

### Endpoint
``` xml
https://<IS_HOST>:9446/api/openbanking/consent/manage/{custom-path}
```

### Interface
``` java
com.wso2.openbanking.accelerator.consent.extensions.manage.model.ConsentManageHandler
```
### Methods
The following methods are available in the interface.
``` java
public void handleGet(ConsentManageData consentManageData) throws ConsentException;
```    
``` java
public void handlePost(ConsentManageData consentManageData) throws ConsentException;
```
``` java
public void handleDelete(ConsentManageData consentManageData) throws ConsentException;
```    
``` java
public void handlePut(ConsentManageData consentManageData) throws ConsentException;
```
``` java
public void handlePatch(ConsentManageData consentManageData) throws ConsentException;
```
``` java
default void handleFileUploadPost(ConsentManageData consentManageData) throws ConsentException {

    throw new ConsentException(ResponseStatus.METHOD_NOT_ALLOWED, "File upload is not supported");
}
```
``` java
default void handleFileGet(ConsentManageData consentManageData) throws ConsentException {

    throw new ConsentException(ResponseStatus.METHOD_NOT_ALLOWED, "File retrieval is not supported");
}
```
!!! note
    The `handleFileUploadPost` and `handleFileGet` methods above are available only as a WSO2 Update and are effective from August 10, 2021 (08-10-2021). For more information on updating WSO2 Open Banking, see [Updating WSO2 Products](/install-and-setup/setting-up-servers#getting-wso2-updates).
        
### Error Handling
In any of the consent extensions, if an error scenario occurs and you need to send an error response make sure to throw 
a `ConsentException`.

### Data 
The following table explains the data available in `ConsentManageHandler`.

| Name      | Type                  | Description  |
| ----------|-----------------------| -------------|
| headers   | Map<String, String>   | The request headers received in the request. |
| payload   | Object                | The payload of the client request. This can either be a JSONObject or a JSONArray instance. |
| queryParams   | Map               | The query parameters received in the request as a Map. |
| requestPath   | String            | The request path to invoke the endpoint. This is the {custom-path} part mentioned above. |
| clientId      | String            | The client ID of the application that made the request. This application is bound to the request from the gateway insequence based on the token used. |
| request       | HttpServletRequest    | The original HTTP servlet request. Use this to extract any other properties from the request. |
| response      | HttpServletResponse   | The HTTP servlet response object. If required, you can make any changes to this. |
| responseStatus    | ResponseStatus    | The status of the response that needs to be sent out regarding the current request. |
| responsePayload   | Object            | The payload of the response that needs to be sent out regarding the current request. This should generally be a JSONObject. |

### Configuration 

To configure the customized Consent Manage component, follow the steps below:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    
2. Locate the following tag and configure it with the customized component.
```xml 
[open_banking.consent.manage]
handler="com.wso2.openbanking.accelerator.consent.extensions.manage.impl.DefaultConsentManageHandler"
```
