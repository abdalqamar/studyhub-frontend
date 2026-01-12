import { Link } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";

const Footer = () => {
  const { data: categories = [] } = useCategories();
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 py-20 px-6">
      <div className="max-w-7xl mx-auto text-white">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">StudyHub</h3>
            <p className="text-slate-400 mb-4">
              Transforming careers through expert-led education and real-world
              projects.
            </p>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
                <span className="text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
                <span className="text-sm">t</span>
              </div>
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 cursor-pointer transition-colors">
                <span className="text-sm">in</span>
              </div>
            </div>
          </div>

          {/* Category Links */}
          <div>
            <h4 className="font-semibold mb-4">Courses</h4>
            {categories.map((category) => (
              <Link key={category._id} to={"/courses"}>
                <p className="hover:text-white space-y-2 text-slate-400 transition-colors">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>

          {/* Pages Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <Link to={"/about"}>
                <p className="hover:text-white transition-colors">About Us</p>
              </Link>
              <Link>
                <p className="hover:text-white transition-colors">
                  Become an Instructor
                </p>
              </Link>
              <Link>
                <p className="hover:text-white transition-colors">Press</p>
              </Link>
              <Link to={"/contact"}>
                <p className="hover:text-white transition-colors">Contact</p>
              </Link>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link to="/help" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>

              <li>
                <Link className="hover:text-white transition-colors">
                  Community
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>
            &copy;2026 StudyHub. All rights reserved. Empowering learners
            worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
