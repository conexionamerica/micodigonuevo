import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import DiscountBanner from '@/components/home/DiscountBanner';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { supabase } from '@/lib/customSupabaseClient';

const HomePage = lazy(() => import('@/pages/HomePage'));
const PackagesPage = lazy(() => import('@/pages/PackagesPage'));
const ProfessorLoginPage = lazy(() => import('@/pages/ProfessorLoginPage'));
const ProfessorPanelPage = lazy(() => import('@/pages/ProfessorPanelPage'));
const TermsAndConditionsPage = lazy(() => import('@/pages/TermsAndConditionsPage'));

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (data) {
          setUserRole(data.role);
        } else if (error) {
          console.error("Error fetching user role:", error.message);
        }
      }
      setRoleLoading(false);
    };

    if (!loading) {
      fetchUserRole();
    }
  }, [user, loading]);

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user || userRole !== role) {
    return <Navigate to="/professor/login" replace />;
  }

  return children;
};


function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={
            <div className="flex justify-center items-center h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pacotes" element={<PackagesPage />} />
              <Route path="/termos-e-condicoes" element={<TermsAndConditionsPage />} />
              <Route path="/professor/login" element={<ProfessorLoginPage />} />
              <Route
                path="/professor/painel"
                element={
                  <ProtectedRoute role="professor">
                    <ProfessorPanelPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;