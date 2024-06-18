interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  password: string;
  isAdmin: boolean;
}

interface AuthenticatedRequest {
  user: AuthenticatedUser;
}
