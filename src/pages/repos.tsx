import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingContext";

import { getReposDetail } from "../services/users.services";

import { Header } from "../components/header";
import { Loading } from "../components/loading";

interface Repository {
    name: string;
    description: string;
    svn_url: string;
    language: string;
    private: boolean;
}

export function Repos() {
    const { userName, reposName } = useParams();
    const [repos, setRepos] = useState<Repository>();

    const { isLoading, setLoading } = useLoading()

    const getRepository = async () => {
        setLoading(true)
        const response = userName && reposName && await getReposDetail(userName, reposName);
        setRepos(response && response.data);
        setLoading(false)
    }

    useEffect(() => {
        getRepository()
    }, [reposName])

    return (
        <>
            <Header />

            <main className="min-h-screen justify-center items-center bg-gray-100 flex flex-col px-5 py-5">
                <section className="px-5 py-5 w-full lg:max-w-1/2 md:px-10 md:py-10 rounded-2xl bg-white shadow-md">
                    <h1 className="text-2xl font-bold mb-6">Especifições</h1>

                    {isLoading ? (
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <Loading />
                        </div>
                    ) : (
                        <div className="px-3 py-3 md:px-10 md:py-10 rounded-3xl border-2 border-gray-200 bg-white shadow-md">
                            <h2 className="text-lg md:text-5x1 font-bold mb-4">{repos?.name}</h2>

                            <hr className="border-t-3 border-t-gray-200" />

                            <div className="flex flex-col mb-4 mt-6 px-5 py-2 bg-gray-200 rounded-2xl" >
                                <span className="text-gray-600 text-[.9rem]">Link</span>
                                <a className="underline text-[#202E49] overflow-hidden text-ellipsis whitespace-nowrap" href={repos?.svn_url} target="blank">{repos?.svn_url}</a>
                            </div>

                            <div className="flex flex-col mt-4 px-5 py-2 bg-gray-200 rounded-2xl">
                                <span className="text-gray-600 text-[.9rem]">Privacidade</span>
                                <p className="text-[#202E49] overflow-hidden text-ellipsis whitespace-nowrap">{repos?.private ? "Privado" : "Público"}</p>
                            </div>

                            <div className="flex flex-col mt-4 px-5 py-2 bg-gray-200 rounded-2xl">
                                <span className="text-gray-600 text-[.9rem]">Linguagem</span>
                                <p className="text-[#202E49] overflow-hidden text-ellipsis whitespace-nowrap">{repos?.language}</p>
                            </div>

                            <div className="flex flex-col mt-4 px-5 py-2 bg-gray-200 rounded-2xl">
                                <span className="text-gray-600 text-[.9rem]">Descrição</span>
                                <p className="text-[#202E49] overflow-hidden">{repos?.description}</p>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>
    )
}