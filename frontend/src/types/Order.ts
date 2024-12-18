import { User } from "./User";
import { Pass } from "./Pass";

export interface Order {
    id: number;
    userId: number;
    date: Date;
    amount: string; 
    status: string;
    createdAt: Date;
    updatedAt: Date;
    user?: User;      // Relation vers l'utilisateur
    passes?: Pass[];  // Liste de passes liés à la commande
}