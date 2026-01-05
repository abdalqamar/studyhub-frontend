import React from "react";

const AuthLayout = ({ image, title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6  bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden py-28">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl border border-slate-800/50 backdrop-blur-md max-w-6xl w-full relative z-10 mx-auto ">
        <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center bg-slate-900/50 ">
          {/* Background Image */}
          <img
            src={image}
            loading="lazy"
            alt="Auth background"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-blue-950/40 to-slate-950/60"></div>

          {/* Content */}
          <div className="relative z-10 p-12 text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
                {title}
              </h1>
              <p className="text-lg text-slate-300 max-w-md leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-8">
              {[
                { icon: "✓", text: "Secure and encrypted" },
                { icon: "✓", text: "Fast and seamless" },
                { icon: "✓", text: "24/7 support" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-blue-400 font-bold text-lg">
                    {feature.icon}
                  </span>
                  <span className="text-slate-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800/50">
              {[
                { value: "150k+", label: "Users" },
                { value: "480+", label: "Companies" },
                { value: "99.9%", label: "Uptime" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-blue-400">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-10 lg:p-14 bg-slate-950/80 backdrop-blur-sm ">
          {/* Form Content */}
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
