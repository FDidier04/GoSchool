import { db } from './connection';

export async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with sample data...');

    // Check if data already exists
    const schoolCount = await db.one('SELECT COUNT(*) as count FROM schools');
    if (parseInt(schoolCount.count) > 0) {
      console.log('✓ Database already seeded');
      return;
    }

    // Insert sample schools
    const schools = await db.manyOrNone(`
      INSERT INTO schools (
        name, description, type, address, location, phone_number, email, 
        website, principal_name, founded_year, student_count, teacher_count, 
        average_rating, total_reviews, success_rate, admission_fee, monthly_fee
      ) VALUES
        (
          'École Excellencia Kinshasa',
          'Premier établissement d''enseignement secondaire de Kinshasa avec résultats académiques exceptionnels',
          'secondary',
          'Avenue de la République, Kinshasa, RDC',
          POINT(4.3282, -15.3136),
          '+243 1 234 5678',
          'contact@excellencia.cd',
          'https://excellencia.cd',
          'Dr. Jean Mbeki',
          2005,
          850,
          65,
          4.7,
          342,
          94.5,
          500000,
          150000
        ),
        (
          'Lycée Scientifique du Congo',
          'Lycée réputé pour ses excellents programmes scientifiques et techniques',
          'secondary',
          'Rue de l''Université, Kinshasa, RDC',
          POINT(4.3456, -15.3210),
          '+243 1 234 5679',
          'contact@lycee-scientifique.cd',
          'https://lycee-scientifique.cd',
          'Prof. Marie Nkulu',
          2000,
          750,
          58,
          4.5,
          285,
          92.3,
          400000,
          120000
        ),
        (
          'Institut Technique Lubumbashi',
          'Formation professionnelle et technique de qualité en République du Congo',
          'training_center',
          'Avenue Fizi, Lubumbashi, RDC',
          POINT(8.4750, -11.6653),
          '+243 2 123 4567',
          'contact@inst-technique.cd',
          'https://inst-technique.cd',
          'Eng. Joseph Tshimanda',
          2008,
          600,
          45,
          4.3,
          198,
          88.7,
          300000,
          100000
        )
      RETURNING id, name
    `);

    console.log('✓ Created 3 schools');

    // Insert school series
    for (const school of schools) {
      await db.manyOrNone(`
        INSERT INTO school_series (school_id, series) VALUES
        ($1, 'A'), ($1, 'D'), ($1, 'C'), ($1, 'G2'), ($1, 'G3')
      `, [school.id]);
    }

    console.log('✓ Added school series');

    // Insert sample courses
    const courses = await db.manyOrNone(`
      INSERT INTO courses (
        school_id, title, description, series, level, duration, price, 
        start_date, max_students, enrolled_students, instructor
      ) SELECT 
        id,
        'Mathématiques Avancées',
        'Cours intensif de mathématiques pour les classes supérieures',
        'A',
        'Advanced',
        3,
        50000,
        CURRENT_DATE + INTERVAL '1 month',
        30,
        18,
        'Prof. Kamayani'
      FROM schools LIMIT 1
    `);

    console.log('✓ Created sample courses');

    // Insert sample reviews
    await db.manyOrNone(`
      INSERT INTO reviews (school_id, rating, title, comment) VALUES
      (
        (SELECT id FROM schools LIMIT 1),
        5,
        'Excellent institution',
        'Très bon établissement avec des professeurs compétents et des installations modernes.'
      ),
      (
        (SELECT id FROM schools LIMIT 1),
        4,
        'Bon choix',
        'Bonne qualité d''enseignement, j''aimerais voir plus de ressources numérique.'
      )
    `);

    console.log('✓ Created sample reviews');
    console.log('✅ Database seeding completed successfully!\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
