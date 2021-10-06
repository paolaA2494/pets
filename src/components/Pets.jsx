import React, { Component } from 'react'
import axios from 'axios';


class Pet extends Component {

    //el mejor lugar para definir el estado de los datos
    constructor(props) {
        super(props);
        this.state = {
            //loading: true,
            //error: null,
            dataPet: [],
            modalInsertar: false,
            form: {
                name: '',
                type: '',
                age: '',
                description: '',
                id: ''
            },
            tipoFormulario: '',
            modalEliminar: false,
        };
    }

    peticionGet() {
       
        //Promesa = se cumple o no se cumple
        //then => hay exito en la promesa
        //catch => no hay exito en la promesa
        axios.get("http://localhost:3001/pets")
            .then((res) => {
                   this.setState({
                    //loading: false,
                    dataPet: res.data
                })
                console.log(this.state.dataPet);
            })
            .catch((err) =>{
              console.log(err.message);

            });
    }

    peticionPost=async () =>{
        delete this.state.form.id
         await axios.post('http://localhost:3001/pets', this.state.form)
         .then(response =>{
           this.modalInsertar();
           this.peticionGet();
         }).catch(error=>{
          console.log(error.message);
        })
         
       }

       peticionPut=()=>{
        axios.put(`http://localhost:3001/pets/${this.state.form.id}`, this.state.form)
        .then(response=>{
          this.modalInsertar();
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message);
        })
      }

      peticionDelete=()=>{
        axios.delete(`http://localhost:3001/pets/${this.state.form.id}`, this.state.form)
        .then(response=>{
          this.setState({modalEliminar: false});
          this.peticionGet();
        }).catch(error=>{
          console.log(error.message);
        })
      }
     
      modalInsertar=()=>{
        this.setState({modalInsertar: !this.state.modalInsertar});
      }

    handleChange=async(e)=>{
        e.persist();
        await this.setState({
          form:{
            ...this.state.form,
           [e.target.name]: e.target.value
          }
        })
        console.log(this.state.form)
       }

       seleccionarPet=(pet)=>{
        this.setState({
          tipoFormulario: 'actualizar',
          form: {
            id: pet.id,
            name: pet.name,
            type: pet.type,
            description: pet.description,
            age: pet.age
          }
        })
      }

      seleccionarPetDel=(pet)=>{
        this.setState({
          tipoFormulario: 'eliminar',
          form: {
            id: pet.id,
          }
        })
      }
     
    //excelente lungar para solicitar datos
    componentDidMount() {
        this.peticionGet();
    }
    

    //el mejor lugar del mundo para pintar datos
    render() {

        const datosForm = this.state.form;
        const datos = this.state.dataPet;

        return (
        <div className="container">
            <h1 className="text-center text-primary mt-5">Mi Página de Mascotas</h1>
            <button className="btn btn-primary justify-content-center" onClick={()=>{this.setState({form: null, tipoFormulario: 'insertar'}); this.modalInsertar()}}> Agregar Mascota</button>
             <div className="row">
               <div className="col-md-6 col-12 col-sm-12 mt-5 ">
               <h2 className="text-center text-primary">Mascotas</h2>
                <div className="mt-4">
                <ul>
                    {this.state.dataPet.map((pet)=> {
                        return (
                            <>
                            <li className="mb-5" key={`pet-${pet.id}`}>
                                <p>ID: {pet.id} </p>
                                <p>Nombre: {pet.name} </p>
                                <p>Edad: {pet.age}</p>
                                <p>Descripción: {pet.description}</p>
                                <p>Tipo de Mascota: {pet.type}</p>
                                <button className="btn btn-primary" onClick={()=>{this.seleccionarPet(pet); this.modalInsertar()}}>Editar</button>
                                 {"   "}
                                <button className="btn btn-danger"  onClick={()=>{this.seleccionarPetDel(pet); this.peticionDelete(); this.setState({modalEliminar: true}) }}>Eliminar</button>
                            </li>
                           
                            </>

                        )
                    }
                    )}
                  </ul>
                </div>
              </div>
    <div className="col-md-6 col-12 col-sm-12 mt-5">
        <form className="needs-validation my-4" >
          <h3 className="text-center pb-3 text-primary">Formato de Registro</h3>
          <div className="mx-auto">
            <label htmlFor="ID">ID: <span className="obligate text-primary">*</span></label>
            <input type="text" className="form-control mb-2"  required="" onChange={this.handleChange} name="id" id="id"
              value={datosForm ? datosForm.id : datos.length+1} />
            <label htmlFor="Name">Nombre: <span className="obligate text-primary">*</span></label>
            <input type="text" className="form-control mb-2" id="name"  required="" onChange={this.handleChange} name="name"
             value={datosForm ? datosForm.name : ''} />
        
            <label htmlFor="Age">Edad:<span className="obligate text-primary">*</span></label>
            <input type="text" className="form-control mb-2"  required="" onChange={this.handleChange} name="age" id="age"
              value={datosForm ? datosForm.age : ''} />
           
            <label htmlFor="Type">Tipo Mascota:<span className="obligate text-primary">*</span></label>
            <input type="text" className="form-control mb-2"  required="" onChange={this.handleChange} name="type" id="type"
              value={datosForm ? datosForm.type : ''} />
          
            <label htmlFor="Description">Descrpción: <span className="obligate text-primary">*</span></label>
            <input type="text" className="form-control mb-2" id="description" onChange={this.handleChange} name="description"
              value={datosForm ? datosForm.description : ''} />
           
            
          </div>

          {this.state.tipoFormulario ==='insertar'?
                   <button className="btn btn-primary btn-s btn-block mx-auto col-4 mt-4 mb-5" onClick={()=>this.peticionPost()}>
                    Guardar</button>: 
                    <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
            }
          

        </form>
      </div>

            </div>
        </div>
        );
    }
}

export default Pet;



