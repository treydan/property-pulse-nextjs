import { getServerSession } from 'next-auth/next';
import { authOptions } from './authOptions';

export async function getSessionServer() {
  return await getServerSession(authOptions);
}
