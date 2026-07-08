##Writing a Custom AuthenticationWorker

!!! info
    This is only available as a WSO2 Update from **WSO2 Open Banking Identity Server Accelerator Level
    3.0.0.157** onwards. For more information on updating,
    see [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

WSO2 Open Banking Accelerator and the Toolkits built based on the Accelerator use an adaptive authentication script to define 
the authentication flow. In many Open Banking and BFSI use cases, it is required to change the authentication flow in various ways.

The Authentication Worker is an extension point that enables Open Banking users to engage in custom business logic during the authentication flow.

Listed below are such requirements:

 - Integrating with external components (For example, fraud detection mechanisms) and adapting the authentication based on the response
 - Invoking external or internal endpoints to retrieve data
 - Invoking external or internal endpoints to persist data
 - Publishing authentication-related metadata to WSO2 or external analytics receivers

In such scenarios, you can simply register a Worker class and configure it to execute during the authentication flow as described below:

1. Create a Java project. (You may use an existing project for this as well.)
2. Add the Accelerator Identity as a dependency.
    - The JAR file for this dependency is located inside the `<OB_IS_HOME>/repository/components/dropins` directory.

          ```
          <dependency>
              <groupId>com.wso2</groupId>
              <artifactId>com.wso2.openbanking.accelerator.identity</artifactId>
              <version>3.0.0.x</version>
          </dependency>
          ```

        !!! note
            The `x` value should be greater than 157.


3. Create a Java class for the Worker implementation in a desired location of the new Java project.
    - Make that class an implementation of the below class from the above-added dependency.

         ``` java
         com.wso2.openbanking.accelerator.identity.auth.extensions.adaptive.function.OpenBankingAuthenticationWorker
         ```
    
    A sample class is shown below:
    
    ``` java
    public abstract class SampleWorker implements OpenBankingAuthenticationWorker {
        @Override
        public JSONObject handleRequest(JsAuthenticationContext context, Map<String, String> map) {
            //Your Worker Implementation
        }
    }
    ```

4. Implement the required logic inside the `handleRequest` method.
5. Once implemented, build a JAR file for the project.

##Configuring the Authentication Worker

1. Place the above-created JAR file in the `<IS_HOME>/repository/components/lib` directory.
2. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
3. Add the Worker implementation. For example:

    ``` toml
    [[open_banking.identity.authentication.worker]]
    name = "sampleWorker"
    class = "com.wso2.openbanking.sample.worker.impl.SampleWorker"
    ```
   
4. Now you can add this new logic to any authentication flow.

    !!! note
        To add this to future applications,
    
        1. Open the `<IS_HOME>/repository/conf` directory.
        2. Add this function to the original adaptive auth template file (usually named as `common.auth.script.js`).

5. You can call this new Worker method as shown below:

    ``` java
    OBAuthenticationWorker(JSAuthenticationContext, {}, "sampleWorker");
    ```

    Given below is a brief explanation of the three parameters of this method:

    1. `JSAuthenticationContext` - This context is available inside any authentication element in the adaptive authentication 
    script. Pass this context object as the first parameter.
    
    2. Map of properties - This provides flexibility for this extension point. Add any key-value pair to this. Those keys and 
    values will be available as a Java Map in the Worker Java implementation. You can use these properties to implement the logic you want.
    
    
    3. Worker Name - This is the name of the Worker.

        !!! note
            Provide the same name you configured in the `deployment.toml` file as the Worker name in the third step.
   
!!! info
    You can implement multiple workers, give them different names, and use them in the adaptive authentication script.

Below is a sample adaptive authentication script that uses this Worker extension:

``` java
var psuChannel = "Online Banking";
var onLoginRequest = function (context) {
    publishAuthData(context, "AuthenticationAttempted", {
        psuChannel: psuChannel,
    });
    executeStep(1, {
        onSuccess: function (context) {
            Log.info("Authentication Successful");
            publishAuthData(context, "AuthenticationSuccessful", {
                psuChannel: psuChannel,
            });
            OBAuthenticationWorker(context, {}, "psuAuthenticated");
        },
        onFail: function (context) {
            Log.info("Authentication Failed");
            publishAuthData(context, "AuthenticationFailed", {
                psuChannel: psuChannel,
            });
            OBAuthenticationWorker(context, {}, "psuAuthenticated");
        },
    });
    OBAuthenticationWorker(context, {}, "finalised");
};
``` 

!!! note
    To add these to one or more existing applications, log into the Carbon console as the super admin and update the script. 
    Follow the steps in the [Adaptive Authentication - Overview](https://is.docs.wso2.com/en/latest/guides/adaptive-auth/configure-adaptive-auth/) documentation.