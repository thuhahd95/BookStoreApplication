import { test, expect } from "@playwright/test";
import { getDataFromJsonFile } from "../../common/Util.js";
const requestBody = getDataFromJsonFile(
  "testdata/AuthorizedAPI/AuthorizedRequestBody.json",
);
test("Generate Token Success", async ({ request }) => {
  const response = await request.post("/Account/v1/GenerateToken", {
    headers: {
      "Content-Type": "application/json",
    },
    data: await requestBody,
  });

  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  const token = responseBody.token;
  console.log("Token: " + token);
  //console.log("Response Body: " + JSON.stringify(responseBody));
  //console.log("Response Body: " + JSON.stringify(responseBody));
  //expect(responseBody.token).toBeDefined();
});
