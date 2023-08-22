export type JwtPayload = {
  firstName: string;
  lastName: string;
  userId: string;
  email: string;
  role: 'USER' | 'ADMIN';
};
