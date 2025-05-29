# Financial -grade API (FAPI) Security

Financial-grade API (FAPI), a specification that extends the OAuth and OIDC frameworks, 
was introduced by the FAPI Working Group and defines additional technical requirements 
to secure APIs. Eventhough FAPI was initially defined for financial serivces, 
it is appropriate for any critical API whose security is the highest priority.

For Open Banking/ Open Finance use-cases,since robust API and data security is must,most of the immerging
technical specifications for Open Banking/ Open Finance have been mandated **FAPI Security** for the 
exposing financial APIs such as ;
 - Open Banking UK
 - Consumer Data Standards (CDS), Australia
 - The Financial Data Exchange (FDX), USA

The following diagram illustrates how FAPI-compliant features combine to secure applications 

![fapi](../assets/img/learn/api-security/fapi.png)

WSO2 Identity Server 7.0.0 onwards ,FAPI Security is supported from the base product itself and 
for more information on configuring the FAPI features,please visit WSO2 IS Documentation on 
[FAPI](https://is.docs.wso2.com/en/latest/references/financial-grade-api/)


WSO2 Open Banking Accelerators have been certified as a OpenID FAPI1-Advanced OpenID Provider as in https://openid.net/certification/