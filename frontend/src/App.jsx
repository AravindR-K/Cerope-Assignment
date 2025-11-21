import './App.css'
import Register from './Register'
import { Routes, Route } from "react-router-dom";
import Setup from './Setup'
import SignIn from "./SignIn";   
import Profile from "./profile";

function App() {
  return (<Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/setup" element={<Setup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
    </Routes> )
}

export default App
