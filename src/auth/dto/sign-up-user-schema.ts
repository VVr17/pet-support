export const swaggerSignUpUserSchema = {
  schema: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'user@example.com',
      },
      password: {
        type: 'string',
        example: 'Password123',
      },
    },
    required: ['email', 'password'],
  },
};
