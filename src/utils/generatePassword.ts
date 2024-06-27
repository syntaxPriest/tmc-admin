export function generatePassword(length: number = 16): string {
    if (length < 8) {
        throw new Error("Password length must be at least 10 characters");
    }

    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const special = "!@#$%&*()_+[]{}:";

    const allCharacters = lower + upper + digits + special;
    let password = "";

    // Ensure the password has at least one character from each set
    password += lower[Math.floor(Math.random() * lower.length)];
    password += upper[Math.floor(Math.random() * upper.length)];
    password += digits[Math.floor(Math.random() * digits.length)];
    password += special[Math.floor(Math.random() * special.length)];

    // Fill the remaining characters
    for (let i = password.length; i < length; i++) {
        password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    // Shuffle the password to ensure randomness
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    return password;
}