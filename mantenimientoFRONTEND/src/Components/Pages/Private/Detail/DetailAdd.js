// ES6
// ES5 var React = require('react');
// var Component = React.Component;
import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import InfiniteScroll from 'react-infinite-scroller';
import {IoIosSync, IoMdAddCircle, IoIosRemove, IoIosSettings } from 'react-icons/io';
import axios from 'axios';
import { paxios } from '../../../../Utilities';
import { timingSafeEqual } from 'crypto';
import './Detail.css';
/*
/*
  module.exports = class Login .....
*/
export default class DetailAdd extends Component {
  constructor() {
    super();
    //definición del estado inicial
    this.state = {
      idEdificio: '',
      nombreEdificio:'',
      pisosEdificio: 0,
      bannosEdificio: 0,
      aulasEdificio: 0,
      oficinasEdificio: 0,
      error: false,
      idEdificioError: false,
      nombreEdificioError: false,
      pisosEdificioError: false,
      bannosEdificioError: false,
      aulasEdificioError: false,
      oficinasEdificioError: false, 
    };
    //Para el autobinding
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSaveBtnClick = this.onSaveBtnClick.bind(this);
  }

  handleFile(e)
  {
    let imagen = e.target.files[0];
    this.setState({imagen: imagen});
  }

  fileSelectedHandler = event =>{
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  onChangeHandler(e) {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  }

  onSaveBtnClick(e) {

    if(this.state.idEdificio === null || this.state.idEdificio.trimLeft().length < 1)
    {
      this.state.idEdificioError = true;
      this.setState({idEdificioError:"Debe ingresar un Identificador para el Edificio"});
      return 0;
    }
    else{
      this.state.idEdificioError = false;
    }

    if(this.state.nombreEdificio === null || this.state.nombreEdificio.trimLeft().length<2)
    {
      this.state.nombreEdificioError = true;
      this.setState({nombreEdificioError:"Debe ingresar un nombre para Edificio"});
      return 0;
    }
    else{
      this.state.nombreEdificioError = false;
    }

    if(this.state.pisosEdificio < 0 || this.state.pisosEdificio === 'e')
    {
      this.state.pisosEdificioError = true;
      this.setState({pisosEdificioError:"Debe ingresar un  valor igual mayor a cero"});
      return 0;
    }
    else{
      this.state.pisosEdificioError = false;
    }

    if(this.state.bannosEdificio<0 || this.state.bannosEdificio === 'e')
    {
      this.state.bannosEdificioError = true;
      this.setState({bannosEdificioError:"Debe ingresar un valor mayor a cero"});
      return 0;
    }
    else{
      this.state.bannosEdificioError = false;
    }

    if(this.state.aulasEdificio<0 || this.state.aulasEdificio === 'e')
    {
      this.state.aulasEdificioError = true;
      this.setState({aulasEdificioError:"Debe ingresar un valor mayor a cero"});
      return 0;
    }
    else{
      this.state.aulasEdificioError = false;
    }

    if(this.state.oficinasEdificio<0 || this.state.oficinasEdificio === 'e')
    {
      this.state.oficinasEdificioError = true;
      this.setState({oficinasEdificioError:"Debe ingresar un valor mayor a cero"});
      return 0;
    }
    else{
      this.state.oficinasEdificioError = false;
    }


    const { idEdificio, nombreEdificio, pisosEdificio, bannosEdificio, aulasEdificio, oficinasEdificio } = this.state;
    paxios.post('/api/edificios', { idEdificio, nombreEdificio, pisosEdificio, bannosEdificio, aulasEdificio, oficinasEdificio })
      .then(({ data }) => {
        this.props.history.goBack();
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al crear nuevo producto" });
      })
  }

  render() {
    return (
      <section className="inicio">
        <div className="backlog" ref={(ref)=> this.scrollParentRef = ref}>
        <section>
        <h1>CREAR NUEVO EDIFICIO O ESPACIO</h1>
        <center>
        <section className="main fix640">
          <Campo
            caption="Identificador del edificio:"
            value={this.state.idEdificio}
            name="idEdificio"
            onChange={this.onChangeHandler}
          />
          {(this.state.idEdificioError && true)?(<div className="errorDOS">{this.state.idEdificioError}</div>):null}
         <Campo
            caption="Nombre del edificio:"
            value={this.state.nombreEdificio}
            name="nombreEdificio"
            onChange={this.onChangeHandler}
          />
          {(this.state.nombreEdificioError && true)?(<div className="errorDOS">{this.state.nombreEdificioError}</div>):null}
          <Campo
            caption="Número de pisos del edificio:"
            value={this.state.pisosEdificio}
            name="pisosEdificio"
            placeholder="0"
            onChange={this.onChangeHandler}
            type = 'number'
          />
          {(this.state.pisosEdificioError && true)?(<div className="errorDOS">{this.state.pisosEdificioError}</div>):null}
          <Campo
            caption="Número de baños en el edificio o espacio:"
            value={this.state.bannosEdificio}
            name="bannosEdificio"
            placeholder="0"
            onChange={this.onChangeHandler}
            type = 'number'
          />
          {(this.state.bannosEdificioError && true)?(<div className="errorDOS">{this.state.bannosEdificioError}</div>):null}
          <Campo
            caption="Número de aulas en el edificio:"
            value={this.state.aulasEdificio}
            name="aulasEdificio"
            placeholder="0"
            onChange={this.onChangeHandler}
            type = 'number'
          />
          {(this.state.aulasEdificioError && true)?(<div className="errorDOS">{this.state.aulasEdificioError}</div>):null}
          <Campo
            caption="Número de oficinas en el edificio:"
            value={this.state.oficinasEdificio}
            placeholder="0"
            name="oficinasEdificio"
            onChange={this.onChangeHandler}
            type = 'number'
          />
          {(this.state.oficinasEdificioError && true)?(<div className="errorDOS">{this.state.oficinasEdificioError}</div>):null}  
          {(this.state.error && true) ? (<div className="error">{this.state.error}</div>) : null}
          <section className="action">
            <Button
              caption="Crear"
              onClick={this.onSaveBtnClick}
              customClass="secondary"
            />
            <br></br>&nbsp;&nbsp;&nbsp;
            <Button
              caption="Cancelar"
              customClass="secondary"
              onClick={(e) => { this.props.history.goBack() }}
            />
            </section>
            </section>
            </center>
          </section>
        </div>
      </section>
    );
  }
}