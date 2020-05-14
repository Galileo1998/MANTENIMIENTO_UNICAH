import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { paxios } from '../../../../Utilities';
import './Detail.css';


export default class DetailDelete extends Component {
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
      }
    );
  }
  onChangeHandler(e) {
    const { name, value } = e.target;
    //validar
    this.setState({ ...this.state, [name]: value });
  }
  onSaveBtnClick(e) {
    const { _id} = this.state;
    paxios.delete(`/api/edificios/${_id}`, {  })
      .then(({ data }) => {
        this.props.history.push("/backlog");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: "Error al eliminar nuevo Producto" });
      })
  }

  render() {
    console.log(this.state);
    return (
      <section className="inicio">
        <div className="backlog" ref={(ref)=> this.scrollParentRef = ref}>
        <section>
        <h1>ELIMINAR EDIFICIO O ESPACIO: {this.props.match.params.id}</h1>
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
              caption="Eliminar edificio o espacio"
              onClick={this.onSaveBtnClick}
              customClass="secondary"
            />
            <br></br>&nbsp;&nbsp;&nbsp;
            <Button
              caption="Cancelar"
              customClass="secondary"
              onClick={(e) => { this.props.history.push('/backlog') }}
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
