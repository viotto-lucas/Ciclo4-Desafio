import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "reactstrap";
import { api } from "../../../config";

export const Compras = (props) => {

    //console.log(props.match.params.id);

    const [data, setData] = useState([]);

    const [id] = useState(props.match.params.id);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getCompras = async () => {
        await axios.get(api + "/cliente/" + id + "/compras")
            .then((response) => {
                console.log(response.data.comp);
                setData(response.data.comp);
            })
            .catch(() => {
                console.log("Erro: sem conexão com a API.")
            })
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
    }, [id]);

    return (
        <div>
            <Container>
            <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Compras do Cliente</h1>
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
                        {data.map(comp => (
                            <tr key={comp.id}>
                                <td>{comp.id}</td>
                                <td>{comp.ClienteId}</td>
                                <td>{comp.data}</td>
                                <td className="text-center/">
                                    <Link to={"/listar-compra/"+comp.id}
                                        className="btn btn-outline-success btn-sm">
                                        Itens da compra
                                    </Link>
                                    <Link to={"/editar-compras/"+comp.id}
                                    className="btn btn-outline-warning btn-sm">Editar</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                        onClick={() => apagarCompra(comp.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}