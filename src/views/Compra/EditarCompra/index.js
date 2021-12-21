import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCompra = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [data, setData] = useState('');
    const [ClienteId, setClienteId] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const clearComp = e => {
        e.preventDefault();
        setData('');
        setClienteId('');
    } 

    const edtCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/compras/" + id, { id, data, ClienteId }, { headers })
            .then((response) => {
                setStatus({
                    type: 'success',
                    message: 'Alteração feita com suceso.'
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
        const getCompra = async () => {
            await axios.get(api + "/compras/" + id)
                .then((response) => {
                    setId(response.data.id);
                    setData(response.data.data);
                    setClienteId(response.data.ClienteId);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getCompra();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/listar-clientes/"} className='m-auto btn btn-outline-success btn-sm'>Clientes</Link>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-compras" className='m-auto btn btn-outline-success btn-sm'>Compras</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                    {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                </div>
                <Form className="p-2" onSubmit={edtCompra} onReset={clearComp}>
                    <FormGroup className="p-2">
                        <Label>
                            Id
                        </Label>
                        <Input
                            name="id"
                            placeholder="Identificador do pedido"
                            type="text"
                            defaultValue={id}
                            readOnly="true"
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Data
                        </Label>
                        <Input
                            name="data"
                            placeholder="Informar a data do pedido"
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
                            placeholder="Id do cliente"
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