##  Writing Custom Throttling Keys

Custom throttling allows system administrators to define dynamic rules for specific use cases. When a custom throttling 
policy is created, it is possible to define any policy you like. WSO2 API Manager provides the Custom Throttling 
feature. For more information, see 
[WSO2 API Manager documentation](https://apim.docs.wso2.com/en/latest/learn/rate-limiting/advanced-topics/custom-throttling)

WSO2 Open Banking API Manager Accelerator provides enhanced Custom Throttling capabilities that support open banking 
requirements. Using this feature, you can use customize attributes known as Custom Throttling Keys and use them in custom 
throttling policies.

To implement Custom Throttling Keys, extend the following class:

``` java
com.wso2.openbanking.accelerator.gateway.throttling.ThrottleDataPublisher
```

Given below is the method you need to implement:

### getCustomProperties method

This method lets you define Custom Throttling Keys.

``` java
public Map<String, Object> getCustomProperties(RequestContextDTO requestContextDTO);
```
