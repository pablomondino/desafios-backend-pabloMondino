class UserManager {
  static #users = [];

  constructor() {}

  createUser(data) {
    try {
      if (!data.name || !data.photo || !data.email) {
        throw new Error("no existe el nombre, la foto o el email");
      } else {
        const user = {
          id:
            UserManager.#users.length === 0
              ? 1
              : UserManager.#users[UserManager.#users.length - 1].id + 1,
          name: data.name,
          photo: data.photo,
          email: data.email,
        };
        UserManager.#users.push(user);
        return user;
      }
    } catch (error) {
      return error.message;
    }
  }
  read() {
    try {
      const allUsers = UserManager.#users;
      if (allUsers.length === 0) {
        throw new Error(" no hay ningún usuario");
      } else {
        return allUsers;
      }
    } catch (error) {
      return error.message;
    }
  }

  readOne(id) {
    try {
      const oneUser = UserManager.#users.find((each) => each.id === Number(id));
      if (oneUser) {
        return oneUser;
      } else {
        throw ("NO HAY USUARIO CON EL ID " + id);
      }
    } catch (error) {
      error.message;
    }
  }
}

// Crear una instancia de UserManager
// creo un objeto de la clase UserManager con el nombre user

const user = new UserManager(); // es una instancia del usuario que acabamos de crear

let users = user.read();

//console.log("Vemos array ni bien arranca el programa, debe estar vacio");
console.log("viendo variable user");
console.log(users);

// Agregar usuarios al arreglo de usuarios
//creamos el primer usuario
const user1 = user.createUser({
  name: "pablo mondino",
  photo: "pablo.jpg",
  email: "p_mondino.com",
});

console.log("viendo variable user despues de cargar primer usuario");
users = user.read();
console.log(users);

const user2 = user.createUser({
  name: "karina vitores",
  photo: "kari.jpg",
  email: "k_vitores@example.com",
});

console.log("viendo variable user despues de cargar segundo usuario");
users = user.read();
console.log(users);


const user3 = user.createUser({
  name: "alejo mondino",
  photo: "alejo.jpg",
  email: "john@example.com",
});
const user4 = user.createUser({ name: "victoria",
photo: "pablo.jpg",
 email: "viki@example.com" });

// Leer y mostrar usuarios
console.log(user1, user2, user3, user4);

users = user.read();
console.log(users);

const one = user.readOne(1);
const four = user.readOne(4);

console.log("viendo usuario con id 1");
console.log(one);
console.log("viendo usuario con id 4");

console.log(four);
