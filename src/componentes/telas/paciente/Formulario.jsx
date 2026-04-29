import { useContext } from 'react';
import PacienteContext from './PacienteContext';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import Col from 'react-bootstrap/Col';

function Formulario() {
    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(PacienteContext);

    return (
        <Dialogo id="modalPaciente" titulo="Paciente"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm} setExibirForm={setExibirForm}>
            <Alerta alerta={alerta} />
            <Col xs={12}>
                <CampoEntrada value={objeto.codigo}
                    id="txtCodigo" name="codigo" label="Código"
                    tipo="number" onchange={handleChange}
                    readonly={true} maxCaracteres={10} />
            </Col>
            <Col xs={12}>
                <CampoEntrada value={objeto.nome}
                    id="txtNome" name="nome" label="Nome"
                    tipo="text" onchange={handleChange}
                    requerido={true} readonly={false}
                    msgvalido="Nome OK!" msginvalido="Informe o nome"
                    maxCaracteres={100} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.cpf}
                    id="txtCpf" name="cpf" label="CPF"
                    tipo="text" onchange={handleChange}
                    requerido={true} readonly={false}
                    msgvalido="CPF OK!" msginvalido="Informe o CPF"
                    maxCaracteres={14} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.data_nascimento ? objeto.data_nascimento.substring(0, 10) : ''}
                    id="txtNascimento" name="data_nascimento" label="Data de Nascimento"
                    tipo="date" onchange={handleChange}
                    requerido={true} readonly={false}
                    msgvalido="Data OK!" msginvalido="Informe a data de nascimento" />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.telefone}
                    id="txtTelefone" name="telefone" label="Telefone"
                    tipo="text" onchange={handleChange}
                    readonly={false} maxCaracteres={20} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.email}
                    id="txtEmail" name="email" label="Email"
                    tipo="email" onchange={handleChange}
                    readonly={false} maxCaracteres={100} />
            </Col>
        </Dialogo>
    );
}

export default Formulario;