## Writing a custom Application Management Listener 

The Application Management Listener contains an extension. According to your requirements, you can extend and override 
the methods in the `ApplicationUpdaterImpl` class to support the following functions:

- Setting authenticators
- Setting a conditional authentication script
- Publishing data during application creation, update and deletion
- Enabling specific OAuth 2.0 properties in the created application such as ID token encryption, pkce support
- Storing additional details regarding the application as metadata.

To achieve the above, extend the following class.
``` java
com.wso2.finance.openbanking.accelerator.identity.listener.application.ApplicationUpdaterImpl
```

To extend the validation capabilities according to your requirements, override relevant methods of this class. 
Given below is a brief description of each method.

### setOauthAppProperties method
This method lets you enable OAuth 2.0 properties related to the application. For example, ID token encryption.

``` java
public void setOauthAppProperties(boolean isRegulatoryApp, OAuthConsumerAppDTO oauthApplication)
throws OpenBankingException {

  oauthApplication.setIdTokenEncryptionEnabled(true);
  oauthApplication.setIdTokenEncryptionAlgorithm("RSA-OAEP");
}
```
### setServiceProviderProperties method

This method lets you store any additional details about the application, as metadata. 

!!! note
    The details sent during application registration are already stored as metadata, by default.

``` java
public void setServiceProviderProperties(boolean isRegulatoryApp, ServiceProvider serviceProvider, ServiceProviderProperty[] serviceProvideProperties)
throws OpenBankingException {
  // retrieve a list of existing service provider properties
  List < ServiceProviderProperty > spProperties = new ArrayList < > (Arrays.asList(serviceProvider.getSpProperties()));

  // create a new service provider property
  ServiceProviderProperty serviceProviderProperty = new ServiceProviderProperty();
  serviceProviderProperty.setValue(spPropertyValue);
  serviceProviderProperty.setName(spPropertyName);
  serviceProviderProperty.setDisplayName(spPropertyName);

  // add the created property to an existing list of properties
  spProperties.add(serviceProviderProperty);

  // set the modified list to the service provider
  serviceProvider.setSpProperties(spProperties.toArray(new ServiceProviderProperty[0]));

}
```
### setAuthenticators method
This method lets you configure authenticators to be invoked during the authorization flow.

``` java
public void setAuthenticators(boolean isRegulatoryApp, String tenantDomain,
  LocalAndOutboundAuthenticationConfig localAndOutboundAuthenticationConfig)
throws OpenBankingException {

  // add a local authenticator as the first authentication step
  List < AuthenticationStep > authSteps = new ArrayList < > ();
  // step 1 - default basic authentication
  LocalAuthenticatorConfig localAuthenticatorConfig = new LocalAuthenticatorConfig();
  LocalAuthenticatorConfig[] localAuthenticatorConfigs = new LocalAuthenticatorConfig[1];
  AuthenticationStep basicAuthenticationStep = new AuthenticationStep();
  localAuthenticatorConfig.setDisplayName(“authenticatorDisplayName”);
  localAuthenticatorConfig.setEnabled(true);
  localAuthenticatorConfig.setName(“authenticatorName”);
  localAuthenticatorConfigs[0] = localAuthenticatorConfig;

  basicAuthenticationStep.setStepOrder(1);
  basicAuthenticationStep.setLocalAuthenticatorConfigs(localAuthenticatorConfigs);
  basicAuthenticationStep.setAttributeStep(true);
  basicAuthenticationStep.setSubjectStep(true);
  // set step 1
  authSteps.add(basicAuthenticationStep);

  // set up a federated authenticator as the second step

  // get the name of the pre-configured Identity provider from the config. 
  String idpName = “IDP Name”
  if (StringUtils.isNotEmpty(idpName)) {
    IdentityProvider configuredIdentityProvider = null;
    try {
      IdentityProvider[] federatedIdPs = identityExtensionsDataHolder
        .getApplicationManagementService().getAllIdentityProviders(tenantDomain);
      // filter out the configured IDP from the list of registered IDPs
      if (federatedIdPs != null && federatedIdPs.length > 0) {
        for (IdentityProvider identityProvider: federatedIdPs) {
          if (idpName.equals(identityProvider.getIdentityProviderName())) {
            configuredIdentityProvider = identityProvider;
            break;
          }
        }
      }
      // step 2 - federated authentication
      if (configuredIdentityProvider != null) {
        IdentityProvider[] identityProviders = new IdentityProvider[1];
        identityProviders[0] = configuredIdentityProvider;

        AuthenticationStep federatedAuthStep = new AuthenticationStep();
        federatedAuthStep.setStepOrder(2);
        federatedAuthStep.setFederatedIdentityProviders(identityProviders);
        // set step 2
        authSteps.add(federatedAuthStep);
      }

      if (logger.isDebugEnabled()) {
        logger.debug("Authentication step 2 added: " + idpName);
      }
    } catch (IdentityApplicationManagementException e) {
      throw new OpenBankingException("Error while reading configured Identity providers", e);
    }

  }
  // set all the configured auth steps in the auth configuration
  localAndOutboundAuthenticationConfig.setAuthenticationSteps(authSteps.toArray(new AuthenticationStep[0]));
}

}
```

!!! tip
    You can change the name of the Identity Provider by configuring the following tag in the 
    `<IS_HOME>/repository/conf/deployment.toml` file. For example:
    ``` xml
    [open_banking.sca.idp]
    name = "SMSAuthentication"
    ```

### setConditionalAuthScript method
This method lets you set a [conditional authentication script](https://is.docs.wso2.com/en/5.11.0/learn/using-opa-policies-for-adaptive-auth/#configure-the-adaptive-authentication-script). 
Using this script, you can dynamically set the authentication steps according to the context.

``` java
public void setConditionalAuthScript(boolean isRegulatoryApp, LocalAndOutboundAuthenticationConfig localAndOutboundAuthenticationConfig) throws OpenBankingException {

  if (isRegulatoryApp) {
    TextFileReader textFileReader = TextFileReader.getInstance();
    try {
      String authScript = textFileReader.readFile(IdentityCommonConstants.CONDITIONAL_COMMON_AUTH_SCRIPT_FILE_NAME);
      // the {IS_HOME}/repository/conf/common.auth.script.js authentication script is set by default 
      if (StringUtils.isNotEmpty(authScript)) {
        AuthenticationScriptConfig scriptConfig = new AuthenticationScriptConfig();
        scriptConfig.setContent(authScript);
        scriptConfig.setEnabled(true);
        localAndOutboundAuthenticationConfig.setAuthenticationScriptConfig(scriptConfig);
      }
    } catch (IOException e) {
      throw new OpenBankingException("Error occurred while reading file", e);
    }
  }
}
```

### publishData method
This method lets you publish data during application creation.

### doPreCreateApplication method
Use this method to implement any logic that needs to be executed before application creation.

### doPostGetApplication method
Use this method to implement any logic that needs to be executed after retrieving application details.

### doPreUpdateApplication method
This method is executed before updating a created application. When this is executed the following methods are invoked 
by default. If required, the default order can be changed.

- setAuthenticators method
- setConditionalAuthScript
- setServiceProviderProperties method 
- setOauthAppProperties method
- publishData method

Any logic that needs to be executed before or after the default logic of the `doPreUpdateApplication` method can be 
implemented after invoking its `super()` method.

### doPreDeleteApplication method
Use this method to implement any logic that needs to be executed before application deletion.

### doPostDeleteApplication method
Use this method to implement any logic that needs to be executed after application deletion. For example, 
publishing data.

## Configuring a custom Application Management Listener 

1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.

2. Add the following tag and configure the classpath of the extended class. For example:
``` xml
[open_banking.dcr]
applicationupdater = "com.wso2.finance.openbanking.accelerator.identity.listener.application.ApplicationUpdaterImpl"
```
