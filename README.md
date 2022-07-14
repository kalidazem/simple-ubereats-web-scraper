# Simple Uber Eats Menu Scraper

This is a simple Node.js app, using Express, for scraping a restaurant menu.

## Usage

- To run the app, use the following command

`npm run dev`

## API

### **POST** Get Menu

`http://localhost:3000/getmenu`

#### BODY

Content-Type: Object(JSON) <br/>

```
{
  "url" :"https://www.ubereats.com/restaurant-name"
}
```
