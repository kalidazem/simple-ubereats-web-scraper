const puppeteer = require("puppeteer");
/**
 *
 * @param {String} url url for ubereats menu
 * @returns {Object}
 */
const getMenu = async (url) => {
  let browser,
    page,
    categoriesWithItems = [];
  //in case of technical error occurs
  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    page = await browser.newPage();
    //go to page
    await page.goto(url, { waitUntil: "domcontentloaded" });
  } catch (err) {
    throw new Error("Invalid url");
  }

  //Pre-evaluation setup
  await page.evaluate(() => {
    /**
     *
     * @param {Array} item
     * @returns {Object} {item_name:"", item_information:"", item_price:"", item_kcal:"" }
     */
    window.beautifyMenuItem = function (item) {
      let itemInformation = "",
        itemKcal = "",
        itemPrice,
        itemName;
      if (item.length > 2) {
        itemInformation =
          typeof item[2].textContent !== "undefined" ? item[2].textContent : "";
        itemKcal =
          typeof item[3].textContent !== "undefined" ? item[3].textContent : "";
      }

      itemName =
        typeof item[0].textContent !== "undefined" ? item[0].textContent : "";

      itemPrice =
        typeof item[1].textContent !== "undefined" ? item[1].textContent : "";

      return {
        item_name: itemName,
        item_price: itemPrice,
        item_information: itemInformation,
        item_kcal: itemKcal,
      };
    };
  });

  page.on("console", (message) => consoleLog(message));

  //in case in valid url was passed or there is an issue in parsing the HTML elements
  try {
    categoriesWithItems = await page.evaluate(() => {
      //the main div that will hold the menu
      let menu = {};

      let menuContainer = document.querySelectorAll("#main-content > div");

      //get last child of #main-content
      let lastChild = menuContainer[menuContainer.length - 1]; //returns Node

      //lists that contain restaurant menu items
      let outerUnorderedLists = lastChild.querySelectorAll(
        "ul:first-child > li"
      );

      outerUnorderedLists.forEach((list) => {
        let sectionTitle = list.querySelector("div:first-child").textContent;

        menu[sectionTitle] = [];

        let sectionItems = list.querySelectorAll("ul:last-child > li");

        sectionItems.forEach(async (sectionItem) => {
          let sectionDetails = sectionItem.querySelectorAll("span");
          let beautifiedItem = this.beautifyMenuItem(sectionDetails);
          menu[sectionTitle].push({ ...beautifiedItem });
        });
      });
      return menu;
    });
  } catch (err) {
    console.log(err);
    throw new Error("Server error! Please try again later");
  }
  //close the browser
  await browser.close();
  return categoriesWithItems;
};

module.exports = {
  getMenu,
};
