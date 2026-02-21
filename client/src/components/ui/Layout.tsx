import Navbar from "./Navbar";

export type NavItem = {
    label: string;
    href: string;
}

const NavItemsList: NavItem[] = [
    {
        label: "home",
        href: "/"
    },
    {
        label: "My Bookings",
        href: "/my-bookings"
    }
]

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar itemsList={NavItemsList} />
            <div className="mt-3">
                {children}
            </div>

        </div>
    )
}

export default Layout