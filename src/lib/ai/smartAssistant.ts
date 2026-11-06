import { DOCTORS, HOSPITALS, DIAGNOSTIC_TESTS, SPECIALTIES } from '../data';
import { AiMessage } from './types';

export function processAiQuery(query: string, currentLang: 'en' | 'bn' = 'en'): AiMessage {
  const q = query.toLowerCase().trim();
  const id = 'msg-' + Date.now();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Emergency detection
  if (
    q.includes('chest pain') ||
    q.includes('heart attack') ||
    q.includes('cannot breathe') ||
    q.includes('breathing') ||
    q.includes('stroke') ||
    q.includes('unconscious') ||
    q.includes('জরুরী') ||
    q.includes('বুকে ব্যথা') ||
    q.includes('শ্বাসকষ্ট')
  ) {
    const unitedHospital = HOSPITALS[0];
    return {
      id,
      sender: 'assistant',
      text: currentLang === 'bn'
        ? '⚠️ জরুরী স্বাস্থ্য সতর্কতা: আপনার উল্লেখিত লক্ষণগুলো জরুরী চিকিৎসার ইঙ্গিত দিচ্ছে। অনুগ্রহ করে অবিলম্বে নিকটস্থ হাসপাতালের ইমার্জেন্সিতে যোগাযোগ করুন অথবা ৯৯৯ এ কল দিন।'
        : '⚠️ Emergency Notice: Your described symptoms require immediate medical attention. Please head to the nearest 24/7 Emergency Room or dial National Emergency (999) without delay.',
      timestamp,
      richContent: {
        type: 'emergencyBanner',
        hospital: unitedHospital,
        actions: [
          { label: currentLang === 'bn' ? 'জরুরী কল: ৯৯৯' : 'Call 999 (Emergency)', href: 'tel:999', variant: 'emergency' },
          { label: currentLang === 'bn' ? 'ইউনাইটেড হাসপাতাল ইমার্জেন্সি' : 'Call United Emergency', href: `tel:${unitedHospital.emergencyPhone}`, variant: 'primary' },
          { label: currentLang === 'bn' ? 'নিকটস্থ হাসপাতাল ম্যাপ' : 'View Emergency Hospitals Map', href: '/map?filter=emergency', variant: 'secondary' }
        ]
      }
    };
  }

  // 2. Doctor search queries (e.g. cardiologist, internal medicine, dr farzana, heart doctor)
  if (
    q.includes('doctor') ||
    q.includes('specialist') ||
    q.includes('cardiologist') ||
    q.includes('medicine') ||
    q.includes('orthopedic') ||
    q.includes('gynecologist') ||
    q.includes('farzana') ||
    q.includes('rahman') ||
    q.includes('ডাক্তার')
  ) {
    let matchedDoc = DOCTORS[0]; // Dr. Farzana
    if (q.includes('cardio') || q.includes('heart') || q.includes('rahman')) {
      matchedDoc = DOCTORS[1]; // Prof. Rahman
    } else if (q.includes('ortho') || q.includes('bone') || q.includes('joint') || q.includes('tanvir')) {
      matchedDoc = DOCTORS[2]; // Dr. Tanvir Hasan
    } else if (q.includes('gyne') || q.includes('women') || q.includes('pregnancy') || q.includes('nusrat')) {
      matchedDoc = DOCTORS[3]; // Dr. Nusrat Jahan
    } else if (q.includes('neuro') || q.includes('brain') || q.includes('shafiul')) {
      matchedDoc = DOCTORS[4]; // Dr. Kazi Shafiul Alam
    }

    return {
      id,
      sender: 'assistant',
      text: currentLang === 'bn'
        ? `আপনার অনুসন্ধানের ভিত্তিতে শীর্ষ রেটপ্রাপ্ত বিশেষজ্ঞ ${matchedDoc.name} (${matchedDoc.specialty}) খুঁজে পাওয়া গেছে। চেম্বার: ${matchedDoc.hospital.name}।`
        : `Based on your request, I found ${matchedDoc.name}, senior ${matchedDoc.specialty} at ${matchedDoc.hospital.name}. You can view the profile or book a verified appointment slot below:`,
      timestamp,
      richContent: {
        type: 'doctorCard',
        doctor: matchedDoc,
        actions: [
          { label: currentLang === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিন' : 'Book Appointment', href: `/doctors/${matchedDoc.slug}/book`, variant: 'primary' },
          { label: currentLang === 'bn' ? 'প্রোফাইল দেখুন' : 'View Full Profile', href: `/doctors/${matchedDoc.slug}`, variant: 'secondary' },
          { label: currentLang === 'bn' ? 'সব ডাক্তার দেখুন' : 'Explore All Doctors', href: '/doctors', variant: 'secondary' }
        ]
      }
    };
  }

  // 3. Diagnostic Test price queries (e.g. cbc, hba1c, mri, ultrasound, test prices)
  if (
    q.includes('test') ||
    q.includes('cbc') ||
    q.includes('blood') ||
    q.includes('hba1c') ||
    q.includes('mri') ||
    q.includes('ultrasound') ||
    q.includes('price') ||
    q.includes('খরচ') ||
    q.includes('টেস্ট')
  ) {
    let matchedTest = DIAGNOSTIC_TESTS[0]; // CBC
    if (q.includes('hba1c') || q.includes('diabetes') || q.includes('sugar')) {
      matchedTest = DIAGNOSTIC_TESTS[1];
    } else if (q.includes('ultra') || q.includes('abdomen') || q.includes('usg')) {
      matchedTest = DIAGNOSTIC_TESTS[2];
    } else if (q.includes('mri') || q.includes('brain')) {
      matchedTest = DIAGNOSTIC_TESTS[3];
    } else if (q.includes('lipid') || q.includes('cholesterol')) {
      matchedTest = DIAGNOSTIC_TESTS[4];
    }

    return {
      id,
      sender: 'assistant',
      text: currentLang === 'bn'
        ? `${matchedTest.name}-এর হাসপাতালভিত্তিক মূল্য তালিকা ও বুকিং নির্দেশিকা নিচে দেওয়া হলো:`
        : `Here is the transparent pricing breakdown across accredited Dhaka laboratories for ${matchedTest.name}:`,
      timestamp,
      richContent: {
        type: 'testComparison',
        test: matchedTest,
        actions: [
          { label: currentLang === 'bn' ? 'টেস্ট বুক করুন' : 'Book Diagnostic Test', href: `/diagnostics/${matchedTest.slug}`, variant: 'primary' },
          { label: currentLang === 'bn' ? 'সকল টেস্ট তুলনা করুন' : 'Compare All Diagnostic Tests', href: '/diagnostics', variant: 'secondary' }
        ]
      }
    };
  }

  // 4. Hospital & Map queries (e.g. hospital, near me, location, map, gulshan, united)
  if (
    q.includes('hospital') ||
    q.includes('near') ||
    q.includes('map') ||
    q.includes('location') ||
    q.includes('gulshan') ||
    q.includes('dhanmondi') ||
    q.includes('united') ||
    q.includes('square') ||
    q.includes('হাসপাতাল') ||
    q.includes('ম্যাপ')
  ) {
    return {
      id,
      sender: 'assistant',
      text: currentLang === 'bn'
        ? 'ঢাকার শীর্ষ হাসপাতালগুলোর অবস্থান ও সেবা নির্দেশিকা নিচে প্রদর্শিত হলো। আপনি সরাসরি ম্যাপে দূরত্ব দেখতে পারেন।'
        : 'Here are the leading hospitals in Dhaka with live bed availability, 24/7 emergency care, and distance navigation:',
      timestamp,
      richContent: {
        type: 'mapCard',
        hospitals: HOSPITALS,
        actions: [
          { label: currentLang === 'bn' ? 'লাইভ ম্যাপ খুলুন' : 'Open Interactive Hospital Map', href: '/map', variant: 'primary' },
          { label: currentLang === 'bn' ? 'ইউনাইটেড হাসপাতাল প্রোফাইল' : 'United Hospital Profile', href: '/hospitals/united-hospital-dhaka', variant: 'secondary' },
          { label: currentLang === 'bn' ? 'সকল হাসপাতাল' : 'View All Hospitals', href: '/hospitals', variant: 'secondary' }
        ]
      }
    };
  }

  // 5. General Healthcare / Symptom Navigation Fallback
  return {
    id,
    sender: 'assistant',
    text: currentLang === 'bn'
      ? `আপনার জিজ্ঞাসার জন্য ধন্যবাদ। থিটাকিউর প্ল্যাটফর্মের মাধ্যমে আপনি দ্রুত ডাক্তার খুঁজে নিতে পারেন, টেস্টের খরচ যাচাই করতে পারেন অথবা নিকটস্থ হাসপাতালের ম্যাপ দেখতে পারেন। নিচে দ্রুত লিঙ্কগুলো দেওয়া হলো:`
      : `Thank you for reaching out. ThetaCure simplifies your healthcare navigation in Bangladesh. How would you like to proceed?`,
    timestamp,
    richContent: {
      type: 'doctorCard',
      doctor: DOCTORS[0],
      actions: [
        { label: currentLang === 'bn' ? 'এআই লক্ষণ নির্দেশিকা' : 'Check Symptoms with AI', href: '/ai-doctor-finder', variant: 'primary' },
        { label: currentLang === 'bn' ? 'ডাক্তার খুঁজুন' : 'Find Doctors', href: '/doctors', variant: 'secondary' },
        { label: currentLang === 'bn' ? 'হাসপাতাল ম্যাপ' : 'Nearby Hospitals Map', href: '/map', variant: 'secondary' },
        { label: currentLang === 'bn' ? 'স্বাস্থ্য টিপস' : 'Read Health Tips', href: '/health-tips', variant: 'secondary' }
      ]
    }
  };
}
