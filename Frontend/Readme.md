# HRMS Lite – Human Resource Management System

## Project Overview

HRMS Lite is a lightweight Human Resource Management System designed to manage employee records and track daily attendance.
This application provides a simple and intuitive interface for administrators to perform essential HR operations such as adding employees, tracking attendance, and filtering records.

The project demonstrates full-stack development skills including frontend development, backend API design, database persistence, validation, and deployment.

The application is built with a modern full-stack architecture using React for the frontend and FastAPI for the backend.

---

## Live Application

Frontend URL
https://hrms-system-frontend-git-master-vikaspanchal47s-projects.vercel.app/

Backend API
https://hrms-system-backend-fbfe.onrender.com/

Swagger Documentation
https://hrms-system-backend-fbfe.onrender.com/docs
---

## Tech Stack

### Frontend

* React (Vite)
* JavaScript
* Axios
* React Router
* CSS (custom styling)

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic

### Database

* SQLite (for development)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## Features

### Employee Management

* Add new employees
* View employee list
* Delete employees
* Filter employees by:

  * Employee ID
  * Name
  * Email
  * Department
* Email validation
* Duplicate employee handling

### Attendance Management

* Mark employee attendance
* Track attendance records
* Filter attendance by:

  * Employee ID
  * Date
  * Status (Present / Absent)

### UI Features

* Clean and simple admin interface
* Responsive layout
* Filter and search functionality
* Table-based record management

---

## API Endpoints

### Employee APIs

POST /employees/
Create a new employee

GET /employees
Get list of employees with filters

GET /employees/{employee_id}
Get employee details

DELETE /employees/{employee_id}
Delete employee

---

### Attendance APIs

POST /attendance/
Mark attendance

GET /attendance
Get attendance records with filters

GET /attendance/{attendance_id}
Get attendance details

---

## Steps to Run the Project Locally

### 1. Clone the Repository

git clone https://github.com/vikaspanchal47/HRMS-System

cd hrms-lite

---

### 2. Run Backend (FastAPI)

Navigate to backend folder:

cd Backend

Create virtual environment:

python -m venv myenv

Activate environment:

Windows
myenv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run backend server:

uvicorn app.main:app --reload

Backend will run at:

http://localhost:8000

Swagger docs:

http://localhost:8000/docs

---

### 3. Run Frontend (React)

Navigate to frontend folder:

cd Frontend/hrms-frontend

Install dependencies:

npm install

Start development server:

npm run dev

Frontend will run at:

http://localhost:5173

---

## Assumptions

* The application assumes a single admin user.
* Authentication and authorization are not implemented.
* Leave management and payroll features are out of scope.
* SQLite is used for simplicity in development.

---

## Limitations

* No authentication system.
* No role-based access control.
* Basic UI without advanced dashboard analytics.
* SQLite may not be suitable for production-scale usage.

---

## Future Improvements

* Add authentication (JWT / OAuth)
* Dashboard with employee statistics
* Attendance summary reports
* Pagination for large datasets
* Role-based access control
* Cloud database (PostgreSQL)

---

## Author

Vikas Panchal
Full Stack Developer

---
