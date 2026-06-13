import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PacienteContext from './PacienteContext';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';
import {
    getPacientesAPI, getPacientePorCodigoAPI,
    deletePacientePorCodigoAPI, salvarPacienteAPI
} from '../../../servicos/PacienteServico';
import { getUsuario } from '../../../seguranca/Autenticacao';

function Paciente() {
    const navigate = useNavigate();
    const usuario = getUsuario();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [exibirForm, setExibirForm] = useState(false);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", cpf: "", data_nascimento: "", telefone: "", email: ""
    });

    const recuperaPacientes = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getPacientesAPI());
            setCarregando(false);
        } catch (err) {
            navigate("/login", { replace: true });
        }
    };

    const remover = async codigo => {
        if (window.confirm('Deseja remover este paciente?')) {
            try {
                let retornoAPI = await deletePacientePorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaPacientes();
            } catch (err) {
                navigate("/login", { replace: true });
            }
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ codigo: "", nome: "", cpf: "", data_nascimento: "", telefone: "", email: "" });
        setExibirForm(true);
    };

    const editarObjeto = async codigo => {
        try {
            const dados = await getPacientePorCodigoAPI(codigo);
            setObjeto(dados);
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (err) {
            navigate("/login", { replace: true });
        }
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await salvarPacienteAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            if (retornoAPI.objeto) setObjeto(retornoAPI.objeto);
            if (!editar) setEditar(true);
        } catch (err) {
            navigate("/login", { replace: true });
        }
        recuperaPacientes();
    };

    const handleChange = (e) => {
        setObjeto({ ...objeto, [e.target.name]: e.target.value });
    };
// eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        recuperaPacientes();
    }, []);

    return (
        <PacienteContext.Provider value={{
            alerta, setAlerta, listaObjetos, objeto,
            exibirForm, setExibirForm,
            novoObjeto, editarObjeto, remover,
            acaoCadastrar, handleChange,
            usuario
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </PacienteContext.Provider>
    );
}

export default Paciente;