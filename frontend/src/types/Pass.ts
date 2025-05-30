import { Package } from "./Package";
import  { Order } from "./Order";

export interface Pass{
    name: string;
    id: number;
    packageId?: number;
    codePass: string;
    orderId: number;
    createdAt: Date;
    updatedAt: Date;
    package?: Package;
    order?: Order;
}
