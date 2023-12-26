const crypto = require("crypto");

class ProductManager {
  static #products = [];

  constructor() {}

  createProduct(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        //chequamos si exixten las propiedades
        throw new Error("no existe el titulo, la foto, el prcio o stock");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),

          /*
          id:
            ProductManager.#products.length === 0
              ? 1
              : ProductManager.#products[ProductManager.#products.length - 1]
                  .id + 1,*/

          name: data.title,
          photo: data.photo,
          email: data.price,
          stock: data.stock,
        };
        ProductManager.#products.push(product);
        return product;
      }
    } catch (error) {
      return error.message;
    }
  }

  read() {
    try {
      if (ProductManager.#products === 0) {
        throw Error("no hay productos");
      } else {
        return ProductManager.#products;
      }
    } catch (error) {
      return error.message;
    }
  }

  /*
    readOne(id) {
      try {
        if (!id) {
          throw Error("no existe id")
        }else{
        return products.find((product) => product.id === Number(id));
        
      } 
    }catch (error) {
        return error.message
      }
      
    }*/
  readOne(id) {
    try {
      const oneProduct = ProductManager.#products.find(
        (each) => each.id === Number(id)
      );
      if (oneProduct) {
        return oneProduct;
      } else {
        throw "NO HAY productos CON EL ID " + id;
      }
    } catch (error) {
      error.message;
    }
  }
}

// Crear una instancia de la clase ProductManager
const productManager = new ProductManager();
let products = productManager.read();
console.log(products);
// Agregar un producto al arreglo de productos

const producto1 = productManager.createProduct({
  title: "silla",
  photo: "silla.jpg",
  price: 18000,
  stock: 12,
});

products = productManager.read();
console.log(products);
const producto2 = productManager.createProduct({
  title: "mesa 1,60mt ",
  photo: "mesa.jpg",
  price: 100000,
  stock: 4,
});
const producto3 = productManager.createProduct({
  title: "modular 1,20mt",
  photo: "modular.jpg",
  price: 120000,
  stock: 2,
});
const producto4 = productManager.createProduct({
  title: "sillon 1 cuerpo",
  photo: "sillon.jpg",
  price: 55000,
  stock: 1,
});

console.log(producto1, producto2, producto3, producto4);

// devolver el arreglo con todos los productos
console.log("arreglo con todos los productos");
console.log(productManager.read());

// Leer y mostrar un producto específico por id
console.log(" Leer y mostrar un producto específico por id=3");

console.log(productManager.readOne(3));
