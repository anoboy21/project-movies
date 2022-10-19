import MovieSVG from "../assets/MovieSVG.svg";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
    return (
        <nav className="flex flex-row pt-2 pb-2 pl-4 pr-4 text-neutral-300 bg-transparent">
            <Link href="/" passHref>
                <a className="">
                    <div className="flex flex-row justify-start">
                        <Image
                            src={MovieSVG}
                            alt={"Project Movies logo"}
                            height={30}
                            width={30}
                        />
                        <p className="font-medium text-lg hover:text-neutral-100">Movies</p>
                    </div>
                </a>
            </Link>
            <div className="grow"></div>
            <div className="flex flex-row gap-3 justify-around items-center">
                <p className="font-light text-base">Movies</p>
                <p className="font-light text-base">TV Shows</p>
                <p className="font-light text-base">People</p>
                {/* <p className="font-light text-base">Log in</p> */}
            </div>
        </nav>
    )
}