const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

let initialized = false;

const loadServiceAccount = () => {
  const envProjectId = process.env.FIREBASE_PROJECT_ID;
  const envClientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const envPrivateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (envProjectId && envClientEmail && envPrivateKey) {
    return {
      project_id: envProjectId,
      client_email: envClientEmail,
      private_key: envPrivateKey.replace(/\\n/g, '\n'),
    };
  }

  const inlineJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (inlineJson) {
    return JSON.parse(inlineJson);
  }

  const explicitPath =
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH ||
    process.env.GOOGLE_APPLICATION_CREDENTIALS;

  if (!explicitPath) return null;

  const resolvedPath = path.isAbsolute(explicitPath)
    ? explicitPath
    : path.resolve(process.cwd(), explicitPath);

  const raw = fs.readFileSync(resolvedPath, 'utf8');
  return JSON.parse(raw);
};

const getFirebaseAdmin = () => {
  if (!initialized) {
    const serviceAccount = loadServiceAccount();
    if (!serviceAccount) {
      throw new Error(
        'Firebase service account not configured. Set FIREBASE_SERVICE_ACCOUNT_PATH or FIREBASE_SERVICE_ACCOUNT_JSON.',
      );
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    initialized = true;
  }

  return admin;
};

module.exports = { getFirebaseAdmin };
