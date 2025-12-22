import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingContext";

import { getRepos, getUser } from "../services/users.services";

import { Card, type Repos } from "../components/card";
import { Header } from "../components/header";
import { Loading } from "../components/loading";

interface User {
    avatar_url: string;
    name: string;
    bio: string;

    repos: Repos[];
}


export function User() {
    const { userName } = useParams();
    const [user, setUser] = useState<User>()
    const [repos, setRepos] = useState<Repos[]>()
    const [limit, setLimit] = useState(1)
    const [current, setCurrent] = useState(0)
    const navigate = useNavigate()
    const size = window.innerWidth;

    const limitRepos = () => {
        if (size > 1200) {
            setLimit(3)
        } else if (size > 900) {
            setLimit(2)
        } else {
            setLimit(1)
        }

        return setLimit;
    }

    const { isLoading, setLoading } = useLoading()

    const getUserData = async () => {
        setLoading(true)
        const response = userName && await getUser(userName)
        setUser(response && response.data)
    }

    const getReposData = async () => {
        const response = userName && await getRepos(userName)
        setRepos(response && response.data)
        setLoading(false)
    }

    const visibleRepos = repos?.slice(current, current + limit);

    const handleNext = () => {
        if (repos && current + limit < repos.length) {
            setCurrent(current + limit);
        }
    };

    const handlePrev = () => {
        if (current - limit >= 0) {
            setCurrent(current - limit);
        }
    };

    useEffect(() => {
        getUserData()
        getReposData()
        limitRepos()
    }, [userName])

    return (
        <main className="pb-1 min-h-screen pt-20 flex flex-col justify-center  bg-gray-100">
            <Header />
            {isLoading ? (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <Loading />
                </div>
            ) : (
                <section className="mx-3 my-3 px-5 py-5 sm:mx-10 sm:my-10 sm:px-10 sm:py-10 h-full rounded-3xl bg-white shadow-md">

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Informações do perfil</h1>

                        <div className="w-full lg:w-3/5 max-w-2xl gap-10 px-8 py-8 flex flex-col sm:flex-row border-2 rounded-2xl border-gray-200 justify-left items-left sm:items-center">
                            <div className="w-50 h-50 bg-origin-border bg-cover bg-center bg-no-repeat rounded-2xl"
                                style={{ backgroundImage: `url(${user?.avatar_url})` }}></div>

                            <div className="w-full sm:w-auto flex flex-col gap-5">
                                <div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-gray-500">Nome</span>
                                        <p className="font-bold">{user?.name}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-gray-500">Bio</span>
                                        <p>{user?.bio}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="mt-10">
                        <div className="mb-7">
                            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Repositórios</h1>
                            <div className="w-full mt-2 flex justify-end items-center gap-2.5">
                                <p>{current + limit > (repos?.length ?? 0) ? repos?.length : current + limit} de {repos?.length}</p>
                                <div className="flex gap-1">
                                    <button onClick={handlePrev} disabled={current === 0} className="cursor-pointer disabled:opacity-20"><i className="bi bi-arrow-left-square text-3xl"></i></button>
                                    <button onClick={handleNext} disabled={current + limit >= (repos?.length ?? 0)} className="cursor-pointer disabled:opacity-20"><i className="bi bi-arrow-right-square text-3xl"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                            {visibleRepos && visibleRepos.map((r) => {
                                return (
                                    <Card onClick={() => navigate(`/repos/${userName}/${r.name}`)} id={r.id} name={r.name} description={r.description} svn_url={r.svn_url} />
                                )
                            })}
                        </div>
                    </div>

                </section>
            )}
        </main>
    )
}