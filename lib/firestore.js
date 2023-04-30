import { Firestore } from '@google-cloud/firestore';

export const db = new Firestore({
  projectId: process.env.FIRESTORE_PROJECT_ID,
  credentials: {
    client_email: process.env.FIRESTORE_CLIENT_EMAIL,
    private_key: process.env.FIRESTORE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }
});
