import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const Pedidos = (props) => {

    //console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        await axios.get(api + "/cliente/" + id + "/pedidos")
            .then((response) => {
                console.log(response.data.ped);
                setData(response.data.ped);
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
    };

    const apagarPedido = async (id) => {
        console.log(id);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluirpedido/" + id, { headers })
            .then((response) => {
                console.log(response.data.error);
                getPedidos();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar-se a API.'
                });
            });
    }


    useEffect(() => {
        getPedidos();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Pedidos do Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes" className='m-auto btn btn-outline-success btn-sm'>Voltar</Link>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>ClienteId</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(ped => (
                            <tr key={ped.id}>
                                <td>{ped.id}</td>
                                <td>{ped.ClienteId}</td>
                                <td>{ped.data}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-pedidoc/"+ped.id}
                                        className="btn btn-outline-success btn-sm">
                                        Itens do pedido
                                    </Link>
                                    <Link to={"/editar-pedidos/" + ped.id}
                                        className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarPedido(ped.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}