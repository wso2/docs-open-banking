The idempotency handling executor is used to cache the requests. If the same request is repeated within the configured allowed 
time, the response is returned from the cache without calling the bank back end or the key manager. The extendable idempotency
handling executor provided in WSO2 Open Banking Accelerator implements the open banking gateway executor. This uses WSO2 Open 
Banking Distributed Cache for caching. 

According to your requirements, you can extend and override the methods in the `OpenBankingIdempotencyHandlingExecutor`
class to implement the idempotency handling executor according to your open banking requirements.

!!! info
    This is only available as a WSO2 Update from **WSO2 Open Banking Identity Server Accelerator Level 3.0.0.48** and 
    **WSO2 Open Banking API Manager Accelerator Level 3.0.0.25** onwards. For more information on updating, see 
    [Getting WSO2 Updates](../install-and-setup/setting-up-servers.md#getting-wso2-updates).

To achieve the above, extend the following class:

```java
com.wso2.openbanking.accelerator.gateway.executor.idempotency.OpenBankingIdempotencyHandlingExecutor
```

Given below are the overridable methods used in open banking idempotency handling executor.

- The following table explains the abstract methods that can be overridden:

     | Method Name  	| Parameter      | Return Type 				 | Purpose of the Method	      |
     |----------------|------------------|-----------------------------|--------------------------------|
     | `getCreatedTimeFromResponse`	| `OBAPIResponseContext` | `String`	        | To extract the created time from the response |
     | `getPayloadFromRequest` | `OBAPIRequestContext` | `Map<String, Object>` | To extract the payload and HTTP status from the request |
     | `isValidIdempotencyRequest` | `OBAPIRequestContext` | `boolean`        | To check if the request is an idempotency valid request |
     | `isValidIdempotencyResponse`	| `OBAPIResponseContext` | `boolean`        | To check if the response is an idempotency valid response |

- The following table explains the other public/protected methods that can be overridden if needed:

     | Method Name  	| Parameter                                                                      | Return Type 				| Purpose of the Method	                                                             |
     |--------------------------------------------------------------------------------|----------|------------------------------------------------------------------------------------|--------------------	|
     | `handleIdempotencyErrors`	| `OBAPIRequestContext obapiRequestContext`, </br> `String message`, </br> `String errorCode` | `ArrayList<OpenBankingExecutorError>`	| To handle errors in idempotency validation                                         |
     | `isRequestReceivedWithinAllowedTime` | `String createdTime`                                                           | `boolean` | To check whether the difference between two dates is less than the configured time |
     | `getIdempotencyKeyConstantFromConfig` | -                                                                              | `String` | To get the Idempotency Key from the configurations                                 |

A sample open banking idempotency handling executor implementation is given below:

```java
/**
 * OpenBankingIdempotencyHandlingExecutorImpl.
 */
public class OpenBankingIdempotencyHandlingExecutorImpl extends OpenBankingIdempotencyHandlingExecutor {

    private static final Log log = LogFactory.getLog(OpenBankingIdempotencyHandlingExecutorImpl.class);


    @Override
    public String getCreatedTimeFromResponse(OBAPIResponseContext obapiResponseContext) {
        String createdTime = null;
        if (OBAPIResponseContext.getMsgInfo().getHeaders().get("CreatedTime") != null) {
            //Retrieve response created time from headers
            createdTime = OBAPIResponseContext.getMsgInfo().getHeaders().get("CreatedTime");
        }
        return createdTime;
    }

    @Override
    public Map<String, Object> getPayloadFromRequest(OBAPIRequestContext obapiRequestContext) {
        Map<String, Object> map = new HashMap<>();
        map.put(IdempotencyConstants.PAYLOAD, obapiRequestContext.getRequestPayload());
        map.put(IdempotencyConstants.HTTP_STATUS, HttpStatus.SC_CREATED);
        return map;
    }

    @Override
    public boolean isValidIdempotencyRequest(OBAPIRequestContext obapiRequestContext) {
        return true;
    }

    @Override
    public boolean isValidIdempotencyResponse(OBAPIResponseContext obapiResponseContext) {
        return true;
    }
}
```

## Configuring Open Banking Idempotency Handling Executor

1. Configure the open banking distributed cache according to the [Distributed Cache documentation](distributed-cache.md). 
2. Open the `<APIM_HOME>/repository/conf/deployment.toml` file.
3. Add the below configurations for open banking idempotency handling executor:

    ```toml
    [open_banking.gateway.cache.idempotency_validation_cache]
    cache_time_to_live=1440
    [open_banking.gateway.idempotency]
    enabled=true
    allowed_time_duration=1440
    idempotency_key_header="x-idempotency-key"
    ```

    The following table explains the configurations used in open banking idempotency handling executor:
    
    | Configuration Name  	| Default Value     | Type 				| Description	                                                                                                                                                                            |
    | ------------	|----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------	|
    | `open_banking.gateway.cache.idempotency_validation_cache.cache_time_to_live`	| `1440`  | integer | Idempotency validation cache time to live in minutes.		                                                                                                                                 |
    | `open_banking.gateway.idempotency.enabled` | `false`   | boolean | This enables the idempotency handling executor. Idempotency validation works only if this is set to `true`. Otherwise, the open banking idempotency handling executor will be disabled. |
    | `open_banking.gateway.idempotency.allowed_time_duration` | `1440` | integer | The idempotency available time for the requests. This is checked in the `isRequestReceivedWithinAllowedTime` method.                                                                    |
    | `open_banking.gateway.idempotency.idempotency_key_header`	| `x-idempotency-key`  | string | This configuration takes the header name for the idempotency key.                                                                                                                       |