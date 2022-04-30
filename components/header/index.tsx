import Link from "next/link";
import Router from "next/router";
import { useMe } from "lib/hooks";
import { getSavedToken } from "lib/api";
import { useEffect, useState } from "react";
import { TertiaryButton } from "ui/buttons";
import { SubtitleStyle, BodyStyle } from "ui/typhography/index";
import { BurgerMenu, CloseXMenu, ApxMobileLogo, ApxDesktopLogo } from "ui/icons/index";

export function Header({ className }) {
    const userData = useMe();
    const [ token, setToken ] = useState(null);
    const [ toggle, setToggle ] = useState(false);
    const [ userDataSaved, setUserDataSaved ] = useState(userData);
    
    useEffect(() => {
        const tokenFromLocal: any = getSavedToken();

        if (tokenFromLocal) {
            setToken(tokenFromLocal);
            userData ? setUserDataSaved(userData) : null;
        }
        
    }, []);

    function openMenu(e) {
        e.preventDefault();
        setToggle(true);
    }

    function goToIngresar(e) {
        e.preventDefault();
        Router.push("/signin");
    }

    function goToPerfil(e) {
        e.preventDefault();
        token ? Router.push("/profile") : Router.push("/signin");
    }

    function goToBuscar(e) {
        e.preventDefault();
        Router.push("/search");
    }

    function goToFavs(e) {
        e.preventDefault();
        token ? Router.push("/user-favs") : Router.push("/signin");
    }

    function closeMenu(e) {
        e.preventDefault();
        setToggle(false);
    }

    function logout(e) {
        e.preventDefault();
        setToggle(false);
        setToken(null);
        localStorage.clear();
        Router.push("/home");
    }

    return <div className={className}>

        { toggle && token ? <div className="menu-mobile">
            <a href="false" onClick={closeMenu}>
                <CloseXMenu className="close-menu" width={30} height={30} />
            </a>

            <div onClick={goToIngresar}> <SubtitleStyle className="options" color="#FEFEFE"> Ingresar </SubtitleStyle> </div>
            <div onClick={goToPerfil}> <SubtitleStyle className="options" color="#FEFEFE"> Mi perfil </SubtitleStyle> </div>
            <div onClick={goToBuscar}> <SubtitleStyle className="options" color="#FEFEFE"> Buscar </SubtitleStyle> </div>
            <div onClick={goToFavs}> <SubtitleStyle className="options" color="#FEFEFE"> Mis favoritos </SubtitleStyle> </div>

            <p className="email"> { userDataSaved?.email } </p>
            <div onClick={logout}> <BodyStyle color="#E75A7C"> Cerrar sesión </BodyStyle> </div>
        </div>
        
        : toggle && !token ?

        <div className="menu-mobile">
            <a href="false" onClick={closeMenu}>
                <CloseXMenu className="close-menu" width={30} height={30} />
            </a>

            <div onClick={goToIngresar}> <SubtitleStyle className="options" color="#FEFEFE"> Ingresar </SubtitleStyle> </div>
            <div onClick={goToPerfil}> <SubtitleStyle className="options" color="#FEFEFE"> Mi perfil </SubtitleStyle> </div>
            <div onClick={goToBuscar}> <SubtitleStyle className="options" color="#FEFEFE"> Buscar </SubtitleStyle> </div>
        </div>
        
        : !toggle && token ?

        <div className="container">
            <div className="mobile-menu">
                <ApxMobileLogo />
                <a href="false" onClick={openMenu}>
                    <BurgerMenu width={40} height={30} />
                </a>
            </div>

            <div className="desktop-menu">
                <ApxDesktopLogo />
                <div className="contains-session">
                    <p style={{ color: "#FEFEFE" }} className="email-header"> { userDataSaved?.email } </p>
                    <p onClick={logout} style={{ color: "violet", textDecoration: "underline" }} className="logout"> cerrar sesión </p>
                </div>
            </div>
        </div>

        :

        <div className="container">
            <div className="mobile-menu">
                <ApxMobileLogo />
                <a href="false" onClick={openMenu}>
                    <BurgerMenu width={40} height={30} />
                </a>
            </div>

            <div className="desktop-menu">
                <ApxDesktopLogo />
                <div onClick={goToIngresar}> <TertiaryButton width={250 + "px"} height={45 + "px"}> Ingresar </TertiaryButton> </div>
            </div>
        </div>
        }
    </div>
}