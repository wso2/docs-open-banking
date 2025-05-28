You can use WSO2 Open Banking Accelerator capabilities and customize them according to your open banking requirements. 
This section guides you on how to develop a toolkit to customize the accelerator so you can comply with any 
regional open banking standard. 

## Extending Identity Server Accelerator extensions

The WSO2 Financial Services IS Accelerator supports two approaches for extending and implementing its functionalities, 
as illustrated in the image below.

![IS_Accelerator_Extensions](../assets/img/develop/openapi-extensions/OB_Flows_with_OpenAPI%20Extensions.png) 


### OpenAPI based extensions

With the release of Open Banking 4.0, it has introduced OpenAPI based extensions such that the toolkit developer can 
implement Open Banking specification requirements in their preferred programming language. And the custom developed 
extensions can be deployed externally and tested seperatly without restarting the WSO2 servers.The OpenAPI extension 
can be found from [here](../references/accelerator-extensions-api.md).


### Java based extensions (Old approach)

   - [Open Banking Service Activator](service-activator.md)
   - [Consent Management](consent-management-manage.md)
   - [Token Flow Customization](jwt-access-tokens.md)
   - [Authentication Flow](customize-authentication-steps.md)
   - [Authorization Flow](keyid-provider.md)
   - [Mobile Application for CIBA](mobile-application-for-ciba.md)
   - [Application Property Validation](application-property-validation.md)
   - [Dynamic Client Registration](application-management-listener.md)
   - [Event Notification](custom-event-notification.md)
  

## Extending API Manager extensions

### API Policies

With the release of Open Banking 4.0, Open Banking-specific API Manager runtime enforcements have been transitioned 
to standard WSO2 API Manager mediation policies, enabling API developers to configure them directly through the API Publisher GUI


### Java based extensions (Old approach)

- [Open Banking Gateway](open-banking-gateway.md)
- [Open Banking Event Executor](custom-event-executor.md)
- [Data Publishing](authentication-flow-for-data-publishing.md)

!!! note
    WSO2 provides toolkits that offer compliance to the following open banking standards:
    
    - [Open Banking Standard - UK](https://uk.ob.docs.wso2.com/)
    - [NextGenPSD2XS2A](https://berlin.ob.docs.wso2.com/)
    - [Consumer Data Standards - Australia](https://cds.ob.docs.wso2.com/)
    
