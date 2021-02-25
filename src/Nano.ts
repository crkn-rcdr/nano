import * as nano from "nano";

interface AuthOptions {
  user: string;
  password: string;
}

type Scheme = "http" | "https";

class Nano {
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

  static localhost(port: number, auth?: AuthOptions, scheme: Scheme = "http") {
    return Nano.get(`${scheme}://localhost:${port}/`, auth);
  }
}

export default Nano;
