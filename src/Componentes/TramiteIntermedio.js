import React from 'react'
import FormularioList from './formulario-list'
import '../App.css';
import {browserHistory} from 'react-router-3';
import CONFIG from '../Configuracion/Config';

class TramiteIntermedio extends React.Component{
    constructor(props){
        super(props)
        this.state={
            listas:[],
             form1: true,
                        form2: false,
                        form3: false,
                        form4: false,
                        form5: false,
                        codigo: this.props.params.name
        }
        this.Regresar=this.Regresar.bind(this);
       
    }


    componentWillMount() {
   

    fetch(CONFIG+'/beneficio/listar/' + this.props.codigo)
    .then((response)=>{
        return response.json()
    })
    .then((beneficio)=>{
        console.log("lsita de beneficios");
            console.log(beneficio);
        this.setState({listas:beneficio})
    })
    .catch(error=>{
        console.error(error)

    });

    
}
   
enviar=(e)=>{

    browserHistory.push('/registro-tramite/'+this.state.codigo+'&'+"");
    e.preventDefault();
}

 Regresar=(e)=>{
        browserHistory.push('/'+this.state.codigo);
        e.preventDefault();
    }



render() {


    return (
    <div>
    <h3>Lista de Tramites
    <ul id="nav-mobile" className="row right hide-on-med-and-down">
    <li ><a className="seleccionar col" onClick={this.Regresar}>Regresar<i className="material-icons right">reply</i></a></li>

    </ul>
    </h3>
          <div className="container">

          <div className="row center-xs centrar ">
              <div className="center-xs-12 margin_top ">
                  <FormularioList lista={this.state.listas} codigo={this.props.codigo} />
              </div>
          </div>


          <div className="row center-xs">
          <div className="col ">
          <button  onClick={this.enviar} className="  waves-effect waves-light btn-small botonazul2  " type="submit">Agregar<i className=" material-icons left">add</i></button>
          </div>
          </div>
          </div>
      </div>
    )
  }



}
export default TramiteIntermedio