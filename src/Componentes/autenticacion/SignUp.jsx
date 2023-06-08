/* eslint-disable react/no-unknown-property */
import { Link, useNavigate } from "react-router-dom"
import InstaChefLogo from "../../assets/InstaChefLogo.png"
import { useState } from "react"
import { UserAuth } from "../Auth-contex/AuthContex"
import { useDispatch } from "react-redux"
import { postSignUp } from "../../redux/actions"


export default function SignUp ()  {
    const {signUp, signuGogle, user} = UserAuth()
    let navigate = useNavigate()
    let dispacth = useDispatch()
    let [users, setUser] = useState({
      correo: "",
      contraseña: "",
      nombre: ""
    })

    let [error, setError] = useState("")
    
    const hanledChange = ({target: {name, value}}) => {
      setUser({
        ...users,
        [name]: value})
    }
    
    const hanledSubmit = async (e) => {
      e.preventDefault()
      setError("")
     try {
    await  signUp(users.correo, users.contraseña)
      navigate("/")
      if(user) {
        dispacth(postSignUp({
          name: users.nombre,
          email:  users.correo,
          password: users.contraseña
          
        }))
      }

      setUser({
        correo: "",
        contraseña: "",
        nombre: ""
      })
     } catch (error) {
      if(error.code === "auth/weak-password") {
        setError("Contraseña debil")        
      }
      if(error.code === "auth/invalid-email") {
        setError("Correo invalido") 
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Correo ya esta en uso") 
      }
      console.log(error.code);
    }
}

const hanledSigUpGoogle = async () => {
     try {
        await signuGogle()
    navigate("/")
    if(user) {
      dispacth(postSignUp({
        name: user.displayName,
        email:  user.email
      }))
    }
     } catch (error) {
       setError(error.message)
     }
    }
    
    return (
        <main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-200">
                <div className="text-center flex flex-col justify-center items-center">
                    <img src={InstaChefLogo}  className="w-32" />
                    <div className="mt-5 space-y-2">
                        <h3 className=" text-2xl font-bold sm:text-3xl">Registrate</h3>
                        <p className="">¿Ya tienes una cuenta?  <Link to="/LogIn">
                        <a  className="font-medium text-amber-400 hover:text-amber-500">Acceso</a>
                        </Link> </p>
                    </div>
                </div>
                <form
                    onSubmit={(e) => hanledSubmit(e)}
                    className="mt-8 space-y-5"
                >
                    {error && <p className=" text-sm text-red-800">{error}</p>}
                    <div>
                        <label className="font-medium">
                          Tu nombre
                        </label>
                        <input
                           onChange={(e) => hanledChange(e)}
                           name="nombre"
                            type="text"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-400 bg-transparent outline-none border focus:border-amber-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                           Correo electronico
                        </label>
                        <input
                           onChange={(e) => hanledChange(e)}
                           name="correo"
                            type="email"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-400 bg-transparent outline-none border focus:border-amber-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                           Contraseña
                        </label>
                        <input
                          onChange={(e) => hanledChange(e)}
                          name="contraseña"
                            type="password"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-400 bg-transparent outline-none border focus:border-amber-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-amber-400 hover:bg-amber-500 active:bg-amber-600 rounded-lg duration-150"
                    >
                      Crear cuenta
                    </button>
                </form>
                <button onClick={() => hanledSigUpGoogle()} className="w-full flex items-center justify-center gap-x-3 py-2.5 mt-5 border rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-amber-400 duration-150 active:bg-gray-100">
                    <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_17_40)">
                            <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                            <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                            <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                            <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                        </g>
                        <defs>
                            <clipPath id="clip0_17_40">
                                <rect width="48" height="48" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    Continar con Google
                </button>
            </div>
        </main>
    )
}
