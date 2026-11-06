---
title: "Home"
slug: /
wide: true
hide_title: true
---
import {FeatureTiles, FeatureTile, SectionSummaries, SectionSummary} from '@site/src/components/HomePage';

<div className="ob-home">

<div className="ob-home__top">

<header className="ob-home__hero">
  <h1>Welcome to the WSO2 Open Banking Accelerator Documentation!</h1>
  <p>
    WSO2 Open Banking Accelerator is a collection of technologies that increases the speed and reduces the complexity
    of adopting open banking compliance. Instead of building a solution from scratch, you can use WSO2 Open Banking
    Accelerator to meet all legislative requirements with additional benefits beyond compliance.
  </p>
  <p>
    Get a head start with our Quick Start Guide or dive straight into the documentation to understand what we offer
    and to discover the extensibility.
  </p>
</header>

<div className="ob-video">
  <iframe
    src="https://www.youtube.com/embed/k9mGnuwQdao"
    title="What is WSO2 Open Banking"
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
  ></iframe>
</div>

</div>

<FeatureTiles>
  <FeatureTile to="/get-started/quick-start-guide/" icon="timer" title="Quick Start Guide" hint="Set up and try out in your local environment" />
  <FeatureTile to="/learn/consent-management/" icon="consent" title="Consent Management" hint="Create, view, revoke, and manage consents" />
  <FeatureTile to="/learn/dynamic-client-registration/" icon="register" title="Dynamic Client Registration" hint="A thorough verification before onboarding" />
  <FeatureTile to="/learn/api-security/" icon="shield" title="Secured API Invocation" hint="Comprehensive support of FAPI and eIDAS certificate validation" />
  <FeatureTile to="/develop/develop-toolkit/" icon="code" title="Develop toolkit" hint="Customize features according to your open banking requirements" />
</FeatureTiles>

<h2 className="ob-home__heading">Explore the documentation</h2>

<SectionSummaries>
  <SectionSummary
    to="/get-started/wso2-open-banking-accelerator/"
    icon="book"
    title="Get Started"
    description="Learn what the accelerator is and which regulations it supports, then set up a working environment."
    links={[
      {to: '/get-started/wso2-open-banking-accelerator/', label: 'WSO2 Open Banking Accelerator'},
      {to: '/get-started/open-banking/', label: 'Open Banking & Open Finance'},
      {to: '/get-started/regulations-and-standards/', label: 'Regulations and Standards'},
      {to: '/get-started/quick-start-guide/', label: 'Quick Start Guide'},
    ]}
  />
  <SectionSummary
    to="/install-and-setup/prerequisites/"
    icon="download"
    title="Install and Setup"
    description="Install, configure and deploy the accelerator with WSO2 Identity Server and WSO2 API Manager."
    links={[
      {to: '/install-and-setup/prerequisites/', label: 'Prerequisites'},
      {to: '/install-and-setup/setting-up-databases/', label: 'Setting up databases'},
      {to: '/install-and-setup/deploy-with-docker/', label: 'Deploy with Docker'},
      {to: '/install-and-setup/deployment-checklist/', label: 'Deployment Checklist'},
    ]}
  />
  <SectionSummary
    to="/tryout-flows/introduction/"
    icon="flask"
    title="Tryout Flows"
    description="Try out the consent, accounts, payments and confirmation of funds flows on your own deployment."
    links={[
      {to: '/tryout-flows/introduction/', label: 'Tryout WSO2 Open Banking Accelerator'},
      {to: '/tryout-flows/accelerator-with-is/try-out-flow-pre_initiated_consent/', label: 'Pre-Initiated Consent Flow'},
      {to: '/tryout-flows/accelerator-with-is/try-out-flow-scope-based-consent/', label: 'Scope Based Consent Flow'},
      {to: '/tryout-flows/accelerator-with-is-and-apim/tryout-flow-with-dcr/', label: 'Tryout Flow with Dynamic Client Registration'},
    ]}
  />
  <SectionSummary
    to="/develop/develop-toolkit/"
    icon="code"
    title="Develop"
    description="Customize the accelerator by building a toolkit with OpenAPI based or Java based extensions."
    links={[
      {to: '/develop/develop-toolkit/', label: 'Toolkit'},
      {to: '/develop/develop-is-toolkit/', label: 'Extending Identity Server Accelerator Extensions'},
      {to: '/develop/openapi/openapi-extensions-developer-guide/', label: 'OpenAPI based extensions'},
      {to: '/develop/java/developer-guide/', label: 'Java based extensions'},
    ]}
  />
</SectionSummaries>

</div>
