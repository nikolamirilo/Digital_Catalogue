import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing/Pricing";
import FAQ from "@/components/home/FAQ";
import Logos from "@/components/home/Logos";
import Benefits from "@/components/home/Benefits/Benefits";
import Container from "@/components/home/Container";
import Section from "@/components/home/Section";
import Stats from "@/components/home/Stats";
import CTA from "@/components/home/CTA";
import Footer from "@/components/home/Footer";
import Navbar from "@/components/navigation/Navbar";

const HomePage: React.FC = () => {
  return (
    <div className="home">
      <Navbar/>
      <Hero />
      <Logos />
      <Container>
        <Benefits />

        <Section
          id="pricing"
          title="Pricing"
          description="Simple, transparent pricing. No surprises."
        >
          <Pricing />
        </Section>

        <Section
          id="testimonials"
          title="What Our Clients Say"
          description="Hear from those who have partnered with us."
        >
          <Testimonials />
        </Section>



        <Stats />
        
        <CTA />
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;
