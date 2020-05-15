// ES6
// ES5 var React = require('react');
// var Component = React.Component;
import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import TextArea from '../../../Common/TextArea/TextArea';
import ImageReport from '../../../Common/Image/ImageReport';
import ScrollArea from 'react-scrollbar';
import {Link} from 'react-router-dom';
import { naxios } from '../../../../Utilities';
import { MdThumbsUpDown } from 'react-icons/md';
import '../ProductosDisponibles/css/component.css'
import { IoIosCheckmark} from 'react-icons/io';
/*
  module.exports = class Login .....
*/



export default class Orden extends Component {
  constructor() {
    super();
    //definición del estado inicial
    var time = new Date();
    var giorno = time.getDate();
    var messe = parseInt(time.getMonth())+1;
    var anno = time.getFullYear();
    var diaDeLaSolicitud = time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()+', '+giorno+'/'+messe+'/'+anno;
    this.state = {
      nombre:'',
      identidad: '',
      descripcionReportar: '',
      elementoReportar: '',
      idEdificio: '',
      nombreEdificio: '',
      pisosEdificio: 0,
      bannosEdificio: 0,
      aulasEdificio: 0,
      oficinasEdificio: 0,
      fechaSolicitud: diaDeLaSolicitud,
      estado: '',
      fechaDia: giorno,
      fechaMes: messe,
      fechaAnno: anno,
      imagenReporte: '',
      error: false,
      nombreError: false,
      identidadError: false,
      elementoReportarError: false,
      descripcionReportarError: false,
      imagenError: false,
      cargarImagen: 'No se ha cargado una imagen',
      isLoading: false,
    };
    //Para el autobinding
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(e){

    
    if(this.state.nombre === null || this.state.nombre.trimLeft().length<2)
    {
      this.state.nombreError = true;
      this.setState({nombreError:"Debe ingresar un nombre"});
      return 0;
    }
    else{
      this.state.nombreError = false;
    }

    if(this.state.identidad === null || this.state.identidad.trimLeft().length<10)
    {
      this.state.identidadError = true;
      this.setState({identidadError:"Debe ingresar su número de cuenta"});
      return 0;
    }
    else{
      this.state.identidadError = false;
    }


    if(this.state.elementoReportar === null || this.state.elementoReportar.trimLeft().length<1)
    {
      this.state.elementoReportarError = true;
      this.setState({elementoReportarError:"Debe ingresar un Elemento para reportar"});
      return 0;
    }
    else{
      this.state.elementoReportarError = true;
    }

    if(this.state.descripcionReportar === null || this.state.descripcionReportar.trimLeft().length<1)
    {
      this.state.descripcionReportarError = true;
      this.setState({descripcionReportarError:"Debe ingresar un descripcion para el reporte"});
      return 0;
    }
    else{
      this.state.descripcionReportarError = false;
    }

    if(this.state.cargarImagen === 'No se ha cargado una imagen')
    {
      this.state.imagenError = true;
      this.setState({imagenError:"Cargue una fotografía para el reporte"});
      return 0;
    }
    else{
      this.state.imagenError = false;
    }
  
    this.setState({isLoading:true});
    naxios.post(
        `/api/ordenar/nuevaOrden`,
        {
          nombre:this.state.nombre,
          identidad:this.state.identidad,
          descripcionReportar: this.state.descripcionReportar,
          elementoReportar: this.state.elementoReportar,
          idEdificio:  this.props.match.params.idEdificio,
          nombreEdificio: this.props.match.params.nombreEdificio,
          pisosEdificio: this.props.match.params.pisosEdificio,
          bannosEdificio: this.props.match.params.bannosEdificio,
          aulasEdificio: this.props.match.params.aulasEdificio,
          oficinasEdificio: this.props.match.params.oficinasEdificio,
          fechaSolicitud: this.state.fechaSolicitud,
          estado: 'Sin confirmar',
          fechaDia: this.state.fechaDia,
          fechaMes: this.state.fechaMes,
          fechaAnno: this.state.fechaAnno,
          imagenReporte: this.state.imagenReporte
        }
      ).then(
        ({data})=>{
          this.props.history.goBack();
        }
      )
      .catch(
        (err)=>{
          console.log(err);
          this.setState({error:"Error al ordenar"});
        }
      );
  }
  onChangeHandler(e){
    let {name, value} = e.currentTarget;
    this.setState({[name]:value});
    }
    onBlurHandler(e){
      let { name, value } = e.currentTarget;
    }

    onChangeImage(e)
    {
      let files = e.target.files;
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload =(e)=>
      {
        console.warn("img data", e.target.result);
        this.state.imagenReporte=e.target.result;
        this.state.cargarImagen = "Imagen cargada";
        this.setState({"cargarImagen": "Imagen cargada"});
        this.state.imagenError = false;
      }

    }



  render() {

    return (

      <section>
        <div className="backlog" ref={(ref)=> this.scrollParentRef = ref}>
        <center>
        <br></br>
        <h1>Solicitar mantenimiento</h1>
          <section className="main fix640">
          
              <b>Edificio gestionado: {this.props.match.params.nombreEdificio}, Pisos: {this.props.match.params.pisosEdificio}, Aulas: {this.props.match.params.aulasEdificio}, Oficinas: {this.props.match.params.oficinasEdificio}, Baños: {this.props.match.params.bannosEdificio}</b>
 
              <Campo
                caption="Nombre"
                value={this.state.nombre}
                name="nombre"
                onChange={this.onChangeHandler}
              />
              {(this.state.nombreError && true)?(<div className="errorDOS">{this.state.nombreError}</div>):null}
              <Campo
                caption="Identidad"
                value={this.state.identidad}
                name="identidad"
                onChange={this.onChangeHandler}
              />
              {(this.state.identidadError && true)?(<div className="errorDOS">{this.state.identidadError}</div>):null}
              <Campo
                caption="Elemento a reportar"
                value={this.state.elementoReportar}
                name="elementoReportar"
                onChange={this.onChangeHandler}
              />
              {(this.state.elementoReportarError && true)?(<div className="errorDOS">{this.state.elementoReportarError}</div>):null}
              <TextArea
                caption="Descripción del reporte"
                value={this.state.descripcionReportar}
                name="descripcionReportar"
                onChange={this.onChangeHandler}
                maxLenght="300"
              />
              {(this.state.descripcionReportarError && true)?(<div className="errorDOS">{this.state.descripcionReportarError}</div>):null}
              <span style={{fontStyle: 'italic', fontWeight: '500'}}>Cargue una fotografía como evidencia: </span>
          
              <input 
                type="file"
                name="imagenReporte"
                onChange={(e)=>this.onChangeImage(e)}
                accept='image/*'
                id="file-2" 
                class="inputfile inputfile-2"
              />
 
              <br></br><br></br>
              {(this.state.error && true)?(<div className="error">{this.state.error}</div>):null}
              <label for="file-2"><svg width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> Subir imagen&nbsp;&hellip;</label>
              {(this.state.cargarImagen && true) ? (<div className="imagenMensaje">{this.state.cargarImagen}</div>) : null}
              {(this.state.imagenError && true)?(<div className="errorDOS">{this.state.imagenError}</div>):null}
              <section className="action">
                <Button
                  caption="Enviar"
                  onClick={this.onClickHandler}
                  customClass="secondary"
                />
                <div style={{width:50}}></div>
                <Button
                  caption="Cancelar"
                  customClass="secondary"
                  onClick={(e) => { this.props.history.goBack() }}
                />
            
              </section>
              
        </section>
         </center>
         </div>
      </section>

    );
  }
}