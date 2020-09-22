import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'

import { Scraper, LawsonScraper, FamilyMartScraper, SevenElevenScraper } from "./model/scraper";

admin.initializeApp()

const db = admin.firestore()

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: functions.VALID_MEMORY_OPTIONS[2]
}

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const scheduledScraping = functions.runWith(runtimeOpts).pubsub.schedule('every tuesday 08:00')
  .timeZone('Asia/Tokyo')
  .onRun(async (context) => {
    const scrapers = [
      new SevenElevenScraper(),
      new LawsonScraper(),
      new FamilyMartScraper()
    ]

    try {
      for await (const scraper of scrapers) {
        console.log(`[START] ${scraper.storeName}`)

        const items = await scraper.scrape()
        const result = await db.collection("stores").doc(scraper.storeName).update({ items: items })

        console.log(`[END] ${scraper.storeName} ${result}`)
      }

      console.log('Finished')
    } catch (error) {
      console.error(error)
    }
  });

export const scrap = functions.https.onRequest(async (req, res) => {
  let scraper: Scraper;

  switch (req.query['store']) {
    case 'sevenEleven':
      scraper = new SevenElevenScraper();
      break;
    case 'lawson':
      scraper = new LawsonScraper();
      break;
    case 'familyMart':
      scraper = new FamilyMartScraper();
      break;
    default:
      scraper = new SevenElevenScraper();
      res.status(400).send('bad request');
      return;
  }

  try {
    console.log(`[START] ${scraper.storeName}`)
    const items = await scraper.scrape()
    const result = await db.collection("stores").doc(scraper.storeName).update({ items: items })
    console.log(`[END] ${scraper.storeName} ${items}`)

    res.status(200).send(result);
  } catch (error) {
    console.error(error)
  }

});