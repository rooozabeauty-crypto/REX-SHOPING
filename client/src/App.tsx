import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Design from "./pages/Design";
import Campaigns from "./pages/Campaigns";
import Assistant from "./pages/Assistant";
import Support from "./pages/Support";
import Updates from "./pages/Updates";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Pricing from "./pages/Pricing";
import Billing from "./pages/Billing";
import SubscriptionManager from "./pages/SubscriptionManager";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/services" component={Services} />
      <Route path="/design" component={Design} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/assistant" component={Assistant} />
      <Route path="/support" component={Support} />
      <Route path="/updates" component={Updates} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/admin" component={Admin} />
      <Route path="/billing" component={Billing} />
      <Route path="/subscription" component={SubscriptionManager} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
