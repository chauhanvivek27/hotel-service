const data = require("./../data.json");
const axios = require("axios");
const getSearchResult = require("./index");
jest.mock("axios");

describe("Hotel Search Result ", () => {
  it("fetches successfully data from an API", async () => {
    axios.get.mockResolvedValue(data);

    const results = await getSearchResult({
      city: "dubai",
      name: "",
      priceRange: "",
      dateRange: "",
    });

    await expect(results.data[0].city).toEqual("dubai");
  });
  it("fetches successfully data from an API on search by price", async () => {
    axios.get.mockResolvedValue(data);

    const results = await getSearchResult({
      city: "",
      name: "",
      priceRange: "$80:$100",
      dateRange: "",
    });
    await expect(results.data[0].city).toEqual("cairo");
  });
  it("fetches successfully data from an API on search by hotel name", async () => {
    axios.get.mockResolvedValue(data);

    const results = await getSearchResult({
      city: "",
      name: "Le Meridien",
      priceRange: "$80:$100",
      dateRange: "",
    });
    await expect(results.data[0].name).toEqual("Le Meridien");
  });
  it("fetches successfully data from an API on search by availability", async () => {
    axios.get.mockResolvedValue(data);

    const results = await getSearchResult({
      city: "",
      name: "",
      priceRange: "",
      dateRange: "10-10-2020:12-10-2020",
    });
    await expect(results.data[0].name).toEqual("Concorde Hotel");
  });
  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    await expect(
      getSearchResult({
        city: "",
        name: "",
        priceRange: "",
        dateRange: "10-10-2020:12-10-2020",
      })
    ).rejects.toThrow(errorMessage);
  });
});
