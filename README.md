# Hackathon-Killer Boilerplate

Welcome to **Hackathon-Killer**, the ultimate boilerplate for hackathon enthusiasts looking to jumpstart their full-stack projects. This repo leverages the power of Nest.js and React (TypeScript) with Vite, integrated with Docker for local development, DigitalOcean for continuous integration (CI), and GitHub Actions for continuous deployment (CD).

## Features

- **Nest.js Backend**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **React Frontend**: A TypeScript-based frontend setup with Vite for BLAAAZINGLY-fast bundling and shadcn/ui for easy-to-add UI components.
- **Docker Integration**: Simplify your development environment setup with Docker, including services like PostgreSQL and Redis.
- **CI/CD**: Pre-configured CI with DigitalOcean and CD with GitHub Actions for smooth deployment processes.
- **JWT Cookie-Based Authorization**: Secure your application using JWTs stored in HttpOnly cookies for a robust, secure authentication mechanism between the frontend and backend.

## Prerequisites

Before you start, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/en/) (LTS Version)
- [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose
- [Git](https://git-scm.com/)

## Getting Started

### Setting Up Your Local Development Environment

1. **Clone the Repository**
   
   ```bash
   git clone https://github.com/effuone/hackathon-killer.git
   cd hackathon-killer
   ```

2. **Start Docker Containers**

   Launch your PostgreSQL and Redis instances using Docker Compose.

   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. **Install Dependencies**

   Navigate to both the backend and frontend directories in separate terminal windows and install the required dependencies.

   - For the backend (Nest.js):
     ```bash
     cd backend
     yarn 
     ```

   - For the frontend (React):
     ```bash
     cd frontend
     yarn
     ```

4. **Environment Variables**

   Set up your environment variables by copying the `.env.example` files located in both the backend and frontend directories to `.env` and filling in the necessary details.

5. **Run the Development Servers**

   - Start the Nest.js backend server:
     ```bash
     yarn run start:dev
     ```
   
   - Start the React frontend development server:
     ```bash
     yarn run dev
     ```

   Your application should now be running, with the frontend accessible at `http://localhost:3000` and the backend at `http://localhost:5000`.

## CI/CD

- **Continuous Integration**: Automated tests are run in DigitalOcean whenever a new commit is pushed to the `main` branch.
- **Continuous Delivery/Deployment**: GitHub Actions is configured to automatically deploy your application to the production environment when changes are merged into the `main` branch.