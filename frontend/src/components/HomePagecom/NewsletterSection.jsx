const NewsletterSection = () => {
  return (
    <div className="bg-[#431692] text-white py-16 px-6 md:px-16 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
      <p className="text-lg mb-6">
        Subscribe to our newsletter for the latest job updates and career tips.
      </p>
      <form className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 ">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-3 rounded-full text-gray-800 w-full md:w-[40%]  "
        />
        <button
          type="submit"
          className="bg-[#F83002] ml-3 px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSection;
