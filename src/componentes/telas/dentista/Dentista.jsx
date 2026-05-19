import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DentistaContext from './DentistaContext';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';
import {
    getDentistasAPI, getDentistaPorCodigoAPI,
    deleteDentistaPorCodigoAPI, salvarDentistaAPI
} from '../../../servicos/DentistaServico';
import { getUsuario } from '../../../seguranca/Autenticacao';

function Dentista() {
    const navigate = useNavigate();
    const usuario = getUsuario();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [exibirForm, setExibirForm] = useState(false);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", especialidade: "", cro: "", telefone: ""
    });

    const recuperaDentistas = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getDentistasAPI());
            setCarregando(false);
        } catch (err) {
            navigate("/login", { replace: true });
        }
    };

    const remover = async codigo => {
        if (window.confirm('Deseja remover este dentista?')) {
            try {
                let retornoAPI = await deleteDentistaPorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaDentistas();
            } catch (err) {
                navigate("/login", { replace: true });
            }
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ codigo: "", nome: "", especialidade: "", cro: "", telefone: "" });
        setExibirForm(true);
    };

    const editarObjeto = async codigo => {
        try {
            const dados = await getDentistaPorCodigoAPI(codigo);
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
            let retornoAPI = await salvarDentistaAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            if (retornoAPI.objeto) setObjeto(retornoAPI.objeto);
            if (!editar) setEditar(true);
        } catch (err) {
            navigate("/login", { replace: true });
        }
        recuperaDentistas();
    };

    const handleChange = (e) => {
        setObjeto({ ...objeto, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        recuperaDentistas();
    }, []);

    return (
        <DentistaContext.Provider value={{
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
        </DentistaContext.Provider>
    );
}

export default Dentista;