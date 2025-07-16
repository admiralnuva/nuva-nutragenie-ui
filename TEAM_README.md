# NutraGenie - AI-Powered Nutrition Platform

## Project Overview
Advanced nutrition and wellness platform designed for users 40+ with comprehensive health tracking, recipe management, and AI-powered cooking assistance.

## Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query
- **Routing**: Wouter

## Quick Start
```bash
npm install
npm run dev
```

## Project Structure
```
├── client/src/           # React frontend
│   ├── pages/           # Main application screens
│   ├── components/ui/   # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utilities and API client
├── server/             # Express backend
├── shared/            # Shared types and schemas
└── replit.md         # Complete project documentation
```

## Key Features Implemented
✅ **Recipe Management System**
- Chef's Choice recommendations
- Pantry-based dish suggestions  
- Custom dish creation
- Take-out ordering system

✅ **Health & Nutrition Tracking**
- Comprehensive health metrics dashboard
- Nutrition goal setting and tracking
- Visual analytics with calming color palette

✅ **User Experience**
- Mobile-first responsive design
- Voice cooking interface
- Dietary preferences management
- Grocery list integration

✅ **Visual Design**
- Professional color scheme optimized for 40+ demographic
- Sophisticated button styling with depth and shadows
- Calming health interface with teal-cyan accents

## Development Status
- **Current State**: Production-ready MVP
- **Target Demo**: Wednesday/Friday investor presentations
- **Platform**: Web-based, iPhone deployment ready

## Documentation
Complete architectural details, changelog, and user preferences are documented in `replit.md`.

## Environment Setup
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection
- `OPENAI_API_KEY`: AI integration
- `NODE_ENV`: development/production

## Deployment
The application is configured for Replit Deployments but can be deployed to any Node.js hosting platform.