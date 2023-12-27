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

  async destroy(id) {
    try {
      const one = ProductManager.#products.find((each) => each.id === id);
      if (one) {
        ProductManager.#products = ProductManager.#products.filter(
          (each) => each.id !== one.id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductManager.#products, null, 2)
        );
        console.log("borramos//destroy Id : " + id);
        return one;
      } else {
        throw new Error("there is no product");
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
async function manage() {
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

  await products.destroy("ff1442dd3e8b05da02ceb07a");
  await products.destroy("4");
}

manage();
products.create({
  title: "silla chica ",
  photo: "foto de silla",
  price: 20000,
  stock: 45,
});

products.destroy("da69f57cb52f926db02650ff");