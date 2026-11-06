import { DOCTORS, HOSPITALS, DIAGNOSTIC_TESTS, SPECIALTIES } from '../data';
import { Doctor } from '../types';
import { AiMessage } from './types';

interface DiscomfortMapping {
  key: string;
  locationEn: string;
  locationBn: string;
  specialtyName: string;
  specialtySlug: string;
  keywords: string[];
  selfCareEn: string[];
  selfCareBn: string[];
  redFlagsEn: string;
  redFlagsBn: string;
}

const DISCOMFORT_TAXONOMY: DiscomfortMapping[] = [
  // 1. Chest & Cardiovascular
  {
    key: 'cardiology',
    locationEn: 'Chest / Cardiovascular System',
    locationBn: 'বুক ও হৃদযন্ত্র (কার্ডিওভাসকুলার)',
    specialtyName: 'Cardiology',
    specialtySlug: 'cardiology',
    keywords: [
      'chest', 'heart', 'palpitation', 'angina', 'tightness in chest', 'buke betha', 'buke chap',
      'dhorfor', 'buk dhorfor', 'cardio', 'blood pressure', 'hypertension', 'cholesterol', 'pulse',
      'বুক', 'হৃদযন্ত্র', 'বুকে ব্যথা', 'বুক ধড়ফড়', 'উচ্চ রক্তচাপ'
    ],
    selfCareEn: [
      'Sit down calmly and rest in an upright, well-ventilated posture.',
      'Loosen any tight clothing around your collar and chest.',
      'Monitor your resting pulse rate and blood pressure if a home monitor is available.'
    ],
    selfCareBn: [
      'শান্ত হয়ে সোজা হয়ে বসুন এবং খোলামেলা বাতাসে বিশ্রাম নিন।',
      'গলা বা বুকের আঁটসাঁট পোশাক ঢিলেঢালা করে দিন।',
      'ঘরে বিপি মাপার মেশিন থাকলে প্রেসার ও পালস মেপে নোট রাখুন।'
    ],
    redFlagsEn: 'Crushing central chest pain radiating to left arm, neck, or jaw accompanied by sweating and breathlessness requires immediate 999 or ER evaluation.',
    redFlagsBn: 'বুকে প্রচণ্ড চাপ, ঘাম হওয়া এবং বাঁ হাতে বা চোয়ালে ব্যথা ছড়িয়ে পড়লে অবিলম্বে ৯৯৯ এ কল দিন বা ইমার্জেন্সিতে যান।'
  },

  // 2. Abdomen & Digestive
  {
    key: 'gastroenterology',
    locationEn: 'Abdomen / Gastrointestinal System',
    locationBn: 'পেট ও পরিপাকতন্ত্র (গ্যাস্ট্রোএন্টারোলজি)',
    specialtyName: 'Gastroenterology & Hepatology',
    specialtySlug: 'gastroenterology',
    keywords: [
      'stomach', 'belly', 'abdomen', 'acid', 'gerd', 'heartburn', 'gas', 'bloating', 'indigestion',
      'pet betha', 'pet kharap', 'ombol', 'jala pora', 'gaser betha', 'liver', 'fatty liver',
      'constipation', 'vomiting', 'nausea', 'diarrhea', 'loose motion', 'ulcer', 'gastric',
      'পেট', 'পেট ব্যথা', 'গ্যাস্ট্রিক', 'বুক জ্বালা', 'বদহজম', 'লিভার', 'ডায়রিয়া'
    ],
    selfCareEn: [
      'Sip room-temperature water or oral rehydration fluids (ORS) in small quantities.',
      'Avoid oily, deep-fried street foods, spicy chilies, caffeine, and tobacco.',
      'Stay upright for at least 2 hours after meals to prevent acid reflux.'
    ],
    selfCareBn: [
      'স্বাভাবিক তাপমাত্রার পানি বা ওরস্যালাইন অল্প অল্প করে পান করুন।',
      'তেলযুক্ত, অতিরিক্ত ঝাল খাবার ও চা-কফি পরিহার করুন।',
      'খাওয়ার পরপরই শুয়ে পড়বেন না, অন্তত ২ ঘণ্টা সোজা হয়ে বসুন।'
    ],
    redFlagsEn: 'Severe sharp abdominal rigidity, persistent black stool, vomiting blood, or sudden jaundice (yellow eyes) require emergency clinical review.',
    redFlagsBn: 'তীব্র অসহ্য পেটব্যথা, বমি বা মলের সাথে রক্ত যাওয়া অথবা চোখ হলুদ হয়ে গেলে অবিলম্বে জরুরি বিভাগে দেখান।'
  },

  // 3. Bones, Spine & Joints
  {
    key: 'orthopedics',
    locationEn: 'Bones, Joints & Musculoskeletal System',
    locationBn: 'হাড়, অস্থিসন্ধি ও মেরুদণ্ড (অর্থোপেডিকস)',
    specialtyName: 'Orthopedics',
    specialtySlug: 'orthopedics',
    keywords: [
      'knee', 'back', 'spine', 'bone', 'joint', 'shoulder', 'neck', 'fracture', 'sprain',
      'hatu betha', 'komor betha', 'ghare betha', 'haad betha', 'ortho', 'arthritis', 'ligament',
      'sciatica', 'slip disc', 'hip', 'ankle', 'হাড়', 'হাঁটু ব্যথা', 'মাজার ব্যথা', 'কোমর ব্যথা', 'অস্থিসন্ধি'
    ],
    selfCareEn: [
      'Apply an ice pack wrapped in a cloth for 15 minutes to reduce acute joint swelling.',
      'Avoid lifting heavy loads, twisting your lumbar spine, or sitting on the floor.',
      'Maintain an ergonomic back support while sitting or working at your desk.'
    ],
    selfCareBn: [
      'তাজা আঘাত বা ফোলা স্থানে কাপড়ে বরফ পেঁচিয়ে ১৫ মিনিট সেঁক দিন।',
      'ভারী ওজন তোলা এবং মেঝেতে নিচু হয়ে বসা পরিহার করুন।',
      'বসার সময় পিঠ সোজা রাখতে একটি ছোট কুশন সাপোর্ট ব্যবহার করুন।'
    ],
    redFlagsEn: 'Inability to bear any weight on a limb, severe deformity after trauma, or sudden loss of bladder/bowel sensation requires immediate orthopedic ER attention.',
    redFlagsBn: 'পায়ের ওপর একেবারেই ভর দিতে না পারা, হাড়ের বিকৃতি বা কোমরের ব্যথার সাথে প্রস্রাবের নিয়ন্ত্রণ হারিয়ে ফেলা অবিলম্বে ইমার্জেন্সি বিষয়।'
  },

  // 4. Head, Nerves & Brain
  {
    key: 'neurology',
    locationEn: 'Head, Nerves & Neurological System',
    locationBn: 'মাথা, মস্তিষ্ক ও স্নায়ুতন্ত্র (নিউরোলজি)',
    specialtyName: 'Neurology',
    specialtySlug: 'neurology',
    keywords: [
      'head', 'headache', 'migraine', 'dizziness', 'vertigo', 'numbness', 'tingling', 'seizure',
      'tremor', 'fainting', 'matha betha', 'matha ghorano', 'obosh', 'neuro', 'brain', 'stroke',
      'মাথা', 'মাথা ব্যথা', 'মাইগ্রেন', 'মাথা ঘোরানো', 'হাত পা অবশ', 'স্নায়ু', 'খিঁচুনি'
    ],
    selfCareEn: [
      'Rest in a quiet, darkened room free of bright screens, strong sunlight, or loud audio.',
      'Stay hydrated with water and avoid skipping your scheduled meals.',
      'Apply a cool compress across your forehead and gently massage temple muscles.'
    ],
    selfCareBn: [
      'শব্দহীন অন্ধকার ঘরে বিশ্রাম নিন, মোবাইল বা টিভির স্ক্রিন এড়িয়ে চলুন।',
      'পর্যাপ্ত পানি পান করুন এবং খাবার বাদ দেবেন না।',
      'কপালের ওপর ঠান্ডা ভেজা তোয়ালে রেখে হালকা ম্যাসাজ করতে পারেন।'
    ],
    redFlagsEn: 'Sudden "thunderclap" headache, facial drooping, slurred speech, or weakness on one side of the body indicates stroke—act within the 4.5-hour golden window (Call 999).',
    redFlagsBn: 'হঠাৎ তীব্র মাথা ব্যথা, মুখের একপাশ বেঁকে যাওয়া বা একপাশের হাত-পা দুর্বল হয়ে যাওয়া স্ট্রোকের লক্ষণ—কালবিলম্ব না করে হাসপাতালে যান।'
  },

  // 5. Skin & Hair
  {
    key: 'dermatology',
    locationEn: 'Skin, Scalp & Dermatology',
    locationBn: 'ত্বক, চুল ও চর্মরোগ (ডার্মাটোলজি)',
    specialtyName: 'Dermatology & Venereology',
    specialtySlug: 'dermatology',
    keywords: [
      'skin', 'rash', 'itching', 'chulkani', 'allergy', 'eczema', 'acne', 'pimple', 'psoriasis',
      'fungus', 'ringworm', 'daud', 'hair fall', 'dandruff', 'scalp', 'blister', 'ত্বক', 'চুলকানি',
      'র‍্যাশ', 'চর্মরোগ', 'ব্রণ', 'চুল পড়া'
    ],
    selfCareEn: [
      'Wash gently with lukewarm water and mild, fragrance-free cleansing soap.',
      'Refrain from aggressive scratching to prevent bacterial secondary infection.',
      'Apply clean calamine lotion or bland fragrance-free moisturizing cream.'
    ],
    selfCareBn: [
      'কুসুম গরম পানি ও মৃদু সাবান দিয়ে ত্বক পরিষ্কার রাখুন।',
      'নখ দিয়ে জোরে চুলকাবেন না, এতে ইনফেকশন ছড়িয়ে পড়তে পারে।',
      'সুগন্ধিহীন ময়েশ্চারাইজার ব্যবহার করুন এবং সুতি ঢিলেঢালা পোশাক পরুন।'
    ],
    redFlagsEn: 'Rapidly spreading purple spots, skin blistering accompanied by high fever, or swelling of lips/throat indicates severe systemic allergy (anaphylaxis).',
    redFlagsBn: 'চুলকানির সাথে ঠোঁট বা মুখ ফুলে যাওয়া ও শ্বাসকষ্ট শুরু হলে অবিলম্বে ইমার্জেন্সিতে যান।'
  },

  // 6. Ear, Nose & Throat (ENT)
  {
    key: 'ent',
    locationEn: 'Ear, Nose & Throat (ENT)',
    locationBn: 'কান, নাক ও গলা (ইএনটি)',
    specialtyName: 'ENT (Ear, Nose & Throat)',
    specialtySlug: 'ent',
    keywords: [
      'throat', 'ear', 'nose', 'sinus', 'tonsil', 'gola betha', 'kan betha', 'nak bondho',
      'sore throat', 'tinnitus', 'hearing', 'hoarseness', 'swallowing', 'snoring', 'ent',
      'গলা', 'কান', 'নাক', 'গলা ব্যথা', 'টনসিল', 'সাইনাস', 'কানে ব্যথা'
    ],
    selfCareEn: [
      'Gargle 3 times daily with warm salt water to soothe irritated pharyngeal tissues.',
      'Inhale gentle plain steam for 10 minutes to relieve nasal sinus congestion.',
      'Never insert cotton buds, keys, or foreign instruments inside ear canals.'
    ],
    selfCareBn: [
      'কুসুম গরম পানিতে সামান্য লবণ দিয়ে দিনে ৩ বার গার্গল করুন।',
      'নাক বন্ধ থাকলে গরম পানির ভাপ বা স্টিম নিন।',
      'কানের ভেতর কটনবাড বা কোনো ধারালো কাঠি কখনোই ঢুকাবেন না।'
    ],
    redFlagsEn: 'Inability to swallow saliva, stridor (noisy whistling breathing), or persistent bleeding from ear/nose warrants urgent clinical intervention.',
    redFlagsBn: 'লালা গিলতে না পারা, গলায় শ্বাস আটকে যাওয়ার মতো শব্দ বা কান-নাক দিয়ে রক্ত পড়লে দ্রুত ডাক্তারের শরণাপন্ন হোন।'
  },

  // 7. Eyes & Vision
  {
    key: 'ophthalmology',
    locationEn: 'Eyes & Visual System',
    locationBn: 'চোখ ও দৃষ্টিশক্তি (চক্ষুরোগ)',
    specialtyName: 'Ophthalmology (Eye)',
    specialtySlug: 'ophthalmology',
    keywords: [
      'eye', 'vision', 'blurry', 'cataract', 'chokhe betha', 'chokhe jhapsha', 'chokh lal',
      'red eye', 'watery eye', 'glaucoma', 'strain', 'spectacles', 'sight', 'চোখ', 'চোখে ব্যথা',
      'চোখ লাল', 'ঝাপসা দেখা', 'ছানি'
    ],
    selfCareEn: [
      'Follow the 20-20-20 rule: every 20 minutes look 20 feet away for 20 seconds.',
      'Do not rub irritated eyes; rinse gently with clean drinking water if dust enters.',
      'Wear ultraviolet protective sunglasses when stepping out in bright daylight.'
    ],
    selfCareBn: [
      'প্রতি ২০ মিনিট স্ক্রিন দেখার পর ২০ ফুট দূরে ২০ সেকেন্ড তাকিয়ে চোখকে বিশ্রাম দিন।',
      'চোখ ডলবেন না; ধুলাবালি ঢুকলে পরিষ্কার নিরাপদ পানি দিয়ে ধুয়ে নিন।',
      'রোদে বের হওয়ার সময় সানগ্লাস ব্যবহার করুন।'
    ],
    redFlagsEn: 'Sudden total vision blackout, flashing lights with dark curtain floaters, or severe deep throbbing ocular pain with nausea suggests acute glaucoma/retinal detachment.',
    redFlagsBn: 'হঠাৎ এক চোখের দৃষ্টি চলে যাওয়া, তীব্র ব্যথাসহ বমি ভাব হলে জরুরি চক্ষু হাসপাতালে যান।'
  },

  // 8. Pediatric / Child Health
  {
    key: 'pediatrics',
    locationEn: 'Pediatric / Child Wellness',
    locationBn: 'শিশু ও নবজাতক স্বাস্থ্য (পেডিয়াট্রিকস)',
    specialtyName: 'Pediatrics',
    specialtySlug: 'pediatrics',
    keywords: [
      'child', 'baby', 'infant', 'toddler', 'kid', 'shishu', 'baccha', 'bacchar jor', 'newborn',
      'vaccination', 'child cough', 'pediatric', 'growth', 'শিশু', 'বাচ্চা', 'বাচ্চার জ্বর', 'নবজাতক'
    ],
    selfCareEn: [
      'Offer plenty of fluids, breastmilk, or oral hydration solution at frequent intervals.',
      'Sponging with normal temperature water across forehead, neck, and armpits for fever.',
      'Keep the child in light, breathable cotton wear in a well-ventilated room.'
    ],
    selfCareBn: [
      'বাচ্চাকে ঘন ঘন বুকের দুধ, পানি বা ওরস্যালাইন খাওয়ান।',
      'জ্বর বেশি হলে স্বাভাবিক তাপমাত্রার পানিতে সুতি কাপড় ভিজিয়ে শরীর মুছে (স্পঞ্জ) দিন।',
      'বাচ্চাকে হালকা সুতি পোশাক পরিয়ে ঘরে পর্যাপ্ত বাতাসের ব্যবস্থা রাখুন।'
    ],
    redFlagsEn: 'Infant under 3 months with 100.4°F+ fever, lethargy (refusing feeds), persistent vomiting, or chest retractions during breathing requires emergency pediatric evaluation.',
    redFlagsBn: '৩ মাসের কম বয়সী বাচ্চার জ্বর, খাবার খাওয়া বন্ধ করে নিস্তেজ হয়ে পড়া বা শ্বাস নিতে বুক দেবে গেলে অবিলম্বে হাসপাতালে নিন।'
  },

  // 9. Women's Health & Gynecology
  {
    key: 'gynecology-obstetrics',
    locationEn: 'Reproductive & Women’s Health',
    locationBn: 'মহিলা স্বাস্থ্য ও প্রসূতি (গাইনিকোলজি)',
    specialtyName: 'Gynecology & Obstetrics',
    specialtySlug: 'gynecology-obstetrics',
    keywords: [
      'pregnancy', 'period', 'menstrual', 'cramp', 'pcos', 'bleeding', 'pelvic', 'vaginal',
      'uterus', 'ovary', 'mahila', 'masik', 'gynae', 'obstetric', 'গর্ভবতী', 'পিরিয়ড', 'মাসিক',
      'তলপেটে ব্যথা', 'মহিলা'
    ],
    selfCareEn: [
      'Apply a warm hot water compress to your lower abdomen to ease menstrual muscular cramping.',
      'Stay well-hydrated and include iron-rich leafy greens and fruits in your meals.',
      'Track bleeding onset dates and cycle lengths using a health calendar.'
    ],
    selfCareBn: [
      'মাসিকের সময় তলপেটে হালকা গরম পানির সেঁক দিলে মাংসপেশির খিঁচুনি কমে।',
      'পর্যাপ্ত পানি পান করুন এবং শাকসবজি ও আয়রনযুক্ত পুষ্টিকর খাবার গ্রহণ করুন।',
      'আপনার মাসিকের তারিখ ও লক্ষণ নিয়মিত ক্যালেন্ডারে লিখে রাখুন।'
    ],
    redFlagsEn: 'Soaking more than two pads per hour for consecutive hours, severe unilateral pelvic agony with dizziness, or pregnancy bleeding requires immediate ER care.',
    redFlagsBn: 'ঘণ্টায় দুইটির বেশি প্যাড ভিজে যাওয়ার মতো রক্তক্ষরণ বা গর্ভকালীন তীব্র পেটে ব্যথা হলে দ্রুত হাসপাতালে যোগাযোগ করুন।'
  },

  // 10. Lungs & Respiratory
  {
    key: 'pulmonology',
    locationEn: 'Lungs & Respiratory Tract',
    locationBn: 'ফুসফুস ও শ্বাসতন্ত্র (পালমোনোলজি)',
    specialtyName: 'Pulmonology (Chest & Lungs)',
    specialtySlug: 'pulmonology',
    keywords: [
      'lung', 'cough', 'asthma', 'wheeze', 'breath', 'shashkoshto', 'kashi', 'phlegm', 'bronchitis',
      'pneumonia', 'copd', 'inhaler', 'chest congestion', 'ফুসফুস', 'কাশি', 'শ্বাসকষ্ট', 'হাঁপানি', 'কফ'
    ],
    selfCareEn: [
      'Drink warm water, ginger-honey tea, or clear soups to loosen thick bronchial secretions.',
      'Avoid sudden exposure to cold air conditioning, dust, smoke, incense, and aerosols.',
      'Maintain an elevated sleeping posture with 2 pillows to facilitate nighttime breathing.'
    ],
    selfCareBn: [
      'হালকা কুসুম গরম পানি, আদা-মধুর চা পান করলে জমে থাকা কফ পাতলা হয়।',
      'ধুলাবালি, ঠান্ডা বাতাস ও সিগারেটের ধোঁয়া পুরোপুরি এড়িয়ে চলুন।',
      'রাতে ঘুমানোর সময় ২টি বালিশ দিয়ে মাথা কিছুটা উঁচুতে রাখুন।'
    ],
    redFlagsEn: 'Cyanosis (bluish tint around lips/fingertips), oxygen saturation (SpO2) under 92%, or inability to speak in complete sentences requires immediate oxygen therapy in ER.',
    redFlagsBn: 'অক্সিজেন মাত্রা ৯২%-এর নিচে নেমে গেলে বা শ্বাসকষ্টে পুরো বাক্য না বলতে পারলে কালবিলম্ব না করে ইমার্জেন্সিতে যান।'
  },

  // 11. Kidneys & Urinary Tract
  {
    key: 'nephrology-urology',
    locationEn: 'Kidneys & Urinary Tract',
    locationBn: 'কিডনি ও মূত্রনালী (নেফ্রোলজি ও ইউরোলজি)',
    specialtyName: 'Nephrology & Urology',
    specialtySlug: 'nephrology-urology',
    keywords: [
      'kidney', 'urine', 'urination', 'burning', 'uti', 'prosrab', 'stone', 'flank pain', 'creatinine',
      'dialysis', 'prostate', 'bladder', 'কিডনি', 'প্রস্রাব', 'প্রস্রাবে জ্বালাপোড়া', 'কিডনি পাথর'
    ],
    selfCareEn: [
      'Hydrate generously with 2.5–3 liters of safe filtered water throughout the day.',
      'Never hold or delay urination when you feel the urge to empty your bladder.',
      'Avoid high-sodium packaged snacks and excess artificial soft drinks.'
    ],
    selfCareBn: [
      'দিনে আড়াই থেকে তিন লিটার নিরাপদ পানি পান করুন।',
      'প্রস্রাবের বেগ চেপে রাখবেন না, নিয়মিত প্রস্রাব করুন।',
      'অতিরিক্ত লবণযুক্ত খাবার ও কোমল পানীয় বর্জন করুন।'
    ],
    redFlagsEn: 'Visible red blood in urine, high fever with severe back/flank colic, or complete stoppage of urination requires immediate urological evaluation.',
    redFlagsBn: 'প্রস্রাবে রক্ত দেখা দেওয়া, কাঁপুনি দিয়ে জ্বরের সাথে কোমরে তীব্র ব্যথা হলে দ্রুত ডাক্তার দেখান।'
  },

  // 12. Hormones, Thyroid & Diabetes
  {
    key: 'endocrinology',
    locationEn: 'Endocrine & Metabolic System',
    locationBn: 'হরমোন ও থাইরয়েড (এন্ডোক্রাইনোলজি)',
    specialtyName: 'Endocrinology & Diabetology',
    specialtySlug: 'endocrinology',
    keywords: [
      'sugar', 'diabetes', 'thyroid', 'hormone', 'weight loss', 'weight gain', 'hba1c', 'glucose',
      'insulin', 'goiter', 'shugar', 'হাইপোগ্লাইসেমিয়া', 'ডায়াবেটিস', 'থাইরয়েড', 'হরমোন'
    ],
    selfCareEn: [
      'Keep a strict meal timetable with controlled complex carbohydrates and high fiber.',
      'Engage in 30 minutes of brisk aerobic walking daily to enhance cellular insulin sensitivity.',
      'Keep a written glucometer log of both fasting and 2-hour post-meal blood sugar levels.'
    ],
    selfCareBn: [
      'নির্দিষ্ট সময়ে খাবার খান, চিনি ও অতিরিক্ত শর্করাযুক্ত খাবার এড়িয়ে চলুন।',
      'প্রতিদিন অন্তত ৩০ মিনিট দ্রুত হাঁটার অভ্যাস গড়ে তুলুন।',
      'খালি পেটে ও খাওয়ার ২ ঘণ্টা পর রক্তের সুগার মেপে ডায়েরিতে লিখে রাখুন।'
    ],
    redFlagsEn: 'Confusion, profuse cold sweating, extreme shakiness (blood sugar < 70 mg/dL: take 3 glucose sweets immediately), or fruity-scented heavy breathing requires emergency care.',
    redFlagsBn: 'সুগার হঠাৎ খুব কমে গিয়ে ঘাম ও কাঁপুনি শুরু হলে দ্রুত মিষ্টি পানি খান; চেতনা হারালে দ্রুত হাসপাতালে নিন।'
  },

  // 13. Mental Well-being
  {
    key: 'psychiatry',
    locationEn: 'Mental & Emotional Well-being',
    locationBn: 'মানসিক স্বাস্থ্য ও মস্তিষ্ক (সাইকিয়াট্রি)',
    specialtyName: 'Psychiatry & Mental Health',
    specialtySlug: 'psychiatry',
    keywords: [
      'anxiety', 'panic', 'depression', 'insomnia', 'sleep', 'stress', 'sad', 'crying', 'fear',
      'mental', 'burnout', 'ocd', 'chinte', 'ghum', 'voy', 'মানসিক', 'উদ্বেগ', 'বিষণ্ণতা', 'ঘুম না হওয়া', 'ভয়'
    ],
    selfCareEn: [
      'Practice 4-7-8 rhythmic box breathing: inhale 4 sec, hold 7 sec, exhale smoothly for 8 sec.',
      'Establish a fixed bedtime and remove glowing smartphone screens 1 hour prior to sleep.',
      'Share your feelings with a trusted family member or certified counselor.'
    ],
    selfCareBn: [
      'গভীরভাবে শ্বাস নিয়ে ধীরে ধীরে ছাড়ুন (৪ সেকেন্ড শ্বাস নিন, ৭ সেকেন্ড ধরে রাখুন, ৮ সেকেন্ডে ছাড়ুন)।',
      'ঘুমানোর অন্তত ১ ঘণ্টা আগে মোবাইল ও কম্পিউটার বন্ধ রাখুন।',
      'আপনার মনের কষ্টের কথা ঘনিষ্ঠ কোনো আপনজনের সাথে ভাগাভাগি করুন।'
    ],
    redFlagsEn: 'Thoughts of self-harm, severe detachment from reality, or inability to care for oneself requires immediate mental health crisis hotline or clinical intervention.',
    redFlagsBn: 'নিজের ক্ষতি করার চিন্তা এলে অবিলম্বে জাতীয় মানসিক স্বাস্থ্য হেল্পলাইন বা জরুরি বিভাগে যোগাযোগ করুন।'
  },

  // 14. Surgical Conditions
  {
    key: 'general-surgery',
    locationEn: 'Surgical / Abdominal Wall & Soft Tissue',
    locationBn: 'সার্জিক্যাল ও উদর প্রাচীর (জেনারেল সার্জারি)',
    specialtyName: 'General & Laparoscopic Surgery',
    specialtySlug: 'general-surgery',
    keywords: [
      'hernia', 'gallbladder', 'gallstone', 'appendix', 'appendicitis', 'piles', 'hemorrhoid',
      'fissure', 'lump', 'abscess', 'swelling', 'surgery', 'হার্নিয়া', 'পিত্তথলি', 'অ্যাপেন্ডিসাইটিস', 'পাইলস'
    ],
    selfCareEn: [
      'Avoid strenuous straining during bowel movements; consume high-fiber papaya and oats.',
      'Never press, squeeze, or pierce any suspicious bodily lump or painful swelling.',
      'Keep surgical wounds or tender sites completely dry and protected.'
    ],
    selfCareBn: [
      'কোষ্ঠকাঠিন্য যেন না হয় সে জন্য প্রচুর শাকসবজি ও ইসবগুলের ভুসি খান।',
      'শরীরের কোনো ফোলা অংশ বা গোটা জোর করে টিপবেন না।',
      'ব্যথাযুক্ত স্থান পরিষ্কার ও শুকনো রাখুন।'
    ],
    redFlagsEn: 'Irreducible tender hernia groin bulge with vomiting, sudden right lower quadrant rebound tenderness (appendix), or heavy rectal bleeding demands emergency hospital admission.',
    redFlagsBn: 'তলপেটের ডানপাশে তীব্র ধারালো ব্যথা বা হার্নিয়া ভেতরে না ঢোকার সাথে বমি হলে দ্রুত জরুরি সার্জারির জন্য হাসপাতালে যান।'
  }
];

/**
 * Returns the highest-reviewed verified doctor for a given specialty name or category
 */
export function getTopReviewedDoctorForSpecialty(specialtyName: string): Doctor {
  const normalized = specialtyName.toLowerCase();
  const candidates = DOCTORS.filter((d) => {
    return (
      d.specialty.toLowerCase().includes(normalized) ||
      normalized.includes(d.specialty.toLowerCase()) ||
      d.subSpecialties.some((s) => s.toLowerCase().includes(normalized) || normalized.includes(s.toLowerCase()))
    );
  });

  if (candidates.length === 0) {
    // Fallback to highest rated overall doctor
    return [...DOCTORS].sort((a, b) => b.reviewCount * b.rating - a.reviewCount * a.rating)[0];
  }

  // Sort by review score: (rating * reviewCount) descending
  return candidates.sort((a, b) => b.reviewCount * b.rating - a.reviewCount * a.rating)[0];
}

export function processAiQuery(query: string, currentLang: 'en' | 'bn' = 'en'): AiMessage {
  const q = query.toLowerCase().trim();
  const id = 'msg-' + Date.now();
  const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // 1. Critical Emergency Detection (Red-Flag Symptoms)
  if (
    (q.includes('cannot breathe') || q.includes('heart attack') || q.includes('unconscious') || q.includes('পাগল') || q.includes('জরুরী')) &&
    (q.includes('severe') || q.includes('collapse') || q.includes('bleed') || q.includes('999'))
  ) {
    const emergencyHospital = HOSPITALS[0];
    return {
      id,
      sender: 'assistant',
      text: currentLang === 'bn'
        ? '⚠️ জরুরী স্বাস্থ্য সতর্কতা: আপনার উল্লেখিত লক্ষণগুলো জরুরি চিকিৎসার ইঙ্গিত দিচ্ছে। অনুগ্রহ করে অবিলম্বে নিকটস্থ হাসপাতালের ইমার্জেন্সি বিভাগে যান অথবা ৯৯৯ এ কল দিন।'
        : '⚠️ Critical Emergency Notice: Your described symptoms require immediate hospital resuscitation. Please proceed to the nearest 24/7 Emergency Room or dial National Emergency (999) right now.',
      timestamp,
      richContent: {
        type: 'emergencyBanner',
        hospital: emergencyHospital,
        actions: [
          { label: currentLang === 'bn' ? 'জরুরী কল: ৯৯৯' : 'Call 999 (National Emergency)', href: 'tel:999', variant: 'emergency' },
          { label: currentLang === 'bn' ? 'ইউনাইটেড ইমার্জেন্সি: +880 1914-001234' : 'Call United Hospital ER', href: `tel:${emergencyHospital.emergencyPhone}`, variant: 'primary' },
          { label: currentLang === 'bn' ? 'নিকটস্থ ইমার্জেন্সি ম্যাপ' : 'View Emergency Hospitals Map', href: '/map?filter=emergency', variant: 'secondary' }
        ]
      }
    };
  }

  // 2. Intelligent Symptom & Anatomical Discomfort Analysis
  // Find which anatomical location best matches the user's input
  let bestMatch: DiscomfortMapping | null = null;
  let highestMatchScore = 0;

  for (const mapping of DISCOMFORT_TAXONOMY) {
    let score = 0;
    for (const kw of mapping.keywords) {
      if (q.includes(kw.toLowerCase())) {
        score += kw.length > 5 ? 3 : 2;
      }
    }
    if (score > highestMatchScore) {
      highestMatchScore = score;
      bestMatch = mapping;
    }
  }

  if (bestMatch && highestMatchScore >= 2) {
    // Retrieve highest-reviewed verified doctor for this specific specialty
    const topDoctor = getTopReviewedDoctorForSpecialty(bestMatch.specialtyName);

    const introText = currentLang === 'bn'
      ? `🔍 **অস্বস্তির স্থান চিহ্নিত হয়েছে**: ${bestMatch.locationBn}\n\n` +
        `🩺 **প্রয়োজনীয় বিশেষজ্ঞ বিভাগ**: **${bestMatch.specialtyName}**\n\n` +
        `⭐ **সর্বোচ্চ রেটিংসহ শীর্ষ বিশেষজ্ঞ ডাক্তার**: **${topDoctor.name}**\n` +
        `• রেটিং: ${topDoctor.rating} ★ (${topDoctor.reviewCount.toLocaleString()} টি ভেরিফায়েড রিভিউ)\n` +
        `• পদবী ও ডিগ্রি: ${topDoctor.degrees}\n` +
        `• বর্তমান চেম্বার: ${topDoctor.hospital.name}\n` +
        `• পরবর্তী ফ্রি স্লট: ${topDoctor.nextAvailableSlot.date} (${topDoctor.nextAvailableSlot.time})\n\n` +
        `💡 **প্রাথমিক আরামদায়ক পরামর্শ**:\n` +
        bestMatch.selfCareBn.map(s => `• ${s}`).join('\n') + `\n\n` +
        `⚠️ **সতর্কতা**: ${bestMatch.redFlagsBn}`
      : `🔍 **Identified Discomfort Location**: **${bestMatch.locationEn}**\n\n` +
        `🩺 **Recommended Specialist Section**: **${bestMatch.specialtyName}**\n\n` +
        `⭐ **Highest-Reviewed Verified Specialist**: **${topDoctor.name}**\n` +
        `• Patient Rating: **${topDoctor.rating} ★** (${topDoctor.reviewCount.toLocaleString()} verified patient reviews)\n` +
        `• Qualifications: ${topDoctor.degrees}\n` +
        `• Hospital Chamber: ${topDoctor.hospital.name}\n` +
        `• Earliest Slot: ${topDoctor.nextAvailableSlot.date} (${topDoctor.nextAvailableSlot.time})\n\n` +
        `💡 **Immediate Comfort Steps**:\n` +
        bestMatch.selfCareEn.map(s => `• ${s}`).join('\n') + `\n\n` +
        `⚠️ **When to Seek Urgent Care**: ${bestMatch.redFlagsEn}`;

    return {
      id,
      sender: 'assistant',
      text: introText,
      timestamp,
      richContent: {
        type: 'doctorCard',
        doctor: topDoctor,
        actions: [
          {
            label: currentLang === 'bn' ? `${topDoctor.name}-এর স্লট বুক করুন` : `Book Slot with ${topDoctor.name}`,
            href: `/doctors/${topDoctor.slug}/book`,
            variant: 'primary'
          },
          {
            label: currentLang === 'bn' ? 'ডাক্তারের বিস্তারিত প্রোফাইল' : 'View Verified Profile',
            href: `/doctors/${topDoctor.slug}`,
            variant: 'secondary'
          },
          {
            label: currentLang === 'bn' ? `${bestMatch.specialtyName}-এর সব ডাক্তার` : `All ${bestMatch.specialtyName} Doctors`,
            href: `/specialties/${bestMatch.specialtySlug}`,
            variant: 'secondary'
          }
        ]
      }
    };
  }

  // 3. Direct Doctor Search by Name or General Term
  if (
    q.includes('doctor') ||
    q.includes('specialist') ||
    q.includes('ডাক্তার') ||
    q.includes('maruf') ||
    q.includes('saran') ||
    q.includes('sadia') ||
    q.includes('prome') ||
    q.includes('rahman') ||
    q.includes('tanvir') ||
    q.includes('mehedi')
  ) {
    let matchedDoc = DOCTORS[0]; // Dr. Maruf Allam Saran (2450 reviews, 5.0)
    if (q.includes('maruf') || q.includes('saran') || q.includes('cardio') || q.includes('heart')) {
      matchedDoc = DOCTORS.find(d => d.slug === 'dr-maruf-allam-saran') || DOCTORS[0];
    } else if (q.includes('sadia') || q.includes('prome') || q.includes('gastro') || q.includes('stomach') || q.includes('pet')) {
      matchedDoc = DOCTORS.find(d => d.slug === 'dr-sadia-islam-prome') || DOCTORS[1];
    } else if (q.includes('tanvir') || q.includes('ortho')) {
      matchedDoc = DOCTORS.find(d => d.slug === 'dr-tanvir-hasan') || DOCTORS[2];
    } else if (q.includes('mehedi') || q.includes('child') || q.includes('pediatric')) {
      matchedDoc = DOCTORS.find(d => d.slug === 'prof-dr-mehedi-hasan') || DOCTORS[5];
    }

    return {
      id,
      sender: 'assistant',
      text: currentLang === 'bn'
        ? `আপনার অনুসন্ধানের ভিত্তিতে শীর্ষ রেটপ্রাপ্ত বিশেষজ্ঞ ${matchedDoc.name} (${matchedDoc.specialty}) খুঁজে পাওয়া গেছে। রেটিং: ${matchedDoc.rating} ★ (${matchedDoc.reviewCount.toLocaleString()} রিভিউ)।`
        : `Based on your request, I found ${matchedDoc.name}, senior ${matchedDoc.specialty} at ${matchedDoc.hospital.name}. Rating: ${matchedDoc.rating} ★ (${matchedDoc.reviewCount.toLocaleString()} verified patient reviews).`,
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

  // 4. Diagnostic Test queries
  if (
    q.includes('test') ||
    q.includes('cbc') ||
    q.includes('blood') ||
    q.includes('hba1c') ||
    q.includes('mri') ||
    q.includes('ultrasound') ||
    q.includes('price') ||
    q.includes('cost') ||
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
        ? `${matchedTest.name}-এর হাসপাতালভিত্তিক নির্ভুল মূল্য তালিকা নিচে দেওয়া হলো:`
        : `Here is the transparent diagnostic pricing across Dhaka laboratories for ${matchedTest.name}:`,
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

  // 5. Hospital & Map queries
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
        : 'Here are the accredited hospitals in Dhaka with live bed counts, 24/7 emergency casualty, and GPS distance:',
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

  // 6. Default Fallback with Highest Reviewed Doctor
  const topOverallDoctor = DOCTORS[0]; // Dr. Farzana (1420 reviews, 4.9)
  return {
    id,
    sender: 'assistant',
    text: currentLang === 'bn'
      ? `আপনার জিজ্ঞাসার জন্য ধন্যবাদ। থিটাকিউর এআই আপনার উপসর্গের স্থান বুঝতে পারে এবং সে অনুযায়ী সর্বোচ্চ রেটিংপ্রাপ্ত বিশেষজ্ঞ সাজেস্ট করে।\n\nউদাহরণস্বরূপ বলুন: "বুকে ব্যথা", "হাঁটু ব্যথা", "পেট খারাপ", "বাচ্চার জ্বর", বা "চুলকানি ও র‍্যাশ"।`
      : `I am your ThetaCure Clinical AI Navigator. Tell me where you feel discomfort (e.g. "chest tightness", "severe knee pain", "burning stomach acid", "baby fever", or "skin itching"), and I will identify the body system and recommend the highest-reviewed verified specialist for your condition.`,
    timestamp,
    richContent: {
      type: 'doctorCard',
      doctor: topOverallDoctor,
      actions: [
        { label: currentLang === 'bn' ? 'এআই লক্ষণ নির্দেশিকা' : 'Check Symptoms with AI', href: '/ai-doctor-finder', variant: 'primary' },
        { label: currentLang === 'bn' ? 'সব বিশেষজ্ঞ তালিকা' : 'Browse All 15 Specialties', href: '/specialties', variant: 'secondary' },
        { label: currentLang === 'bn' ? 'নিকটস্থ হাসপাতাল ম্যাপ' : 'Nearby Hospitals Map', href: '/map', variant: 'secondary' }
      ]
    }
  };
}
