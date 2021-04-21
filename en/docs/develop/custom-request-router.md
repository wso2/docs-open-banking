## Writing a custom Request Router

The API consumers use the open banking API for various open banking scenarios such as 

 - Registering their applications with Dynamic Client Registration (DCR)
 - Retrieving accounts information
 - Initiating payments on behalf of a customer
 
These scenarios are known as API flows. The API requests associated with API flows pass through the Open Banking 
Gateway. As different flows need different policy enforcements, a routing mechanism is required to enforce policies. 
You can implement a router according to your requirements by extending the following class:

``` java
com.wso2.openbanking.accelerator.gateway.executor.core.AbstractRequestRouter
```
Given below is a brief explanation of the methods you need to implement.

###getExecutorsForRequest method

This method lets you configure executors for requests.

``` java
public abstract List<OpenBankingGatewayExecutor> getExecutorsForRequest(OBAPIRequestContext requestContext);
```

###getExecutorsForResponse method

This method lets you configure executors for responses.

``` java
public abstract List<OpenBankingGatewayExecutor> getExecutorsForResponse(OBAPIResponseContext requestContext);
```

The names of the flows are not defined and you can customize them as you wish. When the requests reach the configured 
requests router, the router decides the flow to execute. 
 
##Configuring a custom Request Router

1. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
2. Follow the given sample configurations and configure your router. 

!!! note
    The `priority` tag defines the order of execution.

``` xml
[[open_banking.gateway.openbanking_gateway_executors.type]]
name = "DCR"
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.api.resource.access.validation.APIResourceAccessValidationExecutor"
priority = 1
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.dcr.DCRExecutor"
priority = 2
[[open_banking.gateway.openbanking_gateway_executors.type.executors]]
name = "com.wso2.openbanking.accelerator.gateway.executor.impl.error.handler.OBDefaultErrorHandler"
priority = 1000
```
