import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { api } from "../../../config";

export const EditarServico = (props) => {

    const [id, setId] = useState(props.match.params.id);
    const [nome, setNome] = useState(props.match.params.nome);
    const [descricao, setDescricao] = useState('');
    
    const [status, setStatus] = useState({
        type: '',
        message: ''
    });

    const clearServ = e => {
        e.preventDefault();
        setNome('');
        setDescricao('');
    } 

    const edtServico = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        await axios.put(api + "/servicos/"+id, { id, nome, descricao }, { headers })
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
        const getServico = async () => {
            await axios.get(api + "/servicos/" + id)
                .then((response) => {
                    setId(response.data.id);
                    setNome(response.data.nome);
                    setDescricao(response.data.descricao);
                })
                .catch(() => {
                    console.log("Erro: não foi possível se conectar a API.")
                })
        }
        getServico();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Editar Serviço</h1>
                    </div>
                    <div className="p-2">
                        <Link to="/listar-servicos" className='m-auto btn btn-outline-success btn-sm'>Serviços</Link>
                    </div>
                    {status.type === "error" ? <Alert color="danger">{status.message}</Alert> : ""}
                    {status.type === "success" ? <Alert color="success">{status.message}</Alert> : ""}
                </div>
                <hr className="m-1" />
                <Form className="p-2" onSubmit={edtServico} onReset={clearServ}> 
                    <FormGroup className="p-2">
                        <Label>
                            Id
                        </Label>
                        <Input
                            readOnly="true"
                            name="id"
                            placeholder="Inserir Id"
                            type="text"
                            defaultValue={id}
                        />
                    </FormGroup>
                    <FormGroup className="p-2">
                        <Label>
                            Nome
                        </Label>
                        <Input
                            name="nome"
                            placeholder="Inserir nome do serviço"
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
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
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
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