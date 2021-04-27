import user from "../models/user.js";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { body, param, validationResult } = require("express-validator");


/*
 * Validate requests middleware
 */
export function validate(method) {
  switch (method) {
    case "getUser": {
      return param("id", "An integer expected").exists().isInt();
    }
    case "createUser": {
      return [body("firstname", "Expected firstname but none given").exists()];
    }
    default:
  }
}

//Specifies the fields to return
const fieldSelect =
  "userName firstName lastName otherNames email phone gender dob" +
  " countryOfResidence countryCode stateOfResidence cityOfResidence " +
  "address role emailVerified accountStatus avatar";

//Get all users
export function getUsers(req, res) {
  user
    .find()
    .select(fieldSelect)
    .exec()
    .then((user) => {
      res.send({
        statusCode: res.statusCode,
        message: "Successful",
        data: user,
      });
    })
    .catch((err) => {
      res.status(500).send({
        statusCode: res.statusCode,
        message:
          err.message || "Some error occured while retrieving users. Try again",
      });
    });
}

/*
 * @api {get} /user/:id Get single user
 * @apiName
 * @apiPermission [user,admin]
 * @apiGroup user
 *
 * @apiParam {String} [id] _id
 *
 *@apiSuccess (200) {Object} mixed User object
 */
export function getUser(req, res) {

  /*
   *Finds the validation errors in this request and wraps
   *them in an object with handy functions
   */
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({
      statusCode: 400,
      message: errors.array(),
    });
  }
  //Validation passed, handle request
  user.findById(req.param.id, fieldSelect).exec((err, user) => {
    if (err) {
      return res.send({
        statusCode: 500,
        message: "An internal error occurred. Try again in 15secs",
      });
    }
    res.send({
      statusCode: 200,
      message: "successful",
      data: user,
    });
  });
}
