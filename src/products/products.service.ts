import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  insertProduct(title: string, description: string, price: number): string {
    const productId = Math.random().toString();
    const newProduct = new Product(productId, title, description, price);
    this.products.push(newProduct);
    return productId;
  }

  getProducts(): Product[] {
    return [...this.products];
  }

  getProduct(productId: string): Product {
    const [product] = this.findProduct(productId);
    return { ...product };
  }

  updateProduct(
    productId: string,
    title?: string,
    description?: string,
    price?: number,
  ): Product {
    const [product, productIndex] = this.findProduct(productId);
    const updatedProduct = {
      ...product,
      title: title || product.title,
      description: description || product.description,
      price: price || product.price,
    };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  deleteProduct(productId: string): string {
    const [, productIndex] = this.findProduct(productId);
    this.products.splice(productIndex, 1);
    return productId;
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(product => product.id === id);
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundException('Could not find product');
    }
    return [product, productIndex];
  }
}
