# Hotel Search API in Node JS [![Build Status](https://travis-ci.org/chauhanvivek27/hotel-service.svg?branch=master)](https://travis-ci.org/chauhanvivek27/hotel-service) [![codebeat badge](https://codebeat.co/badges/3a99f3bc-865d-4469-867d-0ddeb55abadc)](https://codebeat.co/projects/github-com-chauhanvivek27-hotel-service-master) [![Coverage Status](https://coveralls.io/repos/github/chauhanvivek27/hotel-service/badge.svg?branch=master)](https://coveralls.io/github/chauhanvivek27/hotel-service?branch=master)

This API used to search hotel based on City, Hotel Name , Price Range and Date Range.

## Getting Started

Before using the application. Please check Prerequisites and installtion instructions.

### Prerequisites


you need following node js and NPM version.

```

node v10.16.3

NPM 6.9.0

```

### Installing

Here is step by step thing to get application working on your machine

GIT clone the repository on local.

```

npm install

```

```

npm run dev

```

your done play around it and raise issue if you found. Cheer!!

## Browser the following URL (PORT:-3000)

1. [http://localhost:3000/gethotels](http://localhost:3000/gethotels)
2. [http://localhost:3000/gethotels?pricerange=$80:$100](http://localhost:3000/gethotels?pricerange=$80:$100)
3. [http://localhost:3000/gethotels?pricerange=$80:$400&city=dubai](http://localhost:3000/gethotels?pricerange=$80:$400&city=dubai)
4. [http://localhost:3000/gethotels?daterange=10-10-2020:15-10-2020&city=dubai](http://localhost:3000/gethotels?daterange=10-10-2020:15-10-2020&city=dubai)

## Running the tests

To test the application please find the below commands

### How to Run the test and check coverage

```

npm run test

```

To check the coverage you can tun the following commands

```

npm run test:coverage

```
