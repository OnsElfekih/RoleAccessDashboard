# Role Access Dashboard

A comprehensive role-based access control (RBAC) web application that empowers administrators to efficiently manage users and products with granular permission levels and secure authentication.

## Overview

Role Access Dashboard is a full-stack application designed to demonstrate enterprise-level access control patterns. It provides a secure, scalable solution for managing user permissions, administrating product catalogs, and maintaining data integrity through role-based authorization.

## Features

### User Management
- **Admin Capabilities:**
  - Create new user accounts with role assignment
  - Edit user profiles and account information
  - Delete user accounts with confirmation
  - View complete user directory with detailed profiles
  - Assign and modify user roles
  - Monitor user activity and access logs

- **Regular User Capabilities:**
  - View personal profile information
  - Update own account details
  - View limited user directory (filtered by permissions)
  - Access dashboard with restricted data visibility

### Product Management
- **Admin Capabilities:**
  - Create new products with full details
  - Update product information and pricing
  - Delete products from inventory
  - View comprehensive product analytics
  - Manage product categories and inventory levels
  - Track product performance metrics

- **User Capabilities:**
  - View available products
  - Access product details and specifications
  - Browse product categories
  - Search and filter products

### Role-Based Access Control (RBAC)
- **Admin Role:** 
  - Complete system access
  - User and product management
  - System configuration
  - Access to all dashboard features
  - Audit logs and analytics

- **User Role:**
  - Dashboard access with filtered data
  - View products and details
  - Limited navigation options
  - Personal profile management only
  - Restricted data visibility

### Authentication & Security
- **JWT-Based Authentication:** Secure token-based user authentication
- **Session Management:** Automatic session handling and token refresh
- **Password Security:** Encrypted password storage
- **Protected Routes:** Frontend route protection based on user roles
- **Secure API Endpoints:** Backend endpoint authorization

### Dashboard Features
- **Role-Specific Dashboards:** Customized views based on user roles
- **Real-Time Data:** Live updates of user and product information
- **Analytics & Reports:** Performance metrics and system statistics
- **User Activity Tracking:** Monitor user actions and access patterns
- **Responsive Design:** Works seamlessly on desktop and mobile devices

## Technologies Used

### Frontend
- **React** - Modern UI library with hooks and state management
- **HTML5** - Semantic markup
- **CSS3** - Responsive styling and animations
- **JavaScript (ES6+)** - Dynamic client-side logic
- **React Router** - Client-side routing and navigation
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL document database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Token-based authentication
- **Bcrypt** - Password hashing and encryption

### Authentication & Security
- **JWT** - Secure token-based authentication
- **Bcrypt** - Password encryption and verification
- **CORS** - Cross-origin resource sharing

## Prerequisites

### System Requirements
- **Node.js:** v14.0.0 or higher
- **npm:** v6.0.0 or higher
- **MongoDB:** Local instance or MongoDB Atlas account
- **Git:** Version control

## Security Features

- JWT authentication with token expiration  
- Password encryption with bcrypt  
- Protected API endpoints with role validation  
- Protected frontend routes  
- CORS configuration for secure cross-origin requests  
- Input validation on client and server  
- Secure session management  
- Logout functionality with token invalidation  

---
## 👩‍💻 Author

**Ons Elfekih**  
IT Engineering Student — Business Intelligence  
🔗 [LinkedIn](https://www.linkedin.com/in/ons-elfekih) · [Portfolio](https://portfolio-elfekih-ons.vercel.app/)

---

## 📄 License

This project is for academic and portfolio purposes.
