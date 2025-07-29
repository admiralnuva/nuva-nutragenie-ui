# NutraGenie Platform Architecture
## Multi-Tenant AI-Powered Wellness Infrastructure

### Executive Summary
NutraGenie is designed as a scalable, multi-tenant platform that can power multiple white-labeled wellness applications through intelligent routing and personalization layers. The architecture supports tenant-aware routing, ML-driven personalization, and modular AI components for maximum reusability.

---

## Core Architecture Layers

### 1. Client Layer (Multi-Platform)
```
┌─────────────────────────────────────┐
│           Client UI Layer           │
├─────────────────────────────────────┤
│ • React Mobile (Current NutraGenie) │
│ • React Web                         │
│ • Voice Interface (Web)             │
│ • White-label Apps                  │
└─────────────────────────────────────┘
```

**Current Implementation:**
- React 18 + TypeScript + Tailwind CSS
- Mobile-first responsive design
- Voice cooking interface integration
- Component-based architecture for reusability

---

### 2. Tenant-Aware Routing Layer
```
┌─────────────────────────────────────┐
│        API Gateway & Router         │
├─────────────────────────────────────┤
│ • Tenant Identification             │
│ • Request Routing                   │
│ • Authentication/Security           │
│ • Rate Limiting per Tenant          │
│ • API Versioning                    │
└─────────────────────────────────────┘
```

**Proposed Implementation:**
```typescript
interface TenantConfig {
  tenantId: string;
  subdomain: string;
  customDomain?: string;
  brandConfig: {
    name: string;
    colors: ThemeConfig;
    logo: string;
  };
  features: FeatureFlags;
  aiConfig: AIConfig;
  externalAPIs: ExternalAPIConfig[];
}

interface RoutingRule {
  tenantId: string;
  apiEndpoint: string;
  targetService: string;
  authMethod: 'jwt' | 'api-key' | 'oauth';
  rateLimit: RateLimit;
}
```

**Benefits:**
- Single infrastructure serving multiple brands
- Tenant isolation and data security
- Custom branding and feature sets per tenant
- Centralized management with distributed routing

---

### 3. Personalization Layer (ML/AI Engine)
```
┌─────────────────────────────────────┐
│     ML Personalization Engine      │
├─────────────────────────────────────┤
│ • User Behavior Analysis            │
│ • Preference Learning               │
│ • Recipe Recommendation Engine     │
│ • Health Pattern Recognition       │
│ • Adaptive UI/UX                   │
└─────────────────────────────────────┘
```

**ML Components:**

#### A) User Preference Learning
```python
# Pseudo-code for ML pipeline
class PersonalizationEngine:
    def __init__(self, tenant_config):
        self.user_embeddings = UserEmbeddingModel()
        self.recipe_recommender = RecipeRecommendationModel()
        self.health_predictor = HealthTrendModel()
        
    def personalize_experience(self, user_id, context):
        user_profile = self.get_user_embedding(user_id)
        recommendations = self.recipe_recommender.predict(user_profile, context)
        health_insights = self.health_predictor.analyze_trends(user_id)
        return PersonalizedResponse(recommendations, health_insights)
```

#### B) Real-time Adaptation
- **Dietary Evolution Tracking**: Learn changing preferences over time
- **Seasonal Adaptation**: Adjust recommendations based on time/location
- **Health Goal Alignment**: Optimize suggestions for user's health objectives
- **Social Learning**: Incorporate community preferences (privacy-compliant)

#### C) Multi-Modal Learning
- **Voice Pattern Analysis**: Cooking style preferences from voice interactions
- **Visual Recognition**: Food recognition and portion analysis
- **Behavioral Patterns**: Cooking frequency, success rates, abandonment points

---

### 4. AI Components & LLMs (Current + Enhanced)

#### Current Implementation:
```typescript
// From your existing architecture
interface AIService {
  nutritionAnalysis: 'GPT-4o'; // Nutrition Analysis & Macro Calculations
  recipeGeneration: 'ChatGPT-4o'; // Recipe Generation, Voice/Text Support
  voiceSupport: 'GPT-4o'; // Voice/Vision interaction
  complexReasoning: 'Claude 3.5 Sonnet'; // Complex Reasoning and Substitutions
  healthInsights: 'Gemini Pro'; // Health insights, Ethnic recipe generation
}
```

#### Enhanced Multi-Tenant AI Layer:
```typescript
interface TenantAIConfig {
  tenantId: string;
  aiProviders: {
    primary: 'openai' | 'anthropic' | 'google';
    fallback: 'openai' | 'anthropic' | 'google';
    specialized: {
      nutrition: AIProvider;
      recipes: AIProvider;
      health: AIProvider;
      voice: AIProvider;
    };
  };
  modelVersions: ModelVersionConfig;
  customPrompts: TenantPromptTemplates;
  dataRetention: DataRetentionPolicy;
}
```

---

### 5. Backend Services (Microservices Architecture)

```
┌─────────────────────────────────────┐
│        Backend Services             │
├─────────────────────────────────────┤
│ • Authentication Service (JWT)      │
│ • User Management Service          │
│ • Recipe Engine Service            │
│ • Nutrition Analysis Service       │
│ • Personalization Service          │
│ • Notification Service             │
│ • Analytics Service                │
│ • Integration Service              │
└─────────────────────────────────────┘
```

**Current Express.js can evolve to:**
- **Microservices**: Containerized services for each domain
- **Event-Driven**: Message queues for async processing
- **API Gateway**: Central routing with tenant awareness

---

### 6. External API Integration Layer

#### Current External APIs:
- USDA Food Data API (Nutritional Data)
- Spoonacular API (Ingredients and Substitutions)
- Edamam API (Recipes, Ingredients, Nutritional Data)
- Payment Gateways API

#### Enhanced Multi-Tenant Integration:
```typescript
interface ExternalAPIRouter {
  routeRequest(tenantId: string, apiType: string, request: APIRequest): Promise<APIResponse>;
  
  // Examples:
  // Tenant A uses Spoonacular + USDA
  // Tenant B uses Edamam + Custom Nutrition API
  // Tenant C uses Yuka API for European food data
}

interface TenantAPIConfig {
  nutritionAPI: 'usda' | 'edamam' | 'spoonacular' | 'custom';
  recipeAPI: 'spoonacular' | 'edamam' | 'yummly' | 'custom';
  paymentGateway: 'stripe' | 'paypal' | 'square' | 'custom';
  deliveryAPI: 'doordash' | 'ubereats' | 'instacart' | 'custom';
}
```

---

### 7. Data Layer (Multi-Tenant Database Architecture)

#### Current Schema Enhancement:
```sql
-- Add tenant awareness to existing schema
ALTER TABLE users ADD COLUMN tenant_id VARCHAR(50) NOT NULL;
ALTER TABLE recipes ADD COLUMN tenant_id VARCHAR(50) NOT NULL;
ALTER TABLE nutrition_entries ADD COLUMN tenant_id VARCHAR(50) NOT NULL;

-- Tenant configuration table
CREATE TABLE tenants (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  subdomain VARCHAR(50) UNIQUE,
  custom_domain VARCHAR(100),
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ML/Personalization tables
CREATE TABLE user_embeddings (
  user_id INTEGER REFERENCES users(id),
  tenant_id VARCHAR(50) REFERENCES tenants(id),
  embedding_vector FLOAT[],
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE personalization_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  tenant_id VARCHAR(50) REFERENCES tenants(id),
  event_type VARCHAR(50),
  event_data JSONB,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

#### Data Isolation Strategies:
1. **Row-Level Security**: PostgreSQL RLS for tenant isolation
2. **Database per Tenant**: Complete isolation for enterprise clients
3. **Schema per Tenant**: Moderate isolation with shared infrastructure

---

## Multi-Tenant Routing Strategy

### 1. Tenant Identification
```typescript
interface TenantResolver {
  // Option 1: Subdomain-based
  resolveBySubdomain(host: string): TenantConfig;
  
  // Option 2: Custom domain
  resolveByDomain(domain: string): TenantConfig;
  
  // Option 3: Header-based (for APIs)
  resolveByHeader(headers: Record<string, string>): TenantConfig;
  
  // Option 4: JWT claims
  resolveByToken(token: string): TenantConfig;
}
```

### 2. Dynamic Routing Examples
```typescript
// Current: nutragenie.replit.app
// Tenant A: healthyeats.yourdomain.com
// Tenant B: wellness.customdomain.com
// Tenant C: nutrition.anotherdomain.com

const routingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const tenant = resolveTenant(req);
  req.tenant = tenant;
  
  // Route to tenant-specific APIs
  if (req.path.startsWith('/api/recipes')) {
    return routeToRecipeAPI(tenant.recipeAPIConfig, req, res);
  }
  
  if (req.path.startsWith('/api/nutrition')) {
    return routeToNutritionAPI(tenant.nutritionAPIConfig, req, res);
  }
  
  next();
};
```

---

## Personalization Implementation Strategy

### Phase 1: Data Collection (Current + Enhanced)
```typescript
interface UserInteractionEvent {
  userId: string;
  tenantId: string;
  timestamp: Date;
  eventType: 'recipe_view' | 'recipe_cook' | 'ingredient_select' | 'voice_command';
  eventData: {
    recipeId?: string;
    ingredients?: string[];
    cookingDuration?: number;
    satisfaction?: number;
    voiceCommand?: string;
  };
}
```

### Phase 2: Model Training Pipeline
```python
# Simplified ML pipeline
class NutraGenieML:
    def __init__(self):
        self.user_embeddings = {}
        self.recipe_embeddings = {}
        self.interaction_model = None
        
    def train_user_embeddings(self, interactions):
        # Learn user preferences from interactions
        # Incorporate dietary restrictions, health goals, cooking patterns
        pass
        
    def generate_recommendations(self, user_id, context):
        # Real-time personalized recommendations
        # Consider time of day, season, available ingredients
        pass
        
    def update_real_time(self, new_interaction):
        # Online learning for immediate adaptation
        pass
```

### Phase 3: Deployment Strategy
- **Model Serving**: TensorFlow Serving or PyTorch Serve
- **Feature Store**: Real-time feature computation
- **A/B Testing**: Experimentation framework for model improvements
- **Monitoring**: Model performance and drift detection

---

## White Label Customization Framework

### 1. Brand Customization
```typescript
interface BrandConfig {
  name: string;
  logo: {
    light: string;
    dark: string;
    favicon: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  messaging: {
    tagline: string;
    welcomeMessage: string;
    chefPersonality: string;
  };
}
```

### 2. Feature Configuration
```typescript
interface FeatureFlags {
  voiceCooking: boolean;
  takeoutOrdering: boolean;
  groceryIntegration: boolean;
  socialSharing: boolean;
  premiumFeatures: boolean;
  aiVideoAnalysis: boolean;
  nutritionTracking: boolean;
  mealPlanning: boolean;
}
```

### 3. Content Customization
```typescript
interface ContentConfig {
  defaultCuisines: string[];
  featuredRecipes: string[];
  healthFocusAreas: string[];
  dietaryRestrictions: string[];
  customCategories: CategoryConfig[];
}
```

---

## Technology Stack Evolution

### Current → Enhanced
```
Current:
├── React 18 + TypeScript
├── Node.js + Express
├── PostgreSQL + Drizzle ORM
├── TanStack Query
└── Tailwind CSS + shadcn/ui

Enhanced Multi-Tenant:
├── React 18 + TypeScript (unchanged)
├── Node.js + Express → Microservices (NestJS/FastAPI)
├── PostgreSQL + Drizzle → Multi-tenant PostgreSQL + Redis
├── TanStack Query → Apollo Client (for GraphQL)
├── Tailwind CSS → Dynamic Theming System
├── AI/ML Services (Python/PyTorch)
├── Message Queue (Redis/RabbitMQ)
├── API Gateway (Kong/AWS API Gateway)
└── Container Orchestration (Docker + Kubernetes)
```

---

## Deployment Architecture

### Current State: Replit Deployment
### Proposed: Multi-Cloud Infrastructure

```
┌─────────────────────────────────────┐
│            Load Balancer            │
├─────────────────────────────────────┤
│ • Tenant Routing                    │
│ • SSL Termination                   │
│ • Request Distribution              │
└─────────────────────────────────────┘
              │
┌─────────────────────────────────────┐
│          API Gateway                │
├─────────────────────────────────────┤
│ • Authentication                    │
│ • Rate Limiting                     │
│ • Request/Response Transformation   │
└─────────────────────────────────────┘
              │
┌─────────────────────────────────────┐
│        Microservices Cluster       │
├─────────────────────────────────────┤
│ • User Service                      │
│ • Recipe Service                    │
│ • Personalization Service          │
│ • AI/ML Service                     │
│ • Notification Service              │
└─────────────────────────────────────┘
```

---

## Implementation Roadmap

### Phase 1: Foundation (Current State)
- ✅ Core NutraGenie application
- ✅ Basic AI integration
- ✅ User management and preferences

### Phase 2: Multi-Tenancy (2-3 months)
- Tenant-aware database schema
- Routing layer implementation
- Basic white-labeling support
- API versioning

### Phase 3: Personalization Engine (3-4 months)
- ML pipeline development
- User behavior tracking
- Recommendation system
- A/B testing framework

### Phase 4: Advanced Features (4-6 months)
- Advanced AI capabilities
- Real-time personalization
- Social features
- Enterprise integrations

### Phase 5: Scale & Optimization (Ongoing)
- Performance optimization
- Advanced analytics
- Multi-region deployment
- Enterprise security features

---

## Success Metrics

### Technical Metrics
- **Response Time**: <200ms for API calls
- **Uptime**: 99.9% availability
- **Tenant Isolation**: Zero cross-tenant data leakage
- **ML Accuracy**: >85% recommendation relevance

### Business Metrics
- **Tenant Onboarding**: <24 hours for new white-label setup
- **User Engagement**: 40% increase with personalization
- **Revenue per Tenant**: Scalable pricing model
- **Time to Market**: 80% faster for new tenant deployments

---

This architecture enables NutraGenie to scale from a single application to a comprehensive platform powering multiple wellness brands while maintaining performance, security, and personalization capabilities.