import { test, expect } from "@playwright/test";
import { changeValueByKey, getDataFromJsonFile, readDataFromCSV } from "../../common/Util.js";
const requestBodyTrue = getDataFromJsonFile(
  "testdata/AuthorizedAPI/AuthorizedRequestBody_True.json",
);
const requestBodyFalse = getDataFromJsonFile(
  "testdata/AuthorizedAPI/AuthorizedRequestBody_False.json",
);


//case true
test("Account authorized is true", async ({ request }) => {
  const response = await request.post("/Account/v1/Authorized", {
    data: await requestBodyTrue,
  });
  expect(response.status()).toBe(200);
  expect(await response.text()).toBe("true");
});

//case false
test("Account authorized is false", async ({ request }) => {
  const response = await request.post("/Account/v1/Authorized", {
    data: await requestBodyFalse,
  });
  expect(response.status()).toBe(200);
  expect(await response.text()).toBe("false");
});



//response code 404
test("Validation of account authorized", async ({ request }) => {
  const data = await readDataFromCSV(
    "testdata/AuthorizedAPI/ValidationData.csv",
  );
  for (const row of data) {
    // mỗi dòng 1 tcs
    const fieldName = row.fieldName;
    const fieldValue = row.fieldValue;
    const statusCode = row.statusCode;
    const errorCode = row.errorCode;
    const errorMessage = row.errorMessage;
    const requestBodyPath = `testdata/AuthorizedAPI/AuthorizedRequestBody_True.json`;
    const newRequestBody = await changeValueByKey(
      fieldName,
      fieldValue
    );  
  }






