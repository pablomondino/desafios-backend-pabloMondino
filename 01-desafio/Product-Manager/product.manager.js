class ProductManager {
    static products = [];
    #products; // Declaración del campo de instancia privada
    constructor() {
      // Variable privada para almacenar productos
      this.#products = [];
    }
  
    createProduct(data) {
      const product = {
        id: ProductManager.products.length === 0 ? 1 : ProductManager.products.length + 1,
        title: data.title,
        photo: data.photo || 'default.jpg',
        price: data.price,
        stock: data.stock      
      };
      ProductManager.products.push(product);
      this.#products.push(product);
    }
  
    read() {
      return this.#products;
    }
  
    readOne(id) {
      return this.#products.find((user) => user.id === Number(id));
    }
 
}
  
  // Crear una instancia de ProductManager
  const productManager = new ProductManager();
  
  // Agregar un producto al arreglo de productos

  productManager.createProduct({ title: 'silla', photo: 'silla.jpg', price: 18000, stock:12 });
  productManager.createProduct({ title: 'mesa 1,60mt ', photo: 'mesa.jpg', price: 100000, stock:4 });
  productManager.createProduct({ title: 'modular 1,20mt', photo: 'modular.jpg', price: 120000, stock:2 });
  productManager.createProduct({ title: 'sillon 1 cuerpo', photo: 'sillon.jpg', price: 55000, stock:1 });


  //  devolver el arreglo con todos los productos
  console.log(productManager.read());
  
  // Leer y mostrar un producto específico por id
  console.log(" Leer y mostrar un producto específico por id=3");

  console.log(productManager.readOne(3));
 