## Writing a custom DCR validator

You can customize the validations performed in the 
[Dynamic Client Registration (DCR)](../advanced/dynamic-client-registration.md) process according to your 
specification and other requirements. 

To implement custom validations, extend the following class.
````
com.wso2.finance.openbanking.accelerator.identity.dcr.validation.DefaultRegistrationValidatorImpl 
````
This class performs the following validations, by default:
 - Validates the signature of SSA
 - Validates whether the requested algorithms such as id token signing algorithm, request object signing algorithm, 
 token endpoint authentication signing algorithm are allowed by the banks
 - Validates whether the issuer of the jwt is the same as the software id of the SSA

!!! note
    The `com.wso2.finance.openbanking.accelerator.identity` JAR file inside 
    the `<OB_IAM_ACCELERATOR>/dropins` directory contains all the Java implementation related to DCR validators. 

To extend the validation capabilities according to your open banking specification requirements, override relevant 
methods of this class. Given below is a brief description of each method.

### validatePost method
 
 This method validates the attributes sent in the registration creation request. If the validations fail,  
 the method throws an exception. 
````
 public void validatePost(RegistrationRequest registrationRequest) throws DCRValidationException {
   String applicationType = registrationRequest.getApplicationType();
   if (!"web".equalsIgnoreCase(applicationType)) {
     throw new DCRValidationException(DCRCommonConstants.INVALID_META_DATA, "Invalid client meta data sent for application type", "Application type sent is not allowed");
   }
 }
````

??? tip "Click here to see how to write validations:"
    
    - Extend the `DefaultRegistrationValidatorImpl` class to validate `RegistrationRequest` according to your 
    specification requirements. Given below is the `ExtendedRegistrationValidatiorImpl` class that is extended from
      `DefaultRegistrationValidatorImpl`.
    - Then extend the `RegistrationRequest`. For exmple, the `ExtendedRegistrationRequest` class below is extended 
    from `RegistrationRequest`.
    - Use the `validatePost` method in `ExtendedRegistrationValidatiorImpl` class to validate 
    `ExtendedRegistrationRequest`.
          
    For example,
    ```` java
    public class ExtendedRegistrationValidatiorImpl extends DefaultRegistrationValidatorImpl {
    
      @Override
      public void validatePost(RegistrationRequest registrationRequest) throws DCRValidationException {
    
        ExtendedRegistrationRequest extendedRegistrationRequest = new ExtendedRegistrationRequest(registrationRequest);
    
        /* Option 1: Using Hibernate Validator
        
        This method catches any constraint violation and creates relevant error messages using Hibernate Validator */
        ValidationUtils.validateRequest(extendedRegistrationRequest);
    
        /* Option 2: Using the default validation approach
        
        Validate the registration request and use the method below to implement the   validation logic */
        ValidationUtils.validateIssuer(extendedRegistrationRequest.getIssuer());
    
      }
   
      // Add the other CRUD validations here  
      
    }
    ````
    
    - To implement the `extendedRegistrationRequest` class, extend `RegstrationRequest` as follows:

    ```` java
    public class ExtendedRegistrationRequest extends RegistrationRequest {
    
      private RegistrationRequest registrationRequest;
    
      public ExtendedRegistrationRequest(RegistrationRequest registrationRequest) {
    
        this.registrationRequest = registrationRequest;
      }
    
      public RegistrationRequest getRegistrationRequest() {
    
        return registrationRequest;
      }
    
      // Override the required getters and setters as required
      
    }
    ````
    
    - If you are using Hibernate Validator:
    
    To add class level and attribute annotations, use the `ExtendedRegistrationRequest` model class. 
    Given below is a sample validation. Follow this approach to perform validations. 
    
    For example, adding class-level annotation for model class `ExtendedRegistrationRequest` to validate redirect 
    URIs in the registration request. 

    ```` java
    @ValidateCallbackUris(registrationRequestProperty = "registrationRequest", callbackUrisProperty = "redirectUris",
      ssa = "softwareStatement", message = "Invalid callback uris:" + DCRCommonConstants.INVALID_META_DATA,
      groups = AttributeChecks.class)
    public class ExtendedRegistrationRequest extends RegistrationRequest {
    
      // Add the class implementation here
    }
    ````
    
    - Annotation class for `ValidateCallbackUris`
    
    ```` java
    @Target(ElementType.TYPE)
    @Retention(RUNTIME)
    @Documented
    @Constraint(validatedBy = {
      CallbackUrisValidator.class
    })
    public @interface ValidateCallbackUris {
    
      String message() default "Invalid callback uris";
    
      Class < ? > [] groups() default {};
    
      Class < ? extends Payload > [] payload() default {};
    
      String registrationRequestProperty() default "registrationRequestProperty";
    
      String callbackUrisProperty() default "callbackUrisProperty";
    
      String ssa() default "ssa";
    }
    ```` 
    - `CallbackUrisValidator` to perform the validation logic
    
    ```` java
    public class CallbackUrisValidator implements ConstraintValidator < ValidateCallbackUris, Object > {
    
      // Override the initialize(T constrainAnnotation) method if required
    
      // Override isValid() with the validation logic
    
      // The sample isValid() method impelementatio contains the redirect URI validation logic
    
      @Override
      public boolean isValid(Object extendedRegistrationRequest, ConstraintValidatorContext constraintValidatorContext) {
    
        try {
    
          RegistrationRequest registrationRequest = (RegistrationRequest) new PropertyUtilsBean()
            .getProperty(extendedRegistrationRequest, registrationRequestPath);
          String softwareStatement = BeanUtils.getProperty(extendedRegistrationRequest, ssaPath);
          List < String > callbackUris = registrationRequest.getCallbackUris();
          if (callbackUris != null && !callbackUris.isEmpty()) {
            final Object ssaCallbackUris = ValidatorUtils.decodeRequestJWT(softwareStatement, "body")
              .get(ValidationConstants.SSA_REDIRECT_URIS);
    
            return matchRedirectURI(callbackUris, ssaCallbackUris);
          }
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException e) {
          log.error("Error while resolving validation fields", e);
          return false;
        } catch (ParseException e) {
          log.error("Error while parsing the softwareStatement", e);
          return false;
        }
        return true;
      }
      
    }
    ````
    
### validateGet method

 This method validates particular details before retrieving the registered client data. If the validations fail, 
 the method throws an exception. 

###  validateDelete method

 This method validates particular details before deleting a registered application.

### validateUpdate method

 This method validates the attributes sent in an update request. If the validations fail, the method throws an exception.
 
!!! tip
    As the registration request and update request are similar to each other. When implementing the `validateUpdate` 
    method use the same approach as explained in the `validatePost` method.

### setSoftwareStatementPayload method

 This method is to add/update the SSA model according to an open banking specification or any other requirements, 
 which is then saved as metadata.  
 
```` java
 public void setSoftwareStatementPayload(RegistrationRequest registrationRequest, String decodedSSA) {

   // Extend the SoftwareStatementBody model to include an SSA according to a specification
   SoftwareStatementBody softwareStatementPayload = new GsonBuilder().create()
     .fromJson(decodedSSA, SoftwareStatementBody.class);
   registrationRequest.setSoftwareStatementBody(softwareStatementPayload);

 }
````
??? tip "Click here to see how to write validations:"
    
    - Extend the `DefaultRegistrationValidatorImpl` class to validate `SoftwareStatementBody` according to your 
    specification. For example, the `ExtendedRegistrationValidatiorImpl` class given below is extended from 
    `DefaultRegistrationValidatorImpl`.
    - To create a `SoftwareStatementBody` according to your specification, extend `SoftwareStatementBody`. For example, 
    the `ExtendedSoftwareStatementBody` class given below is extended from `SoftwareStatementBody`. 
    - Use the `validatePost` method in the `ExtendedRegistrationValidatiorImpl` class to validate 
    `ExtendedSoftwareStatementBody`.
    - Use the `setSoftwareStatementPayload` method to set `ExtendedSoftwareStatementBody`.

      
    For example,
    
    ```` java
    public class ExtendedRegistrationValidatiorImpl extends DefaultRegistrationValidatorImpl {
    
      @Override
      public void validatePost(RegistrationRequest registrationRequest) throws DCRValidationException {
    
        ExtendedRegistrationValidatiorImpl extendedRegistrationRequest = new ExtendedRegistrationValidatiorImpl(registrationRequest);
    
        /* Option 1: Using Hibernate Validator
        
        This method catches any constraint violation and creates relevant error messages using Hibernate Validator 
        */
    
        String error = OpenBankingValidator.getInstance().getFirstViolation(extendedRegistrationRequest.getSoftwareStatementBody(), ValidationOrder.class);
        if (error != null) {
          String[] errors = error.split(":");
          throw new DCRValidationException(errors[1], errors[0]);
        }
    
        /* Option 2: Using the default validation approach
        
        Perform SSA claim validations and use the method below to implement the validation logic 
        */
    
        ValidatorUtils.validateSSAIssuer(extendedRegistrationRequest.getSoftwareStatementBody().getIss());
    
      }
      @Override
      public void setSoftwareStatementPayload(RegistrationRequest registrationRequest, String decodedSSA) {
    
        ExtendedSoftwareStatementBody extendedSoftwareStatementBody = new GsonBuilder().create()
          .fromJson(decodedSSA, ExtendedSoftwareStatementBody.class);
        registrationRequest.setSoftwareStatementBody(extendedSoftwareStatementBody);
      }
    
    }
    ````
    
    - To implement the `ExtendedSoftwareStatementBody` class, extend `SoftwareStatementBody` as follows:
    
    ```` java
    public class ExtendedSoftwareStatementBody extends SoftwareStatementBody {
    
      private String iss;
    
      @SerializedName("logo_uri")
      private String logoUri;
    
      // Follow the above and add any field according to your specification requirements
      
    }
    ````
    
    - If you are using Hibernate Validator:
   
    To add class level and attribute annotations, use the `ExtendedSoftwareStatementBody` model class. Given below is 
    a sample validation. Follow this approach to perform validations. 
    
    For example, adding attribute-level annotation for model class `ExtendedSoftwareStatementBody` to validate the 
    issuer in the software statement assertion (SSA).  

    ```` java
    public class ExtendedSoftwareStatementBody extends SoftwareStatementBody {
    
      private String iss;
    
      @SerializedName("logo_uri")
      private String logoUri;
    
      // Follow the above and add any field according to your specification requirements
    
      @ValidateSSAIssuer(message = "Invalid Issuer in software statement:" + DCRCommonConstants.INVALID_META_DATA,
        groups = AttributeChecks.class)
      @NotBlank(message = "Issuer Roles can not be null or empty in SSA:" + DCRCommonConstants.INVALID_META_DATA,
        groups = MandatoryChecks.class)
      public String getIss() {
    
        return iss;
      }
    
      public void setIss(String iss) {
    
        this.iss = iss;
      }
      
    }
    ````
    
    - Annotation class for `ValidateSSAIssuer`
    
    ```` java
    @Target(ElementType.METHOD)
    @Retention(RUNTIME)
    @Documented
    @Constraint(validatedBy = {
      SSAIssuerValidator.class
    })
    public @interface ValidateSSAIssuer {
    
      String message() default "Invalid issuer in software statement";
    
      Class < ? > [] groups() default {};
    
      Class < ? extends Payload > [] payload() default {};
    }
    ````
    
    - `SAIssuerValidator` to perform the validation logic
    
    ```` java
    public class SSAIssuerValidator implements ConstraintValidator < ValidateSSAIssuer, Object > {
    
      private static final Log log = LogFactory.getLog(SSAIssuerValidator.class);
    
      @Override
      public boolean isValid(Object issuer, ConstraintValidatorContext constraintValidatorContext) {
    
        return CDSValidationConstants.CDR_REGISTER.equals(issuer);
      }
      
    }
    ````

### getRegistrationResponse method

 This method creates responses for application registration, update, and retrieval requests. This gives you the 
 flexibility to customize the response to return different attributes based on your requirements. 
 
```` java
public String getRegistrationResponse(Map < String, Object > spMetaData) {

  Gson gson = new Gson();
  JsonElement jsonElement = gson.toJsonTree(spMetaData);
  RegistrationResponse registrationResponse = gson.fromJson(jsonElement, RegistrationResponse.class);
  return gson.toJson(registrationResponse);

}
````

??? tip "Click here to see how to customize the response:"
    - Create the response of the registration request by extending the `DefaultRegistrationValidatorImpl` class. 
      For example, see the `ExtendedRegistrationValidatiorImpl` class given below .
    - Set `RegistrationResponse` using the `ExtendedRegistrationResponse` class and its `getRegistrationResponse` method 
    as shown below.
    
    ```` java
    public class ExtendedRegistrationValidatiorImpl extends DefaultRegistrationValidatorImpl {
    
      @Override
      public String getRegistrationResponse(Map < String, Object > spMetaData) {
    
        Gson gson = new Gson();
        JsonElement jsonElement = gson.toJsonTree(spMetaData);
        ExtendedRegistrationResponse extendedRegistrationResponse = gson.fromJson(jsonElement, ExtendedRegistrationResponse.class);
        return gson.toJson(extendedRegistrationResponse);
      }
      
    }
    
    ````
    
    - To implement the ExtendedRegistrationResponse class, extend RegistrationResponse as follows:  
  
    ````
    public class ExtendedRegistrationResponse extends RegistrationResponse {
    
      @SerializedName(value = "client_name")
      private String clientName;
    
      @SerializedName("client_description")
      private String clientDescription;
    
      @SerializedName("client_uri")
      private String clientUri;
    
      // Add getters and setters according to your requirements
    
    }
    ````
    
## Configuring a custom DCR validator

1. Open the `<IAM_HOME>/repository/conf/deployment.toml` file.
2. Find the following configuration and replace that with your extended class. By default the 
`DefaultRegistrationValidatorImpl` class is configured as follows: 
````xml
[open_banking.dcr]
validator = "com.wso2.finance.openbanking.accelerator.identity.dcr.validation.DefaultRegistrationValidatorImpl"
````
3. Configure the jwks endpoint that is used for validating the SSA signature. 
```xml
[open_banking.dcr]
jwks_url_sandbox = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/9b5usDpbNtmxDcTzs7GzKp.jwks"
jwks_url_production = "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/9b5usDpbNtmxDcTzs7GzKp.jwks"
```       
4. Configure the algorithms that are allowed during signature validation. These algorithms are used for token endpoint 
authentication assertion signature, request object signature, and id token signature validations.
```xml
[[open_banking.signature_validation.allowed_algorithms.algorithms]]
algorithm = "PS256"
```

!!! note "Configuring DCR request parameters" 
    - According to your specification different types of values are allowed in the registration request. WSO2 Open 
    Banking Accelerator provides the capability to configure the parameters and the values they allow.
        - Open the `<IAM_HOME>/repository/conf/deployment.toml` file.
        - By default, the following values are configured as mandatory parameters. To configure 
        the allowed values for them, open the `<IAM_HOME>/repository/conf/deployment.toml` file and add the following 
        tags.
            
              ````xml
              [open_banking.dcr.registration.issuer] 
              allowed_values = ["value1, value2, value3”]
               
              [open_banking.dcr.registration.audience] 
              allowed_values = ["value1, value2, value3”]
              
              [open_banking.dcr.registration.token_endpoint_authentication] 
              allowed_values = ["value1, value2, value3”]
              
              [open_banking.dcr.registration.id_token_signed_response_alg] 
              allowed_values = ["value1, value2, value3”]
              
              [open_banking.dcr.registration.software_statement] 
              allowed_values = ["value1, value2, value3”]
              
              [open_banking.dcr.registration.grant_types] 
              allowed_values = ["value1, value2, value3”]
              ````
      
           - If you want to make any of the above parameters optional, add the `required` tag and set it `false`. For 
           example:
              ````xml
              [open_banking.dcr.registration.issuer]
              required = true
              allowed_values = ["accounts", "payments"]
              ````
              
    - By default, the following values are configured as optional parameters. To configure 
    the allowed values for them:
        - Open the `<IAM_HOME>/repository/conf/deployment.toml` file, add the relevant tags and configure the values 
        allowed.
         
            ````xml
            [open_banking.dcr.registration.scope]
            allowed_values = ["accounts", "payments"]
            
            [open_banking.dcr.registration.application_type] 
            allowed_values = ["web"]
            
            [open_banking.dcr.registration.response_types]  
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.callback_uris]  
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.token_endpoint_auth_signing_alg] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.software_id] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.id_token_encryption_response_alg] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.id_token_encryption_response_enc] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.request_object_signing_algorithm] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.tls_client_auth_subject_dn] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.backchannel_token_delivery_mode] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.backchannel_authentication_request_signing_alg g] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.backchannel_client_notification_endpoint] 
            allowed_values = ["value1, value2, value3”]
            
            [open_banking.dcr.registration.backchannel_user_code_parameter_supported] 
            allowed_values = ["value1, value2, value3”]
     
            ```` 
        
           - If you want to make any of the above parameters mandatory, add the `required` tag and set it `true`. 
           For example:
        ````xml
        [open_banking.dcr.registration.scope]
        required = true
        allowed_values = ["accounts", "payments"]
        ````