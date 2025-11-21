import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password)
      return setError("Please enter your email and password.");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signin",
        { email: form.email, password: form.password },
        { withCredentials: true }
      );

      if (res.status === 201) {
        navigate("/profile");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Incorrect Password, try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bg_people.png')" }}
    >
      {/* TRANSLUCENT MIST OVERLAY */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      {/* ACTUAL PAGE CONTENT */}
      <div className="relative z-10">

{/* NAVBAR */}
<header className="flex justify-between items-center px-10 py-4 
        bg-white/80 backdrop-blur-xl rounded-full shadow-lg 
        mt-4 mx-6 border border-gray-200">

  {/* LEFT LOGO SECTION */}
  <div className="flex items-center gap-3">
    {/* Minimal Icon */}
    <img src="/logo.jpg" alt="Cerope" className="w-6 h-6" />
    {/* Logo Text */}
    <h2 className="text-xl font-semibold tracking-wide text-black">Cerope</h2>
  </div>

  {/* CENTER — (EMPTY SPACE TO BALANCE UI) */}
  <div className="flex-1"></div>

  {/* EXPLORE MORE BUTTON */}
  <button
    className="
      px-5 py-2 rounded-full text-sm font-semibold 
      bg-gradient-to-r from-pink-300 via-purple-300 to-green-300 
      border border-black shadow-md
      hover:scale-105 transition flex items-center gap-2
      mr-4
    "
  >
    Explore More ✨
  </button>

  {/* PROFILE ICON */}
  <div className="w-10 h-10 rounded-full overflow-hidden border border-black shadow">
    <img
      src="/profile_image.png"
      alt="profile"
      className="w-full h-full object-cover"
    />
  </div>
</header>


        {/* MAIN CONTENT */}
        <section className="flex justify-center items-start gap-28 py-20 px-10">

          {/* LOGIN CARD */}
          <div className="w-[420px] bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-10 text-black">

            <h1 className="text-3xl font-bold">Welcome Back to Cerope</h1>
            <p className="text-gray-700 mt-1 mb-8">
              Your personalized fashion journey awaits.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl text-black"
              />

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border border-gray-300 px-4 py-3 rounded-xl text-black"
              />

              {error && (
                <p className="text-red-600 text-sm -mt-3">{error}</p>
              )}

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2 text-black">
                  <input type="checkbox" />
                  Remember me
                </label>

                <a href="#" className="text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
              >
                Sign In
              </button>

              <div className="flex items-center gap-3 my-2">
                <span className="flex-grow h-px bg-gray-300"></span>
                <span className="text-gray-500 text-sm">or</span>
                <span className="flex-grow h-px bg-gray-300"></span>
              </div>

              {/* GOOGLE BUTTON */}
              <button
                type="button"
                className="w-full flex justify-center items-center gap-3 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
              >
                <div className="bg-white rounded-full p-1">
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    className="w-5 h-5"
                    alt="google"
                  />
                </div>
                Google
              </button>

              <p className="text-sm text-center mt-4">
                Don’t have an account?{" "}
                <Link to="/register" className="text-blue-600 font-medium">
                  Sign up
                </Link>
              </p>
            </form>
          </div>

          {/* RIGHT SHOWCASE IMAGE */}
          <div className="rounded-2xl shadow-xl border border-gray-200 p-2 bg-white">
            <img
              src="/signin_image.png"
              className="w-[420px] h-[480px] object-cover rounded-xl"
              alt="signin"
            />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-black text-white px-20 py-12 mt-auto">
          <div className="grid grid-cols-4 gap-14">

            <div>
              <h3 className="text-xl font-bold mb-2">Cerope</h3>
              <p className="text-gray-300 text-sm">
                Revolutionizing fashion with AI-powered styling solutions.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Home</li>
                <li>Contact Us</li>
                <li>About</li>
                <li>Features</li>
                <li>FAQ's</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Products</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>User Styling - Launching Soon</li>
                <li>Price Comparison</li>
                <li>Creator Space</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Policies</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>Privacy Policy</li>
                <li>Copyright Policy</li>
                <li>Cookie Policy</li>
                <li>Terms and Conditions</li>
              </ul>
            </div>

          </div>

          <p className="text-center text-gray-500 text-xs mt-10">
            ©2025 Cerope. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  );
};

export default SignIn;
