import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ItemC = (props) => {
    //console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const apagarItemPedido = async (id) => {
        console.log(id);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluiritempedido/" + id, { headers })
            .then((response) => {
                console.log(response.data.error);
                getItens();
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar-se a API.'
                });
            });
    }

    const getItens = async () => {
        await axios.get(api + "/servico/" + id + "/pedidos")
            .then((response) => {
                console.log(response.data.item);
                setData(response.data.item);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                })
                //console.log("Erro: sem conexão com a API.")
            })
    }

    useEffect(() => {
        getItens();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className='m-auto p-2'>
                        <h1>Itens do Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/cadastraritempedido" className="btn btn-outline-success btn-sm">Cadastrar Itens do pedido</Link>
                    </div>
                </div>
                {status.type == 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>PedidoId</th>
                            <th>ServiçoId</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.PedidoId}>
                                <td>{item.PedidoId}</td>
                                <td>{item.ServicoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.VALOR}</td>
                                <td className="text-center/">
                                    {/* <Link to={"/listar-servico/"}
                                    className="btn btn-outline-success btn-sm">
                                        Serviços
                                    </Link> */}
                                    <Link to={"/editar-item/" + item.PedidoId}
                                        className="btn btn-outline-warning btn-sm">Editar Itens do pedido
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarItemPedido(item.PedidoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};
