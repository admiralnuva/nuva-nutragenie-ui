# NutraGenie System Architecture

## High-Level Architecture Diagram

```
                                    +-------------------------+
                                    |     Client UI Layer     |
                                    |   React (Web/Mobile)    |
                                    |  Voice Interface (Web)  |
                                    +-------------------------+
                                                |
                                                v
    +------------------+            +-------------------------+            +------------------+
    |  Authentication  |<---------->|    Backend Services     |<---------->|   File Storage   |
    |   & Security     |            |      (Node.js/TS)      |            |   (AWS S3/CDN)   |
    |    (JWT/OAuth)   |            |     Express + APIs     |            | Recipe Images/   |
    +------------------+            +-------------------------+            |   Audio Files    |
                                                |                          +------------------+
                                                v
                              +----------------------------------+
                              |     AI/NLP Orchestration       |
                              |        (LangChain)             |
                              +----------------------------------+
                                                |
                      +-------------------------+-------------------------+
                      v                         v                         v
        +----------------------+    +----------------------+    +----------------------+
        |   Nutrition AI       |    |   Voice & Vision AI  |    |   Recipe AI Engine   |
        |                      |    |                      |    |                      |
        |  GPT-4o (Nutrition   |    |  GPT-4o (Voice/Text) |    |  GPT-4o (Recipe Gen) |
        |   Analysis & Macro   |    |  Whisper (Speech-to- |    |  Claude 3.5 Sonnet  |
        |   Calculations)      |    |   Text Transcription)|    |  (Complex Reasoning  |
        |                      |    |  GPT-4 Vision (Food  |    |   & Substitutions)   |
        |  Gemini Pro (Dietary |    |   Recognition)       |    |                      |
        |   Restrictions &     |    |                      |    |  DALL-E 3 (Recipe   |
        |   Health Insights)   |    |                      |    |   Image Generation)  |
        +----------------------+    +----------------------+    +----------------------+
                      |                         |                         |
                      v                         v                         v
        +----------------------+    +----------------------+    +----------------------+
        |   External APIs      |    |   Real-time Services |    |   Content Database   |
        |                      |    |                      |    |                      |
        |  USDA FoodData API   |    |  WebRTC (Video)     |    |  MongoDB (Recipes,  |
        |  (Nutritional Data)  |    |  WebSocket (Voice)   |    |   AI Personalities,  |
        |                      |    |  Text-to-Speech     |    |   User Preferences)  |
        |  Spoonacular API     |    |  (Native Browser)    |    |                      |
        |  (Ingredients &      |    |                      |    |  PostgreSQL (Users, |
        |   Substitutions)     |    |                      |    |   Transactions,      |
        +----------------------+    +----------------------+    |   Nutrition Tracking)|
                                                               +----------------------+
                                                                         |
                                                                         v
                                                               +----------------------+
                                                               |   Analytics &        |
                                                               |   Monitoring         |
                                                               |                      |
                                                               |  DataDog/CloudWatch |
                                                               |  User Behavior       |
                                                               |  Performance Metrics |
                                                               +----------------------+
```

## LLM Selection Strategy

### Primary LLM Assignments:

**GPT-4o (OpenAI)**
- **Voice Cooking Interface**: Real-time conversational AI with chef personalities
- **Vision Analysis**: Food recognition, cooking technique assessment, ingredient identification
- **Nutrition Analysis**: Macro/micro nutrient calculations and meal planning
- **Recipe Generation**: Creative recipe development based on ingredients

**Claude 3.5 Sonnet (Anthropic)**
- **Complex Recipe Reasoning**: Advanced ingredient substitutions and dietary adaptations
- **Nutritional Compliance**: Ensuring recipes meet specific health conditions (diabetes, heart disease)
- **Safety Analysis**: Food safety, allergy warnings, cooking temperature guidance

**Gemini Pro (Google)**
- **Dietary Restriction Processing**: Complex multi-constraint dietary requirement analysis
- **Health Insights**: Long-term nutrition trend analysis and health recommendations
- **Cultural Cuisine Expertise**: Authentic cultural recipe variations and techniques

**Whisper (OpenAI)**
- **Speech-to-Text**: Voice command transcription during cooking
- **Multi-language Support**: Recipe instructions in multiple languages

**DALL-E 3 (OpenAI)**
- **Recipe Image Generation**: Creating appealing dish images for generated recipes
- **Step Visualization**: Visual cooking step illustrations

## External API Integration:

**USDA FoodData Central API**
- Authoritative nutritional data
- Ingredient macro/micronutrient profiles
- Portion size standardization

**Spoonacular API**
- Ingredient substitution database
- Recipe parsing and analysis
- Grocery store product mapping

## Component Details

### Backend Services Architecture
```
Node.js/TypeScript Express Server
├── Authentication Service (JWT + OAuth)
├── User Profile Management
├── Recipe Generation Engine
├── Nutrition Tracking Service
├── Voice/Video Session Management
├── AI Orchestration Layer (LangChain)
├── External API Integration
└── Real-time Communication (WebSocket)
```

### Database Architecture
```
Hybrid Database Design:
├── PostgreSQL (ACID Compliance)
│   ├── Users & Authentication
│   ├── Financial Transactions
│   ├── Nutrition Tracking
│   └── Recipe Metadata
└── MongoDB (Flexible Documents)
    ├── Full Recipe Content
    ├── AI Chef Personalities
    ├── User Dietary Profiles
    └── Cooking Session Analytics
```

### AI Orchestration (LangChain)
```
LangChain Framework:
├── Agent Management (Chef Personalities)
├── Tool Integration (APIs, Databases)
├── Memory Management (Conversation History)
├── Prompt Engineering (Context-Aware Responses)
├── Chain Composition (Multi-step AI Workflows)
└── Error Handling & Fallback Strategies
```

## Key Architectural Decisions

### Why This LLM Distribution:

1. **GPT-4o for Voice/Vision**: Excellent multimodal capabilities, fast response times for real-time cooking assistance
2. **Claude 3.5 for Complex Reasoning**: Superior logical reasoning for ingredient substitutions and dietary restrictions
3. **Gemini Pro for Health Analysis**: Strong integration with Google's health knowledge base
4. **Hybrid Database**: PostgreSQL for financial integrity, MongoDB for flexible AI content

### Performance Considerations:

- **CDN Integration**: Recipe images and audio files served via CloudFront
- **Caching Strategy**: Redis for frequently accessed recipes and user preferences
- **Load Balancing**: Multiple backend instances for high availability
- **Real-time Optimization**: WebSocket connections for voice cooking sessions

### Security & Privacy:

- **Data Encryption**: End-to-end encryption for voice recordings
- **API Rate Limiting**: Prevent abuse of expensive LLM calls
- **User Privacy**: Anonymized analytics, GDPR compliance
- **Content Moderation**: AI-powered content filtering for user-generated recipes

This architecture provides redundancy, optimal LLM utilization, and scalability for millions of users while maintaining the voice cooking interface as the core MVP feature.