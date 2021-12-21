import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const InserirProduto = () => {

    const [produto, setProduto] = useState({
        nome: '',
        descricao: ''
    });

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const valorInput = e => setProduto({ ...produto, [e.target.name]: e.target.value })

    const cadProduto = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/produtos", produto, { headers })
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
                        <h1>Cadastrar Produto</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-produtos"
                            className="btn btn-outline-success btn-sm">Produtos</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                
                <hr className="m-1" />

                <Form className="p-2" onSubmit={cadProduto}>
                    <FormGroup className="p-2">
                        <Label>
                            Nome
                        </Label>
                        <Input
                            name="nome"
                            placeholder="Inserir o nome do produto"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Descrição
                        </Label>
                        <Input
                            name="descricao"
                            placeholder="Inserir descrição"
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