interface AuthenticatedUser {
  id: string;
  email: string;
  fullName: string;
  password: string;
  isAdmin: boolean;
}

interface AuthenticatedRequest {
  user: AuthenticatedUser;
}
