

import { AuthType } from "../types/auth.model";
import Api from "./api";

class AuthService extends Api {
  public async loginPost(user: AuthType) {
    return await this.http.post("/auth/login", user).then((res) => res.data);
  }
}
export const authService = new AuthService();
