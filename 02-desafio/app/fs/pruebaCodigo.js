// Importa las clases
const ProductManager = require('./ProductManager');
const UserManager = require('./UserManager');

// Crea instancias de las clases
const productManager = new ProductManager('productos.json');
const userManager = new UserManager('usuarios.json');
