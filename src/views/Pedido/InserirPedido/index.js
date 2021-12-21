import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const InserirPedido = () => {

    const [pedido, setPedido] = useState({
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
        nascimento: '',
        clienteDesde: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setPedido({ ...pedido, [e.target.name]: e.target.value })

    const cadPedido = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/pedidos", pedido, { headers })
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
                        <h1>Cadastrar Pedidos</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-pedidos"
                            className="btn btn-outline-success btn-sm">Pedidos</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                
                <hr className="m-1" />

                <Form className="p-2" onSubmit={cadPedido}>
                    <FormGroup className="p-2">
                        <Label>
                            Id
                        </Label>
                        <Input
                            name="data"
                            placeholder="Inserir Id do pedido"
                            type="text"
                            onChange={valorInput}
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
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            ClienteId
                        </Label>
                        <Input
                            name="ClienteId"
                            placeholder="Inserir Id do cliente"
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