import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Languages, CheckCircle, Globe, MessageSquare, Translation, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const LanguageSupport = () => {
  // Available languages with their codes and display names
  const languages = [
    { code: 'en', name: 'English', displayName: 'English' },
    { code: 'hi', name: 'Hindi', displayName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', displayName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', displayName: 'తెలుగు' },
    { code: 'bn', name: 'Bengali', displayName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', displayName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', displayName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', displayName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', displayName: 'മലയാളം' },
    { code: 'pa', name: 'Punjabi', displayName: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', displayName: 'ଓଡ଼ିଆ' }
  ];

  // UI text translations for each supported language
  const translations = {
    en: {
      backToFeatures: "Back to All Features",
      heroTitle: "Multi-Language Support",
      heroDescription: "Our platform supports diverse user groups across India with interfaces and tools available in multiple regional languages, making education more accessible for all.",
      feature1: "Indian languages",
      feature2: "Language detection",
      feature3: "Translation tools",
      feature4: "Localized interfaces",
      tryItNow: "Try It Now",
      howItWorks: "How It Works",
      howItWorksDescription: "Our platform detects the user's preferred language and automatically displays the interface in that language. For content such as assignments and feedback, we provide translation tools to convert between languages.",
      languageSupportDescription: "We currently support Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and Odia, with more languages being added regularly to ensure broad accessibility across India.",
      keyBenefits: "Key Benefits",
      benefit1: "Make education technology accessible to non-English speakers",
      benefit2: "Allow students to submit work in their most comfortable language",
      benefit3: "Provide equal educational opportunities across language barriers",
      benefit4: "Support India's diverse linguistic landscape in education",
      ctaTitle: "Ready to make education more accessible?",
      ctaDescription: "Get started with our free trial and experience the difference.",
      startFreeTrial: "Start Your Free Trial",
      languageSupported: "Multiple Indian languages supported",
      selectLanguage: "Select Language",
      studentAssignment: "Student Assignment Upload"
    },
    hi: {
      backToFeatures: "सभी सुविधाओं पर वापस जाएं",
      heroTitle: "बहु-भाषा समर्थन",
      heroDescription: "हमारा प्लेटफॉर्म भारत भर में विविध उपयोगकर्ता समूहों का समर्थन करता है, जिसमें कई क्षेत्रीय भाषाओं में इंटरफेस और टूल उपलब्ध हैं, जिससे शिक्षा सभी के लिए अधिक सुलभ हो जाती है।",
      feature1: "भारतीय भाषाएं",
      feature2: "भाषा पहचान",
      feature3: "अनुवाद उपकरण",
      feature4: "स्थानीयकृत इंटरफेस",
      tryItNow: "अभी आज़माएं",
      howItWorks: "यह कैसे काम करता है",
      howItWorksDescription: "हमारा प्लेटफॉर्म उपयोगकर्ता की पसंदीदा भाषा का पता लगाता है और इंटरफ़ेस को स्वचालित रूप से उस भाषा में प्रदर्शित करता है। असाइनमेंट और फीडबैक जैसी सामग्री के लिए, हम भाषाओं के बीच रूपांतरण के लिए अनुवाद उपकरण प्रदान करते हैं।",
      languageSupportDescription: "हम वर्तमान में हिंदी, तमिल, तेलुगु, बंगाली, मराठी, गुजराती, कन्नड़, मलयालम, पंजाबी और उड़िया का समर्थन करते हैं, और भारत भर में व्यापक पहुंच सुनिश्चित करने के लिए नियमित रूप से अधिक भाषाएँ जोड़ी जा रही हैं।",
      keyBenefits: "प्रमुख लाभ",
      benefit1: "गैर-अंग्रेजी भाषी लोगों के लिए शिक्षा प्रौद्योगिकी को सुलभ बनाएं",
      benefit2: "छात्रों को अपनी सबसे आरामदायक भाषा में काम जमा करने की अनुमति दें",
      benefit3: "भाषा बाधाओं के पार समान शैक्षिक अवसर प्रदान करें",
      benefit4: "शिक्षा में भारत के विविध भाषाई परिदृश्य का समर्थन करें",
      ctaTitle: "शिक्षा को अधिक सुलभ बनाने के लिए तैयार हैं?",
      ctaDescription: "हमारे नि:शुल्क परीक्षण के साथ शुरुआत करें और अंतर का अनुभव करें।",
      startFreeTrial: "अपना नि:शुल्क परीक्षण शुरू करें",
      languageSupported: "कई भारतीय भाषाओं का समर्थन किया गया",
      selectLanguage: "भाषा चुनें",
      studentAssignment: "छात्र असाइनमेंट अपलोड"
    },
    ta: {
      backToFeatures: "அனைத்து அம்சங்களுக்கும் திரும்பிச் செல்லுங்கள்",
      heroTitle: "பல மொழி ஆதரவு",
      heroDescription: "எங்கள் தளம் பல்வேறு பிராந்திய மொழிகளில் கிடைக்கும் இடைமுகங்கள் மற்றும் கருவிகளுடன் இந்தியா முழுவதும் உள்ள பல்வேறு பயனர் குழுக்களை ஆதரிக்கிறது, இதனால் கல்வி அனைவருக்கும் அணுகக்கூடியதாக மாறுகிறது.",
      feature1: "இந்திய மொழிகள்",
      feature2: "மொழி கண்டறிதல்",
      feature3: "மொழிபெயர்ப்பு கருவிகள்",
      feature4: "உள்ளூர்மயமாக்கப்பட்ட இடைமுகங்கள்",
      tryItNow: "இப்போது முயற்சி செய்யுங்கள்",
      howItWorks: "இது எப்படி செயல்படுகிறது",
      howItWorksDescription: "எங்கள் தளம் பயனரின் விருப்பமான மொழியைக் கண்டறிந்து, இடைமுகத்தை அந்த மொழியில் தானாகவே காட்டுகிறது. பணிகள் மற்றும் கருத்துகள் போன்ற உள்ளடக்கத்திற்கு, மொழிகளுக்கு இடையே மாற்றுவதற்கான மொழிபெயர்ப்புக் கருவிகளை வழங்குகிறோம்.",
      languageSupportDescription: "தற்போது ஹிந்தி, தமிழ், தெலுங்கு, வங்காளம், மராத்தி, குஜராத்தி, கன்னடம், மலையாளம், பஞ்சாபி மற்றும் ஒடியா ஆகியவற்றை ஆதரிக்கிறோம், மேலும் இந்தியா முழுவதும் பரந்த அணுகலை உறுதிசெய்ய வழக்கமாக மேலும் பல மொழிகள் சேர்க்கப்படுகின்றன.",
      keyBenefits: "முக்கிய நன்மைகள்",
      benefit1: "ஆங்கிலம் அல்லாத பேசுபவர்களுக்கு கல்வி தொழில்நுட்பத்தை அணுகக்கூடியதாக்குங்கள்",
      benefit2: "மாணவர்கள் தங்களுக்கு மிகவும் வசதியான மொழியில் வேலையைச் சமர்ப்பிக்க அனுமதிக்கவும்",
      benefit3: "மொழி தடைகளைத் தாண்டி சமமான கல்வி வாய்ப்புகளை வழங்குங்கள்",
      benefit4: "கல்வியில் இந்தியாவின் பலதரப்பட்ட மொழி நிலப்பரப்பை ஆதரிக்கவும்",
      ctaTitle: "கல்வியை மேலும் அணுகக்கூடியதாக்க தயாரா?",
      ctaDescription: "எங்கள் இலவச சோதனையுடன் தொடங்கி வித்தியாசத்தை அனுபவிக்கவும்.",
      startFreeTrial: "உங்கள் இலவச சோதனையைத் தொடங்குங்கள்",
      languageSupported: "பல இந்திய மொழிகள் ஆதரிக்கப்படுகின்றன",
      selectLanguage: "மொழியை தேர்ந்தெடுங்கள்",
      studentAssignment: "மாணவர் படைப்பு பதிவேற்றம்"
    },
    te: {
      backToFeatures: "అన్ని ఫీచర్లకు తిరిగి వెళ్ళండి",
      heroTitle: "బహుళ-భాష మద్దతు",
      heroDescription: "మా ప్లాట్‌ఫారమ్ బహుళ ప్రాంతీయ భాషలలో అందుబాటులో ఉన్న ఇంటర్‌ఫేస్‌లు మరియు టూల్స్‌తో భారతదేశంలోని వివిధ వినియోగదారుల సమూహాలకు మద్దతు ఇస్తుంది, దీని వల్ల విద్య అందరికీ మరింత అందుబాటులో ఉంటుంది.",
      feature1: "భారతీయ భాషలు",
      feature2: "భాష గుర్తింపు",
      feature3: "అనువాద సాధనాలు",
      feature4: "స్థానికీకరించిన ఇంటర్‌ఫేస్‌లు",
      tryItNow: "ఇప్పుడే ప్రయత్నించండి",
      howItWorks: "ఇది ఎలా పని చేస్తుంది",
      howItWorksDescription: "మా ప్లాట్‌ఫారమ్ వినియోగదారు యొక్క ప్రాధాన్య భాషను గుర్తించి, ఇంటర్‌ఫేస్‌ను ఆ భాషలో స్వయంచాలకంగా ప్రదర్శిస్తుంది. అసైన్‌మెంట్‌లు మరియు ఫీడ్‌బ్యాక్ వంటి కంటెంట్ కోసం, మేము భాషల మధ్య మార్పిడి చేయడానికి అనువాద సాధనాలను అందిస్తాము.",
      languageSupportDescription: "మేము ప్రస్తుతం హిందీ, తమిళం, తెలుగు, బెంగాలీ, మరాఠీ, గుజరాతీ, కన్నడ, మలయాళం, పంజాబీ మరియు ఒడియా భాషలకు మద్దతు ఇస్తున్నాము, భారతదేశం అంతటా విస్తృత ప్రాప్యతను నిర్ధారించడానికి క్రమం తప్పకుండా మరిన్ని భాషలు జోడించబడుతున్నాయి.",
      keyBenefits: "ప్రధాన ప్రయోజనాలు",
      benefit1: "ఆంగ్లేతర మాట్లాడేవారికి విద్యా సాంకేతికతను అందుబాటులో ఉంచండి",
      benefit2: "విద్యార్థులు తమకు అత్యంత సౌకర్యవంతమైన భాషలో పని సమర్పించడానికి అనుమతించండి",
      benefit3: "భాషా అడ్డంకుల మధ్య సమాన విద్యా అవకాశాలను అందించండి",
      benefit4: "విద్యలో భారతదేశం యొక్క వైవిధ్యమైన భాషా భూభాగాన్ని సమర్థించండి",
      ctaTitle: "విద్యను మరింత అందుబాటులో ఉంచడానికి సిద్ధంగా ఉన్నారా?",
      ctaDescription: "మా ఉచిత ట్రయల్‌తో ప్రారంభించి తేడాను అనుభవించండి.",
      startFreeTrial: "మీ ఉచిత ట్రయల్‌ను ప్రారంభించండి",
      languageSupported: "బహుళ భారతీయ భాషలకు మద్దతు ఉంది",
      selectLanguage: "భాషను ఎంచుకోండి",
      studentAssignment: "విద్యార్థి అసైన్‌మెంట్ అప్‌లోడ్"
    },
    bn: {
      backToFeatures: "সমস্ত বৈশিষ্ট্যে ফিরে যান",
      heroTitle: "বহু-ভাষা সমর্থন",
      heroDescription: "আমাদের প্ল্যাটফর্ম একাধিক আঞ্চলিক ভাষায় উপলব্ধ ইন্টারফেস এবং টুল সহ ভারত জুড়ে বিভিন্ন ব্যবহারকারী গোষ্ঠীকে সমর্থন করে, যা শিক্ষাকে সবার জন্য আরও অ্যাক্সেসযোগ্য করে তোলে।",
      feature1: "ভারতীয় ভাষা",
      feature2: "ভাষা সনাক্তকরণ",
      feature3: "অনুবাদ সরঞ্জাম",
      feature4: "স্থানীয়করণ ইন্টারফেস",
      tryItNow: "এখনই চেষ্টা করুন",
      howItWorks: "এটা কিভাবে কাজ করে",
      howItWorksDescription: "আমাদের প্ল্যাটফর্ম ব্যবহারকারীর পছন্দসই ভাষা সনাক্ত করে এবং স্বয়ংক্রিয়ভাবে সেই ভাষায় ইন্টারফেস প্রদর্শন করে। অ্যাসাইনমেন্ট এবং প্রতিক্রিয়ার মতো বিষয়বস্তুর জন্য, আমরা ভাষাগুলির মধ্যে রূপান্তর করতে অনুবাদ সরঞ্জাম সরবরাহ করি।",
      languageSupportDescription: "আমরা বর্তমানে হিন্দি, তামিল, তেলুগু, বাংলা, মারাঠি, গুজরাটি, কন্নড়, মালায়ালাম, পাঞ্জাবি এবং ওড়িয়া সমর্থন করি, ভারত জুড়ে ব্যাপক অ্যাক্সেসযোগ্যতা নিশ্চিত করতে নিয়মিতভাবে আরও ভাষা যোগ করা হচ্ছে।",
      keyBenefits: "মূল সুবিধা",
      benefit1: "নন-ইংরেজি স্পিকারদের জন্য শিক্ষা প্রযুক্তি অ্যাক্সেসযোগ্য করুন",
      benefit2: "শিক্ষার্থীদের তাদের সবচেয়ে আরামদায়ক ভাষায় কাজ জমা দিতে দিন",
      benefit3: "ভাষা বাধার মধ্যে সমান শিক্ষাগত সুযোগ প্রদান করুন",
      benefit4: "শিক্ষায় ভারতের বৈচিত্র্যময় ভাষাতাত্ত্বিক ল্যান্ডস্কেপ সমর্থন করুন",
      ctaTitle: "শিক্ষাকে আরও অ্যাক্সেসযোগ্য করতে প্রস্তুত?",
      ctaDescription: "আমাদের বিনামূল্যে ট্রায়ালের সাথে শুরু করুন এবং পার্থক্য অনুভব করুন।",
      startFreeTrial: "আপনার বিনামূল্যে ট্রায়াল শুরু করুন",
      languageSupported: "একাধিক ভারতীয় ভাষা সমর্থিত",
      selectLanguage: "ভাষা নির্বাচন করুন",
      studentAssignment: "ছাত্র অ্যাসাইনমেন্ট আপলোড"
    }
  };

  // Default language state
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentText, setCurrentText] = useState(translations.en);

  // Update text when language changes
  useEffect(() => {
    // Use the translations for the selected language, fallback to English if not available
    setCurrentText(translations[currentLanguage] || translations.en);
  }, [currentLanguage]);

  // Language selection handler
  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    // In a real app, you would save this preference to localStorage or user profile
    localStorage.setItem('preferredLanguage', langCode);
  };

  useEffect(() => {
    // Check for saved language preference on component mount
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Detect browser language (simplified version)
      const browserLang = navigator.language.split('-')[0];
      if (translations[browserLang]) {
        setCurrentLanguage(browserLang);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-dark-100">
      <Navbar />
      
      {/* Language Selector - Added to the top right corner */}
      <div className="fixed top-20 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-dark-100 border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10">
              <Globe className="h-4 w-4 mr-2" />
              {currentText.selectLanguage}: {languages.find(lang => lang.code === currentLanguage)?.displayName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-dark-200 border-yellow-500/30">
            {languages.map((lang) => (
              <DropdownMenuItem 
                key={lang.code}
                className={`flex items-center ${currentLanguage === lang.code ? 'bg-yellow-500/20 text-yellow-400' : 'text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400'}`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                {currentLanguage === lang.code && <CheckCircle className="h-4 w-4 mr-2" />}
                <span className="ml-2">{lang.displayName}</span>
                <span className="ml-2 text-gray-400">({lang.name})</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-4 mb-16">
          <Link to="/features" className="inline-flex items-center text-yellow-400 hover:text-yellow-500 mb-8">
            <ArrowLeft className="mr-2 h-5 w-5" />
            {currentText.backToFeatures}
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <div className="h-24 w-24 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-yellow-400 mb-6">
                <Languages className="h-12 w-12" />
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-gradient">{currentText.heroTitle}</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                {currentText.heroDescription}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>{currentText.feature1}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>{currentText.feature2}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>{currentText.feature3}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <span>{currentText.feature4}</span>
                </div>
              </div>
              
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                <Link to="/register">{currentText.tryItNow}</Link>
              </Button>
            </div>
            
            <div className="w-full md:w-1/2">
              <Card className="glass-morphism hover:yellow-glow p-8 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-yellow-500/5 to-transparent"></div>
                <div className="flex flex-col items-center space-y-8">
                  <Globe className="h-16 w-16 text-yellow-400" />
                  <div className="w-full max-w-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border border-yellow-500/30 rounded-lg p-4 text-center">
                        <p className="text-yellow-400 text-xs mb-2">हिन्दी</p>
                        <p className="text-gray-300 text-sm">{translations.hi.studentAssignment}</p>
                      </div>
                      <div className="border border-yellow-500/30 rounded-lg p-4 text-center">
                        <p className="text-yellow-400 text-xs mb-2">தமிழ்</p>
                        <p className="text-gray-300 text-sm">{translations.ta.studentAssignment}</p>
                      </div>
                      <div className="border border-yellow-500/30 rounded-lg p-4 text-center">
                        <p className="text-yellow-400 text-xs mb-2">বাংলা</p>
                        <p className="text-gray-300 text-sm">{translations.bn.studentAssignment}</p>
                      </div>
                      <div className="border border-yellow-500/30 rounded-lg p-4 text-center">
                        <p className="text-yellow-400 text-xs mb-2">తెలుగు</p>
                        <p className="text-gray-300 text-sm">{translations.te.studentAssignment}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{currentText.languageSupported}</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Details Section */}
        <div className="container mx-auto px-4 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">{currentText.howItWorks}</h2>
              <p className="text-gray-300 mb-4">
                {currentText.howItWorksDescription}
              </p>
              <p className="text-gray-300">
                {currentText.languageSupportDescription}
              </p>
            </Card>
            
            <Card className="glass-morphism p-8">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">{currentText.keyBenefits}</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{currentText.benefit1}</span>
                </li>
                <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{currentText.benefit2}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{currentText.benefit3}</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{currentText.benefit4}</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Language Settings Panel */}
        <div className="container mx-auto px-4 mb-16">
          <Card className="glass-morphism p-8">
            <div className="flex items-center mb-6">
              <Settings className="h-6 w-6 text-yellow-400 mr-3" />
              <h2 className="text-2xl font-bold text-yellow-400">{currentText.selectLanguage}</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {languages.map((lang) => (
                <div 
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`border rounded-lg p-4 cursor-pointer transition-all 
                    ${currentLanguage === lang.code 
                      ? 'border-yellow-500 bg-yellow-500/20 text-yellow-400' 
                      : 'border-yellow-500/30 hover:border-yellow-500/60 hover:bg-yellow-500/10'}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{lang.displayName}</p>
                      <p className="text-sm text-gray-400">{lang.name}</p>
                    </div>
                    {currentLanguage === lang.code && (
                      <CheckCircle className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4">
          <Card className="glass-morphism yellow-glow p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{currentText.ctaTitle}</h2>
            <p className="text-gray-300 mb-6">{currentText.ctaDescription}</p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-dark-100">
                <Link to="/register">{currentText.startFreeTrial}</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LanguageSupport;
