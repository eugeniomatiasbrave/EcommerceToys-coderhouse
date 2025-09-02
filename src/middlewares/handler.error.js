import { NotFoundError, UnauthorizedError, ForbiddenError, ConflictError, BadRequestError, ServerError, DatabaseConnectionError } from "../utils/custom.error.js";
import httpResponse from "../utils/http.response.js";

export const handlerError = ( error, req, res, next ) => {
    if (error instanceof UnauthorizedError) return httpResponse.Unauthorized(res, error);
    if (error instanceof NotFoundError) return httpResponse.NotFound(res, error);
    if (error instanceof ForbiddenError) return httpResponse.Forbidden(res, error);
    if (error instanceof ConflictError) return httpResponse.Conflict(res, error);
    if (error instanceof BadRequestError) return httpResponse.BadRequest(res, error);
    if (error instanceof ServerError) return httpResponse.ServerError(res, error);
    if (error instanceof DatabaseConnectionError) return httpResponse.DatabaseError(res, error);
    return httpResponse.ServerError(res, error)
};