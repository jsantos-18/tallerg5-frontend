import React from 'react'


class AlumnoCodigo extends React.Component {

    render() {

        if(this.props.alumno, !this.props.beneficio, !this.props.programa){
            return (<div className="Alumno">
                <h4 className="center ">Datos personales</h4>
                <div className="center datos">
                    <div>
                        <i className="material-icons medium">account_circle</i>
                    </div>
                    <b>Codigo:</b>
                    <div>
                    </div>
                    <div className="negro">
                        {this.props.alumno.apeNom}

                    </div>
                </div>
                {/*    <div className="center datos">
          <div>
          <i className="material-icons">fingerprint</i>
          </div>

          <b>Código:</b>
          <div className="negro">
            {this.props.alumno.codigo}
          </div>
        </div> */}
            </div>)
        }
        else if(this.props.alumno, this.props.beneficio, this.props.programa){
            return (<div className="Alumno">
                <h4 className="center ">Datos personales</h4>
                <div className="center datos">
                    <div>
                        <i className="material-icons medium">account_circle</i>
                    </div>

                    <div className="col-sm-12 col-md-6 offset-md-3">

                        <div className="row">
                            <div className="col-6 col-sm-4">
                                <b>Codigo:</b>
                                <div className="negro">
                                    {this.props.alumno}
                                </div>
                            </div>

                            <div className="col-6 col-sm-4">
                                <b>Beneficio:</b>
                                <div className="negro">
                                    {this.props.beneficio}
                                </div>
                            </div>

                            <div className="col-6 col-sm-4">
                                <b>Programa:</b>
                                <div className="negro">
                                    {this.props.programa}
                                </div>
                            </div>
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

export default AlumnoCodigo;