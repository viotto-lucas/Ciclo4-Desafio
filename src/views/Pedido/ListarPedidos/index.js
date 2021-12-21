import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarPedido = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getPedidos = async () => {
        await axios.get(api + "/listapedidos")
            .then((response) => {
                //console.log(response.data.clientes);
                setData(response.data.pedidos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                });
                //console.log("Erro: sem conexão com a API.")
            });
    };

    const apagarPedido = async(id) =>{
        console.log(id);

        const headers={
            'Content-type':'application/json'
        }

        await axios.get(api+"/excluirpedido/"+id, {headers})
        .then((response) =>{
            console.log(response.data.error);
            getPedidos();
        })
        .catch(()=>{
            setStatus({
                type:'error',
                message:'Não foi possível conectar-se a API.'
            });
        });
    }

    useEffect(() => {
        getPedidos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className='m-auto p-2'>
                        <h1>Pedidos Cadastrados</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/cadastrar-pedido" className="btn btn-outline-success btn-sm">Cadastrar pedido</Link>
                    </div>
                </div>
                {/* <hr className="m-1" /> */}
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert>: ""}
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
                        {data.map(pedidos => (
                            <tr key={pedidos.id}>
                                <td>{pedidos.id}</td>
                                <td>{pedidos.data}</td>
                                <td>{pedidos.ClienteId}</td>
                                <td className="text-center/">
                                    {/* <Link to={"/pedidos-cliente/" + pedidos.id} className="btn btn-outline-success btn-sm">Consultar pedido</Link> */}
                                    <Link to={"/editar-pedidos/"+ pedidos.id} className="btn btn-outline-warning btn-sm">Editar pedido</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={( ) => apagarPedido(pedidos.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};