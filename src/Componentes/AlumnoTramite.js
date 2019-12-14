import React from 'react'


class AlumnoTramite extends React.Component {
  
  render() {
      
        if(this.props.alumno, this.props.beneficio,this.props.programa){
          return (<div className="Alumno">
        <h4 className="center ">Datos personales</h4>
        <div className="center datos">
        <div>
        <i className="material-icons medium">account_circle</i>
        </div>
        <div>
            <b>Codigo:</b>
            <div className="negro">
            {this.props.alumno.apeNom}
            </div>
            
            <b>Beneficio:</b>
            <div className="negro">
            {this.props.beneficio.tipo}
            </div>

            <b>Programa:</b>
            <div className="negro">
            {this.props.programa.nom_programa}
            </div>

        </div>
        
         </div>

        </div>)
        }
        else{
            <p>No hay datos de alumno para mostrar</p>
        }
 
  }
  
}

export default AlumnoTramite;