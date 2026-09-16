TravelTrek

TravelTrek is a full-stack travel management application designed to manage travel packages, trip itineraries, activities, bookings, and user accounts through role-based workflows.

The application provides separate capabilities for Travelers, Tour Agents, and Agency Managers, with authentication, authorization, REST APIs, database persistence, and a responsive web interface.

🚀 Features
🔐 Authentication & Authorization
User registration and login
JWT-based authentication
Role-based access control
Protected application workflows
Secure logout
Role-specific dashboards
👤 User Roles
Traveler

Travelers can:

Access the Traveler Dashboard
Explore travel packages
View package details
Apply for travel packages
Create and manage trip itineraries
View bookings and reservations
Manage planned activities
Tour Agent

Tour Agents can:

Access the Tour Agent Dashboard
Create trip itineraries
Edit itineraries
Confirm itineraries
Manage planned activities
Manage booking-related operations
Agency Manager

Agency Managers can:

Access the Agency Manager Dashboard
Create travel packages
Edit travel packages
Delete travel packages
Activate/deactivate packages
Manage trip itineraries
Manage planned activities
Manage bookings and reservations
Manage system accounts
🧩 Main Modules
Authentication
     │
     ├── Login
     ├── Registration
     ├── JWT Authentication
     └── Role-Based Authorization
     
Dashboard
     │
     ├── Traveler Dashboard
     ├── Tour Agent Dashboard
     └── Agency Manager Dashboard

Travel Management
     │
     ├── Travel Packages
     ├── Package Details
     ├── Trip Itineraries
     ├── Planned Activities
     └── Bookings & Reservations

Administration
     │
     └── System Account Management
🏗️ System Architecture

TravelTrek follows a client-server architecture.

                    TravelTrek
                       │
          ┌────────────┴────────────┐
          │                         │
       Frontend                  Backend
          │                         │
       React                   Spring Boot
          │                         │
   Redux Toolkit              Spring Security
          │                         │
        Axios                       JWT
          │                         │
       REST API              Spring Data JPA
          │                         │
          └────────────┬────────────┘
                       │
                    Database
💻 Frontend

The frontend is responsible for the user interface, navigation, role-based views, state management, API communication, and user interactions.

Technologies
React
React DOM
Redux Toolkit
React Redux
Axios
JavaScript
CSS
REST API integration
Frontend Structure
frontend/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── travelpackage/
│   │   ├── tripitinerary/
│   │   ├── plannedactivity/
│   │   ├── bookingreservation/
│   │   ├── systemaccount/
│   │   ├── AuthShell.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── NotificationStack.jsx
│   │   └── ErrorHandler.jsx
│   │
│   ├── services/
│   │
│   ├── store/
│   │   ├── slices/
│   │   └── store.js
│   │
│   ├── utils/
│   │   └── permissions.js
│   │
│   ├── App.js
│   ├── App.css
│   └── index.css
│
├── package.json
└── package-lock.json
⚙️ Backend

The backend provides the REST API, authentication, authorization, business logic, validation, database interaction, and security.

Technologies
Java 17
Spring Boot
Spring Security
JWT
Spring Data JPA
Hibernate
REST APIs
Maven
Relational Database
Backend Responsibilities
Client Request
      │
      ▼
REST Controller
      │
      ▼
Service Layer
      │
      ▼
Repository Layer
      │
      ▼
Database

The backend also handles:

Authentication
JWT generation and validation
Authorization
Request validation
Business validation
Exception handling
Transaction management
Entity relationships
Database persistence
🔑 Role-Based Access

TravelTrek uses role-based permissions to control what each user can access.

                 User
                  │
                  ▼
                 Role
                  │
       ┌──────────┼──────────┐
       │          │          │
   Traveler   Tour Agent   Manager
       │          │          │
       ▼          ▼          ▼
   Traveler      Agent     Manager
   Features     Features   Features

Permissions are separated from the UI so that frontend actions correspond to the application's defined roles.

📦 Travel Package Workflow
Agency Manager
      │
      ▼
Create Package
      │
      ▼
Package Available
      │
      ▼
Traveler explores package
      │
      ▼
View Package Details
      │
      ▼
Apply for Package
      │
      ▼
Booking / Reservation

Package information includes details such as:

Package name
Destination
Price
Total capacity
Reserved capacity
Availability
Active/inactive status
🗺️ Trip Itinerary Workflow
Create Trip
    │
    ▼
Draft
    │
    ▼
Add Trip Information
    │
    ▼
Add Planned Activities
    │
    ▼
Review
    │
    ▼
Confirm

The itinerary workspace supports:

Trip creation
Editing
Searching
Status filtering
Confirmation
Deletion
Planned activities
Budget information
Trip details
🧾 Booking Workflow
Travel Package
      │
      ▼
Traveler Application
      │
      ▼
Booking / Reservation
      │
      ▼
Booking Status
      │
      ▼
Reservation Management
🔔 Notifications & Error Handling

The frontend includes a notification system for important application events.

Notifications support:

Success messages
Error messages
Informational messages
Automatic dismissal
Manual dismissal

The application also contains centralized error-handling components for handling application errors consistently.

🎨 UI/UX

The frontend is designed as a responsive travel-management workspace rather than a simple booking page.

The interface includes:

Role-specific dashboards
Persistent sidebar navigation
Responsive layouts
Travel package cards
Package information views
Trip detail views
Search and filtering
Forms for create/edit workflows
Availability indicators
Status indicators
Responsive mobile layouts
Notification feedback
📁 Project Structure

The complete repository is organized as:

TravelTrek/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── .gitignore
└── README.md
🛠️ Installation
1. Clone the Repository
git clone https://github.com/YOUR_USERNAME/traveltrek.git
cd traveltrek
Frontend Setup

Move into the frontend directory:

cd frontend

Install dependencies:

npm install

Start the React development server:

npm start

The frontend will normally be available at:

http://localhost:3000
Backend Setup

Open another terminal and move into the backend:

cd backend

Install/build the backend:

mvn clean install

Run the Spring Boot application:

mvn spring-boot:run

The backend will normally run at:

http://localhost:8080
🔧 Configuration

Environment-specific configuration should be stored locally and should not be committed to GitHub.

Example frontend configuration:

REACT_APP_API_BASE_URL=http://localhost:8080

Do not commit:

.env
.env.local
API keys
JWT secrets
Database passwords
🧪 Testing

Run the frontend tests:

npm test

Run the backend tests:

mvn test

Build the frontend:

npm run build

Build the backend:

mvn clean package
🔒 Security

The application uses authentication and authorization mechanisms to protect application functionality.

Security-related components include:

JWT authentication
Spring Security
Role-based authorization
Protected API endpoints
Request validation
Centralized exception handling

Sensitive credentials should always be provided through environment-specific configuration rather than committed to source control.

📌 Future Improvements

Potential future improvements include:

Payment integration
Real-time booking updates
Email notifications
Advanced itinerary generation
Map integration
Image upload and management
Cloud deployment
Advanced analytics dashboard
Travel recommendations
Automated itinerary optimization
👨‍💻 Development

TravelTrek is structured to keep the frontend and backend independently maintainable while allowing them to communicate through REST APIs.

React UI
   │
   │ HTTP / REST
   ▼
Spring Boot API
   │
   ▼
Business Logic
   │
   ▼
JPA / Hibernate
   │
   ▼
Database
📜 License

This project is developed for educational and portfolio purposes.

TravelTrek

A role-based full-stack travel management platform connecting travelers, tour agents, and agency managers through one unified workspace.
