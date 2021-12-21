import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const InserirCliente = () => {

    const [cliente, setCliente] = useState({
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

    const valorInput = e => setCliente({ ...cliente, [e.target.name]: e.target.value })

    const cadCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(api + "/clientes", cliente, { headers })
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
                        <h1>Cadastrar Clientes</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes"
                            className="btn btn-outline-success btn-sm">Clientes</Link>
                    </div>
                </div>

                {status.type === 'error' ? <Alert color="danger">{status.message}</Alert> : ""}

                {status.type === 'success' ? <Alert color="success">{status.message}</Alert> : ""}
                
                <hr className="m-1" />

                <Form className="p-2" onSubmit={cadCliente}>
                    <FormGroup className="p-2">
                        <Label>
                            Nome
                        </Label>
                        <Input
                            name="nome"
                            placeholder="Inserir o nome do cliente"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Endereço
                        </Label>
                        <Input
                            name="endereco"
                            placeholder="Inserir endereço"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Cidade
                        </Label>
                        <Input
                            name="cidade"
                            placeholder="Inserir cidade"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            UF
                        </Label>
                        <Input
                            name="uf"
                            placeholder="Inserir UF"
                            type="text"
                            onChange={valorInput}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Data de nascimento
                        </Label>
                        <Input
                            name="nascimento"
                            placeholder="Inserir data de nascimento"
                            type="text"
                            onChange={valorInput}     
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Cliente desde
                        </Label>
                        <Input
                            name="clienteDesde"
                            placeholder="Cliente desde"
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