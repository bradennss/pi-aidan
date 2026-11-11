import { once } from "node:events";
import { createServer } from "node:http";
import { expect, test } from "vitest";
import { NotesClient } from "../dist/index.js";

test("client sends authentication and JSON and reports HTTP errors", async ({
  onTestFinished,
}) => {
  const requests: {
    method: string | undefined;
    path: string | undefined;
    authorization: string | undefined;
    contentType: string | undefined;
    body: string;
  }[] = [];
  let status = 201;
  const result = { id: 1, body: "hello" };
  const server = createServer((request, response) => {
    let body = "";
    request.setEncoding("utf8");
    request.on("data", (chunk: string) => {
      body += chunk;
    });
    request.on("end", () => {
      requests.push({
        method: request.method,
        path: request.url,
        authorization: request.headers.authorization,
        contentType: request.headers["content-type"],
        body,
      });
      response.writeHead(status, { "content-type": "application/json" });
      response.end(JSON.stringify(result));
    });
  });
  onTestFinished(() => {
    server.closeAllConnections();
    server.close();
  });
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  if (address === null || typeof address === "string") {
    throw new Error("Expected the test server to listen on a TCP port");
  }
  const client = new NotesClient(
    `http://127.0.0.1:${String(address.port)}`,
    "test-token",
  );
  await expect(client.create("hello")).resolves.toEqual(result);
  await expect(client.get(1)).resolves.toEqual(result);
  expect(requests).toEqual([
    {
      method: "POST",
      path: "/notes",
      authorization: "Bearer test-token",
      contentType: "application/json",
      body: '{"body":"hello"}',
    },
    {
      method: "GET",
      path: "/notes/1",
      authorization: "Bearer test-token",
      contentType: "application/json",
      body: "",
    },
  ]);
  status = 401;
  await expect(client.get(1)).rejects.toThrow(/HTTP 401/);
});
