# Real-Time Expert Session Booking System

A full-stack application where users can discover experts, view
available time slots, and book sessions in real time.

## Tech Stack

Frontend: React, TypeScript, Vite, TailwindCSS, Axios, React Router,
Socket.io Client\
Backend: Node.js, Express, MongoDB, Mongoose, Zod, Socket.io

## Features

-   Expert listing with search, filter, and pagination
-   Expert detail page with available slots
-   Real-time slot updates
-   Booking form with validation
-   Prevents double booking
-   View bookings by email

## Project Structure

Backend src/ config/ controllers/ models/ routes/ middlewares/ utils/
server.ts

Frontend src/ api/ components/ hooks/ pages/ types/ validation/

## API

GET /api/experts\
GET /api/experts/:id\
POST /api/bookings\
GET /api/bookings?email=\
PATCH /api/bookings/:id/status

## Run Locally

Backend npm install npm run dev

Frontend npm install npm run dev

## Environment Variables

PORT=5000 MONGO_URI=your_mongodb_uri CLIENT_URL=http://localhost:5173

## Seeding Data

npm run seed:experts

## Author

Ravinder Kumar
