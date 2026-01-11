export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/messages', '/profile', '/properties/add', '/properties/saved'],
};
