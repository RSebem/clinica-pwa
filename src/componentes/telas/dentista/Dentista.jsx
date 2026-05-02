import { useState, useEffect } from 'react';
import DentistaContext from './DentistaContext';
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';
import {
    getDentistasAPI, getDentistaPorCodigoAPI,
    deleteDentistaPorCodigoAPI, salvarDentistaAPI
} from '../../../servicos/DentistaServico';

function Dentista() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [exibirForm, setExibirForm] = useState(false);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", especialidade: "", cro: "", telefone: ""
    });

    const recuperaDentistas = async () => {
        setCarregando(true);
        setListaObjetos(await getDentistasAPI());
        setCarregando(false);
    };

    const remover = async codigo => {
        if (window.confirm('Deseja remover este dentista?')) {
            let retornoAPI = await deleteDentistaPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperaDentistas();
        }
    };

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ codigo: "", nome: "", especialidade: "", cro: "", telefone: "" });
        setExibirForm(true);
    };

const editarObjeto = async codigo => {
    const dados = await getDentistaPorCodigoAPI(codigo);
    setObjeto(dados);
    setEditar(true);
    setAlerta({ status: "", message: "" });
    setExibirForm(true);
};

const acaoCadastrar = async e => {
    e.preventDefault();
    const metodo = editar ? "PUT" : "POST";
    try {
        let retornoAPI = await salvarDentistaAPI(objeto, metodo);
        setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
        if (retornoAPI.objeto) {
            setObjeto(retornoAPI.objeto);
        }
        if (!editar) setEditar(true);
    } catch (err) {
        console.error(err.message);
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
            acaoCadastrar, handleChange
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </DentistaContext.Provider>
    );
}

export default Dentista;