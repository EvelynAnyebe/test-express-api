import user from "../models/user.js";

//Get all users
export function getUsers(req, res) {
  user
    .find()
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
