import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Backlog.css';
import { IoIosShuffle, IoIosMenu, IoIosCash, IoIosPaper} from 'react-icons/io';
import { naxios } from '../../../../Utilities';

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
    }
  }
  componentDidMount(){
      this.setState({isLoading:true});
      naxios.get('/api/solicitud/')
        .then( (resp)=>{
          this.setState({things:resp.data, isLoading:false});
        })
        .catch( (err)=>{
          alert(err);
        })
      ;
  }

 
  render(){
    const items = this.state.things.map(
        (thing)=>{
          return (
            <div className="thingItem" key={thing._id}>
              <span>{thing.idEdificio}</span>
              <span>{thing.nombreEdificio}</span>
              <span>Pisos: {thing.pisosEdificio}</span>
              <Link to={`/ordenar/${thing._id}/${thing.idEdificio}/${thing.nombreEdificio}/${thing.pisosEdificio}/${thing.bannosEdificio}/${thing.aulasEdificio}/${thing.oficinasEdificio}`}><IoIosPaper size="2.5em" /></Link>
              <span className="updateThing" onClick={()=>{this.handleClick(thing._id);}}>
              </span>
            </div>);
        }
      );
    return (
      <div className="backlog" ref={(ref)=> this.scrollParentRef = ref}>
      <div className="listHolder">
        <br></br>
        <div className="inicio"><h1>Edificios y espacios (Generar solicitud de mantenimiento)</h1></div>
      <div className="cantidades">
      <h2>Cantidad de Edificios o espacios: {this.state.things.length}</h2>
      </div>
      <div>
        {items}
      </div>
      { (this.state.isLoading)? "...Cargando": null }
      </div>
      </div>
    )
  }
}

export default List;
