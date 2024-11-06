#Event Notification

Open Banking Specifications require banks to notify any changes related to consent to the Third Party Application Provider (TPP). To achieve this, the specifications includes an API called the Event Notification API, including the flows and common functionality to allow a TPP to receive event notifications. 

The Event Notification feature in WSO2 Open Banking Accelerator provides a realtime service and a poll-based service. WSO2 Open Banking Accelerator supports following features:

- Event Subscription
- Event Creation
- Event Polling
- Real Time Event Notification

The Event Subscription facilitates the ability to subscribe to receive notifications about particular events of interest. The Event Creation allows storing event notification information as a JSON, which can be customized according to your use case. TPP can receive notifications either via realtime notification or aggregated polling. Real Time notification allows TPPs to receive notifications to the callbak URL registered immidiately after the event occured. The Event Polling facilitates retrieving event notifications via an API request according to the above specifications without altering the information in the event information JSON. All these endpoints are secured with basic authentication (admin username and password) and accept base64 encoded JSON.

The Event Notification API follows the **IETF Security Event Token (SET)** and the **Poll-Based Security Event Token (SET) Delivery Using HTTP**
specifications to serve general-purpose event notification creation and polling.
