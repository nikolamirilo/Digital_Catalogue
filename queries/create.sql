-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- for gen_random_uuid()

-- 1. Create pricing_plans table
CREATE TABLE public.pricing_plans (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying(100) NOT NULL,
  description text NULL,
  price numeric(10, 2) NOT NULL,
  billing_cycle character varying(20) NOT NULL DEFAULT 'monthly',
  features jsonb NULL,
  is_active boolean NULL DEFAULT true,
  created_at timestamp WITHOUT time zone NULL DEFAULT now(),
  updated_at timestamp WITHOUT time zone NULL DEFAULT now(),
  CONSTRAINT pricing_plans_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;

-- 2. Create users table
CREATE TABLE public.users (
  id text NOT NULL,
  name text NULL,
  created_at timestamp WITH time zone NULL DEFAULT CURRENT_TIMESTAMP,
  image text NULL DEFAULT 'NULL',
  plan_id uuid NULL,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_clerk_user_id_key UNIQUE (id),
  CONSTRAINT fk_plan FOREIGN KEY (plan_id) REFERENCES public.pricing_plans (id) ON DELETE SET NULL
) TABLESPACE pg_default;

-- 3. Create analytics table
CREATE TABLE public.analytics (
  id bigserial NOT NULL,
  date date NOT NULL,
  hour text NOT NULL,
  current_url text NOT NULL,
  pageview_count integer NOT NULL,
  unique_visitors integer NULL,
  created_at timestamp WITH time zone NULL DEFAULT now(),
  user_id text NULL,
  CONSTRAINT analytics_pkey PRIMARY KEY (id),
  CONSTRAINT unique_analytics_per_period UNIQUE (date, hour, current_url)
) TABLESPACE pg_default;

-- 4. Create service_catalogues table
CREATE TABLE public.service_catalogues (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_by text NOT NULL,
  theme text NULL,
  logo text NULL,
  layout text NULL,
  title text NULL,
  currency text NULL,
  legal_name text NULL,
  contact jsonb NULL,
  subtitle text NULL,
  services jsonb NULL,
  created_at timestamp WITH time zone NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp WITH time zone NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT restaurants_pkey PRIMARY KEY (id)
) TABLESPACE pg_default;
