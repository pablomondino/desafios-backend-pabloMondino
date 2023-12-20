const fs = require('fs'); // Agrega esta línea para manejar archivos

class ProductManager {
  #path; // Agrega esta variable para almacenar la ruta del archivo

  constructor(filePath) {
    this.#path = filePath;
    this.#loadData(); // Carga los datos del archivo al iniciar la instancia
  }

  #products = [];

  #loadData() {
    try {
      const data = fs.readFileSync(this.#path, 'utf8');
      this.#products = JSON.parse(data);
    } catch (error) {
      // Si hay un error al cargar datos, inicializa el array
      this.#products = [];
    }
  }

  #saveData() {
    const data = JSON.stringify(this.#products, null, 2);
    fs.writeFileSync(this.#path, data, 'utf8');
  }

  addProduct(productData) {
    try {
      const newProduct = {
        id: this.#products.length === 0 ? 1 : this.#products[this.#products.length - 1].id + 1,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        thumbnail: productData.thumbnail,
        code: productData.code,
        stock: productData.stock,
      };

      this.#products.push(newProduct);
      this.#saveData(); // Guarda los datos en el archivo
      return newProduct;
    } catch (error) {
      return error.message;
    }
  }

  getProducts() {
    return this.#products;
  }

  getProductById(id) {
    const product = this.#products.find((p) => p.id === Number(id));
    if (product) {
      return product;
    } else {
      throw new Error(`No hay productos con el ID ${id}`);
    }
  }

  updateProduct(id, updatedData) {
    const index = this.#products.findIndex((p) => p.id === Number(id));
    if (index !== -1) {
      this.#products[index] = { ...this.#products[index], ...updatedData };
      this.#saveData(); // Guarda los datos actualizados en el archivo
      return this.#products[index];
    } else {
      throw new Error(`No hay productos con el ID ${id}`);
    }
  }

  deleteProduct(id) {
    const index = this.#products.findIndex((p) => p.id === Number(id));
    if (index !== -1) {
      const deletedProduct = this.#products.splice(index, 1)[0];
      this.#saveData(); // Guarda los datos sin el producto eliminado en el archivo
      return deletedProduct;
    } else {
      throw new Error(`No hay productos con el ID ${id}`);
    }
  }
}

// Ejemplo de uso
const productManager = new ProductManager('productos.json'); // Reemplaza 'productos.json' con tu ruta de archivo

// Agregar un producto
const newProduct = productManager.addProduct({
  title: 'Nuevo Producto',
  description: 'Descripción del nuevo producto',
  price: 99.99,
  thumbnail: 'imagen.jpg',
  code: 'ABC123',
  stock: 10,
});

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log(allProducts);

// Obtener un producto por ID
const productId = 1; // Reemplaza con el ID deseado
const productById = productManager.getProductById(productId);
console.log(productById);

// Actualizar un producto
const updatedData = { price: 120.0, stock: 15 };
const updatedProduct = productManager.updateProduct(productId, updatedData);
console.log(updatedProduct);

// Eliminar un producto
const deletedProduct = productManager.deleteProduct(productId);
console.log(deletedProduct);