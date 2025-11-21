import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/*
  Setup.jsx
  - Stores profilePicture as Base64 in DB (simple approach)
  - GET /api/profile/myProfile to prefill
  - PUT /api/profile/myProfile with { updates: { ... } }
  - Requires cookie JWT (withCredentials: true)
*/

const Setup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    profilePicture: "", // base64 string
    dob: "",
    stylePreference: "both", // men | women | both
    phone: "",
    country: "",
    city: "",
  });

  // default preview
  const defaultPreview = "/profile_image.png";

  // Load existing profile
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/profile/myProfile", {
          withCredentials: true,
        });

        if (res.status === 200 && res.data.user) {
          const user = res.data.user;
          const nameParts = (user.name || "").split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          setForm((prev) => ({
            ...prev,
            firstName,
            lastName,
            profilePicture: user.profilePicture || "",
            dob: user.dob ? new Date(user.dob).toISOString().slice(0, 10) : "",
            stylePreference: user.stylePreference || "both",
            phone: user.phone || "",
            country: user.country || "",
            city: user.city || "",
          }));
        }
      } catch (err) {
        console.error("Could not fetch profile:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Generic input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  // Image file → base64
  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((s) => ({ ...s, profilePicture: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Validation
  const validate = () => {
    if (!form.firstName.trim()) return setError("First name is required."), false;
    if (!form.country.trim()) return setError("Country is required."), false;
    if (!form.dob) return setError("Date of birth is required."), false;

    if (form.phone && !/^[0-9+\-\s()]{6,20}$/.test(form.phone)) {
      return setError("Please enter a valid phone number."), false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    try {
      const name = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();

      const updates = {
        name,
        profilePicture: form.profilePicture || "",
        dob: form.dob || null,
        stylePreference: form.stylePreference,
        phone: form.phone,
        country: form.country,
        city: form.city,
      };

      const res = await axios.put(
        "http://localhost:5000/api/profile/myProfile",
        { updates },
        { withCredentials: true }
      );

      if (res.status === 201 || res.status === 200) {
        navigate("/profile");
      } else {
        setError(res.data?.message || "Unable to save profile.");
      }
    } catch (err) {
      console.error("Save error", err);
      setError(err.response?.data?.message || "Server error while saving profile.");
    } finally {
      setSaving(false);
    }
  };

  const cities = ["Select location", "Mumbai", "Chennai", "Bengaluru", "Delhi", "Kolkata"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat relative"
         style={{ backgroundImage: "url('/bg_people.png')" }}>
      
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>

      <div className="relative z-10">

        {/* NAVBAR */}
        <header className="flex justify-between items-center px-8 py-4 border-b bg-white/40">
          <div className="text-2xl font-bold text-black">Cerope</div>
          <button className="px-4 py-2 bg-black text-white rounded-full">Explore More ✨</button>
        </header>

        {/* MAIN */}
        <main className="py-12 px-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8 text-black">Set up your User account</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

              {/* LEFT COLUMN */}
              <div>
                {/* First Name */}
                <label className="block text-sm font-medium text-gray-700">First Name *</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="mt-2 mb-4 w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />

                {/* Last Name */}
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="mt-2 mb-4 w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />

                {/* Profile Picture */}
                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <div className="flex items-center gap-4 mt-2 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                    {form.profilePicture ? (
                      <img src={form.profilePicture} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="3.2" stroke="#999" strokeWidth="1.5" />
                        <path d="M3 20c1.8-4 7.2-6 9-6s7.2 2 9 6" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                                 file:rounded-full file:border-0 file:text-sm file:font-semibold 
                                 file:bg-gray-100 hover:file:bg-gray-200"
                    />
                    <p className="text-xs text-gray-500 mt-1">Choose a profile picture</p>
                  </div>
                </div>

                {/* DOB */}
                <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="mt-2 mb-4 w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />

                {/* Style Preference */}
                <label className="block text-sm font-medium text-gray-700">Style Preference *</label>
                <div className="mt-2 mb-4 flex items-center gap-6">
                  {["men", "women", "both"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2">
                      <input type="radio" name="stylePreference" value={opt} checked={form.stylePreference === opt} onChange={handleChange} />
                      <span className="text-black capitalize">{opt}</span>
                    </label>
                  ))}
                </div>

                {/* Phone */}
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="mt-2 mb-4 w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* RIGHT COLUMN */}
              <div>
                {/* Showcase image */}
                <div className="w-full flex justify-center mb-6">
                  <div className="w-[320px] h-[420px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-white">
                    <img
                      src={form.profilePicture || defaultPreview}
                      alt="showcase"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Country */}
                <label className="block text-sm font-medium text-gray-700">Country *</label>
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  className="mt-2 mb-4 w-full bg-white text-black border border-gray-300 rounded-lg px-4 py-3 
                             focus:outline-none focus:ring-2 focus:ring-black"
                />

                {/* City */}
                <label className="block text-sm font-medium text-gray-700">City</label>
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="mt-2 mb-4 w-full bg-white text-black border border-gray-300 rounded-lg px-3 py-3 
                             focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {cities.map((c) => (
                    <option key={c} value={c === "Select location" ? "" : c}>
                      {c}
                    </option>
                  ))}
                </select>

                {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

                <div className="mt-8">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-black text-white py-3 rounded-full text-lg"
                  >
                    {saving ? "Saving..." : "Continue"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>

        {/* FOOTER */}
        <footer className="bg-black text-white px-20 py-12 mt-auto">
          <div className="grid grid-cols-4 gap-14">
            <div>
              <h3 className="text-xl font-bold mb-2">Cerope</h3>
              <p className="text-gray-300 text-sm">Revolutionizing fashion with AI-powered styling solutions.</p>
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

export default Setup;
