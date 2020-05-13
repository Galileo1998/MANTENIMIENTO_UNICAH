import React, {Component} from 'react';
import Button from '../../../Common/Btns/Buttons';
import './Home.css';
import { IoIosLogOut } from 'react-icons/io';

export default class Home extends Component{
  render() {
    return (
        <div className="home">
          <div>
          <h1>MANTENIMIENTO UNICAH</h1>
          </div>

            <div>&nbsp;</div>
            <div className="btnout">
            {(this.props.auth.logged) ? (<center><div className="half"><Button customClass="fond" onClick={(e) => { this.props.setUnAuth(false)}}><IoIosLogOut/>&nbsp;Cerrar Sesión</Button></div></center>):null}
            </div>
            
        </div>
    );
  }

}
