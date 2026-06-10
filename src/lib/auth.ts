export interface AuthResponse {
  success: boolean;
  error?: string;
  user?: {
    email: string;
    name?: string;
  };
}

const USERS_STORAGE_KEY = 'portal_users_db_v1';
const ACTIVE_USER_KEY = 'portal_active_user_v1';

interface UserRecord {
  email: string;
  passwordHash: string;
  name: string;
}

function getUsersFromStorage(): Record<string, UserRecord> {
  const data = localStorage.getItem(USERS_STORAGE_KEY);
  if (!data) {
    const defaultUsers: Record<string, UserRecord> = {
      'miguel.flores@sempreceub.com': {
        email: 'miguel.flores@sempreceub.com',
        passwordHash: '123456',
        name: 'Miguel Flores',
      },
    };
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
}

function saveUsersToStorage(users: Record<string, UserRecord>) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (!email || !password) {
    return { success: false, error: 'Por favor, preencha todos os campos.' };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsersFromStorage();
  const user = users[normalizedEmail];

  if (!user || user.passwordHash !== password) {
    return { success: false, error: 'E-mail ou senha incorretos.' };
  }

  localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify({ email: user.email, name: user.name }));

  return {
    success: true,
    user: {
      email: user.email,
      name: user.name,
    },
  };
}

export async function signUp(email: string, password: string, name?: string): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  if (!email || !password) {
    return { success: false, error: 'Por favor, preencha todos os campos.' };
  }

  if (password.length < 6) {
    return { success: false, error: 'A senha deve conter no mínimo 6 caracteres.' };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsersFromStorage();

  if (users[normalizedEmail]) {
    return { success: false, error: 'Este e-mail já está cadastrado.' };
  }

  const finalName = name?.trim() || email.split('@')[0];

  users[normalizedEmail] = {
    email: normalizedEmail,
    passwordHash: password,
    name: finalName,
  };

  saveUsersToStorage(users);

  localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify({ email: normalizedEmail, name: finalName }));

  return {
    success: true,
    user: {
      email: normalizedEmail,
      name: finalName,
    },
  };
}

export function getCurrentUser(): { email: string; name?: string } | null {
  const data = localStorage.getItem(ACTIVE_USER_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

export function signOutUser(): void {
  localStorage.removeItem(ACTIVE_USER_KEY);
}
