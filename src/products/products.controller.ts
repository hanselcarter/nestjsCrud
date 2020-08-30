import { Controller } from '@nestjs/common';
import { Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.model';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post()
  addProduct(
    @Body('title') productTitle: string,
    @Body('description') productDescription: string,
    @Body('price') productPrice: number,
  ): { id: string } {
    const generatedId = this.productsService.insertProduct(
      productTitle,
      productDescription,
      productPrice,
    );
    return {
      id: generatedId,
    };
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProduct(@Param('id') productId: string): Product {
    return this.productsService.getProduct(productId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') productId: string,
    @Body('title') productTitle?: string,
    @Body('description') productDescription?: string,
    @Body('price') productPrice?: number,
  ): Product {
    return this.productsService.updateProduct(
      productId,
      productTitle,
      productDescription,
      productPrice,
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') productId: string): string {
    return this.productsService.deleteProduct(productId);
  }
}
