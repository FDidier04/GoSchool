import { db } from './connection';

export async function initializeDatabase() {
  try {
    // Create schemas and tables if they don't exist
    await db.none(`
      -- Create users table
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher', 'professional', 'school_admin')),
        avatar_url VARCHAR(500),
        phone_number VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create schools table
      CREATE TABLE IF NOT EXISTS schools (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        type VARCHAR(50) NOT NULL,
        address VARCHAR(500) NOT NULL,
        location POINT,
        phone_number VARCHAR(20) NOT NULL,
        email VARCHAR(255) NOT NULL,
        website VARCHAR(500),
        principal_name VARCHAR(255),
        founded_year INTEGER,
        student_count INTEGER,
        teacher_count INTEGER,
        average_rating DECIMAL(3, 2) DEFAULT 0,
        total_reviews INTEGER DEFAULT 0,
        success_rate DECIMAL(5, 2) DEFAULT 0,
        admission_fee DECIMAL(10, 2),
        monthly_fee DECIMAL(10, 2),
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create school series table
      CREATE TABLE IF NOT EXISTS school_series (
        id SERIAL PRIMARY KEY,
        school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
        series VARCHAR(10) NOT NULL,
        UNIQUE(school_id, series)
      );

      -- Create courses table
      CREATE TABLE IF NOT EXISTS courses (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        school_id UUID NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        series VARCHAR(10),
        level VARCHAR(100),
        duration INTEGER,
        price DECIMAL(10, 2),
        start_date DATE,
        max_students INTEGER,
        enrolled_students INTEGER DEFAULT 0,
        instructor VARCHAR(255),
        status VARCHAR(20) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create bookings table
      CREATE TABLE IF NOT EXISTS bookings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        student_id UUID NOT NULL REFERENCES users(id),
        course_id UUID NOT NULL REFERENCES courses(id),
        status VARCHAR(20) NOT NULL DEFAULT 'pending',
        payment_status VARCHAR(20) NOT NULL DEFAULT 'pending',
        amount DECIMAL(10, 2) NOT NULL,
        booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        start_date DATE,
        end_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create reviews table
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        school_id UUID REFERENCES schools(id),
        course_id UUID REFERENCES courses(id),
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        title VARCHAR(255),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Create indexes
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_schools_location ON schools USING GIST(location);
      CREATE INDEX IF NOT EXISTS idx_bookings_student ON bookings(student_id);
      CREATE INDEX IF NOT EXISTS idx_bookings_course ON bookings(course_id);
      CREATE INDEX IF NOT EXISTS idx_reviews_school ON reviews(school_id);
    `);

    console.log('✓ Database tables initialized successfully');
  } catch (error) {
    console.error('✗ Error initializing database:', error);
    throw error;
  }
}

// Run initialization if needed
initializeDatabase().catch(console.error);
