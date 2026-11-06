import { Doctor, Hospital, DiagnosticTest, HealthTip, Appointment, FamilyMember, HealthRecord, SpecialtyItem } from './types';

export const SPECIALTIES: SpecialtyItem[] = [
  {
    id: 'spec-1',
    name: 'Internal Medicine',
    slug: 'internal-medicine',
    icon: 'Stethoscope',
    description: 'Diagnosis and non-surgical treatment of adult diseases, chronic illness, and complex multiorgan disorders.',
    doctorCount: 42,
    commonConditions: ['Diabetes', 'Hypertension', 'Fever & Infection', 'Thyroid Imbalance', 'Fatigue']
  },
  {
    id: 'spec-2',
    name: 'Cardiology',
    slug: 'cardiology',
    icon: 'HeartPulse',
    description: 'Heart and cardiovascular care, coronary intervention, ECG, Echocardiography, and heart failure management.',
    doctorCount: 38,
    commonConditions: ['Chest Pain', 'Palpitations', 'High Cholesterol', 'Post-Heart Attack Care', 'Arrhythmia']
  },
  {
    id: 'spec-3',
    name: 'Orthopedics',
    slug: 'orthopedics',
    icon: 'Activity',
    description: 'Bone, joint, ligament, and spine treatment, arthroscopy, joint replacement, and sports trauma surgery.',
    doctorCount: 29,
    commonConditions: ['Back Pain', 'Knee Arthritis', 'Fractures', 'Shoulder Pain', 'Ligament Injury']
  },
  {
    id: 'spec-4',
    name: 'Gynecology & Obstetrics',
    slug: 'gynecology-obstetrics',
    icon: 'Users',
    description: 'Comprehensive women’s health, antenatal care, high-risk pregnancy delivery, and laparoscopic surgery.',
    doctorCount: 35,
    commonConditions: ['Pregnancy Monitoring', 'PCOS', 'Irregular Periods', 'Infertility', 'Pelvic Pain']
  },
  {
    id: 'spec-5',
    name: 'Neurology',
    slug: 'neurology',
    icon: 'Brain',
    description: 'Brain, spinal cord, and peripheral nerve disorders, stroke thrombolysis, epilepsy, and migraine treatment.',
    doctorCount: 22,
    commonConditions: ['Migraine & Severe Headache', 'Dizziness', 'Seizures', 'Numbness / Neuropathy', 'Tremors']
  },
  {
    id: 'spec-6',
    name: 'Pediatrics',
    slug: 'pediatrics',
    icon: 'Baby',
    description: 'Child wellness, newborn critical care, immunizations, developmental milestones, and childhood infections.',
    doctorCount: 31,
    commonConditions: ['Childhood Fever', 'Cough & Asthma', 'Vaccination Schedule', 'Growth Monitoring', 'Diarrhea']
  },
  {
    id: 'spec-7',
    name: 'Gastroenterology & Hepatology',
    slug: 'gastroenterology',
    icon: 'Activity',
    description: 'Stomach, liver, gallbladder, pancreas, and intestinal disorders, endoscopy, colonoscopy, and fatty liver care.',
    doctorCount: 26,
    commonConditions: ['Stomach Ache', 'Acid Reflux & GERD', 'Fatty Liver', 'Chronic Constipation', 'Jaundice']
  },
  {
    id: 'spec-8',
    name: 'Dermatology & Venereology',
    slug: 'dermatology',
    icon: 'Sparkles',
    description: 'Skin, hair, nail, and cosmetic conditions, clinical dermatology, allergy testing, and acne management.',
    doctorCount: 24,
    commonConditions: ['Skin Rash & Eczema', 'Acne & Pimples', 'Fungal Infections', 'Hair Fall & Alopecia', 'Psoriasis']
  },
  {
    id: 'spec-9',
    name: 'ENT (Ear, Nose & Throat)',
    slug: 'ent',
    icon: 'Activity',
    description: 'Hearing, sinus, throat, voice, and balance disorders, tonsillectomy, and endoscopic sinus surgery.',
    doctorCount: 21,
    commonConditions: ['Sore Throat', 'Ear Ache & Tinnitus', 'Chronic Sinusitis', 'Tonsillitis', 'Nasal Polyps']
  },
  {
    id: 'spec-10',
    name: 'Ophthalmology (Eye)',
    slug: 'ophthalmology',
    icon: 'Eye',
    description: 'Comprehensive eye care, vision correction, cataract phaco surgery, glaucoma, and retinal assessment.',
    doctorCount: 28,
    commonConditions: ['Blurry Vision', 'Cataract', 'Eye Strain & Dry Eye', 'Red Eye & Conjunctivitis', 'Glaucoma']
  },
  {
    id: 'spec-11',
    name: 'Nephrology & Urology',
    slug: 'nephrology-urology',
    icon: 'ShieldCheck',
    description: 'Kidney health, dialysis, kidney stones, urinary tract infections, and male prostate health.',
    doctorCount: 19,
    commonConditions: ['Burning Urination (UTI)', 'Kidney Stones', 'Protein in Urine', 'Prostate Enlargement', 'Chronic Kidney Disease']
  },
  {
    id: 'spec-12',
    name: 'Pulmonology (Chest & Lungs)',
    slug: 'pulmonology',
    icon: 'Activity',
    description: 'Respiratory diseases, bronchial asthma, COPD, chronic bronchitis, pneumonia, and post-COVID fibrosis.',
    doctorCount: 20,
    commonConditions: ['Persistent Cough', 'Asthma & Wheezing', 'Shortness of Breath', 'COPD & Emphysema', 'Sleep Apnea']
  },
  {
    id: 'spec-13',
    name: 'Endocrinology & Diabetology',
    slug: 'endocrinology',
    icon: 'Activity',
    description: 'Hormonal disorders, insulin resistance, type 1 & 2 diabetes management, and thyroid dysfunction.',
    doctorCount: 18,
    commonConditions: ['Uncontrolled Diabetes', 'Hypothyroidism', 'Hyperthyroidism', 'Weight Fluctuation', 'Metabolic Syndrome']
  },
  {
    id: 'spec-14',
    name: 'Psychiatry & Mental Health',
    slug: 'psychiatry',
    icon: 'Brain',
    description: 'Mental health assessment, depression, anxiety, panic disorder, stress management, and sleep therapy.',
    doctorCount: 16,
    commonConditions: ['Anxiety & Panic', 'Depression & Mood Disorder', 'Insomnia & Sleep Disturbance', 'OCD', 'Work Burnout']
  },
  {
    id: 'spec-15',
    name: 'General & Laparoscopic Surgery',
    slug: 'general-surgery',
    icon: 'Activity',
    description: 'Minimally invasive laparoscopic abdominal surgery, hernia repair, gallbladder removal, and colorectal care.',
    doctorCount: 27,
    commonConditions: ['Hernia', 'Gallstones (Cholecystectomy)', 'Appendicitis', 'Hemorrhoids & Piles', 'Soft Tissue Lumps']
  }
];

export const DOCTORS: Doctor[] = [
  // 1. Internal Medicine - Dr. Farzana Ahmed
  {
    id: 'doc-1',
    slug: 'dr-farzana-ahmed',
    name: 'Dr. Farzana Ahmed',
    avatar: '/images/dr_farzana.jpg',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-49210',
    degrees: 'MBBS (DMC), MD (Internal Medicine, BSMMU)',
    specialty: 'Internal Medicine Specialist',
    subSpecialties: ['Diabetes Management', 'Hypertension', 'Thyroid Disorders', 'General Medicine'],
    experienceYears: 8,
    rating: 4.9,
    reviewCount: 1420,
    hospital: {
      id: 'hosp-1',
      slug: 'united-hospital-dhaka',
      name: 'United Hospital, Dhaka',
      location: 'Plot 15, Road 71, Gulshan, Dhaka 1212',
    },
    fees: { inPerson: 1000, online: 800 },
    nextAvailableSlot: {
      date: 'Tomorrow, 31 Oct',
      time: '10:00 AM – 01:00 PM',
      formatted: 'Tomorrow, 10:00 AM',
    },
    about: 'A dedicated Internal Medicine specialist with 8+ years of experience in diagnosing and managing a wide range of adult health conditions. Dr. Farzana focuses on holistic disease prevention and evidence-based chronic disease control.',
    areasOfExpertise: ['Diabetes Management', 'Hypertension & Vascular Care', 'Thyroid & Endocrine Disorders', 'Infectious Diseases', 'Preventive Adult Care', 'Geriatric Medicine'],
    education: [
      { degree: 'MBBS', institution: 'Dhaka Medical College (DMC)' },
      { degree: 'MD (Internal Medicine)', institution: 'Bangabandhu Sheikh Mujib Medical University (BSMMU)' },
    ],
    languages: ['Bangla (Native)', 'English (Fluent)'],
    schedule: [
      { day: 'Saturday', slots: ['10:00 AM', '11:00 AM', '12:00 PM', '04:00 PM', '05:00 PM'], type: 'in-person' },
      { day: 'Sunday', slots: ['10:00 AM', '11:30 AM', '03:00 PM', '04:30 PM'], type: 'in-person' },
      { day: 'Monday', slots: ['06:00 PM', '07:00 PM', '08:00 PM'], type: 'online' },
      { day: 'Tuesday', slots: ['10:00 AM', '11:00 AM', '12:00 PM'], type: 'in-person' },
      { day: 'Wednesday', slots: ['06:00 PM', '07:00 PM', '08:00 PM'], type: 'online' },
      { day: 'Thursday', slots: ['10:00 AM', '12:00 PM', '03:00 PM'], type: 'in-person' },
    ],
    reviews: [
      { id: 'rev-1', patientName: 'Kazi Mohammad Rafiq', rating: 5, date: '2 weeks ago', comment: 'Dr. Farzana was very patient and explained my hypertension management plan in detail.', verifiedVisit: true },
      { id: 'rev-2', patientName: 'Shaila Parveen', rating: 5, date: '1 month ago', comment: 'Booked online consultation through ThetaCure. The video call was seamless.', verifiedVisit: true },
      { id: 'rev-3', patientName: 'Tariqul Islam', rating: 4.8, date: '2 months ago', comment: 'Very polite, attentive, and doesn’t prescribe unnecessary diagnostic tests.', verifiedVisit: true }
    ]
  },

  // 2. Cardiology - Prof. Dr. A. Rahman
  {
    id: 'doc-2',
    slug: 'prof-dr-a-rahman',
    name: 'Prof. Dr. A. Rahman',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-21894',
    degrees: 'MBBS (DMC), FCPS (Cardiology), FACC (USA)',
    specialty: 'Cardiology',
    subSpecialties: ['Interventional Cardiology', 'Heart Failure Management', 'Echocardiography', 'Hypertension'],
    experienceYears: 22,
    rating: 4.9,
    reviewCount: 1480,
    hospital: {
      id: 'hosp-1',
      slug: 'united-hospital-dhaka',
      name: 'United Hospital, Dhaka',
      location: 'Plot 15, Road 71, Gulshan, Dhaka 1212',
    },
    fees: { inPerson: 1500, online: 1200 },
    nextAvailableSlot: {
      date: 'Today, 30 Oct',
      time: '04:00 PM – 07:00 PM',
      formatted: 'Today, 04:00 PM',
    },
    about: 'Senior Consultant with over two decades of clinical experience in clinical and interventional cardiology, coronary angioplasty, and cardiac rehabilitation at leading cardiac institutes.',
    areasOfExpertise: ['Angioplasty & Stenting', 'Hypertensive Heart Disease', 'Valvular Heart Disease', 'Arrhythmia Management'],
    education: [
      { degree: 'MBBS', institution: 'Dhaka Medical College' },
      { degree: 'FCPS (Cardiology)', institution: 'BCPS' },
      { degree: 'Fellowship in Interventional Cardiology', institution: 'Singapore General Hospital' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Saturday', slots: ['04:00 PM', '05:00 PM', '06:00 PM'], type: 'in-person' },
      { day: 'Monday', slots: ['04:00 PM', '05:00 PM', '06:00 PM'], type: 'in-person' },
      { day: 'Wednesday', slots: ['07:00 PM', '08:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-c1', patientName: 'Mahmudur Rahman', rating: 5, date: '1 week ago', comment: 'Prof. Rahman accurately diagnosed my coronary blockages and supervised my stent procedure smoothly.', verifiedVisit: true },
      { id: 'rev-c2', patientName: 'Rokeya Begum', rating: 4.9, date: '3 weeks ago', comment: 'Excellent doctor. He answered all our questions regarding post-bypass medicine and recovery.', verifiedVisit: true }
    ]
  },

  // 3. Orthopedics - Dr. Tanvir Hasan
  {
    id: 'doc-3',
    slug: 'dr-tanvir-hasan',
    name: 'Dr. Tanvir Hasan',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-38501',
    degrees: 'MBBS (SSMC), MS (Orthopedics, NITOR)',
    specialty: 'Orthopedics',
    subSpecialties: ['Joint Replacement', 'Trauma Surgery', 'Sports Injury Rehabilitation', 'Spine Care'],
    experienceYears: 12,
    rating: 4.9,
    reviewCount: 1260,
    hospital: {
      id: 'hosp-1',
      slug: 'united-hospital-dhaka',
      name: 'United Hospital, Dhaka',
      location: 'Plot 15, Road 71, Gulshan, Dhaka 1212',
    },
    fees: { inPerson: 1200, online: 1000 },
    nextAvailableSlot: {
      date: 'Friday, 1 Nov',
      time: '03:00 PM – 06:00 PM',
      formatted: 'Friday, 03:00 PM',
    },
    about: 'Expert Orthopedic Surgeon specializing in arthroscopy, complex fracture repair, and minimally-invasive knee and hip replacement surgery.',
    areasOfExpertise: ['Knee Arthroscopy', 'Spine & Lower Back Pain', 'Osteoarthritis Management', 'Sports Ligament Repair'],
    education: [
      { degree: 'MBBS', institution: 'Sir Salimullah Medical College' },
      { degree: 'MS (Orthopedics)', institution: 'NITOR, Dhaka' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Sunday', slots: ['03:00 PM', '04:00 PM', '05:00 PM'], type: 'in-person' },
      { day: 'Tuesday', slots: ['03:00 PM', '04:00 PM'], type: 'in-person' },
      { day: 'Thursday', slots: ['07:00 PM', '08:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-o1', patientName: 'Ahsan Habib', rating: 5, date: '2 weeks ago', comment: 'My severe lower back pain and sciatica resolved after following his exercise and medication regimen.', verifiedVisit: true }
    ]
  },

  // 4. Gynecology & Obstetrics - Prof. Dr. Nusrat Jahan
  {
    id: 'doc-4',
    slug: 'dr-nusrat-jahan',
    name: 'Prof. Dr. Nusrat Jahan',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-51920',
    degrees: 'MBBS (DMC), FCPS (Obs & Gynae), Fellowship in Laparoscopy (India)',
    specialty: 'Gynecology & Obstetrics',
    subSpecialties: ['High Risk Pregnancy', 'Laparoscopic Surgery', 'PCOS Management', 'Infertility'],
    experienceYears: 14,
    rating: 4.9,
    reviewCount: 1350,
    hospital: {
      id: 'hosp-2',
      slug: 'square-hospital-dhaka',
      name: 'Square Hospital, Dhaka',
      location: '18/F Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka 1205',
    },
    fees: { inPerson: 1200, online: 900 },
    nextAvailableSlot: {
      date: 'Tomorrow, 31 Oct',
      time: '05:00 PM – 08:00 PM',
      formatted: 'Tomorrow, 05:00 PM',
    },
    about: 'Compassionate women’s health specialist focusing on maternal health, high-risk pregnancy monitoring, PCOS management, and minimally invasive laparoscopic interventions.',
    areasOfExpertise: ['Antenatal Care', 'PCOS & Hormone Correction', 'Infertility Evaluation', 'Adolescent Gynecology'],
    education: [
      { degree: 'MBBS', institution: 'Dhaka Medical College' },
      { degree: 'FCPS (Obs & Gynae)', institution: 'BCPS' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Saturday', slots: ['05:00 PM', '06:00 PM'], type: 'in-person' },
      { day: 'Monday', slots: ['05:00 PM', '06:00 PM', '07:00 PM'], type: 'in-person' },
      { day: 'Wednesday', slots: ['08:00 PM', '09:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-g1', patientName: 'Farhana Yasmin', rating: 5, date: '3 days ago', comment: 'Dr. Nusrat made my pregnancy journey stress-free. Very empathetic and gentle doctor.', verifiedVisit: true }
    ]
  },

  // 5. Neurology - Dr. Kazi Shafiul Alam
  {
    id: 'doc-5',
    slug: 'dr-kazi-shafiul-alam',
    name: 'Dr. Kazi Shafiul Alam',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-31209',
    degrees: 'MBBS (CMC), FCPS (Neurology), MRCP (UK)',
    specialty: 'Neurology',
    subSpecialties: ['Stroke Management', 'Epilepsy & Seizures', 'Parkinsonism', 'Migraine Care'],
    experienceYears: 15,
    rating: 4.9,
    reviewCount: 1180,
    hospital: {
      id: 'hosp-3',
      slug: 'evercare-hospital-dhaka',
      name: 'Evercare Hospital, Dhaka',
      location: 'Plot 81, Block E, Bashundhara R/A, Dhaka 1229',
    },
    fees: { inPerson: 1500, online: 1100 },
    nextAvailableSlot: {
      date: 'Saturday, 2 Nov',
      time: '11:00 AM – 02:00 PM',
      formatted: 'Saturday, 11:00 AM',
    },
    about: 'Consultant Neurologist specialized in clinical neurophysiology, acute stroke thrombolysis, severe migraine protocols, and long-term neuro-degenerative disorder management.',
    areasOfExpertise: ['Stroke Rehabilitation', 'Headache & Chronic Migraine', 'Peripheral Neuropathy', 'Epilepsy Management'],
    education: [
      { degree: 'MBBS', institution: 'Chittagong Medical College' },
      { degree: 'FCPS (Neurology)', institution: 'BCPS' },
      { degree: 'MRCP', institution: 'Royal Colleges of Physicians (UK)' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Saturday', slots: ['11:00 AM', '12:00 PM', '01:00 PM'], type: 'in-person' },
      { day: 'Tuesday', slots: ['11:00 AM', '12:00 PM'], type: 'in-person' },
      { day: 'Thursday', slots: ['06:00 PM', '07:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-n1', patientName: 'Tanvir Chowdhury', rating: 5, date: '1 month ago', comment: 'His diagnosis for my chronic unilateral migraine was accurate. Medicine worked within 2 days.', verifiedVisit: true }
    ]
  },

  // 6. Pediatrics & Child Health - Prof. Dr. Mehedi Hasan
  {
    id: 'doc-6',
    slug: 'prof-dr-mehedi-hasan',
    name: 'Prof. Dr. Mehedi Hasan',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-28491',
    degrees: 'MBBS (DMC), DCH (London), FCPS (Pediatrics)',
    specialty: 'Pediatrics',
    subSpecialties: ['Childhood Asthma', 'Newborn Critical Care', 'Pediatric Nutrition', 'Growth Disorders'],
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 1520,
    hospital: {
      id: 'hosp-2',
      slug: 'square-hospital-dhaka',
      name: 'Square Hospital, Dhaka',
      location: '18/F Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka 1205',
    },
    fees: { inPerson: 1200, online: 900 },
    nextAvailableSlot: {
      date: 'Tomorrow, 31 Oct',
      time: '04:00 PM – 07:00 PM',
      formatted: 'Tomorrow, 04:00 PM',
    },
    about: 'Renowned Pediatrician with 18+ years of dedicated service in newborn health, childhood infectious illnesses, pediatric asthma management, and milestone assessments.',
    areasOfExpertise: ['Childhood Fever & Infections', 'Pediatric Asthma & Wheezing', 'Newborn Care & Jaundice', 'Immunization & Growth'],
    education: [
      { degree: 'MBBS', institution: 'Dhaka Medical College' },
      { degree: 'DCH', institution: 'Royal College of Paediatrics (London)' },
      { degree: 'FCPS (Pediatrics)', institution: 'BCPS' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Sunday', slots: ['04:00 PM', '05:00 PM', '06:00 PM'], type: 'in-person' },
      { day: 'Tuesday', slots: ['04:00 PM', '05:00 PM'], type: 'in-person' },
      { day: 'Thursday', slots: ['07:00 PM', '08:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-p1', patientName: 'Nazia Sultana', rating: 5, date: '1 week ago', comment: 'Prof. Mehedi is the most caring child specialist. He treated my 3-year-old’s persistent wheezing patiently.', verifiedVisit: true }
    ]
  },

  // 7. Gastroenterology & Hepatology - Prof. Dr. Tariqul Islam Chowdhury
  {
    id: 'doc-7',
    slug: 'prof-dr-tariqul-islam',
    name: 'Prof. Dr. Tariqul Islam Chowdhury',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-24310',
    degrees: 'MBBS (DMC), MD (Gastroenterology, BSMMU), FACG (USA)',
    specialty: 'Gastroenterology & Hepatology',
    subSpecialties: ['Diagnostic Endoscopy', 'Fatty Liver & Cirrhosis', 'GERD & Peptic Ulcer', 'IBS Management'],
    experienceYears: 20,
    rating: 4.9,
    reviewCount: 1390,
    hospital: {
      id: 'hosp-4',
      slug: 'labaid-specialized-hospital',
      name: 'Labaid Specialized Hospital',
      location: 'House 06, Road 04, Dhanmondi, Dhaka 1205',
    },
    fees: { inPerson: 1300, online: 1000 },
    nextAvailableSlot: {
      date: 'Today, 30 Oct',
      time: '05:00 PM – 08:00 PM',
      formatted: 'Today, 05:00 PM',
    },
    about: 'Leading Gastroenterologist and Hepatologist in Bangladesh. Expert in upper GI endoscopy, colonoscopy, viral hepatitis, chronic acid reflux, and fatty liver reversal therapies.',
    areasOfExpertise: ['Stomach Pain & Gastritis', 'Acid Reflux / GERD', 'Fatty Liver Disease', 'Irritable Bowel Syndrome (IBS)'],
    education: [
      { degree: 'MBBS', institution: 'Dhaka Medical College' },
      { degree: 'MD (Gastroenterology)', institution: 'BSMMU' },
      { degree: 'Fellowship', institution: 'American College of Gastroenterology' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Saturday', slots: ['05:00 PM', '06:00 PM', '07:00 PM'], type: 'in-person' },
      { day: 'Monday', slots: ['05:00 PM', '06:00 PM'], type: 'in-person' },
      { day: 'Wednesday', slots: ['08:00 PM', '09:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-gast1', patientName: 'Sabbir Ahmed', rating: 5, date: '2 weeks ago', comment: 'Suffered from severe GERD and burning chest for 2 years. His prescribed regimen cured my symptoms completely.', verifiedVisit: true }
    ]
  },

  // 8. Dermatology & Venereology - Dr. Sabrina Karim
  {
    id: 'doc-8',
    slug: 'dr-sabrina-karim',
    name: 'Dr. Sabrina Karim',
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-46782',
    degrees: 'MBBS (SSMC), DDV (BSMMU), FCPS (Dermatology)',
    specialty: 'Dermatology & Venereology',
    subSpecialties: ['Clinical Dermatology', 'Eczema & Psoriasis', 'Acne Scar Protocols', 'Hair Loss Therapy'],
    experienceYears: 11,
    rating: 4.9,
    reviewCount: 1210,
    hospital: {
      id: 'hosp-1',
      slug: 'united-hospital-dhaka',
      name: 'United Hospital, Dhaka',
      location: 'Plot 15, Road 71, Gulshan, Dhaka 1212',
    },
    fees: { inPerson: 1000, online: 800 },
    nextAvailableSlot: {
      date: 'Tomorrow, 31 Oct',
      time: '02:00 PM – 05:00 PM',
      formatted: 'Tomorrow, 02:00 PM',
    },
    about: 'Specialist Dermatologist focusing on clinical skin allergy identification, chronic fungal infections, eczema, adult acne, and scalp trichology.',
    areasOfExpertise: ['Skin Rashes & Allergies', 'Eczema & Psoriasis', 'Severe Acne & Rosacea', 'Hair Fall & Scalp Health'],
    education: [
      { degree: 'MBBS', institution: 'Sir Salimullah Medical College' },
      { degree: 'DDV', institution: 'BSMMU' },
      { degree: 'FCPS (Dermatology)', institution: 'BCPS' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Saturday', slots: ['02:00 PM', '03:00 PM', '04:00 PM'], type: 'in-person' },
      { day: 'Tuesday', slots: ['02:00 PM', '03:00 PM'], type: 'in-person' },
      { day: 'Thursday', slots: ['07:00 PM', '08:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-derm1', patientName: 'Farzana Haque', rating: 5, date: '3 weeks ago', comment: 'Dr. Sabrina accurately diagnosed my fungal rash. Within 10 days of the cream, it completely vanished.', verifiedVisit: true }
    ]
  },

  // 9. ENT - Dr. M. A. Matin
  {
    id: 'doc-9',
    slug: 'dr-m-a-matin',
    name: 'Dr. M. A. Matin',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-32190',
    degrees: 'MBBS (DMC), MS (ENT, BSMMU), Fellow in Rhinology (India)',
    specialty: 'ENT (Ear, Nose & Throat)',
    subSpecialties: ['Sinus Surgery', 'Hearing & Vertigo', 'Vocal Cord Microsurgery', 'Tonsillectomy'],
    experienceYears: 16,
    rating: 4.9,
    reviewCount: 1150,
    hospital: {
      id: 'hosp-2',
      slug: 'square-hospital-dhaka',
      name: 'Square Hospital, Dhaka',
      location: '18/F Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka 1205',
    },
    fees: { inPerson: 1200, online: 900 },
    nextAvailableSlot: {
      date: 'Tomorrow, 31 Oct',
      time: '06:00 PM – 09:00 PM',
      formatted: 'Tomorrow, 06:00 PM',
    },
    about: 'Experienced ENT and Head-Neck Surgeon with extensive experience in functional endoscopic sinus surgery (FESS), chronic ear discharge, tonsil disorders, and hoarseness.',
    areasOfExpertise: ['Chronic Sinusitis & Nasal Blockage', 'Ear Pain & Tinnitus', 'Tonsillitis & Adenoids', 'Throat Pain & Voice Care'],
    education: [
      { degree: 'MBBS', institution: 'Dhaka Medical College' },
      { degree: 'MS (ENT)', institution: 'BSMMU' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Sunday', slots: ['06:00 PM', '07:00 PM', '08:00 PM'], type: 'in-person' },
      { day: 'Tuesday', slots: ['06:00 PM', '07:00 PM'], type: 'in-person' },
      { day: 'Friday', slots: ['10:00 AM', '11:00 AM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-ent1', patientName: 'Kamrul Hasan', rating: 5, date: '1 month ago', comment: 'Severe sinus headache was relieved after his treatment plan and nasal spray. Highly recommended ENT specialist.', verifiedVisit: true }
    ]
  },

  // 10. Ophthalmology - Prof. Dr. Shahidul Huq
  {
    id: 'doc-10',
    slug: 'prof-dr-shahidul-huq',
    name: 'Prof. Dr. Shahidul Huq',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-21450',
    degrees: 'MBBS (DMC), FCPS (Ophthalmology), FICO (UK)',
    specialty: 'Ophthalmology (Eye)',
    subSpecialties: ['Micro-Incisional Cataract Phaco', 'Glaucoma Management', 'Retinal Diagnostics', 'Refractive Vision'],
    experienceYears: 24,
    rating: 4.9,
    reviewCount: 1440,
    hospital: {
      id: 'hosp-1',
      slug: 'united-hospital-dhaka',
      name: 'United Hospital, Dhaka',
      location: 'Plot 15, Road 71, Gulshan, Dhaka 1212',
    },
    fees: { inPerson: 1300, online: 1000 },
    nextAvailableSlot: {
      date: 'Today, 30 Oct',
      time: '03:00 PM – 06:00 PM',
      formatted: 'Today, 03:00 PM',
    },
    about: 'Pioneering eye surgeon in Dhaka with over 15,000 successful cataract and laser vision procedures. Renowned for patient clarity and advanced ophthalmic diagnostics.',
    areasOfExpertise: ['Cataract Surgery', 'Blurry Vision & Refraction', 'Glaucoma & Eye Pressure', 'Dry Eye & Computer Vision Syndrome'],
    education: [
      { degree: 'MBBS', institution: 'Dhaka Medical College' },
      { degree: 'FCPS (Ophthalmology)', institution: 'BCPS' },
      { degree: 'FICO', institution: 'International Council of Ophthalmology (UK)' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Saturday', slots: ['03:00 PM', '04:00 PM', '05:00 PM'], type: 'in-person' },
      { day: 'Wednesday', slots: ['03:00 PM', '04:00 PM'], type: 'in-person' },
      { day: 'Thursday', slots: ['07:00 PM', '08:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-eye1', patientName: 'Syed Anwar', rating: 5, date: '2 weeks ago', comment: 'My father’s cataract surgery was painless and restored crystal-clear 20/20 vision.', verifiedVisit: true }
    ]
  },

  // 11. Nephrology & Urology - Dr. Aminul Islam
  {
    id: 'doc-11',
    slug: 'dr-aminul-islam',
    name: 'Dr. Aminul Islam',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-39820',
    degrees: 'MBBS (DMC), MD (Nephrology, BSMMU), Fellowship in Renal Care (Singapore)',
    specialty: 'Nephrology & Urology',
    subSpecialties: ['Chronic Kidney Disease', 'Dialysis Protocol', 'Kidney Stones', 'Urinary Tract Infection'],
    experienceYears: 13,
    rating: 4.9,
    reviewCount: 1090,
    hospital: {
      id: 'hosp-1',
      slug: 'united-hospital-dhaka',
      name: 'United Hospital, Dhaka',
      location: 'Plot 15, Road 71, Gulshan, Dhaka 1212',
    },
    fees: { inPerson: 1200, online: 900 },
    nextAvailableSlot: {
      date: 'Tomorrow, 31 Oct',
      time: '11:00 AM – 02:00 PM',
      formatted: 'Tomorrow, 11:00 AM',
    },
    about: 'Consultant Nephrologist dedicated to halting kidney damage progression, managing proteinuria, hypertensive renal disease, recurrent UTIs, and urinary calculi.',
    areasOfExpertise: ['Burning Urination & UTI', 'Kidney Stone Management', 'Creatinine Control & CKD', 'Proteinuria (Urine Protein)'],
    education: [
      { degree: 'MBBS', institution: 'Dhaka Medical College' },
      { degree: 'MD (Nephrology)', institution: 'BSMMU' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Monday', slots: ['11:00 AM', '12:00 PM', '01:00 PM'], type: 'in-person' },
      { day: 'Wednesday', slots: ['11:00 AM', '12:00 PM'], type: 'in-person' },
      { day: 'Friday', slots: ['06:00 PM', '07:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-neph1', patientName: 'Rezaul Karim', rating: 5, date: '3 weeks ago', comment: 'Dr. Aminul’s dietary and medical guidelines lowered my serum creatinine significantly.', verifiedVisit: true }
    ]
  },

  // 12. Pulmonology - Prof. Dr. Asifur Rahman
  {
    id: 'doc-12',
    slug: 'prof-dr-asifur-rahman',
    name: 'Prof. Dr. Asifur Rahman',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-26510',
    degrees: 'MBBS (DMC), FCPS (Pulmonology), FCCP (USA)',
    specialty: 'Pulmonology (Chest & Lungs)',
    subSpecialties: ['Bronchial Asthma', 'COPD & Emphysema', 'Post-COVID Lung Care', 'Sleep Apnea & CPAP'],
    experienceYears: 19,
    rating: 4.9,
    reviewCount: 1280,
    hospital: {
      id: 'hosp-3',
      slug: 'evercare-hospital-dhaka',
      name: 'Evercare Hospital, Dhaka',
      location: 'Plot 81, Block E, Bashundhara R/A, Dhaka 1229',
    },
    fees: { inPerson: 1500, online: 1100 },
    nextAvailableSlot: {
      date: 'Today, 30 Oct',
      time: '04:00 PM – 07:00 PM',
      formatted: 'Today, 04:00 PM',
    },
    about: 'Professor of Respiratory Medicine with profound expertise in chronic cough, allergy-induced bronchospasm, inhaler therapy optimization, and obstructive sleep apnea.',
    areasOfExpertise: ['Chronic & Persistent Cough', 'Bronchial Asthma & Wheezing', 'COPD & Chest Congestion', 'Pneumonia & Lung Infections'],
    education: [
      { degree: 'MBBS', institution: 'Dhaka Medical College' },
      { degree: 'FCPS (Pulmonology)', institution: 'BCPS' },
      { degree: 'FCCP', institution: 'American College of Chest Physicians' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Saturday', slots: ['04:00 PM', '05:00 PM', '06:00 PM'], type: 'in-person' },
      { day: 'Tuesday', slots: ['04:00 PM', '05:00 PM'], type: 'in-person' },
      { day: 'Thursday', slots: ['08:00 PM', '09:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-pulm1', patientName: 'Shahadat Hossain', rating: 5, date: '1 month ago', comment: 'Had chronic cough for 4 months. Prof. Asifur identified the exact allergic trigger.', verifiedVisit: true }
    ]
  },

  // 13. Endocrinology & Diabetology - Dr. Tahmina Akter
  {
    id: 'doc-13',
    slug: 'dr-tahmina-akter',
    name: 'Dr. Tahmina Akter',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-42110',
    degrees: 'MBBS (DMC), MD (Endocrinology, BIRDEM), MACE (USA)',
    specialty: 'Endocrinology & Diabetology',
    subSpecialties: ['Type 1 & 2 Diabetes', 'Thyroid Nodules & Goiter', 'Metabolic Syndrome', 'Obesity Management'],
    experienceYears: 12,
    rating: 4.9,
    reviewCount: 1310,
    hospital: {
      id: 'hosp-2',
      slug: 'square-hospital-dhaka',
      name: 'Square Hospital, Dhaka',
      location: '18/F Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka 1205',
    },
    fees: { inPerson: 1200, online: 900 },
    nextAvailableSlot: {
      date: 'Tomorrow, 31 Oct',
      time: '03:00 PM – 06:00 PM',
      formatted: 'Tomorrow, 03:00 PM',
    },
    about: 'Specialist Diabetologist and Endocrinologist trained at BIRDEM. Focuses on safe glucose targets, preventing diabetic neuropathy and retinopathy, and thyroid hormone balance.',
    areasOfExpertise: ['High Blood Sugar & HbA1c Control', 'Hypothyroidism & Hyperthyroidism', 'Gestational Diabetes (Pregnancy)', 'Weight & Metabolism'],
    education: [
      { degree: 'MBBS', institution: 'Dhaka Medical College' },
      { degree: 'MD (Endocrinology)', institution: 'BIRDEM / BSMMU' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Sunday', slots: ['03:00 PM', '04:00 PM', '05:00 PM'], type: 'in-person' },
      { day: 'Wednesday', slots: ['03:00 PM', '04:00 PM'], type: 'in-person' },
      { day: 'Friday', slots: ['07:00 PM', '08:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-endo1', patientName: 'Shamima Nasrin', rating: 5, date: '2 weeks ago', comment: 'My HbA1c went from 9.4% down to 6.8% under Dr. Tahmina’s attentive supervision.', verifiedVisit: true }
    ]
  },

  // 14. Psychiatry & Mental Health - Dr. Shamsul Huda
  {
    id: 'doc-14',
    slug: 'dr-shamsul-huda',
    name: 'Dr. Shamsul Huda',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-36709',
    degrees: 'MBBS (DMC), FCPS (Psychiatry), Member European Psychiatric Association',
    specialty: 'Psychiatry & Mental Health',
    subSpecialties: ['Clinical Depression', 'Panic Attacks & GAD', 'Insomnia Therapy', 'Cognitive Stress Management'],
    experienceYears: 13,
    rating: 4.9,
    reviewCount: 980,
    hospital: {
      id: 'hosp-2',
      slug: 'square-hospital-dhaka',
      name: 'Square Hospital, Dhaka',
      location: '18/F Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka 1205',
    },
    fees: { inPerson: 1200, online: 1000 },
    nextAvailableSlot: {
      date: 'Tomorrow, 31 Oct',
      time: '06:00 PM – 09:00 PM',
      formatted: 'Tomorrow, 06:00 PM',
    },
    about: 'Compassionate Consultant Psychiatrist with deep expertise in non-judgmental counseling, clinical medication balance, panic disorder recovery, and restorative sleep hygiene.',
    areasOfExpertise: ['Anxiety & Panic Disorders', 'Depression & Mood Stabilization', 'Severe Insomnia & Sleep Reset', 'Stress & Obsessive Thoughts'],
    education: [
      { degree: 'MBBS', institution: 'Dhaka Medical College' },
      { degree: 'FCPS (Psychiatry)', institution: 'BCPS' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Saturday', slots: ['06:00 PM', '07:00 PM', '08:00 PM'], type: 'in-person' },
      { day: 'Tuesday', slots: ['06:00 PM', '07:00 PM'], type: 'in-person' },
      { day: 'Thursday', slots: ['08:00 PM', '09:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-psych1', patientName: 'Arifuzzaman', rating: 5, date: '1 month ago', comment: 'Dr. Shamsul listens with utmost kindness and helped me overcome debilitating panic attacks.', verifiedVisit: true }
    ]
  },

  // 15. General & Laparoscopic Surgery - Prof. Dr. Nazmul Karim
  {
    id: 'doc-15',
    slug: 'prof-dr-nazmul-karim',
    name: 'Prof. Dr. Nazmul Karim',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=90',
    isVerified: true,
    isDemo: true,
    bmdcNumber: 'A-23190',
    degrees: 'MBBS (DMC), FCPS (Surgery), FRCS (Glasgow)',
    specialty: 'General & Laparoscopic Surgery',
    subSpecialties: ['Laparoscopic Cholecystectomy', 'Hernia Repair', 'Colorectal Surgery', 'Appendicitis'],
    experienceYears: 21,
    rating: 4.9,
    reviewCount: 1140,
    hospital: {
      id: 'hosp-1',
      slug: 'united-hospital-dhaka',
      name: 'United Hospital, Dhaka',
      location: 'Plot 15, Road 71, Gulshan, Dhaka 1212',
    },
    fees: { inPerson: 1500, online: 1100 },
    nextAvailableSlot: {
      date: 'Today, 30 Oct',
      time: '04:00 PM – 07:00 PM',
      formatted: 'Today, 04:00 PM',
    },
    about: 'Distinguished Professor of General & Minimal Invasive Surgery. Specialized in day-care laparoscopic gallbladder surgery, ventral hernia repair, and modern anorectal procedures.',
    areasOfExpertise: ['Gallbladder Stones (Laparoscopic)', 'Inguinal & Abdominal Hernia', 'Appendicitis', 'Hemorrhoids & Piles'],
    education: [
      { degree: 'MBBS', institution: 'Dhaka Medical College' },
      { degree: 'FCPS (Surgery)', institution: 'BCPS' },
      { degree: 'FRCS', institution: 'Royal College of Physicians and Surgeons of Glasgow' },
    ],
    languages: ['Bangla', 'English'],
    schedule: [
      { day: 'Sunday', slots: ['04:00 PM', '05:00 PM', '06:00 PM'], type: 'in-person' },
      { day: 'Tuesday', slots: ['04:00 PM', '05:00 PM'], type: 'in-person' },
      { day: 'Thursday', slots: ['07:00 PM', '08:00 PM'], type: 'online' },
    ],
    reviews: [
      { id: 'rev-surg1', patientName: 'Mizanur Rahman', rating: 5, date: '3 weeks ago', comment: 'Had laparoscopic gallbladder stone surgery at United Hospital. Was discharged the next morning with minimal pain.', verifiedVisit: true }
    ]
  }
];

export const HOSPITALS: Hospital[] = [
  {
    id: 'hosp-1',
    slug: 'united-hospital-dhaka',
    name: 'United Hospital, Dhaka',
    logo: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=160&q=80',
    coverImage: '/images/united_hospital.jpg',
    category: 'Multi-Specialty Hospital',
    isVerified: true,
    isDemo: true,
    rating: 4.8,
    reviewCount: 9420,
    address: 'Plot 15, Road 71, Gulshan, Dhaka 1212',
    area: 'Gulshan',
    city: 'Dhaka',
    latitude: 23.8055,
    longitude: 90.4150,
    isEmergency247: true,
    hasIcu: true,
    hasAmbulance: true,
    phone: '+880 9612-345678',
    emergencyPhone: '+880 1914-001234',
    beds: '350+ Beds',
    doctorCount: 200,
    testCount: 1000,
    operatingHours: '24/7 Open',
    about: 'A leading multi-specialty hospital in Dhaka, known for advanced care, modern technology, and a team of experienced doctors across multiple specialties.',
    keyFacilities: [
      'Emergency & Critical Care',
      'Advanced Operation Theaters',
      'ICU & HDU Facilities',
      'Radiology & Imaging (MRI, CT, X-ray)',
      'Laboratory & Diagnostics',
      '24/7 Pharmacy Service',
      'Inpatient & Day Care Units',
      'Cafeteria & Patient Lounge'
    ],
    services: [
      {
        title: 'Emergency & Critical Care',
        description: '24-hour rapid response emergency room staffed with emergency physicians and trauma specialists.',
        icon: 'ShieldAlert',
      },
      {
        title: 'Advanced Diagnostics',
        description: 'Fully automated diagnostic lab offering pathology, 3.0T MRI, 128-slice CT, and echocardiography.',
        icon: 'FlaskConical',
      },
      {
        title: 'Experienced Specialists',
        description: 'Over 200 renowned professors and certified consultants covering 30+ medical departments.',
        icon: 'Stethoscope',
      },
      {
        title: 'Patient-Centric Care',
        description: 'International protocol nursing, compassionate recovery suites, and personalized health guidance.',
        icon: 'HeartHandshake',
      }
    ],
    gallery: [
      { url: '/images/united_hospital.jpg', caption: 'United Hospital Main Building' },
      { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', caption: 'Modern Reception & Patient Admissions' },
      { url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80', caption: 'Inpatient Private Cabin' },
      { url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80', caption: 'High-Tech Operation Theatre' }
    ],
    packages: [
      {
        id: 'pkg-1',
        slug: 'executive-health-checkup',
        title: 'Executive Health Checkup',
        description: 'A complete wellness screening for adults including comprehensive blood panel, ECG, chest X-ray, ultrasound, and specialist doctor consultation.',
        price: 12500,
        originalPrice: 15000,
        popular: true,
        features: ['Complete CBC & ESR', 'Fasting Blood Sugar & HbA1c', 'Lipid Profile & Liver Panel', 'Ultrasound Whole Abdomen', '12-lead ECG & Chest X-ray', 'Consultation with Senior Internist']
      },
      {
        id: 'pkg-2',
        slug: 'cardiac-health-package',
        title: 'Cardiac Health Package',
        description: 'Heart health assessment with essential tests, cardiac biomarkers, Echo and cardiologist review.',
        price: 8500,
        originalPrice: 10500,
        popular: false,
        features: ['Lipid Profile', 'ECG & Echocardiogram', 'Serum Creatinine & Troponin-I', 'Cardiologist Consultation']
      },
      {
        id: 'pkg-3',
        slug: 'diabetes-screening-package',
        title: 'Diabetes Screening Package',
        description: 'Dedicated preventive screening for pre-diabetic and diabetic patients to evaluate organ protection.',
        price: 3200,
        originalPrice: 4000,
        features: ['Fasting Glucose & HbA1c', 'Urine Microalbumin', 'Serum Creatinine', 'Dietitian & Diabetologist Review']
      }
    ]
  },
  {
    id: 'hosp-2',
    slug: 'square-hospital-dhaka',
    name: 'Square Hospital, Dhaka',
    logo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=160&q=80',
    coverImage: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1000&q=80',
    category: 'Tertiary Care Hospital',
    isVerified: true,
    isDemo: true,
    rating: 4.8,
    reviewCount: 8120,
    address: '18/F Bir Uttam Qazi Nuruzzaman Sarak, West Panthapath, Dhaka 1205',
    area: 'Panthapath',
    city: 'Dhaka',
    latitude: 23.7533,
    longitude: 90.3814,
    isEmergency247: true,
    hasIcu: true,
    hasAmbulance: true,
    phone: '+880 9610-010616',
    emergencyPhone: '+880 1713-377773',
    beds: '400+ Beds',
    doctorCount: 220,
    testCount: 1200,
    operatingHours: '24/7 Open',
    about: 'Square Hospital is a 400-bed tertiary care hospital committed to providing international standard clinical excellence in Bangladesh with state-of-the-art infrastructure.',
    keyFacilities: [
      'Comprehensive Cancer Center',
      'Cardiothoracic Surgery',
      'Advanced Dialysis Center',
      'Neonatal ICU (NICU)',
      '24/7 Stroke Unit',
      'Diagnostic Imaging Suites'
    ],
    services: [
      {
        title: '24/7 Emergency Care',
        description: 'Immediate trauma and critical resuscitation services.',
        icon: 'ShieldAlert',
      },
      {
        title: 'Advanced Diagnostics',
        description: 'Equipped with PET-CT, 128 Slice Dual Source CT, and high precision clinical labs.',
        icon: 'FlaskConical',
      }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80', caption: 'Hospital Building Exterior' }
    ],
    packages: [
      {
        id: 'pkg-sq-1',
        slug: 'master-health-checkup',
        title: 'Master Health Checkup',
        description: 'All-inclusive medical evaluation with 24 diagnostic parameters and senior physician consultation.',
        price: 13500,
        originalPrice: 16000,
        popular: true,
        features: ['Complete Blood Work', 'Kidney & Liver Function', 'Thyroid Profile', 'Chest X-ray & ECG', 'Physician & Nutritionist Consult']
      }
    ]
  },
  {
    id: 'hosp-3',
    slug: 'evercare-hospital-dhaka',
    name: 'Evercare Hospital, Dhaka',
    logo: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=160&q=80',
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    category: 'JCI-Accredited Super Specialty',
    isVerified: true,
    isDemo: true,
    rating: 4.7,
    reviewCount: 7850,
    address: 'Plot 81, Block E, Bashundhara R/A, Dhaka 1229',
    area: 'Bashundhara',
    city: 'Dhaka',
    latitude: 23.8103,
    longitude: 90.4312,
    isEmergency247: true,
    hasIcu: true,
    hasAmbulance: true,
    phone: '+880 9666-710678',
    emergencyPhone: '+880 1711-595000',
    beds: '425+ Beds',
    doctorCount: 250,
    testCount: 1500,
    operatingHours: '24/7 Open',
    about: 'Evercare Hospital Dhaka is the premier multi-disciplinary super-specialty tertiary care hospital in Bangladesh accredited by JCI (Joint Commission International).',
    keyFacilities: [
      'JCI Accredited Safety Protocols',
      'Bone Marrow Transplant Unit',
      'Comprehensive Heart Center',
      'Minimal Invasive Robotic Surgery',
      'Helipad Emergency Transfer'
    ],
    services: [
      {
        title: 'Super-Specialty Surgery',
        description: 'Complex neurosurgery, transplant surgery, and robotic assisted interventions.',
        icon: 'Stethoscope',
      }
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80', caption: 'Evercare Atrium Lobby' }
    ],
    packages: [
      {
        id: 'pkg-ev-1',
        slug: 'premier-well-woman-screening',
        title: 'Premier Well-Woman Screening',
        description: 'Specialized health screening designed for women including mammogram, pelvic USG, and PAP smear.',
        price: 11000,
        originalPrice: 13000,
        popular: true,
        features: ['Digital Mammography', 'USG Pelvis', 'PAP Smear', 'Hormone Assays', 'Gynecologist Consultation']
      }
    ]
  },
  {
    id: 'hosp-4',
    slug: 'labaid-specialized-hospital',
    name: 'Labaid Specialized Hospital',
    logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=160&q=80',
    coverImage: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80',
    category: 'Cardiac & Specialized Hospital',
    isVerified: true,
    isDemo: true,
    rating: 4.7,
    reviewCount: 6540,
    address: 'House 06, Road 04, Dhanmondi, Dhaka 1205',
    area: 'Dhanmondi',
    city: 'Dhaka',
    latitude: 23.7465,
    longitude: 90.3820,
    isEmergency247: true,
    hasIcu: true,
    hasAmbulance: true,
    phone: '+880 1766-662111',
    emergencyPhone: '+880 1766-663333',
    beds: '250+ Beds',
    doctorCount: 160,
    testCount: 850,
    operatingHours: '24/7 Open',
    about: 'Labaid Specialized Hospital is a pioneer in cardiac sciences, diagnostics, and multi-disciplinary specialty healthcare in Dhanmondi.',
    keyFacilities: ['24/7 Emergency & Chest Pain Unit', 'State-of-the-Art Cath Lab', 'Cardiothoracic ICU', 'Diagnostic Ultrasound & MRI'],
    services: [
      { title: 'Cardiac Care', description: 'Angiography, bypass surgery, and emergency coronary interventions.', icon: 'HeartPulse' }
    ],
    gallery: [],
    packages: []
  }
];

export const DIAGNOSTIC_TESTS: DiagnosticTest[] = [
  {
    id: 'test-1',
    slug: 'complete-blood-count-cbc',
    name: 'Complete Blood Count (CBC)',
    category: 'Blood tests',
    description: 'Measures red blood cells, white blood cells, hemoglobin, hematocrit, and platelets to detect anemia, infection, and leukemia.',
    sampleType: 'Blood (EDTA tube)',
    fastingRequired: false,
    preparation: 'No fasting required. Hydrate normally before blood sample collection.',
    reportDeliveryTime: '4–6 Hours',
    popular: true,
    providers: [
      {
        hospitalId: 'hosp-1',
        hospitalName: 'United Hospital, Dhaka',
        hospitalSlug: 'united-hospital-dhaka',
        price: 500,
        originalPrice: 650,
        branch: 'Gulshan Branch',
        rating: 4.9,
        earliestSlot: 'Today, Available Now'
      },
      {
        hospitalId: 'hosp-2',
        hospitalName: 'Square Hospital, Dhaka',
        hospitalSlug: 'square-hospital-dhaka',
        price: 550,
        originalPrice: 650,
        branch: 'Panthapath Main Lab',
        rating: 4.8,
        earliestSlot: 'Today, Available Now'
      },
      {
        hospitalId: 'hosp-3',
        hospitalName: 'Evercare Hospital, Dhaka',
        hospitalSlug: 'evercare-hospital-dhaka',
        price: 600,
        originalPrice: 700,
        branch: 'Bashundhara Main Lab',
        rating: 4.8,
        earliestSlot: 'Today, Available Now'
      }
    ]
  },
  {
    id: 'test-2',
    slug: 'hba1c-diabetes-test',
    name: 'HbA1c (Diabetes Test)',
    category: 'Blood tests',
    description: 'Measures average blood sugar levels over the past 2 to 3 months. Essential for diagnosing and monitoring diabetes.',
    sampleType: 'Blood (Whole blood)',
    fastingRequired: false,
    preparation: 'Can be performed at any time of day regardless of meal timing.',
    reportDeliveryTime: '6–8 Hours',
    popular: true,
    providers: [
      {
        hospitalId: 'hosp-1',
        hospitalName: 'United Hospital, Dhaka',
        hospitalSlug: 'united-hospital-dhaka',
        price: 1200,
        originalPrice: 1400,
        branch: 'Gulshan Branch',
        rating: 4.9,
        earliestSlot: 'Today, Available'
      },
      {
        hospitalId: 'hosp-2',
        hospitalName: 'Square Hospital, Dhaka',
        hospitalSlug: 'square-hospital-dhaka',
        price: 1250,
        originalPrice: 1500,
        branch: 'Panthapath Branch',
        rating: 4.8,
        earliestSlot: 'Today, Available'
      },
      {
        hospitalId: 'hosp-3',
        hospitalName: 'Evercare Hospital, Dhaka',
        hospitalSlug: 'evercare-hospital-dhaka',
        price: 1300,
        originalPrice: 1550,
        branch: 'Bashundhara Branch',
        rating: 4.8,
        earliestSlot: 'Today, Available'
      }
    ]
  },
  {
    id: 'test-3',
    slug: 'ultrasound-whole-abdomen',
    name: 'Ultrasound (Whole Abdomen)',
    category: 'Imaging',
    description: 'Sonographic imaging of the liver, gallbladder, kidneys, spleen, pancreas, and urinary bladder to detect stones, fatty liver, or cysts.',
    sampleType: 'Non-invasive Sonography',
    fastingRequired: true,
    preparation: 'Requires 6 to 8 hours of fasting prior to scan. Drink 1 liter of plain water 1 hour prior to maintain a full bladder.',
    reportDeliveryTime: 'Same Day (2 Hours)',
    popular: true,
    providers: [
      {
        hospitalId: 'hosp-1',
        hospitalName: 'United Hospital, Dhaka',
        hospitalSlug: 'united-hospital-dhaka',
        price: 3500,
        originalPrice: 4200,
        branch: 'Gulshan Branch',
        rating: 4.9,
        earliestSlot: 'Tomorrow, 09:00 AM'
      },
      {
        hospitalId: 'hosp-2',
        hospitalName: 'Square Hospital, Dhaka',
        hospitalSlug: 'square-hospital-dhaka',
        price: 3800,
        originalPrice: 4500,
        branch: 'Panthapath Branch',
        rating: 4.8,
        earliestSlot: 'Tomorrow, 10:30 AM'
      },
      {
        hospitalId: 'hosp-3',
        hospitalName: 'Evercare Hospital, Dhaka',
        hospitalSlug: 'evercare-hospital-dhaka',
        price: 4000,
        originalPrice: 4800,
        branch: 'Bashundhara Branch',
        rating: 4.8,
        earliestSlot: 'Tomorrow, 09:30 AM'
      }
    ]
  },
  {
    id: 'test-4',
    slug: 'mri-brain',
    name: 'MRI (Brain)',
    category: 'Radiology',
    description: 'High-resolution cross-sectional magnetic resonance imaging of brain tissue, cranial nerves, ventricles, and cerebral blood flow.',
    sampleType: 'Magnetic Resonance (3.0 Tesla)',
    fastingRequired: false,
    preparation: 'Remove all metallic objects, watches, credit cards, and hearing aids. Notify technician if you have pacemakers or metal implants.',
    reportDeliveryTime: '24 Hours',
    popular: true,
    providers: [
      {
        hospitalId: 'hosp-1',
        hospitalName: 'United Hospital, Dhaka',
        hospitalSlug: 'united-hospital-dhaka',
        price: 15000,
        originalPrice: 17500,
        branch: 'Gulshan Radiology Unit',
        rating: 4.9,
        earliestSlot: 'Tomorrow, 11:00 AM'
      },
      {
        hospitalId: 'hosp-2',
        hospitalName: 'Square Hospital, Dhaka',
        hospitalSlug: 'square-hospital-dhaka',
        price: 15500,
        originalPrice: 18000,
        branch: 'Panthapath Imaging',
        rating: 4.8,
        earliestSlot: 'Tomorrow, 02:00 PM'
      },
      {
        hospitalId: 'hosp-3',
        hospitalName: 'Evercare Hospital, Dhaka',
        hospitalSlug: 'evercare-hospital-dhaka',
        price: 16000,
        originalPrice: 18500,
        branch: 'Bashundhara Radiology',
        rating: 4.8,
        earliestSlot: 'Tomorrow, 01:30 PM'
      }
    ]
  },
  {
    id: 'test-5',
    slug: 'lipid-profile',
    name: 'Lipid Profile (Cholesterol Panel)',
    category: 'Blood tests',
    description: 'Assesses total cholesterol, HDL (good), LDL (bad), and triglycerides to determine cardiovascular disease risk.',
    sampleType: 'Blood (Serum)',
    fastingRequired: true,
    preparation: '10 to 12 hours overnight fasting mandatory. Water intake permitted.',
    reportDeliveryTime: '6 Hours',
    popular: false,
    providers: [
      {
        hospitalId: 'hosp-1',
        hospitalName: 'United Hospital, Dhaka',
        hospitalSlug: 'united-hospital-dhaka',
        price: 1400,
        originalPrice: 1700,
        branch: 'Gulshan Branch',
        rating: 4.9,
        earliestSlot: 'Tomorrow Morning'
      },
      {
        hospitalId: 'hosp-2',
        hospitalName: 'Square Hospital, Dhaka',
        hospitalSlug: 'square-hospital-dhaka',
        price: 1450,
        originalPrice: 1800,
        branch: 'Panthapath Branch',
        rating: 4.8,
        earliestSlot: 'Tomorrow Morning'
      }
    ]
  }
];

export const HEALTH_TIPS: HealthTip[] = [
  {
    id: 'tip-1',
    slug: 'build-a-balanced-diet-for-lasting-health',
    title: 'Build a Balanced Diet for Lasting Health',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Dr. Farzana Ahmed',
      role: 'Internal Medicine Specialist',
      hospital: 'United Hospital, Dhaka',
      avatar: '/images/dr_farzana.jpg',
    },
    publishedDate: 'Oct 28, 2026',
    readTime: '5 min read',
    excerpt: 'Simple nutritional guidelines to nourish your body, sustain daily energy, and reduce the risk of lifestyle conditions.',
    content: [
      'A wholesome diet does not require strict restrictions or unpalatable meals. The foundation of sustainable nutrition lies in proportion, colorful variety, and conscious portioning.',
      'Prioritize whole local vegetables such as spinach, gourds, okra, and carrots. Combine them with high-fiber grains like brown rice or whole-wheat flour, and balance each meal with lean proteins such as fish, lentils, and eggs.',
      'Hydration plays a vital role. In South Asian climates, aiming for 2.5 to 3 liters of filtered water daily supports optimal renal function and digestive health.'
    ],
    keyTakeaways: [
      'Fill half your plate with colorful vegetables and salads.',
      'Choose complex carbohydrates with low glycemic indices.',
      'Drink water consistently throughout the day rather than in single large gulps.'
    ],
    isFeatured: true
  },
  {
    id: 'tip-2',
    slug: 'simple-ways-to-reduce-daily-stress',
    title: 'Simple Ways to Reduce Daily Stress',
    category: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Dr. Tanvir Hasan',
      role: 'Consultant',
      hospital: 'United Hospital, Dhaka',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    },
    publishedDate: 'Oct 26, 2026',
    readTime: '4 min read',
    excerpt: 'Actionable breathing practices, boundary setting, and mental reset rituals to protect cognitive peace during demanding work weeks.',
    content: [
      'Chronic micro-stress triggers prolonged cortisol release, which impacts blood pressure and immune response.',
      'Taking 5 minutes every few hours for diaphragmatic breathing (4-second inhale, 4-second hold, 6-second exhale) downregulates the sympathetic nervous system.',
      'Physical movement like an evening walk outdoors clears mental fatigue significantly faster than sedentary screen time.'
    ],
    keyTakeaways: [
      'Incorporate 5 minutes of mindful breathing into your midday routine.',
      'Disconnect from work communications 1 hour before bedtime.',
      'Engage in brisk light walks to reset physical tension.'
    ],
    isFeatured: true
  },
  {
    id: 'tip-3',
    slug: 'better-sleep-for-a-healthier-you',
    title: 'Better Sleep for a Healthier You',
    category: 'Sleep',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Prof. Dr. A. Rahman',
      role: 'Cardiology Specialist',
      hospital: 'United Hospital, Dhaka',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    },
    publishedDate: 'Oct 24, 2026',
    readTime: '4 min read',
    excerpt: 'Why consistent 7-8 hours of quality sleep is the cornerstone of cardiovascular health, cellular recovery, and mental clarity.',
    content: [
      'During deep non-REM sleep, your blood pressure lowers and heart rate slows, allowing the cardiovascular system to repair.',
      'Keeping a consistent sleep and wake time every day—even during weekends—synchronizes your internal circadian clock.',
      'Avoid heavy meals and caffeine within 4 hours of sleeping to ensure deep restorative cycles.'
    ],
    keyTakeaways: [
      'Maintain fixed sleep and wake schedules.',
      'Dim bright blue lights 60 minutes before bedtime.',
      'Keep your bedroom cool and adequately ventilated.'
    ],
    isFeatured: true
  },
  {
    id: 'tip-4',
    slug: 'a-beginners-guide-to-staying-active',
    title: 'A Beginner’s Guide to Staying Active',
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Dr. Tanvir Hasan',
      role: 'Orthopedic Consultant',
      hospital: 'United Hospital, Dhaka',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
    },
    publishedDate: 'Oct 28, 2026',
    readTime: '5 min read',
    excerpt: 'You do not need an intense gym routine to stay fit. Start with 30 minutes of brisk daily walking and gentle joint mobility.',
    content: [
      'Regular physical activity lowers LDL cholesterol, keeps joint cartilage lubricated, and improves insulin sensitivity.',
      'Begin with 15 minutes of brisk walking morning and evening. Add simple joint mobility exercises for ankles, knees, and hips.',
      'Listen to your body and wear well-cushioned footwear suited for urban pavement.'
    ],
    keyTakeaways: ['30 minutes of daily brisk walking', 'Gentle dynamic stretching before walking', 'Proper footwear protects joint health']
  },
  {
    id: 'tip-5',
    slug: 'everyday-habits-to-stay-infection-free',
    title: 'Everyday Habits to Stay Infection-Free',
    category: 'Disease Prevention',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Dr. Farzana Ahmed',
      role: 'Internal Medicine Specialist',
      hospital: 'United Hospital, Dhaka',
      avatar: '/images/dr_farzana.jpg',
    },
    publishedDate: 'Oct 25, 2026',
    readTime: '4 min read',
    excerpt: 'Proven hand hygiene, food safety, and environmental practices to shield your household from seasonal infections.',
    content: [
      'Hand hygiene remains the single most effective barrier against airborne droplets and surface-transferred bacteria.',
      'Wash hands thoroughly with soap for 20 seconds before meals and upon returning home.',
      'Ensure all food is thoroughly cooked, drinking water is certified boiled or filtered, and keep living areas well ventilated.'
    ],
    keyTakeaways: ['20-second hand washing', 'Safe filtered drinking water', 'Good domestic ventilation']
  },
  {
    id: 'tip-6',
    slug: 'small-changes-for-a-healthier-life',
    title: 'Small Changes for a Healthier Life',
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Dr. Farzana Ahmed',
      role: 'Internal Medicine Specialist',
      hospital: 'United Hospital, Dhaka',
      avatar: '/images/dr_farzana.jpg',
    },
    publishedDate: 'Oct 24, 2026',
    readTime: '4 min read',
    excerpt: 'Micro-habits like drinking a glass of water first thing in the morning and taking stairs compound into lifelong well-being.',
    content: [
      'Lasting health transformations rarely come from extreme short-term diets; they result from sustainable daily micro-actions.',
      'Swapping sugary drinks for fresh lime water and taking 250 steps every hour keeps your metabolic rate active.'
    ],
    keyTakeaways: ['Micro-habits beat drastic diets', 'Stay physically mobile during sedentary desk jobs']
  },
  {
    id: 'tip-7',
    slug: 'essential-health-checks-for-every-woman',
    title: 'Essential Health Checks for Every Woman',
    category: 'Women\'s Health',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Dr. Nusrat Jahan',
      role: 'Obstetrics & Gynecology Specialist',
      hospital: 'Square Hospital, Dhaka',
      avatar: 'https://images.unsplash.com/photo-1594824813579-43c246f497cf?auto=format&fit=crop&w=600&q=80',
    },
    publishedDate: 'Oct 22, 2026',
    readTime: '5 min read',
    excerpt: 'Recommended screening timeline for anemia, thyroid function, cervical screening, and mammography at every age stage.',
    content: [
      'Early detection through annual checkups prevents complications from iron deficiency, hormonal imbalances, and reproductive health conditions.',
      'Women in their 20s and 30s should regularly evaluate complete blood counts and thyroid panels, while mammograms and bone density scans are key past age 40.'
    ],
    keyTakeaways: ['Annual hemoglobin & thyroid checks', 'Regular Pap smears and clinical breast exams']
  },
  {
    id: 'tip-8',
    slug: 'keep-your-blood-pressure-in-check',
    title: 'Keep Your Blood Pressure in Check',
    category: 'Men\'s Health',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Prof. Dr. A. Rahman',
      role: 'Cardiologist',
      hospital: 'United Hospital, Dhaka',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    },
    publishedDate: 'Oct 20, 2026',
    readTime: '4 min read',
    excerpt: 'Hypertension is often silent. Learn how to track resting blood pressure and adopt a low-sodium, heart-protective routine.',
    content: [
      'Hypertension often shows zero symptoms until blood vessels are strained. Regular cuff checks every month after age 30 are essential.',
      'Reduce added salt in traditional curries, increase potassium-rich bananas and spinach, and engage in daily aerobic exercise.'
    ],
    keyTakeaways: ['Target blood pressure under 120/80 mmHg', 'Moderate table salt and packaged snacks']
  },
  {
    id: 'tip-9',
    slug: 'foods-that-boost-immunity-naturally',
    title: 'Foods That Boost Immunity Naturally',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Dr. Farzana Ahmed',
      role: 'Internal Medicine Specialist',
      hospital: 'United Hospital, Dhaka',
      avatar: '/images/dr_farzana.jpg',
    },
    publishedDate: 'Oct 18, 2026',
    readTime: '4 min read',
    excerpt: 'Incorporate citrus fruits, garlic, ginger, and turmeric into your daily meals to support your immune system.',
    content: [
      'A resilient immune system is supported by micronutrients like Vitamin C, zinc, and antioxidants present in unadulterated whole foods.',
      'Fresh seasonal amla (Indian gooseberry), lemons, ginger tea, and garlic provide bioavailable compounds that support white blood cell function.'
    ],
    keyTakeaways: ['Daily citrus and amla for Vitamin C', 'Anti-inflammatory ginger and garlic in daily cooking']
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    doctorId: 'doc-1',
    doctorName: 'Dr. Farzana Ahmed',
    doctorSpecialty: 'Internal Medicine Specialist',
    doctorAvatar: '/images/dr_farzana.jpg',
    hospitalName: 'United Hospital, Dhaka',
    consultationType: 'in-person',
    patientName: 'Sadia Rahman',
    patientPhone: '+880 1712-345678',
    patientAge: '32',
    date: 'Tomorrow, 31 Oct',
    timeSlot: '10:30 AM',
    fee: 1000,
    status: 'Confirmed',
    paymentMethod: 'bKash',
    createdAt: '2026-10-29',
  },
  {
    id: 'apt-102',
    doctorId: 'doc-2',
    doctorName: 'Prof. Dr. A. Rahman',
    doctorSpecialty: 'Cardiology',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    hospitalName: 'United Hospital, Dhaka',
    consultationType: 'online',
    patientName: 'Kamal Hossain (Father)',
    patientPhone: '+880 1819-876543',
    patientAge: '64',
    date: '3 Nov 2026',
    timeSlot: '07:00 PM',
    fee: 1200,
    status: 'Confirmed',
    paymentMethod: 'Pay at Hospital',
    createdAt: '2026-10-28',
  }
];

export const FAMILY_MEMBERS: FamilyMember[] = [
  { id: 'fam-1', name: 'Sadia Rahman', relationship: 'Self', age: 32, gender: 'Female', bloodGroup: 'O+' },
  { id: 'fam-2', name: 'Kamal Hossain', relationship: 'Father', age: 64, gender: 'Male', bloodGroup: 'B+' },
  { id: 'fam-3', name: 'Rowshan Ara', relationship: 'Mother', age: 58, gender: 'Female', bloodGroup: 'A+' },
  { id: 'fam-4', name: 'Aryan Hossain', relationship: 'Son', age: 6, gender: 'Male', bloodGroup: 'O+' },
];

export const HEALTH_RECORDS: HealthRecord[] = [
  {
    id: 'rec-1',
    title: 'Executive Blood Panel & HbA1c Report',
    type: 'Diagnostic Report',
    doctorOrHospital: 'United Hospital Lab',
    date: '15 Oct 2026',
    fileSize: '1.4 MB PDF',
  },
  {
    id: 'rec-2',
    title: 'Hypertension Management Prescription',
    type: 'Prescription',
    doctorOrHospital: 'Dr. Farzana Ahmed',
    date: '10 Sep 2026',
    fileSize: '420 KB PDF',
  },
  {
    id: 'rec-3',
    title: 'Whole Abdomen Ultrasound Scan',
    type: 'Diagnostic Report',
    doctorOrHospital: 'Square Hospital Radiology',
    date: '02 Jun 2026',
    fileSize: '2.8 MB PDF',
  }
];

export const SYMPTOM_DATA = [
  {
    category: 'General & Fever',
    symptoms: ['High fever', 'Body aches & chills', 'Fatigue / weakness', 'Unexplained weight loss', 'Night sweats'],
    specialty: 'Internal Medicine',
    urgency: 'Moderate',
    guidance: 'Fever accompanied by severe weakness or lasting over 3 days requires clinical internal medicine evaluation with CBC and infection markers.',
    recommendedDoctorSlug: 'dr-farzana-ahmed'
  },
  {
    category: 'Heart & Chest',
    symptoms: ['Chest pain / tightness', 'Shortness of breath on exertion', 'Palpitations / racing heartbeat', 'Ankle swelling'],
    specialty: 'Cardiology',
    urgency: 'High',
    guidance: 'Chest tightness radiating to arm or jaw could indicate acute coronary events. Seek emergency care immediately if severe.',
    recommendedDoctorSlug: 'prof-dr-a-rahman'
  },
  {
    category: 'Bones, Joints & Back',
    symptoms: ['Severe back pain', 'Knee joint pain / swelling', 'Difficulty walking', 'Post-injury stiffness', 'Shoulder pain'],
    specialty: 'Orthopedics',
    urgency: 'Low to Moderate',
    guidance: 'Joint inflammation, persistent back ache, or post-fall pain should be evaluated by an Orthopedic specialist with digital X-ray.',
    recommendedDoctorSlug: 'dr-tanvir-hasan'
  },
  {
    category: 'Brain & Nervous System',
    symptoms: ['Persistent severe headache', 'Dizziness / vertigo', 'Numbness or tingling in limbs', 'Memory lapses', 'Tremors'],
    specialty: 'Neurology',
    urgency: 'Moderate to High',
    guidance: 'Sudden onset weakness or speech slurring requires emergency 24/7 care. Chronic headaches and numbness require a Neurologist.',
    recommendedDoctorSlug: 'dr-kazi-shafiul-alam'
  },
  {
    category: 'Women\'s Health & Pregnancy',
    symptoms: ['Irregular menstrual cycles', 'Pelvic pain', 'Pregnancy nausea / monitoring', 'PCOS symptoms'],
    specialty: 'Gynecology & Obstetrics',
    urgency: 'Low to Moderate',
    guidance: 'Hormonal and menstrual irregularities are managed with tailored ultrasound and gynecological consultation.',
    recommendedDoctorSlug: 'dr-nusrat-jahan'
  },
  {
    category: 'Child Health & Pediatrics',
    symptoms: ['High fever in child', 'Persistent cough & wheeze', 'Childhood diarrhea', 'Refusing feeds', 'Growth delay'],
    specialty: 'Pediatrics',
    urgency: 'Moderate to High',
    guidance: 'Infants and toddlers with high fever or feeding difficulties should be promptly examined by a specialized child pediatrician.',
    recommendedDoctorSlug: 'prof-dr-mehedi-hasan'
  },
  {
    category: 'Stomach, Acid & Digestion',
    symptoms: ['Stomach pain / burning', 'Acid reflux / GERD', 'Bloating & gas', 'Fatty liver / elevated SGPT', 'Chronic constipation'],
    specialty: 'Gastroenterology & Hepatology',
    urgency: 'Moderate',
    guidance: 'Upper abdominal burning, peptic acid erosion, or fatty liver requires evaluation by a Gastroenterologist and possible endoscopy.',
    recommendedDoctorSlug: 'prof-dr-tariqul-islam'
  },
  {
    category: 'Skin, Rash & Hair',
    symptoms: ['Severe skin itching / rash', 'Eczema & psoriasis', 'Acne / pimples', 'Fungal ringworm infection', 'Excessive hair fall'],
    specialty: 'Dermatology & Venereology',
    urgency: 'Low',
    guidance: 'Skin lesions, chronic allergies, or progressive scalp hair thinning are managed by a certified Dermatologist.',
    recommendedDoctorSlug: 'dr-sabrina-karim'
  },
  {
    category: 'Ear, Nose & Throat (ENT)',
    symptoms: ['Sore throat / pain swallowing', 'Ear ache or discharge', 'Ringing in ears (tinnitus)', 'Sinus headache & blockage'],
    specialty: 'ENT (Ear, Nose & Throat)',
    urgency: 'Low to Moderate',
    guidance: 'Recurrent sinusitis, tonsillitis, or hearing impairment should be evaluated with an ENT endoscope and audiometry.',
    recommendedDoctorSlug: 'dr-m-a-matin'
  },
  {
    category: 'Eyes & Vision',
    symptoms: ['Blurry vision', 'Eye redness & pain', 'Cataract cloudiness', 'Watery discharge', 'Severe computer eye strain'],
    specialty: 'Ophthalmology (Eye)',
    urgency: 'Moderate',
    guidance: 'Sudden visual blurring, elevated eye pressure (glaucoma), or cataracts should be screened by an Ophthalmologist.',
    recommendedDoctorSlug: 'prof-dr-shahidul-huq'
  },
  {
    category: 'Kidneys & Urinary',
    symptoms: ['Burning urination / UTI', 'Flank / kidney pain', 'Kidney stone colic', 'Blood in urine', 'Elevated creatinine'],
    specialty: 'Nephrology & Urology',
    urgency: 'Moderate to High',
    guidance: 'Kidney pain, urinary burning, or reduced urine output demands kidney ultrasound, urine R/M/E, and Nephrologist review.',
    recommendedDoctorSlug: 'dr-aminul-islam'
  },
  {
    category: 'Lungs & Breathing',
    symptoms: ['Persistent dry or wet cough', 'Bronchial asthma', 'Wheezing at night', 'Shortness of breath', 'Chest congestion'],
    specialty: 'Pulmonology (Chest & Lungs)',
    urgency: 'Moderate to High',
    guidance: 'Chronic respiratory cough, asthma flare-ups, and COPD require spirometry lung function testing and Pulmonology care.',
    recommendedDoctorSlug: 'prof-dr-asifur-rahman'
  },
  {
    category: 'Diabetes & Hormones',
    symptoms: ['High blood sugar / HbA1c', 'Thyroid swelling (goiter)', 'Unexplained weight changes', 'Chronic lethargy'],
    specialty: 'Endocrinology & Diabetology',
    urgency: 'Moderate',
    guidance: 'Insulin adjustment, diabetic organ protection, and thyroid hormone balancing are optimized by an Endocrinologist.',
    recommendedDoctorSlug: 'dr-tahmina-akter'
  },
  {
    category: 'Mental Health & Sleep',
    symptoms: ['Debilitating anxiety & panic', 'Persistent sadness / depression', 'Severe insomnia', 'Chronic work burnout'],
    specialty: 'Psychiatry & Mental Health',
    urgency: 'Moderate',
    guidance: 'Compassionate psychiatric assessment helps restore sleep architecture, panic recovery, and emotional resilience.',
    recommendedDoctorSlug: 'dr-shamsul-huda'
  },
  {
    category: 'Surgical & Hernia',
    symptoms: ['Abdominal or groin bulge (hernia)', 'Gallbladder stone colic', 'Painful piles / hemorrhoids', 'Suspicious lump'],
    specialty: 'General & Laparoscopic Surgery',
    urgency: 'Moderate to High',
    guidance: 'Hernias, symptomatic gallstones, and soft tissue masses are treated with modern minimally-invasive laparoscopic surgery.',
    recommendedDoctorSlug: 'prof-dr-nazmul-karim'
  }
];

