
import { httpResponse } from '#constants';

class ResponseUtil {
  /**
   * Private helper to build response object
   * @param {boolean} success - Success status
   * @param {string} message - Response message
   * @param {*} data - Optional data payload
   * @param {*} errors - Optional errors array/object
   * @returns {Object} Response object
   */
  static #buildResponse(success, message, data = null, errors = null) {
    const response = { success, message };

    if (data !== null && typeof data !== 'undefined') {
      response.data = data;
    }

    if (errors !== null && typeof errors !== 'undefined') {
      response.errors = errors;
    }

    return response;
  }

  static success(
    res,
    data = null,
    message = httpResponse.OK.message,
    statusCode = httpResponse.OK.code,
  ) {
    return res.status(statusCode).json(
      this.#buildResponse(true, message, data),
    );
  }

  static created(res, data = null, message = httpResponse.CREATED.message) {
    return res.status(httpResponse.CREATED.code).json(
      this.#buildResponse(true, message, data),
    );
  }

  static updated(res, data = null, message = httpResponse.UPDATED.message) {
    return res.status(httpResponse.OK.code).json(
      this.#buildResponse(true, message, data),
    );
  }

  static deleted(res, message = httpResponse.DELETED.message) {
    return res.status(httpResponse.OK.code).json(
      this.#buildResponse(true, message),
    );
  }

  static error(
    res,
    message = httpResponse.INTERNAL_SERVER_ERROR.message,
    statusCode = httpResponse.INTERNAL_SERVER_ERROR.code,
    errors = null,
  ) {
    return res.status(statusCode).json(
      this.#buildResponse(false, message, null, errors),
    );
  }

  static unauthorized(res, message = httpResponse.UNAUTHORIZED.message) {
    return res.status(httpResponse.UNAUTHORIZED.code).json(
      this.#buildResponse(false, message),
    );
  }

  static forbidden(res, message = httpResponse.FORBIDDEN.message) {
    return res.status(httpResponse.FORBIDDEN.code).json(
      this.#buildResponse(false, message),
    );
  }

  static notFound(res, message = httpResponse.NOT_FOUND.message) {
    return res.status(httpResponse.NOT_FOUND.code).json(
      this.#buildResponse(false, message),
    );
  }

  static badRequest(res, message = httpResponse.BAD_REQUEST.message, errors = null) {
    return res.status(httpResponse.BAD_REQUEST.code).json(
      this.#buildResponse(false, message, null, errors),
    );
  }

  static validationError(res, errors, message = httpResponse.UNPROCESSABLE_ENTITY.message) {
    return res.status(httpResponse.UNPROCESSABLE_ENTITY.code).json(
      this.#buildResponse(false, message, null, errors),
    );
  }
}

export default ResponseUtil;
