// Safe UTF-8 aware Base64 encoding/decoding (fixes btoa/atob Unicode bug)
export function encodeBase64(text: string): string {
  return btoa(
    encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(Number('0x' + p1));
    })
  );
}

export function decodeBase64(base64: string): string {
  try {
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
  } catch {
    throw new Error('Invalid Base64 string');
  }
}

// Fast validation regex (strict RFC 4648, allows = padding)
const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
const base64ValidChar = /^[A-Za-z0-9+/=]+$/;

export function isValidBase64(str: string): boolean {
  if (!str || str.length === 0) return false;
  if (str.length % 4 !== 0) return false;
  if (!base64ValidChar.test(str)) return false;
  if (!base64Regex.test(str)) return false;

  try {
    atob(str);
    return true;
  } catch {
    return false;
  }
}