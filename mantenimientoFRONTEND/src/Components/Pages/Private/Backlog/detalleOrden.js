import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { paxios } from '../../../../Utilities';
import './detalleOrden.css';
import TextArea from '../../../Common/TextArea/TextArea';


export default class DetalleOrden extends Component {
    constructor(){
        super();
        this.state = {
          things:[],
          isLoading: false,
          error: false,
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
      }

      componentDidMount(){
        this.setState({isLoading:true});
        const { match: {params}} = this.props;
        const uri = `/api/ordenar/${params.id}`;
        paxios.get(uri)
        .then(
            ({data})=>{
                this.setState({...data});
            }
        )
        .catch(
          (err)=>{
            this.setState({error:"No se pudo cargar Thing."});
            console.log(err);
          }
        );
      }
    

  
  onChangeHandler(e) {
    const { name, value } = e.target;
    //validar
    this.setState({ ...this.state, [name]: value });
  }
  onSaveBtnClick(e) {
    const estado = 'Confirmado';
    paxios.put(`/api/ordenar/${this.props.match.params.id}`, {estado})
      .then(({ data }) => {
        this.props.history.push("/backlog");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al actualizar nuevo Producto" });
      })

    paxios.delete(`/api/things/${this.state.idProducto}`, { estado })
      .then(({ data }) => {
        this.props.history.push("/misOrdenes");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al actualizar nuevo Producto" });
      })
  }

  render() {
    console.log(this.state);
    return (
      <section className="inicio" >
        <center>
        <h1>Orden con Id: {this.props.match.params.id}</h1>
        <section className="main fix640 " >
          {(this.state.error && true) ? (<div className="error">{this.state.error}</div>) : null}
          <div  >
              <span>Nombre: {this.state.nombre}</span>
              <br></br>
              <span>Identidad: {this.state.identidad}</span>
              <br></br>
              <span>Elemento reportado: {this.state.elementoReportar}</span>
              <br></br>
              <span>Descripción: {this.state.descripcionReportar}</span>
              <br></br>
              
        </div>
        <div style={{width:50}}></div>
        <span>Edificio o espacio a dar mantenimiento:</span>
          <div className="thingItem">
              <span>Identificador: {this.state.idEdificio}</span>
              <span>Edificio: {this.state.nombreEdificio}</span>
              <br></br>
              <span>Pisos: {this.state.pisosEdificio}</span>
              <span>Aulas: {this.state.aulasEdificio}</span>
              <br></br>
              <span>Baños: {this.state.bannosEdificio}</span>
              <span>Oficinas: {this.state.oficinasEdificio}</span>
          </div>
          <TextArea
                caption="Observaciones (Jefe de mantenimiento)"
                value={this.state.descripcionReportar}
                name="descripcionReportar"
                onChange={this.onChangeHandler}
                maxLenght="300"
          />
          <section className="action">
            <Button
              caption="Confirmar Orden"
              onClick={this.onSaveBtnClick}
              customClass="secondary"
            />
            <div style={{width:50}}></div>
            <Button
              caption="Cancelar Orden"
              customClass="secondary"
              onClick={(e) => { this.props.history.push('/backlog') }}
            />
          </section>
        </section>
        </center>
      </section>
    );
  }
}
