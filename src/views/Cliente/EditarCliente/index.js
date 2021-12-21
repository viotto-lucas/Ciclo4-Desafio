import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarCliente = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState(props.match.params.nome);
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [clienteDesde, setClienteDesde] = useState('');
    

    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const clearClient = e => {
        e.preventDefault();
        setNome('');
        setEndereco('');
        setCidade('');
        setUf('');
        setNascimento('');
        setClienteDesde('');
    } 

    const edtCliente = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/clientes/" + id, { id, nome, endereco, cidade, uf, nascimento, clienteDesde }, { headers })
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
        const getCliente = async () => {
            console.log('Id CLIENTES', id)
            await axios.get(api + "/clientes/" + id)
                .then((response) => {
                    console.log('RESP', response)
                    setId(response.data.client.id);
                    setNome(response.data.client.nome);
                    setEndereco(response.data.client.endereco);
                    setCidade(response.data.client.cidade);
                    setUf(response.data.client.uf);
                    setNascimento(response.data.client.nascimento);
                    setClienteDesde(response.data.client.clienteDesde);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getCliente();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Cliente</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-clientes" className='m-auto btn btn-outline-success btn-sm'>Clientes</Link>
                    </div>
                    {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                    {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                </div>
                <hr className="m-1" />
                <Form className="p-2" onSubmit={edtCliente} onReset={clearClient}>
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
                            Nome
                        </Label>
                        <Input
                            name="nome"
                            placeholder="Inserir nome do cliente"
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Endereço
                        </Label>
                        <Input
                            name="endereco"
                            placeholder="Inserir Endereço"
                            type="text"
                            value={endereco}
                            onChange={e => setEndereco(e.target.value)}
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
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
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
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Nascimento
                        </Label>
                        <Input
                            name="nascimento"
                            placeholder="Inserir data de nascimento"
                            type="text"
                            value={nascimento}
                            onChange={e => setNascimento(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Cliente Desde
                        </Label>
                        <Input
                            name="clienteDesde"
                            placeholder="Cliente desde"
                            type="text"
                            value={clienteDesde}
                            onChange={e => setClienteDesde(e.target.value)}
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