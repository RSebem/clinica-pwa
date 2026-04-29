import { useContext } from 'react';
import DentistaContext from './DentistaContext';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import Col from 'react-bootstrap/Col';

function Formulario() {
    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(DentistaContext);

    return (
        <Dialogo id="modalDentista" titulo="Dentista"
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
            <Col xs={12}>
                <CampoEntrada value={objeto.especialidade}
                    id="txtEspecialidade" name="especialidade" label="Especialidade"
                    tipo="text" onchange={handleChange}
                    requerido={true} readonly={false}
                    msgvalido="OK!" msginvalido="Informe a especialidade"
                    maxCaracteres={100} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.cro}
                    id="txtCro" name="cro" label="CRO"
                    tipo="text" onchange={handleChange}
                    requerido={true} readonly={false}
                    msgvalido="OK!" msginvalido="Informe o CRO"
                    maxCaracteres={20} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.telefone}
                    id="txtTelefone" name="telefone" label="Telefone"
                    tipo="text" onchange={handleChange}
                    readonly={false} maxCaracteres={20} />
            </Col>
        </Dialogo>
    );
}

export default Formulario;