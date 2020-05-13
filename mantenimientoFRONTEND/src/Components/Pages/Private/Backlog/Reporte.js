import React, { Component } from 'react';
import Button from '../../../Common/Btns/Buttons';
import Campo from '../../../Common/Campo/Campo';
import { paxios } from '../../../../Utilities';
import './detalleOrden.css';
import TextArea from '../../../Common/TextArea/TextArea';
import {Page, Text, View, Document, StyleSheet, PDFViewer, Image} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
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
        fontSize: 12
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
        width: '45px',
        height: '60px',
        alignSelf: 'center'
    }
});


export default class Reporte extends Component {
  render() {
    return (

        <PDFViewer style={styles.viewer}>
            <Document>
            <Page size="Letter" style={styles.page}>
                <View style={styles.section}>
                    <Text></Text>
                    <Image style={styles.image} src='/LOGO_2C1.png'/>
                    <Text style={styles.h1}>UNIVERSIDAD CATÓLICA DE HONDURAS</Text>
                    <Text style={styles.h2}>"Nuestra Señora Reina de la Paz"</Text>
                    <Text style={styles.h3}>Reporte de mantenimiento</Text>
                </View>    
            </Page>
            </Document>
        </PDFViewer>
    );
  }
}
