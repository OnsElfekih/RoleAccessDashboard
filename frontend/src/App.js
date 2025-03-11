import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/register"; // Créez cette page si elle n'existe pas
import Home from "./components/home"; // Page après connexion
import ListProducts from "./components/listProducts";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
function App() {
return (
<Router>
<Routes>
<Route path="/" element={<Login/>} />
<Route path="/register" element={<Register />} />
<Route path="/home" element={<Home />} />
<Route path="/listProducts" element={<ListProducts/>} />
<Route path="/dashboard" element={<Dashboard/>} />
</Routes>
</Router>
);
}
export default App;