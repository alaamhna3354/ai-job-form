<template>
  <v-container>
    <v-alert
      v-if="showAlert"
      :type="alertType"
      dismissible
      transition="scale-transition"
      class="my-4 alert-copy"
    >
      {{ alertMessage }}
    </v-alert>
  <div style="display: flex;justify-content: center;">
    <v-btn @click="switchLanguage" color="secondary">
    {{ $t('switchLang') }}
  </v-btn>
  </div>
  <h1 class=" text-center my-4">{{ $t('pageTitle') }}</h1>
  <br>
    <v-form @submit.prevent="generateAd" ref="form">
      <v-row>
        <v-col cols="12" md="4" v-for="field in fields" :key="field.name">
          <v-text-field 
          dense
          outlined
            v-if="field.type === 'text'" 
            :label="field.label" 
            v-model="formObj[field.name]"
            :rules="field.required ? [requiredRule] : []"
            :required="field.required" />
          
          <v-select 
            v-if="field.type === 'select'" 
            :items="field.options" 
            :label="field.label" 
            v-model="formObj[field.name]"
            :rules="field.required ? [requiredRule] : []"
            :required="field.required" />
          
          <v-textarea 
         
            v-if="field.type === 'textarea'"
            :label="field.label"
            v-model="formObj[field.name]"
            :rules="field.required ? [requiredRule] : []"
            :required="field.required"
          />
        </v-col>
      </v-row>
      <br>
      <div style="display: flex;justify-content: center;">
        <v-btn type="submit" color="primary">{{$t('submit')}}</v-btn>
      </div>
    </v-form>
      <br>
      <div v-if="jobAd" style="display: flex;justify-content: center;">
        <v-btn @click="copyToClipboard" color="success">{{ $t('copy') }}</v-btn>
      </div>
 
  </v-container>
</template>
<script setup>
// ************************ Lang Handel ************************
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const { locale } = useI18n()

function switchLanguage() {
  locale.value = locale.value === 'ar' ? 'en' : 'ar'
}
import { ref } from 'vue'
// ************************ Form Handel ************************
const formObj = ref({
  title: '',
  type: '',
  sector: '',
  tasks: '',
  qualifications: '',
  experience: '',
  location: '',
  benefits: '',
  company: ''
})

const fields = computed(() => [
  { name: 'title', label: t('jobTitle'), required: true, type: 'text' },
  { name: 'type', label: t('jobType'), type: 'select', options: [t('fullTime'), t('partTime'), t('remote')], required: true },
  { name: 'sector', label: t('sector'), type: 'select', options: [t('tech'), t('education'), t('healthcare')], required: true },
  { name: 'company', label: t('companyNameOptional'), required: false, type: 'text' },
  { name: 'experience', label: t('experience'), required: true, type: 'text' },
  { name: 'location', label: t('location'), required: true, type: 'text' },
  { name: 'tasks', label: t('tasks'), required: true, type: 'textarea' },
  { name: 'qualifications', label: t('qualifications'), required: true, type: 'textarea' },
  { name: 'benefits', label: t('benefitsOptional'), required: false, type: 'textarea' },
])

const jobAd = ref('')
const formRef = ref(null)
const apiKey = import.meta.env.VITE_OPENAI_API_KEY
const requiredRule = (value) => !!value || t('required')
// ************************ Fetch OpenAI API ************************
async function generateAd() {
  const isValid = await formRef.value?.validate()
  if (!isValid) return

  
  const prompt =  locale.value === 'ar'
    ? `
اكتب إعلانًا وظيفيًا باللغة العربية للمسمى "${formObj.value.title}"، في قطاع "${formObj.value.sector}"، بنوع عمل "${formObj.value.type}".
المهام: ${formObj.value.tasks}.
المؤهلات: ${formObj.value.qualifications}.
الخبرة: ${formObj.value.experience}.
مكان العمل: ${formObj.value.location}.
${formObj.value.benefits ? 'المزايا: ' + formObj.value.benefits + '.' : ''}
${formObj.value.company ? 'اسم الشركة: ' + formObj.value.company + '.' : ''}
استخدم نغمة احترافية وجذابة.
` : `
Write a job posting in English for the position "${formObj.value.title}", in the sector "${formObj.value.sector}", with the type of work "${formObj.value.type}".
Tasks: ${formObj.value.tasks}.
Qualifications: ${formObj.value.qualifications}.
Experience: ${formObj.value.experience}.
Location: ${formObj.value.location}.
${formObj.value.benefits ? 'Benefits: ' + formObj.value.benefits + '.' : ''}
${formObj.value.company ? 'Company name: ' + formObj.value.company + '.' : ''}
Use a professional and engaging tone.
`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await response.json()
  jobAd.value = data.choices?.[0]?.message?.content || t('generationError')
}

const showAlert = ref(false)
const alertType = ref('success') // أو 'error'
const alertMessage = ref('')

function copyToClipboard() {
  navigator.clipboard.writeText(jobAd.value).then(() => {
    alertType.value = 'success'
    alertMessage.value = t('copySuccess')
    showAlert.value = true
    setTimeout(() => (showAlert.value = false), 3000)
  }).catch(err => {
    alertType.value = 'error'
    alertMessage.value = t('copyFail') + err
    showAlert.value = true
    setTimeout(() => (showAlert.value = false), 5000)
  })
}

</script>
