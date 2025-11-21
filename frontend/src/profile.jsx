// src/Profile.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const defaultPreview = "/profile_image.png";

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "http://localhost:5000/api/profile/myProfile",
          { withCredentials: true }
        );

        if (res.status === 200 && res.data.user) {
          setUser(res.data.user);
        } else {
          setError("Could not load profile.");
        }
      } catch (err) {
        console.error("Profile load error:", err);
        setError(err.response?.data?.message || "Failed to load profile.");

        if (err.response?.status === 401) {
          navigate("/signin");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      navigate("/signin");
    } catch (err) {
      console.error("Logout error:", err);
      navigate("/signin");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-600">No user data available. Please sign in.</div>
      </div>
    );
  }

  // split name into first + last
  const nameParts = (user.name || "").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/bg_people.png')" }}
    >
    <div className="absolute inset-0 bg-white/70 backdrop-blur-sm"></div>
    <div className="relative z-10">
    {/* NAVBAR */}
    
    <header className="w-full flex justify-center mt-4">
    <div className="w-[95%] bg-white shadow-md rounded-full px-6 py-3 flex items-center justify-between">

    {/* LEFT SECTION */}
    <div className="flex items-center gap-6">
    {/* Logo */}
    <div className="flex items-center gap-2">
        <img src="/logo.jpg" alt="Cerope" className="w-6 h-6" />
        <span className="text-lg font-semibold text-black">Cerope</span>
    </div>

        {/* Explore More Button */}
        <button className="px-4 py-1 rounded-md text-sm font-medium border bg-white 
                            transition-all hover:bg-gray-100 
                            shadow-[0_0_6px_rgba(150,0,255,0.5)]">
            Explore More ✨
        </button>
        </div>

    {/* CENTER NAV LINKS */}
    <nav className="flex items-center gap-8 text-sm">
    <Link 
        to="/" 
        className="text-gray-900 hover:text-blue-600 transition-colors"
    >
        Home
    </Link>
    <div 
        className="flex items-center gap-1 cursor-pointer text-gray-900 hover:text-blue-600 transition-colors"
    >
        <span>Know My Vibe</span>
        <span>▾</span>
    </div>
    <Link 
        to="/wardrobe" 
        className="text-gray-900 hover:text-blue-600 transition-colors"
    >
        My Wardrobe
    </Link>
    <Link 
        to="/ask-ai" 
        className="text-gray-900 hover:text-blue-600 transition-colors"
    >
        Ask AI Pal
    </Link>
    <Link 
        to="/plan-outfit" 
        className="text-gray-900 hover:text-blue-600 transition-colors"
    >
        Plan Outfit
    </Link>
    </nav>


    {/* RIGHT USER ICON */}
    <div className="flex items-center gap-3">
    <img
        src={user.profilePicture || "/default_profile.jpg"}
        className="w-10 h-10 rounded-full object-cover border"
        alt="User"
    />
    <button
        onClick={handleLogout}
        className="px-4 py-1 bg-black text-white text-sm rounded-full"
    >
        Logout
    </button>
    </div>

    </div>
    </header>


        {/* MAIN CONTENT */}
        <main className="py-12 px-8 max-w-6xl mx-auto">
          <h1 className="text-3xl font-semibold mb-6 text-black">Profile</h1>

          <div className="bg-white/90 rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* LEFT COLUMN */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-medium mb-4 text-black">Personal Details</h2>

                  <Link to="/setup">
                    <button className="px-3 py-1 border rounded-md text-sm">
                      Edit
                    </button>
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="text-sm text-gray-600">First Name</label>
                    <input
                      readOnly
                      value={firstName}
                      className="mt-1 w-full bg-white text-black border rounded-md px-3 py-2"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="text-sm text-gray-600">Last Name</label>
                    <input
                      readOnly
                      value={lastName}
                      className="mt-1 w-full bg-white text-black border rounded-md px-3 py-2"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-sm text-gray-600">Email ID</label>
                    <input
                      readOnly
                      value={user.email || ""}
                      className="mt-1 w-full bg-white text-black border rounded-md px-3 py-2"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <input
                      readOnly
                      value={user.phone || ""}
                      className="mt-1 w-full bg-white text-black border rounded-md px-3 py-2"
                    />
                  </div>

                  {/* DOB */}
                  <div>
                    <label className="text-sm text-gray-600">DOB</label>
                    <input
                      readOnly
                      value={
                        user.dob
                          ? new Date(user.dob).toISOString().slice(0, 10)
                          : ""
                      }
                      className="mt-1 w-full bg-white text-black border rounded-md px-3 py-2"
                    />
                  </div>

                  {/* Style Preference */}
                  <div>
                    <label className="text-sm text-gray-600">
                      Style Preference
                    </label>
                    <input
                      readOnly
                      value={user.stylePreference || "both"}
                      className="mt-1 w-full bg-white text-black border rounded-md px-3 py-2"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="text-sm text-gray-600">Country</label>
                    <input
                      readOnly
                      value={user.country || ""}
                      className="mt-1 w-full bg-white text-black border rounded-md px-3 py-2"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="text-sm text-gray-600">City</label>
                    <input
                      readOnly
                      value={user.city || ""}
                      className="mt-1 w-full bg-white text-black border rounded-md px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN – PROFILE IMAGE */}
              <div className="md:w-80 flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden border border-gray-200 shadow">
                    <img
                      src={user.profilePicture || defaultPreview}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="mt-4 w-full">
                    <button
                      onClick={() => navigate("/setup")}
                      className="w-full px-4 py-2 bg-black text-white rounded-full"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

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

export default Profile;
