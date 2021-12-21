import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Container, Table } from "reactstrap";
import { api } from "../../../config";

export const ListarProduto = () => {

    const [data, setData] = useState([]);

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const getProdutos = async () => {
        await axios.get(api + "/listaprodutos")
            .then((response) => {
                //console.log(response.data.clientes);
                setData(response.data.produtos);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Erro: sem conexão com a API.'
                });
                //console.log("Erro: sem conexão com a API.")
            });
    };

    const apagarProduto = async(id) =>{
        console.log(id);

        const headers={
            'Content-type':'application/json'
        }

        await axios.get(api+"/excluirproduto/"+id, {headers})
        .then((response) =>{
            console.log(response.data.error);
            getProdutos();
        })
        .catch(()=>{
            setStatus({
                type:'error',
                message:'Não foi possível conectar-se a API.'
            });
        });
    }

    useEffect(() => {
        getProdutos();
    }, []);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className='m-auto p-2'>
                        <h1>Produtos Cadastrados</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/cadastrar-produto" className="btn btn-outline-success btn-sm">Cadastrar Produto</Link>
                    </div>
                </div>
                {/* <hr className="m-1" /> */}
                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert>: ""}
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Produto</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(produtos => (
                            <tr key={produtos.id}>
                                <td>{produtos.id}</td>
                                <td>{produtos.nome}</td>
                                <td>{produtos.descricao}</td>
                                <td className="text-center/">
                                    {/* <Link to={"/pedidos-cliente/" + produtos.id} className="btn btn-outline-success btn-sm">Consultar</Link> */}
                                    <Link to={"/editar-produtos/"+ produtos.id} className="btn btn-outline-warning btn-sm">Editar produto</Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={( ) => apagarProduto(produtos.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};