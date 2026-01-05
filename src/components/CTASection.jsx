import { Award, MessageCircle, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Join thousands of learners who are already building their dream
            careers
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              to={"/login"}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Start Learning Today
            </Link>
            <Link
              to={"/login"}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 px-6 py-4 border border-blue-500/30 rounded-xl hover:bg-blue-500/10 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Talk to Advisor
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>30-day money back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Instant access</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Industry certificates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
