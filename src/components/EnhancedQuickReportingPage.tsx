import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, Sparkles, CheckCircle, AlertTriangle, FileText, ArrowRight, Bot, User as UserIcon } from 'lucide-react';
import { Report } from '../App';

interface EnhancedQuickReportingPageProps {
  onNavigate: (page: string) => void;
  onReportSubmit: (report: Report) => void;
  userName: string;
  userEmail: string;
  onOpenChat: () => void;
}

export function EnhancedQuickReportingPage({ 
  onNavigate, 
  onReportSubmit, 
  userName, 
  userEmail,
  onOpenChat 
}: EnhancedQuickReportingPageProps) {
  const [step, setStep] = useState<'choice' | 'form' | 'ai' | 'success'>('choice');
  const [formData, setFormData] = useState({
    drug: '',
    symptoms: '',
    severity: '' as 'Mild' | 'Moderate' | 'Severe' | 'Critical' | '',
  });
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAIAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const severity = formData.severity || 'Moderate';
      let suggestion = '';
      
      if (severity === 'Critical') {
        suggestion = 'IMMEDIATE ATTENTION REQUIRED. Symptoms indicate potential serious adverse reaction. Emergency medical evaluation recommended.';
      } else if (severity === 'Severe') {
        suggestion = 'High priority case. Recommend urgent medical consultation and close monitoring. Possible drug-related toxicity.';
      } else if (severity === 'Moderate') {
        suggestion = 'Monitor closely. Symptoms are manageable but should be reported to healthcare provider. Consider supportive care measures.';
      } else {
        suggestion = 'Symptoms are typical mild reactions. Continue monitoring and report any worsening to healthcare provider.';
      }
      
      setAiAnalysis(suggestion);
      setIsAnalyzing(false);
    }, 2000);
  };

  const calculatePriority = (severity: string): number => {
    switch (severity) {
      case 'Critical': return 1;
      case 'Severe': return 2;
      case 'Moderate': return 3;
      case 'Mild': return 5;
      default: return 4;
    }
  };

  const calculateUrgency = (severity: string): 'Low' | 'Medium' | 'High' | 'Critical' => {
    switch (severity) {
      case 'Critical': return 'Critical';
      case 'Severe': return 'High';
      case 'Moderate': return 'Medium';
      case 'Mild': return 'Low';
      default: return 'Medium';
    }
  };

  const handleSubmit = () => {
    if (!formData.drug || !formData.symptoms || !formData.severity) {
      alert('Please fill all fields');
      return;
    }

    const newReport: Report = {
      id: Date.now(),
      patientName: userName,
      patientEmail: userEmail,
      drug: formData.drug,
      severity: formData.severity as any,
      symptoms: formData.symptoms,
      dateReported: new Date().toISOString().split('T')[0],
      status: formData.severity === 'Critical' || formData.severity === 'Severe' ? 'Urgent' : 'Under Review',
      aiAnalyzed: aiAnalysis ? true : false,
      aiSuggestion: aiAnalysis || undefined,
      priority: calculatePriority(formData.severity),
      urgency: calculateUrgency(formData.severity)
    };

    onReportSubmit(newReport);
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {/* STEP 1: CHOICE */}
          {step === 'choice' && (
            <motion.div
              key="choice"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-24 h-24 bg-gradient-to-br from-blue-600 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
                >
                  <FileText className="w-12 h-12 text-white" />
                </motion.div>
                <h1 className="text-5xl font-bold text-slate-800 mb-4">Report Side Effects</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Choose how you'd like to report your medication side effects
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* QUICK FORM */}
                <motion.button
                  onClick={() => setStep('form')}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white border-2 border-blue-300 rounded-3xl p-8 text-left hover:border-blue-500 hover:shadow-2xl transition-all"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">Quick Form</h3>
                  <p className="text-slate-600 mb-6">
                    Fill out a simple form with medication details and symptoms. Fast and straightforward.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.button>

                {/* AI CHAT ASSISTANCE */}
                <motion.button
                  onClick={() => {
                    onOpenChat();
                    // Could set step to 'ai' if you want to track this
                  }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-8 text-left hover:shadow-2xl transition-all text-white"
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                    <Bot className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Talk to AI Assistant</h3>
                  <p className="text-teal-50 mb-6">
                    Chat with our AI to describe your symptoms naturally. It will help create a detailed report for you.
                  </p>
                  <div className="flex items-center gap-2 text-white font-semibold">
                    <Sparkles className="w-5 h-5" />
                    <span>Start Conversation</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                  <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-sm text-white">
                    💡 Recommended: AI helps analyze severity and provides clinical insights
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: FORM */}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-slate-200">
                <div className="bg-gradient-to-r from-blue-600 to-teal-600 p-8 text-center">
                  <FileText className="w-16 h-16 text-white mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-2">Report Details</h2>
                  <p className="text-blue-100">Fill in the information below</p>
                </div>

                <div className="p-8 space-y-6">
                  {/* Drug Name */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-2">
                      Medication/Drug Name *
                    </label>
                    <input
                      type="text"
                      value={formData.drug}
                      onChange={(e) => setFormData({ ...formData, drug: e.target.value })}
                      placeholder="e.g., Doxorubicin, Paclitaxel, Cisplatin"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Symptoms */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-2">
                      Symptoms/Side Effects *
                    </label>
                    <textarea
                      value={formData.symptoms}
                      onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                      placeholder="Describe the side effects you're experiencing... (e.g., severe nausea, fatigue, hair loss, chest pain, difficulty breathing)"
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Severity */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-3">
                      How severe are the symptoms? *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { value: 'Mild', color: 'green', desc: 'Manageable' },
                        { value: 'Moderate', color: 'yellow', desc: 'Concerning' },
                        { value: 'Severe', color: 'orange', desc: 'Serious' },
                        { value: 'Critical', color: 'red', desc: 'Emergency' }
                      ].map((severity) => (
                        <button
                          key={severity.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, severity: severity.value as any })}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.severity === severity.value
                              ? `border-${severity.color}-500 bg-${severity.color}-50`
                              : 'border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          <p className={`font-bold text-sm ${
                            formData.severity === severity.value ? `text-${severity.color}-700` : 'text-slate-700'
                          }`}>
                            {severity.value}
                          </p>
                          <p className="text-xs text-slate-500">{severity.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* AI Analysis Button */}
                  {formData.drug && formData.symptoms && formData.severity && !aiAnalysis && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleAIAnalysis}
                      disabled={isAnalyzing}
                      className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Analyzing with AI...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Get AI Analysis (Recommended)</span>
                        </>
                      )}
                    </motion.button>
                  )}

                  {/* AI Analysis Result */}
                  {aiAnalysis && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-teal-50 border-2 border-teal-300 rounded-xl p-6"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-6 h-6 text-teal-600" />
                        <h4 className="font-bold text-teal-700 text-lg">AI Clinical Analysis</h4>
                      </div>
                      <p className="text-teal-800 leading-relaxed">{aiAnalysis}</p>
                    </motion.div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setStep('choice')}
                      className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      <span>Submit Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle className="w-16 h-16 text-green-600" />
              </motion.div>

              <h2 className="text-4xl font-bold text-slate-800 mb-4">Report Submitted Successfully!</h2>
              <p className="text-xl text-slate-600 mb-8">
                Your report has been received and will be reviewed by our clinical team.
              </p>

              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-green-200">
                <h3 className="font-bold text-lg text-slate-800 mb-4">What happens next?</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Clinical Review</p>
                      <p className="text-sm text-slate-600">A clinician will review your report within 24-48 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-teal-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Priority Assessment</p>
                      <p className="text-sm text-slate-600">Urgent cases are flagged for immediate attention</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Follow-up</p>
                      <p className="text-sm text-slate-600">You'll receive updates via email if action is needed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setStep('choice');
                    setFormData({ drug: '', symptoms: '', severity: '' });
                    setAiAnalysis('');
                  }}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
                >
                  Submit Another Report
                </button>
                <button
                  onClick={() => onNavigate('PatientDashboard')}
                  className="flex-1 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all"
                >
                  View My Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
