import * as axios from 'axios';
import * as jsdom from 'jsdom';
import { Item } from './Item';

export interface Scraper {

  storeName: string

  scrape(): Promise<Item[]>

}

export class SevenElevenScraper implements Scraper {

  storeName = "sevenEleven"

  async scrape(): Promise<Item[]> {
    const root = "https://www.sej.co.jp"
    const sevenNewPage = await axios.default.get(`${root}/i/products/thisweek/`)
    const itemElements = new jsdom.JSDOM(sevenNewPage.data).window.document.querySelectorAll("div.list_inner")

    return await Promise.all(
      Array.from(itemElements)
        .map(async itemElement => {
          const itemUrl = root + itemElement.querySelector("figure > a")!.getAttribute("href")!

          try {
            const itemDetailPage = await axios.default.get(itemUrl)
            const dom = new jsdom.JSDOM(itemDetailPage.data)

            const summary = dom.window.document
            const itemName = summary.querySelector("div.item_ttl > h1")?.textContent?.trim()
            const itemDetail = summary.querySelector("div.item_text > p")?.textContent?.trim()
            const priceText = summary.querySelector("div.item_price > p")?.textContent?.trim()
            const launchText = summary.querySelector("div.item_launch > p")?.textContent?.trim()
            const imageUrl = "http:" + summary.querySelector("div.productWrap img")?.getAttribute("src")?.toString()

            if (itemName != null && itemDetail != null && priceText != null && launchText != null && imageUrl != null) {
              const item: Item = {
                itemUrl: itemUrl,
                itemName: itemName,
                itemDetail: itemDetail,
                priceText: priceText,
                launchText: launchText,
                imageUrl: imageUrl
              }
              return item
            } else {
              return null;
            }
          } catch (e) {
            console.error(e);
            return null;
          }
        })
        .filter(async (item) => {
          const result = await item;
          return result !== null;
        })
        .map(async (item) => {
          const result = await item;
          console.log(item);
          return result as Item;
        })
    )
  }
}

export class FamilyMartScraper implements Scraper {

  storeName = "familyMart"

  async scrape(): Promise<Item[]> {
    const root = "https://www.family.co.jp"
    const newPage = await axios.default.get(`${root}/goods/newgoods.html`)
    const dom = new jsdom.JSDOM(newPage.data)

    const itemElements = dom.window.document.querySelectorAll("div.ly-mod-layout-clm")

    return await Promise.all(
      Array.from(itemElements).map(async itemElement => {
        const itemUrl = itemElement.querySelector("a")!.getAttribute("href")!.toString()
        const itemPage = await axios.default.get(itemUrl)
        const document = new jsdom.JSDOM(itemPage.data).window.document

        const itemName = document.querySelector("h1")!.textContent!.trim()
        const itemDetail = document.querySelector(".ly-goods-lead")!.textContent!.toString()
        const launchText = document.querySelector(".ly-goods-spec")!.textContent!.trim().replace("発売日：", "")
        const priceText = document.querySelector(".ly-kakaku-usual")!.textContent!.trim()
        const imageUrl = root + document.querySelector(".js-mainimage-size > img")!.getAttribute("src")!.toString()

        const item: Item = {
          itemUrl: itemUrl,
          itemName: itemName,
          itemDetail: itemDetail,
          priceText: priceText,
          launchText: launchText,
          imageUrl: imageUrl
        }

        console.log(item)

        return item
      })
    )
  }

}

export class LawsonScraper implements Scraper {

  storeName = "lawson"

  async scrape(): Promise<Item[]> {
    const root = "https://www.lawson.co.jp"
    const indexPage = await axios.default.get(`${root}/recommend/new/index.html`)
    const newPagePath = new jsdom.JSDOM(indexPage.data).window.document.querySelector("meta")!.getAttribute("content")!.split("=")[1]
    const newPage = await axios.default.get(root + newPagePath)
    const dom = new jsdom.JSDOM(newPage.data)

    const itemElements = dom.window.document.querySelectorAll("ul.col-3 > li")

    return await Promise.all(
      Array.from(itemElements).map(async itemElement => {
        const itemUrl = root + itemElement.querySelector("a")!.getAttribute("href")!.toString()
        const itemPage = await axios.default.get(itemUrl)
        const document = new jsdom.JSDOM(itemPage.data).window.document

        const itemName = document.querySelector("div.rightBlock > p.ttl")!.textContent!.trim()
        const itemDetail = document.querySelector("div.rightBlock > p.text")!.textContent!.toString()
        const launchText = itemElement.querySelector("p.date > span")!.textContent!.trim()
        const priceText = document.querySelector("div.rightBlock > dl > dd")!.textContent!.trim()
        const imageUrl = root + document.querySelector("div.leftBlock > p.mb05 > img")!.getAttribute("src")!.toString()

        const item: Item = {
          itemUrl: itemUrl,
          itemName: itemName,
          itemDetail: itemDetail,
          priceText: priceText,
          launchText: launchText,
          imageUrl: imageUrl
        }

        console.log(item)

        return item
      })
    )
  }
}