Client-Initiated Backchannel Authentication (CIBA) requires a mobile application that is running on the bank customer’s 
mobile phone. This app is used to authenticate the customer and their consent during the CIBA flow. This page 
explains how to develop a mobile app that supports CIBA.

!!! tip
    You can start by developing a mobile app that can communicate with the WSO2 Identity Server as the first step.
    This can be extended to support the CIBA flow.

## Use cases of mobile application

Listed below are the basic use cases of the mobile app:

- Register the device in the specified cloud messaging service. Currently, WSO2 Identity Server supports only the 
[Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging) for CIBA.
- Register the device in the authorization server (in this scenario WSO2 Identity Server). If you integrate a QR code 
scanner into the app, you can easily feed the user registration data from the authorization server to the app via 
a QR code.
- Display and process notifications received from the authorization server via the cloud messaging service. You need to 
invoke the consent retrieval APIs of the authorization server using the data available in the notification message.
- Display consent details and obtain the user’s approval/denial.
- Perform biometric authentication of the user before approval submission.
- Submit user approval status to the authorization server. You need to invoke the consent persistence APIs of the 
authorization Server if the approval status is successful.
- Unregister a device from the authorization server.
- Display provided consents.

## WSO2 Recommendations

- WSO2 provides a [Software Development Kit (SDK)](#react-native-sdk-auth-push-react-native) in 
[React Native](https://reactnative.dev/) with the support to implement all basic features required in a mobile 
app that supports CIBA. Therefore, WSO2 recommends developing the mobile app using React Native.

- If you have an existing app written based on different frameworks or if you prefer any other framework/language,
the WSO2 React Native SDK can be used as guidance for your development.

- Use [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging) as the registered cloud messaging 
service in your mobile app. Currently, this is a mandatory requirement and other cloud messaging services will 
be supported in future releases.

## React Native SDK (auth-push-react-native)

WSO2 provides a React Native SDK known as `auth-push-react-native` and is available at 
[wso2-extensions/identity-outbound-auth-push](https://github.com/wso2-extensions/identity-outbound-auth-push/tree/master/sdk)
This section provides an overview of this SDK.

To install the package:

   ```shell tab="For npm"
   npm install @wso2/auth-push-react-native
   ```
    
   ```shell tab="For yarn"
   yarn add @wso2/auth-push-react-native
   ```

The SDK has provides the following functionalities that can be used for your app development:

- `addAccount(qrData: DiscoveryDataInterface, pushId: string)`:  to register the device in the authorization server as 
an account
- `processAuthRequest(request: JSON)`:  to process the data received from the push notification as an 
`AuthRequestInterface` object
- `sendAuthRequest(authRequest: AuthRequestInterface, response: string, account: Account)`: to send the authentication 
response to the Identity Server once the user authorizes/denies the request.
- `removeAccount(account: AccountsInterface)`: request within the app to unregister the device from the 
account in the Identity Server 

For more details including the APIs and the data models available in the SDK, see 
[wso2-extensions/identity-outbound-auth-push](https://github.com/wso2-extensions/identity-outbound-auth-push/blob/master/sdk/README.md).

!!! note
    This auth-push-react-native SDK is not published to the npm registry yet. You can obtain the source code of the SDK 
    from [here](https://github.com/wso2-extensions/identity-outbound-auth-push/tree/master/sdk) then build and add the 
    package to your mobile app project.

## Identity Server APIs to invoke

This section explains the WSO2 Identity Server APIs that need to be invoked.

### push-auth/discovery-data endpoint

Invoke the `push-auth/discovery-data` endpoint to retrieve device registration information for a particular user who 
wishes to register their device. This is a secured endpoint and requires a bearer token bound to the user.

Pass the response of this request to the `addAccount()` method of the SDK as the `qrData` parameter.

Invoke this API within the bank user portal, convert the response to a QR code and display it to the user. Therefore, 
the mobile app should contain a QR code scanner. 

 ``` tab="Request"
 GET https://<IS_SERVER_HOST>:<PORT>/api/users/v1/me/push-auth/discovery-data
 ```

 ``` tab="Request"
 {
    "did":"014e502a-cdff-43bd-9705-ad0ceb6dd351",
    "un":"admin@wso2.com",
    "td":"carbon.super",
    "hst":"https://192.168.8.193:9446",
    "bp":"/t/carbon.super/api/users/v1/me",
    "re":"/push-auth/devices",
    "ae":"/push-auth/authenticate",
    "rde":"/push-auth/devices/remove",
    "chg":"82e33587-ba35-440e-8f73-d3542a859da8"
 }
 ``` 

### push-auth/devices endpoint

The SDK invokes the `push-auth/devices` endpoint within the `addAccount()` method to register the device in the 
authorization server/WSO2 Identity Server.

  ```curl
  GET https://localhost:9446/api/users/v1/me/push-auth/devices
  ```

### push-auth/authenticate endpoint

The SDK invokes the `push-auth/authenticate` endpoint within the `sendAuthRequest()` method to send the consent 
authorization status (approved/denied) to the authorization server/WSO2 Identity Server.

## Integrate Firebase to mobile application

### Develop the mobile application

Assuming that your  app will be developed using React Native:

1. Create your React Native project.
2. Set up the [FCM SDK](https://firebase.google.com/docs/cloud-messaging/android/client#kotlin+ktx). 
For example, `@react-native-firebase/messaging`
3. Use the FCM SDK to register your device in the [Firebase cloud project](). Once you run this app on a device, generate 
an FCM token for your device 

    !!! note
        FCM token is referred to as the `pushId` in the `auth-push-react-native` SDK API.

### Set up a Firebase Cloud Project and application

!!! tip
    - This guide provides instructions for an **Android app**. 
    - Add a separate app in the same Firebase Cloud Project for IOS and configure the `<your-project-name>/ios/` section 
      of your app accordingly.

1. Go to the [Firebase console](https://console.firebase.google.com/u/0/).
2. Create a new Firebase project.
3. Go to **Project Overview** and add Firebase to your Android app.
4. Register the app with the necessary details.
5. Download the `google-services.json` file and place it inside the `<your-project-name>/android/app/` directory.
6. Follow the steps suggested by the Firebase console to configure your app in order to use Google Firebase dependencies.
7. Run your app in an Android emulator/connected Android device.

    !!! note
        When configuring WSO2 Identity Server for the CIBA flow, the **Server Key** of the FCM project you created above will be
        used. It will be referred to as the **FIREBASE_SERVER_KEY**. 

8. Go to **Firebase Console > Project Overview > Project Settings > Cloud Messaging API** and copy the **Server Key**.