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

        const resTramite = await fetch(CONFIG + '/alumnos-programas-tramites/leer/codigo-alumno/' + this.state.id);
        const listaTramite = await resTramite.json();
        console.log(resTramite);
        console.log(listaTramite);

        let arrayTramite = [];

        listaTramite.forEach(element => {
            let tramite = {
                id: element.idApt,
                cod_alumno: this.state.id,
                id_programa: element.idPrograma,
                id_tipotramite: element.idTipoTramite,
                id_apb: element.idApb,
                n_expediente: element.nExpediente,
                anio_expediente: element.anioExpediente,
                fecha_expediente: element.fechaExpediente,
                n_tramite: element.nTramite,
                anio_tramite: element.anioTramite,
                fecha_emision: element.fechEmision,
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


