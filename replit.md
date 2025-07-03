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
- Comprehensive dietary profile with:
  - Dietary restrictions (vegetarian, vegan, gluten-free, keto, etc.)
  - Health conditions (diabetes, cardiovascular, kidney, blood pressure, cancer, bone health)
  - Fitness goals (build muscle, lose weight, endurance, wellness)
  - Food dislikes and preferences
  - Allergies and serious restrictions
  - Additional notes for personalized nutrition
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

### Health Analytics & Nutrition Tracking
- Comprehensive nutrition logging by meal type (breakfast, lunch, dinner, snack)
- Detailed macro and micronutrient tracking (calories, protein, carbs, fat, fiber, sugar, sodium)
- Health metrics monitoring (weight, blood pressure, blood sugar, energy level, sleep, water intake, exercise)
- Personalized nutrition goals and daily progress tracking
- Health trend analysis and visualization over time
- Integration with dietary restrictions and health conditions

### Gamification Features
- Cooking points system (5 points per completed recipe)
- Purchase tracking and badges
- Weekly streaks and challenge completion
- Achievement system with visual progress indicators

## Data Flow

1. **User Registration Flow**: 
   - Splash Screen → Create Account (Single consolidated screen with 3 card sections)
   - Card 1: Profile (Avatar Selection + Nickname + Age Group)
   - Card 2: AI Chef (Chef Avatar Selection + Chef Nickname + Personality)
   - Card 3: Phone Verification (Phone Entry + Code Verification with 1234)
   - Visual feedback with checkmarks and progress indicators
   - Then → Dietary Preferences → Recipe Dashboard

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
- July 03, 2025. Updated splash screen with NutraGenie branding, AI+Health logo placeholder, and 2-line app description explaining the AI nutrition platform vision
- July 03, 2025. Enhanced recipes screen with comprehensive UX improvements:
  * Smart defaults based on dietary preferences (vegetarian/vegan get plant-based ingredients pre-selected)
  * Visual hierarchy with ingredient category separators and selection counters
  * Interactive feedback showing estimated recipe generation time and ingredient counts
  * Recent ingredients section with quick "Add All" functionality for faster selection
  * Ingredient pairing suggestions with sparkle indicators for compatible items
  * "Select All" toggles for each ingredient category with progress tracking
  * Enhanced nutritional adjustments with real-time goal alignment feedback
  * Popular badges on suggested dishes and dietary restriction warnings
  * "Save as Template" functionality for future quick recipe generation
  * Context-aware nutritional guidance based on user's health goals (keto, muscle building, weight loss)
- July 03, 2025. Major Card 3 redesign and smart recommendations improvements:
  * Removed Recent Ingredients and Add Custom sections from Card 3 (data capture moved to bottom)
  * Added pantry view toggle between "Pantry Ingredients" and "Recommended Dishes"
  * Implemented smart recommended dishes with 100% ingredient matching priority
  * Added custom ingredients input with autocomplete at bottom of Card 3
  * Enhanced smart recommendations with fallback logic ensuring minimum 5 dishes always displayed
  * Added expand/collapse functionality to Smart Recommendations for space optimization
  * Removed match count display for cleaner interface
  * Added fiber parameter to nutritional adjustments (5-25g range)
- July 03, 2025. Navigation system and branding updates:
  * Added comprehensive back button navigation to all screens
  * Implemented 5-tab bottom navigation: Home, Recipes, Cook, Take-Out, Profile
  * Created placeholder screens for Cook and Take-Out features with "coming soon" content
  * Updated all screen headers to consistently display "NutraGenie" branding
  * Simplified Create Account form validation for easier testing (removed all required field restrictions)
  * Configured conditional bottom navigation (hidden on onboarding screens, visible on main app)
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```