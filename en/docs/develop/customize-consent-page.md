During the [consent authorization process](../learn/consent-authorization-intro.md), an API consumer requests the banking 
information that the API consumer application needs to access. Then, the bank redirects the bank user to a webpage where 
it displays the banking information that the API consumer application needs to access. This is known as the **Consent Page**. 
WSO2 Open Banking Accelerator contains a default consent page, which can be customized to display consent details according 
to your requirements. The following topics explain the page structure and extension points where you can customize the consent page furthermore.

##Customize the theme of the consent page
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

##Customize the layout of the consent page
The consent page works with two main servlets, `OBConsentServlet` and `OBConsentConfirmServlet`.

[ ![customize-the-layout-of-the-consent-page](../assets/img/develop/customizing-consent-page/customize-the-layout-of-the-consent-page.png) ](../assets/img/develop/customizing-consent-page/customize-the-layout-of-the-consent-page.png)

As shown in the above diagram, when the initial request hits `OBConsentServlet`, it retrieves the account selection details from the consent service by invoking the `updateRequestAttribute` and `updateSessionAttribute` methods. 

If you want to access new data from a custom JSP page, you can override these two methods and return the required data as a map.

Once a user confirms the consent details, the request hits `OBConsentConfirmServlet`. 

Then it writes the permission details to the consent service by invoking the `updateConsentData` and `updateConsentMetaData` methods. 

If you want to persist the new consent data, you can override these two methods and return the required data as a map.

An extension is provided for you to customize the JSP implementations of these servlets.

Implement the methods from the following class:
```java
com.wso2.openbanking.accelerator.consent.extensions.authservlet.model.OBAuthServletInterface
```

Given below are the methods that can be extended:

###updateRequestAttribute method 
This method returns the data that needs to be accessed in the JSP of `OBConsentServlet` as a map. You can retrieve data 
from the request, consent service response, and `resourceBundle` to create the map. Given below is the method signature:
```java
Map < String, Object > updateRequestAttribute(HttpServletRequest request,
  JSONObject dataSet, ResourceBundle resourceBundle);
```
Sample implementation to add account details to the request is shown below:
__
```java
@Override
public Map < String, Object > updateRequestAttribute(HttpServletRequest request, JSONObject dataSet,
    ResourceBundle resourceBundle) {

    Map < String, Object > returnMap = new HashMap < > ();

    List < Map < String, String >> accountList = new ArrayList < > ();
    // get account details dataset JSONObject
    JSONArray accountsArray = dataSet.getJSONArray("accounts");
    for (int accountIndex = 0; accountIndex < accountsArray.length(); accountIndex++) {
        JSONObject accountObject = accountsArray.getJSONObject(accountIndex);
        String accountId = accountObject.getString("account_id");
        String accountName = accountObject.getString("account_name");

        Map < String, String > accountData = new HashMap < > ();
        accountData.put("account_id", accountId);
        accountData.put("account_name", accountName);
        accountList.add(data);
    }
    // this account_list is accessible from the consent JSP page as a request attribute
    returnMap.put("account_list", accountList);

    return returnMap;
}
```

###updateSessionAttribute method
This method returns the data that needs to be accessed in the session of the JSP of `OBConsentServlet` as a map. You can 
retrieve data from the request, consent service response, and `resourceBundle` to create the map. Given below is the method signature:
```java
Map < String, Object > updateSessionAttribute(HttpServletRequest request,
  JSONObject dataSet, ResourceBundle resourceBundle);
```
Sample implementation to add an unique transaction Id to session is shown below:

```java
@Override
public Map < String, Object > updateSessionAttribute(HttpServletRequest request, JSONObject dataSet,
    ResourceBundle resourceBundle) {
    Map < String, Object > returnMap = new HashMap < > ();

    // this transaction_id is accessible from the consent JSP page as a session attribute
    returnMap.put("transaction_id", UUID.randomUUID());

    return returnMap;
}
```

###updateConsentData method
This method returns the data that needs to be persisted as a part of the consent implementation. You can retrieve data 
from the request. Given below is the method signature:
```java
 Map<String, Object> updateConsentData(HttpServletRequest request);
```
If required, you can encode the account Ids before persisting. A sample implementation to encode the account Ids to Base64 is shown below:

```java
@Override
public Map < String, Object > updateConsentData(HttpServletRequest request) {

    Map < String, Object > returnMap = new HashMap < > ();

    // get consented accounts from HttpServletRequest
    String[] accounts = request.getParameter("accounts[]").split(":");
    String[] encodedAccounts = Arrays.stream(accounts).map(accountId - > Base64.getEncoder().encodeToString(accountId.getBytes())).toArray(String[]::new);

    // these account IDs are accessible from the ConsentPersistStep implementations
    returnMap.put("account_ids", new JSONArray(encodedAccounts));

    return returnMap;
}
```

###updateConsentMetaData method 
This method returns the data that needs to be persisted as consent metadata. You can retrieve data from the request. Given below is the method signature:
```java
Map<String, String> updateConsentMetaData(HttpServletRequest request);
```
Sample implementation to add client IP and user agent details as consent metadata is shown below:

```java
@Override
public Map < String, String > updateConsentMetaData(HttpServletRequest request) {

    final String clientUserAgent = request.getHeader("USER-AGENT");
    final String clientIP = request.getRemoteAddr();

    Map < String, String > returnMap = new HashMap < > ();
    returnMap.put("client_user_agent", clientUserAgent);
    returnMap.put("client_ip", clientIP);

    return returnMap;
}
```

###getJSPPath method
This method returns the JSP that you want to show while `OBConsentServlet` is invoked. This is the JSP responsible for 
displaying account selection data and consent data to the bank customers. The information you want to pass from `updateRequestAttribute` will be eventually 
displayed in this custom JSP you have implemented. Given below is the method signature:
```java
String getJSPPath();
```
Sample implementation to return a custom JSP file from the classpath is shown below:
```java
@Override
public String getJSPPath() {
    return "/custom_consent.jsp";
}
```

The authentication endpoint in WSO2 Open Banking Accelerator allows the bank to customize the layout of the consent page. 
The consent page is designed in a servlet that consists of three main JSP pages as shown in the diagram below: 

![consent-page-structure](../assets/img/develop/customizing-consent-page/consent-page-structure.png)

You can also make changes to the relevant JSP pages and customize according to the open banking requirement. To customize 
the layout of the authentication endpoint, locate the JSP pages in the following locations:

| Requirement | Path to the relevant file |
|---------|---------    |
|Header|`<IS_HOME>/repository/deployment/server/webapps/ob#authenticationendpoint/includes/consent_top.jsp`|
|Body| Varies according to your implementation.|
|Footer|`<IS_HOME>/repository/deployment/server/webapps/ob#authenticationendpoint/includes/consent_bottom.jsp`|

## Configuration               
If you want to add a custom implementation for `OBAuthServletInterface`, you can configure it as follows:

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
2. Follow the given sample and configure your custom `OBAuthServletInterface` implementation.

   ``` toml
   [open_banking.identity.authentication_webapp]
   servlet_extension = "com.wso2.openbanking.accelerator.consent.extensions.authservlet.impl.OBDefaultAuthServletImpl"
   ```
