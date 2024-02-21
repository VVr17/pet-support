interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

interface AuthenticatedRequest {
  user: AuthenticatedUser;
}
