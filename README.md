# 🏥 Clinic Management System

A simple full-stack Clinic Management System built using **.NET 7 (Web API)** and **React.js**. This project demonstrates CRUD operations, validation (frontend & backend), and clean API integration — ideal for portfolio use.

---

## 🚀 Features

### ✅ Patient Management
- Create new patients
- View patient list
- Update patient details
- Delete patients

### ✅ Validation
- **Frontend validation (React)**
  - Required fields
  - Email format validation
  - Real-time error feedback
  - Disabled submit button when invalid

- **Backend validation (.NET)**
  - Data Annotations (`[Required]`, `[EmailAddress]`)
  - ModelState validation
  - Clean API error responses

### ✅ UX Improvements
- Inline form validation messages
- Disabled submit button when form is invalid
- Delete confirmation prompt
- Clean and simple UI

---

## 🛠 Tech Stack

### Backend
- .NET 7 Web API
- Entity Framework Core
- SQL Server

### Frontend
- React.js
- Axios
- React Router

---

## 📁 Project Structure
# Clinic Management System

A simple full-stack web application for managing patient records.  
Built using ASP.NET Core Web API (backend) and React (frontend).

---

## Tech Stack

### Backend
- ASP.NET Core Web API (.NET 7)
- Entity Framework Core
- SQL Server

### Frontend
- React (Vite)
- Axios
- React Router

---

## Features

- View list of patients
- Add new patient
- Edit existing patient
- Delete patient with confirmation
- Frontend validation (required fields, email format)
- Backend validation using Data Annotations
- Clean API error handling

---

## Project Structure

### Backend (`ClinicSystem.API`)
```
Controllers/
Data/
Models/
Program.cs
```

### Frontend (`client`)
```
src/
  api/
  services/
  pages/
  components/
```

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/clinic-management-system.git
cd clinic-management-system
```

---

## Backend Setup

```bash
cd backend/ClinicSystem.API
dotnet restore
dotnet ef database update
dotnet run
```

Backend runs on:
```
http://localhost:5059
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint           | Description         |
|--------|------------------|---------------------|
| GET    | /api/patients     | Get all patients    |
| GET    | /api/patients/{id} | Get patient by ID   |
| POST   | /api/patients     | Create patient      |
| PUT    | /api/patients/{id} | Update patient      |
| DELETE | /api/patients/{id} | Delete patient      |

---

## Validation

### Backend (ASP.NET Core)
```csharp
[Required]
[EmailAddress]
```

### Frontend (React)
- Required field validation
- Email format check
- Inline error messages
- Disabled submit button when invalid

---

## UX Improvements

- Inline validation feedback
- Disabled submit button when form is invalid
- Delete confirmation prompt
- Error highlighting on inputs

---

## Future Improvements

- Toast notifications (success/error)
- Modal-based delete confirmation
- Loading states (spinners)
- Search and filtering
- Pagination
- Authentication (login system)

---

## Author

Sean Carlos Fronda  
Fullstack Developer (ASP.NET Core + React)

---
