export interface Product {
  id: string;
  title: string;
  description: string;
  active: boolean;
  averageRating: number;
  slug: string;
  category: Category;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  title: string;
  price: number;
  image: string;
  stock: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  email: string;
  address: string;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: string;
}
