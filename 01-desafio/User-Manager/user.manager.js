class UserManager {
    static users = [];
    #users; // Declaración del campo de instancia privada
    constructor() {
      // Variable privada para almacenar usuarios
      this.#users = [];
    }
  
    createUser(data) {
      const user = {
        id: UserManager.users.length === 0 ? 1 : UserManager.users.length + 1,
        name: data.name,
        photo: data.photo || 'default.jpg',
        email: data.email,
      };
      UserManager.users.push(user);
      this.#users.push(user);
    }
  
    read() {
      return this.#users;
    }
  
    readOne(id) {
      return this.#users.find((user) => user.id === Number(id));
    }
 
}
  
  // Crear una instancia de UserManager
  const userManager = new UserManager();
  
   // Agregar usuarios al arreglo de usuarios
  userManager.createUser({ name: 'pablo mondino', photo: 'pablo.jpg', email: 'p_mondino.com' });
  userManager.createUser({ name: 'karina vitores', email: 'k_vitores@example.com' });
  userManager.createUser({ name: 'alejo mondino', photo: 'alejo.jpg', email: 'john@example.com' });
  userManager.createUser({ name: 'victoria', email: 'viki@example.com' });
  
  // Leer y mostrar usuarios
  console.log(userManager.read());
 
  //Leer y mostrar un usuario específico por id
  console.log(" Leer y mostrar un usuario específico para id=2");
   console.log(userManager.readOne(2));
 