import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';
import { getUsuario, logout } from '../seguranca/Autenticacao';

function MenuPrivado() {
    const usuario = getUsuario();

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink className="navbar-brand" exact="true" to="/privado">
                        🦷 Clínica Odonto Sorriso
                    </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink className="nav-link" exact="true" to="/privado">Home</NavLink>
                            {usuario &&
                                <NavDropdown title="Manutenções" id="basic-nav-dropdown">
                                    <NavLink className="dropdown-item" to="dentistas">Dentistas</NavLink>
                                    <NavLink className="dropdown-item" to="pacientes">Pacientes</NavLink>
                                    <NavLink className="dropdown-item" to="consultas">Consultas</NavLink>
                                </NavDropdown>
                            }
                            <NavLink className="nav-link" to="sobre">Sobre</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <NavDropdown
                            title={usuario ? `👤 ${usuario.nome}` : 'Usuário'}
                            id="user-dropdown">
                            <NavLink className="dropdown-item" to="meu-usuario">
                                Meus dados
                            </NavLink>
                            {usuario &&
                                <NavLink className="dropdown-item" to="/"
                                    onClick={() => logout()}>
                                    Logout
                                </NavLink>
                            }
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default MenuPrivado;