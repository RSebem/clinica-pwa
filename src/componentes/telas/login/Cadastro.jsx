import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Carregando from '../../comuns/Carregando';

function Cadastro() {
    const navigate = useNavigate();
    const [carregando, setCarregando] = useState(false);
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [objeto, setObjeto] = useState({
        nome: "", email: "", senha: "", telefone: ""
    });

    const handleChange = (e) => {
        setObjeto({ ...objeto, [e.target.name]: e.target.value });
    };

    const acaoCadastrar = async e => {
        e.preventDefault();
        try {
            setCarregando(true);
            const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cadastro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(objeto),
            });
            const json = await response.json();
            if (json.status === 'success') {
                setAlerta({ status: "success", message: "Cadastro realizado! Faça o login." });
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setAlerta({ status: "error", message: json.message });
            }
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao cadastrar: " + err.message });
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <Carregando carregando={carregando}>
                        <Alerta alerta={alerta} />
                        <form onSubmit={acaoCadastrar}>
                            <h1 className="h3 mb-3 fw-normal">🦷 Criar conta</h1>
                            <CampoEntrada value={objeto.nome}
                                id="txtNome" name="nome" label="Nome completo"
                                tipo="text" onchange={handleChange}
                                msgvalido="Nome OK" msginvalido="Informe seu nome"
                                requerido={true} readonly={false}
                                maxCaracteres={50} />
                            <CampoEntrada value={objeto.email}
                                id="txtEmail" name="email" label="Email"
                                tipo="email" onchange={handleChange}
                                msgvalido="Email OK" msginvalido="Informe seu email"
                                requerido={true} readonly={false}
                                maxCaracteres={50} />
                            <CampoEntrada value={objeto.senha}
                                id="txtSenha" name="senha" label="Senha"
                                tipo="password" onchange={handleChange}
                                msgvalido="Senha OK" msginvalido="Informe uma senha"
                                requerido={true} readonly={false}
                                maxCaracteres={40} />
                            <CampoEntrada value={objeto.telefone}
                                id="txtTelefone" name="telefone" label="Telefone"
                                tipo="text" onchange={handleChange}
                                msgvalido="Telefone OK" msginvalido="Informe seu telefone"
                                requerido={true} readonly={false}
                                maxCaracteres={14} />
                            <button className="w-100 btn btn-lg btn-success" type="submit">
                                Cadastrar
                            </button>
                            <button className="w-100 btn btn-lg btn-outline-secondary mt-2"
                                type="button" onClick={() => navigate("/login")}>
                                Já tenho conta — Fazer login
                            </button>
                        </form>
                    </Carregando>
                </div>
            </div>
        </div>
    );
}

export default Cadastro;