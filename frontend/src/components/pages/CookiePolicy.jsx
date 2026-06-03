import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen py-16 px-6 md:px-16 text-gray-200">
      <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-white">Cookie Policy</h1>
        <div className="space-y-6">
          <p>
            This Cookie Policy explains how Jobify uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
          </p>
          <h2 className="text-2xl font-semibold text-white">What are cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
          </p>
          <h2 className="text-2xl font-semibold text-white">Why do we use cookies?</h2>
          <p>
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies.
          </p>
          <h2 className="text-2xl font-semibold text-white">How can I control cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject.
          </p>
          <p className="mt-8 text-sm text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
