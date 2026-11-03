import { test, expect } from "@playwright/test";
import {
  changeValueByKey,
  copyFile,
  createValidationRequestBody,
  getDataFromJsonFile,
  readDataFromCSV,
} from "../../common/Util.js";

//case true
// test("Account authorized is true", async ({ request }) => {
// const requestBodyTrue = getDataFromJsonFile(
//   "testdata/AuthorizedAPI/AuthorizedRequestBody_True.json",
// );
//   const response = await request.post("/Account/v1/Authorized", {
//     data: await requestBodyTrue,
//   });
//   expect(response.status()).toBe(200);
//   expect(await response.text()).toBe("true");
// });

// //case false
// test("Account authorized is false", async ({ request }) => {
// const requestBodyFalse = getDataFromJsonFile(
//   "testdata/AuthorizedAPI/AuthorizedRequestBody_False.json",
// );
//   const response = await request.post("/Account/v1/Authorized", {
//     data: await requestBodyFalse,
//   });
//   expect(response.status()).toBe(200);
//   expect(await response.text()).toBe("false");
// });

//response code 404
const invalidData = await readDataFromCSV(
  "testdata/AuthorizedAPI/ValidationAuthorize.csv",
);
let index = 0;
for (const row of invalidData) {
  index++;
  test(
    `Validation of account authorized ${index}`,
    { tag: ["@ValidationCase", "@FullCase"] },
    async ({ request }) => {
      // const data = await readDataFromCSV(
      //   "testdata/AuthorizedAPI/ValidationAuthorize.csv",
      // );
      // for (const row of data) {
      // mỗi dòng 1 tcs
      const fieldName = row.fieldName;
      const fieldValue = row.fieldValue;
      const statusCode = row.statusCode;
      const errorCode = row.code;
      const errorMessage = row.errorMSG;
      const requestBodyPath = `testdata/AuthorizedAPI/AuthorizedRequestBody_True.json`;
      const newRequestBody = await createValidationRequestBody(
        requestBodyPath,
        fieldName,
        fieldValue,
      );
      console.log("Request Body:", newRequestBody);
      const response = await request.post("/Account/v1/Authorized", {
        headers: {
          "Content-Type": "application/json",
        },
        data: newRequestBody,
      });
      // console.log("Request Body:", newRequestBody);
      const responseBody = await response.json();
      // console.log(`Response Body: ${responseBody}`);
      const code = responseBody.code;
      console.log("Response Body:", code);
      expect(response.status()).toBe(Number(statusCode));
      expect(code).toBe(errorCode);
      expect(responseBody.message).toBe(errorMessage);
    },
  );
}
