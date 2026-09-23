import Link from "next/link";


export function Header() {
  return (
   <header className= "fixed top-0 left-0 right-0 z-999">
    <div className="">
        <Link href="/">
            OdontoPro
        </Link>
        <nav>
            <a href="#">Profissionais</a>
        </nav>
    </div>
   </header>
  );
}