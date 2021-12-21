import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarCliente = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getClientes = async () => {
        await axios.get(api + "/listaclientes")
            .then((response) => {
                console.log(response.data.clientes);
                setData(response.data.clientes);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                });
                console.log("Erro: sem conexão com a API.")
            });
    };

    const apagarCliente = async(id) =>{
        console.log(id);

        const headers={
            'Content-type':'application/json'
        }

        await axios.get(api+"/excluircliente/"+id, {headers})
        .then((response) =>{
            console.log(response.data.error);
            getClientes();
        })
        .catch(()=>{
            setStatus({
                type:'error',
                message:'Não foi possível conectar-se a API.'
            });
        });
    }

    useEffect(() => {
        getClientes();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className='m-auto p-2'>
                        <h1>Clientes Cadastrados</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/cadastrar-cliente" className="btn btn-outline-success btn-sm">Cadastrar cliente</Link>
                    </div>
                </div>
                {/* <hr className="m-1" /> */}
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert>: ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Data de nascimento</th>
                            <th>Cliente desde</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(clientes => (
                            <tr key={clientes.id}>
                                <td>{clientes.id}</td>
                                <td>{clientes.nome}</td>
                                <td>{clientes.endereco}</td>
                                <td>{clientes.cidade}</td>
                                <td>{clientes.uf}</td>
                                <td>{clientes.nascimento}</td>
                                <td>{clientes.clienteDesde}</td>
                                <td className="text-center/">
                                    <Link to={"/pedidos-cliente/" + clientes.id} className="btn btn-outline-success btn-sm">Consultar pedido</Link>
                                    <Link to={"/compras-cliente/" + clientes.id} className="btn btn-outline-primary btn-sm">Consultar compra</Link>
                                    <Link to={"/editar-clientes/"+ clientes.id} className="btn btn-outline-warning btn-sm">Editar cliente</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={( ) => apagarCliente(clientes.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};