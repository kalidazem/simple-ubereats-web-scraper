# Simple Uber Eats Menu Scraper

This is a simple Node.js app, using Express, for scraping a restaurant's menu.

## Usage

- To run the app, use the following command

`npm run dev`

## API

### **POST** Get Menu -- this Endpoint uses Puppeteer (Currently not working)

**_NOTE:_** currently this feature is not working due to change in Ubereats page structure. I will revisit it when I get some time.

`http://localhost:3000/ubereats/get-menu`

#### Request body

```json
{
  "url": "https://www.ubereats.com/restaurant-name"
}
```

#### Response body sample

```json
{
  "Featured": [
    {
      "item_name": "Mozzarella Dippers Sharebox®",
      "item_price": "£5.69",
      "item_information": " • ",
      "item_kcal": "769 kcal"
    },
    {
      "item_name": "McPlant™",
      "item_price": "£4.09",
      "item_information": " • ",
      "item_kcal": "429 kcal"
    }
  ],
  "What's New?": [
    {
      "item_name": "Mozzarella Dippers Sharebox®",
      "item_price": "£5.69",
      "item_information": " • ",
      "item_kcal": "769 kcal"
    }
  ]
}
```

### **POST** Get Menu -- Ubereats API (API endpoint was obtained by analyzing their network traffic)

`http://localhost:3000/api-call/get-menu`

#### Request body

```json
{
  "storeUuid": "9b0d86f9-d420-414d-853f-57cad39bebdd"
}
```

#### Response body sample

**_NOTE:_** below sample doesn't contain all the data returned from API, left some key values to keep doc tidy.

```json
{
  "7706732f-a8db-4705-b62d-1a5ccb8a199a": [ // array contains many sections
    {
      "catalogSectionUUID": "7e12b8f3-ce6a-522c-8e42-0e1e6a75e76e", // section id
      "payload": {
        "standardItemsPayload": {
          "title": {
            "text": "Picked for you", // section title
          },
          "spanCount": 2,
          "catalogItems": [  // section items
            {
              "uuid": "4bc1b1ff-5fd7-40ba-935e-f72bc5dbf4fb",
              "imageUrl": "https://tb-static.uber.com/prod/image-proc/processed_images/",
              "title": "Curry", // item name
              "itemDescription": "",
              "price": 199, // item price in pence
              "isSoldOut": false,
              "hasCustomizations": true,
              "isAvailable": true, // item availability
            },
          ],
        },
      },
    },
  ],
};
```

## TODOs

- [ ] automate testing.
