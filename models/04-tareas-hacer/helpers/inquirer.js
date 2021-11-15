const inquirer = require("inquirer");
require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "Que desea hacer?",
    choices: [
      { value: "1", name: `${"1.".green} Crear Tarea` },
      { value: "2", name: `${"2.".green} Listar Tareas` },
      { value: "3", name: `${"3.".green} Listar Tareas Completadas` },
      { value: "4", name: `${"4.".green} Listar Tareas Pendientes` },
      { value: "5", name: `${"5.".green} Completar Tareas` },
      { value: "6", name: `${"6.".green} Borrar Tareas` },
      { value: "0", name: `${"0.".green} Salir` },
    ],
  },
];

const inquireMenu = async () => {
  console.clear();
  console.log("===============================".green);
  console.log("==== Seleccione una opcion ====".white);
  console.log("===============================\n".green);

  const { opcion } = await inquirer.prompt(preguntas);

  return opcion;
};

const pausa = async () => {
  const entrada = [
    {
      type: "input",
      name: "entrada",
      message: `Presione ${"enter".green} para continuar`,
    },
  ];
  //  const { entrada } =
  console.log("\n");
  await inquirer.prompt(entrada);
  //  return entrada;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingrese un valor";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const confirmar = async(message) => {
  const question = [{
    type: 'confirm',
    name: 'ok',
    message
  }]

  const { ok } = await inquirer.prompt(question);
  return ok;
}

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    // map devuelve otro array con los elementos del anterior transformados.
    //lo que sea que yo haga return aca es como van a lucir los nuevos items del arreglo
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });
  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancelar'
  })

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(preguntas);
  return id;
};



const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;
    // map devuelve otro array con los elementos del anterior transformados.
    //lo que sea que yo haga return aca es como van a lucir los nuevos items del arreglo
    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: (tarea.completadoEn)? true : false
    };
  });


  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

module.exports = {
  inquireMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
};
