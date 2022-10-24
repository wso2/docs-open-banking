## Writing a custom Open Banking Distributed Cache Key

WSO2 Open Banking Distributed Cache is a caching service that creates a clustered cache among one or more WSO2 API 
Manager or Identity Server instances. The Open Banking Distributed Cache Key contains an extension. 
According to your requirements, you can extend and override the methods in the `OpenBankingDistributedCacheKey` class 
to implement a distributed cache according to your open banking requirements.

To achieve the above, extend the following class.
``` java
com.wso2.openbanking.accelerator.common.distributed.caching.OpenBankingDistributedCacheKey
```

To extend the validation capabilities according to your requirements, override relevant methods of this class.
Given below is a brief description of each method.

### OpenBankingDistributedCacheKey method
This method is the public constructor for this class.

``` java
public OpenBankingDistributedCacheKey(String cacheKey) {
    setCacheKey(cacheKey);
}
```

### Retrieve OpenBankingDistributedCacheKey method

This method lets you retrieve an instance of an `OpenBankingDistributedCacheKey`.

``` java
public static OpenBankingDistributedCacheKey of(String cacheKey) {
    return new OpenBankingDistributedCacheKey(cacheKey);
}
```

### setCacheKey method

This method lets you assign a value to (setter) the cache key string.


``` java
public void setCacheKey(String cacheKey) {
    this.cacheKey = cacheKey;
}
```

### getCacheKey method

This method lets you retrieve (getter) the cache key string.

``` java
public String getCacheKey() {
    return this.cacheKey;
}
```

### equals method

This method checks if the passed object is an `OpenBankingDistributedCacheKey` object. 
Given below is the method signature:

``` java
public boolean equals(Object o) {
}
```
### hashCode method

This method returns the hashcode value for the `OpenBankingDistributedCacheKey` object.

``` java
public int hashCode() {
    return Objects.hash(getCacheKey());
}
```

## Configuring a custom Open Banking Distributed Cache Key

1. Once implemented, build a JAR file for your project.
2. Place the above-created JAR file in the relevant `lib` directory of the base product:
     - `<APIM_HOME>/repository/components/lib`
     - `<IS_HOME>/repository/components/lib`
3. Configure the `deployment.toml` file of the instance based on your caching requirements.
   Fore more information, see [Distributed Cache Configurations](../learn/distributed-caching.md#wso2-open-banking-distributed-cache).
