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
    var diaDeLaSolicitud = time.getHours()+':'+time.getMinutes()+':'+time.getSeconds()+', Fecha:'+giorno+'/'+messe+'/'+anno;
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
      isLoading: false,
    };
    //Para el autobinding
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(e){

  
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
              <Campo
                caption="Identidad"
                value={this.state.identidad}
                name="identidad"
                onChange={this.onChangeHandler}
              />
              <Campo
                caption="Elemento a reportar"
                value={this.state.elementoReportar}
                name="elementoReportar"
                onChange={this.onChangeHandler}
              />
              <TextArea
                caption="Descripción del reporte"
                value={this.state.descripcionReportar}
                name="descripcionReportar"
                onChange={this.onChangeHandler}
                maxLenght="300"
              />

              <input 
                type="file"
                name="imagenReporte"
                onChange={(e)=>this.onChangeImage(e)}
                multiple accept='image/*'
              />
          
              {(this.state.error && true) ? (<div className="error">{this.state.error}</div>) : null}
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