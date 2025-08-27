Follow the steps below to configure the WSO2 Identity Server cluster with Nginx.

# Create an SSL certificate
To secure the communication between the load balancer and the WSO2 Identity Server nodes, you need to create an SSL certificate. You can use a self-signed certificate for testing purposes or obtain a certificate from a trusted Certificate Authority (CA) for production environments.
1. Generate a self-signed SSL server certificate using the following command:
    ```bash
    openssl genrsa -des3 -out server.key 1024
    ```
   This command creates a private key (`server.key`) and a self-signed certificate (`server.crt`).

2. Create an OpenSSL configuration file (server_cert.cnf) with subject alternative names. Mention all the IP and Hostname mappings for load balancer in the alt_names section. 
   Refer the below sample configuration file to create the OpenSSL configuration file:   
 
   ```conf
   [req]
    default_bits       = 4096
    distinguished_name = req_distinguished_name
    req_extensions     = req_ext
    prompt = no

    [req_distinguished_name]
    countryName            = LK
    stateOrProvinceName    = WP
    localityName           = COL
    organizationName       = WSO2
    organizationalUnitName = OB
    commonName             = obis
    emailAddress           = abc@wso2.com

    [req_ext]
    subjectAltName = @alt_names

    [alt_names]
    IP.1 = xx.xx.xx.xx
    IP.2 = xx.xx.xx.xx
    DNS.1 = localhost
    DNS.2 = obis
   ```

3. Sign the certificate using the following command:
    ```bash
    openssl req -out server.csr -newkey rsa:2048 -nodes -keyout server.key -config server_cert.cnf
    ```
4. Execute the following commands to remove the passwords:
    ```bash
    cp server.key server.key.org
    ``` 
   ```bash
    openssl rsa -in server.key.org -out server.key
    ```
5. Sign your SSL certificate with the following command:
    ```bash
    openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt -extensions req_ext -extfile server_cert.cnf
    ```
6. Add the certificate to the client-truststore.p12 of both IS nodes.
    ```bash
    keytool -import -trustcacerts -alias server -file server.crt -keystore client-truststore.jks <path-to-the-security-folder>/client-truststore.jks
    ```

# Configure Nginx
Follow the steps below to configure [NGINX Plus] (https://www.nginx.com/products/) (version 1.7.11) or the [NGINX community](http://nginx.org/) (version 1.9.2) as the load balancer for WSO2 products. For simplicity, both versions are referred to collectively as Nginx in the following instructions.

1. Install Nginx (NGINX Plus or Nginx community) in a server configured in your cluster.
2. Configure Nginx to direct the HTTP requests to the two worker nodes via the HTTP 80 port using the http://obis/>. 
To do this, create a VHost file ( obis.conf ) in the /etc/nginx/conf.d directory and add the following configurations into it.

    !!!Note 
    For NGINX Open Source, the location depends on the installation method and OS. Common locations include /usr/local/nginx/conf, /etc/nginx, or /usr/local/etc/nginx.
    See [NGINX docs](https://docs.nginx.com/nginx/admin-guide/basic-functionality/managing-configuration-files/) for details.

    ```Click here to view a generic Nginx configuration
        upstream obis {
            server xxx.xxx.xxx.xxx:9446;
            server xxx.xxx.xxx.xxy:9446;
        }
    
        server {
            listen 80;
            server_name obis;
            location / {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass http://obis;
    
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
            }
        }
    ```
    ```Nginx configuration that exposes /oauth2, /commonauth, and other endpoints
        upstream obis {
            server 172.188.16.165:9446;
            server 20.198.225.202:9446;
            ip_hash;
        }
    
        server {
            listen 443 ssl;
            server_name obis;
            ssl_certificate /etc/nginx/ssl/server.crt;
            ssl_certificate_key /etc/nginx/ssl/server.key;
    
            ssl_client_certificate /etc/nginx/ssl/ca.crt;
            ssl_verify_client optional;
    
            location /oauth2/ {
    
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Forwarded-Port $server_port;
                proxy_set_header Host $http_host;
    
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        
                proxy_set_header x-wso2-mutual-auth-cert $ssl_client_escaped_cert;
    
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass https://obis/oauth2/;
                proxy_ssl_verify off;
            }
        
            location /commonauth {
            
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Forwarded-Port $server_port;
                proxy_set_header Host $http_host;
                
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header x-wso2-mutual-auth-cert $ssl_client_escaped_cert;
        
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass https://obis/commonauth;
                proxy_ssl_verify off;
            }
    
            location /authenticationendpoint {
                
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Forwarded-Port $server_port;
                proxy_set_header Host $http_host;
        
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
        
                proxy_set_header x-wso2-mutual-auth-cert $ssl_client_escaped_cert;
        
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass https://obis/authenticationendpoint;
                proxy_ssl_verify off;
            }
        
            location / {
                proxy_set_header X-Forwarded-Host $host;
                proxy_set_header X-Forwarded-Server $host;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Forwarded-Port $server_port;
                proxy_set_header Host $http_host;
                proxy_read_timeout 5m;
                proxy_send_timeout 5m;
                proxy_pass https://obis/;
        
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_ssl_verify off;
            }
            
            access_log /etc/nginx/log/is/https/access.log;
            error_log /etc/nginx/log/is/https/error.log debug;
        }
    ```

    !!! Note
        While HTTP (port 80) is demonstrated here for completeness, it is not recommended for use in production environments due to security concerns. Instead, configure HTTPS (port 443) to ensure all communication is encrypted. If HTTP must be enabled, it is advisable to use it only for redirection to HTTPS, not for transmitting sensitive data.

3. Create is/https directories inside the <NGINX_HOME>/log/ folder to store logs.
4. Copy the server certificates created earlier into the <NGINX_HOME>/ssl/ directory.
5. Open the /etc/nginx/nginx.conf file and add the following configuration.
    ```conf
      http {
        large_client_header_buffers 4 16k;
      }
    ```
6. Restart the NGINX server.

    ```bash
    sudo service nginx restart
    ```
