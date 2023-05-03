export function validate(input) {
    const inputType = input.dataset.type;
    if (validators[inputType]) {
        validators[inputType](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        /* showErrorMessage(inputType, input); */
        input.parentElement.querySelector(".input-message-error").innerHTML = showErrorMessage(inputType, input);
    };

}

const validators = {
    birth: input => validarNacimiento(input),
    name: input => validarNombre(input),
};

function showErrorMessage(inputType, input) {
    let message = "";

    const errorTypes = [
        "valueMissing",
        "typeMismatch",
        "patternMismatch",
        "customError"
    ];

    errorTypes.forEach((error) => {
        if (input.validity[error]) {
            message = errorMessages[inputType][error];
        }
    })

    return message;
    /* for (var key in input.validity) {
        if (input.validity[key]) {
            return errorMessages[inputType][key];
        }
    } */
}

const errorMessages = {
    name: {
        valueMissing: "Este campo no puede estar vacío.",
        customError: "Debes ingresar tu nombre completo."
    },
    email: {
        valueMissing: "Este campo no puede estar vacío.",
        typeMismatch: "El correo no es válido."
    },
    password: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "La contraseña debe tener entre 6 y 12 caracteres. Debe contener minúsculas, mayúsculas y números."
    },
    birth: {
        valueMissing: "Este campo no puede estar vacío.",
        customError: "Debes tener al menos 18 años de edad.",
    },
    tel: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El formato requerido es de 9XXXXXXXX"
    },
    adress: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "La dirección debe contener entre 5 a 40 caracteres."
    },
    city: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El nombre de la ciudad debe contener entre 5 a 40 caracteres."
    },
    state: {
        valueMissing: "Este campo no puede estar vacío.",
        patternMismatch: "El nombre del estado debe contener entre 5 a 40 caracteres."
    }
}

function validarNacimiento(input) {
    if (!input.value == "") {
        const fechaNacimiento = new Date(input.value);
        let message = "";
        if (!calcularMayoriaEdad(fechaNacimiento)) {
            message = "Debes tener al menos 18 años de edad.";
        }
        input.setCustomValidity(message);
    }
}

function validarNombre(input) {
    let message = "";
    if (input.value.length > 0 && input.value.length < 10) {
        message = "Debes ingresar tu nombre completo";
    }
    input.setCustomValidity(message);
}

function calcularMayoriaEdad(fechaNacimiento) {
    const today = new Date();
    const dateComparison = new Date(
        fechaNacimiento.getUTCFullYear() + 18,
        fechaNacimiento.getUTCMonth(),
        fechaNacimiento.getUTCDate()
    );
    return today >= dateComparison;
    /*         if (fechaNacimiento.getUTCMonth() <= today.getUTCMonth() && fechaNacimiento.getUTCDate() <= today.getUTCDate()) {
               //return today.getUTCFullYear - fechaNacimiento.getUTCFullYear + 1;
                console.log(today.getUTCFullYear() - fechaNacimiento.getUTCFullYear());
            }else{
                //return today.getUTCFullYear - fechaNacimiento.getUTCFullYear;
                console.log(today.getUTCFullYear() - fechaNacimiento.getUTCFullYear() - 1);
            }  
     */
}