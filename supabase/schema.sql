-- ThetaCure Healthcare Platform Database Schema (PostgreSQL / Supabase)
-- Target Market: Bangladesh

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Core Auth & Roles)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(30) UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('patient', 'doctor', 'hospital_admin', 'super_admin')),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Patient Profiles
CREATE TABLE IF NOT EXISTS patient_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    date_of_birth DATE,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    emergency_contact VARCHAR(30),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Family Members
CREATE TABLE IF NOT EXISTS family_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES patient_profiles(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    relationship VARCHAR(50) NOT NULL,
    age INT,
    gender VARCHAR(20),
    blood_group VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Hospitals Table
CREATE TABLE IF NOT EXISTS hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    rating NUMERIC(3, 2) DEFAULT 0.0,
    review_count INT DEFAULT 0,
    address TEXT NOT NULL,
    area VARCHAR(100) NOT NULL,
    city VARCHAR(100) DEFAULT 'Dhaka',
    phone VARCHAR(50) NOT NULL,
    emergency_phone VARCHAR(50),
    beds VARCHAR(50),
    about TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(200) NOT NULL,
    bmdc_number VARCHAR(50) UNIQUE NOT NULL,
    degrees VARCHAR(255) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    experience_years INT NOT NULL,
    rating NUMERIC(3, 2) DEFAULT 0.0,
    review_count INT DEFAULT 0,
    hospital_id UUID REFERENCES hospitals(id) ON DELETE SET NULL,
    in_person_fee NUMERIC(10, 2) NOT NULL,
    online_fee NUMERIC(10, 2) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    about TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Appointment Slots
CREATE TABLE IF NOT EXISTS appointment_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
    hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    consultation_type VARCHAR(20) CHECK (consultation_type IN ('in-person', 'online')),
    is_booked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Appointments
CREATE TABLE IF NOT EXISTS appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_reference VARCHAR(30) UNIQUE NOT NULL,
    doctor_id UUID REFERENCES doctors(id) ON DELETE RESTRICT,
    hospital_id UUID REFERENCES hospitals(id) ON DELETE RESTRICT,
    patient_id UUID REFERENCES patient_profiles(id) ON DELETE CASCADE,
    slot_id UUID REFERENCES appointment_slots(id),
    consultation_type VARCHAR(20) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    fee NUMERIC(10, 2) NOT NULL,
    payment_method VARCHAR(50),
    payment_status VARCHAR(30) DEFAULT 'pending',
    status VARCHAR(30) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Diagnostic Tests & Prices
CREATE TABLE IF NOT EXISTS diagnostic_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(150) UNIQUE NOT NULL,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    sample_type VARCHAR(100),
    fasting_required BOOLEAN DEFAULT FALSE,
    preparation TEXT,
    report_delivery_time VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS diagnostic_test_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID REFERENCES diagnostic_tests(id) ON DELETE CASCADE,
    hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    branch VARCHAR(100),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(test_id, hospital_id, branch)
);

-- 9. Health Articles & Tips
CREATE TABLE IF NOT EXISTS health_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(200) UNIQUE NOT NULL,
    title VARCHAR(300) NOT NULL,
    category VARCHAR(100) NOT NULL,
    author_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    read_time VARCHAR(50),
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE patient_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Patients view own profile" ON patient_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Patients view own appointments" ON appointments
    FOR SELECT USING (auth.uid() = (SELECT user_id FROM patient_profiles WHERE id = appointments.patient_id));
