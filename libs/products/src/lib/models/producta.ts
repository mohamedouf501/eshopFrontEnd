import { Category } from './category';
export interface ProductsDto {
    message:  string;
    Products?: Product[];
    productData?: Product;

}
export interface Product {
    barnd:           string;
    numReviwes:      number;
    image:           string;
    brand?:          string;
    price:           number;
    rating:          number | null;
    numReviews?:     number;
    isFeatured:      boolean;
    name:            string;
    description:     string;
    category:        Category; 
    reviews?:        Review[];
    countInStock:    number;
    richDescription: string;
    images:          string[];
    dateCreated:     Date;
    id:              string;
}
export interface Review {
    avatar: string;
    name:   string;
    review: string;
}
export interface productsCountDto {
    message: string;
    productCount: number;
  }
