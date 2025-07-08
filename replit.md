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
  * Fixed splash screen text visibility issues by switching to standard Tailwind colors with drop shadows
  * Simplified Create Account form validation for easier testing (removed all required field restrictions)
  * Configured conditional bottom navigation (hidden on onboarding screens, visible on main app)
- July 03, 2025. Recipe improvements and TypeScript error fixes:
  * Fixed pantry view to always default to "Pantry Ingredients" when navigating or switching modes
  * Enhanced Smart Recommendations visual distinction with green gradient background and border
  * Removed timer display from Generate Recipe button for cleaner interface
  * Removed Save as Template functionality (to be revisited later)
  * Added @ts-nocheck directives to cooking.tsx and health.tsx to resolve white screen deployment issues
- July 03, 2025. Comprehensive Generate Recipe Screen implementation:
  * Created 4-card meal planning interface for reviewing AI-generated recipes
  * Card 1: Weekly meal planner with dish selection (checkboxes, nutrition preview, compact design)
  * Card 2: Detailed recipe view with ingredients, substitutions, and nutrition comparison
  * Card 3: Auto-generated shopping cart with pantry filtering and quantity management
  * Card 4: Action buttons for shopping list generation, Instacart integration, cooking, and takeout
  * Implemented ingredient substitution system with nutritional value tracking
  * Added collapsible dish details when multiple dishes selected
  * Integrated smart shopping cart that excludes pantry items and combines duplicate ingredients
  * Real-time nutrition summary calculations with goal comparison
  * Connected to existing navigation flow from recipes screen Generate Recipe button
- July 03, 2025. Enhanced substitution selection and grocery list workflow:
  * Fixed multiple selection in Card 2 - original ingredient stays selected when substitutions are chosen
  * Multiple checkboxes now work properly for ingredients and substitutions with automatic grocery list updates
  * Redesigned Card 3 as compact grocery list display showing only item count with large badge
  * Changed "Print Grocery List" button to "View Grocery List" linking to dedicated screen
  * Created comprehensive grocery list screen with date display, CRUD operations, print and Instacart integration
  * Implemented ultra-compact list design showing 12-15 items without scroll, practical quantities (bottles vs tbsp)
  * Moved action buttons to bottom, streamlined add item interface with inline plus button
  * Removed nutritional values and dish information from grocery list for cleaner, more practical shopping experience
- July 04, 2025. Major Instacart restructuring and Profile system implementation:
  * Restructured Instacart screen: removed Card 1, integrated store selection into cart header
  * Added compact delivery info in header, 3-row cart layout (store selector, cost summary, cart title)
  * Implemented order confirmation screen with order tracking and navigation to profile
  * Created comprehensive Profile screen with 5 tabbed sections: Account Info, Dietary Preferences, Grocery History, Order History, Analytics
  * Added editable account information with avatar/nickname/age/phone management
  * Integrated dietary preferences linking to dietary screen for full editing
  * Implemented grocery list history with print functionality and order history with status tracking
  * Added analytics dashboard with spending stats and nutrition goal progress tracking
- July 04, 2025. Interactive Voice & Video Cooking Features:
  * Created Voice Cooking Assistant with real-time conversation capabilities
  * Implemented AI-powered voice recognition with Chef Antoine personality interactions
  * Added comprehensive video feed integration with camera controls and live guidance
  * Built AI Video Cooking with computer vision features: ingredient recognition, technique analysis, temperature monitoring
  * Integrated chef personality selection (encouraging, professional, playful) with voice adaptation
  * Added step-by-step cooking guidance with AI feedback and visual overlay detection
  * Implemented real-time cooking tips, safety warnings, and technique correction
  * Created interactive voice commands and conversation flow for hands-free cooking
  * Added premium AI features with confidence scoring and visual recognition indicators
- July 04, 2025. Navigation Flow Fixes and Gamification Enhancements:
  * Fixed recipe completion flow to automatically navigate to home page (analytics) after cooking completion
  * Connected "Start Cooking" button from recipe generation screen to voice cooking interface instead of orphan cooking page
  * Enhanced gamification with step completion streaks, celebration animations, and visual progress feedback
  * Added smooth animations for progress dots with scaling and pulsing effects
  * Implemented streak counter with fire emoji badge for consecutive step completions
  * Added celebration animation (bouncing emoji) that triggers on each step completion
  * Enhanced chef personality messages with streak bonuses and motivational language
  * Optimized progress indicators with transition effects for addictive user experience
- July 04, 2025. Advanced Cooking Interface Features and UI Polish:
  * Restructured Interactive Cooking screen with 4-card layout: Chat Interface, Voice Conversation, Continue Cooking, Quick Actions
  * Implemented professional cooking features: animated mode switching, progress bars replacing dots, cooking timers with notifications
  * Added safety features: one-tap emergency stop button, offline mode detection with visual indicators
  * Enhanced timer system with 5/10/15 minute quick-start options and browser notification integration
  * Centralized all screen titles across the application for consistent visual alignment
  * Added smooth transition animations for voice/text mode switching with disabled state during transitions
  * Integrated emergency stop functionality that pauses all cooking activities with clear resume option
- July 04, 2025. Dynamic Recipe Switching and Address Management:
  * Fixed Continue Cooking button to dynamically switch recipes and update dish titles to reflect the new recipe being cooked
  * Enhanced Profile Account section with comprehensive address management matching signup screen structure
  * Added detailed address fields: street address, city, state, zip code with proper grid layout and validation
  * Updated address display in view mode to show complete formatted address instead of single line
  * Integrated address editing functionality with save/cancel capabilities
- July 04, 2025. Complete Color Palette Redesign - Blue-Purple Theme:
  * Removed harsh green color palette and logo from splash screen per user feedback
  * Implemented new soft blue-purple gradient theme (blue → purple → indigo) for better visual comfort
  * Updated all card colors across entire application for consistent branding
  * Systematically replaced all brand-green color references with brand-indigo equivalents
  * Updated global CSS variables and theme definitions to maintain consistency
  * Applied new color scheme to all pages: splash, signup, recipes, profile, cooking, health, grocery, takeout, voice-cooking, ai-video-cooking
  * Enhanced button colors, borders, backgrounds, and accent colors throughout the application
  * Fixed button visibility by updating primary CSS variables to use indigo theme
  * Standardized all card backgrounds to consistent white across entire application
  * Replaced gray card backgrounds (bg-gray-50) with proper white card styling
  * Updated purple accent colors to match indigo theme for consistency
  * Fixed button visibility issues across all pages by removing custom brand-indigo classes
  * Standardized all buttons to use proper Button component with primary theme colors
  * Updated signup page card styling for consistent borders and completion indicators
  * Enhanced selection visual feedback across all pages with prominent indigo styling
  * Applied consistent selection patterns: indigo background, white text, shadow, and scale effects
  * Updated dietary preferences, signup avatar/chef selection, and recipe dish selection
  * Improved visual prominence of selected states from subtle to clearly visible
- July 04, 2025. Profile and Home page comprehensive improvements:
  * Fixed Profile address fields by adding streetAddress, city, state, zipCode to user schema
  * Removed redundant grey "View & Edit" button from dietary preferences section
  * Enhanced Profile address initialization to properly load and display saved address data
  * Redesigned Home page with comprehensive visual analytics dashboard
  * Replaced static numbers with interactive charts: bar charts for recipes, line charts for activity trends
  * Added month-by-month comparison charts showing 6-month progress history
  * Integrated Chart.js and react-chartjs-2 for professional data visualization
  * Added achievement breakdown doughnut chart and current month summary cards
  * Enhanced personalized greeting with time-of-day awareness and chef integration
  * Improved quick action cards with hover effects and better visual hierarchy
- July 04, 2025. Take-Out feature moved to Phase 2:
  * Removed Take-Out tab from bottom navigation (now 4 tabs: Home, Recipes, Voice Cook, Profile)
  * Saved complete Take-Out page content as takeout-backup-phase2.tsx for future implementation
  * Take-Out feature will be integrated after research on cloud kitchen marketplace integration
  * Streamlined navigation focuses on core MVP features: recipe generation and voice cooking
- July 04, 2025. Enhanced UX with Onboarding Tooltips and Visual Feedback:
  * Added comprehensive onboarding tooltip system for first-time user guidance
  * Implemented progress indicators for recipe generation with 4-step process visualization
  * Enhanced voice cooking interface with real-time visual feedback for voice commands and AI processing
  * Added smart tooltip guidance for recipe generation, voice cooking controls, and emergency features
  * Visual confirmations show detected voice commands and AI thinking states for better user understanding
  * Integrated contextual help system to reduce learning curve for new users
- July 04, 2025. Comprehensive Backend Architecture Design:
  * Created hybrid PostgreSQL + MongoDB database schema supporting millions of users
  * Designed comprehensive API architecture with 50+ endpoints across 8 major categories
  * Implemented strategic LLM distribution: GPT-4o (voice/vision), Claude 3.5 (reasoning), Gemini Pro (health insights)
  * Developed detailed sequence diagrams for all 8 major user flows with real-time capabilities
  * Integrated USDA and Spoonacular APIs for authentic nutritional data
  * Designed WebSocket architecture for real-time voice cooking assistance
  * Created complete external API integration strategy with rate limiting and error handling
  * Established system monitoring and analytics framework for production scaling
- July 04, 2025. Custom Avatar Integration and Chef Personality Enhancement:
  * Successfully integrated user-provided chef and user avatar icons into create account page
  * Replaced emoji placeholders with professional custom avatar images
  * Updated chef names to reflect personalities: Chef Marcus (Precise), Chef Luna (Vibrant), Chef Blaze (Bold), Chef Harmony (Zen)
  * Fixed all TypeScript errors and avatar selection logic for image-based avatars
  * Organized custom icons in proper asset folder structure for scalable management
- July 05, 2025. Comprehensive Substitution System and Auto-Selection Implementation:
  * Fixed major event handling issues where parent dish container was intercepting substitution clicks
  * Implemented automatic dish selection when any substitution or original ingredient is selected
  * Enhanced substitution logic with proper event prevention (preventDefault + stopPropagation)
  * Made entire ingredient/substitution boxes clickable for better user experience
  * Resolved checkbox selection bugs that were causing mass ingredient deselection
  * Cleaned up debugging console logs for production-ready experience
  * Maintained real-time shopping cart updates with selected ingredients and substitutions
- July 05, 2025. Health Tracking UI/UX Optimizations:
  * Enhanced typography: Made "7-Day Trends" bold and consistent with Daily Goals styling
  * Implemented alternative graph visualizations: Heatmap style for blood pressure, progress circles for blood sugar
  * Demonstrated additional graph options: bar charts, sparklines, gauge meters, candlestick charts
  * Improved Today's Activity layout: moved "Live" badge to right-aligned position with rectangular styling
  * Optimized card sizing: made heart rate subcard 1.5x wider to accommodate 2-column data display
  * Enhanced heart rate card to show both current BPM and resting status with normal indicator
- July 06, 2025. Shopping List UX Design Decision:
  * Maintained natural page scrolling for grocery list instead of constrained card height
  * Target demographic consideration: users 40+ prefer traditional scrolling over internal card scroll
  * Design prioritizes accessibility and familiar interaction patterns for older adults
  * Grocery list displays all items naturally without artificial height constraints
- July 06, 2025. Enhanced Nutrition Tracking with TDEE Integration:
  * Implemented three-way nutrition comparison: Recipe Average vs User Goals vs TDEE
  * Added Harris-Benedict formula for accurate Total Daily Energy Expenditure calculation
  * Enhanced nutrition tracking calculates daily averages from selected dishes over 7 days
  * Visual indicators show alignment with nutritional goals (✅ on track, ⚠️ needs adjustment)
  * Memoized expensive nutrition calculations for improved performance
- July 06, 2025. Comprehensive Code Cleanup and Performance Optimization:
  * Removed all @ts-nocheck directives and fixed TypeScript compliance
  * Cleaned up debugging console.log statements from client and server code
  * Optimized imports by removing unused Lucide React icons and components
  * Memoized expensive calculations in nutrition tracking with useCallback/useMemo
  * Reduced grocery list items from 12 to 8 for optimal mobile display
  * Maintained all functionality while improving app speed and code quality
- July 07, 2025. User Account Creation and Dietary Preferences Flow:
  * Fixed compilation errors in nuva-signup.tsx (duplicate variable declarations, chef selection logic)
  * Implemented chef selection with consistent avatar-based approach matching user avatar selection
  * Fixed verification code flow to navigate to dietary preferences without backend errors
  * Added user avatar and nickname display to all 5 cards in dietary preferences screen
  * Standardized background colors to clean white across signup and dietary screens
  * Updated color scheme to consistent purple/indigo theme throughout dietary preferences
  * Integrated temporary user data storage in localStorage for seamless signup flow
  * Created Explore Recipe Options screen with component-based architecture
  * Implemented DietaryPreferencesSummary reusable component for dietary data display
  * Created ScreenHeader component for consistent page headers across the application
  * Established component-first development standard for all future features
- July 07, 2025. Card 3 Recipe Options and Pantry Management System:
  * Implemented Card 3 with 4 recipe option buttons (Pantry Ingredients, Pantry Dishes, Chef's Choice, Create Dish)
  * Built comprehensive Pantry Ingredients large card with dropdown categories for space optimization
  * Added 6 ingredient categories (Meat, Fish, Vegetables, Grains, Dairy, Pantry) with checkbox selection
  * Implemented custom ingredient addition functionality with real-time grocery list sync
  * Created summary section showing selected ingredients count and visual tags
  * Added Grocery List card displaying all selected ingredients with action buttons
  * Enhanced UI with shadows, reduced white space, and compact button sizing (h-14 instead of h-20)
  * Set Pantry Ingredients as default selected option with purple selection highlighting
  * Established purple color consistency across all selection states (dietary preferences, recipe options)
  * Updated reusable-buttons component to use purple theme for consistent brand experience
- July 07, 2025. Voice Cooking Integration and Chef's Choice Layout Enhancement:
  * Fixed runtime error in voice cooking screen by adding missing Camera and ShoppingCart imports
  * Integrated real voice chat using Web Speech API for hands-free cooking assistance
  * Added text-to-speech for chef responses with personality-based voice characteristics (energetic, calm, playful)
  * Enhanced UI with real-time voice status indicators showing listening, speaking, and processing states
  * Implemented fallback to mock voice simulation when browser doesn't support speech recognition
  * Added visual feedback for user speech detection and chef response states
  * Removed images from Chef's Choice section per user request for cleaner interface
  * Enhanced Chef's Choice dish layout: dish name in first row, calories/timer left-aligned in second row, difficulty right-aligned at bottom
  * Standardized Pantry Dishes layout to match Chef's Choice structure for consistent visual hierarchy across all dish cards
  * Improved card structure with proper flexbox layout ensuring difficulty badges are consistently right-aligned in fixed positions
- July 08, 2025. Voice Cooking Chat Interface Implementation:
  * Successfully implemented voice cooking screen with complete chat interface matching user reference design
  * Repositioned voice options (Energetic, Calm, Playful) from bottom to header next to Chef Marcus name
  * Created bottom chat input area with three-component layout: Microphone button → Text input field → Pause button
  * Fixed compilation errors by restoring missing chef avatar imports that prevented page loading
  * Applied high z-index values (9999 for main container, 10000 for chat input) to ensure page visibility
  * Implemented fixed bottom positioning for chat input area with proper dark theme styling
  * Connected all cooking navigation points to voice cooking screen for unified cooking experience
  * Enhanced chat input with large text field, proper placeholder text, and responsive button sizing (14x14 touch targets)
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
Framework Header Standard: Screen names always use purple color (text-purple-600).
Development Standard: Always create reusable components first before implementing features. Use component-based architecture for all UI elements.
```