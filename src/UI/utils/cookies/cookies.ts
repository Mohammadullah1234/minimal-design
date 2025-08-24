"use strict";

export type CookieOptions = {
  secure?: boolean;
  daysUntilExpiration?: number;
  sameSite?: "Strict" | "Lax" | "None";
  domain?: string;
  path?: string;
};

/**
 * Retrieves a cookie value by key.
 *
 * @param {string} key - The key of the cookie to retrieve.
 * @returns {T | null} - The parsed value of the cookie, or null if not found or an error occurs.
 *
 * @example
 * const user = getCookie<{ name: string, age: number }>('user');
 * console.log(user); // { name: 'John', age: 30 }
 */
export function getCookie<T>(key: string): T | null {
  if (!key || typeof key != "string")
    return (console.warn("Invalid cookie key provided"), null);
  try {
    let getCookie = `${key}=`,
      findCookie = decodeURIComponent(document.cookie)
        .split("; ")
        .find((elm) => elm.startsWith(getCookie));

    if (!findCookie) return null;
    let cookie = findCookie.substring(getCookie.length);

    try {
      return JSON.parse(cookie);
    } catch {
      return cookie as T | null;
    }
  } catch (err) {
    return (console.error("Error retrieving cookie:", err), null);
  }
}

/**
 * Sets a cookie with a specified key, value, and options.
 *
 * @template T
 * @param {string} key - The key of the cookie to set.
 * @param {T} value - The value of the cookie to set.
 * @param {CookieOptions} [options] - The options for the cookie.
 *
 * @example
 * setCookie('user', { name: 'John', age: 30 }, { daysUntilExpiration: 7, sameSite: 'Lax', secure: true });
 */
export function setCookie<T>(
  key: string,
  value: T,
  options?: CookieOptions
): void {
  if (!key || typeof key != "string") {
    console.error("Invalid cookie key provided");
    return;
  }

  let {
    daysUntilExpiration: daysExpire = 0,
    sameSite = "Strict",
    secure = !1,
    path = "/",
    domain,
  } = options ?? {};
  try {
    let cookie = encodeURIComponent(
        typeof value == "string" ? value : JSON.stringify(value)
      ),
      cookieData = [
        `${key}=${cookie}`,
        `path=${path}`,
        sameSite && `SameSite=${sameSite}`,
        secure && "Secure",
        domain && `domain=${domain}`,
      ];

    if (daysExpire > 0) {
      let date = new Date(Date.now() + daysExpire * 24 * 60 * 60 * 1e3);
      cookieData.push(`expires=${date.toUTCString()}`);
    }
    document.cookie = cookieData.filter(Boolean).join("; ");
  } catch (err) {
    console.error("Error setting cookie:", err);
  }
}

/**
 * Removes a cookie by key.
 *
 * @param {string} key - The key of the cookie to remove.
 * @param {Pick<CookieOptions, 'path' | 'domain'>} [options] - The options for the cookie removal.
 *
 * @example
 * removeCookie('user');
 */
export function removeCookie(
  key: string,
  options?: Pick<CookieOptions, "path" | "domain">
): void {
  if (!key || typeof key != "string") {
    console.error("Invalid cookie key provided");
    return;
  }

  let { path = "/", domain } = options ?? {};

  try {
    let cookieData = [
      `${key}=`,
      "expires=Thu, 01 Jan 1970 00:00:00 GMT",
      `path=${path}`,
      domain && `domain=${domain}`,
      "Secure",
    ];
    document.cookie = cookieData.filter(Boolean).join("; ");
  } catch (err) {
    console.error("Error removing cookie:", err);
  }
}
