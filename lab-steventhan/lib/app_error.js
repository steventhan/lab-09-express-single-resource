'use strict';

let AppError = function (message, statusCode, responseMessage) {
  this.message = message;
  this.statusCode = statusCode;
  this.responseMessage = responseMessage;
};

AppError.isAnInstanceOfAppError = function (error) {
  return error instanceof AppError;
};

AppError.new400 = function () {

};

AppError.new404 = function () {
  
};

AppError.new500 = function () {

};

module.exports = AppError;
