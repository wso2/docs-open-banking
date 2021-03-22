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
 - Validates request signature
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
    You have two options to write your validations:
    
    - Option 1:
    
        If you are using Hibernate Validator, extend `DefaultRegistrationValidatorImpl` and `validatePost` method 
        according to your requirements. For example, the `ExtendedRegistrationValidatiorImpl` class given below is 
        extended from the `DefaultRegistrationValidatorImpl`.
        
    - Option 2:
    
        If you are using the getter methods, extend the `ExtendedRegistrationRequest` class and perform the validations 
        inside the validatePost method. 
        
    For example,
    ```` java
    public class ExtendedRegistrationValidatiorImpl extends DefaultRegistrationValidatorImpl {
    
      @Override
      public void validatePost(RegistrationRequest registrationRequest) throws DCRValidationException {
    
        ExtendedRegistrationRequest extendedRegistrationRequest = new ExtendedRegistrationRequest(registrationRequest);
    
        /* Option 1: Using Hibernate Validator
        
        This method catches any constraint violation and creates relevant error messages using Hibernate Validator */
        ValidationUtils.validateRequest(extendedRegistrationRequest);
    
        /* Option 2: Using getter method
        
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
    
      // Override initialize(T constatinAnnotation), if required
    
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
    You have two options to write your validations:
    
    - Option 1:
    
    If you are using Hibernate Validator, extend the `DefaultRegistrationValidatorImpl` class and override the 
    `validatePost` method. For example, the `ExtendedRegistrationValidatiorImpl` class given below is extended from the 
    `DefaultRegistrationValidatorImpl`.
    
    - Option 2:
    
    If you are using the getter methods, extend the `ExtendedSoftwareStatementBody` class and perform the validations 
    inside the validatePost method. Use the `setSoftwareStatementPayload` method to set `SoftwareStatementBody` 
    according to your requirement.
      
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
    
        /* Option 2: Using getter method
        
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

??? tip "Click here to see how to write validations:"
    - When writing custom validations, extend the `DefaultRegistrationValidatorImpl` class. For example, see the 
    `ExtendedRegistrationValidatiorImpl` class.
    
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

!!! note "Configure the following mandatory parameters for DCR" 
    - Open the `<IAM_HOME>/repository/conf/deployment.toml` file.
    - Verify the following parameters configured and their `required` tag is set to `true`.
        - Issuer
        - Audience
        - TokenEndPointAuthentication
        - IdTokenSignedResponseAlg
        - SoftwareStatement
        - GrantTypes
        
          For example, 
          ````xml
          [open_banking.dcr.registration.grant_types] 
          required = true 
          allowed_values = ["authorization_code", "refresh_token", “client_credentials”]
          ````
      
    - Rest of the DCR configurations are optional and by default, their `required` tag is set to `false`. For example,
    ````xml
    [open_banking.dcr.registration.application_type]
    allowed_values = ["web"]
    ````
    
    - Set the value of the required tag, according to your specification requirements
 