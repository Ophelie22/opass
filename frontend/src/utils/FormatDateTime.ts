export function formatDateTime(dateInput: string | Date | undefined): string {
    if (!dateInput) {
        return "Date invalide";
    }

    const date = new Date(dateInput);

    const dateOptions: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('fr-FR', dateOptions);

    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${formattedDate} à ${hours}h${minutes}`;
}