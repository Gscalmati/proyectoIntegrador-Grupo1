window.onload = function(){
    console.log("Adentro")
    let form = document.querySelector("#profile-form")

    form.addEventListener("submit", function(event){
        event.preventDefault()
        let errores = [];
        console.log("Todo parado")

        let fieldName = document.querySelector("input#name");

        if (fieldName.value == ""){
            errores.push({ param: "name", msg: "Ingrese un nombre mayor a 2 caracteres" })
        } else if (fieldName.value.length < 2) {
            errores.push({ param: "name", msg: "Ingrese un nombre mayor a 2 caracteres" })
        }

        let fieldSurname = document.querySelector("input#surname");

        if (fieldSurname.value.length < 2) {
            errores.push({ param: "surname", msg: "Ingrese un apellido mayor a 2 caracteres" })
        }

        let fieldEmail = document.querySelector("input#email");

        if (fieldEmail.value.length == "") {
            errores.push({ param: "email", msg: "Ingrese un email" })
        } else {
            let regex = new RegExp("\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b");
            if (!regex.match(fieldEmail.value)) {
            errores.push({ param: "email", msg: "Ingrese un email válido" }
            )}
        }

        let fieldUsername = document.querySelector("input#username");

        if (fieldUsername.value == "") {
            errores.push({ param: "username", msg: "El campo no puede estar vacío" })
        } else if (fieldUsername.value.length < 4) {
            errores.push({ param: "username", msg: "El username debe tener al menos 4 caracteres" })
        }

        let fieldPic = document.querySelector("input#profilePic");
        let picData = fieldPic.value;
        
        if (picData != ""){
            console.log("Se eligió una foto")
            let picExtension = picData.substring(
                picData.lastIndexOf('.') + 1).toLowerCase();
            if (picExtension != "jpg" && picExtension != "png" && picExtension != "jpeg"){
                errores.push({ param: "profilePic", msg: "La imagen debe ser de formato JPG/JPEG/PNG o ninguna" })
            } else {
                console.log("Cumple con los formatos")

            }
        }

            //let erroresUL = document.querySelector("#errors-ul")
        if (errores.length > 0) {
            event.preventDefault()
            console.log(errores)
            errores.forEach(elemento => {
                let error = document.querySelector("#error-" + elemento.param);
                error.innerHTML = "<span>" + "<i class='fas fa-exclamation-circle'></i>" + elemento.msg + "</span>";
                //erroresUL.innerHTML += "<li>" + "<i class='fas fa-exclamation-circle'></i>" + elemento.msg + "</li>"
            })
        }    

    })
}