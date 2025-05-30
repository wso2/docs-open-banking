**WSO2 Open Banking Accelerator 4.0** is the successor of WSO2 Open Banking Accelerator 3.0. It is a collection of technologies that increases the 
speed and reduces the complexity of adopting open banking/open finance compliance. Instead of building a solution from scratch, you 
can use WSO2 Financial Services Accelerator to meet all legislative requirements with additional benefits beyond compliance.

For more information on WSO2 Financial Services Accelerator, see the [Get Started](open-banking.md) section.

## What is new in this release

####WSO2 Open Banking Accelerator for Identity Server 

- Accelerator-level support for both pre-initiated and scope-based consent flows
- OpenAPI based accelerator extension points to implement specification compliance addition to supported java based extension points. Fore more information, see [OpenAPI for Accelerator extensions](../references/accelerator-extensions-api.md)
- JDK21 runtime support
- Idempotency feature support from accelerator layer
- Generalized consent management support for common open banking use cases. For more information, see [Consent Management](../learn/consent-management.md).
- Extensible OAuth2/OIDC [authorization](../develop/consent-management-authorize.md) and [authentication](../develop/jwt-access-tokens.md) 
flows to support any open banking requirement.
- Accelerator implementation for [token endpoint](../learn/token-authentication.md) validation including:

    - Transport layer certificate enforcement. 
    - Token endpoint authentication method validation for regulatory use cases.
    
- Mutual-TLS certificate-bound access tokens. For more information, see [Certificate-bound access tokens](https://ob.docs.wso2.com/en/latest/learn/token-authentication/#certificate-bound-access-tokens).
- Customizable Identifier first authentication.
- [Customizable web app](../develop/customize-consent-page.md) for consent approval during authentication. 
- Extensible data publishing during the OAuth2/OIDC flows. For more information, see [Data Publishing](../develop/authentication-flow-for-data-publishing.md).




##What has changed in this release

WSO2 Financial Services Accelerator 4.0 is an improved version of WSO2 Open Banking Accelerator 3.0 to expand covering
domain from Open Banking to Open Finance and improve developer experience of implementing accelerator extension points
to cater regulatory and other open banking/ open finance requirements. Some significant changes in this release are,

- OpenAPI based extensions support for IAM Accelerators. 
- Out of the box support for both of the consent flows of pre-initiated and scopes based
