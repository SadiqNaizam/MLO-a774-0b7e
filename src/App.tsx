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

// Authentication is now disabled: always returns true.
const isAuthenticated = () => {
  return true; 
};

// ProtectedRoute component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    // This block will effectively not be reached as isAuthenticated() is always true.
    // Kept for structural understanding but redirection to /login will not happen.
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
          {/* Default route: now always navigates to /accounts as authentication is disabled */}
          <Route 
            path="/" 
            element={<Navigate to="/accounts" replace />} 
          />
          
          {/* Protected Routes (now effectively public) */}
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