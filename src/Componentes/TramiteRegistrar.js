import React, { Component } from 'react'
import '../App.css'
import swal from 'sweetalert';
import CONFIG from '../Configuracion/Config';
import Select from 'react-select';
import { browserHistory } from 'react-router-3';


class TramiteRegistrar extends Component {


    constructor(props) {
        super(props);

        this.state = {
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

        this.guardar = this.guardar.bind(this);
        this.update = this.update.bind(this);
        this.prog=[]
        this.actualizar=this.props.params.id
    }




    async componentDidMount() {

        const resTipoTramites = await fetch(CONFIG + 'tipos-tramites/listar');
        const tipotramites = await resTipoTramites.json();
        console.dir("Tipo de Tramites")
        console.log(resTipoTramites);
        console.log(tipotramites);

        const resProgramasBeneficios = await fetch(CONFIG + '/alumnos-programas-beneficios/leer/codigo-alumno/' +this.state.id);
        const programasbeneficios = await resProgramasBeneficios.json();
        console.dir("Programas Beneficio")
        console.log(resProgramasBeneficios);
        console.log(programasbeneficios);

        this.state.programabeneficio=programasbeneficios[0].idApb


        const resProgramas = await fetch(CONFIG + '/alumnos-programas-tramites/listar');
        const programas = await resProgramas.json();
        console.dir("Programas")
        console.log(resProgramas);
        console.log(programas);
        this.prog=programas;

        this.state.programa=programas[0].idPrograma

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

        this.cargar();

    }

    cargar(){
        if(this.prog.length>0){
            for (let i = 0; i < this.prog.length; i++) {
                if(this.prog[i].idApt==parseInt(this.actualizar,10)){

                    this.setState({
                        tipotramite: {value:this.prog[i].idTipoTramite, label:this.prog[i].descTipoTramite},
                        n_tramite: this.prog[i].nTramite,
                        anio_tramite: this.prog[i].anioTramite,
                        fecha_emision: this.prog[i].fechaEmision,
                        usuario_emision: this.prog[i].usuarioEmision,

                        n_oficio: this.prog[i].nOficio,
                        anio_oficio: this.prog[i].anioOficio,
                        fecha_oficio: this.prog[i].fechaOficio,
                        importe_oficio: this.prog[i].importeOficio,
                        importe_matricula: this.prog[i].importeMatricula,
                        importe_matricula_ad: this.prog[i].importeMatriculaAd,
                        importe_matricula_epg: this.prog[i].importeMatriculaEpg,
                        importe_ensenanza: this.prog[i].importeEnsenanza,
                        importe_repitencia: this.prog[i].importeRepitencia,
                        importe_otros: this.prog[i].importeOtros,
                        importe_total: this.prog[i].importeTotal,

                        programa: this.prog[i].idPrograma,
                        programabeneficio: this.prog[i].idApb
                    });

                };
            }
        }
    }


    async guardar() {

        let tramite = {
            //idApt: this.props.params.name,
            //idApt: this.state.id_apt,
            nomPrograma: this.state.nom_programa,
            codAlumno: this.state.id,
            idPrograma: this.state.programa,

            idTipoTramite: this.state.tipotramite,
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
            debugger
            const resTramite = await fetch(CONFIG + 'alumnos-programas-tramites/insertar', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tramite)
            });
            debugger
            console.dir(resTramite)


            swal("Trámite registrado correctamente!" ,"", "success").then(
                this.Regresar()
            );

        } catch (err) {
            return err;
        }
    }


    async update() {
        debugger

        let tramite = {

            idApt: parseInt(this.actualizar,10),

            nomPrograma: this.state.nom_programa,
            codAlumno: this.state.id,
            idPrograma: this.state.programa,

            idTipoTramite: this.state.tipotramite,
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
            const resTramite = await fetch(CONFIG + 'alumnos-programas-tramites/actualizar', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tramite)
            });
            debugger
            console.dir(resTramite)
            swal("Trámite actualizado correctamente!" ,"", "success").then(
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
                                setState={this.state.tipotramite}
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
                        <div className="col-md-9"><input className="estilo" type="date" id="fecha_emision" onChange={this.onChange} value={this.state.fecha_emision} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Usuario Emisión:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="text" id="usuario_emision" onChange={this.onChange} value={this.state.usuario_emision} /></div>
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
                        <div className="col-md-9"><input className="estilo" type="date" id="fecha_oficio" onChange={this.onChange} value={this.state.fecha_oficio} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe Oficio:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_oficio" onChange={this.onChange} value={this.state.importe_oficio} /></div>
                    </div>
                    {/*
                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Programa:</h6></div>

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

                        <div className="col-md-9">
                            <Select
                                value={this.state.programabeneficio}
                                options={this.state.programasbeneficios}
                                onChange={this.onChangeProgramaBeneficio}
                            />
                        </div>
                    </div>
           */}
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
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_ensenanza" onChange={this.onChange} value={this.state.importe_ensenanza} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe Repitencia:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_repitencia" onChange={this.onChange} value={this.state.importe_repitencia} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe Otros:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_otros" onChange={this.onChange} value={this.state.importe_otros} /></div>
                    </div>

                    <div className="row sombra">
                        <div className="col-md-3"><h6 >Importe Total:</h6></div>
                        <div className="col-md-9"><input className="estilo" type="number" id="importe_total" onChange={this.onChange} value={this.state.importe_total} /></div>
                    </div>

                    <div className="row">

                        {/* <div className=" col-md-6">
                                        <button  onClick={this.habilitar} className="  waves-effect waves-light btn-large botonazul2  " type="submit">Editar<i className=" material-icons left">check</i></button>
                                    </div> */}

                        {!this.props.params.id  && <div className=" col-md-6" >

                            <button onClick={this.guardar} className="  waves-effect waves-light btn-large botonazul2  " type="submit"><i className=" material-icons left">save</i>Guardar</button>
                        </div>
                        }
                        {this.props.params.id  && <div className=" col-md-6" >
                            <button onClick={this.update} className="  waves-effect waves-light btn-large botonazul2  " type="submit"><i className=" material-icons left">save</i>Actualizar</button>
                        </div>
                        }
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
