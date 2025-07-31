import Hero from "@/components/home/Hero";
import Pricing from "@/components/home/Pricing/Pricing";
import FAQ from "@/components/home/FAQ";
import Benefits from "@/components/home/Benefits/Benefits";
import Container from "@/components/home/Container";
import Section from "@/components/home/Section";
import Stats from "@/components/home/Stats";
import CTA from "@/components/home/CTA";
import Footer from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";
import ProblemSection from "@/components/home/ProblemSection";

const HomePage: React.FC = () => {
  return (
    <div className="font-lora">
      <Navbar/>
      <Hero />
      <Container>
        <Benefits />

        <Section
          id="problems"
          title="Tired of These Common Business Problems?"
          description="See how digital catalogs solve real issues that every business faces."
        >
          <ProblemSection />
        </Section>

        <Section
          id="pricing"
          title="Simple, Transparent Pricing"
          description="Choose the plan that fits your business needs. No hidden fees."
        >
          <Pricing />
        </Section>

        <Section
          id="faq"
          title="Frequently Asked Questions"
          description="Everything you need to know about digital catalogs and our platform."
        >
          <FAQ />
        </Section>

        <Stats />
        
        <CTA />
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;
