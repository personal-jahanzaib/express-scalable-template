// ============================================================================
// AUTH CONTROLLER
// ============================================================================
// Authentication controller for handling auth-related HTTP requests

import { AuthService } from '#services';
import { AsyncUtil, ResponseUtil } from '#utils';


class AuthController {
  static register = AsyncUtil.asyncHandler(async (req, res) => {
    const user = await AuthService.register(req.body);
    ResponseUtil.created(
      res,
      user,
    );
  });

  static login = AsyncUtil.asyncHandler(async (req, res) => {
    const { token } = await AuthService.login(req.body);
    ResponseUtil.success(
      res,
      { token },
    );
  });
}

export default AuthController;
