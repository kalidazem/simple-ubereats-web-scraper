# Simple Uber Eats Menu Scraper

This is a simple Node.js app, using Express, for scraping a restaurant menu.

## Usage

- To run the app, use the following command

`npm run dev`

## API

### **POST** Get Menu

`http://localhost:3000/getmenu`

#### Request body

Content-Type: Object(JSON) <br/>

```
{
  "url":"https://www.ubereats.com/restaurant-name"
}
```

#### Response body sample

```
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
      },
  ],
  "What's New?": [
      {
        "item_name": "Mozzarella Dippers Sharebox®",
        "item_price": "£5.69",
        "item_information": " • ",
        "item_kcal": "769 kcal"
      },
    ]
}
```
