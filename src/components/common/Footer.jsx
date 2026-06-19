import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

const Footer = () => {
  const { data: categories = [] } = useCategories();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/50 py-14 px-6">
      <div className="max-w-7xl mx-auto text-white">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img
              src="https://res.cloudinary.com/du7xquzsm/image/upload/v1763790305/studyHub_logo-removebg-preview_ai0ckr.png"
              alt="StudyHub"
              loading="lazy"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-xs">
              Transforming careers through expert-led education and real-world
              projects.
            </p>

            <div className="flex gap-2.5">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StudyHub on Twitter"
                className="w-9 h-9 border border-slate-700 rounded-lg flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 text-slate-400 transition-colors font-['JetBrains_Mono'] text-[10px] tracking-wide"
              >
                TW
              </a>
              <a
                href="https://github.com/abdalqamar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StudyHub on GitHub"
                className="w-9 h-9 border border-slate-700 rounded-lg flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 text-slate-400 transition-colors font-['JetBrains_Mono'] text-[10px] tracking-wide"
              >
                GH
              </a>
              <a
                href="https://linkedin.com/in/abdalqamar"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StudyHub on LinkedIn"
                className="w-9 h-9 border border-slate-700 rounded-lg flex items-center justify-center hover:border-cyan-400 hover:text-cyan-400 text-slate-400 transition-colors font-['JetBrains_Mono'] text-[10px] tracking-wide"
              >
                LI
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-['JetBrains_Mono'] text-xs tracking-[0.1em] uppercase text-cyan-400 mb-4">
              Courses
            </h4>
            <ul className="space-y-2.5">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <li key={category._id}>
                    <Link
                      to={`/courses?page=1&category=${category._id}`}
                      className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-slate-500 text-sm">No categories yet</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="font-['JetBrains_Mono'] text-xs tracking-[0.1em] uppercase text-cyan-400 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/about"
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  Become an Instructor
                </Link>
              </li>
              <li></li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-['JetBrains_Mono'] text-xs tracking-[0.1em] uppercase text-cyan-400 mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/help"
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            © 2026 StudyHub. All rights reserved. Empowering learners worldwide.
          </p>
          <p className="font-['JetBrains_Mono'] text-[11px] text-slate-600 tracking-wide">
            BUILT WITH MERN
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
