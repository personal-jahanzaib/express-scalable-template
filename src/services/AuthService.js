
import { User } from '#models';
import {
  PasswordUtil, ErrorUtil, JWTUtil,
} from '#utils';
import { httpResponse } from '#constants';

class AuthService {
  static async register(data) {
    const { email, password } = data;

    const existingUser = await User.count({
      where: { email },
    });

    if (existingUser) {
      ErrorUtil.throwError('Email already registered', httpResponse.CONFLICT.code, false);
    }

    const hashedPassword = await PasswordUtil.hashPassword(password);

    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    const userResponse = user.toJSON();
    delete userResponse.password;

    return userResponse;
  }

  static async login(data) {
    const { email, password } = data;

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'email', 'password', 'isActive'],
    });

    if (!user) {
      ErrorUtil.throwError('Invalid email or password', httpResponse.UNAUTHORIZED.code, false);
    }

    if (!user.isActive) {
      ErrorUtil.throwError('Account is deactivated', httpResponse.FORBIDDEN.code, false);
    }

    const isPasswordValid = await PasswordUtil.comparePassword(password, user.password);

    if (!isPasswordValid) {
      ErrorUtil.throwError('Invalid email or password', httpResponse.UNAUTHORIZED.code, false);
    }

    await user.update({ lastLoginAt: new Date() });

    const token = JWTUtil.createAccessToken({
      userId: user.id,
      email: user.email,
    });

    return { token };
  }
}


export default AuthService;
