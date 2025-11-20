import './App.css'
import Register from './Register'
import { Routes, Route } from "react-router-dom";
import Setup from './Setup'

function App() {
  return (<Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/setup" element={<Setup />} />
    </Routes> )
}

export default App
