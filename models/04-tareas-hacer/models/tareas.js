/**
 * _listado:
 * { 'uuid-123321-123123: { id:12, desc: asd, compeltadoEn:99988}},...
 *
 */

const Tarea = require("./tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
      //            console.log(key);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borraTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(descripcion = "") {
    const tarea = new Tarea(descripcion);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    // 1. Desccrip :: Completada | Pendiente (completada en verde pendiente en rojo)
    // 2. desc2 :: Completada
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      console.log(
        `${idx} ${desc} :: ${
          completadoEn ? "Completada".green : "Pendiente".red
        }`
      );
    });
  }

  listarPendientesCompletadas(completadas = true) {
    let contador = 1;
    this.listadoArr.forEach((tarea) => {
      const { desc, completadoEn } = tarea;
      if (completadas) {
        if (completadoEn) {
          console.log(
            `${(contador + ".").green} ${desc} :: ${"Completada".green}`
          );
          contador += 1;
        }
      } else {
        if (!completadoEn) {
          console.log(
            `${(contador + ".").green} ${desc} :: ${"Pendiente".red}`
          );
          contador += 1;
        }
      }
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      //si no esta esta el id de esta tarea actual en el arreglo de ids, la limpio
      if (!ids.includes(tarea.id)) this._listado[tarea.id].completadoEn = null; //o sea, estoy agarrando todas las tareas que no estn en ids[]
    });
  }
}

module.exports = Tareas;
