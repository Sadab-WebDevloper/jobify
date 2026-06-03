import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-16 px-6 md:px-16 text-gray-200">
      <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
        <div className="space-y-6">
          <p>
            Welcome to our Privacy Policy. Your privacy is critically important to us.
            This document outlines the types of personal information we collect and how it is used.
          </p>
          <h2 className="text-2xl font-semibold text-white">1. Information We Collect</h2>
          <p>
            We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey, or fill out a form.
          </p>
          <h2 className="text-2xl font-semibold text-white">2. How We Use Information</h2>
          <p>
            Any of the information we collect from you may be used to personalize your experience, improve our website, improve customer service, process transactions, or send periodic emails.
          </p>
          <h2 className="text-2xl font-semibold text-white">3. Information Protection</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information.
          </p>
          <p className="mt-8 text-sm text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
