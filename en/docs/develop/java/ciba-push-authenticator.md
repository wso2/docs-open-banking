The Client-Initiated Backchannel Authentication (CIBA) Push Authenticator in WSO2 Open Banking currently supports 
the Local user stores. The CIBA authenticator is used to send push notifications to the users in a CIBA flow.

You can extend it to support federated user stores as explained in this page.

Implement a custom Push authenticator according to your requirements by extending the following class:
 ``` java
 com.wso2.openbanking.accelerator.consent.extensions.ciba.authenticator.CIBAPushAuthenticator
 ```

Given below is a brief explanation of the methods you need to implement.

### getAuthenticatedUser method

This method lets you create an authenticated user from a subject identifier.

``` java
protected AuthenticatedUser getAuthenticatedUser(HttpServletRequest request)
```

Input parameter:

 - `HttpServletRequest request` -   response received from the mobile for the Push authenticator notification 

Output parameter:

 - `AuthenticatedUser` - authenticated user from the user store. 
 

## Configuring a custom Push Authenticator  

1. Once implemented, build a JAR file for your project.
2. Place the above-created JAR file in the `<IS_HOME>/repository/components/dropins` directory.
3. Open the `<IS_HOME>/repository/conf/deployment.toml` file and configure your custom authenticator using the Fully 
Qualified Name (FQN):

      ``` toml
      [open_banking.sca.idp]
      name = "CIBA-Push-Auth"
      ```
    
4. Save the configurations and restart the Identity Server.
5. Follow the [Set up CIBA flow](../learn/ciba-set-up-flow.md#configuring-authenticator) documentation and try out the 
flow.

