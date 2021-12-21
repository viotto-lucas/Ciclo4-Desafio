import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './views/Home';
import { ListarCliente } from './views/Cliente/ListarCliente';
import { ListarServico } from './views/Servico/ListarServico';
import { ListarProduto } from './views/Produto/ListarProdutos';
import { ListarCompra } from './views/Compra/ListarCompra';
import { ListarPedido } from './views/Pedido/ListarPedidos';
import { Compras } from './views/Compra/ComprasCliente';
import { Menu } from './components/Menu';
import { Item } from './views/Servico/Item';
import { ItemC } from './views/ItemPedido/ListarItemPedidos';
import { Cadastrar } from './views/Servico/Cadastrar';
import { Pedidos } from './views/Pedido/PedidosCliente';
import { InserirCliente } from './views/Cliente/InserirCliente';
import { InserirCompra } from './views/Compra/InserirCompra';
import { InserirProduto } from './views/Produto/CadastrarProduto';
import { EditarPedido } from './views/Cliente/EditarPedido';
import { EditarCompra } from './views/Compra/EditarCompra';
import { EditarItem } from './views/Servico/EditarItem';
import { EditarCliente } from './views/Cliente/EditarCliente';
import { EditarProduto } from './views/Produto/EditarProduto';
import { EditarServico } from './views/Servico/EditarServico';
import { InserirPedido } from './views/Pedido/InserirPedido';
import { InserirItensPedido } from './views/ItemPedido/InserirItemPedido';
import { ItemD } from './views/ItemCompra/ListarItemCompras';
import { EditarItemcomp } from './views/ItemCompra/EditarItemCompra';
import { InserirItensCompra } from './views/ItemCompra/InserirItemCompra';
// import { ListarItemPedidos } from './views/ItemPedido/ListarItemPedidos';




function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path ="/" component={Home}/>
          <Route path ="/listar-clientes" component={ListarCliente}/>
          <Route path ="/listar-servicos" component={ListarServico}/>
          <Route path ="/listar-produtos" component={ListarProduto}/>
          <Route path ="/listar-compras" component={ListarCompra}/>
          <Route path ="/listar-pedidos" component={ListarPedido}/>
          <Route path ="/compras-cliente/:id" component={Compras}/>
          <Route path ="/listar-pedido/:id" component={Item}/>
          <Route path ="/listar-pedidoc/:id" component={ItemC}/>
          <Route path ="/listar-compra/:id" component={ItemD}/>
          {/* <Route path ="/listar-itempedido" component={ListarItemPedidos}/> */}
          <Route path ="/pedidos-cliente/:id" component={Pedidos}/>
          <Route path ="/cadastrarservico" component={Cadastrar}/>
          <Route path ="/cadastrar-cliente" component={InserirCliente}/>
          <Route path ="/cadastrar-compra" component={InserirCompra}/>
          <Route path ="/cadastrar-produto" component={InserirProduto}/>
          <Route path ="/cadastrar-pedido" component={InserirPedido}/>
          <Route path ="/cadastraritempedido" component={InserirItensPedido}/>
          <Route path ="/cadastraritemcompra" component={InserirItensCompra}/>
          <Route path ="/editar-pedidos/:id" component={EditarPedido}/>
          <Route path ="/editar-produtos/:id" component={EditarProduto}/>
          <Route path ="/editar-compras/:id" component={EditarCompra}/>
          <Route path ="/editar-clientes/:id" component={EditarCliente}/>
          <Route path ="/editar-servicos/:id" component={EditarServico}/>
          <Route path ="/editar-item/:id" component={EditarItem}/>
          <Route path ="/editar-itemcompra/:id" component={EditarItemcomp}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
