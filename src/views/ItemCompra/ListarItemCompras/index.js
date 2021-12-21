import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";

import { api } from "../../../config";

export const ItemD = (props) => {
    //console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id, setId] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const apagarItemCompra = async (id) => {
        console.log(id);

        const headers = {
            'Content-type': 'application/json'
        }

        await axios.get(api + "/excluiritemcompra/" + id, { headers })
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
        await axios.get(api + "/produto/" + id + "/compras")
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
                        <h1>Itens da Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/cadastraritemcompra" className="btn btn-outline-success btn-sm">Cadastrar Itens da compra</Link>
                    </div>
                </div>
                {status.type == 'error' ? <Alert color="danger"> {status.message} </Alert> : ""}

                <Table striped>
                    <thead>
                        <tr>
                            <th>CompraId</th>
                            <th>ProdutoId</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Visualizar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.CompraId}>
                                <td>{item.CompraId}</td>
                                <td>{item.ProdutoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.VALOR}</td>
                                <td className="text-center/">
                                    {/* <Link to={"/listar-servico/"}
                                    className="btn btn-outline-success btn-sm">
                                        Serviços
                                    </Link> */}
                                    <Link to={"/editar-itemcompra/" + item.CompraId}
                                        className="btn btn-outline-warning btn-sm">Editar Itens da compra
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarItemCompra(item.CompraId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};