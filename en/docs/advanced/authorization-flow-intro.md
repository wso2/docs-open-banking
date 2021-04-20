During the consent authorization process, the banks redirect customers to provide consent for API consumers to access 
their banking information. The process is as follows:

1. API consumer requests to access banking information of a customer.
2. Bank validates the API consumer’s request.
3. Bank displays customer the information that the API consumer wishes to access.
4. Bank authenticates the customer. 
5. Customer can view the information before consenting to it

##Authorization flow in WSO2 Open Banking Accelerator

WSO2 Open Banking Accelerator consists of the following components:

###Authorization endpoint
When the API consumer sends an authorization request before accessing banking information, it contains authorization 
parameters in a request object. This request object is a self-contained JWT, which helps banks to validate the API consumer.

The method of sending the authorization request can vary as follows:

- **Send the authorization details in the authorization URL**

API consumers share the request object containing the authorization details to the authorization server and obtain the 
authorization URL.

- **Send the authorization details as a reference in the authorization URL**

API consumers push authorization details directly to the authorization server and obtain a reference. This method is also 
known as **Pushed Authorization**. The reference is notated by the claim; `request_uri`. Thereby, it prevents:

- Intruders from intercepting the authorisation information sent in the request_object
- Authorisation request calls becoming large with the authorisation details signed in the JWT
and protects the confidentiality and integrity of the authorization details when passing through a third-party application.

###Authorization web application 
API consumers obtain an authorization URL that redirects the customer to a web interface. In this web application, the customer:

- Logs in using the login credentials. 
- Views information that the third-party provider requested to access.
- Selects the accounts that the third-party provider can access.
- Provides consent to the third-party provider to access the information.

###Identifier-first authenticator
Banks use Identifier-first authentication to authenticate the user with a second-factor authenticator instead of password. 
The user who logs into the authorization web application, can provide the username, and authenticate using a second-factor 
authentication mechanism such as SMS-OTP/TOTP. 
