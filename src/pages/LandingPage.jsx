import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

function LandingPage() {
  return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen font-sans text-gray-800 scroll-smooth">
      <Header />
      <main>
        <section id="hero-section">
          <Hero />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="testimonials">
          <Testimonials />
        </section>
        <section id="pricing">
          <Pricing />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;