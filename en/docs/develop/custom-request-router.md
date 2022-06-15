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
request router, the router decides the flow to execute. 

Once implemented, build a JAR file for the project.
 
##Configuring a custom Request Router


1. Place the above-created JAR file in the `<APIM_HOME>/repository/components/lib` directory.

    !!! note
        If it’s an OSGI JAR file, place it in the `<APIM_HOME>/repository/components/dropins` directory.

2. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.

3. Add the Fully Qualified Name (FQN) of your Request Router as follows. For example:

    ``` xml
    [open_banking.gateway]
    request_router = "com.wso2.openbanking.accelerator.gateway.executor.core.DefaultRequestRouter"
    ```

## Handling non-regulatory APIs 

If you are publishing a non-regulatory API that does not require any open banking policy validations, the API needs to 
be identified by the Request Router. Also, for non-regulatory API requests, it is not required to include any 
regulatory policies.

### Identifying non-regulatory APIs 

It is important to identify the non-regulatory API at the Request Router. 

 - If you have few non-regulatory APIs, the easiest way to achieve this is by checking API properties, such as the name 
 of the API.
 - Otherwise, you can define a custom Swagger property and identify APIs using that. This approach is available 
 in the following class:

    ``` java
    com.wso2.openbanking.accelerator.gateway.executor.core.DefaultRequestRouter` 
    ```
    The sample approach is as follows:

    ``` java
    if (requestContext.getOpenAPI().getExtensions().containsKey(GatewayConstants.REGULATORY_CUSTOM_PROP) &&
      !Boolean.parseBoolean(requestContext.getOpenAPI()
        .getExtensions().get(GatewayConstants.REGULATORY_CUSTOM_PROP).toString())) {
      requestContext.addContextProperty(GatewayConstants.REGULATORY_CUSTOM_PROP, "false");
      return EMPTY_LIST;
    }
    ```

- The `DefaultRequestRouter` class expects a custom Swagger property named `x-wso2-regulatory-api`. 

    - If the `x-wso2-regulatory-api` property is set to `true` or not specified, the Request Router assumes that is a 
    regulatory API invocation and sets all the executors according to that. 
        
    - If the `x-wso2-regulatory-api` property is set to `false`, the assumption is that this is a non-regulatory API. Then 
    the Request Router avoids engaging any executors with regulatory policies. 

!!! note 
    The response flow does not contain the **OpenAPI definition** of the requested API. 
    
    Therefore, if you are using the OpenAPI definition to differentiate between regulatory and non-regulatory APIs, you 
    need to do that in the request flow. Make sure to set an indicator value in the context, so the Request Router can 
    refer to that value in the response flow. This approach is used in 
    the [sample code block](#:~:text={The sample approach is as follows:} ) given above.


