import React, {Component, StyleSheet} from 'react';
import Button from '../../../Common/Btns/Buttons';
import './Home.css';
import { IoIosLogOut } from 'react-icons/io';
import NavBar from '../../../Common/NavBar/NavBar';
import { Redirect} from 'react-router-dom';

export default class Home extends Component{
  render() {
    return (
        <div className="home">   
            <h1><img src="/LOGO_2C1.png" style={{width: "50px", height: "60px"}}/>&nbsp;&nbsp;&nbsp;&nbsp;<span>MANTENIMIENTO</span>&nbsp;<span>UNICAH</span></h1>
               <div>&nbsp;</div>
            <div className="btnout">
               {(this.props.auth.logged) ? (<center><div className="half"><Button customClass="fond" onClick={(e) => { this.props.setUnAuth(false)}}><IoIosLogOut/>&nbsp;Cerrar Sesión</Button></div></center>):null}
            </div>
        </div>

    );
  }

}
