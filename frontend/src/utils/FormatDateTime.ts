export function formatDateTime(dateInput: string | Date | undefined): string {
    if (!dateInput) {
        return "Date invalide"; // Retourne un message d'erreur si dateInput est undefined ou null
    }

    const date = new Date(dateInput);

    // Options pour formater la date
    const dateOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };

    // Formatter la date
    const formattedDate = date.toLocaleDateString('fr-FR', dateOptions);

    // Récupérer les heures et minutes
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ajoute un zéro si nécessaire

    // Construire la chaîne finale
    return `${formattedDate} à ${hours}h${minutes}`;
}

// Exemple d'utilisation
const dateInput = "2024-12-02T21:44:35.327Z";
console.log(formatDateTime(dateInput));
// Résultat : "02 décembre 2024 à 21h44"
