import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { paxios } from '../../../../Utilities';
import './detalleOrden.css';
import TextArea from '../../../Common/TextArea/TextArea';



export default class Reporte extends Component {
    constructor(){
        super();
        this.state = {
          things:[],
          isLoading: false,
          error: false,
        }

      }


  render() {
    console.log(this.state);
    return (
        <section className="inicio" >
            <center>
                <h1>Reporte de mantenimiento</h1>
                <section className="main fix640 " >
                </section>
            </center>
        </section>
    );
  }
}
