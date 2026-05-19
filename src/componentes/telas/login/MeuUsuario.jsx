import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Carregando from '../../comuns/Carregando';
import { getToken, getUsuario } from '../../../seguranca/Autenticacao';

function MeuUsuario() {
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(true);
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [objeto, setObjeto] = useState({
        email: "", nome: "", telefone: "", senha: "", tipo: ""
    });

    const handleChange = (e) => {
        setObjeto({ ...objeto, [e.target.name]: e.target.value });
    };

    const recuperaUsuario = async () => {
        try {
            setCarregando(true);
            const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuario`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                }
            });
            const data = await response.json();
            setObjeto(data);
            setCarregando(false);
        } catch (err) {
            navigate("/login", { replace: true });
        }
    };

    const acaoAtualizar = async e => {
        e.preventDefault();
        try {
            setCarregando(true);
            const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/usuario`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                },
                body: JSON.stringify(objeto),
            });
            const json = await response.json();
            setAlerta({ status: json.status, message: json.message });
        } catch (err) {
            navigate("/login", { replace: true });
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        recuperaUsuario();
    }, []);

    const tipoLabel = objeto.tipo === 'A' ? '👑 Administrador' : '👤 Usuário comum';

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6" style={{ padding: '20px' }}>
                    <h1>Meus dados</h1>
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />
                        <form onSubmit={acaoAtualizar}>
                            <CampoEntrada value={objeto.email}
                                id="txtEmail" name="email" label="Email"
                                tipo="email" onchange={handleChange}
                                readonly={true} />
                            <CampoEntrada value={objeto.nome}
                                id="txtNome" name="nome" label="Nome"
                                tipo="text" onchange={handleChange}
                                msgvalido="Nome OK" msginvalido="Informe o nome"
                                requerido={true} readonly={false}
                                maxCaracteres={50} />
                            <CampoEntrada value={objeto.telefone}
                                id="txtTelefone" name="telefone" label="Telefone"
                                tipo="text" onchange={handleChange}
                                msgvalido="Telefone OK" msginvalido="Informe o telefone"
                                requerido={true} readonly={false}
                                maxCaracteres={14} />
                            <CampoEntrada value={objeto.senha}
                                id="txtSenha" name="senha" label="Nova senha"
                                tipo="password" onchange={handleChange}
                                msgvalido="Senha OK" msginvalido="Informe a senha"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                            <div className="mb-3 p-3 rounded"
                                style={{ background: '#f8f9fa', border: '1px solid #dee2e6' }}>
                                <small className="text-muted">Tipo de usuário</small>
                                <p className="mb-0 fw-bold">{tipoLabel}</p>
                            </div>
                            <button className="w-100 btn btn-lg btn-primary" type="submit">
                                Salvar alterações <i className="bi bi-save"></i>
                            </button>
                        </form>
                    </Carregando>
                </div>
            </div>
        </div>
    );
}

export default MeuUsuario;