const express = require("express");
const getSearchResult = require("./../src");
const router = express.Router();
const Joi = require("@hapi/joi");

router.get("/gethotels", async (request, response, next) => {
  try {
    const schema = Joi.object()
      .keys({
        city: Joi.string().empty(""),
        hotelname: Joi.string().empty(""),
        priceRange: Joi.string()
          .empty("")
          .regex(/^\$\d+[.]?\d{1,2}\:\$\d+[.]?\d{1,2}$/i)
          .label("Please enter the price Range in  format"),
        dateRange: Joi.string()
          .empty("")
          .regex(
            /^((0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4})\:((0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4})/i
          )
          .label("Please enter the date Range in DD-MM-YYYY:DD-MM-YYYY format"),
      })
      .or("city", "hotelname", "priceRange", "dateRange");

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
