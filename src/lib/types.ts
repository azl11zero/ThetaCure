export type ConsultationType = 'in-person' | 'online';

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  avatar: string;
  isVerified: boolean;
  isDemo?: boolean;
  bmdcNumber: string;
  degrees: string;
  specialty: string;
  subSpecialties: string[];
  experienceYears: number;
  rating: number;
  reviewCount: number;
  hospital: {
    id: string;
    slug: string;
    name: string;
    location: string;
  };
  fees: {
    inPerson: number;
    online: number;
  };
  nextAvailableSlot: {
    date: string;
    time: string;
    formatted: string;
  };
  about: string;
  areasOfExpertise: string[];
  education: Array<{
    degree: string;
    institution: string;
  }>;
  languages: string[];
  schedule: Array<{
    day: string;
    slots: string[];
    type: ConsultationType;
  }>;
  reviews?: Array<{
    id: string;
    patientName: string;
    rating: number;
    date: string;
    comment: string;
    verifiedVisit: boolean;
  }>;
}

export interface Hospital {
  id: string;
  slug: string;
  name: string;
  logo: string;
  coverImage: string;
  category: string;
  isVerified: boolean;
  isDemo?: boolean;
  rating: number;
  reviewCount: number;
  address: string;
  area: string;
  city: string;
  latitude: number;
  longitude: number;
  isEmergency247: boolean;
  hasIcu: boolean;
  hasAmbulance: boolean;
  phone: string;
  emergencyPhone: string;
  beds: string;
  doctorCount: number;
  testCount: number;
  operatingHours: string;
  about: string;
  keyFacilities: string[];
  services: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  gallery: Array<{
    url: string;
    caption: string;
  }>;
  packages: Array<{
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number;
    originalPrice?: number;
    popular?: boolean;
    features: string[];
  }>;
}

export interface DiagnosticTest {
  id: string;
  slug: string;
  name: string;
  category: 'Blood tests' | 'Imaging' | 'Radiology' | 'Pathology' | 'Cardiac tests' | 'Other';
  description: string;
  sampleType?: string;
  fastingRequired: boolean;
  preparation: string;
  reportDeliveryTime: string;
  popular?: boolean;
  providers: Array<{
    hospitalId: string;
    hospitalName: string;
    hospitalSlug: string;
    price: number;
    originalPrice?: number;
    branch: string;
    rating: number;
    earliestSlot: string;
  }>;
}

export interface HealthTip {
  id: string;
  slug: string;
  title: string;
  category: 'Nutrition' | 'Fitness' | 'Mental Health' | 'Sleep' | 'Lifestyle' | 'Disease Prevention' | 'Women\'s Health' | 'Men\'s Health';
  image: string;
  author: {
    name: string;
    role: string;
    hospital?: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  isFeatured?: boolean;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  hospitalName: string;
  consultationType: ConsultationType;
  patientName: string;
  patientPhone: string;
  patientAge: string;
  date: string;
  timeSlot: string;
  fee: number;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  paymentMethod: 'bKash' | 'Nagad' | 'Card' | 'Pay at Hospital';
  tokenNumber?: string | number;
  createdAt: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  age: number;
  gender: string;
  bloodGroup: string;
}

export interface HealthRecord {
  id: string;
  title: string;
  type: 'Prescription' | 'Diagnostic Report' | 'Discharge Summary' | 'Vaccine Card';
  doctorOrHospital: string;
  date: string;
  fileSize: string;
}

export interface SpecialtyItem {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  doctorCount: number;
  commonConditions: string[];
}
