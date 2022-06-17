##Writing a Custom OBServiceObserver

WSO2 Open Banking Accelerator contains an `OBServiceObserver` component that provides a Java interface to manually execute 
methods in non OSGI modules at the server startup time for both Identity Server and API Manager Servers. A new custom 
implementation of the `OBServiceObserver` executes as a new thread at runtime. 

- To implement a custom `OBServiceObserver`, extend the following class:

``` java
com.wso2.openbanking.accelerator.service.activator.OBServiceObserver
```

Given below is a brief explanation of the methods you need to implement.

###Activate method

This is a public method without any return type or input parameters. You can customize it according to your requirements. 
Given below is the method signature:

``` java
void activate()
```

Sample implementation:

``` java
import com.wso2.openbanking.accelerator.service.activator.OBServiceObserver;

public class CustomObserver implements OBServiceObserver {

    @Override
    public void activate() {
        // invoke the required method
    }
}
```

##Configuring a Custom OBServiceObserver

1. Once implemented, build a JAR file for your `OBServiceObserver` and place it in the  
   `<IS_HOME>/repository/components/dropins` and `<APIM_HOME>/repository/components/dropins` directories.
2. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
3. Add a `[open_banking.service_activator.subscribers]` tag and configure it using the Fully Qualified Name (FQN) of your custom OBServiceObserver implementation.
   executor using the Fully Qualified Name (FQN) of your custom event executor class. For example:

    ``` toml
    [[open_banking.service_activator.subscribers]]
    subscriber="full.qualified.class.name.ObServiceObserverImpl-1"
    subscriber="full.qualified.class.name.ObServiceObserverImpl-2"
    ```
   
4. Save the above configurations and restart the Identity Server.
5. Repeat steps 2 and 3 for API Manager using the`<APIM_HOME>/repository/conf/deployment.toml` file.
6. Restart the API Manager server.





