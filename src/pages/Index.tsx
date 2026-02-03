import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ROICalculator } from "@/components/ROICalculator";
import { SolutionsByDepartment } from "@/components/SolutionsByDepartment";
import { NotForSection } from "@/components/NotForSection";
import { IdealForSection } from "@/components/IdealForSection";
import { Process } from "@/components/Process";
import { GuideForm } from "@/components/GuideForm";
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ROICalculator />
        <SolutionsByDepartment />
        <NotForSection />
        <IdealForSection />
        <Process />
        <GuideForm />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
};

export default Index;