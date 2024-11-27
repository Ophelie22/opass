export default function getCategoryName(categoryId: string | undefined): string {

    let categoryName = "";

    if (categoryId === "1") {
        categoryName = "Musées";
    } else if (categoryId === "2") {
        categoryName = "Châteaux";
    } else {
        categoryName = "Parcs animaliers";
    }

    return categoryName;
}