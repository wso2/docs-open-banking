# Custom Request Object Validator

## Writing a Custom Request Object Validator[​](#writing-a-custom-request-object-validator "Direct link to Writing a Custom Request Object Validator")

A Request Object contains authentication and authorization request parameters in a self-contained JWT. It is used in the authorization endpoint of WSO2 Identity Server. Banks can use this authorization endpoint to redirect the bank customer to authenticate and approve/deny consents before an API consumer accesses financial information.

In WSO2 Open Banking Accelerator, the Request Object validator uses its existing validation layer to enforce validations. By default, it consists of 3 validations:

* `@RequiredParameter` checks if the Request Object is signed.
* `@ValidScopeFormat` checks if the scope claim contains an OpenID Connect(OIDC) scope.
* `@ValidAudience` checks if the audience claim matches the token endpoint URL.
* `@ValidSigningAlgorithm` checks if the correct signing algorithm is used.

For more information on the validation layer in WSO2 Open Banking Accelerator, see [Validation Layer](/en/3.0.0/develop/validation-layer/.md).

You can extend the default validations in WSO2 Open Banking Accelerator and add more validations according to your open banking requirement:

1. To implement a custom Request Object validator, extend the following class:

   ```
   com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.OBRequestObjectValidator
   ```

2. Add the required validations as annotations to the model.

   note

   For annotations, you can use:

   * Hibernate Validator Library
   * WSO2 Open Banking Accelerator
   * Custom annotations

3. Extend `OBRequestObjectValidator` and create your own class.

### validateOBConstraints method[​](#validateobconstraints-method "Direct link to validateOBConstraints method")

This method performs the custom validations you add. Given below is the method signature:

```
public ValidationResponse validateOBConstraints(OBRequestObject obRequestObject, Map<String, Object> dataMap) 
```

note

The `dataMap` parameter contains data related to scope validation at the moment. This `dataMap` parameter provides the scope registered for the service provider application. Therefore, this can be used to validate the scopes given in the Request Object according to your requirement.

* Type cast `OBRequestObject` to your own model using the following sample:
  <!-- -->
  ```
    UKRequestObject ukRequestObject = new UKRequestObject(obRequestObject);
  ```

<!-- -->

4. To make sure the default validations of the Request Object executes, validate your new model, which is inherited from `obRequestObject` as follows:
   <!-- -->
   ```
   String error = OpenBankingValidator.getInstance().getFirstViolation(yourInheritedNewModel);
   ```

## Configuring a custom Request Object Validator[​](#configuring-a-custom-request-object-validator "Direct link to Configuring a custom Request Object Validator")

1. Make sure the following configuration exists in `<IS_HOME>/repository/conf/deployment.toml`:

   ```
   [oauth.oidc.extensions]

   request_object_validator = "com.wso2.openbanking.accelerator.identity.auth.extensions.request.validator.OBRequestObjectValidationExtension"
   ```

2. Update the following configuration in `<IS_HOME>/repository/conf/deployment.toml` with your extended class:

   ```
   [open_banking.identity.extensions]

   request_object_validator = "your.extended.class"
   ```
