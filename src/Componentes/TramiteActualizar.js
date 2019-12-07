import React, { Component } from 'react'
import '../App.css'
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config'
import Select from 'react-select';
import { browserHistory } from 'react-router-3';


class TramiteActualizar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            id: this.props.params.name,
            //id_apt: '',
            nom_programa: '',
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
        this.actualizar = this.actualizar.bind(this);
        console.log(this.state.id);
    }

    async componentDidMount() {

        const resTipoTramites = await fetch(CONFIG + 'tipos-tramites/listar');
        const tipotramites = await resTipoTramites.json();
        console.log(resTipoTramites);
        console.log(tipotramites);

        const resProgramasBeneficios = await fetch(CONFIG + '/alumnos-programas-beneficios/leer/codigo-alumno/' +this.state.id);
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
            nomPrograma:
            titulo: tesis.atematesis_titulo,
            situacion: tesis.atematesis_situacion,
            problema: tesis.atematesis_problema,
            justificacion: tesis.atematesis_justificacion,
            fecha: tesis.atematesis_fecha,
            comentario: tesis.atematesis_comentario,
            grupo: tesis.gi_id,
            curso: tesis.id_curso,
            planestudios: tesis.planestudios,
            docente: tesis.id_docente,
            estado: tesis.estado_id,
            rol: tesis.rol_id,
            grupos: arrayGrupos,
            cursos: arrayCursos,
            docentes: arrayDocentes,
            estados: arrayEstados,
            roles: arrayRoles,
            loading: false,
        });

        swal("Tesis cargada correctamente!" ,"", "success");

    }

    async actualizar() {

        let tramite = {
            //idApt: this.props.params.name,
            //idApt: this.state.id_apt,
            nomPrograma: this.state.nom_programa,
            codAlumno: this.state.id,
            idPrograma: this.state.programa,
            idTipoTramite: this.state.id_tipotramite,
            idApb: this.state.programabeneficio,
            nExpediente: this.state.n_expediente,
            anioExpediente: this.state.anio_expediente,
            fechaExpediente: this.state.fecha_expediente,
            nTramite: this.state.n_tramite,
            anioTramite: this.state.anio_tramite,
            fechaEmision: this.state.fecha_emision,
            usuarioEmision: this.state.usuario_emision,
            nOficio: this.state.n_oficio,
            anioOficio: this.state.anio_oficio,
            fechaOficio: this.state.fecha_oficio,
            importeOficio: this.state.importe_oficio,
            importeMatricula: this.state.importe_matricula,
            importeMatriculaAd: this.state.importe_matricula_ad,
            importeMatriculaEpg: this.state.importe_matricula_epg,
            importeEnsenanza: this.state.importe_ensenanza,
            importeRepitencia: this.state.importe_repitencia,
            importeOtros: this.state.importe_otros,
            importeTotal: this.state.importe_total


        }

        try {
            const resTramite = await fetch(CONFIG + '/alumnos-programas-tramites/actualizar', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tramite)
            });
            swal("Tramite actualizado correctamente!", "", "success").then(
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

        if (!this.state.loading) {
            return (
                <div>
                    <div >
                        <h3>Formulario de registro de tesis
                            <ul id="nav-mobile" className="row right hide-on-med-and-down">
                                <li><a className="col seleccionar" onClick={this.Regresar}>Regresar<i className="material-icons right">reply</i></a></li>
                            </ul>
                        </h3>
                    </div>


                    <div className="container" >

                        <div className="row ">
                            <div className="col-md-12"><h4 >Ingrese los campos</h4></div>
                        </div>

                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Titulo:</h6></div>
                            <div className="col-md-9"><input className="estilo" type="text" id="titulo" onChange={this.onChange} value={this.state.titulo} /></div>
                        </div>

                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Situacion:</h6></div>
                            <div className="col-md-9"><input className="estilo" type="text" id="situacion" onChange={this.onChange} value={this.state.situacion} /></div>
                        </div>

                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Problema:</h6></div>
                            <div className="col-md-9"><input className="estilo" type="text" id="problema" onChange={this.onChange} value={this.state.problema} /></div>
                        </div>

                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Justificacion:</h6></div>
                            <div className="col-md-9"><input className="estilo" type="text" id="justificacion" onChange={this.onChange} value={this.state.justificacion} /></div>
                        </div>

                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Fecha:</h6></div>
                            <div className="col-md-9"><input className="estilo" type="date" id="fecha" onChange={this.onChange} value={this.state.fecha} /></div>
                        </div>

                        <div className="row sombra2">
                            {/* <div className="col-md-2"><h4 >Autorizacion:</h4></div> */}
                            <div className="col-md-3"><h6 >Comentario:</h6></div>
                            <div className="col-md-9">
                                <textarea className="form-control " id="comentario" rows="3" onChange={this.onChange} value={this.state.comentario}></textarea>
                            </div>
                        </div>

                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Grupo de investigacion:</h6></div>
                            {/* <div className="col-md-12"><input type="text" id="condicion" placeholder="Condicion"disabled/></div> */}
                            <div className="col-md-9">
                                <Select
                                    value={this.state.grupo}
                                    options={this.state.grupos}
                                    onChange={this.onChangeGrupo}
                                />
                            </div>
                        </div>
                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Curso:</h6></div>
                            {/* <div className="col-md-12"><input type="text" id="condicion" placeholder="Condicion"disabled/></div> */}
                            <div className="col-md-9">
                                <Select
                                    value={this.state.curso}
                                    options={this.state.cursos}
                                    onChange={this.onChangeCurso}
                                />
                            </div>
                        </div>

                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Docente:</h6></div>
                            {/* <div className="col-md-12"><input type="text" id="condicion" placeholder="Condicion"disabled/></div> */}
                            <div className="col-md-9">
                                <Select
                                    value={this.state.docente}
                                    options={this.state.docentes}
                                    onChange={this.onChangeDocente}
                                />
                            </div>
                        </div>

                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Estado:</h6></div>
                            {/* <div className="col-md-12"><input type="text" id="condicion" placeholder="Condicion"disabled/></div> */}
                            <div className="col-md-9">
                                <Select
                                    value={this.state.estado}
                                    options={this.state.estados}
                                    onChange={this.onChangeEstado}
                                />
                            </div>
                        </div>

                        <div className="row sombra">
                            <div className="col-md-3"><h6 >Rol:</h6></div>
                            {/* <div className="col-md-12"><input type="text" id="condicion" placeholder="Condicion"disabled/></div> */}
                            <div className="col-md-9">
                                <Select
                                    value={this.state.rol}
                                    options={this.state.roles}
                                    onChange={this.onChangeRol}
                                />
                            </div>
                        </div>




                        <div className="row">

                            {/* <div className=" col-md-6">
                                            <button  onClick={this.habilitar} className="  waves-effect waves-light btn-large botonazul2  " type="submit">Editar<i className=" material-icons left">check</i></button>
                                        </div> */}
                            <div className=" col-md-6">
                                <button onClick={this.actualizar} className="  waves-effect waves-light btn-large botonazul2  " type="submit"><i className=" material-icons left">save</i></button>
                            </div>


                        </div>
                    </div>
                </div>

            )
        } else {
            return null
        }


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

    onChangeGrupo = e => {
        if (e != null) {
            this.setState({
                grupo: e.value
            })
            console.log(e);
        } else {
            swal("Escoja una condicion", "", "warning");
        }
    }

    onChangeCurso = e => {
        if (e != null) {
            this.setState({
                curso: e.value,
                planestudios: e.planestudios
            })
            console.log(e);
        } else {
            swal("Escoja una condicion", "", "warning");
        }
    }

    onChangeDocente = e => {
        if (e != null) {
            this.setState({
                docente: e.value
            })
            console.log(e);
        } else {
            swal("Escoja una condicion", "", "warning");
        }
    }

    onChangeEstado = e => {
        if (e != null) {
            this.setState({
                estado: e.value
            })
            console.log(e);
        } else {
            swal("Escoja una condicion", "", "warning");
        }
    }

    onChangeRol = e => {
        if (e != null) {
            this.setState({
                rol: e.value
            })
            console.log(e);
        } else {
            swal("Escoja una condicion", "", "warning");
        }
    }

    onChange = e => {
        console.log(e.target.id, e.target.value);
        this.setState({
            [e.target.id]: e.target.value
        })
    }
}
export default TramiteActualizar;