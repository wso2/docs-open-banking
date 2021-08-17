---
template: templates/swagger.html
---
# Dynamic Client Registration API Definition - v1

This is an internal API of WSO2 Open Banking Accelerator. 

??? Note "Click Here For Instructions"
    Follow the instructions given below to try out the REST APIs with your local setup of WSO2 Open Banking servers.

    1.  Expand the relevant API operation and click the **Try it Out** button.
    2.  Fill in relevant sample values for the input parameters and click **Execute**.
        You will receive a sample curl command with the sample values you filled in.
    3. Add a `-k` header to the curl command and run the curl command on the terminal with a running setup of WSO2 
    Identity Server and API Manager configured with WSO2 Open Banking Accelerator.
    4. For more information on this API, see [Dynamic Client Registration](../learn/dynamic-client-registration.md).

<div id="swagger-ui"></div>
<script src="../../assets/lib/swagger/swagger-ui-bundle.js"> </script>
<script src="../../assets/lib/swagger/swagger-ui-standalone-preset.js"> </script>
<script>
window.onload = function() {
  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    url: "https://raw.githubusercontent.com/wso2/docs-open-banking/master/en/tools/internal-swaggers/dynamic_client_registration_internal.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    validatorUrl: null,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  })
  // End Swagger UI call region

  window.ui = ui
}
</script>

<!--[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/112cf1de37658c1b09d5)-->
