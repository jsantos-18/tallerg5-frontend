import React from 'react';
import MaterialTable from 'material-table';
import { browserHistory } from 'react-router-3';
import AlumnoCodigo from './AlumnoCodigo'
import '../help.css';
import CONFIG from '../Configuracion/Config';
import { positions } from '@material-ui/system';
import { TableRow } from '@material-ui/core';

class Tramite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.name,//esto siempre va, como campo codigo de alumno
            //en mi caso, debe ir tambien, pero no como campo visual sino como esta aquí
            columns: [
                // { title: 'ID', field: 'id' },
                //  { title: 'Código', field: 'cod_alumno' },
                //  { title: 'Programa', field: 'id_programa' },
                { title: 'Tipo de Trámite', field: 'descTipoTramite' },
                //  { title: 'Beneficio', field: 'id_apb' },
                //  { title: 'Nro. Expediente', field: 'n_expediente' },
                //  { title: 'Año Expediente', field: 'anio_expediente' },
                //  { title: 'Fecha Expediente', field: 'fecha_expediente' },
                { title: 'Nro. Trámite', field: 'n_tramite' },
                { title: 'Año Trámite', field: 'anio_tramite' },
                { title: 'Fecha Emision', field: 'fecha_emision' },
                { title: 'Usuario Emision', field: 'usuario_emision'},
                { title: 'Nro. Oficio', field: 'n_oficio' },
                //  { title: 'Año Oficio', field: 'anio_oficio' },
                //  { title: 'Fecha Oficio', field: 'fecha_oficio' },
                //  { title: 'Importe Oficio' , field: 'importe_oficio' },
                //  { title: 'Importe Matricula' , field: 'importe_matricula' },
                //  { title: 'Importe MatriculaAd' , field: 'importe_matricula_ad' },
                //  { title: 'Importe MatriculaEpg' , field: 'importe_matricula_epg' },
                //  { title: 'Importe Enseñanza' , field: 'importe_ensenanza' },
                //  { title: 'Importe Repitencia' , field: 'importe_repitencia' },
                //  { title: 'Importe Otros' , field: 'importe_otros' },
                //  { title: 'Importe Total' , field: 'importe_total' }

            ],
            data: []
        }
        this.clase=AlumnoCodigo;
        this.programa='';
        this.beneficio='';

    }

    async componentDidMount() {

        const resTramite = await fetch(CONFIG + '/alumnos-programas-tramites/leer/codigo-alumno/' + this.state.id);
        console.log(resTramite);
        const listaTramite = await resTramite.json();
        console.dir("Lista de Tramites")
        console.log(listaTramite);

        if(listaTramite.length>0){
            // this.programa=listaTramite["0"].nomPrograma
            this.programa=listaTramite["0"].siglaPrograma
            this.beneficio=listaTramite["0"].tipo
        }


        let arrayTramite = [];

        listaTramite.forEach(element => {
            let tramite = {
                id: element.idApt,
                cod_alumno: this.state.id,
                id_programa: element.idPrograma,
                descTipoTramite: element.descTipoTramite,
                id_apb: element.idApb,
                n_expediente: element.nExpediente,
                anio_expediente: element.anioExpediente,
                fecha_expediente: element.fechaExpediente,
                n_tramite: element.nTramite,
                anio_tramite: element.anioTramite,
                fecha_emision: element.fechaEmision,
                usuario_emision: element.usuarioEmision,
                n_oficio: element.nOficio,
                anio_oficio: element.anioOficio,
                fecha_oficio: element.fechaOficio,
                importe_oficio: element.importeOficio,
                importe_matricula: element.importeMatricula,
                importe_matricula_ad: element.importeMatriculaAd,
                importe_matricula_epg: element.importeMatriculaEpg,
                importe_ensenanza: element.importeEnsenanza,
                importe_repitencia: element.importeRepitencia,
                importe_otros: element.importeOtros,
                importe_total: element.importeTotal

            };
            arrayTramite.push(tramite)
        });

        this.setState({
            data: arrayTramite
        });



    }





    agregar = (e) => {
        browserHistory.push('/' + this.state.id + '/tramite/agregar');
    }

    actualizar = (idTramite) => {
        browserHistory.push('/' + this.state.id + '/tramite/' + idTramite);
    }

    regresar = (e) => {
        browserHistory.push('/' + this.state.id);
        e.preventDefault();
    }

    render() {
        return (
            <div >
                <div >
                    <h3>Lista de tramites registrados
                        <ul id="nav-mobile" className="row right hide-on-med-and-down">
                            <li><a className="col seleccionar" onClick={this.regresar}>Regresar<i className="material-icons right">reply</i></a></li>
                        </ul>
                    </h3>
                </div>
                <div >
                    <this.clase alumno={this.state.id} programa={this.programa} beneficio={this.beneficio} />
                </div>


                <div className="container medium my-1">
                    <div className="p-4">
                        <MaterialTable
                            title= ""
                            columns={this.state.columns}
                            data={this.state.data}
                            editable={{
                                onRowDelete: oldData =>
                                    this.eliminar(oldData),

                            }}
                            options={{
                                headerStyle: {
                                    backgroundColor: '#01579b',
                                    color: '#FFF',
                                    borderRadius: 0,
                                    fontWeight: 'bold',
                                    fontSize: '15px'
                                },
                                rowStyle: {
                                    backgroundColor: '#EEE',
                                },


                            }}
                            actions={[
                                {
                                    icon: 'visibility',
                                    tooltip: 'Ver Oficio',
                                    // isFreeAction: true,
                                    onClick: this.regresar
                                },
                                {
                                    icon: 'edit',
                                    tooltip: 'Actualizar trámite',

                                    // isFreeAction: true,
                                    onClick: (event, rowData) => this.actualizar(rowData.id)
                                },
                                {
                                    icon: 'add',
                                    tooltip: 'Agregar trámite',
                                    isFreeAction: true,

                                    onClick: (event) => this.agregar()
                                },


                            ]}
                            localization={{
                                body: {
                                    editRow: {
                                        deleteText: '¿Estas seguro de eliminar esta fila?'
                                    },
                                    deleteTooltip: 'Eliminar usuario'
                                },
                                header: {
                                    actions: 'Acciones'

                                },
                                toolbar: {
                                    searchPlaceholder: 'Buscar',
                                    searchTooltip: 'Buscar'
                                },
                                pagination: {
                                    labelRowsSelect: 'filas',
                                    labelDisplayedRows: ' {from}-{to} de {count}',
                                    firstTooltip: 'Primera pagina',
                                    previousTooltip: 'Pagina anterior',
                                    nextTooltip: 'Pagina siguiente',
                                    lastTooltip: 'Ultima pagina'
                                }
                            }}

                        />


                    </div>
                </div>
            </div>
        )
    }

    async eliminar(oldData) {

        await fetch(CONFIG + '/alumnos-programas-tramites/borrar/' + oldData.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        let data = this.state.data;
        data.splice(oldData.tableData.id, 1);
        this.setState({ data });

        //Recargamos la página
        window.location.href = window.location.href;

    }


}

export default Tramite;
