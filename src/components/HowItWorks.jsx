import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      title: "Sign up & choose your subjects",
      description: "Create your profile and select the courses and topics you're studying. Tell us your learning style and goals.",
      icon: "📝"
    },
    {
      step: 2,
      title: "Match with like-minded students",
      description: "Our smart algorithm connects you with peers who share your academic interests and study preferences.",
      icon: "🤝"
    },
    {
      step: 3,
      title: "Study together & crush your goals",
      description: "Join study sessions, form groups, and achieve better results through collaborative learning.",
      icon: "🎯"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting started with StudySync is simple. Follow these three easy steps to transform your study experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connection line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-6 w-12 h-0.5 bg-gray-200 z-0"></div>
              )}
              
              <div className="text-center relative z-10">
                {/* Step Icon */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-primary to-blue-400 rounded-full mb-6 shadow-lg">
                  <span className="text-3xl">{step.icon}</span>
                  <div className="absolute -bottom-2 -right-2 bg-accent text-yellow-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="#sprint"
            className="bg-primary hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
