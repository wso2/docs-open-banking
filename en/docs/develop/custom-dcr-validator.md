## Writing a custom DCR validator

You can customize the validations performed in the 
[Dynamic Client Registration (DCR)](../learn/dynamic-client-registration.md) process according to your 
specification and other requirements. 

To implement custom validations, extend the following class.
````
com.wso2.openbanking.accelerator.identity.dcr.validation.DefaultRegistrationValidatorImpl
````
This class performs the following validations, by default:

 - Validates the signature of SSA
 - Validates whether the requested algorithms such as the signing algorithms of id token, request object, and 
 token endpoint authentication are allowed by the banks.
 - Validates whether the issuer of the jwt is the same as the software id of the SSA

!!! note
    The `com.wso2.openbanking.accelerator.identity` JAR file inside 
    the `<IS_HOME>/repository/components/dropins` directory contains all the Java implementation related to DCR validators. 

To extend the validation capabilities according to your open banking specification requirements, override relevant 
methods of this class. Given below is a brief description of each method.

### validatePost method
 
 This method validates the attributes sent in the registration creation request. If the validations fail, the method 
 throws an exception. 
 
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
    - Then extend the `RegistrationRequest` class. For example, the `ExtendedRegistrationRequest` class below is extended 
    from `RegistrationRequest`.
    - Use the `validatePost` method in `ExtendedRegistrationValidatiorImpl` class to validate 
    `ExtendedRegistrationRequest`.
          
    For example,
    ```` java
    public class ExtendedRegistrationValidatiorImpl extends DefaultRegistrationValidatorImpl {
    
      @Override
      public void validatePost(RegistrationRequest registrationRequest) throws DCRValidationException {
       
        /* Option 1: Using Hibernate Validator
        
        This method catches any constraint violation and creates relevant error messages using Hibernate Validator */
        
        ExtendedRegistrationRequest extendedRegistrationRequest = new ExtendedRegistrationRequest(registrationRequest); 
        ValidationUtils.validateRequest(extendedRegistrationRequest);
    
        /* Option 2: Using the default validation approach
        
        Validate the registration request and use the method below to implement the   validation logic */
        ValidationUtils.validateIssuer(registrationRequest.getIssuer());
    
      }
   
      // Add the other CRUD validations here  
      
    }
    ````
    
    - If you are using Hibernate Validator:
    
        - To add class level and attribute annotations, use the `ExtendedRegistrationRequest` model class.    
    
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
        
        - Given below is a sample validation. Follow this approach to perform validations. When adding class-level annotation for model class `ExtendedRegistrationRequest` to validate redirect URIs 
        in the registration request. 

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
 the method throws an exception. Given below is the method signature:
 
 ``` java
  @Override
  public void validateGet(String clientId) throws DCRValidationException {
 
  }
 ```

###  validateDelete method

 This method validates particular details before deleting a registered application. 
 Given below is the method signature:
 
  ``` java
   @Override
   public void validateDelete(String clientId) throws DCRValidationException {
   
   }
  ```

### validateUpdate method

 This method validates the attributes sent in an update request. If the validations fail, the method throws an exception.
 Given below is the method signature:
 
  ``` java
  @Override
  public void validateUpdate(RegistrationRequest registrationRequest) throws DCRValidationException {

  }
  ```
 
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
    
    - To create a `SoftwareStatementBody` according to your specification, extend `SoftwareStatementBody`. For example, 
    the `ExtendedSoftwareStatementBody` class given below is extended from `SoftwareStatementBody`. 

    - Use the `setSoftwareStatementPayload` method to set `ExtendedSoftwareStatementBody`.

      
    For example,
    
    ```` java
    public class ExtendedRegistrationValidatiorImpl extends DefaultRegistrationValidatorImpl {

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

 This method creates responses for registering, updating, and retrieving application requests. This gives you the 
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

    - Set the registration response using the `ExtendedRegistrationResponse` class and its `getRegistrationResponse` method 
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

Once you implement the customized validator you need to configure it in WSO2 Open Banking Accelerator. 
For steps to configure, refer to [Configuring Dynamic Client Registration](../learn/dynamic-client-registration-configuration.md).  
