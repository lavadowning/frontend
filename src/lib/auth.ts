import { getStrapiURL } from "./utils";
const API_URL = getStrapiURL();

function setTokenCookie(token: string) {
  document.cookie = `token=${token}; path=/;`;
}

export function getToken() {
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === "token") {
      return value;
    }
  } 

  return null;
}

export async function removeTokenCookie() {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
}

export async function register({ username, email, password }) {
  const res = await fetch(`${API_URL}/api/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Registration failed");

  setTokenCookie(data.jwt);
  return data;
}

export async function login({ identifier, password }) {
  const res = await fetch(`${API_URL}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.error?.message || "Login failed");

  setTokenCookie(data.jwt);
  return data;
}

export function logout() {
  removeTokenCookie();
}

export async function getCurrentUser() {
  const token = getToken();
  if (!token) return null;

  const res = await fetch(`${API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Ошибка при получении пользователя");

  return await res.json();
}

export async function updateCurrentUser(dataToUpdate) {
  const token = getToken();
  const currentUser = await getCurrentUser();

  if (!token || !currentUser?.id) throw new Error("Not authenticated");

  const res = await fetch(`${API_URL}/api/users/${currentUser.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataToUpdate),
  });

  if (!res.ok) throw new Error("Ошибка при обновлении профиля");

  return await res.json();
}
