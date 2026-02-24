WSO2 Open Banking Accelerator is a collection of technologies that increases the speed and reduces the complexity of 
adopting open banking compliance. Instead of building an open banking solution from scratch, you can use WSO2 Open
Banking Accelerator to meet all open banking requirements with additional benefits beyond compliance. You can use the 
WSO2 Open Banking Accelerator on top of the following WSO2 products.

You can use any of the following base products:

- WSO2 Identity Server - 7.2.0, 7.1.0, 7.0.0
- WSO2 API Manager - 4.6.0, 4.5.0, 4.4.0

The accelerator mainly addresses the open banking requirements such as API consumer application onboarding, consent 
management, and access authorization among numerous other features to set up an open banking solution. You can easily 
implement a toolkit to customize the accelerator and help you comply with any regional open banking requirements. For 
more information on customization, see the [Develop](../develop/open-banking-gateway.md) section.

!!! note
    In a standalone setup, these products are deployed in a single server. However, in a typical production environment, 
    it is recommended to deploy the components in separate servers (distributed) for better performance.

## Product Matrix

Given below is a product matrix for different versions of WSO2 Open Banking:

| Version | Mandatory Components                                                                          | Additional Components |
|---------|-----------------------------------------------------------------------------------------------| ----------------------|
| 4.0.0   | wso2-fsiam-accelerator-4.0.0 <br/>  wso2-fsam-accelerator-4.0.0    | |
| 3.0.0   | wso2-obam-accelerator-3.0.0 <br/> wso2-obiam-accelerator-3.0.0 <br/>wso2is-extensions-1.2.10 | wso2-obbi-accelerator-3.0.0 |
| 2.0.0   | wso2-obam-2.0.0 <br/> wso2-obiam-2.0.0                                                        | wso2am-analytics-3.1.0 <br/> wso2-obbi-2.0.0 <br/> wso2ei-6.6.0 |
| 1.5.0   | wso2-obam-1.5.0 <br/> wso2-obkm-1.5.0                                                         | wso2am-analytics-2.6.0 <br/> wso2-obbi-1.5.0 <br/> wso2ei-6.4.0 |
| 1.4.0   | wso2-obam-1.4.0 <br/> wso2-obkm-1.4.0                                                         | wso2am-analytics-2.6.0 <br/> wso2-obbi-1.4.0 <br/> wso2ei-6.4.0 |
| 1.3.0   | wso2-obam-1.3.0 <br/> wso2-obkm-1.3.0                                                         | wso2am-analytics-2.6.0 <br/> wso2-obbi-1.3.0 <br/> wso2ei-6.4.0 |
| 1.2.0   | wso2ob-am-2.6.0 <br/> wso2ob-km-5.7.0                                                         | wso2ob-am-analytics-2.6.0 <br/> wso2ob-ei-6.4.0|

## Compatible Base Product Versions

Given below is the compatible base product matrix for WSO2 Open Banking 4.0.0:

- If you are using Identity Server only:
   <table>
      <thead>
      <tr>
         <th rowspan="2" style="text-align: center">Base Product</th>
         <th colspan="3" style="text-align: center">Compatible Versions</th>
      </tr>
      </thead>
      <tbody>
      <tr>
         <td>WSO2 Identity Server</td>
         <td><a href="https://wso2.com/identity-and-access-management/previous-releases/">7.0.0</a></td>
         <td><a href="https://wso2.com/identity-and-access-management/previous-releases/">7.1.0</a></td>
         <td><a href="https://wso2.com/identity-and-access-management/">7.2.0</a></td>
      </tr>
      </tbody>
   </table>

- If you are using WSO2 API Manager and WSO2 Identity Server:

   <table>
      <tr>
         <th></th>
         <th>WSO2 Identity Server</th>
         <th>WSO2 API Manager</th>
      </tr>
      <tbody>
      <tr>
         <th>Combination 01</th>
         <td><a href="https://wso2.com/identity-and-access-management/previous-releases/">7.0.0</a></td>
         <td><a href="https://wso2.com/api-management/previous-releases/">4.3.0</a></td>
      </tr>
      <tr>
         <th>Combination 02<br></th>
         <td><a href="https://wso2.com/identity-and-access-management/previous-releases/">7.1.0</a> or <a href="https://wso2.com/identity-and-access-management/previous-releases/">7.0.0</a></td>
         <td><a href="https://wso2.com/api-manager/previous-releases">4.4.0</a></td></td>
      </tr>
      <tr>
         <th>Combination 02<br></th>
         <td><a href="https://wso2.com/identity-and-access-management/previous-releases/">7.1.0</a></td>
         <td><a href="https://wso2.com/api-manager/previous-releases">4.5.0</a></td></td>
      </tr>
      <tr>
         <th>Combination 02<br></th>
         <td><a href="https://wso2.com/identity-and-access-management/">7.2.0</a></td>
         <td><a href="https://wso2.com/api-manager/">4.6.0</a></td></td>
      </tr>
      </tbody>
</table>

## Prerequisites for a Deployment

Listed below are the prerequisites for a successful deployment:

### Hardware requirements 

<table>
   <tbody>
      <tr>
         <th>Disk space</th>
         <td>
            40 GB free disk space <br/> The disk space is based on the expected storage requirements that are calculated by considering the file uploads and the backup policies.
         </td>
      </tr>
      <tr>
         <th>CPU</th>
         <td>
            Minimum required: 2 cores
         </td>
      </tr>
      <tr>
         <th>Memory</th>
         <td>
            4 GB RAM
         </td>
      </tr>
   </tbody>
</table>

### Software requirements

<table>
   <tbody>
      <tr>
         <th>Operating system</th>
         <td>
            <ul>
               <li>Windows </li>
               <li>Linux </li>
               In a production deployment, it is recommended that WSO2 products are installed on the latest releases of RedHat Enterprise Linux or Ubuntu Server LTS. 
               <br/> <br/>
               See the following documentation to find the environments that the WSO2 products are tested with:
               <ul>
                  <li> <a href="https://is.docs.wso2.com/en/5.11.0/setup/environment-compatibility/">Identity Server compatibility</a></li>
                  <!--<li> <a href="https://apim.docs.wso2.com/en/latest/install-and-setup/setup/reference/product-compatibility/">API Manager compatibility</a></li>-->
               </ul>
            </ul>
         </td>
      </tr>
      <tr>
         <th>JDK Version</th>
         <td>
            <ul>
               <li>OpenJDK 11, OpenJDK 17 or OpenJDK 21</li>
               <li>Oracle JDK 21</li><br>See <a href="https://ob.docs.wso2.com/en/latest/install-and-setup/prerequisites/#compatibility">Compatibility</a> for compatible JDK versions based on the base product versions.
            </ul>
         <td>  
      </tr>
      <tr>
         <th>DBMS</th>
         <td>
            <ul>
               <li>MySQL 8.0</li> 
               See <a href="https://ob.docs.wso2.com/en/latest/install-and-setup/prerequisites/#compatibility">Compatibility</a> if you are using MySQL 8.0.
               <li>Oracle 19c</li>
               <li>Microsoft SQL Server 2022</li>
               <li> PostgreSQL 17.2</li>
            </ul>
            We do not recommend configuring the H2 database in the production environment.
         <td>   
      </tr>
      <tr>
         <th> User store</th>
         <td> It is not recommended to use Apache DS in a production environment due to scalability issues. Instead, use an LDAP such as OpenLDAP, RDBMS, Active Directory or custom user stores for user management.</td>
      </tr>
   </tbody>
</table>

## Compatibility 

WSO2 Open Banking Accelerator 4.0.0 is supported on the following platforms:

<!--!!!info
    If you are using **WSO2 Identity Server 6.0.0** and **WSO2 API Manager 4.2.0** as the base products, it is recommended to use OpenJDK 17. For other base products, use OpenJDK 11.
-->
!!!note
    To use MySQL 8.0, you need to create the database with `charset latin1` as shown below:

    ```
    create database regdb
    character set latin1;
    ```

<table>
   <tbody>
      <tr>
         <th>Supported JDK versions</th>
         <td>
            <ul>
               <li>
                  OpenJDK 11
               </li>
               <li>
                  Oracle JDK 11
               </li>
               <li>
                  OpenJDK 17
               </li>
               <li>
                  OpenJDK 21
               </li>
               <li>
                  Oracle JDK 21
               </li>
            </ul>
         </td>
      </tr>
      <tr>
         <th>Supported Operating Systems</th>
         <td>
            <ul>
               <li>
                  Ubuntu 22.04.5 LTS
               </li>
               <!--<li>
                  Windows Server 2016
               </li>-->
            </ul>
         </td>
      </tr>
      <tr>
         <th>Tested DBMSs</th>
         <td>
            <ul>
               <li>
                  MySQL 8.0
               </li>
               <li>
                  Oracle 19c
               </li>
               <li>
                  Microsoft SQL Server 2022
               </li>
               <li>
                  PostgreSQL 17.2
               </li>
            </ul>
         </td>
      </tr>
      <tr>
         <th>Tested Web Browsers</th>
         <td>
            <ul>
               <li>
                  Google Chrome 136
               </li>
               <li>
                  Firefox 132.0
               </li>
            </ul>
         </td>
      </tr>
   </tbody>
</table>

## Security Guidelines for Production Deployment

When deploying WSO2 Open Banking in a production server, make sure to comply with the following common security guidelines for production deployment. 

 - For WSO2 Open Banking Accelerator refer [WSO2 Identity Server Security Guidelines for Production Deployment](https://is.docs.wso2.com/en/latest/deploy/security/security-guidelines-for-production-deployment/)
 <!-- For WSO2 Open Banking API Manager Accelerator refer [WSO2 API Manager Security Guidelines for Production Deployment](https://apim.docs.wso2.com/en/latest/install-and-setup/setup/deployment-best-practices/security-guidelines-for-production-deployment/#api-m-runtime-security)-->

If you have difficulty in setting up any WSO2 product in a specific platform or database,
[contact us](https://wso2.com/subscription/).
