const moment = require("moment");

module.exports = {
  serviceResponse: (status, data) => {
    return {
      status: status,
      data: data
    };
  },
  getPrice: priceRange => {
    if (priceRange) {
      const priceFrom = priceRange.split(":")[0];
      const priceTo = priceRange.split(":")[1];

      return {
        priceFrom: parseFloat(priceFrom.replace(/\$|,/g, "")),
        priceTo: parseFloat(priceTo.replace(/\$|,/g, ""))
      };
    }
  },
  getDates: dateRange => {
    const dFrom = dateRange.split(":")[0];
    const dTo = dateRange.split(":")[1];

    return {
      dateFrom: moment(dFrom, "DD-MM-YYYY"),
      dateTo: moment(dTo, "DD-MM-YYYY")
    };
  },

  filterArray: (array, filters) => {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      // validates all filter criteria
      return filterKeys.every(key => {
        if (typeof filters[key] !== "function") return true;
        return filters[key](item[key]);
      });
    });
  }
};
