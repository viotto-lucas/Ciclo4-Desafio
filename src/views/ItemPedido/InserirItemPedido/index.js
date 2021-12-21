import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const InserirItensPedido = () => {

    const [itempedido, setItemPedido] = useState({
        PedidoId: '',
        ServicoId: '',
        quantidade: '',
        valor: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemPedido({ ...itempedido, [e.target.name]: e.target.value })

    const cadItensPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/itenspedidos", itempedido, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    });
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    })
                }
            })
            .catch(() => {
                console.log("Erro: Sem conexão com a API.")
            })
    }

    return (
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Cadastrar Itens do Pedido</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-pedidos"
                            className="btn btn-outline-success btn-sm">Pedidos</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                
                <hr className="m-1" />

                <Form className="p-2" onSubmit={cadItensPedido}>
                    <FormGroup className="p-2">
                        <Label>
                            PedidoId
                        </Label>
                        <Input
                            name="PedidoId"
                            placeholder="Inserir Id do pedido"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            ServicoId
                        </Label>
                        <Input
                            name="ServicoId"
                            placeholder="Inserir Id do serviço"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Quantidade
                        </Label>
                        <Input
                            name="quantidade"
                            placeholder="Quantidade de itens"
                            type="text"
                            onChange={valorInput}
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
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <Button type="submit" outline color="success">
                        Cadastro
                    </Button>
                    <Button type="reset" outline color="warning">
                        Limpar
                    </Button>
                </Form>
            </Container>
    )
}