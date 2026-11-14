-- ==============================================================================
-- KSEAB SSLC 98% Score Accelerator — Stage 2 Multi-User SaaS Migration
-- Target: Post-May 2027 Public Launch with Supabase Auth & PostgreSQL RLS
-- ==============================================================================

-- 1. PROFILES TABLE (Linked to Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    student_name TEXT NOT NULL,
    phone_number TEXT,
    school_name TEXT,
    target_marks INT DEFAULT 618 CHECK (target_marks BETWEEN 400 AND 625),
    xp INT DEFAULT 0,
    level INT DEFAULT 1,
    streak_days INT DEFAULT 1,
    last_active_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- 2. SUBJECT MARKS TABLE
CREATE TABLE IF NOT EXISTS public.subject_marks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_code VARCHAR(10) NOT NULL CHECK (subject_code IN ('01K', '31E', '61H', '81E', '83E', '85E')),
    theory_marks INT NOT NULL DEFAULT 0,
    ia_marks INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (student_id, subject_code)
);

ALTER TABLE public.subject_marks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students manage own subject marks"
    ON public.subject_marks FOR ALL
    USING (auth.uid() = student_id);

-- 3. MISTAKE VAULT TABLE
CREATE TABLE IF NOT EXISTS public.mistake_vault (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_code VARCHAR(10) NOT NULL,
    topic TEXT NOT NULL,
    question_summary TEXT NOT NULL,
    error_type VARCHAR(50) NOT NULL,
    mark_lost NUMERIC(3, 1) NOT NULL DEFAULT 0.5,
    how_to_avoid TEXT NOT NULL,
    ktbs_chapter_ref TEXT,
    is_mastered BOOLEAN DEFAULT FALSE,
    logged_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.mistake_vault ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students manage own mistake vault"
    ON public.mistake_vault FOR ALL
    USING (auth.uid() = student_id);

-- 4. AI VALUATIONS LOG TABLE
CREATE TABLE IF NOT EXISTS public.ai_valuations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_code VARCHAR(10) NOT NULL,
    question_text TEXT NOT NULL,
    max_marks INT NOT NULL,
    awarded_marks NUMERIC(3, 1) NOT NULL,
    grade_status VARCHAR(50) NOT NULL,
    step_breakdown JSONB NOT NULL,
    half_mark_leaks TEXT[] DEFAULT '{}',
    examiner_advice TEXT,
    model_answer TEXT,
    image_storage_path TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.ai_valuations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students view own valuations"
    ON public.ai_valuations FOR SELECT
    USING (auth.uid() = student_id);

CREATE POLICY "Students insert valuations"
    ON public.ai_valuations FOR INSERT
    WITH CHECK (auth.uid() = student_id);

-- 5. BLUEPRINT PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.blueprint_progress (
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    topic_id VARCHAR(50) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (student_id, topic_id)
);

ALTER TABLE public.blueprint_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students manage own blueprint progress"
    ON public.blueprint_progress FOR ALL
    USING (auth.uid() = student_id);

-- 6. INDEXES FOR HIGH-THROUGHPUT PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_mistakes_student ON public.mistake_vault(student_id);
CREATE INDEX IF NOT EXISTS idx_valuations_student ON public.ai_valuations(student_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_marks_student ON public.subject_marks(student_id);
