// External imports
const puppeteer = require('puppeteer');
const httpStatus = require('http-status');

//  Internal imports
const ApiError = require('../utils/ApiError');

/**
 * Gets menu via puppeteer
 * @param {String} url url for ubereats menu
 * @returns {Object}
 */
const getMenu = async (url) => {
  let browser = [];
  let page = [];
  let categoriesWithItems = [];
  // in case of technical error occurs
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      dumpio: true,
    });
    page = await browser.newPage();
    // go to page
    await page.goto(url, { waitUntil: 'domcontentloaded' });
  } catch (err) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid url');
  }

  // Pre-evaluation setup
  await page.evaluate(() => {
    /**
     *
     * @param {Array} item
     * @returns {Object} {item_name:"", item_information:"", item_price:"", item_kcal:"" }
     */
    // eslint-disable-next-line no-undef
    window.beautifyMenuItem = function (item) {
      let itemInformation = '';
      let itemKcal = '';
      let itemPrice;
      let itemName;
      if (item.length > 2) {
        itemInformation = typeof item[2].textContent !== 'undefined' ? item[2].textContent : '';
        itemKcal = typeof item[3].textContent !== 'undefined' ? item[3].textContent : '';
      }

      // eslint-disable-next-line prefer-const
      itemName = typeof item[0].textContent !== 'undefined' ? item[0].textContent : '';

      // eslint-disable-next-line prefer-const
      itemPrice = typeof item[1].textContent !== 'undefined' ? item[1].textContent : '';

      return {
        item_name: itemName,
        item_price: itemPrice,
        item_information: itemInformation,
        item_kcal: itemKcal,
      };
    };
  });

  // in case in valid url was passed or there is an issue in parsing the HTML elements
  try {
    categoriesWithItems = await page.evaluate(() => {
      // the main div that will hold the menu
      const menu = {};

      // eslint-disable-next-line no-undef
      const menuContainer = document.querySelectorAll('#main-content > div');

      // get last child of #main-content
      const lastChild = menuContainer[menuContainer.length - 1]; // returns Node

      // lists that contain restaurant menu items
      const outerUnorderedLists = lastChild.querySelectorAll('ul:first-child > li');

      outerUnorderedLists.forEach((list) => {
        const sectionTitle = list.querySelector('div:first-child').textContent;

        menu[sectionTitle] = [];

        const sectionItems = list.querySelectorAll('ul:last-child > li');

        sectionItems.forEach(async (sectionItem) => {
          const sectionDetails = sectionItem.querySelectorAll('span');
          const beautifiedItem = this.beautifyMenuItem(sectionDetails);
          menu[sectionTitle].push({ ...beautifiedItem });
        });
      });
      return menu;
    });
  } catch (err) {
    console.log(err);
    throw new Error('Server error! Please try again later');
  }
  //  close the browser
  await browser.close();
  return categoriesWithItems;
};

module.exports = {
  getMenu,
};
