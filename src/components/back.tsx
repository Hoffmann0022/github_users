import { useNavigate } from "react-router-dom";

type Page = string

type Props = {
    page: Page
}

export function Back({ page }: Props){
    const navigate = useNavigate()

    return(
        <div role="button" className="absolute top-20 left-5 flex cursor-pointer gap-1 " onClick={() => navigate(page)}>
            <i className="bi bi-chevron-left text-yellow-500"></i><p className="text-blue-900 hover:underline bold">Voltar</p>
        </div>
    )
}