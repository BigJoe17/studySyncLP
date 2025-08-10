import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-2 rounded-xl">
                <span className="text-2xl">📚</span>
              </div>
              <span className="text-2xl font-bold">StudySync</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Connecting students worldwide with the perfect study partners. 
              Transform your learning experience through collaborative education.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com/company/studysync"
                className="bg-gray-800 hover:bg-primary p-3 rounded-full transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/studysync"
                className="bg-gray-800 hover:bg-primary p-3 rounded-full transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zm0 21.417c-5.2 0-9.43-4.23-9.43-9.43s4.23-9.43 9.43-9.43 9.43 4.23 9.43 9.43-4.23 9.43-9.43 9.43z"/>
                  <path d="M12.017 5.838c-3.403 0-6.149 2.746-6.149 6.149s2.746 6.15 6.149 6.15 6.15-2.747 6.15-6.15-2.747-6.149-6.15-6.149zm0 10.149c-2.205 0-4-1.795-4-4s1.795-4 4-4 4 1.795 4 4-1.795 4-4 4z"/>
                  <circle cx="18.406" cy="5.594" r="1.44"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-300">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#sprint" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Join Sprint
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-400">
                <span className="text-white">Email:</span><br />
                hello@studysync.app
              </p>
              <p className="text-gray-400">
                <span className="text-white">WhatsApp:</span><br />
                +1 (555) 123-4567
              </p>
              <p className="text-gray-400">
                <span className="text-white">Hours:</span><br />
                Mon-Fri, 9AM-6PM EST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 StudySync. Built with{' '}
            <span className="text-red-400">❤️</span>{' '}
            in collaboration with{' '}
            <a
              href="https://techbridge.com"
              className="text-primary hover:text-blue-400 transition-colors duration-300"
            >
              Tech Bridge
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
