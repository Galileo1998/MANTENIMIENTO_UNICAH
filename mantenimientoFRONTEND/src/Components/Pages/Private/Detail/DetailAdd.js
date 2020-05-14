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
      idEdificio: 0,
      nombreEdificio:'',
      pisosEdificio: 0,
      bannosEdificio: 0,
      aulasEdificio: 0,
      oficinasEdificio: 0,
      error: false
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
         <Campo
            caption="Nombre del edificio:"
            value={this.state.nombreEdificio}
            name="nombreEdificio"
            onChange={this.onChangeHandler}
          />
          <Campo
            caption="Número de pisos del edificio:"
            value={this.state.pisosEdificio}
            name="pisosEdificio"
            onChange={this.onChangeHandler}
          />
          <Campo
            caption="Número de baños en el edificio o espacio:"
            value={this.state.bannosEdificio}
            name="bannosEdificio"
            onChange={this.onChangeHandler}
          />
          <Campo
            caption="Número de aulas en el edificio:"
            value={this.state.aulasEdificio}
            name="aulasEdificio"
            onChange={this.onChangeHandler}
          />
          <Campo
            caption="Número de oficinas en el edificio:"
            value={this.state.oficinasEdificio}
            name="oficinasEdificio"
            onChange={this.onChangeHandler}
          />

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