export const formatTime = (seconds: number) => {
    const roundedSeconds = Math.round(seconds); // Membulatkan detik
    const days = Math.floor(roundedSeconds / (3600 * 24));
    const hours = Math.floor((roundedSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((roundedSeconds % 3600) / 60);
    const secs = roundedSeconds % 60;

    const dayPart = String(days).padStart(2, '0');
    const hourPart = String(hours).padStart(2, '0');
    const minutePart = String(minutes).padStart(2, '0');
    const secondPart = String(secs).padStart(2, '0');

    if(days > 0) return `${dayPart}:${hourPart}:${minutePart}:${secondPart}`
    if(days == 0 && hours > 0) return `${hourPart}:${minutePart}:${secondPart}`
    return `${minutePart}:${secondPart}`
}