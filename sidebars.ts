// Generated once from the `nav:` of the pre-migration en/mkdocs.yml (commit ec9a031, since deleted).
// The migration tooling is not part of this repository: edit this file by hand from now on.
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Get Started',
      className: 'sidebar-section-icon-get-started',
      collapsed: true,
      items: [
        {type: 'doc', id: 'get-started/wso2-open-banking-accelerator', label: 'WSO2 Open Banking Accelerator'},
        {type: 'doc', id: 'get-started/open-banking', label: 'Open Banking'},
        {type: 'doc', id: 'get-started/open-banking-requirements', label: 'Open Banking Requirements'},
        {type: 'doc', id: 'get-started/regulations-and-standards', label: 'Regulations and Standards'},
        {type: 'doc', id: 'get-started/about-this-release', label: 'About this Release'},
        {
          type: 'category',
          label: 'Quick Start Guide',
          items: [
            {type: 'doc', id: 'get-started/quick-start-guide', label: 'Get Started'},
            {type: 'doc', id: 'get-started/set-up-accelerators', label: 'Set Up Accelerators'},
            {type: 'doc', id: 'get-started/configure-users-and-roles', label: 'Configure Users and Roles'},
            {type: 'doc', id: 'get-started/dynamic-client-registration', label: 'Dynamic Client Registration'},
            {type: 'doc', id: 'get-started/try-out-flow', label: 'Tryout Flow'},
            {type: 'doc', id: 'get-started/data-publishing-try-out', label: 'Data Publishing'},
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Install and Setup',
      className: 'sidebar-section-icon-install-and-setup',
      collapsed: true,
      items: [
        {type: 'doc', id: 'install-and-setup/prerequisites', label: 'Prerequisites'},
        {type: 'doc', id: 'install-and-setup/setting-up-servers', label: 'Setting up servers'},
        {type: 'doc', id: 'install-and-setup/setting-up-databases', label: 'Setting up databases'},
        {type: 'doc', id: 'install-and-setup/data-purging', label: 'Data purging'},
        {type: 'doc', id: 'install-and-setup/configuring-identity-server-for-ob', label: 'Configuring Identity Server'},
        {type: 'doc', id: 'install-and-setup/configuring-api-manager-for-ob', label: 'Configuring API Manager'},
        {type: 'doc', id: 'install-and-setup/deploy-with-docker', label: 'Deploy with Docker'},
        {type: 'doc', id: 'install-and-setup/deployment-patterns', label: 'Deployment Patterns'},
        {type: 'doc', id: 'install-and-setup/configuring-users-and-roles', label: 'Configuring Users and Roles'},
        {
          type: 'category',
          label: 'Deployment Best Practises',
          items: [
            {type: 'doc', id: 'install-and-setup/deployment-checklist', label: 'Deployment Checklist'},
            {type: 'doc', id: 'install-and-setup/security-guidelines-for-production-deployment', label: 'Security Guidelines for Production Deployment'},
            {type: 'doc', id: 'install-and-setup/performance-tuning-for-production-deployment', label: 'Performance Tuning for Production Deployment'},
            {type: 'doc', id: 'install-and-setup/exposing-the-accelerator-to-the-internet', label: 'Exposing the Accelerator to the Internet'},
            {type: 'doc', id: 'install-and-setup/configuring-accelerator', label: 'Configuring Accelerator'},
          ],
        },
        {type: 'doc', id: 'install-and-setup/troubleshooting', label: 'Troubleshooting'},
      ],
    },
    {
      type: 'category',
      label: 'Learn',
      className: 'sidebar-section-icon-learn',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Consent Management',
          items: [
            {type: 'doc', id: 'learn/consent-management', label: 'Introduction'},
            {type: 'doc', id: 'learn/consent-management-try-out', label: 'Tryout'},
            {type: 'doc', id: 'learn/consent-manager', label: 'Consent Manager'},
          ],
        },
        {type: 'doc', id: 'learn/consent-authorization-intro', label: 'Consent Authorization'},
        {type: 'doc', id: 'learn/jarm-for-oauth2', label: 'JARM for OAuth 2.0'},
        {type: 'doc', id: 'learn/token-authentication', label: 'Token Authentication'},
        {type: 'doc', id: 'learn/client-registration', label: 'Client Registration'},
        {
          type: 'category',
          label: 'Dynamic Client Registration',
          items: [
            {type: 'doc', id: 'learn/dynamic-client-registration', label: 'Introduction'},
            {type: 'doc', id: 'learn/dynamic-client-registration-configuration', label: 'Configuration'},
            {type: 'doc', id: 'learn/dynamic-client-registration-try-out', label: 'Tryout'},
          ],
        },
        {
          type: 'category',
          label: 'Manual Client Registration',
          items: [
            {type: 'doc', id: 'learn/manual-client-registration', label: 'Introduction'},
            {type: 'doc', id: 'learn/manual-client-registration-configuration', label: 'Configuration'},
            {type: 'doc', id: 'learn/manual-client-registration-process', label: 'Using Manual Client Registration Flow'},
          ],
        },
        {
          type: 'category',
          label: 'Consumer Authentication',
          items: [
            {type: 'doc', id: 'learn/consumer-authentication', label: 'Introduction'},
            {type: 'doc', id: 'learn/app-to-app-redirection', label: 'App-to-App Redirection'},
            {type: 'doc', id: 'learn/identifier-first', label: 'Identifier-first Authentication'},
          ],
        },
        {
          type: 'category',
          label: 'CIBA Flow',
          items: [
            {type: 'doc', id: 'learn/ciba', label: 'Introduction'},
            {type: 'doc', id: 'learn/ciba-set-up-flow', label: 'Set up CIBA flow'},
          ],
        },
        {
          type: 'category',
          label: 'Event Notification',
          items: [
            {type: 'doc', id: 'learn/event-notification', label: 'Introduction'},
            {type: 'doc', id: 'learn/event-notification-subscription', label: 'Event Subscription'},
            {type: 'doc', id: 'learn/event-notification-create', label: 'Event Creation'},
            {type: 'doc', id: 'learn/event-notification-polling', label: 'Event Polling'},
            {type: 'doc', id: 'learn/event-notification-realtime', label: 'Real Time Event Notification'},
            {type: 'doc', id: 'learn/event-notification-configuration', label: 'Configuration'},
          ],
        },
        {
          type: 'category',
          label: 'API Security',
          items: [
            {type: 'doc', id: 'learn/api-security', label: 'Introduction'},
            {type: 'doc', id: 'learn/api-security-configuration', label: 'Configuration'},
          ],
        },
        {
          type: 'category',
          label: 'Data Publishing',
          items: [
            {type: 'doc', id: 'learn/data-publishing', label: 'Introduction'},
            {type: 'doc', id: 'learn/data-publishing-tryout', label: 'Tryout'},
          ],
        },
        {type: 'doc', id: 'learn/integration', label: 'Integration'},
      ],
    },
    {
      type: 'category',
      label: 'Develop',
      className: 'sidebar-section-icon-develop',
      collapsed: true,
      items: [
        {type: 'doc', id: 'develop/develop-toolkit', label: 'Toolkit Introduction'},
        {type: 'doc', id: 'develop/developer-guide', label: 'Developer Guide'},
        {
          type: 'category',
          label: 'Open Banking Gateway',
          items: [
            {type: 'doc', id: 'develop/open-banking-gateway', label: 'Introduction'},
            {type: 'doc', id: 'develop/custom-request-router', label: 'Custom Request Router'},
            {type: 'doc', id: 'develop/custom-gateway-executor', label: 'Custom Gateway Executor'},
            {type: 'doc', id: 'develop/custom-api-consumer-validation', label: 'Custom API Consumer Validation Executor'},
            {type: 'doc', id: 'develop/gateway-error-handling', label: 'Error handling in API Gateway'},
            {type: 'doc', id: 'develop/custom-throttling-keys', label: 'Custom Throttling Keys'},
          ],
        },
        {
          type: 'category',
          label: 'Open Banking Event Executor',
          items: [
            {type: 'doc', id: 'develop/custom-event-executor', label: 'Custom Event Executor'},
          ],
        },
        {type: 'doc', id: 'develop/service-activator', label: 'Open Banking Service Activator'},
        {type: 'doc', id: 'develop/authentication-worker', label: 'Open Banking Authentication Worker'},
        {type: 'doc', id: 'develop/idempotency-handling-validator', label: 'Open Banking Idempotency Handling Validator'},
        {
          type: 'category',
          label: 'Consent Management',
          items: [
            {type: 'doc', id: 'develop/consent-management-manage', label: 'Consent Manage'},
            {type: 'doc', id: 'develop/consent-management-validate', label: 'Consent Validate'},
            {type: 'doc', id: 'develop/consent-management-authorize', label: 'Consent Authorize'},
            {type: 'doc', id: 'develop/consent-enforcement-executor', label: 'Consent Enforcement Executor'},
            {type: 'doc', id: 'develop/consent-core-service', label: 'Consent Core Service'},
            {type: 'doc', id: 'develop/customize-consent-page', label: 'Customize the Consent Page'},
            {type: 'doc', id: 'develop/consent-amendment-history', label: 'Consent Amendment History'},
            {type: 'doc', id: 'develop/customize-consent-manager-portal', label: 'Customize the Consent Manager Portal'},
          ],
        },
        {
          type: 'category',
          label: 'Token Flow Customization',
          items: [
            {type: 'doc', id: 'develop/jwt-access-tokens', label: 'JWT Access Tokens'},
            {type: 'doc', id: 'develop/token-filters', label: 'Token Filters'},
            {type: 'doc', id: 'develop/grant-handlers', label: 'Grant Handlers'},
            {type: 'doc', id: 'develop/introspection-data-provider', label: 'Introspection Data Provider'},
            {type: 'doc', id: 'develop/custom-claim-provider', label: 'Custom Claim Provider'},
            {type: 'doc', id: 'develop/id-token-builder-token-flow', label: 'ID Token Builder'},
          ],
        },
        {
          type: 'category',
          label: 'Authentication Flow',
          items: [
            {type: 'doc', id: 'develop/customize-authentication-steps', label: 'Customize Authentication Steps'},
            {type: 'doc', id: 'develop/ciba-push-authenticator', label: 'CIBA Push Authenticator'},
            {type: 'doc', id: 'develop/ciba-consent-updater', label: 'CIBA Consent Updater'},
          ],
        },
        {
          type: 'category',
          label: 'Authorization Flow',
          items: [
            {type: 'doc', id: 'develop/keyid-provider', label: 'KeyID Provider'},
            {type: 'doc', id: 'develop/id-token-builder-auth-flow', label: 'ID Token Builder'},
            {type: 'doc', id: 'develop/response-type-handler', label: 'Response Type Handler'},
            {type: 'doc', id: 'develop/custom-request-object-validator', label: 'Custom Request Object Validator'},
            {type: 'doc', id: 'develop/custom-pushed-auth-request-validator', label: 'Custom Pushed Auth Request Validator'},
          ],
        },
        {type: 'doc', id: 'develop/mobile-application-for-ciba', label: 'Mobile Application for CIBA'},
        {type: 'doc', id: 'develop/application-property-validation', label: 'Additional Application Property Validation'},
        {
          type: 'category',
          label: 'Dynamic Client Registration',
          items: [
            {type: 'doc', id: 'develop/application-management-listener', label: 'Application Management Listener'},
            {type: 'doc', id: 'develop/custom-dcr-validator', label: 'Custom DCR Validator'},
          ],
        },
        {type: 'doc', id: 'develop/custom-event-notification', label: 'Event Notification'},
        {
          type: 'category',
          label: 'API Security',
          items: [
            {type: 'doc', id: 'develop/jws-signature-validation', label: 'JWS Signature Validation'},
            {type: 'doc', id: 'develop/jws-response-signing', label: 'JWS Response Signing'},
          ],
        },
        {type: 'doc', id: 'develop/validation-layer', label: 'Using Hibernate Validator'},
        {
          type: 'category',
          label: 'Data Publishing',
          items: [
            {type: 'doc', id: 'develop/custom-data-publishing', label: 'Custom Data Publishing'},
            {type: 'doc', id: 'develop/authentication-flow-for-data-publishing', label: 'Authentication Flow'},
            {type: 'doc', id: 'develop/dcr-for-data-publishing', label: 'Dynamic Client Registration'},
            {type: 'doc', id: 'develop/token-data-publishing', label: 'Token Data Publishing'},
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Toolkits',
      className: 'sidebar-section-icon-toolkits',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Regulatory Compliance',
          items: [
            {type: 'doc', id: 'toolkits/uk-toolkit', label: 'UK Toolkit'},
            {type: 'doc', id: 'toolkits/berlin-toolkit', label: 'Berlin Toolkit'},
            {type: 'doc', id: 'toolkits/cds-toolkit', label: 'CDS Toolkit'},
          ],
        },
        {
          type: 'category',
          label: 'Other Toolkits',
          items: [
            {
              type: 'category',
              label: 'Regulatory Aggregator',
              items: [
                {type: 'doc', id: 'toolkits/regulatory-aggregator/regulatory-aggregator-intro', label: 'Introduction'},
                {type: 'doc', id: 'toolkits/regulatory-aggregator/regulatory-aggregator-qsg', label: 'Quick Start Guide'},
                {type: 'doc', id: 'toolkits/regulatory-aggregator/regulatory-aggregator-try-out', label: 'Try Out'},
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Conformance',
      className: 'sidebar-section-icon-conformance',
      collapsed: true,
      items: [
        {type: 'doc', id: 'conformance/ciba-conformance', label: 'FAPI - CIBA Conformance'},
      ],
    },
    {
      type: 'category',
      label: 'References',
      className: 'sidebar-section-icon-references',
      collapsed: true,
      items: [
        {type: 'doc', id: 'references/config-catalog-is', label: 'Identity Server Configuration Catalog'},
        {type: 'doc', id: 'references/config-catalog-apim', label: 'API Manager Configuration Catalog'},
        {type: 'doc', id: 'references/consent-rest-api', label: 'Consent REST API'},
        {type: 'doc', id: 'references/dcr-rest-api', label: 'DCR REST API'},
        {type: 'doc', id: 'references/application-info-api', label: 'Application Info API'},
      ],
    },
  ],
};

export default sidebars;
