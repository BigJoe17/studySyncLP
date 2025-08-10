import React from 'react';

const SprintInvitation = () => {
  const roles = [
    {
      title: "UI/UX Designer",
      description: "Help design beautiful, intuitive interfaces using Figma",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      icon: "🎨"
    },
    {
      title: "Developer",
      description: "Build scalable web applications with modern tech stack",
      skills: ["React", "Node.js", "MongoDB", "TailwindCSS"],
      icon: "💻"
    }
  ];

  return (
    <section id="sprint" className="py-16 lg:py-24 bg-gradient-to-br from-primary to-blue-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent text-yellow-800 px-4 py-2 rounded-full font-semibold mb-6">
            <span>🚀</span>
            4-Week Sprint in Progress
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Join the <span className="text-accent">Building Journey</span>
          </h2>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto leading-relaxed">
            We're building StudySync in a 4-week sprint with <strong>Tech Bridge</strong>. 
            This is your chance to be part of creating something amazing while learning 
            from experienced mentors and collaborating with passionate peers.
          </p>
        </div>

        {/* Sprint Info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 mb-12">
          <div className="grid lg:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-3">⏰</div>
              <h3 className="text-xl font-bold mb-2">Duration</h3>
              <p className="text-blue-100">4 weeks intensive sprint</p>
            </div>
            <div>
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-xl font-bold mb-2">Team Size</h3>
              <p className="text-blue-100">Small, focused teams</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">Goal</h3>
              <p className="text-blue-100">Launch StudySync MVP</p>
            </div>
          </div>
        </div>

        {/* Roles Needed */}
        <div className="mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8">
            Roles We're Looking For
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {roles.map((role, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{role.icon}</div>
                  <h4 className="text-xl font-bold">{role.title}</h4>
                </div>
                <p className="text-blue-100 mb-4">{role.description}</p>
                <div className="flex flex-wrap gap-2">
                  {role.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-accent text-yellow-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/+2349050065306"
              className="bg-accent hover:bg-yellow-400 text-yellow-800 font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Join WhatsApp Group 💬
            </a>
            <a
              href="https://forms.gle/4r8sjajwBmEwm8h47"
              className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-4 px-8 rounded-xl transition-all duration-300"
            >
              Apply via Form 📝
            </a>
          </div>
          <p className="text-sm text-blue-200">
            Questions? Reach out to us directly and we'll get back to you within 24 hours.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SprintInvitation;
