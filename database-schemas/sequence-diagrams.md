# NutraGenie Sequence Diagrams

## 1. User Registration & Onboarding Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client App
    participant A as Auth API
    participant PG as PostgreSQL
    participant M as MongoDB
    participant AI as AI Service

    U->>C: Start Registration
    C->>A: POST /auth/register {email, password, nickname}
    A->>PG: Create user record
    PG-->>A: User created (ID: 123)
    A->>M: Create user profile {postgresUserId: 123}
    M-->>A: Profile created
    A-->>C: Registration success + JWT token

    U->>C: Complete dietary preferences
    C->>A: PUT /users/dietary-preferences
    A->>M: Update user profile with dietary data
    M-->>A: Profile updated
    A-->>C: Preferences saved

    U->>C: Select AI chef personality
    C->>AI: GET /chef/personalities
    AI->>M: Fetch available personalities
    M-->>AI: Chef personalities data
    AI-->>C: List of chef options
    C->>A: PUT /chef/select {personality: "energetic"}
    A->>M: Update user preferences
    M-->>A: Chef selected
    A-->>C: Chef personality set
```

## 2. AI Recipe Generation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client App
    participant R as Recipe API
    participant AI as AI Orchestration
    participant GPT as GPT-4o
    participant Claude as Claude 3.5
    participant USDA as USDA API
    participant SP as Spoonacular API
    participant PG as PostgreSQL
    participant M as MongoDB

    U->>C: Select ingredients & preferences
    C->>R: POST /recipes/generate {ingredients, dietary_restrictions}
    R->>AI: Process recipe generation request
    
    par Nutrition Analysis
        AI->>GPT: Analyze nutritional requirements
        GPT-->>AI: Macro/micro nutrient recommendations
    and Ingredient Validation
        AI->>USDA: Validate ingredient nutrition data
        USDA-->>AI: Nutritional data
        AI->>SP: Get ingredient substitutions
        SP-->>AI: Substitution options
    end

    AI->>Claude: Generate recipe with substitutions
    Claude-->>AI: Complete recipe with steps
    AI->>GPT: Generate recipe image
    GPT-->>AI: Recipe image URL

    AI->>M: Store detailed recipe content
    M-->>AI: Recipe stored (MongoDB ID)
    AI->>PG: Store recipe metadata + MongoDB reference
    PG-->>AI: Recipe metadata stored
    
    AI-->>R: Recipe generation complete
    R-->>C: Recipe data + nutrition info
    C-->>U: Display generated recipe
```

## 3. Voice Cooking Assistant Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client App
    participant V as Voice API
    participant CS as Cooking Session
    participant AI as AI Orchestration
    participant Whisper as Whisper API
    participant GPT as GPT-4o
    participant M as MongoDB
    participant PG as PostgreSQL

    U->>C: Start voice cooking session
    C->>CS: POST /cooking-sessions {recipeId, mode: "voice"}
    CS->>PG: Create session record
    PG-->>CS: Session created (ID: 456)
    CS->>M: Create detailed session document
    M-->>CS: Session document created
    CS-->>C: Session started

    loop Voice Interaction
        U->>C: Speak voice command
        C->>V: POST /voice/transcribe {audioData}
        V->>Whisper: Transcribe speech
        Whisper-->>V: Text transcription
        V->>AI: Process command with context
        AI->>M: Get chef personality & conversation history
        M-->>AI: Personality data & history
        AI->>GPT: Generate contextual response
        GPT-->>AI: Chef response
        AI->>M: Log interaction
        M-->>AI: Interaction logged
        AI-->>V: Response text + audio
        V-->>C: Voice response + text
        C-->>U: Play chef voice response
    end

    U->>C: Complete cooking step
    C->>CS: PUT /cooking-sessions/456/step {stepNumber: 3}
    CS->>PG: Update session progress
    PG-->>CS: Progress updated
    CS->>M: Log step completion details
    M-->>CS: Step logged
    CS-->>C: Step completion confirmed
```

## 4. Food Vision Analysis Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client App
    participant V as Vision API
    participant AI as AI Orchestration
    participant GPT4V as GPT-4 Vision
    participant N as Nutrition API
    participant USDA as USDA API
    participant M as MongoDB

    U->>C: Take photo of food/ingredient
    C->>V: POST /voice/analyze-food {imageData}
    V->>AI: Process food recognition
    AI->>GPT4V: Analyze food image
    GPT4V-->>AI: Food identification + confidence
    
    AI->>USDA: Get nutrition data for identified food
    USDA-->>AI: Nutritional information
    AI->>N: Calculate portions & macros
    N-->>AI: Calculated nutrition
    
    AI->>M: Log vision analysis session
    M-->>AI: Analysis logged
    AI-->>V: Complete food analysis
    V-->>C: Food info + nutrition + suggestions
    C-->>U: Display food analysis results
```

## 5. Nutrition Tracking & Health Analytics Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client App
    participant N as Nutrition API
    participant H as Health API
    participant AI as AI Orchestration
    participant Gemini as Gemini Pro
    participant PG as PostgreSQL
    participant M as MongoDB

    U->>C: Log food intake
    C->>N: POST /nutrition/entries {food, quantity, mealType}
    N->>PG: Store nutrition entry
    PG-->>N: Entry stored
    N-->>C: Logging confirmed

    U->>C: View health analytics
    C->>H: GET /health/analytics
    H->>PG: Fetch nutrition & health data
    PG-->>H: Historical data
    H->>AI: Generate health insights
    AI->>M: Get user health goals & restrictions
    M-->>AI: User health profile
    AI->>Gemini: Analyze health trends
    Gemini-->>AI: Health insights & recommendations
    AI-->>H: Processed insights
    H-->>C: Analytics + recommendations
    C-->>U: Display health dashboard
```

## 6. Grocery Shopping & Instacart Integration Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client App
    participant G as Grocery API
    participant I as Instacart API
    participant R as Recipe API
    participant PG as PostgreSQL
    participant M as MongoDB
    participant IC as Instacart Service

    U->>C: Generate grocery list from recipes
    C->>G: POST /grocery/lists {recipeIds}
    G->>R: Get recipe ingredients
    R->>M: Fetch detailed ingredient lists
    M-->>R: Ingredient data
    R-->>G: Consolidated ingredients
    G->>PG: Store grocery list
    PG-->>G: List stored
    G-->>C: Grocery list created

    U->>C: Order through Instacart
    C->>I: POST /instacart/order {groceryListId, storeId}
    I->>PG: Get grocery list items
    PG-->>I: Item list
    I->>IC: Place order via Instacart API
    IC-->>I: Order confirmation + tracking
    I->>PG: Store order record
    PG-->>I: Order stored
    I-->>C: Order placed successfully
    C-->>U: Show order confirmation + tracking
```

## 7. Recipe Rating & Recommendation Engine Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client App
    participant R as Recipe API
    participant AI as AI Orchestration
    participant Claude as Claude 3.5
    participant A as Analytics API
    participant PG as PostgreSQL
    participant M as MongoDB

    U->>C: Rate completed recipe
    C->>R: POST /recipes/123/rate {rating: 5, review}
    R->>PG: Store rating & update aggregates
    PG-->>R: Rating stored
    R->>A: Trigger recommendation update
    A->>M: Update user behavior analytics
    M-->>A: Analytics updated
    A-->>R: Rating processed

    U->>C: Request recipe recommendations
    C->>R: GET /recipes/recommended
    R->>AI: Generate personalized recommendations
    AI->>M: Get user preferences & cooking history
    M-->>AI: User profile data
    AI->>PG: Get recipe metadata & ratings
    PG-->>AI: Recipe data
    AI->>Claude: Generate smart recommendations
    Claude-->>AI: Recommended recipe IDs + reasoning
    AI-->>R: Recommendation list
    R-->>C: Personalized recipe recommendations
    C-->>U: Display recommended recipes
```

## 8. Real-time Cooking Guidance Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Client App
    participant WS as WebSocket Server
    participant CS as Cooking Session
    participant AI as AI Orchestration
    participant GPT as GPT-4o
    participant M as MongoDB

    U->>C: Start real-time cooking
    C->>WS: Connect to WebSocket /cooking-session/456
    WS->>CS: Initialize real-time session
    CS->>M: Get session context
    M-->>CS: Session data
    CS-->>WS: Session ready
    WS-->>C: Connected to real-time guidance

    loop Real-time Interaction
        U->>C: Voice command / question
        C->>WS: Send voice data
        WS->>AI: Process real-time command
        AI->>GPT: Generate immediate response
        GPT-->>AI: Chef response
        AI->>M: Log real-time interaction
        M-->>AI: Interaction logged
        AI-->>WS: Send response
        WS-->>C: Real-time chef guidance
        C-->>U: Immediate voice/text response
    end

    U->>C: Emergency stop / pause
    C->>WS: Send emergency command
    WS->>CS: Pause session
    CS->>M: Log pause event
    M-->>CS: Event logged
    CS-->>WS: Session paused
    WS-->>C: Cooking paused safely
    C-->>U: Show pause confirmation
```

## Key Flow Characteristics

### Performance Optimizations:
- **Parallel API calls** where possible (nutrition analysis + recipe generation)
- **WebSocket connections** for real-time features
- **Caching strategies** for frequently accessed data
- **Database optimization** with proper indexing

### Error Handling:
- **Graceful degradation** when AI services are unavailable
- **Retry mechanisms** for external API failures
- **Fallback responses** for voice cooking assistance
- **Data consistency** checks across hybrid databases

### Security Measures:
- **JWT authentication** for all protected endpoints
- **Rate limiting** on expensive AI operations
- **Input validation** on all user data
- **Secure storage** of voice recordings and personal data

These sequence diagrams show the complete data flow for all major features, highlighting the integration points between different services and the hybrid database architecture.