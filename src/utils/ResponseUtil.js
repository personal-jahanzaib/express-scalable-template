/**
 * ResponseUtil - Utility class for standardized API responses
 * All methods are static - no instantiation required
 */

import { httpResponse } from '#constants';

class ResponseUtil {
  /**
     * Send success response
     * @param {object} res - Express response object
     * @param {any} data - Response data
     * @param {string} message - Custom message (optional)
     * @param {number} statusCode - Custom status code (optional)
     * @returns {object} Express response
     */
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

  /**
     * Send created response
     * @param {object} res - Express response object
     * @param {any} data - Response data
     * @param {string} message - Custom message (optional)
     * @returns {object} Express response
     */
  static created(res, data = null, message = httpResponse.CREATED.message) {
    return res.status(httpResponse.CREATED.code).json({
      success: true,
      message,
      data,
    });
  }

  /**
     * Send updated response
     * @param {object} res - Express response object
     * @param {any} data - Response data
     * @param {string} message - Custom message (optional)
     * @returns {object} Express response
     */
  static updated(res, data = null, message = 'Resource updated successfully') {
    return res.status(httpResponse.OK.code).json({
      success: true,
      message,
      data,
    });
  }

  /**
     * Send deleted response
     * @param {object} res - Express response object
     * @param {string} message - Custom message (optional)
     * @returns {object} Express response
     */
  static deleted(res, message = 'Resource deleted successfully') {
    return res.status(httpResponse.OK.code).json({
      success: true,
      message,
      data: null,
    });
  }

  /**
     * Send error response
     * @param {object} res - Express response object
     * @param {string} message - Error message
     * @param {number} statusCode - HTTP status code (optional)
     * @param {any} errors - Additional error details (optional)
     * @returns {object} Express response
     */
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

  /**
     * Send unauthorized response
     * @param {object} res - Express response object
     * @param {string} message - Custom message (optional)
     * @returns {object} Express response
     */
  static unauthorized(res, message = httpResponse.UNAUTHORIZED.message) {
    return res.status(httpResponse.UNAUTHORIZED.code).json({
      success: false,
      message,
    });
  }

  /**
     * Send forbidden response
     * @param {object} res - Express response object
     * @param {string} message - Custom message (optional)
     * @returns {object} Express response
     */
  static forbidden(res, message = httpResponse.FORBIDDEN.message) {
    return res.status(httpResponse.FORBIDDEN.code).json({
      success: false,
      message,
    });
  }

  /**
     * Send not found response
     * @param {object} res - Express response object
     * @param {string} message - Custom message (optional)
     * @returns {object} Express response
     */
  static notFound(res, message = httpResponse.NOT_FOUND.message) {
    return res.status(httpResponse.NOT_FOUND.code).json({
      success: false,
      message,
    });
  }

  /**
     * Send bad request response
     * @param {object} res - Express response object
     * @param {string} message - Error message
     * @param {any} errors - Validation errors (optional)
     * @returns {object} Express response
     */
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

  /**
     * Send validation error response
     * @param {object} res - Express response object
     * @param {any} errors - Validation errors
     * @param {string} message - Custom message (optional)
     * @returns {object} Express response
     */
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
