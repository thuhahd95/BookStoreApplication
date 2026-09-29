import { test, expect } from "@playwright/test";
test("Get User by ID Success", async ({ request }) => {
  const tokenResponse = await request.post("/Account/v1/GenerateToken", {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      userName: "thuha1",
      password: "Abc@1234",
    },
  });
  const tokenBody = await tokenResponse.json();
  const token = tokenBody.token;

  const response = await request.get(
    "/Account/v1/User/52f10657-763a-40bd-b84f-7d4cdccdef55",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  expect(response.status()).toBe(200);
});
