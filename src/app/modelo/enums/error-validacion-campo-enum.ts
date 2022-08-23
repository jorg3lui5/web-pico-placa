export enum ErrorValidacionCampoEnum {
    //BÁSICO
    //Debe tener el formato de un email
    EMAIL = 'email', //
    //El número ingresado debe ser menor a n
    MAX = 'max', //
    // Debe tener máximo n caracteres
    MAX_LENGTH = 'maxlength', //
    //El número ingresado debe ser mayor a n
    MIN = 'min', //
    // Debe tener mínimo n caracteres
    MIN_LENGTH = 'minlength', //
    //Debe cumpli con el patrón especificado
    PATTERN = 'pattern', //
    //El campo es requerido
    REQUERIDO = 'required', //
    //El valor booleano debe ser verdadero
    REQUIRED_TRUE = 'requiredTrue', //

    //PERSONALIZADOS
    //Valida que el campo no tenga solo espacios en blanco
    ESPACIOS_EN_BLANCO = 'espaciosEnBlanco',
    //Valida que la fecha y hora de un campo sea mayor a la fecha y hora actual
    FECHA_HORA_MAYOR_A_LA_ACTUAL = 'fechaHoraMayorALaActual',

}