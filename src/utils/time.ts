export function greetBasedOnTime(): string {
    const currentHour = new Date().getHours();

    if (currentHour < 6) { // Before 6 AM (very early morning)
        return "Good night";
    } else if (currentHour < 12) { // 6 AM to 11:59 AM
        return "Good morning";
    } else if (currentHour < 18) { // 12 PM to 5:59 PM
        return "Good afternoon";
    } else if (currentHour < 22) { // 6 PM to 9:59 PM
        return "Good evening"
    } else { // 10 PM onwards
        return "Good night";
    }
}