# VivaFemini Backend

A RESTful API backend for the VivaFemini menstrual cycle tracking application, built with NestJS and MongoDB.

## Tech Stack

- **Framework**: NestJS 11
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Validation**: class-validator & class-transformer
- **Date Utilities**: date-fns

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or Yarn
- MongoDB (local installation or MongoDB Atlas)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd vivafemini/backend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the backend directory:

```env
MONGODB_URI=mongodb://localhost:27017/vivafemini
PORT=3001
```

For MongoDB Atlas, use your connection string:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/vivafemini
```

### 4. Run the development server

```bash
npm run start:dev
# or
yarn start:dev
```

The server will start at [http://localhost:3001](http://localhost:3001).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start the server |
| `npm run start:dev` | Start in watch mode (development) |
| `npm run start:prod` | Start production server |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Run tests with coverage |

## Project Structure

```
backend/
├── src/
│   ├── main.ts              # Application entry point
│   ├── app.module.ts        # Root module
│   ├── app.controller.ts    # Root controller
│   ├── app.service.ts       # Root service
│   ├── modules/
│   │   ├── users/           # User management
│   │   ├── cycles/          # Menstrual cycle tracking
│   │   ├── tracking/        # Daily symptom logging
│   │   ├── health-report/   # Health analytics & reports
│   │   ├── articles/        # Health articles/content
│   │   └── tips/            # Daily health tips
│   └── seed/                # Database seeding
├── test/                    # E2E tests
└── package.json
```

## API Endpoints

All endpoints are prefixed with `/api`.

### Cycles

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/cycles` | Get all cycles |
| `GET` | `/api/cycles/current` | Get current cycle with predictions |
| `GET` | `/api/cycles/predictions` | Get cycle predictions |
| `POST` | `/api/cycles` | Start a new cycle |
| `PATCH` | `/api/cycles/:id` | Update a cycle |
| `PATCH` | `/api/cycles/:id/pregnancy-test` | Update pregnancy test result |

### Tracking

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tracking` | Get recent daily logs |
| `GET` | `/api/tracking/calendar/:year/:month` | Get calendar data for month |
| `GET` | `/api/tracking/:date` | Get log for specific date |
| `POST` | `/api/tracking` | Create a daily log |
| `PATCH` | `/api/tracking/:date` | Update a daily log |
| `DELETE` | `/api/tracking/:date` | Delete a daily log |

### Health Report

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health-report/summary` | Get cycle summary |
| `GET` | `/api/health-report/symptom-frequency` | Get symptom frequency data |
| `GET` | `/api/health-report/period-length` | Get period length history |
| `GET` | `/api/health-report/historical` | Get historical data (paginated) |
| `GET` | `/api/health-report/trends` | Get symptom trends |
| `GET` | `/api/health-report/flow-summary` | Get flow and symptom summary |

### Articles

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/articles` | Get all articles |
| `GET` | `/api/articles/:id` | Get article by ID |

### Tips

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tips` | Get all tips |
| `GET` | `/api/tips/daily` | Get tip for current cycle day |

## CORS Configuration

The backend is configured to accept requests from the frontend at `http://localhost:3000`. To modify CORS settings, edit `src/main.ts`.

## Building for Production

```bash
npm run build
npm run start:prod
```

## Database Seeding

The application includes a seed module that automatically populates initial data (articles, tips) when the database is empty. This runs automatically on application startup.

## Learn More

- [NestJS Documentation](https://docs.nestjs.com)
- [Mongoose Documentation](https://mongoosejs.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
# vivafemini-test-backend
