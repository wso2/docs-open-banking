This page explains how to onboard API consumers using the Dynamic Client Registration API. 

!!! tip "Before you begin..."

    1. Open the `<IS_HOME>/repository/conf/deployment.toml` file.
    
    2. Configure the JWKS endpoints by following the sample given below. These endpoints are used for validating the SSA signature. 
    ```toml
    [oauth.dcr]
    ssa_jkws= "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks"
    ```
       
    3. Restart the Identity Server.

    4. Create API Resources, Roles and Users by following the instructions in the [Configuring Users and Roles](../get-started/configure-resources-users-and-roles-for-is.md) guide. 

### Step 1: Register an application
The DCR allows the TPP to request the bank to register a new application. The process is as follows:

- The TPP sends a registration request including a Software Statement Assertion (SSA) as a claim in the payload. 
This SSA contains API consumer's metadata. It is a signed JWT issued by the Open Banking directory and the TPPs need to 
obtain it before registering with an ASPSP.A sample request looks as follows:

```
curl -X POST https://localhost:9446/api/identity/oauth2/dcr/v1.1/register/ \
-H 'Accept: application/json' \
-H 'Authorization: Basic aXNfYWRtaW5Ad3NvMi5jb206d3NvMjEyMw==' \
-H 'Content-Type: application/json' \
 -d '{
    "iss": "oQ4KoaavpOuoE7rvQsZEOV",
    "iat": 1749012253,
    "exp": 1749015853,
    "jti": "1749012253364",
    "aud": "https://localbank.com",
    "scope": "accounts payments fundsconfirmations",
    "token_endpoint_auth_method": "private_key_jwt",
    "token_endpoint_auth_signing_alg": "PS256",
    "grant_types": [
        "authorization_code",
        "client_credentials",
        "refresh_token"
    ],
    "response_types": [
        "code id_token"
    ],
    "id_token_signed_response_alg": "PS256",
    "request_object_signing_alg": "PS256",
    "application_type": "web",
    "software_id": "oQ4KoaavpOuoE7rvQsZEOV",
    "redirect_uris": [
        "https://www.google.com/redirects/redirect1"
    ],
    "token_endpoint_allow_reuse_pvt_key_jwt": false,
    "tls_client_certificate_bound_access_tokens": true,
    "require_signed_request_object": true,
    "token_type_extension": "JWT",
    "jwks_uri": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/oQ4KoaavpOuoE7rvQsZEOV.jwks",
    "client_name": "WSO2_Open_Banking_TPP2__Sandbox_",
    "ext_application_display_name": "WSO2_Open_Banking_TPP2__Sandbox_",
    "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImNJWW8tNXpYNE9UV1pwSHJtbWlaRFZ4QUNKTSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE3MTY5NTU2MTMsImp0aSI6ImJhM2JhZjNjODQ3MjQ1ZmEiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPViIsInNvZnR3YXJlX2NsaWVudF9pZCI6Im9RNEtvYWF2cE91b0U3cnZRc1pFT1YiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IldTTzIgT3BlbiBCYW5raW5nIFRQUDIgKFNhbmRib3gpIiwic29mdHdhcmVfY2xpZW50X2Rlc2NyaXB0aW9uIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiBmb3IgdGVzdGluZyIsInNvZnR3YXJlX3ZlcnNpb24iOiIxLjUiLCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsInNvZnR3YXJlX3JlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInNvZnR3YXJlX3JvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXSwib3JnYW5pc2F0aW9uX2NvbXBldGVudF9hdXRob3JpdHlfY2xhaW1zIjp7ImF1dGhvcml0eV9pZCI6Ik9CR0JSIiwicmVnaXN0cmF0aW9uX2lkIjoiVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInN0YXR1cyI6IkFjdGl2ZSIsImF1dGhvcmlzYXRpb25zIjpbeyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX0seyJtZW1iZXJfc3RhdGUiOiJJRSIsInJvbGVzIjpbIlBJU1AiLCJDQlBJSSIsIkFJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJOTCIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL3d3dy5nb29nbGUuY29tIiwib3JnX3N0YXR1cyI6IkFjdGl2ZSIsIm9yZ19pZCI6IjAwMTU4MDAwMDFIUVFyWkFBWCIsIm9yZ19uYW1lIjoiV1NPMiAoVUspIExJTUlURUQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6InNhY2hpbmlzQHdzbzIuY29tIiwicGhvbmUiOiIrOTQ3NzQyNzQzNzQiLCJ0eXBlIjoiVGVjaG5pY2FsIn0seyJuYW1lIjoiQnVzaW5lc3MiLCJlbWFpbCI6InNhY2hpbmlzQHdzbzIuY29tIiwicGhvbmUiOiIrOTQ3NzQyNzQzNzQiLCJ0eXBlIjoiQnVzaW5lc3MifV0sIm9yZ19qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC8wMDE1ODAwMDAxSFFRclpBQVguandrcyIsIm9yZ19qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Jldm9rZWQvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJzb2Z0d2FyZV9qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9vUTRLb2FhdnBPdW9FN3J2UXNaRU9WLmp3a3MiLCJzb2Z0d2FyZV9qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Jldm9rZWQvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfcG9saWN5X3VyaSI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20iLCJzb2Z0d2FyZV90b3NfdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsInNvZnR3YXJlX29uX2JlaGFsZl9vZl9vcmciOiJXU08yIE9wZW4gQmFua2luZyJ9.VnfXrppGmCcYGWLcmT3gB22r297Vc0ppibLrl0mv8PGkb7oZLEkIqaAdz9OBwFjehDiHlIzOrCzNgzJD5GvyacZSiorFkpzBpbV80q-n_-uFTugE7mrCVnNfTsb1SBEdoWCRn_BbzH-T2YstqLWPhb_fHkDSFTGJeSnFGp1EcMXVmx8P-pCgsoTS-kXEPDXD7F4iZjZwcFfxDpe_N8FvAUC28l3Tzm1au4bLjrI0T94PVoEJEmAk9AU_somFy_XEvuKuuULfccW3CDR6KGbvXV7MVPNA5XTT5g_H9bRxcPX4ZaaWfIaRVfZ28d_ZCRtsUIiLgm_6eZkiD-7Eh3qyVQ"
}' 
```

<!--The payload is a signed JWT.

??? tip "Click here to see the decoded format of the payload..."

    ```
    {
      "typ": "JWT",
      "alg": "PS256",
      "kid": "cIYo-5zX4OTWZpHrmmiZDVxACJM"
    }

    {
      "iss": "oQ4KoaavpOuoE7rvQsZEOV",
      "iat": 1694075713,
      "exp": 2147483646,
      "jti": "37747cd1c10545699f754adf28b73e32",
      "aud": "https://secure.api.dataholder.com/issuer",
      "redirect_uris": [
        "https://www.google.com/redirects/redirect1"
      ],
      "token_endpoint_auth_signing_alg": "PS256",
      "token_endpoint_auth_method": "private_key_jwt",
      "grant_types": [
         "client_credentials",
         "authorization_code",
         "refresh_token",
         "urn:ietf:params:oauth:grant-type:jwt-bearer"
      ],
      "response_types": [
         "code id_token"
      ],
      "application_type": "web",
      "id_token_signed_response_alg": "PS256",
      "id_token_encrypted_response_alg": "RSA-OAEP",
      "id_token_encrypted_response_enc": "A256GCM",
      "request_object_signing_alg": "PS256",
      "scope": "openid accounts payments",
      "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImNJWW8tNXpYNE9UV1pwSHJtbWlaRFZ4QUNKTSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE3MTY5NTU2MTMsImp0aSI6ImJhM2JhZjNjODQ3MjQ1ZmEiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPViIsInNvZnR3YXJlX2NsaWVudF9pZCI6Im9RNEtvYWF2cE91b0U3cnZRc1pFT1YiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IldTTzIgT3BlbiBCYW5raW5nIFRQUDIgKFNhbmRib3gpIiwic29mdHdhcmVfY2xpZW50X2Rlc2NyaXB0aW9uIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiBmb3IgdGVzdGluZyIsInNvZnR3YXJlX3ZlcnNpb24iOiIxLjUiLCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsInNvZnR3YXJlX3JlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInNvZnR3YXJlX3JvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXSwib3JnYW5pc2F0aW9uX2NvbXBldGVudF9hdXRob3JpdHlfY2xhaW1zIjp7ImF1dGhvcml0eV9pZCI6Ik9CR0JSIiwicmVnaXN0cmF0aW9uX2lkIjoiVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInN0YXR1cyI6IkFjdGl2ZSIsImF1dGhvcmlzYXRpb25zIjpbeyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX0seyJtZW1iZXJfc3RhdGUiOiJJRSIsInJvbGVzIjpbIlBJU1AiLCJDQlBJSSIsIkFJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJOTCIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL3d3dy5nb29nbGUuY29tIiwib3JnX3N0YXR1cyI6IkFjdGl2ZSIsIm9yZ19pZCI6IjAwMTU4MDAwMDFIUVFyWkFBWCIsIm9yZ19uYW1lIjoiV1NPMiAoVUspIExJTUlURUQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6InNhY2hpbmlzQHdzbzIuY29tIiwicGhvbmUiOiIrOTQ3NzQyNzQzNzQiLCJ0eXBlIjoiVGVjaG5pY2FsIn0seyJuYW1lIjoiQnVzaW5lc3MiLCJlbWFpbCI6InNhY2hpbmlzQHdzbzIuY29tIiwicGhvbmUiOiIrOTQ3NzQyNzQzNzQiLCJ0eXBlIjoiQnVzaW5lc3MifV0sIm9yZ19qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC8wMDE1ODAwMDAxSFFRclpBQVguandrcyIsIm9yZ19qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Jldm9rZWQvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJzb2Z0d2FyZV9qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9vUTRLb2FhdnBPdW9FN3J2UXNaRU9WLmp3a3MiLCJzb2Z0d2FyZV9qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Jldm9rZWQvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfcG9saWN5X3VyaSI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20iLCJzb2Z0d2FyZV90b3NfdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsInNvZnR3YXJlX29uX2JlaGFsZl9vZl9vcmciOiJXU08yIE9wZW4gQmFua2luZyJ9.VnfXrppGmCcYGWLcmT3gB22r297Vc0ppibLrl0mv8PGkb7oZLEkIqaAdz9OBwFjehDiHlIzOrCzNgzJD5GvyacZSiorFkpzBpbV80q-n_-uFTugE7mrCVnNfTsb1SBEdoWCRn_BbzH-T2YstqLWPhb_fHkDSFTGJeSnFGp1EcMXVmx8P-pCgsoTS-kXEPDXD7F4iZjZwcFfxDpe_N8FvAUC28l3Tzm1au4bLjrI0T94PVoEJEmAk9AU_somFy_XEvuKuuULfccW3CDR6KGbvXV7MVPNA5XTT5g_H9bRxcPX4ZaaWfIaRVfZ28d_ZCRtsUIiLgm_6eZkiD-7Eh3qyVQ"
    }

    <signature>
    ```
-->
??? tip "Click here to see the decoded format of an SSA..."

    ```
    {
        "alg": "PS256",
        "kid": "cIYo-5zX4OTWZpHrmmiZDVxACJM",
        "typ": "JWT"
    }

    {
        "iss": "OpenBanking Ltd",
        "iat": 1716955613,
        "jti": "ba3baf3c847245fa",
        "software_environment": "sandbox",
        "software_mode": "Test",
        "software_id": "oQ4KoaavpOuoE7rvQsZEOV",
        "software_client_id": "oQ4KoaavpOuoE7rvQsZEOV",
        "software_client_name": "WSO2 Open Banking TPP2 (Sandbox)",
        "software_client_description": "WSO2 Open Banking TPP2 for testing",
        "software_version": "1.5",
        "software_client_uri": "https://www.google.com",
        "software_redirect_uris": [
            "https://www.google.com/redirects/redirect1"
        ],
        "software_roles": [
            "PISP",
            "AISP",
            "CBPII"
        ],
        "organisation_competent_authority_claims": {
            "authority_id": "OBGBR",
            "registration_id": "Unknown0015800001HQQrZAAX",
            "status": "Active",
            "authorisations": [
                {
                    "member_state": "GB",
                    "roles": [
                        "PISP",
                        "AISP",
                        "CBPII"
                    ]
                },
                {
                    "member_state": "IE",
                    "roles": [
                        "PISP",
                        "CBPII",
                        "AISP"
                    ]
                },
                {
                    "member_state": "NL",
                    "roles": [
                        "PISP",
                        "AISP",
                        "CBPII"
                    ]
                }
            ]
        },
        "software_logo_uri": "https://www.google.com",
        "org_status": "Active",
        "org_id": "0015800001HQQrZAAX",
        "org_name": "WSO2 (UK) LIMITED",
        "org_contacts": [
            {
                "name": "Technical",
                "email": "sachinis@wso2.com",
                "phone": "+94774274374",
                "type": "Technical"
            },
            {
                "name": "Business",
                "email": "sachinis@wso2.com",
                "phone": "+94774274374",
                "type": "Business"
            }
        ],
        "org_jwks_endpoint": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/0015800001HQQrZAAX.jwks",
        "org_jwks_revoked_endpoint": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/revoked/0015800001HQQrZAAX.jwks",
        "software_jwks_endpoint": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/oQ4KoaavpOuoE7rvQsZEOV.jwks",
        "software_jwks_revoked_endpoint": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/revoked/oQ4KoaavpOuoE7rvQsZEOV.jwks",
        "software_policy_uri": "https://www.google.com",
        "software_tos_uri": "https://www.google.com",
        "software_on_behalf_of_org": "WSO2 Open Banking"
    }

    <signature>
    ```

!!! note 
    If you change the payload, use the following certificates to sign the JWT and SSA:
    
    - [signing certificate](../assets/attachments/signing-certs/obsigning.pem)
    - [private keys](../assets/attachments/signing-certs/obsigning.key)

- The bank registers the application using the metadata sent in the SSA.

- If an application is successfully created, the bank responds with a JSON payload describing the API consumer that the application was created. 
The API consumer can then use the identifier (`Client ID`) to access customers' financial data on the bank's resource server. A sample response is 
given below:
```
{
    "client_id": "jXuHPxPhitMUevd4d31GSs25uWca",
    "client_secret": "o3BNsU76AQjyq7diTdJh6ZIDThfpLc45K3fps_AeNvUa",
    "client_secret_expires_at": 0,
    "redirect_uris": [
        "https://www.google.com/redirects/redirect1"
    ],
    "grant_types": [
        "authorization_code",
        "client_credentials",
        "refresh_token"
    ],
    "client_name": "WSO2_Open_Banking_TPP2__Sandbox_",
    "ext_application_display_name": "WSO2_Open_Banking_TPP2__Sandbox_",
    "ext_application_version": "v2.0.0",
    "ext_application_owner": "is_admin@wso2.com@carbon.super",
    "ext_application_token_lifetime": 3600,
    "ext_user_token_lifetime": 3600,
    "ext_refresh_token_lifetime": 86400,
    "ext_id_token_lifetime": 3600,
    "ext_pkce_mandatory": false,
    "ext_pkce_support_plain": false,
    "ext_public_client": false,
    "token_type_extension": "JWT",
    "ext_token_type": "JWT",
    "jwks_uri": "https://keystore.openbankingtest.org.uk/0015800001HQQrZAAX/oQ4KoaavpOuoE7rvQsZEOV.jwks",
    "token_endpoint_auth_method": "private_key_jwt",
    "token_endpoint_allow_reuse_pvt_key_jwt": false,
    "token_endpoint_auth_signing_alg": "PS256",
    "sector_identifier_uri": null,
    "id_token_signed_response_alg": "PS256",
    "id_token_encrypted_response_alg": null,
    "id_token_encrypted_response_enc": null,
    "request_object_signing_alg": "PS256",
    "tls_client_auth_subject_dn": null,
    "require_pushed_authorization_requests": false,
    "require_signed_request_object": true,
    "tls_client_certificate_bound_access_tokens": true,
    "subject_type": "public",
    "request_object_encryption_alg": null,
    "request_object_encryption_enc": null,
    "software_statement": null,
    "ext_allowed_audience": "organization",
    "software_id": "oQ4KoaavpOuoE7rvQsZEOV",
    "software_statement": "eyJhbGciOiJQUzI1NiIsImtpZCI6ImNJWW8tNXpYNE9UV1pwSHJtbWlaRFZ4QUNKTSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJPcGVuQmFua2luZyBMdGQiLCJpYXQiOjE3MTY5NTU2MTMsImp0aSI6ImJhM2JhZjNjODQ3MjQ1ZmEiLCJzb2Z0d2FyZV9lbnZpcm9ubWVudCI6InNhbmRib3giLCJzb2Z0d2FyZV9tb2RlIjoiVGVzdCIsInNvZnR3YXJlX2lkIjoib1E0S29hYXZwT3VvRTdydlFzWkVPViIsInNvZnR3YXJlX2NsaWVudF9pZCI6Im9RNEtvYWF2cE91b0U3cnZRc1pFT1YiLCJzb2Z0d2FyZV9jbGllbnRfbmFtZSI6IldTTzIgT3BlbiBCYW5raW5nIFRQUDIgKFNhbmRib3gpIiwic29mdHdhcmVfY2xpZW50X2Rlc2NyaXB0aW9uIjoiV1NPMiBPcGVuIEJhbmtpbmcgVFBQMiBmb3IgdGVzdGluZyIsInNvZnR3YXJlX3ZlcnNpb24iOiIxLjUiLCJzb2Z0d2FyZV9jbGllbnRfdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsInNvZnR3YXJlX3JlZGlyZWN0X3VyaXMiOlsiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS9yZWRpcmVjdHMvcmVkaXJlY3QxIl0sInNvZnR3YXJlX3JvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXSwib3JnYW5pc2F0aW9uX2NvbXBldGVudF9hdXRob3JpdHlfY2xhaW1zIjp7ImF1dGhvcml0eV9pZCI6Ik9CR0JSIiwicmVnaXN0cmF0aW9uX2lkIjoiVW5rbm93bjAwMTU4MDAwMDFIUVFyWkFBWCIsInN0YXR1cyI6IkFjdGl2ZSIsImF1dGhvcmlzYXRpb25zIjpbeyJtZW1iZXJfc3RhdGUiOiJHQiIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX0seyJtZW1iZXJfc3RhdGUiOiJJRSIsInJvbGVzIjpbIlBJU1AiLCJDQlBJSSIsIkFJU1AiXX0seyJtZW1iZXJfc3RhdGUiOiJOTCIsInJvbGVzIjpbIlBJU1AiLCJBSVNQIiwiQ0JQSUkiXX1dfSwic29mdHdhcmVfbG9nb191cmkiOiJodHRwczovL3d3dy5nb29nbGUuY29tIiwib3JnX3N0YXR1cyI6IkFjdGl2ZSIsIm9yZ19pZCI6IjAwMTU4MDAwMDFIUVFyWkFBWCIsIm9yZ19uYW1lIjoiV1NPMiAoVUspIExJTUlURUQiLCJvcmdfY29udGFjdHMiOlt7Im5hbWUiOiJUZWNobmljYWwiLCJlbWFpbCI6InNhY2hpbmlzQHdzbzIuY29tIiwicGhvbmUiOiIrOTQ3NzQyNzQzNzQiLCJ0eXBlIjoiVGVjaG5pY2FsIn0seyJuYW1lIjoiQnVzaW5lc3MiLCJlbWFpbCI6InNhY2hpbmlzQHdzbzIuY29tIiwicGhvbmUiOiIrOTQ3NzQyNzQzNzQiLCJ0eXBlIjoiQnVzaW5lc3MifV0sIm9yZ19qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC8wMDE1ODAwMDAxSFFRclpBQVguandrcyIsIm9yZ19qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Jldm9rZWQvMDAxNTgwMDAwMUhRUXJaQUFYLmp3a3MiLCJzb2Z0d2FyZV9qd2tzX2VuZHBvaW50IjoiaHR0cHM6Ly9rZXlzdG9yZS5vcGVuYmFua2luZ3Rlc3Qub3JnLnVrLzAwMTU4MDAwMDFIUVFyWkFBWC9vUTRLb2FhdnBPdW9FN3J2UXNaRU9WLmp3a3MiLCJzb2Z0d2FyZV9qd2tzX3Jldm9rZWRfZW5kcG9pbnQiOiJodHRwczovL2tleXN0b3JlLm9wZW5iYW5raW5ndGVzdC5vcmcudWsvMDAxNTgwMDAwMUhRUXJaQUFYL3Jldm9rZWQvb1E0S29hYXZwT3VvRTdydlFzWkVPVi5qd2tzIiwic29mdHdhcmVfcG9saWN5X3VyaSI6Imh0dHBzOi8vd3d3Lmdvb2dsZS5jb20iLCJzb2Z0d2FyZV90b3NfdXJpIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbSIsInNvZnR3YXJlX29uX2JlaGFsZl9vZl9vcmciOiJXU08yIE9wZW4gQmFua2luZyJ9.VnfXrppGmCcYGWLcmT3gB22r297Vc0ppibLrl0mv8PGkb7oZLEkIqaAdz9OBwFjehDiHlIzOrCzNgzJD5GvyacZSiorFkpzBpbV80q-n_-uFTugE7mrCVnNfTsb1SBEdoWCRn_BbzH-T2YstqLWPhb_fHkDSFTGJeSnFGp1EcMXVmx8P-pCgsoTS-kXEPDXD7F4iZjZwcFfxDpe_N8FvAUC28l3Tzm1au4bLjrI0T94PVoEJEmAk9AU_somFy_XEvuKuuULfccW3CDR6KGbvXV7MVPNA5XTT5g_H9bRxcPX4ZaaWfIaRVfZ28d_ZCRtsUIiLgm_6eZkiD-7Eh3qyVQ",
    "application_type": "web",
    "scope": "accounts payments fundsconfirmations",
    "response_types": [
        "code id_token"
    ]
}
```
