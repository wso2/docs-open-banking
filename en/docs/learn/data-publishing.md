###Introduction
The Data Publishing feature gathers and monitors data in regard to the APIs invoked through WSO2 Open Banking Accelerator. 
WSO2 Open Banking Business Intelligence Accelerator captures the data through Identity Server and API Manager servers and
process them. You can summarize data in a way that banks can generate reports and summaries according to your open banking 
requirements. See the following diagram to understand how WSO2 Open Banking Accelerator has implemented data publishing. 
![data-publishing-overview](../assets/img/learn/data-publishing/data-publishing-overview.png)

WSO2 Open Banking Business Intelligence accelerates the data publishing functions on top of the base product, WSO2 Streaming Integrator and 
captures the following types of data from WSO2 Open Banking Identity Server and WSO2 Open Banking API Management instances.

- **Performance and availability**: Understands and monitors the availability and performance of the supported APIs.
- **Adoption**:  Identifies the effectiveness of how a bank adopted open banking to their legacy systems.
- **Data**: The efficacy of the open banking standards as a part of ongoing standards management activity.

WSO2 Open Banking Identity Server and WSO2 Open Banking API Manager send the captured data to WSO2 Open Banking Business 
Intelligence. **Thrift** is the standard protocol for data publishing although WSO2 Open Banking Business Intelligence supports 
other protocols such as HTTP, gRPC, or any other data publishing protocol.

WSO2 Streaming Integrator stores the published data in a database so that you can create a Siddhi Application to summarize 
the data. Let’s see the common data elements that WSO2 Open Banking Identity Server publishes to WSO2 Open Banking Business 
Intelligence:

| Publishable Data | Description |Example|
|---------|---------|---------|
|`timestamp : long`|The timestamp parameter of the publishing function.|`1613327314`|
|`authenticationApproach: string`|Approach used for the authentication.|`redirect`|
|`userId: string`|ID of the user|`anne@gold.com / admin@wso2.com`|
|`authenticationStatus: string`|Authentication status.|`AuthenticationSuccessful`, `AuthenticationFailed`, `AuthenticationAttempted`|
|`authenticationStep : string`|The type of authentication step as enabled in the WSO2 Identity Server Management Console.|`BasicAuthenticator`,`SMSOTP`|

Following are the data elements that WSO2 API Manager publishes to WSO2 Open Banking Business Intelligence:

| Publishable Data | Description |Example|
|---------|---------|---------|
|`http_method : string`|The HTTP method to use during the endpoint invocation.|`/POST`|
|`userAgent : string`|Client device of the user.|`curl/7.68.0`|
|`electedResource : string`|API endpoint.|`/account-access-consents`|
|`apiName : string`|API name of the elected resource.|`AccountAndTransactionAPI`|
|`apiSpecVersion : string`|Version of the API.|`v3.1`|
|`clientId : string`|Client identifier of the application|`n0RYVfh4wOa81cze657hIw0EhEa`|
|`consentId : string`|Identifier for a consent initiation request.|`ffd2e946-acd0-49c9-9d45-d5983781f4b5`|
|`consumerId: string`|The email of the API consumer|`admin@wso2.com`
|`timestamp :  long`|The timestamp parameter of the publishing function.|`1560832453`|
|`statusCode : int`|Status code of the consent.|`200`|
|`messageId : string`|The status message responded to the status code.|`Ok`|
|`responsePayloadSize : long`|Size of the response payload.|`76`|
|`requestTimestamp: string`|Time when the request is made.|`2021-04-02T06:19:07.146Z`|
|`backendLatency: long`|Latency of the backend.|`923`|
|`requestMediationLatency: long`|The time taken for the request mediation. `(backendStartTime - requestInTime`|`2594`|
|`responseLatency: long`|The time duration between the request is sent and the response is received.|`3659`|
|`responseMediationLatency: long`|The time taken for the response mediation. `(responseMediationTime - backendTime)`|`142`|    

In addition to the above-mentioned data elements, you can publish data that are specific to your open banking standard. 
For information on the additional data elements that you can publish, see [Data Publishing Extensions](../develop/authentication-flow-for-data-publishing.md).

WSO2 Open Banking Accelerator has by default enabled data publishing in API gateway and authentication components. Additionally, 
you can publish any streams using a custom component. For more information, see [Custom Data Publishing](../develop/custom-data-publishing.md).

###Data Summarization
You can write a summarization script for the data stored using Siddhi Applications. For more information, see the WSO2 Streaming
Integrator documentation on [Summarizing Data](https://ei.docs.wso2.com/en/latest/streaming-integrator/guides/summarizing-data/). 