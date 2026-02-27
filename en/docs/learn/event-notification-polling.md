#Event Polling

The Event Polling API facilitates TPP applications to poll, acknowledge, and receive event notifications. . Event Polling API is secured with basic authentication (admin username and password) and accept base64 encoded JSON. The Event Polling API follows the **IETF Security Event Token (SET)** and the **Poll-Based Security Event Token (SET) Delivery Using HTTP** specifications to serve general-purpose event notification creation and polling.

Using this endpoint the banks can send event notifications as indicated by the application's polling parameters. API consumer applications have to communicate their polling parameters and event notification acknowledgements using this endpoint.

You can customize the Event Polling Flow according to your requirements. For more information, see [Customizing Event POlling](../develop/openapi-event-polling.md).

Based on the request payloads, the Event Polling(`POST /events`) endpoint performs the following:

- Poll for events
- Acknowledge the received events
- Acknowledge error notifications
- Poll for new events and acknowledge the received events at once

A sample Event Polling request is as follows:

   ``` 
    curl --location --request POST 'https://localhost:9446/api/fs/event-notifications/events' \
    --header 'Authorization: Basic YWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'request=eyAKICJyZXR1cm5JbW1lZGlhdGVseSI6IHRydWUsCiAibWF4RXZlbnRzIjogMCAKIH0='
   ```

!!! note
    The Event Polling(`/events`) endpoint supports the request payloads mentioned in the [Poll-Based Security Event Token (SET) Delivery Using HTTP](https://datatracker.ietf.org/doc/html/rfc8936) specification.

!!! tip
    The API consumer applications can send two polling parameters to indicate the polling behaviours:

      - `returnImmediately`: Indicates whether a bank should return a response immediately or provide a long poll. WSO2 
         Open Banking currently does not support Long Polling. Therefore, the value of `returnImmediately` is always `true`.
      - `maxEvents`: The maximum number of events to be returned. A value of 0 indicates the bank should not return events
         even if available. The upper bound value of the parameter depends on the size of the payload and the connection. 
         If the `maxEvents` value is not defined in the payload, the value will be set according to the `number_of_sets_to_return` 
         configuration in `<IS_HOME>/repository/conf/deployment.toml`.

Given below are sample Event Polling request payloads (in the decoded format) and their responses:

- When requesting a response immediately, only to make sure there are events available:

    ```json tab="Request"
    {
       "setErrs":{
          "65ac7453-13b0-4d2f-9946-dff6e6089a4f":{
             "err":"authentication_failed",
             "description":"The SET could not be authenticated"
          }
       },
       "returnImmediately":true,
       "maxEvents":0
    }
    ```

    ```json tab="Response"
    {
        "moreAvailable":true,
        "sets":{ }
    }
    ```

- When confirming that there are events. If there are 5 events available with the bank and the application wants to receive only 3 events:

    ```json tab="Request"
    {
       "returnImmediately":true,
       "maxEvents":3
    }
    ```

    ```json tab="Response"
    {
       "moreAvailable":true,
       "sets":{
          "a4a07198-5fec-448b-b7d0-c61e5fe122dc":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJHZllacWhidFZYWjBVSldTR2JRbDZPd294b29hIiwiYXVkIjoiR2ZZWnFoYnRWWFowVUpXU0diUWw2T3dveG9vYSIsImlzcyI6Ind3dy5vcGVuYmFuay5jb20iLCJ0eG4iOiJiOWNlY2RmYi0wYWQwLTRiZmYtOTk2YS0zNjZkNjk0MWUyMjUiLCJ0b2UiOjE2NDY2NTYzODQwMDAsImlhdCI6MTY0NjcxMDA4MywianRpIjoiYTRhMDcxOTgtNWZlYy00NDhiLWI3ZDAtYzYxZTVmZTEyMmRjIiwiZXZlbnRzIjp7InVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX3Jlc291cmNlLXVwZGF0ZSI6eyJrZXkyIjoidmFsdWUiLCJyZXNvdXJjZUlEIjoidmZqc2tlbmZrc2RudmZra2ZkZmQnIiwia2V5MyI6InZhbHVlIn0sInVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX2NvbnNlbnQtYXV0aG9yaXphdGlvbi1yZXZva2VkIjp7ImtleTIiOiJ2YWx1ZSIsInJlc291cmNlSUQiOiJ2Zmpza2VuZmtzZG52ZmtrZmRmZCciLCJrZXkzIjoidmFsdWUifX19.ZGuLQEELC3RaQaBVDeK0eConHjWf5aw7QH60jHMkKwhFILNHs6Rn9sYIb-EORO1yGFrrEXaXOUAZLY23gADqGVCbNr3rGr-ye78hB0XAkNgY5Ur5ois43so6H1yvOOL1ddmXDwSOtOwxQM5UFNjNwSiutI1LDvTZ-T0_v9EsGsEeXLFd56sHhS9VAuKFhLHm9N8vsxc4dt6yx2e5KGIP7Mpx3PQZiPRWLObiPx5SEhDGSonskQurcXynBisOvjuvgI5BBAlSKOsOwWX1pC4PHTppHOv20xBu2b2lcFdl8TH1fKm_Btmd7cORTqj4TuXnQMKhKtOjyKoU81fCq3BySw",
          "44c27e45-063d-4ba6-82f1-5073d641fe25":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJHZllacWhidFZYWjBVSldTR2JRbDZPd294b29hIiwiYXVkIjoiR2ZZWnFoYnRWWFowVUpXU0diUWw2T3dveG9vYSIsImlzcyI6Ind3dy5vcGVuYmFuay5jb20iLCJ0eG4iOiIwNzMzMDU2Ny1mZDAyLTQ5ODctYWUxMi1jMmZlYTdmZDY2OTEiLCJ0b2UiOjE2NDY2NTYzOTAwMDAsImlhdCI6MTY0NjcxMDA4MywianRpIjoiNDRjMjdlNDUtMDYzZC00YmE2LTgyZjEtNTA3M2Q2NDFmZTI1IiwiZXZlbnRzIjp7InVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX3Jlc291cmNlLXVwZGF0ZSI6eyJrZXkyIjoidmFsdWUiLCJyZXNvdXJjZUlEIjoidmZqc2tlbmZrc2RudmZra2ZkZmQnIiwia2V5MyI6InZhbHVlIn0sInVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX2NvbnNlbnQtYXV0aG9yaXphdGlvbi1yZXZva2VkIjp7ImtleTIiOiJ2YWx1ZSIsInJlc291cmNlSUQiOiJ2Zmpza2VuZmtzZG52ZmtrZmRmZCciLCJrZXkzIjoidmFsdWUifX19.hBczP5eyLl1bDyhPiuFBCUYM63C3mEq8Sx9Emkgdnz15K5pcEjYdLqDYjId8Pm2ev4-wxrXq4q1832dytDQriFTwR6rW5pYdeVWeRQSvVZ6YB9xbo1fRpqSTxgWuKKHBtiPRXff7Vcp6RGViSq7znCBLGjo1ban9-t2fR6CTlY__iMK-hjJmBQhHnPJzw0qUfAckqwkEEPUNeykQfhFS_07N5vFVw9ILuXlrJaxtsyS6mwEPNJK4cChUwuoKdN9HqmpvUzFBS3xrRXbwB5ASM6pZUCmmOncXUkYu9muCbtNNiHrev3gCjOvw9PDwlHxMscsQz4kZImOd48zGsYd-jg",
          "4b1dfb62-a08d-4704-9944-f05cc4cab43b":"eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJHZllacWhidFZYWjBVSldTR2JRbDZPd294b29hIiwiYXVkIjoiR2ZZWnFoYnRWWFowVUpXU0diUWw2T3dveG9vYSIsImlzcyI6Ind3dy5vcGVuYmFuay5jb20iLCJ0eG4iOiI2YWMxYjdiYi03NGM1LTQ2YmUtYWUwMi04YjgzZWVkNGQ2Y2UiLCJ0b2UiOjE2NDY2NTYzOTUwMDAsImlhdCI6MTY0NjcxMDA4MywianRpIjoiNGIxZGZiNjItYTA4ZC00NzA0LTk5NDQtZjA1Y2M0Y2FiNDNiIiwiZXZlbnRzIjp7InVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX3Jlc291cmNlLXVwZGF0ZSI6eyJrZXkyIjoidmFsdWUiLCJyZXNvdXJjZUlEIjoidmZqc2tlbmZrc2RudmZra2ZkZmQnIiwia2V5MyI6InZhbHVlIn0sInVybl91a19vcmdfb3BlbmJhbmtpbmdfZXZlbnRzX2NvbnNlbnQtYXV0aG9yaXphdGlvbi1yZXZva2VkIjp7ImtleTIiOiJ2YWx1ZSIsInJlc291cmNlSUQiOiJ2Zmpza2VuZmtzZG52ZmtrZmRmZCciLCJrZXkzIjoidmFsdWUifX19.WuCofwrejo7DJshARa2IRdZzXIoXqeX9EF8le3W2zWC1mvaFTA80iqa4PrUm416IkzogMd_yQHlioZ7Wkx9A1JOsrKetut3IVGTM7SgZoVmW1GMYP5JFV8XO8k5TyStNTrXSYTb7yADs17oe7Bn6oETStmGBUEJh4hul31ABF_P_hTwfPp9udAI_jHzpQBwhKkDE1--6ygRHjURCcj23WJDPKv6ZtHJpNxQm23x0L5Mr_tsNs8wRGQqEraNzuP964_fbtXXnF6EDGg6W0cRHSxxbSE3wx7uhYVdweWYYPrbGXXs9uxbeFoJryg4ydThzTGq9wnxvjxc3Kr_7EZW9Vg",
       }
    }    
    ```

- To acknowledge the received events (both positive and negative acknowledgments) while accepting more events. If there are more events available with the bank. The application continues requesting events until there are no more events.

    ```json  
    {
       "ack":[
          "1256db1c-8fda-4457-a755-bb5113dba717"
       ],
       "setErrs":{
          "65ac7453-13b0-4d2f-9946-dff6e6089a4f":{
             "err":"authentication_failed",
             "description":"The SET could not be authenticated"
          }
       },
       "returnImmediately":true
    }
    ```
