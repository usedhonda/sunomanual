import assert from "node:assert/strict";
import test from "node:test";
import { redact, redactString, REDACTED } from "../src/safety/redact.js";

test("redacts JWT, bearer tokens, cookies, and Clerk query params", () => {
  const jwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.signature_123";
  const input = `Bearer ${jwt} cookie __session=secret; __clerk_handshake=${jwt} https://t.co/i/adsct?__clerk_handshake=${jwt}`;
  const output = redactString(input);
  assert(!output.includes(jwt));
  assert(!output.includes("__session=secret"));
  assert(output.includes(REDACTED));
});

test("redacts secret-shaped object keys recursively", () => {
  const output = redact({
    ok: true,
    token: "plain-token",
    metadata: {
      create_session_token: "session-token",
      safe: "visible"
    }
  });
  assert.equal(output.token, REDACTED);
  assert.equal(output.metadata.create_session_token, REDACTED);
  assert.equal(output.metadata.safe, "visible");
});
