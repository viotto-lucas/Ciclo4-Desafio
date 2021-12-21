import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarItem = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [PedidoId, setPedidoId] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [VALOR, setValor] = useState('');

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const clearItemped = e => {
        e.preventDefault();
        setQuantidade('');
        setValor('');
    } 

    const edtItem = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/pedidos/" + id, { PedidoId, quantidade, VALOR }, { headers })
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
        const getPedido = async () => {
            await axios.get(api + "/item-pedido/" + id)
                .then((response) => {
                    console.log('EDITAR ITEM TESTE',response.data.itemped)
                    setId(response.data.itemped.id);
                    setPedidoId(response.data.itemped.PedidoId);
                    setQuantidade(response.data.itemped.quantidade);
                    setValor(response.data.itemped.VALOR);
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
                        <h1>Editar Itens do Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to={"/listar-clientes"} className='m-auto btn btn-outline-success btn-sm'>Clientes</Link>
                    </div>
                    <hr className="m-1" />
                    {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                    {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                </div>
                <Form className="p-2" onSubmit={edtItem} onReset={clearItemped}>
                    <FormGroup className="p-2">
                        <Label>
                            Id
                        </Label>
                        <Input
                            readOnly="true"
                            name="id"
                            placeholder="Identificador do pedido"
                            type="text"
                            value={PedidoId}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Quantidade
                        </Label>
                        <Input
                            name="quantidade"
                            placeholder="Quantidade"
                            type="text"
                            value={quantidade}
                            onChange={e => setQuantidade(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Valor
                        </Label>
                        <Input
                            name="valor"
                            placeholder="Valor"
                            type="text"
                            value={VALOR}
                            onChange={e => setValor(e.target.value)}
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