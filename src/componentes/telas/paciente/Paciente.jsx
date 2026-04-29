import { useState, useEffect } from 'react';
import PacienteContext from './PacienteContext';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';
import {
    getPacientesAPI, getPacientePorCodigoAPI,
    deletePacientePorCodigoAPI, salvarPacienteAPI
} from '../../../servicos/PacienteServico';

function Paciente() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [exibirForm, setExibirForm] = useState(false);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", cpf: "", data_nascimento: "", telefone: "", email: ""
    });

    const recuperaPacientes = async () => {
        setCarregando(true);
        setListaObjetos(await getPacientesAPI());
        setCarregando(false);
    };

    const remover = async codigo => {
        if (window.confirm('Deseja remover este paciente?')) {
            let retornoAPI = await deletePacientePorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaPacientes();
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ codigo: "", nome: "", cpf: "", data_nascimento: "", telefone: "", email: "" });
        setExibirForm(true);
    };

    const editarObjeto = async codigo => {
        setObjeto(await getPacientePorCodigoAPI(codigo));
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await salvarPacienteAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) setEditar(true);
        } catch (err) {
            console.error(err.message);
        }
        recuperaPacientes();
    };

    const handleChange = (e) => {
        setObjeto({ ...objeto, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        recuperaPacientes();
    }, []);

    return (
        <PacienteContext.Provider value={{
            alerta, setAlerta, listaObjetos, objeto,
            exibirForm, setExibirForm,
            novoObjeto, editarObjeto, remover,
            acaoCadastrar, handleChange
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </PacienteContext.Provider>
    );
}

export default Paciente;