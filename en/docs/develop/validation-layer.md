You can use the validation layer in WSO2 Open Banking Accelerator to perform your business use case validations, for any
open banking requirement. WSO2 Open Banking Accelerator uses [Hibernate Validator](https://hibernate.org/validator/) to 
validate constraints making it easier to customize and reuse.

Let’s see how you can use the validation layer.

**Step 1**

Decide the Java model you want to validate in your implementation. For example, 

``` java
class OBRequestObject { 
     private String name;
     private Claims claims;
}

class Claims {
     private String aud;
     private String scope;
}
```

**Step 2**

Add the required validation annotations. You can use the annotations in:

   - Hibernate Validator Library
   - WSO2 Open Banking Accelerator
   - Your own custom annotations 
  
!!! note
    Accelerator annotations are targeted in the class level. By using them,
   
    - You can pass the field path to resolve the required variable annotations.
    - You can pass a custom error message in the message parameter when the constraint fails. 

For example,

``` java
class OBRequestObject { 
    @NotNull // annotation from Hibernate library
    private String name;
    private Claims claims;
}

@RequiredParameter(param = "aud", message = "Only requests with aud is accepted") // annotation from accelerator
class Claims {
     private String aud;
     private String scope;
     @Max(3600) // annotation from Hibernate library
     private int sharing_duration;
}
```

**Step 3**

Invoke the method that performs the validations from WSO2 Open Banking Accelerator. 

``` java
OpenBankingValidator openbankingValidator = OpenBankingValidator.getInstance();
String violation = openbankingValidator.getFirstViolation(requestObject);

if (violation != null) {
    //throw error using violation message
```
