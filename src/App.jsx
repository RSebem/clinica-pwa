import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core/dist/cjs/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Menu from './componentes/Menu';
import Home from './componentes/telas/Home';
import Sobre from './componentes/telas/Sobre';
import Dentista from './componentes/telas/dentista/Dentista';
import Paciente from './componentes/telas/paciente/Paciente';
import Consulta from './componentes/telas/consulta/Consulta';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Menu />,
    children: [
      { index: true, element: <Home /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/dentistas", element: <Dentista /> },
      { path: "/pacientes", element: <Paciente /> },
      { path: "/consultas", element: <Consulta /> },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;