import { Order } from "./Order";
export interface User {
	id: string;
    name: string;
    email: string;
    password: string;


}

export interface UserDetails {
	name: string;
	email: string;
	confirmEmail: string;
	password: string;
	confirmPassword: string;
	createAt: string;
	updatedAt: string;
	orders: Order[]
}