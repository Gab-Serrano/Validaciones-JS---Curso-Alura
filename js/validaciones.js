export function validate(input) {
    const inputType = input.dataset.type;
    if (validators[inputType]) {
        console.log(validators[inputType]);
        validators[inputType](input)
    }


}

const validators = {
    birth: input => validarNacimiento(input),
    name: input => validarNombre(input),

};

function validarNacimiento(input) {
    const fechaNacimiento = new Date(input.value);
    let message = "";
    if (!calcularMayoriaEdad(fechaNacimiento)) {
        message = "Debes tener al menos 18 años de edad.";
    }
    input.setCustomValidity(message);
}

function validarNombre(input) {
    let message = "";
    if (input.textContent.length < 5) {
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