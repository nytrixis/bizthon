import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";

const SOSPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    language: '',
    name: '',
    age: '',
    gender: '',
    contactNumber: '',
    symptoms: '',
    problem: '',
  });
  const [location, setLocation] = useState(null);
  const [aiResponse, setAiResponse] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const languages = [
    'Assamese', 'Bengali', 'Bodo', 'Dogri', 'English', 'Gujarati', 'Hindi', 'Kannada',
    'Kashmiri', 'Konkani', 'Maithili', 'Malayalam', 'Manipuri', 'Marathi', 'Nepali',
    'Odia', 'Punjabi', 'Sanskrit', 'Santali', 'Sindhi', 'Tamil', 'Telugu', 'Urdu'
  ];

  const languageCodes = {
    Assamese: 'as-IN',
    Bengali: 'bn-IN',
    Bodo: 'brx-IN',
    Dogri: 'doi-IN',
    English: 'en-US',
    Gujarati: 'gu-IN',
    Hindi: 'hi-IN',
    Kannada: 'kn-IN',
    Kashmiri: 'ks-IN',
    Konkani: 'kok-IN',
    Maithili: 'mai-IN',
    Malayalam: 'ml-IN',
    Manipuri: 'mni-IN',
    Marathi: 'mr-IN',
    Nepali: 'ne-IN',
    Odia: 'or-IN',
    Punjabi: 'pa-IN',
    Sanskrit: 'sa-IN',
    Santali: 'sat-IN',
    Sindhi: 'sd-IN',
    Tamil: 'ta-IN',
    Telugu: 'te-IN',
    Urdu: 'ur-IN',
  };
  

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
        (error) => console.error('Error getting location:', error)
      );
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setFormData({ ...formData, language: selectedLanguage });
    i18n.changeLanguage(selectedLanguage.toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequestSent(true);
    speakMessage(t('Request Sent. Help is on the way.'), 1);

    const aiResponse = await getAIResponse(formData);
    setAiResponse(aiResponse);
    speakMessage(aiResponse, 1);
  };

  const speakMessage = (message, times) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = formData.language.toLowerCase();
    for (let i = 0; i < times; i++) {
      window.speechSynthesis.speak(utterance);
    }
  };

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const getAIResponse = async (data) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
    const prompt = `Given a patient with the following symptoms: ${data.symptoms} and problem: ${data.problem}, provide steps to follow while waiting for an ambulance in about 5-6 lines in ${data.language}. Don't mention calling the ambulance, and write in plain text, not bold or italics.`;
  
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
  
      // Map the language code
      const langCode = languageCodes[data.language] || 'en-US';  // Fallback to 'en-US' for unsupported languages
  
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      window.speechSynthesis.speak(utterance);
  
      return text;
    } catch (error) {
      console.error("Error generating AI response:", error);
      return "Unable to generate response. Please follow general first aid guidelines.";
    }
  };
  
  window.speechSynthesis.getVoices().forEach((voice) => {
    console.log(`${voice.name} (${voice.lang})`);
  });

  return (
    <motion.div 
      className="flex h-screen p-8 mt-20 mb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-1/2 pr-4">
        {requestSent && (
          <motion.div 
            className="bg-green-500 text-white p-4 mb-4 rounded"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('Request Sent. Help is on the way.')}
          </motion.div>
        )}
        <form onSubmit={handleSubmit} className="bg-gray-400 shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-red-500 text-sm font-bold mb-2" htmlFor="language">
              {t('Select Language')}
            </label>
            <select 
              name="language" 
              onChange={handleLanguageChange} 
              required 
              className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-500"
            >
              <option value="">{t('Select Language')}</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-red-500 text-sm font-bold mb-2" htmlFor="name">
              {t('Name')}
            </label>
            <input 
              type="text" 
              name="name" 
              onChange={handleInputChange} 
              required 
              className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-red-500 text-sm font-bold mb-2" htmlFor="age">
              {t('Age')}
            </label>
            <input 
              type="number" 
              name="age" 
              onChange={handleInputChange} 
              required 
              className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-red-500 text-sm font-bold mb-2" htmlFor="gender">
              {t('Select Gender')}
            </label>
            <select 
              name="gender" 
              onChange={handleInputChange} 
              required 
              className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-500"
            >
              <option value="">{t('Select Gender')}</option>
              <option value="male">{t('Male')}</option>
              <option value="female">{t('Female')}</option>
              <option value="other">{t('Other')}</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-red-500 text-sm font-bold mb-2" htmlFor="contactNumber">
              {t('Contact Number')}
            </label>
            <input 
              type="tel" 
              name="contactNumber" 
              onChange={handleInputChange} 
              required 
              className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-red-500 text-sm font-bold mb-2" htmlFor="symptoms">
              {t('Symptoms')}
            </label>
            <textarea 
              name="symptoms" 
              onChange={handleInputChange} 
              required 
              className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-red-500 text-sm font-bold mb-2" htmlFor="problem">
              {t('Problem')}
            </label>
            <input 
              type="text" 
              name="problem" 
              onChange={handleInputChange} 
              required 
              className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-500"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300"
          >
            {t('Submit Request')}
          </button>
        </form>
      </div>

      <div className="w-1/2 pl-4">
        <textarea 
          value={aiResponse} 
          readOnly 
          className="w-full h-full p-4 border rounded-md bg-gray-100"
          placeholder={t('Till the ambulance arrives, follow these steps:')}
        />
      </div>

      <div 
  id="google_translate_element" 
  style={{
    position: 'fixed', 
    bottom: '20px', 
    right: '20px',
    width: '200px',
    height: '40px',
    border: '2px solid #4a5568',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(74, 85, 104, 0.3)',
    overflow: 'hidden',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
></div>



    </motion.div>
  );
};

export default SOSPage;
