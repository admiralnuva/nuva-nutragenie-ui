# NutraGenie API Design

## API Overview

Based on the system architecture, here are the core APIs needed for NutraGenie:

## 1. Authentication & User Management APIs

### `/api/auth`
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - User logout
- `POST /auth/verify-phone` - Phone verification
- `POST /auth/reset-password` - Password reset

### `/api/users`
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile
- `GET /users/dietary-preferences` - Get dietary profile
- `PUT /users/dietary-preferences` - Update dietary preferences
- `DELETE /users/account` - Delete user account

## 2. Recipe Management APIs

### `/api/recipes`
- `GET /recipes` - List recipes with filters
- `GET /recipes/:id` - Get full recipe details
- `POST /recipes/generate` - AI recipe generation
- `POST /recipes` - Create custom recipe
- `PUT /recipes/:id` - Update recipe
- `DELETE /recipes/:id` - Delete recipe
- `POST /recipes/:id/rate` - Rate recipe
- `GET /recipes/:id/ratings` - Get recipe ratings
- `GET /recipes/recommended` - Get personalized recommendations
- `POST /recipes/:id/substitute` - Get ingredient substitutions

### `/api/recipes/search`
- `GET /recipes/search` - Search recipes by ingredients/name
- `GET /recipes/search/by-nutrition` - Search by nutritional criteria
- `GET /recipes/search/by-dietary` - Search by dietary restrictions

## 3. AI Chef & Voice Cooking APIs

### `/api/chef`
- `GET /chef/personalities` - List available chef personalities
- `PUT /chef/select` - Select chef personality
- `POST /chef/chat` - Send message to AI chef
- `GET /chef/chat/history` - Get conversation history

### `/api/cooking-sessions`
- `POST /cooking-sessions` - Start cooking session
- `GET /cooking-sessions/:id` - Get session details
- `PUT /cooking-sessions/:id/step` - Update current step
- `POST /cooking-sessions/:id/voice` - Process voice command
- `POST /cooking-sessions/:id/complete` - Mark session complete
- `DELETE /cooking-sessions/:id` - Cancel session

### `/api/voice`
- `POST /voice/transcribe` - Convert speech to text
- `POST /voice/synthesize` - Convert text to speech
- `POST /voice/analyze-food` - Analyze food via camera/image

## 4. Nutrition Tracking APIs

### `/api/nutrition`
- `GET /nutrition/goals` - Get nutrition goals
- `PUT /nutrition/goals` - Set nutrition goals
- `GET /nutrition/entries` - Get nutrition entries
- `POST /nutrition/entries` - Log nutrition entry
- `PUT /nutrition/entries/:id` - Update nutrition entry
- `DELETE /nutrition/entries/:id` - Delete nutrition entry
- `GET /nutrition/progress` - Get progress analytics
- `GET /nutrition/trends` - Get nutrition trends

### `/api/health`
- `GET /health/metrics` - Get health metrics
- `POST /health/metrics` - Log health metric
- `PUT /health/metrics/:id` - Update health metric
- `GET /health/analytics` - Get health analytics

## 5. Shopping & Grocery APIs

### `/api/grocery`
- `GET /grocery/lists` - Get grocery lists
- `POST /grocery/lists` - Create grocery list
- `PUT /grocery/lists/:id` - Update grocery list
- `DELETE /grocery/lists/:id` - Delete grocery list
- `POST /grocery/lists/:id/instacart` - Connect to Instacart

### `/api/instacart`
- `GET /instacart/stores` - Get available stores
- `POST /instacart/order` - Place Instacart order
- `GET /instacart/orders` - Get order history
- `GET /instacart/orders/:id/status` - Track order status

## 6. External API Integration

### `/api/external/nutrition`
- `GET /external/nutrition/usda/:ingredient` - Get USDA nutrition data
- `GET /external/nutrition/spoonacular/:ingredient` - Get Spoonacular data
- `POST /external/nutrition/analyze` - Analyze recipe nutrition

### `/api/external/substitutions`
- `GET /external/substitutions/:ingredient` - Get ingredient substitutions
- `POST /external/substitutions/suggest` - AI-powered substitution suggestions

## 7. AI Orchestration APIs

### `/api/ai`
- `POST /ai/recipe/generate` - Generate recipe with multiple AI models
- `POST /ai/nutrition/analyze` - Comprehensive nutrition analysis
- `POST /ai/chat/chef` - Chef personality interaction
- `POST /ai/vision/food` - Food recognition and analysis
- `POST /ai/health/insights` - Health insights generation

## 8. Analytics & Monitoring APIs

### `/api/analytics`
- `GET /analytics/user-behavior` - User behavior analytics
- `GET /analytics/recipe-performance` - Recipe performance metrics
- `GET /analytics/feature-usage` - Feature usage statistics
- `POST /analytics/events` - Log user events

### `/api/monitoring`
- `GET /monitoring/health` - System health check
- `GET /monitoring/ai-models` - AI model status
- `GET /monitoring/external-apis` - External API status

## API Structure Details

### Request/Response Format
All APIs use JSON format with standardized response structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully",
  "timestamp": "2025-01-04T23:30:00Z",
  "requestId": "req_123456789"
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": { ... }
  },
  "timestamp": "2025-01-04T23:30:00Z",
  "requestId": "req_123456789"
}
```

### Authentication
- JWT tokens for user authentication
- API keys for external service access
- Rate limiting per user/endpoint

### WebSocket Endpoints

For real-time features:

- `ws://api/cooking-session/:id` - Real-time cooking guidance
- `ws://api/voice-chat/:sessionId` - Voice conversation streaming
- `ws://api/notifications` - Real-time notifications

## API Rate Limits

### User APIs
- Standard: 1000 requests/hour
- Premium: 5000 requests/hour

### AI-Powered APIs
- Recipe Generation: 50 requests/hour
- Voice Processing: 200 requests/hour
- Vision Analysis: 100 requests/hour

### External API Calls
- USDA: 1000 requests/day
- Spoonacular: 500 requests/day (free tier)
- OpenAI: Based on subscription tier

## Data Validation

Each API endpoint includes:
- Input validation using Zod schemas
- Rate limiting middleware
- Authentication verification
- Error handling and logging
- Response caching where appropriate

## API Documentation

Complete OpenAPI/Swagger documentation available at:
- Development: `http://localhost:3000/api/docs`
- Production: `https://api.nutragenie.com/docs`

Interactive API testing available through Swagger UI with authentication support and example requests for all endpoints.