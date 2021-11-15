require('dotenv').config()
const { leerInput, pausa, inquireMenu, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let opt = 0;
  const busquedas = new Busquedas();
  do {
    opt = await inquireMenu();
    switch (opt) {
      case 1:
        //mostrar prompt de lugar
        const termino = await leerInput('Ciudad: ');
        const lugares = await busquedas.ciudad(termino);
        //seleccionar lugar entre los resultados
        const idSelec = await listarLugares(lugares);
        if ( idSelec === '0') continue;
        const lugarSel = lugares.find(l => l.id = idSelec);
        busquedas.agregarHistorial(lugarSel.nombre);
        // obtener clima
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
        const {temp, min:temperaturaMinima, max} = clima;
        // mostrar resultado
        console.clear();
        console.log('\nInformacion de la ciudad\n'.green);
        console.log('Ciudad: ',lugarSel.nombre);
        console.log('Lat: ', lugarSel.lat);
        console.log('Long: ', lugarSel.lng);
        console.log('Clima:', clima.desc);
        console.log('Temperatura: ', temp);
        console.log('Minima: ', temperaturaMinima);
        console.log('Maxima:', max);
        break;
      case 2:
       busquedas.leerDB();
       //busquedas.historial
       busquedas.historialCapitalizado
        .forEach((lugar, i) =>{
            const idx = `${ i + 1}`.green;
            console.log( `${ idx } ${lugar}` );
        });

        break;
    }
    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
