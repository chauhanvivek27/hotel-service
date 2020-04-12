const axios = require("axios");
const data = require("./../data.json");
const moment = require("moment");
const {
  serviceResponse,
  getPrice,
  getDates,
  filterArray,
} = require("../util/util");

async function getSearchResult(searchParams) {
  try {
    const hotelLst = await hoteList(); //data.hotels;
    if (!hotelLst) return serviceResponse("204", "Hotel List is empty");

    const filters = {
      city: searchParams.city
        ? (city) => city.toLowerCase() === searchParams.city.toLowerCase()
        : "",
      name: searchParams.name
        ? (name) => name.toLowerCase() === searchParams.name.toLowerCase()
        : "",
      price: Price(searchParams.priceRange),
      availability: Availability(searchParams.dateRange),
    };

    const filter = filterArray(hotelLst, filters);
    const arrFilter = filter
      .sort((a, b) => a.name.localeCompare(b.name))
      .sort((a, b) => a.price - b.price);
    return serviceResponse("200", arrFilter);
  } catch (error) {
    throw error;
  }
}

function Availability(dateRange) {
  if (dateRange) {
    const { dateFrom, dateTo } = getDates(dateRange);
    return function (arrDate) {
      return arrDate.some(
        (item) =>
          moment(item.from, "DD-MM-YYYY") <= dateFrom &&
          moment(item.to, "DD-MM-YYYY") >= dateTo
      );
    };
  }
  return "";
}

function Price(priceRange) {
  if (priceRange) {
    const { priceFrom, priceTo } = getPrice(priceRange);
    return function (price) {
      return price >= priceFrom && price <= priceTo;
    };
  }
  return "";
}

function hoteList() {
  const url = "https://api.myjson.com/bins/tl0bp";
  return axios
    .get(url)
    .then((response) => {
      return response.data.hotels;
    })
    .catch((error) => {
      throw error;
    });
}

module.exports = getSearchResult;
