# User Management System

A modern web application for user management with email verification, authentication, and password reset functionality.


### Backend Developers
1. **Paul Christian Patiño** - Email Sign-Up, Verification, and Authentication
   - Implement email sign-up functionality
   - Implement email verification process
   - Implement authentication system
   - Branch: `backend-signup-auth`

2. **Arnold Cutad Jr** - Role-Based Authorization, Forgot Password, and CRUD
   - Implement role-based authorization system
   - Implement forgot password functionality
   - Implement reset password functionality
   - Implement CRUD operations for user management
   - Branch: `backend-authorization-crud`


### Frontend Developers
1. **Ismael Jose Jumao-as** - Email Sign-Up, Verification, and Authentication
   - Implement email sign-up functionality
   - Implement email verification process
   - Implement authentication system
   - Branch: `frontend-signup-auth`

2. **Prince Dominic Lazaga** - Profile Management, Admin Dashboard, and Fake Backend
   - Implement profile management system
   - Implement admin dashboard
   - Implement fake backend for development
   - Branch: `frontend-profile-admin-fake-backend`

### Testers 
Tester **Ismael Jose Jumao-as** && **Prince Dominic Lazaga**: Functional Testing
   - Test user flows such as registration, login, profile updates, and admin dashboard functionality.
   - Branch: `tester-functional-testing`

Tester **Arnold Cutad Jr**  && **Paul Christian Patiño** : Security Testing
   - Test for vulnerabilities such as unauthorized access, SQL injection, and XSS attacks.
   - Branch: `tester-security-testing`


## Tech Stack

### Frontend
- Angular 17
- Bootstrap 5
- Font Awesome
- LESS for styling

### Backend
- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Installation

### 1. Clone the Repository & Configure the config.json

```bash
git clone https://github.com/IsmaelJumaoas01/user-management-system
cd user-management-system
```

Create a `config.json` file in the backend directory with the following structure:

```json
{
    "db": {
        "host": "localhost",
        "port": 3306,
        "user": "root",
        "password": "",
        "database": "node-mysql-signup-verification-api"
    },
    "jwtSecret": "your-secret-key",
    "email": {
        "from": "your-email@example.com",
        "smtp": {
            "host": "smtp.example.com",
            "port": 587,
            "auth": {
                "user": "your-email@example.com",
                "pass": "your-password"
            }
        }
    }
}
```
### IMPORTANT: Ensure to run/start MySQL service before starting the application

### Option 1: Run Both Backend and Frontend Concurrently (Recommended)

1. Install all dependencies and start both servers with a single command:

```bash
# From the root directory
npm install --legacy-peer-deps
npm start
```

This will:
- Install all dependencies for both backend and frontend
- Start the backend server on `http://localhost:4000`
- Start the frontend development server on `http://localhost:4200`


### Option 2: Run Backend and Frontend Separately

#### 1. Start the Backend Server

```bash
cd backend
npm install --legacy-peer-deps
npm start
```

The backend server will run on `http://localhost:4000`

#### 2. Start the Frontend Development Server

```bash
cd frontend
npm install --legacy-peer-deps
ng serve
```

The frontend application will be available at `http://localhost:4200`

## Using the Application

### 1. Registration
1. Navigate to `http://localhost:4200/account/register`
2. Fill in the registration form with:
   - Title (Mr/Mrs/Miss/Ms)
   - First Name
   - Last Name
   - Email Address
   - Password (minimum 6 characters)
   - Confirm Password
3. Accept the Terms and Conditions
4. Click "Create Account"
5. Check your email for the verification link

### 2. Email Verification
1. Open the verification email
2. Click the verification link
3. You will be redirected to the login page

### 3. Login
1. Navigate to `http://localhost:4200/account/login`
2. Enter your email and password
3. Click "Sign In"

### 4. Forgot Password
1. Click "Forgot Password?" on the login page
2. Enter your email address
3. Check your email for the password reset link
4. Follow the instructions to reset your password

### 5. User Management (Admin Only)
1. Log in as an admin user
2. Navigate to the Users page
3. You can:
   - View all users
   - Edit user details
   - Delete users
   - Change user roles

### 6. Profile Management
1. Log in to your account
2. Click on your profile in the navigation bar
3. You can:
   - Update your personal information
   - Change your password
   - View your account status

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Review the server logs
3. Consult the documentation
4. Contact the development team

## Design System

### Color Scheme
- Primary: #007bff (Bootstrap Blue)
- Secondary: #6c757d (Gray)
- Success: #28a745 (Green)
- Danger: #dc3545 (Red)
- Light: #f8f9fa
- Dark: #343a40

### Typography
- Primary Font: Roboto
- Font Weights: 300, 400, 500, 700
- Base Font Size: 16px

### Components

#### Cards
- Border Radius: 0.5rem
- Box Shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)
- Padding: 1.5rem

#### Buttons
- Primary: Solid blue with white text
- Secondary: Outline with hover effect
- Size: Medium (padding: 0.5rem 1rem)

#### Forms
- Input Groups with icons
- Clear validation states
- Responsive grid layout

### Layout
- Container: 1200px max-width
- Grid System: Bootstrap 5
- Spacing: Consistent 1rem (16px) increments

## API Endpoints

### Authentication
- POST /accounts/authenticate - Login
- POST /accounts/refresh-token - Refresh JWT token
- POST /accounts/revoke-token - Logout
- POST /accounts/register - Register new account
- POST /accounts/verify-email - Verify email
- POST /accounts/forgot-password - Request password reset
- POST /accounts/reset-password - Reset password

### Accounts
- GET /accounts - Get all accounts (admin only)
- GET /accounts/{id} - Get account by id
- POST /accounts - Create account (admin only)
- PUT /accounts/{id} - Update account
- DELETE /accounts/{id} - Delete account

## Troubleshooting

### Backend Server Not Starting
- Check if port 4000 is available
- Verify database connection in .env file
- Ensure all dependencies are installed

### Frontend Not Loading
- Check if backend server is running
- Verify API URL in environment.ts
- Clear browser cache

### Email Not Sending
- Check email configuration in .env file
- Verify SMTP server settings
- Check spam folder

### Database Connection Issues
- Verify database credentials
- Check if MySQL service is running
- Ensure database exists

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
