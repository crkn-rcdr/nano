import Nano from "./Nano";
import { expect } from "chai";

const exampleUrl = "http://example.com:5984";

// setting the index signature for the type because
// noUncheckedIndexedAccess is set in tsconfig.json
const incompleteAuth: {
  [index: string]: Record<string, string>;
} = {
  user: { user: "user" },
  password: { password: "password" },
};

describe("Nano.get(url, auth?)", () => {
  it("Creates an instance with a valid url", () => {
    const nano = Nano.get(exampleUrl);
    expect(nano).to.respondTo("use");
  });

  it("Creates an instance with basic authentication", () => {
    const nano = Nano.get(exampleUrl, { user: "admin", password: "password" });
    expect(nano).to.respondTo("use");
  });

  it("Throws a TypeError if url is invalid", () => {
    const invalidCall = () => {
      Nano.get("not-absolute");
    };
    expect(invalidCall).to.throw(TypeError);
  });

  ["user", "password"].map((field) => {
    it(`Throws a TypeError if auth is provided solely with ${field}`, () => {
      const noField = () => {
        // @ts-expect-error
        Nano.get(exampleUrl, incompleteAuth[field]);
      };
      expect(noField).to.throw(TypeError);
    });
  });
});

describe("Nano.localhost(port, auth?, scheme?)", () => {
  it("Creates an instance pointing to localhost", () => {
    const nano = Nano.localhost(5984);
    expect(nano).to.respondTo("use");
    expect(nano.config.url.startsWith("http://localhost:5984")).to.be.true;
  });

  it("Uses HTTPS when requested", () => {
    const nano = Nano.localhost(5984, undefined, "https");
    expect(nano).to.respondTo("use");
    expect(nano.config.url.startsWith("https://localhost:5984")).to.be.true;
  });
});
