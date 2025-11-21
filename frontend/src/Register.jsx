import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password)
      return setError("All fields are required.");

    if (!/^[A-Za-z\s]+$/.test(form.name))
      return setError("Invalid Name! Please Do Not Enter Numerals.");

    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match.");

    if (!form.agree) return setError("You must agree to the terms.");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (res.data.status === 200) navigate("/setup");
      setSuccess(res.data.message);
    } catch (error) {
      setError("Something bad happened...");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bg_people.png')" }}
    >
      {/* Translucent Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      {/* REAL CONTENT */}
      <div className="relative z-10">

        {/* NAVBAR */}
        <header className="flex justify-between items-center px-10 py-4 border-b bg-white/40 backdrop-blur-md">
          <h2 className="text-2xl font-bold tracking-wide">Cerope</h2>

          <button className="px-4 py-2 bg-black text-white rounded-full flex items-center gap-2 shadow-sm">
            Explore More ✨
          </button>
        </header>

        {/* MAIN CONTENT */}
        <section className="flex justify-center items-start gap-20 py-16">

          {/* LEFT FORM CARD */}
          <div className="w-[400px] bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-10 text-black">
            <h2 className="text-3xl font-semibold mb-8">
              Set up Your Cerope Account
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl text-black"
              />

              {error && error.includes("Name") && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl text-black"
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl text-black"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 rounded-xl text-black"
              />

              <label className="flex items-center gap-2 text-sm text-black">
                <input
                  type="checkbox"
                  name="agree"
                  checked={form.agree}
                  onChange={handleChange}
                />
                I agree to Cerope’s Terms of Service & Privacy Policy.
              </label>

              {error && !error.includes("Name") && (
                <p className="text-red-600 text-sm">{error}</p>
              )}
              {success && <p className="text-green-600 text-sm">{success}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-full mt-2 hover:bg-gray-800 transition"
              >
                Sign Up
              </button>

              <p className="text-sm mt-2 text-center">
                Already a member?{" "}
                <Link to="/signin" className="text-blue-600 font-medium">
                  Sign In
                </Link>
              </p>
            </form>
          </div>

          {/* RIGHT IMAGE */}
          <img
            src="/register_page.png"
            className="w-[430px] rounded-2xl shadow-2xl border border-gray-200"
            alt="dress"
          />

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
                <li>FAQ’s</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Products</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>User Styling – Launching Soon</li>
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

export default Register;
