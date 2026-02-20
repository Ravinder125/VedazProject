import { Link, useLocation } from "react-router-dom"
import type { NavItem } from "./layou"
import Container from "./Container"

const Navbar = ({ itemsList = [] }: { itemsList: NavItem[] }) => {
    const location = useLocation();
    console.log(location.pathname)
    return (
        <Container className="mt-6 ">
            <nav>
                <ul className="flex gap-3 w-fit ml-auto bg-gray-100 px-4 py-1 rounded ">
                    {itemsList?.length >= 1 && itemsList.map((i) => (
                        <li key={i.label} className={`uppercase hover:text-primary ${i.href === location.pathname
                            ? "text-primary"
                            : ""
                            }`}>
                            <Link to={i.href}>
                                {i.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav >

        </Container>
    )
}

export default Navbar