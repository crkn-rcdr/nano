import * as nano from "nano";

interface AuthOptions {
  readonly user: string;
  readonly password: string;
}

type Scheme = "http" | "https";

/**
 * Class providing static methods for creating couchdb-nano instances.
 */
class Nano {
  /**
   * Create a couchdb-nano instance pointing to a CouchDB server. Basic authentication parameters can also be supplied.
   * @param {string} url The CouchDB server to which nano requests will be sent.
   * @param {AuthOptions} [auth] Basic authentication parameters.
   * @returns {nano.ServerScope} The nano instance.
   */
  static get(url: string, auth?: AuthOptions): nano.ServerScope {
    try {
      new URL(url);
    } catch (_) {
      throw new TypeError("Nano.get must be called with a valid absolute URL.");
    }

    if (
      auth &&
      ((auth.user && !auth.password) || (!auth.user && auth.password))
    ) {
      throw new TypeError(
        "Authentication options require both a user and a password."
      );
    }

    return nano({
      url,
      requestDefaults: auth
        ? { auth: { username: auth.user, password: auth.password } }
        : undefined,
    });
  }

  /**
   * Create a couchdb-nano instance pointing to a CouchDB server running locally, at a given port. Basic authentication parameters can also be supplied.
   * @param {number} port Port on the local machine CouchDB is being served at.
   * @param {AuthOptions} [auth] Basic authentication parameters.
   * @param {Scheme} [scheme="http"] URL scheme to use. "http" and "https" are supported.
   * @returns {nano.ServerScope} The nano instance.
   */
  static localhost(
    port: number,
    auth?: AuthOptions,
    scheme: Scheme = "http"
  ): nano.ServerScope {
    return Nano.get(`${scheme}://localhost:${port}/`, auth);
  }
}

export default Nano;
