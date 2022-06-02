import {useRoutes,Link} from "react-router-dom";
import {Navbar,Nav,NavItem} from 'reactstrap';
import Home from "./Home";
import About from "./About";
import CreateUser from "./CreateUser";
import Comments from "./Comments";
import '../Styles/Navbar.css'

function NavbarMain(){
    let navRoutes = useRoutes([
        { path: "/", element: <Home /> },
        { path: "about", element: <About /> },
        { path: "createuser", element: <CreateUser/> },
        { path: "comments/:userid", element: <Comments/> }
    ]);
    return(
        <div>
           <div>
                <Navbar
                    expand="md"
                    dark
                >
                    <Link to="/" className="nav-brand navHead">
                        REVIEW ME
                    </Link>
                    <div className="navSpace"></div>
                        <Nav
                            className="me-auto"
                            navbar
                        >
                            <NavItem>
                                <Link to="/createuser" className="nav-link">
                                    NEW USER
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/about" className="nav-link">
                                    ABOUT ME
                                </Link>
                            </NavItem>
                        </Nav>
                </Navbar>
            </div>
        {navRoutes}
        </div>
    );
}

export default NavbarMain;

