import React from 'react';
import MaterialTable from 'material-table';
import { browserHistory } from 'react-router-3';
import '../help.css';
import CONFIG from '../Configuracion/Config';

class Tramite extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.name,//esto siempre va, como campo codigo de alumno
            //en mi caso, debe ir tambien, pero no como campo visual sino como esta aquí
            columns: [
                // { title: 'ID', field: 'id' },
                { title: 'CodigoAlumno', field: 'cod_alumno' },
                { title: 'Programa', field: 'id_programa' },
                { title: 'TipoTramite', field: 'id_tipotramite' },
                { title: 'ProgramaBeneficio', field: 'id_apb' },
                { title: 'NumeroExpediente', field: 'n_expediente' },
                { title: 'AnioExpediente', field: 'anio_expediente' },
                { title: 'FechaExpediente', field: 'fecha_expediente' },
                { title: 'NumeroTramite', field: 'n_tramite' },
                { title: 'AnioTramite', field: 'anio_tramite' },
                { title: 'FechaEmision', field: 'fecha_emision' },
                { title: 'UsuarioEmision', field: 'usuario_emision'},
                { title: 'NumeroOficio', field: 'n_oficio' },
                { title: 'AnioOficio', field: 'anio_oficio' },
                { title: 'FechaOficio', field: 'fecha_oficio' },
                { title: 'ImporteOficio' , field: 'importe_oficio' },
                { title: 'ImporteMatricula' , field: 'importe_matricula' },
                { title: 'ImporteMatriculaAd' , field: 'importe_matricula_ad' },
                { title: 'ImporteMatriculaEpg' , field: 'importe_matricula_epg' },
                { title: 'ImporteEnsenanza' , field: 'importe_ensenanza' },
                { title: 'ImporteRepitencia' , field: 'importe_repitencia' },
                { title: 'ImporteOtros' , field: 'importe_otros' },
                { title: 'ImporteTotal' , field: 'importe_total' }
            ],
            data: []
        }
    }

    async componentDidMount() {

        /*const resTramite = await fetch(CONFIG + '/tesiss/listar/' + this.state.id);
        const listaTramite = await resTramite.json();

        let arrayTramite = [];

        listaTramite.forEach(element => {
            let tramite = {
                id: element.id_apt,
                cod_alumno: this.state.id,
                id_programa: element.id_programa,
                id_tipotramite: element.id_tipotramite,
                id_apb: element.id_abp,
                n_expediente: element.n_expediente,
                anio_expediente: element.anio_expediente,
                fecha_expediente: element.fecha_expediente,
                n_tramite: element.n_tramite,
                anio_tramite: element.anio_tramite,
                fecha_emision: element.fecha_emision,
                usuario_emision: element.usuario_emision,
                n_oficio: element.n_oficio,
                anio_oficio: element.anio_oficio,
                fecha_oficio: element.fecha_oficio,
                importe_oficio: element.importe_oficio,
                importe_matricula: element.importe_matricula,
                importe_matricula_ad: element.importe_matricula_ad,
                importe_matricula_epg: element.importe_matricula_epg,
                importe_ensenanza: element.importe_ensenanza,
                importe_repitencia: element.importe_repitencia,
                importe_otros: element.importe_otros,
                importe_total: element.importe_total
            };
            arrayTramite.push(tramite)
        });

        this.setState({
            data: arrayTramite
        });

         */
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
                <div className="container medium my-5">
                    <div className="p-5">
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
                                }
                            }}
                            actions={[
                                {
                                    icon: 'update',
                                    tooltip: 'Actualizar trámite',
                                    // isFreeAction: true,
                                    onClick: (event, rowData) => this.actualizar(rowData.id)
                                },
                                {
                                    icon: 'add',
                                    tooltip: 'Agregar trámite',
                                    isFreeAction: true,
                                    onClick: (event) => this.agregar()
                                }
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
        console.log(oldData.id)
        await fetch(CONFIG + '/alumnotematesisdocente/delete/' + oldData.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        await fetch(CONFIG + '/alumnotematesis/delete/' + oldData.id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let data = this.state.data;
        data.splice(oldData.tableData.id, 1);
        this.setState({ data });
    }
}

export default Tramite;


