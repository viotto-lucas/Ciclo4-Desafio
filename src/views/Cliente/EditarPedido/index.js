import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarPedido = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const clearPed = e => {
        e.preventDefault();
        setData('');
        setClienteId('');
    } 

    const edtPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };
        console.log('Enviando dados',{ id, data, ClienteId })
        await axios.put(api + "/pedidos/" + id, { id, data, ClienteId }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração feita com sucesso.'
                })
                console.log(response.data.type);
                console.log(response.data.message);
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: 'Não foi possível conectar a API.'
                });
            });
    };

    useEffect(() => {
        const getPedido = async () => {
            await axios.get(api + "/pedidos/" + id)
                .then((response) => {
                    console.log('OLÁ',response)
                    setId(response.data.id);
                    setData(response.data.data);
                    setClienteId(response.data.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getPedido();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/listar-clientes/"} className='m-auto btn btn-outline-success btn-sm'>Clientes</Link>
                    </div>
                    <div className="p-2">
                        <Link to={"/listar-pedidos/"} className='m-auto btn btn-outline-success btn-sm'>Pedidos</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                    {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                </div>
                <hr className="m-1" />
                <Form className="p-2" onSubmit={edtPedido} onReset={clearPed}>
                    <FormGroup className="p-2">
                        <Label>
                            Id
                        </Label>
                        <Input
                            name="id"
                            readOnly="true"
                            placeholder="Identificador do pedido"
                            type="text"
                            defaultValue={id}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Data
                        </Label>
                        <Input
                            name="data"
                            placeholder="Inserir data do pedido"
                            type="text"
                            value={data}
                            onChange={e => setData(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            ID do Cliente
                        </Label>
                        <Input
                            name="ClienteId"
                            placeholder="Inserir ClienteId"
                            type="text"
                            value={ClienteId}
                            onChange={e => setClienteId(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="d-flex">
                        <Button type="submit" outline color="success">
                            Salvar
                        </Button>
                        <Button type="reset" outline color="warning">
                            Limpar
                        </Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    )
}