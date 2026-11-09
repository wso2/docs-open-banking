# About this Release

**WSO2 Open Banking 3.0** is the successor of WSO2 Open Banking 2.0. It is a collection of technologies that increases the speed and reduces the complexity of adopting open banking compliance. Instead of building a solution from scratch, you can use WSO2 Open Banking to meet all legislative requirements with additional benefits beyond compliance. WSO2 Open Banking comprises three modules:

* **WSO2 Open Banking Identity Server Accelerator** runs on top of WSO2 Identity Server.
* **WSO2 Open Banking API Manager Accelerator** runs on top of WSO2 API Manager.
* **WSO2 Open Banking Business Intelligence Accelerator** runs on top of WSO2 Streaming Integrator.

For more information on WSO2 Open Banking Accelerator, see the [Get Started](/en/3.0.0/get-started/open-banking/.md) section.

note

WSO2 provides toolkits that offer compliance to the following open banking standards:

* Open Banking Standard - UK
* NextGenPSD2XS2A
* Consumer Data Standards - Australia

## What is new in this release[​](#what-is-new-in-this-release "Direct link to What is new in this release")

#### WSO2 Open Banking Identity Server Accelerator[​](#wso2-open-banking-identity-server-accelerator "Direct link to WSO2 Open Banking Identity Server Accelerator")

* Generalized consent management support for common open banking use cases. For more information, see [Consent Management](/en/3.0.0/learn/consent-management/.md).

* Extensible OAuth2/OIDC [authorization](/en/3.0.0/develop/consent-management-authorize/.md) and [authentication](/en/3.0.0/develop/jwt-access-tokens/.md) flows to support any open banking requirement.

* Accelerator implementation for [token endpoint](/en/3.0.0/learn/token-authentication/.md) validation including:

  * Transport layer certificate enforcement.
  * Token endpoint authentication method validation for regulatory use cases.

* Mutual-TLS certificate-bound access tokens. For more information, see [Certificate-bound access tokens](https://ob.docs.wso2.com/en/latest/learn/token-authentication/#certificate-bound-access-tokens).

* Customizable Identifier first authentication.

* [Customizable web app](/en/3.0.0/develop/customize-consent-page/.md) for consent approval during authentication.

* Extensible data publishing during the OAuth2/OIDC flows. For more information, see [Data Publishing](/en/3.0.0/develop/authentication-flow-for-data-publishing/.md).

#### WSO2 Open Banking API Manager Accelerator[​](#wso2-open-banking-api-manager-accelerator "Direct link to WSO2 Open Banking API Manager Accelerator")

* Generalized implementation for [common open banking use cases](/en/3.0.0/get-started/try-out-flow/.md):

  * Consent enforcement
  * eIDAS

* [Executor framework](/en/3.0.0/develop/custom-gateway-executor/.md) to enforce different policies based on regulatory and other requirements.

* Supports custom functional paths for [non-regulatory](/en/3.0.0/develop/custom-request-router/.md#handling-non-regulatory-apis) and [regulatory](/en/3.0.0/develop/custom-gateway-executor/.md) API flows such as Accounts, Payments, and Dynamic Client Registration.

* [Request router implementation](/en/3.0.0/develop/custom-request-router/.md) to route request to specific functional paths.

* Publish API invocation data from the Gateway. For more information, see [Custom Data Publishing](/en/3.0.0/develop/custom-data-publishing/.md).

* Custom throttling keys. For more information, see [Custom Throttling Keys](/en/3.0.0/develop/custom-throttling-keys/.md).

#### WSO2 Open Banking Business Intelligence Accelerator[​](#wso2-open-banking-business-intelligence-accelerator "Direct link to WSO2 Open Banking Business Intelligence Accelerator")

* Siddhi Applications to process and persist events published from the open banking uses cases:

  * Dynamic Client Registration
  * User authentication and consent authorization
  * Token issuance
  * API invocations

For more information, see [Data Publishing](/en/3.0.0/learn/data-publishing/.md).

## What has changed in this release[​](#what-has-changed-in-this-release "Direct link to What has changed in this release")

WSO2 Open Banking 3.0 is an improved solution to support requirements in any open banking standard. WSO2 Open Banking 3.0 provides accelerators for each product to accelerate a generalized open banking requirement that can be extended to support regulatory and other open banking requirements. Some significant changes in this release are,

* Extensibility to support any open banking requirement on top of the base technology stack provided through the accelerator.
* New WSO2 Updates tool to receive product updates in-place.
* Improved Consent Management dashboard for customers and Admin dashboard for bank officers to search, update, and revoke a consent.
