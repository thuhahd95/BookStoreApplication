import { readFile } from "node:fs/promises";
import * as fs from "fs";
import { parse } from "csv-parse";
import * as path from "path";
export async function getDataFromJsonFile(
  filePath: string,
): Promise<Record<string, string>> {
  const fullFilePath = path.resolve(process.cwd(), filePath);
  const data = await readFile(fullFilePath, "utf8");
  return JSON.parse(data);
}

//export async function changeValueByKey(filePath: string, key: string, newValue: string): Promise<Record<string, string>> {

export async function readDataFromCSV(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const records: any[] = [];
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, trim: true }))
      .on("data", (row) => {
        records.push(row);
      })
      .on("end", () => {
        resolve(records);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

export async function changeValueByKey(
  jsonBody: string,
  fieldName: string,
  fieldValue: string,
): Promise<string> {
  let result = "";
  let jsonObject = JSON.parse(jsonBody);
  if (jsonObject.hasOwnProperty(fieldName)) {
    jsonObject[fieldName] = fieldValue;
    result = JSON.stringify(jsonObject);
  }
  return result;
}

//File path được tính từ /testdata, ví dụ: testdata/AuthorizedAPI/ValidationAuthorize.csv
export async function copyFile(filePath: string): Promise<string> {
  const fullFilePath = path.resolve(process.cwd(), filePath);
  const currentFileName = path.basename(fullFilePath);
  const newFileName = "copy_" + currentFileName;
  const destinationPath = path.resolve(
    process.cwd(),
    "testdata/AuthorizedAPI",
    newFileName,
  );
  if (fs.existsSync(destinationPath)) {
    await fs.unlinkSync(destinationPath);
  }
  await fs.promises.copyFile(fullFilePath, destinationPath);
  return destinationPath + newFileName;
}

export async function writeFile(filePath: string, data: string): Promise<void> {
  const fullFilePath = path.resolve(process.cwd(), filePath);
  await fs.promises.writeFile(fullFilePath, data);
}

export async function createValidationRequestBody(
  filePath: string,
  fieldName: string,
  fieldValue: string,
): Promise<string> {
  const newRequestBodyPath = await copyFile(filePath);
  const requestBody = await getDataFromJsonFile(newRequestBodyPath);
  const newRequestBody = await changeValueByKey(
    JSON.stringify(requestBody),
    fieldName,
    fieldValue,
  );
  writeFile(newRequestBodyPath, newRequestBody);
  return newRequestBody;
}
