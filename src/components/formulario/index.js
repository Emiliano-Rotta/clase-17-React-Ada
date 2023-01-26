import { useState } from 'react';
import style from "./Form.module.css";
import ada from './ada.png';

export default function Form(){

  const[input, setInput] = useState({ nombre: "", apellido: "", mail: "", edad: "", foto: "" })
  const[datos, setDatos] = useState(false)
  const [estadoError, setEstadoError] = useState({})

  function funcionError(input){
    let error = {};

    if(!input.nombre || !/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.nombre)){
        error.nombre = 'Al menos dos caracteres el primero, letra mayuscula.';
    }
    if(!input.apellido || !/^[a-z]+[A-Za-z0-9\s]+$/g.test(input.apellido)){
        error.apellido = 'Al menos dos caracteres el primero, letra minuscula.';
    }
    if(!input.mail){
        error.mail = 'Coloque un mail';
    }
    if(!input.edad  || !/^[1-9]\d*(\.\d+)?$/.test(input.edad)){
        error.edad = 'El número tiene que ser positivo.';
    }
    if (!input.foto || !/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/.test(input.foto) ){
        error.foto = 'Debe ser una URL';
    }
    return error
  }

  function handleChange(e){
      e.preventDefault ();
      setInput({
      ...input,
      [e.target.name] : e.target.value,
      });
      setEstadoError(funcionError({
        ...input,
        [e.target.name]: e.target.value
      }));
  }

  function handleSubmit(e){
    e.preventDefault()
    if(input.nombre.length > 1
    && input.nombre.charAt(0).toUpperCase() === input.nombre.charAt(0)
    // && !errors.hasOwnProperty("nombre") //devuelve un buleano si el objeto tiene la propiedad especificada 
    && input.apellido.length > 1
    && input.apellido.charAt(0).toUpperCase() !== input.apellido.charAt(0)
    && input.mail.length > 1
    && input.edad > 0
    && input.foto.length > 1
    ) {
    alert ("Datos guardados con exito")
    setDatos (true)
    // setInput({ nombre: "", apellido: "", mail: "", edad: "", foto: "" })
    } else {
        alert ("Debe completar todos los datos con asteriscos (*) de manera correcta")
      }
      
  }
    

//   //Para cargar la foto desde la computadora
//   const [imageChosen, setImageChosen] = useState(false);
//   const [imagen, setImagen] = useState("");

//   async function handleChangeImagen(e) {
//   const archivos = e.target.files;
//   const data = new FormData();
  
//   data.append('file', archivos[0]);
//   data.append('upload_preset','ecommerce');
//   setImageChosen(true);
//   const res = await fetch('https://api.cloudinary.com/v1_1/hentech/image/upload', {
//       method: 'POST',
//       body: data
//   });
//   const file = await res.json();

//   setImagen(file.secure_url);
//   setDatos({...datos, foto: file.secure_url});
// }

  
  return(

    <div>
      <a href="https://adaitw.org/">
        <img className ={style.imagen}src = {ada} alt = {"ada"} />
      </a>

      <form className ={style.contenedor}  onSubmit = {(e)=>handleSubmit(e)} >
     
        <label> </label><br/>
        <input
        placeholder="Nombre: (*)"
        autoComplete="off"
        type = "text"
        value = {input.nombre}
        name = "nombre"
        onChange ={(e)=>handleChange(e)} 
        /> <br/>
        {estadoError.nombre && (<p className ={style.error}>{estadoError.nombre}</p>)} 
               
        <input  
        autoComplete="off"  
        type="text" 
        value={input.apellido} 
        name='apellido' 
        placeholder="Apellido. (*)"  
        onChange={(e)=>handleChange(e)} 
        /> <br/>
        {estadoError.apellido && (<p className ={style.error}>{estadoError.apellido}</p>)}

        <input  
        autoComplete="off"  
        type="text" 
        value={input.mail} 
        name='mail' 
        placeholder="Mail. (*)"  
        onChange={(e)=>handleChange(e)} 
        /><br/>
        {estadoError.mail && (<p className ={style.error}>{estadoError.mail}</p>)} 

        <input  
        autoComplete="off" 
        type="number" 
        value={input.edad} 
        name='edad'  
        placeholder="Edad. (*)" 
        onChange={(e)=>handleChange(e)}
        /> <br/>
        {estadoError.edad && (<p className ={style.error}>{estadoError.edad}</p>)} 

        <input  
        autoComplete="off"  
        type="text"
        // type="file" //(para trabajar con subir archivo) 
        value={input.foto} 
        name='foto'  
        placeholder="Foto. (*)" 
        onChange={(e)=>handleChange(e)}
        /> <br/>

        {/* imagen por computadora */}
        {/* <input 
        className={style.seleccionarArchivo} 
        type="file" 
        name="file" 
        onChange={handleChangeImagen}
        /> 
        <br/> 
        {imageChosen && (<img src={imagen} style={{width:'40%'}} alt="imagen"/>)} */}


        {estadoError.foto && (<p className ={style.error}>{estadoError.foto}</p>)} 

        <button className={style.boton} type='submit'>Guardar datos</button>

      </form>
      {datos ?
      (<div className ={style.datos}>
       {input.nombre}, tus datos guardados son: 
       Nombre: {input.nombre}, 
       Apellido: {input.apellido},
       Mail: {input.mail},
       Edad: {input.edad},
       Foto: {input.foto}.

      </div>): ""}

    </div>
  )
}