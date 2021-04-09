Request Object passes authentication and authorization request parameters in a self-contained JWT. It is used in the 
authorization endpoint of WSO2 Open Banking Identity and Access Management. Banks can use this authorization endpoint 
to redirect the bank customer to authenticate and approve/deny consents before a third-party provider accesses financial 
information. 

In WSO2 Open Banking Accelerator, Request Object validator uses its existing validation layer to enforce validations. By 
default, it consists of 3 validations:

   - `@RequiredParameter` checks if the request object is signed.
   - `@ValidScopeFormat` checks if the scope claim contains an openid scope.
   - `@ValidAudience` checks if the audience claim matches the token endpoint URL.

For more information on the validation layer in WSO2 Open Banking Accelerator, see [Validation Layer](../develop/validation-layer.md).

You can extend the default validations in WSO2 Open Banking Accelerator and add more validations according to your open 
banking requirement:

1. Add the open-banking common dependency:
```
<dependency>
    <groupId>com.wso2.finance</groupId>
    <artifactId>openbanking-common</artifactId>
</dependency>
```

2. Extend `OBRequestObject` and create your own model. 
```
class OBRequestObject { 
     private String name;
     private Claims claims;
}

class Claims {
     private String aud;
     private String scope;
}
```

3. Add the required validations as annotations to the model. 

    !!!note
        For annotations, you can use:
    
        - Hibernate Validator Library
        - WSO2 Open Banking Accelerator
        - Custom annotations
    
4. extend `OBRequestObjectValidator` and create your own class.

    1. Override the `validateOBConstraints(OBRequestObject obRequestObject, Map<String, Object> dataMap)` method to 
    validate your custom validations. 
    
        !!!note
            `dataMap` contains data related to scope validation at the moment. This `dataMap` will provide scope registered for 
            the service provider application. Therefore, this can be used to validate the scopes given in the request object 
            according to your requirement.
    
    2. Type cast `OBRequestObject` to your own model using the following sample:
    ```
    UKRequestObject ukRequestObject = new UKRequestObject(obRequestObject);
    ```
   
5. To make sure the default validations of the request object executes, validate your new model, which is inherited 
from `obRequestObject` as follows:
```
String error = OpenBankingValidator.getInstance().getFirstViolation(yourInheritedNewModel);
```

6. Make sure the following configuration exists in <IS_HOME>/repository/conf/deployment.toml:
```
[oauth.oidc.extensions]
request_object_validator = "com.wso2.finance.openbanking.accelerator.identity.auth.extensions.request.validator.OBRequestObjectValidationExtension"
```

7. Add the class that you extended inheriting `OBRequestObjectValidator` to the following configuration in <IS_HOME>/repository/conf/deployment.toml: 
```
[open_banking.identity.extensions]
request_object_validator = "your.extended.class"
```
