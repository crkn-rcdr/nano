import * as CouchDBNano from "nano";

interface BasicAuth {
  readonly user: string;
  readonly password: string;
}

interface NoAuth {}

export type Auth = BasicAuth | NoAuth;

type Scheme = "http" | "https";

/**
 * Create a couchdb-nano instance pointing to a CouchDB server. Basic authentication parameters can also be supplied.
 * @param url The CouchDB server to which nano requests will be sent.
 * @param [auth={}] Authentication parameters.
 * @returns The nano instance.
 */
const get = (url: string, auth: Auth = {}): CouchDBNano.ServerScope => {
  try {
    new URL(url);
  } catch (_) {
    throw new TypeError("A valid absolute URL is required.");
  }

  const isBasic = (auth: Auth): auth is BasicAuth => {
    if ("password" in auth && !("user" in auth)) {
      throw new TypeError(
        "A user must be supplied to use basic authentication."
      );
    }

    if ("user" in auth && !("password" in auth)) {
      throw new TypeError(
        "A password must be supplied to use basic authentication."
      );
    }

    return "user" in auth;
  };

  return CouchDBNano({
    url,
    requestDefaults: isBasic(auth)
      ? { auth: { username: auth.user, password: auth.password } }
      : undefined,
  });
};

/**
 * Create a couchdb-nano instance pointing to a CouchDB server running locally, at a given port. Basic authentication parameters can also be supplied.
 * @param port Port on the local machine CouchDB is being served at.
 * @param [auth={}] Basic authentication parameters.
 * @param [scheme=http] URL scheme to use. "http" and "https" are supported.
 * @returns The nano instance.
 */
const localhost = (
  port: number,
  auth: Auth = {},
  scheme: Scheme = "http"
): CouchDBNano.ServerScope => {
  return get(`${scheme}://localhost:${port}/`, auth);
};

export { get, localhost };
