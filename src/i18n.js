// src/i18n.js
import { createI18n } from 'vue-i18n'

const messages = {
  ar: {
    pageTitle: 'مولّد الإعلانات الوظيفية بالذكاء الاصطناعي',
    switchLang: 'English',
    jobTitle: 'المسمى الوظيفي',
    jobType: 'نوع العمل',
    sector: 'القطاع',
    companyNameOptional: 'اسم الشركة (اختياري)',
    experience: 'الخبرة المطلوبة',
    location: 'مكان العمل',
    tasks: 'المهام والمسؤوليات',
    qualifications: 'المؤهلات المطلوبة',
    benefitsOptional: 'المزايا (اختياري)',
    submit: 'توليد الإعلان',
    copy: 'نسخ النص',
    required: 'هذا الحقل مطلوب',
    fullTime: 'دوام كامل',
    partTime: 'دوام جزئي',
    remote: 'عن بعد',
    tech: 'تكنولوجيا',
    education: 'تعليم',
    healthcare: 'رعاية صحية',
    generationError: 'حدث خطأ أثناء التوليد.',
    copySuccess: 'تم نسخ النص إلى الحافظة!',
    copyFail: 'فشل النسخ: '
  },
  en: {
    pageTitle: 'AI Job Ad Generator',
    switchLang: 'العربية',
    jobTitle: 'Job Title',
    jobType: 'Job Type',
    sector: 'Sector',
    companyNameOptional: 'Company Name (Optional)',
    experience: 'Experience Required',
    location: 'Location',
    tasks: 'Tasks & Responsibilities',
    qualifications: 'Required Qualifications',
    benefitsOptional: 'Benefits (Optional)',
    submit: 'Generate Ad',
    copy: 'Copy Text',
    required: 'This field is required',
    fullTime: 'Full Time',
    partTime: 'Part Time',
    remote: 'Remote',
    tech: 'Technology',
    education: 'Education',
    healthcare: 'Healthcare',
    generationError: 'An error occurred during generation.',
    copySuccess: 'Text copied to clipboard!',
    copyFail: 'Copy failed: '
  }
}

const i18n = createI18n({
  locale: 'ar',
  fallbackLocale: 'en',
  messages,
})

export default i18n
