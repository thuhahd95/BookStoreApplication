import { test, expect } from "@playwright/test";
import {
  changeValueByKey,
  copyFile,
  createValidationRequestBody,
  getDataFromJsonFile,
  readDataFromCSV,
} from "../../common/Util.js";
const requestBodyTrue = getDataFromJsonFile(
  "testdata/AuthorizedAPI/AuthorizedRequestBody_True.json",
);
const requestBodyFalse = getDataFromJsonFile(
  "testdata/AuthorizedAPI/AuthorizedRequestBody_False.json",
);

//case true
// test("Account authorized is true", async ({ request }) => {
//   const response = await request.post("/Account/v1/Authorized", {
//     data: await requestBodyTrue,
//   });
//   expect(response.status()).toBe(200);
//   expect(await response.text()).toBe("true");
// });

// //case false
// test("Account authorized is false", async ({ request }) => {
//   const response = await request.post("/Account/v1/Authorized", {
//     data: await requestBodyFalse,
//   });
//   expect(response.status()).toBe(200);
//   expect(await response.text()).toBe("false");
// });

//response code 404
test("Validation of account authorized", async ({ request }) => {
  const data = await readDataFromCSV(
    "testdata/AuthorizedAPI/ValidationAuthorize.csv",
  );
  for (const row of data) {
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
    const response = await request.post("/Account/v1/Authorized", {
      data: newRequestBody,
    });
    const responseBody = await response.json();
    console.log(`Response Body: ${responseBody}`);
    const code = responseBody.code;
    expect(response.status()).toBe(Number(statusCode));
    expect(code).toBe(Number(errorCode));
    expect(responseBody.message).toBe(errorMessage);
  }
});
