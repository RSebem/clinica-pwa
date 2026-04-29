import { useContext } from 'react';
import ConsultaContext from './ConsultaContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button, Badge } from 'react-bootstrap';

function Tabela() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(ConsultaContext);

    const corStatus = (status) => {
        if (status === 'agendada') return 'primary';
        if (status === 'realizada') return 'success';
        if (status === 'cancelada') return 'danger';
        return 'secondary';
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Consultas</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Nova <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {listaObjetos.length === 0 && <p className="mt-3">Nenhuma consulta encontrada.</p>}
            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>Código</th>
                            <th>Data/Hora</th>
                            <th>Status</th>
                            <th>Dentista</th>
                            <th>Paciente</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.codigo}>
                                <td align="center">
                                    <Button variant="info" className="me-1"
                                        onClick={() => editarObjeto(objeto.codigo)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger"
                                        onClick={() => remover(objeto.codigo)}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{new Date(objeto.data_hora).toLocaleString('pt-BR')}</td>
                                <td><Badge bg={corStatus(objeto.status)}>{objeto.status}</Badge></td>
                                <td>{objeto.dentista_nome}</td>
                                <td>{objeto.paciente_nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default Tabela;