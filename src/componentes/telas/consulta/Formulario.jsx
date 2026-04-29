import { useContext } from 'react';
import ConsultaContext from './ConsultaContext';
import Alerta from '../../comuns/Alerta';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function Formulario() {
const {
    objeto, handleChange, acaoCadastrar, alerta,
    exibirForm, setExibirForm,
    listaDentistas = [], listaPacientes = []
} = useContext(ConsultaContext);
    return (
        <Dialogo id="modalConsulta" titulo="Consulta"
            acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm} setExibirForm={setExibirForm}>
            <Alerta alerta={alerta} />
            <Col xs={12}>
                <CampoEntrada value={objeto.codigo}
                    id="txtCodigo" name="codigo" label="Código"
                    tipo="number" onchange={handleChange}
                    readonly={true} maxCaracteres={10} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada
                    value={objeto.data_hora ? objeto.data_hora.toString().substring(0, 16) : ''}
                    id="txtDataHora" name="data_hora" label="Data e Hora"
                    tipo="datetime-local" onchange={handleChange}
                    requerido={true} readonly={false}
                    msgvalido="OK!" msginvalido="Informe a data e hora" />
            </Col>
            <Col xs={12} md={6}>
                <FloatingLabel controlId="selStatus" label="Status" className="mb-3">
                    <Form.Select name="status" value={objeto.status} onChange={handleChange} required>
                        <option value="agendada">Agendada</option>
                        <option value="realizada">Realizada</option>
                        <option value="cancelada">Cancelada</option>
                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col xs={12}>
                <FloatingLabel controlId="selDentista" label="Dentista" className="mb-3">
                    <Form.Select name="dentista" value={objeto.dentista} onChange={handleChange} required>
                        <option value="">Selecione o dentista...</option>
                        {listaDentistas.map(d => (
                            <option key={d.codigo} value={d.codigo}>{d.nome} — {d.especialidade}</option>
                        ))}
                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col xs={12}>
                <FloatingLabel controlId="selPaciente" label="Paciente" className="mb-3">
                    <Form.Select name="paciente" value={objeto.paciente} onChange={handleChange} required>
                        <option value="">Selecione o paciente...</option>
                        {listaPacientes.map(p => (
                            <option key={p.codigo} value={p.codigo}>{p.nome} — {p.cpf}</option>
                        ))}
                    </Form.Select>
                </FloatingLabel>
            </Col>
            <Col xs={12}>
                <FloatingLabel controlId="txtObservacao" label="Observação" className="mb-3">
                    <Form.Control
                        as="textarea"
                        name="observacao"
                        value={objeto.observacao || ''}
                        onChange={handleChange}
                        style={{ height: '80px' }}
                    />
                </FloatingLabel>
            </Col>
        </Dialogo>
    );
}

export default Formulario;