// ============================================================================
// AUTH ROUTES
// ============================================================================
// Authentication routes for user registration, login, and token management

import { Router } from 'express';
import { AuthController } from '#controllers';

const authRoutes = Router();

authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', AuthController.login);

export default authRoutes;
