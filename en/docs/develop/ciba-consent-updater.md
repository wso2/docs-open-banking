When a user approves/rejects the consent via the mobile device, the response is sent to the Identity server from the 
mobile. Before the response data is persisted, it is possible to change the payload data. 

You can use the **CIBA Authentication Endpoint Consent Updater** to change consent data that is sent from the CIBA 
mobile app before persisting them in the database. Extending the following class:

``` java 
com.wso2.openbanking.accelerator.consent.extensions.ciba.model.CIBAAuthenticationEndpointInterface
```

Given below is a brief explanation of the methods you need to implement.

### updateConsentData method

This method lets you update the consent data that is sent from the mobile as a response.

``` java
public JSONObject updateConsentData(JSONObject consentData)
```

Input parameter:

 - `JSONObject consentData`: consent data sent from the mobile app

Output parameter:

 - `updateConsentData`: updated consent data
 
## Configuring a custom CIBA Authentication Endpoint Consent Updater  

1. Once implemented, build a JAR file for your project.
2. Place the above-created JAR file in the `<IS_HOME>/repository/components/dropins` directory.
3. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
4. Add the `open_banking.identity.ciba_webapp` tag and configure your customization using the Fully Qualified Name 
(FQN). For example,

    ``` toml
    [open_banking.identity.ciba_webapp]
    Servlet_extension = com.wso2.openbanking.accelerator.consent.extensions.ciba.model.CIBAAuthenticationEndpointInterface
    ```
5. Save the configurations and restart the Identity Server.


