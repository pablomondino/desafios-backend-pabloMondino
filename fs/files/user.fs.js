const fs = require("fs");
const crypto = require("crypto");
const { json } = require("stream/consumers");
const { log, Console } = require("console");
class UserManager {
  static #users = [];
  // aca guardo momentañeamente los usuarios del archivo, para trabajar + eficiente leo el archivo por unica ve y lo guardo en memoria
  //la funcion iniciadora chequea que exista archivo y si no existe lo crea

  // en init defino la ruta que la defino en el constructor cuando yo defina la instancia
  /*
  init() {
    const exists = fs.existsSync(this.path);
    //chequea si existe la ruta, esa ruta se define en el constructor cuando yo defina la instancia
    console.log(exists);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      UserManager.#users = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    }
  }
   */
//camvie esta funcion inicializadora
  init() {
    const exists = fs.existsSync(this.path);
    console.log(exists);
    if (!exists) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
    } else {
      const fileContent = fs.readFileSync(this.path, "utf-8");
      try {
        UserManager.#users = JSON.parse(fileContent);
      } catch (error) {
        // Si hay un error al analizar el JSON, inicializa con un array vacío.
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
        UserManager.#users = [];
      }
    }
  }
  constructor(path) {
    this.path = path;
    this.init();
  }

  async create(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("no existe el nombre, la foto o el email");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        UserManager.#users.push(user);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(UserManager.#users, null, 2)
        );
        console.log("created Id: " + user.id);

        return user.id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  read() {
    try {
      if (UserManager.#users === 0) {
        throw new Error("there arent products");
      } else {
        console.log(UserManager.#users);
        return UserManager.#users;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readOne(id){
    try {
        const one= UserManager.#users.find((each)=>each.id===id)
        if (one) {
            console.log(one);
            return one;
        }else{
            throw new Error("There is mot user whit id: "+id)
        }
        
    } catch (error) {
        console.log(error.message);
        return error.message;
    }

  }

  async destroy(id){
    try {
        const one = UserManager.#users.find((each)=>each.id===id);
        if (one) {
            UserManager.#users=UserManager.#users.filter(
                (each)=>each.id!==id
                );
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(UserManager.#users, null, 2)
                );
                console.log("destroyed id: "+id);
                return id;


        }else{
            throw new Error("there isnt user with id: +id")
        }
        
    } catch (error) {
        console.log(error.message);
        return error.message;
        
    }
  }
}

const users = new UserManager("./fs/files/users.json");

users.create({ name: "pablo" });
users.create({ name: "pablo", photo: "fotopablo.png", email: "pabloQgmail" });

users.read();
users.readOne(1);
users.readOne("9548a9df793d28ec01d940c0");

users.destroy(1);
users.destroy("bfb4bfaa6aa1e65d5bf61ab3");