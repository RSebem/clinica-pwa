import { useContext } from 'react';
import PacienteContext from './PacienteContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function Tabela() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto, usuario } = useContext(PacienteContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Pacientes</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {listaObjetos.length === 0 && <p className="mt-3">Nenhum paciente encontrado.</p>}
            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive className="mt-3">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>CPF</th>
                            <th>Nascimento</th>
                            <th>Telefone</th>
                            <th>Email</th>
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
                                    {usuario && usuario.tipo === 'A' &&
                                        <Button variant="danger"
                                            onClick={() => remover(objeto.codigo)}>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    }
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                                <td>{objeto.cpf}</td>
                                <td>{objeto.data_nascimento ? new Date(objeto.data_nascimento).toLocaleDateString('pt-BR') : ''}</td>
                                <td>{objeto.telefone}</td>
                                <td>{objeto.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}

export default Tabela;