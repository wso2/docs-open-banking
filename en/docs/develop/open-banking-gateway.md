The Open Banking API Manager Accelerator contains Open Banking Gateway, which is built on top of WSO2 API Gateway. 
WSO2 API Gateway intercepts API requests and applies policies such as throttling and security using handlers. 
By default, it supports policies such as API authentication, rate-limiting, schema validation, and Transport Layer 
Security. It is also instrumental in gathering API usage statistics. For more information, refer to 
[WSO2 API Manager documentation](https://apim.docs.wso2.com/en/latest/learn/api-gateway/overview-of-the-api-gateway).

In addition to WSO2 API Gateway features, Open Banking Gateway consists of features that support open banking specific 
scenarios. The additional features are as follows:

- [Request Routers](custom-request-router.md)
- [Open Banking Executors](custom-gateway-executor.md)
- [Custom Throttling Keys](custom-throttling-keys.md)
- [Custom Data Publishing](custom-data-publishing.md)
