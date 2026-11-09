# Introspection Data Provider

Deprecated Documentation

This feature is **deprecated** and is only intended for migrating customers. Please transition to the **OpenAPI based extensions** for all new implementations.

WSO2 Open Banking Accelerator contains a default introspection data provider implementation in the `OBDefaultIntrospectionDataProvider` class.

## OBDefaultIntrospectionDataProvider[​](#obdefaultintrospectiondataprovider "Direct link to OBDefaultIntrospectionDataProvider")

You can use this class to add any additional properties to the introspection response.

```
com.wso2.openbanking.accelerator.identity.interceptor.OBDefaultIntrospectionDataProvider
```

### getIntrospectionData method[​](#getintrospectiondata-method "Direct link to getIntrospectionData method")

This method lets you add any additional properties to the response of the introspection request.

warning

Do not override the current implementation of the `getIntrospectionData` method.

To make sure the current implementation is intact, invoke the original implementation using the super keyword as shown below:

```
public Map < String, Object > getIntrospectionData(OAuth2TokenValidationRequestDTO oAuth2TokenValidationRequestDTO,

  OAuth2IntrospectionResponseDTO oAuth2IntrospectionResponseDTO)

throws IdentityOAuth2Exception {



  super.getKeyId(certificate, signatureAlgorithm, tenantDomain);



}
```
