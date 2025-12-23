export interface Repos{
    name: string;
    id: number;
    description: string;
    svn_url: string

    onClick: () => void;
}

export function Card({ name, id, description, svn_url, onClick }: Repos){
    return(
        <div key={id} onClick={onClick} className=" cursor-pointer border-2 rounded-2xl border-gray-200 px-5 py-12 max-w-96 flex flex-col justify-center items-left transition-all sm:hover:scale-110">
            <h2 className="text-2xl font-bold mb-4">{name}</h2>

            <hr className="border-t-2 border-t-[#0070E0]"/>

            <div className="flex flex-col mb-4 mt-6 px-5 py-2 bg-gray-200 rounded-2xl" >
                <span className="text-gray-600 text-[.9rem]">Link</span>
                <a className="underline text-[#202E49] overflow-hidden text-ellipsis whitespace-nowrap"href={svn_url} target="blank">{svn_url}</a>
            </div>
            <div className="flex flex-col mt-4 px-5 py-2 bg-gray-200 rounded-2xl">
                <span className="text-gray-600 text-[.9rem]">Descrição</span>
                <p className="text-[#202E49] overflow-hidden text-ellipsis whitespace-nowrap">{description}</p>
            </div>
        </div>
    )
}