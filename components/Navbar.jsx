import React from "react";
import { ModeToggle } from "./themeBtn";

const Navbar = () => {
    return (
        <nav className="flex items-center border-2 px-10 py-3 md:px-6 sm:px-4 sticky top-0 backdrop-blur-sm">
            {/* Logo */}
            <div className="logo english text-2xl font-bold flex-1 text-center md:text-left">
                Catholic <span className="text-purple-500">Urdu / English</span> Bible
            </div>

            {/* Theme Toggle Button */}
            <div className="absolute top-4 right-4 md:static md:flex md:items-center">
                <ModeToggle />
            </div>
        </nav>
    );
};

export default Navbar;