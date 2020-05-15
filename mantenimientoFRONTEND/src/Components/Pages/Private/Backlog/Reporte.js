import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { paxios } from '../../../../Utilities';
import './detalleOrden.css';
import Informacion from '../../Private/Backlog/detalleOrden';
import TextArea from '../../../Common/TextArea/TextArea';
import {Page, Text, View, Document, StyleSheet, PDFViewer, Image, BlobProvider} from '@react-pdf/renderer';
import { MdThumbsUpDown } from 'react-icons/md';
import styled from 'styled-components';
import myimage from '../../Private/Backlog/LOGO3.png';

const POSTER_PATH= ''; 

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        border: 1,
    },
    viewer: {

        width: '100%',
        height: '100%',
        marginTop: '65px'
    },
    h1: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "bold"
    },
    h2: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: 'normal',
        fontStyle: 'italic'
    },
    h3: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 10
    },
    h4: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 20,
        marginBottom: 50,
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
        width: '45px',
        height: '60px',
        alignSelf: 'center'
    },
    regad: {
        textAlign: 'right',
        fontSize: 12
    },
    h5: {
        fontSize: 14,
        marginHorizontal: 50,
        marginBottom: 30,
    },
    h6: {
        textAlign: 'center',
        fontSize: 12,
        marginTop: 20,
        marginBottom: 25,
    },
    h7: {
        textAlign: 'justify',
        marginHorizontal: 10,
        fontSize: 14,
        marginBottom: 25
    },
    h8: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 12
    },
    cuadro: {
        marginHorizontal: 50,
        border: 1,
        marginBottom: 25
   },
   h9:{
       fontSize: 8,
       marginHorizontal: 5,
        marginTop: 30
   },
   h10: {
    textAlign: 'center',
    marginTop: 70,
    fontSize: 12
   },
   images: {
    marginVertical: 15,
    marginHorizontal: 100,
    width: '50px',
    height: '60px',
    alignSelf: 'center'
   }
});

export default class Reporte extends React.Component {
 
    constructor(){
        super();
        this.state = {
          things:[],
          isLoading: false,
          error: false,
          imagenn: '',
        }

        this.state.imagenn=this.state.imagenReporte;
        this.componentDidMount = this.componentDidMount.bind(this);
      }


      componentDidMount(){
        const { match: {params}} = this.props;
        const uri = `/api/ordenar/imagen/${params.id}`;
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
      
  render() {
    console.log(this.state.imagenn);

    return (
        <PDFViewer style={styles.viewer}>
            <Document>
            <Page size="Letter" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.regad}>REG-AD.126</Text>
                    <Image style={styles.image} src='/LOGO_2C1.png'/>
                    <Text style={styles.h1}>UNIVERSIDAD CATÓLICA DE HONDURAS {this.state.imagenReporte}</Text>
                    <Text style={styles.h2}>"Nuestra Señora Reina de la Paz"</Text>
                    <Text style={styles.h3}>REPORTE DE MANTENIMIENTO</Text>
                    <Text style={styles.h3}>Campus: ___________________    Fecha: {this.props.match.params.dia}/{this.props.match.params.mes}/{this.props.match.params.anno}   N° Reporte:_______ </Text>
                    <Text style={styles.h3}>Usuario: {this.props.match.params.nombre}    N° Cuenta: {this.props.match.params.identidad} </Text>
                    <Text style={styles.h4}>Elemento inspeccionado</Text>
                    <Text style={styles.h5}>Edificio o espacio: {this.props.match.params.idEdificio}, {this.props.match.params.nombreEdificio}</Text>
                    <Text style={styles.h5}>Elemento reportado: {this.props.match.params.elementoReporte}</Text>
                    <Text style={styles.h5}>Descripción del elemento reportado: {this.props.match.params.descripcionReporte}</Text>
                    <View style={styles.cuadro}> 
                         <Text style={styles.h6}>Informe de lo encontrado</Text>
                         <Text style={styles.h7}>{this.props.match.params.observacion}</Text>
                    </View>
                    <Text style={styles.h8}>Responsable de mantenimiento: _______________________________________</Text>
                    <Text style={styles.h10}>Firma: ____________________________________</Text>
                    <Text style={styles.h9}>VERSIÓN APROBADO 18 DE OCTUBRE DE 2012</Text>   
                </View> 
            </Page>
            </Document>
        </PDFViewer>
    );
  }
}
