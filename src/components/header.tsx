export function Header(){
    return(
        <header className="px-6 py-5 absolute w-full top-0 bg-white">
            <div>
                <img src={`${import.meta.env.BASE_URL}img/logo_page.png`} alt="" />
            </div>
        </header>
    )
}