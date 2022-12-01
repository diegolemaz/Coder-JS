// DATOS DE DE USUARIO E INICIALIZACION DE VARIABLES

let usuarioBase = "diegol";
let passwordBase = "pass";
let usuarioConEmail;
let ingresoConExito = false;

// LOGIN
let nombre = prompt("Ingrese su nombre:");
let usuario = prompt("Ingrese su usuario:");
let password = prompt("Ingrese su contraseña:");

// CONTROL DE LOGIN
function controlIngreso(par1, par2, par3, par4) {
  if (par1 === par2) {
    if (par3 === par4) {
      alert("bienvenido " + nombre);
      ingresoConExito = true;
    } else {
      alert("Su contraseña es errónea");
    }
  } else {
    if (par3 === par4) {
      alert("Su usuario es erróneo");
    } else {
      alert("Su usuario y contraseña son erróneos");
    }
  }
}

// FUNCION CONTROL DE USUARIO CON MAIL
function controlMail(par1, par2) {
  if (par2) {
    let contador = 0;
    for (let i = 0; i < par1.length; i++) {
      if (par1[i].match("@")) {
        contador = contador + 1;
      }
    }
    // CAMBIO DE USUARIO SIN @ AL MAIL INGRESADO DESDE PROMPT
    if (contador == 0) {
      let usuarioConEmail = prompt("Ingrese nuevo email:");
      usuarioBase = usuarioConEmail;
    }
  }
}

// FUNCION CONTROL DE PASSWORD 
function controlPassword(par1, par2) {
  // CONTROL SI ES MENOR A 8 CARCTERES
  if (par2) {
    if (par1.length <= 8) {
      alert("Su contraseña es insegura");
    }
    // CONTROL SI TIENE ALGUN NUMERO
    let contador = 0;
    for (let i = 0; i < par1.length; i++)
      if ("0123456789".match(par1[i])) {
        contador = contador + 1;
      }
    // CAMBIO DE PASSWORD INGRESADA DESDE PROMPT
    if (contador == 0) {
      let varResp = prompt(
        "Su contraseña debe tener caracteres alfanuméricos. Desea cambiarla?");
      if (varResp == "SI" || varResp == "si" || varResp == "Si") {
        let nuevoPassword = prompt("ingrese su nueva contraseña");
        passwordBase = nuevoPassword;
      }
    }
  }
}

controlIngreso(usuarioBase, usuario, passwordBase, password);
controlMail(usuarioBase, ingresoConExito);
controlPassword(passwordBase, ingresoConExito);