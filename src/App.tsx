import { Toaster } from "@/components/ui/toaster"; // Shadcn Toaster
import { Toaster as SonnerToaster } from "@/components/ui/sonner"; // Sonner Toaster
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Pages
import LoginPage from "./pages/LoginPage";
import AccountsPage from "./pages/AccountsPage";
import TransfersPage from "./pages/TransfersPage";
import PaymentsPage from "./pages/PaymentsPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import NotFound from "./pages/NotFound"; // Assume NotFound.tsx exists

const queryClient = new QueryClient();

// Dummy auth check, replace with actual auth logic
const isAuthenticated = () => {
  // For demonstration, let's assume login state can be faked via localStorage or a simple flag.
  // In a real app, this would involve checking tokens, context, etc.
  // To test protected routes, you might manually set 'isLoggedIn' in localStorage from browser console.
  return localStorage.getItem('isLoggedIn') === 'true'; 
};

// ProtectedRoute component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    // To make login navigate to accounts and set 'isLoggedIn', LoginPage's onSubmit should do:
    // localStorage.setItem('isLoggedIn', 'true'); navigate('/accounts');
    return <Navigate to="/login" replace />;
  }
  return children;
};


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster /> {/* Shadcn Toaster */}
      <SonnerToaster /> {/* Sonner Toaster for richer notifications */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {/* Default route: if authenticated go to /accounts, else /login */}
          <Route 
            path="/" 
            element={isAuthenticated() ? <Navigate to="/accounts" replace /> : <Navigate to="/login" replace />} 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/accounts" 
            element={<ProtectedRoute><AccountsPage /></ProtectedRoute>} 
          />
          <Route 
            path="/transfers" 
            element={<ProtectedRoute><TransfersPage /></ProtectedRoute>} 
          />
          <Route 
            path="/payments" 
            element={<ProtectedRoute><PaymentsPage /></ProtectedRoute>} 
          />
          <Route 
            path="/profile-settings" 
            element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} 
          />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;