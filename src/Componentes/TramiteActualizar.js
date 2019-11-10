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
            idTesis: this.props.params.code,
            id: this.props.params.name,
            titulo: '',
            situacion: '',
            problema: '',
            justificacion: '',
            fecha: '',
            comentario: '',
            programas: [],
            grupos: [],
            cursos: [],
            docentes: [],
            estados: [],
            roles: [],
            // programa: '',
            grupo: '',
            curso: '',
            docente: '',
            estado: '',
            rol: '',
            planestudios: ''
        }
        this.actualizar = this.actualizar.bind(this);
        console.log(this.state.idTesis);
    }

    async componentDidMount() {

        const resGrupos = await fetch(CONFIG + '/gi/listar');
        const grupos = await resGrupos.json();

        const resCursos = await fetch(CONFIG + '/curso/listar');
        const cursos = await resCursos.json();

        const resDocentes = await fetch(CONFIG + '/docente/listar');
        const docentes = await resDocentes.json();

        const resEstados = await fetch(CONFIG + '/estado/listar');
        const estados = await resEstados.json();

        const resRoles = await fetch(CONFIG + '/rol/listar');
        const roles = await resRoles.json();

        const resTesis = await fetch(CONFIG + '/tesisss/buscar/' + this.state.idTesis);
        const tesis = await resTesis.json();

        let arrayGrupos = [];
        let arrayCursos = [];
        let arrayDocentes = [];
        let arrayEstados = [];
        let arrayRoles = [];

        grupos.forEach(element => {
            let grupo = {
                value: element.id_gi,
                label: element.gi_desc
            };
            arrayGrupos.push(grupo)
        });

        cursos.forEach(element => {
            let curso = {
                value: element.idCurso,
                label: element.nomCurso,
                planestudios: element.planestudios
            };
            arrayCursos.push(curso)
        });

        docentes.forEach(element => {
            let docente = {
                value: element.idDocente,
                label: element.nombres
            };
            arrayDocentes.push(docente)
        });

        estados.forEach(element => {
            let estado = {
                value: element.estado_id,
                label: element.estado_descripcion
            };
            arrayEstados.push(estado)
        });

        roles.forEach(element => {
            let rol = {
                value: element.rol,
                label: element.rol_desc
            };
            arrayRoles.push(rol)
        });

        this.setState({
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

        let tesis = {
            id_atematesis: this.state.idTesis,
            atematesis_titulo: this.state.titulo,
            atematesis_situacion: this.state.situacion,
            atematesis_problema: this.state.problema,
            atematesis_justificacion: this.state.justificacion,
            atematesis_fecha: this.state.fecha,
            atematesis_comentario: this.state.comentario,
            gi_id: this.state.grupo,
            id_curso: this.state.curso,
            planestudios: this.state.planestudios
        }

        let tesisDocente = {
            id_docente: this.state.docente,
            id_atematesis: this.state.idTesis,
            estado_id: this.state.estado,
            rol_id: this.state.rol
        }

        try {
            const resDocenteTemaTesis = await fetch(CONFIG + '/alumnotematesisdocente/update', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tesisDocente)
            });

            const resTemaTesis = await fetch(CONFIG + '/alumnotematesis/update', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tesis)
            });

            swal("Tesis actualizada correctamente!", "", "success").then(
                this.Regresar()
            );

        } catch (err) {
            return err;
        }
    }

    Regresar = (e) => {
        browserHistory.push('/' + this.state.id + '/tesis');
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