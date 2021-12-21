import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const InserirItensCompra = () => {

    const [itemcompra, setItemCompra] = useState({
        CompraId: '',
        ProdutoId: '',
        quantidade: '',
        valor: ''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setItemCompra({ ...itemcompra, [e.target.name]: e.target.value })

    const cadItensCompra = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/itenscompras", itemcompra, { headers })
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
                        <h1>Cadastrar Itens da Compra</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-compras"
                            className="btn btn-outline-success btn-sm">Compras</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                
                <hr className="m-1" />

                <Form className="p-2" onSubmit={cadItensCompra}>
                    <FormGroup className="p-2">
                        <Label>
                            CompraId
                        </Label>
                        <Input
                            name="CompraId"
                            placeholder="Inserir Id da compra"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            ProdutoId
                        </Label>
                        <Input
                            name="ProdutoId"
                            placeholder="Inserir Id do produto"
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
                            placeholder="Quantidade"
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