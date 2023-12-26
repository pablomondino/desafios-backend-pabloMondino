const fs = require("fs");
const crypto = require("crypto");
const { log, Console } = require("console");
class ProductManager {
  static #products = [];

  /*init() {
    const exist = fs.existsSync(this.path);
    //este metodo requiere que instale fs
    // requiere como parametro la ruta donde ets el archivo para que verifique si está)
    // la ruta no la voy a harcodear sino que va aestar en el constructor)
    //la funcion es bloqueante si no se ejecuta al principio, no pueden funcionar las otras funciones

    console.log(exist);
    if (!exist) {
      //si no existe el archivo lo voy a crear
      // el metodo sincrono, es bloquante-
      //creo archivo en caso que no exista
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      //como segundo parámetro (cierta data)paso array vacio , tengo que pasar texto plano(JSON)
    } else {
      ProductManager.#products = JSON.parse(
        fs.readFileSync(this.path, "utf-8")
      );
    }
  }
  */
  //--------------
  init() {
    const exist = fs.existsSync(this.path);

    console.log(exist);
    if (!exist) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      ProductManager.#products = [];
    } else {
      const fileContent = fs.readFileSync(this.path, "utf-8").trim();
      if (fileContent) {
        try {
          ProductManager.#products = JSON.parse(fileContent);
        } catch (error) {
          console.error("Error parsing JSON:", error.message);
          ProductManager.#products = [];
        }
      } else {
        ProductManager.#products = [];
      }
    }
  }

  //---------------
  constructor(path) {
    this.path = path;
    //this.path tiene que ser igual al valor que me manda cuando se instancia la clase

    this.init();
  }

  async create(data) {
    try {
      if (!data.title || !data.photo || !data.price || !data.stock) {
        throw new Error("Title, photo, price, stock are required");
      } else {
        const one = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo,
          email: data.price,
          stock: data.stock,
        };
        ProductManager.#products.push(one);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        console.log("objeto creado---->create id: " + one.id);
        return one;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  read() {
    try {
      if (ProductManager.#products === 0) {
        throw new Error("there arent products");
      } else {
        console.log(ProductManager.#products);
        return ProductManager.#products;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
  readOne(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      if (one) {
        console.log("producto con id: " + id);
        console.log(one);
        return one;
      } else {
        throw "there is not product" + id;
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
}

//----------------------

//-------------
const products = new ProductManager("./fs/files/products.json");
//aca le paso la ruta
//recomendacion usar siempre rutas relativas
//console.log(products);
/*async function manage() {
  await products.create({
    title: "silla",
    photo: "foto de silla",
    price: 30000,
    stock: 45,
  });
  await products.create({ title: "mesa" });

  await products.read();
  await products.readOne(1);
  await products.readOne("b5f83e05912066c38dd18b8f");

 
}

manage();
*/
products.create({
  title: "mesa",
  photo: "foto de silla",
  price: 30000,
  stock: 45,
});
products.read();
products.readOne("b5f83e05912066c38dd18b8f");
