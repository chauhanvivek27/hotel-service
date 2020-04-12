const express = require("express");
const getSearchResult = require("./../src");
const router = express.Router();
const { schema } = require("../util/util");

router.get("/gethotels", async (request, response, next) => {
  try {
    const data = {
      city: request.query.city || "",
      hotelname: request.query.hotelname || "",
      priceRange: request.query.pricerange || "",
      dateRange: request.query.daterange || "",
    };

    const { error } = schema.validate(data);
    if (!error) {
      const result = await getSearchResult(data);
      response.json(result);
    } else {
      return next(error.details);
    }
  } catch (err) {
    return next(err);
  }
  next();
});
module.exports = router;
