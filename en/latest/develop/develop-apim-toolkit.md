# Introduction

The WSO2 Financial Services AM Component supports two approaches for extending and implementing its functionalities, as illustrated in the image below.

![AM\_Accelerator\_Extensions](/en/latest/assets/images/OB_Flows_with_OpenAPI_Extensions_AM-ba276794193bbe29fdb2c13d6ac036d1.png)

## API Policies[​](#api-policies "Direct link to API Policies")

With the release of Open Banking 4.0, Open Banking-specific API Manager runtime enforcements have been transitioned to standard WSO2 API Manager mediation policies, enabling API developers to configure them directly through the API Publisher GUI.

* [Creata an API Policy](/en/latest/learn/create-policies/.md)
* [Engage an API Policy to API](/en/latest/learn/engage-policies/.md)
* [Inbuilt Gateway Enforcements](/en/latest/learn/inbuilt-policies/.md)

### OpenAPI based extensions[​](#openapi-based-extensions "Direct link to OpenAPI based extensions")

With the release of Open Banking 4.0, it has introduced OpenAPI based extensions such that the toolkit developer can implement Open Banking specification requirements in their preferred programming language. And the custom developed extensions can be deployed externally and tested separately without restarting the WSO2 servers. The OpenAPI extension can be found from [here](/en/latest/references/accelerator-extensions-api/.md).

* [Developer Guide](/en/latest/develop/openapi/openapi-extensions-developer-guide-am/.md)
* [OpenAPI based extensions for Manual Client Registration](/en/latest/develop/openapi/openapi-extensions-mcr/.md)

## Java based extensions (Old approach)[​](#java-based-extensions-old-approach "Direct link to Java based extensions (Old approach)")

* [Open Banking Gateway](/en/latest/develop/java/open-banking-gateway/.md)
* [Open Banking Event Executor](/en/latest/develop/java/custom-event-executor/.md)
* [Data Publishing](/en/latest/develop/java/authentication-flow-for-data-publishing/.md)
