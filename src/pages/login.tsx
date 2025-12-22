import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../contexts/LoadingContext";

import { getUser } from "../services/users.services";
import { Loading } from "../components/loading";

export function Login() {
    const [user, setUser] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const { isLoading, setLoading } = useLoading()

    const searchUser = async () => {
        setLoading(true)
        try {
            user && await getUser(user);
            user !== '' ? navigate(`users/${user}`) :
                navigate(`/`)
        } catch (err) {
            setError(true)
        }
        setLoading(false)
    }

    return (
        <main className="flex-col sm:flex-row sm:gap-10 sm:pr-10 sm:justify-between h-screen flex justify-start items-center">
            <section className="h-28 w-full sm:h-full sm:animate-home  bg-[#05478A] flex justify-center items-center">

                <img className="w-50 md:w-80" src='./img/logo_home.png' alt="" />

            </section>
            {isLoading ? (
                <div className="sm:w-3/5 md:w-1/2 lg:w-3/4 h-full flex flex-col justify-center items-center">
                    <Loading />
                </div>
            ) : (
                <section className="sm:w-3/5 md:w-1/2 lg:w-3/4 h-screen bg-gray-100 flex flex-col justify-center items-center">
                    {error && (
                        <div>
                            <img className="mb-4" src='./img/error.png' alt="" />
                        </div>
                    )}
                    <div className="w-full flex flex-col justify-center items-center">
                        <h1 className="text-3xl sm:text-4x1 font-bold mb-6">Entrar</h1>

                        <div>
                            <p className="text-sm mb-3">Usuário</p>
                            <input className="w-65 sm:w-80 px-5 py-2 border-[#B5B5B5] border rounded-md " type="text" name="user" id="user" placeholder="Digite aqui seu usuário do Github" value={user} onChange={(e) => setUser(e.target.value)} />
                        </div>

                        <button className="
                    w-65 
                    sm:w-80
                    h-11 
                    rounded-md 
                    bg-[#05478A] 
                    mt-7 
                    text-[#ffff] 
                    font-bold
                    duration-200
                    cursor-pointer
                    hover:bg-[#032a50] 
                    " onClick={searchUser}>Entrar</button>
                    </div>

                </section>
            )}

        </main>
    )
}