import React, { Component } from 'react'
import '../App.css'
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'
import Select from 'react-select';
import { browserHistory } from 'react-router-3';

class TramiteRegistrar extends Component {


    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.name,
            n_expediente: '',
            anio_expediente: '',
            fecha_expediente: '',
            n_tramite: '',
            anio_tramite: '',
            fecha_emision: '',
            usuario_emision: '',
            n_oficio: '',
            anio_oficio: '',
            fecha_oficio: '',
            importe_oficio: '',
            importe_matricula: '',
            importe_matricula_ad: '',
            importe_matricula_epg: '',
            importe_ensenanza: '',
            importe_repitencia: '',
            importe_otros: '',
            importe_total:'',
            programas: [],
            tipotramites: [],
            programasbeneficios: [],
            programa: '',
            tipotramite: '',
            programabeneficio: ''
        }
        this.guardar = this.guardar.bind(this);

    }

    async componentDidMount() {
        console.log("gaaaa")
       const resTipoTramites = await fetch(CONFIG + 'tipos-tramites/listar');
        const tipotramites = await resTipoTramites.json();
        console.log(resTipoTramites);
        console.log(tipotramites);

        const resProgramasBeneficios = await fetch(CONFIG + '/alumnos-programas-beneficios/listar');
       const programasbeneficios = await resProgramasBeneficios.json();
       console.log(resProgramasBeneficios);
       console.log(programasbeneficios);

      const resProgramas = await fetch(CONFIG + '/alumnos-programas-tramites/listar');
      const programas = await resProgramas.json();
      console.log(resProgramas);
      console.log(programas);


       let arrayProgramasBeneficios = [];
        let arrayProgramas = [];
       let arrayTipoTramites = [];

       tipotramites.forEach(element => {
           let tipotramite = {
               value: element.idTipoTramite,
               label: element.descTipoTramite,
           };
           arrayTipoTramites.push(tipotramite)
       });

       programasbeneficios.forEach(element => {
           let programabeneficio = {
               value: element.idBeneficio,
               label: element.beneficioOtorgado
           };
           arrayProgramasBeneficios.push(programabeneficio)
       });


        programas.forEach(element => {
           let programa = {
               value: element.idPrograma,
               label: element.idPrograma
           };
           arrayProgramas.push(programa)
       });

       this.setState({
           tipotramites: arrayTipoTramites,
           programasbeneficios: arrayProgramasBeneficios,
            programas: arrayProgramas
       });

    }

    async guardar() {

        let tramite = {
            id_apt: this.state.id_apt,
            cod_alumno: this.state.id,
            id_programa: this.state.programa,
            id_tipotramite: this.state.id_tipotramite,
            id_apb: this.state.programabeneficio,
            n_expediente: this.state.n_expediente,
            anio_expediente: this.state.anio_expediente,
            fecha_expediente: this.state.fecha_expediente,
            n_tramite: this.state.n_tramite,
            anio_tramite: this.state.anio_tramite,
            fecha_emision: this.state.fecha_emision,
            usuario_emision: this.state.usuario_emision,
            n_oficio: this.state.n_oficio,
            anio_oficio: this.state.anio_oficio,
            fecha_oficio: this.state.fecha_oficio,
            importe_oficio: this.state.importe_oficio,
            importe_matricula: this.state.importe_matricula,
            importe_matricula_ad: this.state.importe_matricula_ad,
            importe_matricula_epg: this.state.importe_matricula_epg,
            importe_ensenanza: this.state.importe_ensenanza,
            importe_repitencia: this.state.importe_repitencia,
            importe_otros: this.state.importe_otros,
            importe_total: this.state.importe_total


        }

      //  let tesisDocente = {
         //   id_docente: this.state.docente,
           // estado_id: this.state.estado,
           // rol_id: this.state.rol
       // }

        try {
            const resTramite = await fetch(CONFIG + '/alumnotematesis/add', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tramite)
            });

        //    const temaTramite = await resTramite.json();  //puede o no servir

      //      tesisDocente.id_atematesis = temaTesis.id_atematesis

          //  const resDocenteTemaTesis = await fetch(CONFIG + '/alumnotematesisdocente/add', {
          //      method: 'PUT',
           //     headers: {
              //      'Accept': 'application/json',
            //        'Content-Type': 'application/json',
          //      },
        //        body: JSON.stringify(tesisDocente)
      //      });

    //        const temaTesisDocente = await resDocenteTemaTesis.json();

            swal("Trámite registrado correctamente!" ,"", "success").then(
                this.Regresar()
            );

        } catch (err) {
            return err;
        }
    }

    Regresar = (e) => {
        browserHistory.push('/' + this.state.id + '/tramite');
        e.preventDefault();
    }

    render() {

        return (
            <div>
                <div >
                    <h3>Formulario de registro de tramite
                        <ul id="nav-mobile" className="row right hide-on-med-and-down">
                            <li><a className="col seleccionar" onClick={this.Regresar}>Regresar<i className="material-icons right">reply</i></a></li>
                        </ul>
                    </h3>
                </div>


                <div className="container" >

                    <div className="row ">
                        <div className="col-md-12"><h4 >Datos del Trámite</h4></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Tipo de trámite:</h6></div>
                        {/* <div className="col-md-12"><input type="text" id="condicion" placeholder="Condicion"disabled/></div> */}
                        <div className="col-md-9">
                            <Select
                                value={this.state.tipotramite}
                                options={this.state.tipotramites}
                                onChange={this.onChangeTipoTramite}
                            />
                        </div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Número:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="text" id="n_tramite" onChange={this.onChange} value={this.state.n_tramite} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Año:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="text" id="anio_tramite" onChange={this.onChange} value={this.state.anio_tramite} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Fecha de Emisión:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="text" id="fecha_emision" onChange={this.onChange} value={this.state.fecha_emision} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Usuario Emisión:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="text" id="usuario_emmision" onChange={this.onChange} value={this.state.usuario_emision} /></div>
                    </div>

                    <div className="row ">
                        <div className="col-md-12"><h4 >Datos del Oficio</h4></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Número:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="n_oficio" onChange={this.onChange} value={this.state.n_oficio} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Año:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="anio_oficio" onChange={this.onChange} value={this.state.anio_oficio} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Fecha de Oficio:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="date" id="fecha-oficio" onChange={this.onChange} value={this.state.fecha_oficio} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe Oficio:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_oficio" onChange={this.onChange} value={this.state.importe_oficio} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Programa:</h6></div>
                        {/* <div className="col-md-12"><input type="text" id="condicion" placeholder="Condicion"disabled/></div> */}
                        <div className="col-md-9">
                            <Select
                                value={this.state.programa}
                                options={this.state.programas}
                                onChange={this.onChangePrograma}
                            />
                        </div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Beneficio:</h6></div>
                        {/* <div className="col-md-12"><input type="text" id="condicion" placeholder="Condicion"disabled/></div> */}
                        <div className="col-md-9">
                            <Select
                                value={this.state.programabeneficio}
                                options={this.state.programasbeneficios}
                                onChange={this.onChangeProgramaBeneficio}
                            />
                        </div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe Matricula:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_matricula" onChange={this.onChange} value={this.state.importe_matricula}/></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe MatriculaAD:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_matricula_ad" onChange={this.onChange} value={this.state.importe_matricula_ad} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe MatriculaEPG:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_matricula_epg" onChange={this.onChange} value={this.state.importe_matricula_epg} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe Enseñanza:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_ensenanza" onChange={this.onChange} value={this.state.importe_matricula_epg} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe Repitencia:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_repitencia" onChange={this.onChange} value={this.state.importe_matricula_epg} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe Otros:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_otros" onChange={this.onChange} value={this.state.importe_matricula_epg} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe Total:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_total" onChange={this.onChange} value={this.state.importe_total} /></div>
                    </div>

                    <div className="row">

                        {/* <div className=" col-md-6">
                                        <button  onClick={this.habilitar} className="  waves-effect waves-light btn-large botonazul2  " type="submit">Editar<i className=" material-icons left">check</i></button>
                                    </div> */}
                        <div className=" col-md-6">
                            <button onClick={this.guardar} className="  waves-effect waves-light btn-large botonazul2  " type="submit"><i className=" material-icons left">save</i></button>
                        </div>


                    </div>




                </div>


            </div>

        )
    }

    onChangePrograma = e => {
        if (e != null) {
            this.setState({
                programa: e.value
            })
            console.log(e);
        } else {
            swal("Escoja una condicion", "", "warning");
        }
    }

    onChangeTipoTramite = e => {
        if (e != null) {
            this.setState({
                tipotramite: e.value
            })
            console.log(e);
        } else {
            swal("Escoja un tipo de trámite", "", "warning");
        }
    }

    onChangeProgramaBeneficio = e => {
        if (e != null) {
            this.setState({
                programabeneficio: e.value
            })
            console.log(e);
        } else {
            swal("Escoja un tipo de programa beneficio", "", "warning");
        }
    }

    onChange = e => {
        console.log(e.target.id, e.target.value);
        this.setState({
            [e.target.id]: e.target.value
        })
    }

}

export default TramiteRegistrar;
