## FrontEnd Public Container
- responsible for
  - displaying webbuilder content
  - SEO Ready website

## FrontEnd Admin Container
- resposible for
  - Displaying Admin Dashboard
  - Fetching the correct content for the user
  - Send request to the backend
  - Display Error to user
  - Implement request token

## Backend Container
- responsible for 
  - CRUD to database
  - CRUD to mediafiles
  - Session Tokens
  - User Management
- Depends on
  - FrontEnd-Public Container
  - FrontEnd-Admin Container

## Nginx Container
- responsilbe for
  - HTTPS
  - Proxy 
  - SSL
- Depends On
 - Backend Container

## pgAdmin Container
- responsible for
  - Direct management to postgres database