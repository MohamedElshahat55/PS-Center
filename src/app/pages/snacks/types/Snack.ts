export default interface Snack {
  _id: string;
  name: string;
  quantityInStock: number;
  sold: number;
  image?: string;
  sellingPrice: number;
  buyingPrice: number; // ONLY_OWNER
  createdAt: string;
  updatedAt: string;
}
