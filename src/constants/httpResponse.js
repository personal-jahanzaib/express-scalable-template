/**
 * HTTP Response Constants
 * Centralized HTTP status codes and response messages
 */

const httpResponse = {
  // ============================================================================
  // SUCCESS RESPONSES (2xx)
  // ============================================================================
  OK: {
    code: 200,
    message: 'Success',
  },
  CREATED: {
    code: 201,
    message: 'Resource created successfully',
  },
  ACCEPTED: {
    code: 202,
    message: 'Request accepted for processing',
  },
  NO_CONTENT: {
    code: 204,
    message: 'No content',
  },

  // ============================================================================
  // CLIENT ERROR RESPONSES (4xx)
  // ============================================================================
  BAD_REQUEST: {
    code: 400,
    message: 'Bad request',
  },
  UNAUTHORIZED: {
    code: 401,
    message: 'Unauthorized access',
  },
  FORBIDDEN: {
    code: 403,
    message: 'Access forbidden',
  },
  NOT_FOUND: {
    code: 404,
    message: 'Resource not found',
  },
  METHOD_NOT_ALLOWED: {
    code: 405,
    message: 'Method not allowed',
  },
  CONFLICT: {
    code: 409,
    message: 'Resource conflict',
  },
  UNPROCESSABLE_ENTITY: {
    code: 422,
    message: 'Unprocessable entity',
  },
  TOO_MANY_REQUESTS: {
    code: 429,
    message: 'Too many requests',
  },

  // ============================================================================
  // SERVER ERROR RESPONSES (5xx)
  // ============================================================================
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: 'Internal server error',
  },
  NOT_IMPLEMENTED: {
    code: 501,
    message: 'Not implemented',
  },
  BAD_GATEWAY: {
    code: 502,
    message: 'Bad gateway',
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    message: 'Service unavailable',
  },
  GATEWAY_TIMEOUT: {
    code: 504,
    message: 'Gateway timeout',
  },
};

export default httpResponse;
