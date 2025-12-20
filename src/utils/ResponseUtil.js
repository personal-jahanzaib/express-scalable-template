
import { httpResponse } from '#constants';

class ResponseUtil {
  static success(
    res,
    data = null,
    message = httpResponse.OK.message,
    statusCode = httpResponse.OK.code,
  ) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static created(res, data = null, message = httpResponse.CREATED.message) {
    return res.status(httpResponse.CREATED.code).json({
      success: true,
      message,
      data,
    });
  }

  static updated(res, data = null, message = 'Resource updated successfully') {
    return res.status(httpResponse.OK.code).json({
      success: true,
      message,
      data,
    });
  }


  static deleted(res, message = 'Resource deleted successfully') {
    return res.status(httpResponse.OK.code).json({
      success: true,
      message,
      data: null,
    });
  }

  static error(
    res,
    message = httpResponse.INTERNAL_SERVER_ERROR.message,
    statusCode = httpResponse.INTERNAL_SERVER_ERROR.code,
    errors = null,
  ) {
    const response = {
      success: false,
      message,
    };

    // Only include errors key if errors exist
    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }


  static unauthorized(res, message = httpResponse.UNAUTHORIZED.message) {
    return res.status(httpResponse.UNAUTHORIZED.code).json({
      success: false,
      message,
    });
  }


  static forbidden(res, message = httpResponse.FORBIDDEN.message) {
    return res.status(httpResponse.FORBIDDEN.code).json({
      success: false,
      message,
    });
  }


  static notFound(res, message = httpResponse.NOT_FOUND.message) {
    return res.status(httpResponse.NOT_FOUND.code).json({
      success: false,
      message,
    });
  }


  static badRequest(res, message = httpResponse.BAD_REQUEST.message, errors = null) {
    const response = {
      success: false,
      message,
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(httpResponse.BAD_REQUEST.code).json(response);
  }


  static validationError(res, errors, message = httpResponse.UNPROCESSABLE_ENTITY.message) {
    const response = {
      success: false,
      message,
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(httpResponse.UNPROCESSABLE_ENTITY.code).json(response);
  }
}

export default ResponseUtil;
