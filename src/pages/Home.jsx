import LiveCodeDemo from "../features/home/components/LiveCodeDemo";
import Hero from "@/features/home/components/Hero";
import CategoryIcons from "@/features/home/components/CategoryIcons";
import CatalogIndex from "@/features/home/components/CatalogIndex";
import ModulesGrid from "@/features/home/components/ModulesGrid";
import Process from "@/features/home/components/Process";
import Testimonials from "@/features/home/components/Testimonials";
import FinalCTA from "@/features/home/components/FinalCTA";

const Home = () => {
  return (
    <div
      className="min-h-screen bg-bg text-text-1"
      style={{
        backgroundImage:
          "radial-gradient(circle at 15% 0%, rgba(212,165,55,0.05), transparent 40%), radial-gradient(circle at 85% 30%, rgba(45,212,191,0.04), transparent 40%)",
      }}
    >
      <Hero />

      {/* LIVE CODE */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-10">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-gold">
              Inside a lesson
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 leading-tight">
              You don't just watch this part — you ship it.
            </h2>
            <p className="text-text-2 mt-3">
              Every module ends in real, running code. This is a snippet from
              course CRS-014.
            </p>
          </div>

          <LiveCodeDemo />
        </div>
      </section>

      {/* CATALOG */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-10">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-gold">
              The catalog
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 leading-tight">
              Twelve paths. Every skill mapped.
            </h2>
            <p className="text-text-2 mt-3">
              Each path is its own roadmap — a complete map from first
              principles to a finished, shippable skill.
            </p>
          </div>

          <CategoryIcons />
          <CatalogIndex />
        </div>
      </section>

      {/* MODULES */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-10">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-gold">
              Newest courses
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 leading-tight">
              Fresh off the catalog.
            </h2>
          </div>

          <ModulesGrid />
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-12">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-gold">
              How it works
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 leading-tight">
              Four stages. No shortcuts.
            </h2>
          </div>

          <Process />
        </div>
      </section>

      {/* FIELD NOTES */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl mb-10">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-gold">
              Field notes
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl mt-3 leading-tight">
              From people who finished a path.
            </h2>
          </div>

          <Testimonials />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <FinalCTA />
        </div>
      </section>

      <div className="text-center py-8 sm:py-12 font-mono text-[11px] text-text-3">
        STUDYHUB · CAREER SKILLS PLATFORM
      </div>
    </div>
  );
};

export default Home;
