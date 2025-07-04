-- PostgreSQL Schema for NutraGenie RDBMS
-- Core structured data requiring ACID compliance

-- User accounts & authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nickname VARCHAR(100) NOT NULL,
    avatar VARCHAR(10),
    age_group VARCHAR(20),
    phone_number VARCHAR(20),
    street_address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(20),
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    account_status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User sessions and auth tokens
CREATE TABLE user_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    refresh_token VARCHAR(255),
    expires_at TIMESTAMP NOT NULL,
    device_info JSONB,
    ip_address INET,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscription and payment management
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    plan_type VARCHAR(50) NOT NULL, -- 'free', 'premium', 'family'
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'cancelled', 'expired'
    billing_cycle VARCHAR(20), -- 'monthly', 'yearly'
    amount DECIMAL(10,2),
    currency VARCHAR(3) DEFAULT 'USD',
    stripe_subscription_id VARCHAR(255),
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    trial_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Financial transactions
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    subscription_id INTEGER REFERENCES subscriptions(id),
    transaction_type VARCHAR(50) NOT NULL, -- 'subscription', 'instacart_order', 'refund'
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
    stripe_payment_intent_id VARCHAR(255),
    external_transaction_id VARCHAR(255), -- For Instacart orders
    metadata JSONB, -- Store additional transaction details
    processed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Instacart orders tracking
CREATE TABLE instacart_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    transaction_id INTEGER REFERENCES transactions(id),
    instacart_order_id VARCHAR(255) UNIQUE,
    store_name VARCHAR(100),
    total_amount DECIMAL(10,2),
    delivery_fee DECIMAL(10,2),
    service_fee DECIMAL(10,2),
    tip_amount DECIMAL(10,2),
    order_status VARCHAR(50), -- 'placed', 'shopping', 'delivered', 'cancelled'
    delivery_address JSONB,
    estimated_delivery TIMESTAMP,
    actual_delivery TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Nutrition goals and tracking
CREATE TABLE nutrition_goals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    daily_calories INTEGER,
    daily_protein INTEGER,
    daily_carbs INTEGER,
    daily_fat INTEGER,
    daily_fiber INTEGER,
    daily_sugar INTEGER,
    daily_sodium INTEGER,
    fitness_goal VARCHAR(50), -- 'lose_weight', 'gain_muscle', 'maintain', 'endurance'
    activity_level VARCHAR(20), -- 'sedentary', 'light', 'moderate', 'active', 'very_active'
    weight_goal DECIMAL(5,2),
    target_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Daily nutrition entries
CREATE TABLE nutrition_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    entry_date DATE NOT NULL,
    meal_type VARCHAR(20) NOT NULL, -- 'breakfast', 'lunch', 'dinner', 'snack'
    food_name VARCHAR(200) NOT NULL,
    calories INTEGER,
    protein DECIMAL(8,2),
    carbs DECIMAL(8,2),
    fat DECIMAL(8,2),
    fiber DECIMAL(8,2),
    sugar DECIMAL(8,2),
    sodium DECIMAL(8,2),
    serving_size VARCHAR(100),
    quantity DECIMAL(8,2) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Health metrics tracking
CREATE TABLE health_metrics (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recorded_date DATE NOT NULL,
    weight DECIMAL(5,2),
    body_fat_percentage DECIMAL(5,2),
    muscle_mass DECIMAL(5,2),
    blood_pressure_systolic INTEGER,
    blood_pressure_diastolic INTEGER,
    blood_sugar DECIMAL(5,2),
    energy_level INTEGER CHECK (energy_level >= 1 AND energy_level <= 10),
    sleep_hours DECIMAL(3,1),
    water_intake DECIMAL(5,2), -- in liters
    exercise_minutes INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipe metadata (basic info only)
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50), -- 'breakfast', 'lunch', 'dinner', 'snack', 'dessert'
    cuisine_type VARCHAR(50),
    difficulty_level VARCHAR(20), -- 'easy', 'medium', 'hard'
    prep_time_minutes INTEGER,
    cook_time_minutes INTEGER,
    total_time_minutes INTEGER,
    servings INTEGER,
    calories_per_serving INTEGER,
    dietary_tags TEXT[], -- ['vegetarian', 'vegan', 'gluten_free', 'keto', etc.]
    average_rating DECIMAL(3,2) DEFAULT 0,
    total_ratings INTEGER DEFAULT 0,
    created_by INTEGER REFERENCES users(id),
    is_public BOOLEAN DEFAULT TRUE,
    status VARCHAR(20) DEFAULT 'active', -- 'active', 'draft', 'archived'
    mongodb_recipe_id VARCHAR(50), -- Reference to full recipe in MongoDB
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recipe ratings and reviews
CREATE TABLE recipe_ratings (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(recipe_id, user_id)
);

-- Chat message history (structured conversation logs)
CREATE TABLE chat_messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes(id),
    conversation_id UUID DEFAULT gen_random_uuid(),
    sender_type VARCHAR(20) NOT NULL, -- 'user', 'chef', 'system'
    message_text TEXT NOT NULL,
    message_type VARCHAR(30) DEFAULT 'text', -- 'text', 'voice_transcript', 'system_notification'
    chef_personality VARCHAR(50), -- 'energetic', 'professional', 'encouraging'
    confidence_score DECIMAL(3,2), -- For AI responses
    response_time_ms INTEGER, -- AI response time
    session_type VARCHAR(20), -- 'cooking', 'planning', 'general'
    metadata JSONB, -- Store additional context like cooking step, ingredients discussed
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User cooking progress tracking
CREATE TABLE cooking_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    session_status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'paused', 'abandoned'
    current_step INTEGER DEFAULT 0,
    total_steps INTEGER,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    completion_percentage DECIMAL(5,2) DEFAULT 0,
    cooking_mode VARCHAR(20), -- 'voice', 'text', 'video'
    difficulty_feedback INTEGER CHECK (difficulty_feedback >= 1 AND difficulty_feedback <= 5),
    session_notes TEXT,
    mongodb_session_id VARCHAR(50), -- Reference to detailed session in MongoDB
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone_number);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_nutrition_entries_user_date ON nutrition_entries(user_id, entry_date);
CREATE INDEX idx_health_metrics_user_date ON health_metrics(user_id, recorded_date);
CREATE INDEX idx_recipes_category ON recipes(category);
CREATE INDEX idx_recipes_dietary_tags ON recipes USING GIN(dietary_tags);
CREATE INDEX idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX idx_chat_messages_conversation ON chat_messages(conversation_id);
CREATE INDEX idx_cooking_sessions_user_id ON cooking_sessions(user_id);
CREATE INDEX idx_cooking_sessions_status ON cooking_sessions(session_status);

-- Triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_instacart_orders_updated_at BEFORE UPDATE ON instacart_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_nutrition_goals_updated_at BEFORE UPDATE ON nutrition_goals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_nutrition_entries_updated_at BEFORE UPDATE ON nutrition_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recipes_updated_at BEFORE UPDATE ON recipes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_recipe_ratings_updated_at BEFORE UPDATE ON recipe_ratings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cooking_sessions_updated_at BEFORE UPDATE ON cooking_sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();