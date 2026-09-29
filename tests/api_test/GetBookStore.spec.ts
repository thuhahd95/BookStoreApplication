import { test, expect } from "@playwright/test";
test("Get all books", async ({ request }) => {
  const response = await request.get("/BookStore/v1/Books");

  //Check status code
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty("books");
  expect(Array.isArray(body.books)).toBe(true);
  expect(body.books.length).toBeGreaterThan(0);

  const book = body.books[0];

  expect(book).toHaveProperty("isbn");
  expect(book).toHaveProperty("title");
  expect(book).toHaveProperty("subTitle");
  expect(book).toHaveProperty("author");
  expect(book).toHaveProperty("publish_date");
  expect(book).toHaveProperty("publisher");
  expect(book).toHaveProperty("pages");
  expect(book).toHaveProperty("description");
  expect(book).toHaveProperty("website");
});
