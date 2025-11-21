import './App.css'
import Register from './Register'
import { Routes, Route } from "react-router-dom";
import Setup from './Setup'
import SignIn from "./SignIn";   

function App() {
  return (<Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/setup" element={<Setup />} />
      <Route path="/signin" element={<SignIn />} />

    </Routes> )
}

export default App
