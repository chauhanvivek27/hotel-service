const moment = require("moment");
const Joi = require("@hapi/joi");

module.exports = {
  serviceResponse: (status, data) => {
    return {
      status: status,
      data: data,
    };
  },
  getPrice: (priceRange) => {
    if (priceRange) {
      const priceFrom = priceRange.split(":")[0];
      const priceTo = priceRange.split(":")[1];

      return {
        priceFrom: parseFloat(priceFrom.replace(/\$|,/g, "")),
        priceTo: parseFloat(priceTo.replace(/\$|,/g, "")),
      };
    }
  },
  getDates: (dateRange) => {
    const dFrom = dateRange.split(":")[0];
    const dTo = dateRange.split(":")[1];

    return {
      dateFrom: moment(dFrom, "DD-MM-YYYY"),
      dateTo: moment(dTo, "DD-MM-YYYY"),
    };
  },

  filterArray: (array, filters) => {
    const filterKeys = Object.keys(filters);
    return array.filter((item) => {
      // validates all filter criteria
      return filterKeys.every((key) => {
        if (typeof filters[key] !== "function") return true;
        return filters[key](item[key]);
      });
    });
  },

  schema: Joi.object()
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
    .or("city", "hotelname", "priceRange", "dateRange"),
};
