# Complete Codebase Backup - July 8, 2025

## Project State Summary
- All UI optimizations completed (icon sizing, color consistency, dark theme)
- Recipe and Cook buttons doubled in size with gradient backgrounds
- Complete purple theme consistency across entire application
- Recipe modal converted to dark theme
- All green elements replaced with purple theme colors

## Core Component Files

### Key UI Components
```
client/src/components/ui/
├── expandable-dish-card.tsx - Recipe option cards with large gradient action buttons
├── dish-card.tsx - Review recipe cards with enhanced icon sizing
├── recipe-details-modal.tsx - Dark theme recipe modal with purple accents
├── reusable-dish.tsx - Purple selection indicators
├── bottom-navigation.tsx - 4-tab navigation (Home, Recipes, Voice Cook, Profile)
├── back-button.tsx - Consistent back navigation
├── screen-header.tsx - Standardized page headers
└── profile-card.tsx - User profile management
```

### Main Application Pages
```
client/src/pages/
├── splash.tsx - App introduction with purple theme
├── nuva-signup.tsx - User onboarding with chef selection
├── dietary.tsx - Dietary preferences configuration
├── explore-recipes.tsx - Main recipe browsing interface
├── review-recipes.tsx - Recipe selection and meal planning
├── voice-cooking.tsx - AI cooking assistant with chat
├── home.tsx - Analytics dashboard with purple charts
├── profile.tsx - User profile with purple progress indicators
├── grocery-list-new.tsx - Shopping list management
├── takeout.tsx - Local chef ordering system
└── instacart.tsx - Grocery delivery integration
```

## Architecture Overview

### Frontend Stack
- React 18 + TypeScript
- Wouter routing
- TailwindCSS + shadcn/ui
- TanStack Query for state
- Vite build system

### Backend Stack
- Node.js + Express
- TypeScript
- Memory storage with Drizzle ORM interface
- WebSocket support for real-time features

### Design System
- **Primary Colors**: Purple/Indigo theme (bg-purple-500, bg-indigo-600)
- **Dark Theme**: Gray-900 backgrounds, gray-800 cards, gray-700 borders
- **Accent Colors**: Purple-300/400 for text, white for high contrast
- **Typography**: 2xl font-bold for headers, purple-600 for screen titles

## Key Features Implemented

### Recipe System
- AI-powered recipe generation
- Ingredient substitution system
- Nutritional analysis and goal tracking
- Recipe modal with cooking instructions
- Pantry ingredient management

### Voice Cooking Assistant
- Real-time voice chat with AI chef
- Personality selection (energetic, calm, playful)
- Step-by-step cooking guidance
- Emergency stop functionality
- Chat history persistence

### User Management
- Avatar and chef selection
- Comprehensive dietary preferences
- Health condition tracking
- Progress gamification system
- Address and profile management

### Shopping & Delivery
- Smart grocery list generation
- Instacart integration
- Local chef marketplace
- Order tracking and history

### Health Analytics
- Nutrition tracking by meal type
- Health metrics monitoring
- Goal setting and progress visualization
- TDEE calculations and comparisons

## Database Schema (Memory Storage)

### Core Tables
```typescript
// Users with profile, preferences, and chef selection
users: { id, nickname, avatar, chefAvatar, dietaryRestrictions, healthConditions }

// Recipe database with categories and nutritional data
recipes: { id, name, category, cookTime, difficulty, calories, ingredients, instructions }

// Chat messages for AI cooking assistance
chatMessages: { id, userId, recipeId, sender, message, timestamp }

// Nutrition tracking entries
nutritionEntries: { id, userId, date, mealType, calories, protein, carbs, fat }

// Health metrics monitoring
healthMetrics: { id, userId, date, weight, bloodPressure, bloodSugar, energyLevel }

// Personalized nutrition goals
nutritionGoals: { id, userId, dailyCalories, protein, carbs, fat, fiber }
```

## Environment Configuration
```bash
NODE_ENV=development
DATABASE_URL=postgresql://...
OPENAI_API_KEY=sk-...
```

## Build Scripts
```json
{
  "dev": "NODE_ENV=development tsx server/index.ts",
  "build": "npm run build:client && npm run build:server",
  "build:client": "vite build --outDir dist/public",
  "build:server": "esbuild server/index.ts --bundle --platform=node --outfile=dist/index.js"
}
```

## Recent Optimizations Applied

### Icon Sizing (Completed)
- ExpandableDishCard: 18px → 36px icons, 8x8 → 12x12 buttons
- DishCard: 20px → 40px icons, 9x9 → 14x14 buttons
- Enhanced mobile touch targets and visual prominence

### Color Consistency (Completed)
- All green elements replaced with purple theme
- Gradient backgrounds on action buttons
- Recipe modal dark theme conversion
- Status indicators and progress bars updated

### Theme Standardization (Completed)
- Dark backgrounds: bg-gray-900 (modals), bg-gradient-to-b from-gray-900 to-black (pages)
- Card styling: bg-gray-800 with border-gray-700
- Typography: text-white headers, text-gray-300 content, text-purple-300 accents

## Project Files Structure
```
├── client/src/
│   ├── components/ui/          # Reusable UI components
│   ├── pages/                  # Application screens
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utility functions
│   └── assets/                 # Images and static files
├── server/
│   ├── index.ts               # Express server setup
│   ├── routes.ts              # API route definitions
│   ├── storage.ts             # Data storage interface
│   └── vite.ts                # Development server config
├── shared/
│   └── schema.ts              # Database schema definitions
└── Configuration files:
    ├── package.json           # Dependencies and scripts
    ├── tsconfig.json          # TypeScript configuration
    ├── tailwind.config.ts     # Styling configuration
    ├── vite.config.ts         # Build configuration
    └── drizzle.config.ts      # Database configuration
```

## Development Workflow
1. Use `npm run dev` to start development server
2. Frontend served on same port as backend via Vite proxy
3. Hot module replacement for rapid development
4. Memory storage for development, Neon DB for production

## Deployment Ready
- All TypeScript errors resolved
- No console.log debugging statements
- Optimized imports and unused code removed
- Consistent theming throughout application
- Mobile-optimized touch targets and spacing

This backup captures the complete state of NutraGenie as of July 8, 2025, with all UI optimizations and color consistency improvements applied.