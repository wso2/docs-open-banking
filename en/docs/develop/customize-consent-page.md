A web page is displayed during the authorization flow where the API consumer requests a bank user to provide the consent 
for the account information that the API consumer application wants to access. A default consent page is designed in WSO2 
Open Banking Accelerator. A toolkit developer can create their own consent page to show details from the consent data of 
their implementations. Following topics explain where a toolkit developer can customise the consent page:

##Customise the theme of the consent page
1. First a login page is displayed to authenticate the bank customer. See the default login page of WSO2 Open Banking Accelerator: ![consent-page-authorization-flow.png](../assets/img/develop/customizing-consent-page/login-of-consent-page.png)

2. The consent webpage (consent page) containing the banking information is displayed afterwards. Below is the consent webpage designed for the sample 
Account Information Service API available in WSO2 Open Banking Accelerator:

`<Diagram>`

If the bank wishes to customise the theme of the existing consent page, they can modify the files in the following 
directories: 

| Requirement | Path to the relevant file |
|---------|---------    |
|Change the style sheet|`<OB_IS_ACCELERATOR_HOME>/repository/deployment/server/webapps/ob#authenticationendpoint/css`|
|Change the images|`<OB_IS_ACCELERATOR_HOME>/repository/deployment/server/webapps/ob#authenticationendpoint/images`|
|Change the existing JavaScripts|`<OB_IS_ACCELERATOR_HOME>/repository/deployment/server/webapps/ob#authenticationendpoint/js`|
|Change the default font|`<OB_IS_ACCELERATOR_HOME>/repository/deployment/server/webapps/ob#authenticationendpoint/fonts`|

##Customize the layout of the consent page
The consent webapp works with two main servlets. 

- `OBConsentServlet` retrieves the consent data from consent service and shows the account selection details. 
- `OBConsentConfirmServlet` shows the permission details and writes to the consent service if the user approves consent. 

An extension is provided for toolkit developers to write the JSP implementations of these servlets. Give below are the 
methods that can be extended:

Implement the following methods in the following class:
```java
com/wso2/openbanking/accelerator/authentication/webapp/OBAuthServletInterface.java
```

###updateRequestAttribute method 
This method returns the data that needs to be accessed in the JSP of `OBConsentServlet` as a map. You can retrieve data 
from the request, consent service response, and `resourceBundle` to create the map.

###updateSessionAttribute method
This method returns the data that needs to be accessed in the session of the JSP of `OBConsentServlet` as a map. You can 
retrieve data from the request, consent service response, and `resourceBundle` to create the map.

###updateConsentData method
This method returns the data that needs to be persisted as part of consent writing. You can retrieve data from the request.

###updateConsentMetaData method 
This method returns the data that needs to be persisted as part of consent metadata while consent persistence. You can 
retrieve data from the request.

###getJSPPath method
This method returns the JSP that you want to show while `OBConsentServlet` is called. This is the JSP responsible for 
showing consent data to the bank customers. The information you want to pass from `updateRequestAttribute` will be eventually 
shown in this custom JSP you have written. 

The authentication endpoint in WSO2 Open Banking Accelerator allows the bank to customize the layout of the consent page. 
The consent page is designed in a servlet that consists of three main JSP pages as shown in the diagram below: ![consent-page-structure](../assets/img/develop/customizing-consent-page/consent-page-structure.png)

You can also make changes to the relevant JSP pages and customize according to the open banking requirement. To customize 
the layout of the authentication endpoint, locate the JSP pages in the following locations:

| Requirement | Path to the relevant file |
|---------|---------    |
|Header|`<OB_IS_ACCELERATOR_HOME>/repository/deployment/server/webapps/ob#authenticationendpoint/includes/consent_top.jsp`|
|Body|Implementation needs to be provided by toolkit developers.|
|Footer|`<OB_IS_ACCELERATOR_HOME>/repository/deployment/server/webapps/ob#authenticationendpoint/includes/consent_bottom.jsp`|





