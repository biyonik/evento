import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/">
            <Image src="/logo.png" alt="Evento" width={53} height={12}/>
        </Link>
    )
}