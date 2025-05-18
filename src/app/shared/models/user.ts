import { CartItem } from './cartitem';

export interface User {
    id: string; 
    email: string; 
    password: string; 
    firstname: string; 
    lastname: string; 
    cartitem?: CartItem[];
  }