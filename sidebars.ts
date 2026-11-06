// Generated once from the `nav:` of the pre-migration en/mkdocs.yml (commit b9cdd8c, since deleted).
// The migration tooling is not part of this repository: edit this file by hand from now on.
import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {type: 'doc', id: 'home', label: 'Home', className: 'sidebar-section-icon-home'},
    {
      type: 'category',
      label: 'Get Started',
      className: 'sidebar-section-icon-get-started',
      collapsed: true,
      items: [
        {type: 'doc', id: 'get-started/wso2-open-banking-accelerator', label: 'WSO2 Open Banking Accelerator'},
        {type: 'doc', id: 'get-started/open-banking', label: 'Open Banking & Open Finance'},
        {type: 'doc', id: 'get-started/open-banking-requirements', label: 'Open Banking & Open Finance Requirements'},
        {type: 'doc', id: 'get-started/regulations-and-standards', label: 'Regulations and Standards'},
        {type: 'doc', id: 'get-started/about-this-release', label: 'About this Release'},
        {
          type: 'category',
          label: 'Quick Start Guide',
          items: [
            {
              type: 'category',
              label: 'Accelerator with WSO2 Identity server',
              items: [
                {type: 'doc', id: 'get-started/quick-start-guide-with-is', label: 'Get Started'},
                {type: 'doc', id: 'get-started/set-up-accelerators-with-is', label: 'Set Up Accelerators'},
                {type: 'doc', id: 'get-started/configure-resources-users-and-roles-for-is', label: 'Configure API Resources, Users and Roles'},
                {type: 'doc', id: 'get-started/dynamic-client-registration-with-is', label: 'Dynamic Client Registration'},
                {type: 'doc', id: 'get-started/try-out-flow-with-is', label: 'Tryout Flow'},
              ],
            },
            {
              type: 'category',
              label: 'Accelerator with WSO2 Identity server and WSO2 API Manager',
              items: [
                {type: 'doc', id: 'get-started/quick-start-guide', label: 'Get Started'},
                {type: 'doc', id: 'get-started/set-up-accelerators', label: 'Set Up Accelerators'},
                {type: 'doc', id: 'get-started/configure-km', label: 'Configure IS 7.x as Key Manager'},
                {type: 'doc', id: 'get-started/deploy-apis', label: 'Deploy Open Banking APIs'},
                {type: 'doc', id: 'get-started/configure-users-and-roles', label: 'Configure API Resources, Users and Roles'},
                {type: 'doc', id: 'get-started/dynamic-client-registration', label: 'Dynamic Client Registration'},
                {type: 'doc', id: 'get-started/try-out-flow', label: 'Tryout Flow'},
              ],
            },
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
        {
          type: 'category',
          label: 'Setting up servers',
          items: [
            {type: 'doc', id: 'install-and-setup/setting-up-servers-with-is', label: 'Accelerator with WSO2 Identity Server'},
            {type: 'doc', id: 'install-and-setup/setting-up-servers', label: 'Accelerator with WSO2 Identity Server and WSO2 API Manager'},
          ],
        },
        {type: 'doc', id: 'install-and-setup/setting-up-databases', label: 'Setting up databases'},
        {type: 'doc', id: 'install-and-setup/configuring-identity-server-for-ob', label: 'Configuring Identity Server'},
        {type: 'doc', id: 'install-and-setup/configuring-api-manager-for-ob', label: 'Configuring API Manager'},
        {type: 'doc', id: 'install-and-setup/configure-resources-users-and-roles', label: 'Configuring API Resources, Users and Roles'},
        {type: 'doc', id: 'install-and-setup/deploy-with-docker', label: 'Deploy with Docker'},
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
        {
          type: 'category',
          label: 'Advanced',
          items: [
            {type: 'doc', id: 'install-and-setup/deployment-patterns', label: 'Deployment Patterns'},
            {type: 'doc', id: 'install-and-setup/active-active-identity-server-deployment', label: 'Configuring Active-Active Identity Server Deployment with Accelerator'},
            {type: 'doc', id: 'install-and-setup/distributed-gateway-control-plane', label: 'Configuring an Accelerator Deployment with Distributed Gateway and Control Plane'},
            {type: 'doc', id: 'install-and-setup/distributed-gateway-control-plane-traffic-manager', label: 'Configuring an Accelerator Deployment with Distributed Gateway, Control Plane and Traffic Manager'},
            {type: 'doc', id: 'install-and-setup/troubleshooting', label: 'Troubleshooting'},
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tryout Flows',
      className: 'sidebar-section-icon-tryout-flows',
      collapsed: true,
      items: [
        {type: 'doc', id: 'tryout-flows/introduction', label: 'Tryout WSO2 Open Banking Accelerator'},
        {
          type: 'category',
          label: 'Accelerator with WSO2 Identity Server',
          items: [
            {type: 'doc', id: 'tryout-flows/accelerator-with-is/try-out-flow-pre_initiated_consent', label: 'Pre-Initiated Consent Flow'},
            {type: 'doc', id: 'tryout-flows/accelerator-with-is/try-out-flow-scope-based-consent', label: 'Scope Based Consent Flow'},
          ],
        },
        {
          type: 'category',
          label: 'Accelerator with WSO2 Identity server and WSO2 API Manager',
          items: [
            {
              type: 'category',
              label: 'Tryout Flow with Dynamic Client Registration',
              items: [
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/tryout-flow-with-dcr', label: 'Introduction'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/configure-iskm', label: 'Configure WSO2 Identity Server 7.x as Key Manager'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/deploy-apis-dcr', label: 'Deploy Open Banking APIs'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/dynamic-client-registration', label: 'Dynamic Client Registration'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/try-out-accounts-flow-dcr', label: 'Tryout Accounts Flow'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/try-out-payments-flow-dcr', label: 'Tryout Payments Flow'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/try-out-cof-flow-dcr', label: 'Tryout Confirmation Of Funds Flow'},
              ],
            },
            {
              type: 'category',
              label: 'Tryout Flow with Manual Client Registration',
              items: [
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/tryout-flow-with-mcr', label: 'Introduction'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/setup-fskm-artifacts', label: 'Set up WSO2 Open Banking APIM Artifacts'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/configure-fskm', label: 'Configure WSO2 Financial Service Key Manager'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/deploy-apis', label: 'Deploy Open Banking APIs'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/manual-client-registration', label: 'Manual Client Registration'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/try-out-accounts-flow', label: 'Tryout Accounts Flow'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/try-out-payments-flow', label: 'Tryout Payments Flow'},
                {type: 'doc', id: 'tryout-flows/accelerator-with-is-and-apim/try-out-cof-flow', label: 'Tryout Confirmation Of Funds Flow'},
              ],
            },
          ],
        },
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
          label: 'Client Registration',
          items: [
            {type: 'doc', id: 'learn/client-registration', label: 'Introduction'},
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
          ],
        },
        {
          type: 'category',
          label: 'Consumer Authentication',
          items: [
            {type: 'doc', id: 'learn/consumer-authentication', label: 'Introduction'},
            {type: 'doc', id: 'learn/app-to-app-redirection', label: 'App-to-App Redirection'},
          ],
        },
        {
          type: 'category',
          label: 'Consent Management',
          items: [
            {type: 'doc', id: 'learn/consent-management', label: 'Introduction'},
            {type: 'doc', id: 'learn/consent-management-try-out', label: 'Tryout a Basic Consent Flow'},
            {
              type: 'category',
              label: 'Consent Management Endpoints',
              items: [
                {type: 'doc', id: 'learn/consent-management-endpoint', label: 'Consent Manage Endpoint'},
                {type: 'doc', id: 'learn/consent-management-authorize', label: 'Consent Authorize Endpoint'},
                {type: 'doc', id: 'learn/consent-management-validate', label: 'Consent Validate Endpoint'},
                {type: 'doc', id: 'learn/consent-management-admin', label: 'Consent Admin Endpoint'},
              ],
            },
            {type: 'doc', id: 'learn/consent-manager', label: 'Consent Manager'},
          ],
        },
        {type: 'doc', id: 'learn/consent-authorization-intro', label: 'Consent Authorization'},
        {
          type: 'category',
          label: 'API Security',
          items: [
            {type: 'doc', id: 'learn/api-security', label: 'Introduction'},
            {type: 'doc', id: 'learn/fapi', label: 'Financial grade API (FAPI) Security'},
            {type: 'doc', id: 'learn/token-authentication', label: 'Token Authentication'},
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
          label: 'Gateway Enforcements',
          items: [
            {type: 'doc', id: 'learn/policies', label: 'Introduction'},
            {type: 'doc', id: 'learn/create-policies', label: 'Create Policies'},
            {type: 'doc', id: 'learn/engage-policies', label: 'Engage Policies to APIs'},
            {
              type: 'category',
              label: 'Inbuilt Enforcements',
              items: [
                {type: 'doc', id: 'learn/inbuilt-policies', label: 'Introduction'},
                {type: 'doc', id: 'learn/dcr-request-policy', label: 'Dynamic Client Registration Request Policy'},
                {type: 'doc', id: 'learn/dcr-response-policy', label: 'Dynamic Client Registration Response Policy'},
                {type: 'doc', id: 'learn/consent-enforcement-policy', label: 'Consent Enforcement Policy'},
                {type: 'doc', id: 'learn/dynamic-endpoint-policy', label: 'Dynamic Endpoint Policy'},
                {type: 'doc', id: 'learn/mtls-enforcement-policy', label: 'MTLS Enforcement Policy'},
                {type: 'doc', id: 'learn/jwe-payload-processing-policy', label: 'JWE Payload Processing Policy'},
                {type: 'doc', id: 'learn/uk-jws-header-processing-policy', label: 'UK JWS Header Processing Policy'},
              ],
            },
            {type: 'doc', id: 'learn/custom-error-formatting', label: 'Custom Error Formatting'},
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Develop',
      className: 'sidebar-section-icon-develop',
      collapsed: true,
      items: [
        {
          type: 'category',
          label: 'Toolkit',
          items: [
            {type: 'doc', id: 'develop/develop-toolkit', label: 'Introduction'},
            {
              type: 'category',
              label: 'Extending Identity Server Accelerator Extensions',
              items: [
                {type: 'doc', id: 'develop/develop-is-toolkit', label: 'Introduction'},
                {
                  type: 'category',
                  label: 'OpenAPI based extensions',
                  items: [
                    {type: 'doc', id: 'develop/openapi/openapi-extensions-developer-guide', label: 'Developer Guide'},
                    {type: 'doc', id: 'develop/openapi/openapi-extensions-dcr', label: 'Dynamic Client Registration'},
                    {
                      type: 'category',
                      label: 'Consent Management',
                      items: [
                        {type: 'doc', id: 'develop/openapi/openapi-consent-management-manage', label: 'Consent Manage'},
                        {type: 'doc', id: 'develop/openapi/openapi-consent-management-validate', label: 'Consent Validate'},
                        {type: 'doc', id: 'develop/openapi/openapi-consent-management-authorize', label: 'Consent Authorize'},
                        {type: 'doc', id: 'develop/openapi/openapi-customize-consent-page', label: 'Customize the Consent Page'},
                        {type: 'doc', id: 'develop/openapi/customize-consent-manager-portal-openapi', label: 'Customize the Consent Manager Portal'},
                      ],
                    },
                    {type: 'doc', id: 'develop/openapi/openapi-token-flow', label: 'Token Flow'},
                    {type: 'doc', id: 'develop/openapi/openapi-authorization-flow', label: 'Authorization Flow'},
                    {
                      type: 'category',
                      label: 'Event Notification',
                      items: [
                        {type: 'doc', id: 'develop/openapi/openapi-event-subscription', label: 'Event Subscription'},
                        {type: 'doc', id: 'develop/openapi/openapi-event-polling', label: 'Event Polling'},
                        {type: 'doc', id: 'develop/openapi/openapi-event-creation', label: 'Event Creation'},
                      ],
                    },
                  ],
                },
                {
                  type: 'category',
                  label: 'Java based extensions',
                  items: [
                    {type: 'doc', id: 'develop/java/developer-guide', label: 'Developer Guide'},
                    {
                      type: 'category',
                      label: 'Client Registration',
                      items: [
                        {type: 'doc', id: 'develop/java/application-property-validation', label: 'Additional Application Property Validation'},
                        {
                          type: 'category',
                          label: 'Dynamic Client Registration',
                          items: [
                            {type: 'doc', id: 'develop/java/application-management-listener', label: 'Application Management Listener'},
                          ],
                        },
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Consent Management',
                      items: [
                        {type: 'doc', id: 'develop/java/consent-management-manage', label: 'Consent Manage'},
                        {type: 'doc', id: 'develop/java/consent-management-validate', label: 'Consent Validate'},
                        {type: 'doc', id: 'develop/java/consent-management-authorize', label: 'Consent Authorize'},
                        {type: 'doc', id: 'develop/java/consent-enforcement-executor', label: 'Consent Enforcement Executor'},
                        {type: 'doc', id: 'develop/java/consent-core-service', label: 'Consent Core Service'},
                        {type: 'doc', id: 'develop/java/customize-consent-page', label: 'Customize the Consent Page'},
                        {type: 'doc', id: 'develop/java/customize-consent-manager-portal', label: 'Customize the Consent Manager Portal'},
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Token Flow Customization',
                      items: [
                        {type: 'doc', id: 'develop/java/jwt-access-tokens', label: 'JWT Access Tokens'},
                        {type: 'doc', id: 'develop/java/grant-handlers', label: 'Grant Handlers'},
                        {type: 'doc', id: 'develop/java/introspection-data-provider', label: 'Introspection Data Provider'},
                        {type: 'doc', id: 'develop/java/custom-claim-provider', label: 'Custom Claim Provider'},
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Authentication Flow',
                      items: [
                        {type: 'doc', id: 'develop/java/customize-authentication-steps', label: 'Customize Authentication Steps'},
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Authorization Flow',
                      items: [
                        {type: 'doc', id: 'develop/java/keyid-provider', label: 'KeyID Provider'},
                        {type: 'doc', id: 'develop/java/id-token-builder-auth-flow', label: 'ID Token Builder'},
                        {type: 'doc', id: 'develop/java/response-type-handler', label: 'Response Type Handler'},
                        {type: 'doc', id: 'develop/java/custom-request-object-validator', label: 'Custom Request Object Validator'},
                      ],
                    },
                    {type: 'doc', id: 'develop/java/custom-event-notification', label: 'Event Notification'},
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Extending API Manager Extensions',
              items: [
                {type: 'doc', id: 'develop/develop-apim-toolkit', label: 'Introduction'},
                {
                  type: 'category',
                  label: 'OpenAPI based extensions',
                  items: [
                    {type: 'doc', id: 'develop/openapi/openapi-extensions-developer-guide-am', label: 'Developer Guide'},
                    {type: 'doc', id: 'develop/openapi/openapi-extensions-mcr', label: 'Manual Client Registration'},
                  ],
                },
                {
                  type: 'category',
                  label: 'Java based extensions',
                  items: [
                    {type: 'ref', id: 'develop/java/developer-guide'},
                    {
                      type: 'category',
                      label: 'Open Banking Gateway',
                      items: [
                        {type: 'doc', id: 'develop/java/open-banking-gateway', label: 'Introduction'},
                        {type: 'doc', id: 'develop/java/custom-request-router', label: 'Custom Request Router'},
                        {type: 'doc', id: 'develop/java/custom-gateway-executor', label: 'Custom Gateway Executor'},
                        {type: 'doc', id: 'develop/java/custom-api-consumer-validation', label: 'Custom API Consumer Validation Executor'},
                        {type: 'doc', id: 'develop/java/gateway-error-handling', label: 'Error handling in API Gateway'},
                        {type: 'doc', id: 'develop/java/custom-throttling-keys', label: 'Custom Throttling Keys'},
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
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
        {type: 'doc', id: 'references/accelerator-extensions-api', label: 'Accelerator Extension REST API'},
      ],
    },
  ],
};

export default sidebars;
