import { CartItem } from './cartitem';

export interface User {
    id: number; 
    email: string; 
    password: string; 
    firstname: string; 
    lastname: string; 
    cartitem?: CartItem[];
  }