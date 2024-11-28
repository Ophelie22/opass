import { Package } from "./Package";
import { SiteCategory } from "./SiteCategory";

export interface Region {
    id: string;
    name: string;
    description: string;
    media: string;
    packages: Package[];
    categories: SiteCategory[]
}
