The WSO2 API Gateway acts as a proxy between the API consumer applications and the back-end servers in the bank. The API 
Gateway applies various policies to ensure the validity of API requests and their responses. This proxy applies both 
open banking and API management related policies.

## Handling open banking specific errors

WSO2 Open Banking Accelerator lets you apply policies using the Open Banking Gateway Executors. There is a set of 
executors that are available in the solution, by default. However, you can customize and implement your own executors 
according to your open banking requirements. For more information, 
see [Writing a custom Gateway Executor](custom-gateway-executor.md). 

When implementing policies with executors, there can be policy violations. Once a policy violation is detected, you 
need to handle such situations as follows:

1. Ensure that the error responses follow your open banking specification and are sent back to the API consumer. 

2. Inform the other executors about the violation and decide whether or not to perform other policy validations. For 
example, if one executor identifies that a mandatory header is missing in a request, the other executors can avoid 
executing certificate related role validations.

### Error handling guidelines for executors

!!! note 

    The `OBDefaultErrorHandler` that is configured in the API Manager accelerator contains all the necessary error 
    handling implementations. You can refer to the `OBDefaultErrorHandler` class as a template. 
        
    `com.wso2.openbanking.accelerator.gateway.executor.impl.error.handler.OBDefaultErrorHandler`

1. When you implement a custom executor, you can use the `isError` flag to identify policy violations. In your executor
 at the beginning of each method, check the `isError` flag in `OBAPIRequestContext` and `OBAPIResponseContext` and act 
 accordingly. 

    If the policy should not be executed for error scenarios, handle it as follows: 

    ``` java
     if (obapiRequestContext.isError()) {
       return;
     }
    ```

2. You can create an error object and store relevant information in it. Then set the error object in the context as 
follows: 

    ``` java
    OpenBankingExecutorError error = new OpenBankingExecutorError(OpenBankingErrorCodes.SERVER_ERROR_CODE, "Internal server error", message, OpenBankingErrorCodes.SERVER_ERROR_CODE);
    ArrayList < OpenBankingExecutorError > executorErrors = obapiResponseContext.getErrors();
    executorErrors.add(error);
    obapiResponseContext.setError(true);
    obapiResponseContext.setErrors(executorErrors);
    ```

3. To customize error messages sent to API consumer applications, you need to implement error handling executors. 
Perform the following in your error handling executors.

    a. Update the context properties of `OBAPIRequestContext`/`OBAPIResponseContext` with the error code and status code:
    
    - Set the `errorStatusCode` custom property
    - Set the `HTTPStatusCode` that needs to be sent to the back end
    
    For example:
    
    ``` java  
    obapiRequestContext.addContextProperty(GatewayConstants.ERROR_STATUS_PROP, “500”);
    ```
   
    b. Update the custom `errorPayload` property of `OBAPIRequestContext`/`OBAPIResponseContext` with the custom error 
    message. For example:
    
    ``` java
    obapiRequestContext.setModifiedPayload(customErrorMessageinJSON.toString());
    ```
   
## Handling API management specific errors

The default API management policies also face errors during policy violations. If your open banking technical 
specification mentions a common error format, you need to follow the same format in API management related errors as well. 
To achieve this, place a [custom mediator](https://apim.docs.wso2.com/en/4.0.0/deploy-and-publish/deploy-on-gateway/api-gateway/message-mediation/adding-a-class-mediator/#!) 
in the `<APIM_HOME>/repository/deployment/server/synapse-configs/default/sequences/jsonConverter.xml` file as shown below:

``` xml
<sequence
	xmlns="http://ws.apache.org/ns/synapse" name="jsonConverter">
	<property name="messageType" value="application/json" scope="axis2"/>
	<property name="error_message_type" value="application/json"/>
	<class name=”com.abc.bank.custom.error.formatter.ClassMediator”/>
</sequence>
```

The class mediators can handle the errors thrown only by the API Manager. The errors that the executors throw, 
do not go through class mediators.
