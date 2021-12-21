import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarCompra = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras = async () => {
        await axios.get(api + "/listacompras")
            .then((response) => {
                //console.log(response.data.clientes);
                setData(response.data.compras);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                });
                //console.log("Erro: sem conexão com a API.")
            });
    };

    const apagarCompra = async (id) => {
        console.log(id);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluircompra/" + id, { headers })
            .then((response) => {
                console.log(response.data.error);
                getCompras();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar-se a API.'
                });
            });
    }

    useEffect(() => {
        getCompras();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Compras Cadastradas</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/cadastrar-compra" className="btn btn-outline-success btn-sm">Cadastrar</Link>
                    </div>
                </div>
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Data</th>
                            <th>ClienteId</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(compras => (
                            <tr key={compras.id}>
                                <td>{compras.id}</td>
                                <td>{compras.data}</td>
                                <td>{compras.ClienteId}</td>
                                <td className="text-center/">
                                    {/* <Link to={"/compras-cliente/" + compras.id}
                                        className="btn btn-outline-success btn-sm">
                                        Consultar
                                    </Link> */}
                                    <Link to={"/editar-compras/"+ compras.id} className="btn btn-outline-warning btn-sm">Editar compra</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarCompra(compras.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};