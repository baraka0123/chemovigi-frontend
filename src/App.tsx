import React, { useState } from 'react';
import { CompleteDemoLanding } from './components/CompleteDemoLanding';
import { NewLandingPage } from './components/NewLandingPage';
import { ModernLandingPage } from './components/ModernLandingPage';
import { SimplifiedLandingPage } from './components/SimplifiedLandingPage';
import { EnhancedLoginPage } from './components/EnhancedLoginPage';
import { EnhancedRegisterPage } from './components/EnhancedRegisterPage';
import { PatientDashboard } from './components/PatientDashboard';
import { ClinicianDashboard } from './components/ClinicianDashboard';
import { AppNavbar } from './components/AppNavbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { AIChatWidget } from './components/AIChatWidget';
import { FullScreenAIChat } from './components/FullScreenAIChat';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { OurTeamPage } from './components/OurTeamPage';
import { QuickReportingPage } from './components/QuickReportingPage';
import { EnhancedQuickReportingPage } from './components/EnhancedQuickReportingPage';
import { AISeverityPage } from './components/AISeverityPage';
import { SecureAccountsPage } from './components/SecureAccountsPage';
import { AIFeaturesPage } from './components/AIFeaturesPage';
import { AIHealthcareAutomationPage } from './components/AIHealthcareAutomationPage';
import { PharmaceuticalsOncologyPage } from './components/PharmaceuticalsOncologyPage';
import { DrugStandardizationPage } from './components/DrugStandardizationPage';
import { ResearchKnowledgePage } from './components/ResearchKnowledgePage';
import { DosageCalculatorPage } from './components/DosageCalculatorPage';
import { DrugDatabase } from './components/DrugDatabase';
import { PatientSettings } from './components/PatientSettings';

// Report interface
export interface Report {
  id: number;
  patientName: string;
  patientEmail: string;
  drug: string;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Critical';
  symptoms: string;
  dateReported: string;
  status: 'Under Review' | 'Reviewed' | 'Closed' | 'Urgent';
  aiAnalyzed: boolean;
  aiSuggestion?: string;
  priority: number; // 1 = highest
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
}

export default function App() {
  // Main state: DEMO or APP mode
  const [viewMode, setViewMode] = useState<'demo' | 'app'>('demo');
  const [currentPage, setCurrentPage] = useState('Home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // User state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'patient' | 'clinician' | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  // Shared reports state
  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      patientEmail: 'sarah.j@email.com',
      drug: 'Doxorubicin',
      severity: 'Moderate',
      symptoms: 'Nausea, fatigue, hair loss',
      dateReported: '2024-01-05',
      status: 'Under Review',
      aiAnalyzed: true,
      aiSuggestion: 'Monitor closely. Anti-nausea medication recommended.',
      priority: 3,
      urgency: 'Medium'
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      patientEmail: 'mchen@email.com',
      drug: 'Paclitaxel',
      severity: 'Critical',
      symptoms: 'Severe allergic reaction, difficulty breathing, chest pain',
      dateReported: '2024-01-06',
      status: 'Urgent',
      aiAnalyzed: true,
      aiSuggestion: 'IMMEDIATE ATTENTION REQUIRED. Possible anaphylaxis.',
      priority: 1,
      urgency: 'Critical'
    },
    {
      id: 3,
      patientName: 'Emily Rodriguez',
      patientEmail: 'emily.r@email.com',
      drug: 'Cisplatin',
      severity: 'Severe',
      symptoms: 'Kidney pain, reduced urination, extreme fatigue',
      dateReported: '2024-01-06',
      status: 'Under Review',
      aiAnalyzed: true,
      aiSuggestion: 'Possible nephrotoxicity. Renal function tests urgently needed.',
      priority: 2,
      urgency: 'High'
    },
    {
      id: 4,
      patientName: 'David Park',
      patientEmail: 'dpark@email.com',
      drug: 'Methotrexate',
      severity: 'Mild',
      symptoms: 'Mild nausea, occasional headaches',
      dateReported: '2024-01-04',
      status: 'Reviewed',
      aiAnalyzed: false,
      priority: 5,
      urgency: 'Low'
    }
  ]);

  const addReport = (report: Report) => {
    setReports([report, ...reports]);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  // From DEMO: Click any button → Go to Login/Register
  const handleDemoGetStarted = () => {
    setViewMode('app');
    setCurrentPage('Register');
  };

  const handleDemoLogin = () => {
    setViewMode('app');
    setCurrentPage('Login');
  };

  // After Login/Register
  const handleLogin = (role: 'patient' | 'clinician', name: string, email: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    setUserEmail(email);
    setCurrentPage(role === 'patient' ? 'PatientDashboard' : 'ClinicianDashboard');
  };

  const handleRegister = (role: 'patient' | 'clinician', name: string, email: string) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
    setUserEmail(email);
    setCurrentPage(role === 'patient' ? 'PatientDashboard' : 'ClinicianDashboard');
  };

  // Logout → Back to DEMO
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName('');
    setUserEmail('');
    setViewMode('demo');
    setCurrentPage('Home');
  };

  // DEMO LANDING PAGE
  if (viewMode === 'demo') {
    return (
      <SimplifiedLandingPage 
        onGetStarted={handleDemoGetStarted}
        onLogin={handleDemoLogin}
      />
    );
  }

  // APP MODE - Render Pages
  const renderAppPage = () => {
    // LOGIN/REGISTER PAGES (before authentication)
    if (!isLoggedIn) {
      switch (currentPage) {
        case 'Login':
          return <EnhancedLoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
        
        case 'Register':
          return <EnhancedRegisterPage onNavigate={handleNavigate} onRegister={handleRegister} />;
        
        default:
          // Any other page when not logged in → redirect to login
          return <EnhancedLoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      }
    }

    // AUTHENTICATED PAGES
    switch (currentPage) {
      case 'PatientDashboard':
        return (
          <PatientDashboard 
            onNavigate={handleNavigate} 
            onLogout={handleLogout}
            userName={userName}
            userEmail={userEmail}
            reports={reports.filter(r => r.patientEmail === userEmail)}
          />
        );
      
      case 'ClinicianDashboard':
        return (
          <ClinicianDashboard 
            onNavigate={handleNavigate} 
            onLogout={handleLogout}
            userName={userName}
            reports={reports}
          />
        );
      
      case 'Contact':
        return <ContactPage />;
      
      case 'About':
        return <AboutPage />;
      
      case 'Our Team':
        return <OurTeamPage />;
      
      case 'AI Features':
        return <AIFeaturesPage onOpenChat={handleOpenChat} />;
      
      case 'Drug Info':
        return <DrugStandardizationPage />;
      
      case 'Research':
        return <ResearchKnowledgePage />;
      
      case 'AIHealthcareAutomation':
        return <AIHealthcareAutomationPage onOpenChat={handleOpenChat} />;
      
      case 'PharmaceuticalsOncology':
        return <PharmaceuticalsOncologyPage onOpenChat={handleOpenChat} />;
      
      case 'QuickReporting':
        return (
          <EnhancedQuickReportingPage 
            onNavigate={handleNavigate}
            onReportSubmit={addReport}
            userName={userName}
            userEmail={userEmail}
            onOpenChat={handleOpenChat}
          />
        );
      
      case 'AISeverity':
        return <AISeverityPage />;
      
      case 'SecureAccounts':
        return <SecureAccountsPage />;
      
      case 'DosageCalculator':
        return <DosageCalculatorPage />;
      
      case 'DrugDatabase':
        return <DrugDatabase onOpenChat={handleOpenChat} />;
      
      case 'PatientSettings':
        return <PatientSettings userName={userName} userEmail={userEmail} />;
      
      case 'Home':
      default:
        // Based on role, show appropriate dashboard
        if (userRole === 'patient') {
          return (
            <PatientDashboard 
              onNavigate={handleNavigate} 
              onLogout={handleLogout}
              userName={userName}
              userEmail={userEmail}
              reports={reports.filter(r => r.patientEmail === userEmail)}
            />
          );
        } else if (userRole === 'clinician') {
          return (
            <ClinicianDashboard 
              onNavigate={handleNavigate} 
              onLogout={handleLogout}
              userName={userName}
              reports={reports}
            />
          );
        }
        return (
          <PatientDashboard 
            onNavigate={handleNavigate} 
            onLogout={handleLogout}
            userName={userName}
            userEmail={userEmail}
            reports={reports.filter(r => r.patientEmail === userEmail)}
          />
        );
    }
  };

  // Don't show navbar/footer on dashboards
  const isDashboardView = currentPage === 'PatientDashboard' || currentPage === 'ClinicianDashboard';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isDashboardView && (
        <AppNavbar 
          onNavigate={handleNavigate} 
          currentPage={currentPage}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      )}
      
      {renderAppPage()}
      
      {!isDashboardView && <Footer />}
      {!isDashboardView && <AIChatWidget onOpenChat={handleOpenChat} />}
      
      <FullScreenAIChat isOpen={isChatOpen} onClose={handleCloseChat} />
    </div>
  );
}