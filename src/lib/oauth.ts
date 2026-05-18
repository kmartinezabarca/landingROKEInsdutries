const rawGoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export const googleClientId =
  typeof rawGoogleClientId === 'string' ? rawGoogleClientId.trim() : '';

export const isGoogleAuthConfigured = googleClientId.length > 0;
