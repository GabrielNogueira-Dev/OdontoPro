export function Footer () {

    return (
        <footer className="py-6 text-center text-gray-500 text-sm md:text-base">
            <p>
                Todos direitos reservados © {new Date().getUTCFullYear()} — 
                <a 
                    className="hover:text-black ml-1"
                    href="https://www.linkedin.com/in/gabriel-nogueira-2944b5335/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GabrielNogueira.dev
                </a>
            </p>

            <div className="mt-3 flex justify-center gap-4 text-xs md:text-sm">
                <a 
                    className="hover:text-black"
                    href="/sobre"
                >
                    Sobre
                </a>

                <a 
                    className="hover:text-black"
                    href="/contacto"
                >
                    Contacto
                </a>

                <a 
                    className="hover:text-black"
                    href="/privacidade"
                >
                    Política de Privacidade
                </a>
            </div>

        </footer>
    )
}
