import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen py-16 px-6 md:px-16 text-gray-200">
      <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-white">Terms of Service</h1>
        <div className="space-y-6">
          <p>
            Please read these terms of service ("terms", "terms of service") carefully before using our website operated by Jobify.
          </p>
          <h2 className="text-2xl font-semibold text-white">Conditions of Use</h2>
          <p>
            We will provide their services to you, which are subject to the conditions stated below in this document. Every time you visit this website, use its services or make a purchase, you accept the following conditions.
          </p>
          <h2 className="text-2xl font-semibold text-white">Privacy Policy</h2>
          <p>
            Before you continue using our website we advise you to read our privacy policy regarding our user data collection. It will help you better understand our practices.
          </p>
          <h2 className="text-2xl font-semibold text-white">Copyright</h2>
          <p>
            Content published on this website (digital downloads, images, texts, graphics, logos) is the property of Jobify and/or its content creators and protected by international copyright laws.
          </p>
          <p className="mt-8 text-sm text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
