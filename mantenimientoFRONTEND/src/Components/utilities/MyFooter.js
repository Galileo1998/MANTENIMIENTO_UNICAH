import React from 'react';


const MyFooter = ({title}) =>{
  return (
    <footer>
      <h1 style={styles.h1}>Derechos reservados, Universidad Católica de Honduras</h1>
    </footer>
  );
}

const styles = {
  h1:{
    backgroundColor:"#002a80",
    opacity: '0.87',
    color:"#FFF",
    textAlign:"center",
    fontSize:"15px",
    lineHeight: '4px',
    padding:"23px",
    margin:"0px",
  }
}

export default MyFooter;