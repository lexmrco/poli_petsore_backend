export interface Product {
  id?: string;
  name: string;
  price: number;
  description?: string;
  thumbnailUrl?: string;
  discount: number;
  selected: boolean;
}

export interface Cart {
  product: Product;
}