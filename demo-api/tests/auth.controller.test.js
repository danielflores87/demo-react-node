// __tests__/authController.test.js
const AuthController = require('../src/controllers/auth.controller');
const { ApiResponse, EResponseCodes, EHttpStatusCodes, ERoles } = require('../src/config/api.response');
const bcrypt = require('bcrypt');

describe('AuthController Test', () => {
  let authController;
  let mockUserRepository;
  let mockResponse;
  let mockRequest;

  beforeEach(() => {
    // Mock de userRepository
    mockUserRepository = {
      createUser: jest.fn(),
      getUserByEmail: jest.fn(),
    };

    authController = new AuthController(mockUserRepository);

    // Mock de la respuesta
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createUser', () => {
    beforeEach(() => {
      mockRequest = {
        body: {
          email: 'test@example.com',
          documentNumber: '123456',
          role: ERoles.ADMIN,
        },
      };
    });

    it('should create a user and return a success response', async () => {
      // Mock de la función hashPassword
      jest.mock('../config/hash', () => ({
        hashPassword: jest.fn().mockResolvedValue('hashedPassword'),
      }));

      mockUserRepository.createUser.mockResolvedValue(mockRequest.body);

      await authController.createUser(mockRequest, mockResponse);

      expect(mockUserRepository.createUser).toHaveBeenCalledWith({
        ...mockRequest.body,
        password: 'hashedPassword',
      });
      expect(mockResponse.status).toHaveBeenCalledWith(EHttpStatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(
        new ApiResponse(
          mockRequest.body,
          EResponseCodes.OK,
          `Se ha creado el usuario: "${mockRequest.body.email}" con contraseña: "123456"`
        )
      );
    });

    it('should return a bad request response if the role is invalid', async () => {
      mockRequest.body.role = 'INVALID_ROLE'; // Rol no permitido

      await authController.createUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(EHttpStatusCodes.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith(
        new ApiResponse(
          null,
          EResponseCodes.WARN,
          `El Rol del usuario solo puede ser ${ERoles.ADMIN} o ${ERoles.EMPLOYEE}`
        )
      );
    });

    it('should return a bad request response if creating the user fails', async () => {
      mockUserRepository.createUser.mockResolvedValue(null); // Simulamos que no se crea el usuario

      await authController.createUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(EHttpStatusCodes.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith(
        new ApiResponse(
          null,
          EResponseCodes.FAIL,
          "Error al crear el usuario"
        )
      );
    });

    it('should return a bad request response on error', async () => {
      mockUserRepository.createUser.mockRejectedValue(new Error('Database Error'));

      await authController.createUser(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(EHttpStatusCodes.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith(
        new ApiResponse(null, EResponseCodes.FAIL, 'Database Error')
      );
    });
  });

  describe('login', () => {
    beforeEach(() => {
      mockRequest = {
        body: {
          email: 'test@example.com',
          password: 'testPassword',
        },
      };
    });

    it('should return a success response with a token', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('testPassword', 10),
        role: ERoles.ADMIN,
      };
      
      mockUserRepository.getUserByEmail.mockResolvedValue(mockUser);

      const token = 'mocked_token';
      jest.spyOn(jwt, 'sign').mockReturnValue(token);

      await authController.login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(EHttpStatusCodes.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(
        new ApiResponse({ ...mockUser, token }, EResponseCodes.OK)
      );
    });

    it('should return not found response if user does not exist', async () => {
      mockUserRepository.getUserByEmail.mockResolvedValue(null);

      await authController.login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(EHttpStatusCodes.NOT_FOUND);
      expect(mockResponse.json).toHaveBeenCalledWith(
        new ApiResponse(
          null,
          EResponseCodes.WARN,
          "No existe un usuario con el correo indicado"
        )
      );
    });

    it('should return forbidden response if password is invalid', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: await bcrypt.hash('testPassword', 10),
        role: ERoles.ADMIN,
      };

      mockUserRepository.getUserByEmail.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false); // Simulamos una contraseña incorrecta

      await authController.login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(EHttpStatusCodes.FORBIDDEN);
      expect(mockResponse.json).toHaveBeenCalledWith(
        new ApiResponse(null, EResponseCodes.WARN, "Contraseña invalida")
      );
    });

    it('should return a bad request response on error', async () => {
      mockUserRepository.getUserByEmail.mockRejectedValue(new Error('Database Error'));

      await authController.login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(EHttpStatusCodes.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith(
        new ApiResponse(null, EResponseCodes.FAIL, 'Database Error')
      );
    });
  });
});
