require("colors");
const { guardarDB, leerDB } = require("./helpers/archivo");
const {
  inquireMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
} = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");

const main = async () => {
  //console.clear();
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB);
  }
  do {
    // imprimir el menu
    opt = await inquireMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion:");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas();
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5": 
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Esta seguro?");
          if (ok) {
            tareas.borraTarea(id);
            console.log("Tarea borrada");
          }
        }
        break;
    }
    guardarDB(tareas.listadoArr);
    await pausa();
  } while (opt !== "0");
};

main();
