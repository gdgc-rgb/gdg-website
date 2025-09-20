import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Community from "./pages/Community";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";
import { AnimatePresence } from "framer-motion";
import SlideFadeTransition from "./components/animations/SlideFadeTransition";

const queryClient = new QueryClient();

// Component that uses useLocation inside Router context
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <SlideFadeTransition direction="right">
              <Index />
            </SlideFadeTransition>
          }
        />
        <Route
          path="/community"
          element={
            <SlideFadeTransition direction="left">
              <Community />
            </SlideFadeTransition>
          }
        />
        <Route
          path="/team"
          element={
            <SlideFadeTransition direction="up">
              <Team />
            </SlideFadeTransition>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route
          path="*"
          element={
            <SlideFadeTransition direction="down">
              <NotFound />
            </SlideFadeTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
