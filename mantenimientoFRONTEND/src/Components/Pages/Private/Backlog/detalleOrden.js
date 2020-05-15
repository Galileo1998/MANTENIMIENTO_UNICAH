import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { paxios } from '../../../../Utilities';
import './detalleOrden.css';
import TextArea from '../../../Common/TextArea/TextArea';
import {Link} from 'react-router-dom';
import { MdThumbsUpDown } from 'react-icons/md';
const FileDownload = require('js-file-download');

export default class DetalleOrden extends Component {
    constructor(){
        super();
        this.state = {
          things:[],
          isLoading: false,
          error: false,
          observacionError: false,
          observacionAltra: false,
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
                var numero = data.observacion.length;
                if(numero>0)
                {
                  this.state.observacionAltra = false;
                }
            },
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
    console.log(this.state.observacion.trimLeft().length);
    /*if(this.state.observacion.trimLeft().length>2)
    {
      this.state.observacionAltra = true;
      this.setState({ observacionAltra: "Imprimir" });
    }
    else{
      this.state.observacionAltra = false;
      this.setState({ observacionError: "Redacte una observación para el reporte" });
    }*/
  }
  onSaveBtnClick(e) {
    if(this.state.observacion === null || this.state.observacion.trimLeft().length<2)
    {
      this.state.observacionError = true;
      this.state.observacionAltra = false;
      this.setState({observacionError: "Redacte una observación para el reporte"});
      this.setState({ observacionAltra: "Error" });
      return 0;
    }
    else{
      this.state.observacionError = false;
      this.state.observacionAltra = true;
      this.setState({ observacionAltra: "Imprimir" });
    }
    const estado = 'Confirmado';
    const observacion = this.state.observacion;
    paxios.put(`/api/ordenar/${this.props.match.params.id}`, {estado, observacion})
      .then(({ data }) => {
        this.props.history.push(`/reporte/${this.props.match.params.id}/${this.state.idEdificio}/${this.state.nombreEdificio}/${this.state.pisosEdificio}/${this.state.bannosEdificio}/${this.state.aulasEdificio}/${this.state.oficinasEdificio}/${this.state.observacion}/${this.state.elementoReportar}/${this.state.descripcionReportar}/${this.state.nombre}/${this.state.identidad}/${this.state.fechaDia}/${this.state.fechaMes}/${this.state.fechaAnno}/${this.state.imagenReport}`);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al actualizar solicitud" });
      })
      
  }
  
  render() {
    console.log(this.state);
    return (
      <section className="inicio" >
        <div className="backlog" ref={(ref)=> this.scrollParentRef = ref}>
        <center>
        <div class="space"></div>
        <h1>Reporte : {this.props.match.params.id}</h1>

        <section className="main fix640 " >
          {(this.state.error && true) ? (<div className="error">{this.state.error}</div>) : null}
          <div  >
              <span><span style={{fontStyle: 'italic', fontWeight: '600'}}>Nombre:</span> {this.state.nombre}</span>
              <br></br>
              <span><span style={{fontStyle: 'italic', fontWeight: '600'}}>Identidad:</span> {this.state.identidad}</span>
              <br></br>
              <span><span style={{fontStyle: 'italic', fontWeight: '600'}}>Elemento reportado:</span> {this.state.elementoReportar}</span>
              <br></br>
              <span><span style={{fontStyle: 'italic', fontWeight: '600'}}>Descripción:</span> {this.state.descripcionReportar}</span>
              <br></br>
              <span><span style={{fontStyle: 'italic', fontWeight: '600'}}>Fecha solicitud:</span> {this.state.fechaSolicitud}</span>
              <br></br>
              
        </div>
        <div style={{width:50}}></div>
        <br></br>
        <span style={{fontStyle: 'italic', fontWeight: '600'}}>Edificio o espacio a dar mantenimiento:</span>
          <div className="thingItem">
              <span>Identificador: {this.state.idEdificio}</span>
              <span>Edificio: {this.state.nombreEdificio}</span>
              <br></br>
              <span>Pisos: {this.state.pisosEdificio}</span>
              <span>Aulas: {this.state.aulasEdificio}</span>
              <br></br>
              <span>Baños: {this.state.bannosEdificio}</span>
              <span>Oficinas: {this.state.oficinasEdificio}</span>
              <br></br>

          </div>
          <br></br>
          <div className="thingItem">
          <span>Evidencia gráfica de daño: </span>
          <br></br>
          <br></br>
          <img name="imagenReport" value={this.state.imagenReport} src={this.state.imagenReporte} style={{width: "50%", height: "40%"}}/>
          </div>
          <br></br>
          <TextArea
                caption="Observaciones (Jefe de mantenimiento)"
                value={this.state.observacion}
                name="observacion"
                onChange={this.onChangeHandler}
                maxLenght="300"
          />
           {(this.state.observacionError && true)?(<div className="errorDOS">{this.state.observacionError}</div>):(<Link to={`/reporte/${this.props.match.params.id}/${this.state.idEdificio}/${this.state.nombreEdificio}/${this.state.pisosEdificio}/${this.state.bannosEdificio}/${this.state.aulasEdificio}/${this.state.oficinasEdificio}/${this.state.observacion}/${this.state.elementoReportar}/${this.state.descripcionReportar}/${this.state.nombre}/${this.state.identidad}/${this.state.fechaDia}/${this.state.fechaMes}/${this.state.fechaAnno}/${this.state.imagenReport}`}>Imprimir Reporte</Link>)}
          <section className="action">
            <Button
              caption="Confirmar"
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
        </div>
      </section>
    );
  }
}
