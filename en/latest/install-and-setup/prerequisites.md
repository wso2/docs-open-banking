# Prerequisites

WSO2 Open Banking Accelerator is a collection of technologies that increases the speed and reduces the complexity of adopting open banking compliance. Instead of building an open banking solution from scratch, you can use WSO2 Open Banking Accelerator to meet all open banking requirements with additional benefits beyond compliance. You can use the WSO2 Open Banking Accelerator on top of the following WSO2 products.

You can use any of the following base products:

* WSO2 Identity Server - 7.2.0, 7.1.0, 7.0.0
* WSO2 API Manager - 4.6.0, 4.5.0, 4.4.0, 4.3.0

The accelerator mainly addresses the open banking requirements such as API consumer application onboarding, consent management, and access authorization among numerous other features to set up an open banking solution. You can easily implement a toolkit to customize the accelerator and help you comply with any regional open banking requirements. For more information on customization, see the [Develop](/en/latest/develop/develop-toolkit/.md) section.

note

In a standalone setup, these products are deployed in a single server. However, in a typical production environment, it is recommended to deploy the components in separate servers (distributed) for better performance.

## Product Matrix[​](#product-matrix "Direct link to Product Matrix")

Given below is a product matrix for different versions of WSO2 Open Banking:

| Version | Mandatory Components                                                                        | Additional Components                                         |
| ------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 4.0.0   | wso2-fsiam-accelerator-4.0.0<br />wso2-fsam-accelerator-4.0.0                               |                                                               |
| 3.0.0   | wso2-obam-accelerator-3.0.0<br />wso2-obiam-accelerator-3.0.0<br />wso2is-extensions-1.2.10 | wso2-obbi-accelerator-3.0.0                                   |
| 2.0.0   | wso2-obam-2.0.0<br />wso2-obiam-2.0.0                                                       | wso2am-analytics-3.1.0<br />wso2-obbi-2.0.0<br />wso2ei-6.6.0 |
| 1.5.0   | wso2-obam-1.5.0<br />wso2-obkm-1.5.0                                                        | wso2am-analytics-2.6.0<br />wso2-obbi-1.5.0<br />wso2ei-6.4.0 |
| 1.4.0   | wso2-obam-1.4.0<br />wso2-obkm-1.4.0                                                        | wso2am-analytics-2.6.0<br />wso2-obbi-1.4.0<br />wso2ei-6.4.0 |
| 1.3.0   | wso2-obam-1.3.0<br />wso2-obkm-1.3.0                                                        | wso2am-analytics-2.6.0<br />wso2-obbi-1.3.0<br />wso2ei-6.4.0 |
| 1.2.0   | wso2ob-am-2.6.0<br />wso2ob-km-5.7.0                                                        | wso2ob-am-analytics-2.6.0<br />wso2ob-ei-6.4.0                |

## Compatible Base Product Versions[​](#compatible-base-product-versions "Direct link to Compatible Base Product Versions")

Given below is the compatible base product matrix for WSO2 Open Banking 4.0.0:

* If you are using Identity Server only:

  | Base Product | Compatible Versions  |                                                                             |                                                                             |                                                           |
  | ------------ | -------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------- |
  |              | WSO2 Identity Server | [7.0.0](https://wso2.com/identity-and-access-management/previous-releases/) | [7.1.0](https://wso2.com/identity-and-access-management/previous-releases/) | [7.2.0](https://wso2.com/identity-and-access-management/) |

* If you are using WSO2 API Manager and WSO2 Identity Server:

|                      | WSO2 Identity Server                                                                                                                                       | WSO2 API Manager                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Combination 01       | [7.0.0](https://wso2.com/identity-and-access-management/previous-releases/)                                                                                | [4.3.0](https://wso2.com/api-management/previous-releases/) |
| Combination 02<br /> | [7.1.0](https://wso2.com/identity-and-access-management/previous-releases/) or [7.0.0](https://wso2.com/identity-and-access-management/previous-releases/) | [4.4.0](https://wso2.com/api-manager/previous-releases)     |
| Combination 03<br /> | [7.1.0](https://wso2.com/identity-and-access-management/previous-releases/)                                                                                | [4.5.0](https://wso2.com/api-manager/previous-releases)     |
| Combination 04<br /> | [7.2.0](https://wso2.com/identity-and-access-management/)                                                                                                  | [4.6.0](https://wso2.com/api-manager/)                      |

## Prerequisites for a Deployment[​](#prerequisites-for-a-deployment "Direct link to Prerequisites for a Deployment")

Listed below are the prerequisites for a successful deployment:

### Hardware requirements[​](#hardware-requirements "Direct link to Hardware requirements")

| Disk space | 40 GB free disk space<br />The disk space is based on the expected storage requirements that are calculated by considering the file uploads and the backup policies. |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU        | Minimum required: 2 cores                                                                                                                                            |
| Memory     | 4 GB RAM                                                                                                                                                             |

### Software requirements[​](#software-requirements "Direct link to Software requirements")

| Operating system | - Windows<br />- Linux                                                                                                                                                                                  |   |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | - |
| JDK Version      | - OpenJDK 11, OpenJDK 17 or OpenJDK 21<br />- Oracle JDK 21                                                                                                                                             |   |
| DBMS             | - MySQL 8.0<br />- Oracle 19c<br />- Microsoft SQL Server 2022<br />- PostgreSQL 17.2We do not recommend configuring the H2 database in the production environment.                                     |   |
| User store       | It is not recommended to use Apache DS in a production environment due to scalability issues. Instead, use an LDAP such as OpenLDAP, RDBMS, Active Directory or custom user stores for user management. |   |

## Compatibility[​](#compatibility "Direct link to Compatibility")

WSO2 Open Banking Accelerator 4.0.0 is supported on the following platforms:

<!-- -->

note

To use MySQL 8.0, you need to create the database with `charset latin1` as shown below:

```
create database regdb

character set latin1;
```

| Supported JDK versions      | - OpenJDK 11<br />- Oracle JDK 11<br />- OpenJDK 17<br />- OpenJDK 21<br />- Oracle JDK 21 |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| Supported Operating Systems | - Ubuntu 22.04.5 LTS                                                                       |
| Tested DBMSs                | - MySQL 8.0<br />- Oracle 19c<br />- Microsoft SQL Server 2022<br />- PostgreSQL 17.2      |
| Tested Web Browsers         | - Google Chrome 136<br />- Firefox 132.0                                                   |

If you have difficulty in setting up any WSO2 product in a specific platform or database, [contact us](https://wso2.com/subscription/).
