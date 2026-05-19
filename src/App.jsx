import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './componentes/telas/Home';
import Sobre from './componentes/telas/Sobre';
import Login from './componentes/telas/login/Login';
import Cadastro from './componentes/telas/login/Cadastro';
import MeuUsuario from './componentes/telas/login/MeuUsuario';
import Dentista from './componentes/telas/dentista/Dentista';
import Paciente from './componentes/telas/paciente/Paciente';
import Consulta from './componentes/telas/consulta/Consulta';
import MenuPublico from './componentes/MenuPublico';
import MenuPrivado from './componentes/MenuPrivado';
import WithAuth from './seguranca/WithAuth';

const DentistaProtegido = WithAuth(Dentista);
const PacienteProtegido = WithAuth(Paciente);
const ConsultaProtegida = WithAuth(Consulta);
const MeuUsuarioProtegido = WithAuth(MeuUsuario);

const router = createBrowserRouter([
    {
        path: "/",
        element: <MenuPublico />,
        children: [
            { index: true, element: <Home /> },
            { path: "/sobre", element: <Sobre /> },
            { path: "/login", element: <Login /> },
            { path: "/cadastro", element: <Cadastro /> },
        ]
    },
    {
        path: "/privado",
        element: <MenuPrivado />,
        children: [
            { index: true, element: <Home /> },
            { path: "sobre", element: <Sobre /> },
            { path: "dentistas", element: <DentistaProtegido /> },
            { path: "pacientes", element: <PacienteProtegido /> },
            { path: "consultas", element: <ConsultaProtegida /> },
            { path: "meu-usuario", element: <MeuUsuarioProtegido /> },
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;