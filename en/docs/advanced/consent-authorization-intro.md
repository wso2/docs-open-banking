During the consent authorization process, the banks redirect customers to provide consent for API consumers to access 
their banking information. The process is as follows:

1. API consumer requests to access the banking information of a customer.
2. Bank validates the API consumer’s request.
3. The bank redirects the requested information (containing the information the API consumer application wants to access)
to the customer.
4. The bank authenticates the customer. See below for the default login page of the consent page:
 
    ![login-consent-page](../assets/img/develop/customizing-consent-page/login-of-consent-page.png)
    
5. The customer can view the information before consenting or denying it. For example,
    ![information-consent-page](../assets/img/develop/customizing-consent-page/information-in-the-consent-page.png)
 
##Consent Authorization in WSO2 Open Banking Accelerator

Following components perform the consent authorization:

###Authorization endpoint
Before the API consumer application accesses the customer's banking information, the API consumer sends an authorization 
request to get the customer's consent for it. The authorization request contains a request object. This request object is 
a self-contained JWT, which helps banks to validate the API consumer.

The method of sending the authorization request can vary as follows:

- **Send the authorization details in the authorization URL**

The API consumers share the request object containing the authorization details to the authorization server and obtain the 
authorization URL.

- **Send the authorization details as a reference in the authorization URL**

The API consumers push authorization details directly to the authorization server and obtain a reference. This method is also 
known as **Pushed Authorization**. The reference is notated by the claim; `request_uri`. Thereby, it prevents:
                                                                                         
- Intruders from intercepting the authorization information sent in the request_object
- Authorization request calls becoming bulky with the authorization details signed in the JWT

and protects the confidentiality and integrity of the authorization details when passing through an API consumer application.

###Authorization web application 
The API consumers obtain an authorization URL that redirects the customer to a web interface. In this web application, the customer:

- Logs in using the login credentials. 
- Views information that the API consumer requested to access.
- Selects the accounts that the API consumer can access.
- Provides consent to the API consumer to access the information.

###Identifier-first authenticator
Banks use Identifier-first authentication to authenticate the user with a second-factor authenticator instead of a password. 
The user who logs into the authorization web application, can provide the username, and authenticate using a second-factor 
authentication mechanism such as SMS-OTP/TOTP. 
