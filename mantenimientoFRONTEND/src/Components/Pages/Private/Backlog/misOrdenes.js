import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './MisOrdenes.css';
import { IoIosDocument, IoIosRemove} from 'react-icons/io';
import { naxios } from '../../../../Utilities';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Select from 'react-select';


const options = [
  {value: '0', label: 'Todas'},
  {value: '1', label: 'Confirmadas'},
  {value: '2', label: 'Sin Confirmar'},
  {value: '3', label: 'Hoy'},
];

function ListItem(props){
  return(
    <div key={props._id}>
      <b>
        <Link to={`/detail/${props._id}`}>{props.desc}</Link>
      </b>
    </div>
  );
}


class List extends Component{
  constructor(){
    super();
    this.state = {
      things:[],
      isLoading: false,
      error: false,
      selectedOptions: null,
      valor: '0',
    }
  }
  componentDidMount(){
      this.setState({isLoading:true});
      naxios.get('/api/ordenar/')
        .then( (resp)=>{
          this.setState({things:resp.data, isLoading:false});
        })
        .catch( (err)=>{
          alert(err);
        })
      ;
  }


  handleChange = selectedOptions =>{
    this.setState(
      {selectedOptions},
      () => console.log(`Opción seleccionada`, this.state.selectedOptions.value),
    );

    this.state.valor = selectedOptions.value;
  };
  
 
  render(){
    console.log(`Opción seleccionada`, this.state.selectedOptions);
    console.log(this.state.valor);
    const {selectedOptions} = this.state;
    const items = this.state.things.map(
        (thing)=>{
              return (
                <div className="thingItem" key={thing._id}>
                  <span>{thing.estado}</span>
                  <span>{thing.nombre}</span>
                  <span>{thing.identidad}</span>
                  <span>{thing.elementoReportar}</span>
                  <Link to={`/detalleOrden/${thing._id}`}><IoIosDocument size="2.5em" /></Link>
                  <Link to={`/deleteOrden/${thing._id}`}><IoIosRemove size="2em"/></Link>
                  <span className="updateThing" onClick={()=>{this.handleClick(thing._id);}}>
                  </span>
                </div>);
            }
          
      );
    
      const itemsConfirmados = this.state.things.map(
        (thing)=>{
            if(thing.estado === 'Confirmado')
              return (
                <div className="thingItem" key={thing._id}>
                  <span>{thing.estado}</span>
                  <span>{thing.nombre}</span>
                  <span>{thing.identidad}</span>
                  <span>{thing.elementoReportar}</span>
                  <Link to={`/detalleOrden/${thing._id}`}><IoIosDocument size="2.5em" /></Link>
                  <Link to={`/deleteOrden/${thing._id}`}><IoIosRemove size="2em"/></Link>
                  <span className="updateThing" onClick={()=>{this.handleClick(thing._id);}}>
                  </span>
                </div>);
            }
          
      );

      const itemsSinConfirmar = this.state.things.map(
        (thing)=>{
            if(thing.estado === 'Sin confirmar')
              return (
                <div className="thingItem" key={thing._id}>
                  <span>{thing.estado}</span>
                  <span>{thing.nombre}</span>
                  <span>{thing.identidad}</span>
                  <span>{thing.elementoReportar}</span>
                  <Link to={`/detalleOrden/${thing._id}`}><IoIosDocument size="2.5em" /></Link>
                  <Link to={`/deleteOrden/${thing._id}`}><IoIosRemove size="2em"/></Link>
                  <span className="updateThing" onClick={()=>{this.handleClick(thing._id);}}>
                  </span>
                </div>);
            }
          
      );
      const oggi = new Date();
      const itemsHoy = this.state.things.map(
        (thing)=>{
            if(thing.fechaDia === oggi.getDate() && thing.fechaMes === parseInt(oggi.getMonth()+1) && thing.fechaAnno === oggi.getFullYear())
              return (
                <div className="thingItem" key={thing._id}>
                  <span>{thing.estado}</span>
                  <span>{thing.nombre}</span>
                  <span>{thing.identidad}</span>
                  <span>{thing.elementoReportar}</span>
                  <Link to={`/detalleOrden/${thing._id}`}><IoIosDocument size="2.5em" /></Link>
                  <Link to={`/deleteOrden/${thing._id}`}><IoIosRemove size="2em"/></Link>
                  <span className="updateThing" onClick={()=>{this.handleClick(thing._id);}}>
                  </span>
                </div>);
            }
          
      );

    if(this.state.valor === '0')
    {
      return (
        <section className="backlogs">
          <div style = {{backgroundColor: '#fff', height: "100%", padding: '0', margin: '0', opacity: '0.85'}}className="" ref={(ref)=> this.scrollParentRef = ref}>
            <div className="listHolder">
              <br></br>
            <h1>Solicitudes realizadas</h1>
            <h2>Cantidad de Ordenes: {this.state.things.length}</h2>
            <div>
              <div>
                <Select value={selectedOptions} onChange={this.handleChange} options={options} placeholder="Filtrar por:" />
              </div>
              {items}
            </div>
            { (this.state.isLoading)? "...Cargando": null }
            </div>
          </div>
        </section>
      )
    }
    else if (this.state.valor === '1')
    {
      return (
        <section className="backlogs">
          <div style = {{backgroundColor: '#fff', height: "100%", padding: '0', margin: '0', opacity: '0.85'}}className="" ref={(ref)=> this.scrollParentRef = ref}>
            <div className="listHolder">
              <br></br>
            <h1>Solicitudes realizadas</h1>
            <h2>Cantidad de Ordenes: {this.state.things.length}</h2>
            <div>
              <div>
                <Select value={selectedOptions} onChange={this.handleChange} options={options} placeholder="Filtrar por:" />
              </div>
              {itemsConfirmados}
            </div>
            { (this.state.isLoading)? "...Cargando": null }
            </div>
          </div>
        </section>
      )
    }
    else if(this.state.valor === '2')
    {
      return (
        <section className="backlogs">
          <div style = {{backgroundColor: '#fff', height: "100%", padding: '0', margin: '0', opacity: '0.85'}}className="" ref={(ref)=> this.scrollParentRef = ref}>
            <div className="listHolder">
              <br></br>
            <h1>Solicitudes realizadas</h1>
            <h2>Cantidad de Ordenes: {this.state.things.length}</h2>
            <div>
              <div>
                <Select value={selectedOptions} onChange={this.handleChange} options={options} placeholder="Filtrar por:" />
              </div>
                {itemsSinConfirmar}
            </div>
            { (this.state.isLoading)? "...Cargando": null }
            </div>
          </div>
        </section>
      )
    }
    else if (this.state.valor === '3')
    {
      {
        return (
          <section className="backlogs">
            <div style = {{backgroundColor: '#fff', height: "100%", padding: '0', margin: '0', opacity: '0.85'}}className="" ref={(ref)=> this.scrollParentRef = ref}>
              <div className="listHolder">
                <br></br>
              <h1>Solicitudes realizadas</h1>
              <h2>Cantidad de Ordenes: {this.state.things.length}</h2>
              <div>
                <div>
                  <Select value={selectedOptions} onChange={this.handleChange} options={options} placeholder="Filtrar por:" />
                </div>
                {itemsHoy}
              </div>
              { (this.state.isLoading)? "...Cargando": null }
              </div>
            </div>
          </section>
        )
      }
    }
    else{
      {
        return (
          <section className="backlogs">
            <div style = {{backgroundColor: '#fff', height: "100%", padding: '0', margin: '0', opacity: '0.85'}}className="" ref={(ref)=> this.scrollParentRef = ref}>
              <div className="listHolder">
                <br></br>
              <h1>Solicitudes realizadas</h1>
              <h2>Cantidad de Ordenes: {this.state.things.length}</h2>
              <div>
                <div>
                  <Select value={selectedOptions} onChange={this.handleChange} options={options} placeholder="Filtrar por:" />
                </div>
                {items}
              </div>
              { (this.state.isLoading)? "...Cargando": null }
              </div>
            </div>
          </section>
        )
      }
    }
  }

}

export default List;
