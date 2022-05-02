import { updateUserData, updateCertainUserData } from "lib/api";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { SubtitleStyle, TitleStyle } from "ui/typhography/index";
import { SecondaryButton } from "ui/buttons/index";

export function UserDataComponent({ className }) {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [userData, setUserData] = useState({
        email: '',
        age: 0,
        username: '',
    });
    
    async function handleUserDataForm (loginData) {
        console.log(loginData);
        await setUserData(loginData);
        loginData = ""
    }

    useEffect(() => {

        if ( userData?.email != '' && userData?.age != 0 || null && userData?.username != '') {
            console.log(userData);
            updateUserData(userData);

        } else {
            console.log(userData);
            updateCertainUserData(userData);
        }
    }, [userData]);
    

    return <div className={className}>
    
        <form onSubmit={handleSubmit(handleUserDataForm)} className="user-form">
            <TitleStyle> Perfil </TitleStyle>
            <SubtitleStyle> Solo puedes actualizar un dato a la vez, o todos juntos 😞 </SubtitleStyle>

            <label className="label">
                <div> Nombre de usuario </div>
                <input className="name-input input" { ...register("username", { maxLength: 15 })} placeholder="Nombre de usuario..." type="text" />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    { errors.username && <span style={{ maxWidth: 200, textAlign: "center", color: "red", margin: 1 }}> Se puede hasta 15 caracteres :( </span> }
                </div>
            </label>

            <label className="label">
                <div> Tu edad </div>
                <input className="age-input input" { ...register("age", { maxLength: 3 })} placeholder="Edad.." type="number" />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    { errors.age && <span style={{ maxWidth: 190, textAlign: "center", color: "red", margin: 2 }}> Máximo 3 dígitos! ( acaso tenés más de mil años!? 🤔 ) </span> }
                </div>
            </label>

            <label className="label">
                <div> Email </div>
                <input className="email-input input" { ...register("email", { maxLength: 25 }) } placeholder="Email..." type="email" />
                <div style={{ display: "flex", flexDirection: "column" }}>
                    { errors.email && <span style={{ maxWidth: 180, alignSelf: "center", color: "red", margin: 5, textAlign: "center" }}> No se pueden más de 25 caracteres </span> }
                </div>
            </label>
            <SecondaryButton margin={5 + "px"} width={200 + "px"} height={35 + "px"}> Guardar </SecondaryButton>
        </form>
    </div>
}