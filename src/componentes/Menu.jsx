import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';

function Menu() {
    return (
        <div>
            {/* Adicionado shadow-sm e border-bottom para um visual mais moderno */}
            <Navbar expand="lg" className="bg-white shadow-sm border-bottom">
                <Container>
                    <NavLink className="navbar-brand fw-bold text-primary" to="/">
                        🦷 Clínica Odonto Sorriso
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto"> {/* ms-auto alinha os itens à direita */}
                            <NavLink className="nav-link" to="/">Home</NavLink>
                            
                            <NavDropdown title="Manutenções" id="basic-nav-dropdown">
                                <NavLink className="dropdown-item" to="/dentistas">Dentistas</NavLink>
                                <NavLink className="dropdown-item" to="/pacientes">Pacientes</NavLink>
                                <NavLink className="dropdown-item" to="/consultas">Consultas</NavLink>
                            </NavDropdown>
                            
                            <NavLink className="nav-link" to="/sobre">Sobre</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Container com margin-top para o conteúdo não ficar colado no menu */}
            <Container className="mt-4">
                <Outlet />
            </Container>
        </div>
    );
}

export default Menu;