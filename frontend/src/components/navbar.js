import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard as DashboardIcon, People as PeopleIcon, ShoppingCart as ShoppingCartIcon, ExitToApp as ExitToAppIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Cookies from "js-cookie"; // Importer js-cookie
const drawerWidth = 240;
const Navbar = () => {
const role = Cookies.get("role"); // Récupérer le rôle depuis les cookies
return (
<Drawer
sx={{ width: drawerWidth, flexShrink: 0, "& .MuiDrawer-paper": { width: drawerWidth, boxSizing: "borderbox" } }}
variant="permanent"
anchor="left"
>
<List>
<ListItem button component={Link} to="/dashboard">
<ListItemIcon><DashboardIcon /></ListItemIcon>
<ListItemText primary="Dashboard" />
</ListItem>
{/* Affichage conditionnel des liens réservés aux admins */}
{role === "admin" && (
<>
<ListItem button component={Link} to="/home">
<ListItemIcon><PeopleIcon /></ListItemIcon>
<ListItemText primary="Liste Utilisateurs" />
</ListItem>
<ListItem button component={Link} to="/listProducts">
<ListItemIcon><PeopleIcon /></ListItemIcon>
<ListItemText primary="Liste Produits" />
</ListItem>
</>
)}
<ListItem button component={Link} to="/logout">
<ListItemIcon><ExitToAppIcon /></ListItemIcon>
<ListItemText primary="Déconnexion" />
</ListItem>
</List>
</Drawer>
);
};
export default Navbar;