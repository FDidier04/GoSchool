import React from 'react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-lg p-12 mb-12">
          <h1 className="text-5xl font-bold mb-4">About GoSchool</h1>
          <p className="text-xl opacity-90">
            Connecting students, teachers, and professionals across Africa
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            GoSchool is dedicated to revolutionizing education access across Africa. We're building a platform
            that connects students, teachers, and educational institutions, making quality education more accessible,
            affordable, and convenient.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our vision is to bridge the gap between learners seeking knowledge and educators ready to share their expertise,
            leveraging technology to create meaningful educational opportunities.
          </p>
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-4xl mb-4">ðŸŒ</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Global Coverage</h3>
            <p className="text-gray-600">
              Available across Republic of Congo, Cameroon, and Senegal with expansion plans for more African countries.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-4xl mb-4">ðŸ”</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Search</h3>
            <p className="text-gray-600">
              Find schools and courses near you with our advanced geolocation and filtering capabilities.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-4xl mb-4">ðŸ’³</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payments</h3>
            <p className="text-gray-600">
              Flexible payment options including mobile money, card payments, and more.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose GoSchool?</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-primary text-2xl flex-shrink-0">âœ“</span>
              <div>
                <h3 className="font-semibold text-gray-900">Verified Institutions</h3>
                <p className="text-gray-600">All schools and courses are verified for quality and legitimacy</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-primary text-2xl flex-shrink-0">âœ“</span>
              <div>
                <h3 className="font-semibold text-gray-900">Real Student Reviews</h3>
                <p className="text-gray-600">Make informed decisions based on authentic feedback from other students</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-primary text-2xl flex-shrink-0">âœ“</span>
              <div>
                <h3 className="font-semibold text-gray-900">Transparent Pricing</h3>
                <p className="text-gray-600">Clear, upfront pricing with no hidden fees</p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-primary text-2xl flex-shrink-0">âœ“</span>
              <div>
                <h3 className="font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-gray-600">Our dedicated team is here to help whenever you need</p>
              </div>
            </li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-primary to-secondary text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Education?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of students and educators on GoSchool today</p>
          <div className="flex gap-4 justify-center">
            <a
              href="/auth/signup"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started
            </a>
            <a
              href="/schools"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition"
            >
              Explore Schools
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
