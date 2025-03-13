import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/register"; // Créez cette page si elle n'existe pas
import Home from "./components/home"; // Page après connexion
import ListProducts from "./components/listProducts";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import Navbar from "./components/navbar";
import Logout from "./components/logout";
function App() {
return (
<Router>
<Routes>
<Route path="/" element={<Login/>} />
<Route path="/register" element={<Register />} />
<Route path="/home" element={<Home />} />
<Route path="/listProducts" element={<ListProducts/>} />
<Route path="/dashboard" element={<Dashboard/>} />
<Route path="/navbar" element={<Navbar/>} />
<Route path="/logout" element={<Logout/>} />
</Routes>
</Router>
);
}
export default App;