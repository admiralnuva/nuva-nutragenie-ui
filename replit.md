# NutraGenie - AI-Powered Recipe Assistant

## Overview

NutraGenie is a mobile-first web application that serves as a personal AI chef assistant. It helps users discover recipes, get cooking guidance, and track their culinary progress. The app features an interactive chat system with AI chef personalities, personalized recipe recommendations based on dietary preferences, and gamification elements to encourage cooking.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state, localStorage for client state
- **UI Components**: Radix UI primitives with custom styling
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript
- **API Style**: REST API with JSON responses
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Memory-based storage with fallback to database

### Mobile-First Design
- Responsive design optimized for mobile devices (393px width reference)
- Touch-friendly interfaces with appropriate spacing
- Custom CSS variables for brand colors (green tones and warm neutrals)

## Key Components

### User Management
- User registration with nickname, age group, phone number, and avatar selection
- Dietary restrictions and health goals tracking
- Chef personality selection (e.g., Chef Antoine - Precise & Classic)
- Progress tracking with cooking points, purchase points, and streak counters

### Recipe System
- Recipe database with categories (quick, healthy, dessert)
- Recipe metadata including cook time, servings, calories, difficulty
- Ingredient lists and step-by-step instructions
- Rating system and user preferences

### AI Chat Integration
- OpenAI GPT-4o integration for AI chef responses
- Context-aware conversations based on recipe and chef personality
- Real-time cooking assistance and guidance
- Message history persistence

### Gamification Features
- Cooking points system (5 points per completed recipe)
- Purchase tracking and badges
- Weekly streaks and challenge completion
- Achievement system with visual progress indicators

## Data Flow

1. **User Registration Flow**: Splash → Signup → Dietary Preferences → Recipe Dashboard
2. **Recipe Discovery**: Browse by category → Filter/Search → Recipe Details → Start Cooking
3. **Cooking Assistance**: Recipe Instructions → AI Chat Support → Progress Tracking → Completion
4. **Profile Management**: View achievements → Track progress → Update preferences

### State Management Pattern
- Server state managed by TanStack Query with automatic caching
- User data persisted in localStorage for offline access
- Real-time updates through optimistic updates and cache invalidation

## External Dependencies

### Core Dependencies
- **OpenAI API**: AI chef personality and cooking assistance
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations
- **Radix UI**: Accessible component primitives
- **TanStack Query**: Server state management

### Development Tools
- **Vite**: Fast development server and build tool
- **ESBuild**: Production bundling for server code
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety across the stack

## Deployment Strategy

### Development Environment
- Vite dev server for client-side development
- Node.js Express server for API development
- Database migrations using Drizzle Kit
- Hot module replacement for rapid development

### Production Build
- Client: Vite build output to `dist/public`
- Server: ESBuild bundle to `dist/index.js`
- Static file serving through Express
- Environment variables for API keys and database connections

### Database Management
- Schema definitions in `shared/schema.ts`
- Migrations generated and applied via `drizzle-kit`
- Connection pooling through Neon's serverless driver

### Environment Configuration
Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API access
- `NODE_ENV`: Environment mode (development/production)

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```