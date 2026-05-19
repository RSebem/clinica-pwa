import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConsultaContext from './ConsultaContext';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';
import {
    getConsultasAPI, getConsultaPorCodigoAPI,
    deleteConsultaPorCodigoAPI, salvarConsultaAPI
} from '../../../servicos/ConsultaServico';
import { getDentistasAPI } from '../../../servicos/DentistaServico';
import { getPacientesAPI } from '../../../servicos/PacienteServico';
import { getUsuario } from '../../../seguranca/Autenticacao';

function Consulta() {
    const navigate = useNavigate();
    const usuario = getUsuario();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [exibirForm, setExibirForm] = useState(false);
    const [editar, setEditar] = useState(false);
    const [listaDentistas, setListaDentistas] = useState([]);
    const [listaPacientes, setListaPacientes] = useState([]);
    const [objeto, setObjeto] = useState({
        codigo: "", data_hora: "", status: "agendada",
        observacao: "", dentista: "", paciente: ""
    });

    const recuperaConsultas = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getConsultasAPI());
            setCarregando(false);
        } catch (err) {
            navigate("/login", { replace: true });
        }
    };

    const remover = async codigo => {
        if (window.confirm('Deseja remover esta consulta?')) {
            try {
                let retornoAPI = await deleteConsultaPorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaConsultas();
            } catch (err) {
                navigate("/login", { replace: true });
            }
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "", data_hora: "", status: "agendada",
            observacao: "", dentista: "", paciente: ""
        });
        setExibirForm(true);
    };

    const editarObjeto = async codigo => {
        try {
            const dados = await getConsultaPorCodigoAPI(codigo);
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
            let retornoAPI = await salvarConsultaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            if (retornoAPI.objeto) setObjeto(retornoAPI.objeto);
            if (!editar) setEditar(true);
        } catch (err) {
            navigate("/login", { replace: true });
        }
        recuperaConsultas();
    };

    const handleChange = (e) => {
        setObjeto({ ...objeto, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        recuperaConsultas();
        getDentistasAPI().then(data => {
            setListaDentistas(Array.isArray(data) ? data : []);
        }).catch(() => navigate("/login", { replace: true }));
        getPacientesAPI().then(data => {
            setListaPacientes(Array.isArray(data) ? data : []);
        }).catch(() => navigate("/login", { replace: true }));
    }, []);

    return (
        <ConsultaContext.Provider value={{
            alerta, setAlerta, listaObjetos, objeto,
            exibirForm, setExibirForm,
            novoObjeto, editarObjeto, remover,
            acaoCadastrar, handleChange,
            listaDentistas, listaPacientes,
            usuario
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </ConsultaContext.Provider>
    );
}

export default Consulta;