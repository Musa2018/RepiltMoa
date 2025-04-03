import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import Resources from "@/pages/resources";
import News from "@/pages/news";
import Contact from "@/pages/contact";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/about/:section" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/services/:id" component={Services} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/category/:category" component={Resources} />
      <Route path="/resources/type/:type" component={Resources} />
      <Route path="/news" component={News} />
      <Route path="/news/:id" component={News} />
      <Route path="/projects" component={NotFound} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
