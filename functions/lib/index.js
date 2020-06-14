"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response
        .status(200)
        .send("helloWorld");
});
//# sourceMappingURL=index.js.map