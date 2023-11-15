CREATE TABLE public.user (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NULL,
  source VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_token (
  user_id UUID NOT NULL,
  token VARCHAR(255) NOT NULL,
  expired_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, token)
);

CREATE TABLE public.user_verified (
  user_id UUID NOT NULL,
  verified_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id)
);

CREATE TABLE public.user_session (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL,
  is_active BOOLEAN,
  expired_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);