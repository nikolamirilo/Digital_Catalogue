CREATE TABLE analytics (
  id BIGSERIAL PRIMARY KEY,
  date DATE NOT NULL,
  hour TEXT NOT NULL,
  current_url TEXT NOT NULL,
  pageview_count INTEGER NOT NULL,
  unique_visitors INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_analytics_per_period UNIQUE (date, hour, current_url)
);