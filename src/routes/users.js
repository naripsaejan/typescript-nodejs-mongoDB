const router = require("express").Router();

const usersData = {
  1: { id: 1, firstName: "Ralph", lastName: "Woods" },
  2: { id: 2, firstName: "Ronnie", lastName: "Moore" },
  3: { id: 3, firstName: "Koko", lastName: "Kennedy" },
};

router
  .route("/users")
  .post(function (req, res, next) {
    res.json(req.body).status(200).send();
  })
  // to retrieve resource
  .get(function (req, res, next) {
    res.json(usersData);
    res.status(200).send();
  });
router.route("/users/:userId").get(function (req, res, next) {
  const id = req.params.userId;
  if (id && usersData[id]) {
    res.json(usersData[id]);
    res.status(200).send();
  } else {
    res.status(404).send();
  }
});

module.exports = router;
