import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { paxios } from '../../../../Utilities';
import './Detail.css';

export default class DetailUpdate extends Component {
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

  componentDidMount(){
    const { match: {params}} = this.props;
    const uri = `/api/edificios/${params.id}`;
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

    const { idEdificio, nombreEdificio, pisosEdificio, bannosEdificio, aulasEdificio, oficinasEdificio ,  _id } = this.state;
    paxios.put(`/api/edificios/${_id}`, { idEdificio, nombreEdificio, pisosEdificio, bannosEdificio, aulasEdificio, oficinasEdificio })
      .then(({ data }) => {
        this.props.history.push("/backlog");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al actualizar nuevo Producto" });
      })
  }

  render() {
    console.log(this.state);
    return (
      <section className="inicio">
        <div className="backlog" ref={(ref)=> this.scrollParentRef = ref}>
        <h1>ACTUALIZAR EDIFICIO O ESPACIO: {this.props.match.params.id}</h1>
        
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
            onChange={this.onChangeHandler}
            type='number'
            placeholder='0'
          />
           {(this.state.pisosEdificioError && true)?(<div className="errorDOS">{this.state.pisosEdificioError}</div>):null}
          <Campo
            caption="Número de baños en el edificio o espacio:"
            value={this.state.bannosEdificio}
            name="bannosEdificio"
            onChange={this.onChangeHandler}
            type='number'
            placeholder='0'
          />
           {(this.state.bannosEdificioError && true)?(<div className="errorDOS">{this.state.bannosEdificioError}</div>):null}
          <Campo
            caption="Número de aulas en el edificio:"
            value={this.state.aulasEdificio}
            name="aulasEdificio"
            type='number'
            onChange={this.onChangeHandler}
            placeholder='0'
          />
           {(this.state.aulasEdificioError && true)?(<div className="errorDOS">{this.state.aulasEdificioError}</div>):null}
          <Campo
            caption="Número de oficinas en el edificio:"
            value={this.state.oficinasEdificio}
            name="oficinasEdificio"
            placeholder='0'
            type='number'
            onChange={this.onChangeHandler}
          />
           {(this.state.oficinasEdificioError && true)?(<div className="errorDOS">{this.state.oficinasEdificioError}</div>):null}
          {(this.state.error && true) ? (<div className="error">{this.state.error}</div>) : null}
          <section className="action">
            <Button
              caption="Actualizar"
              onClick={this.onSaveBtnClick}
              customClass="secondary"
            />
            <br></br>&nbsp;&nbsp;&nbsp;
            <Button
              caption="Cancelar"
              customClass="secondary"
              onClick={(e) => { this.props.history.push('/backlog') }}
            />
            <div class="space"></div>
          </section>
        </section>
        </center>

        </div>
      </section>
    );
  }
}
