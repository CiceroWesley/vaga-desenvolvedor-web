import { AxiosPromise } from "axios";

import { api } from "../api";
import { User } from "./types";

class UserServices {
  createUser(data: User): AxiosPromise<User> {
    return api.post("/users", data);
  }

  listUsers(): AxiosPromise<User[]> {
    return api.get("/users");
  }

  
}

export default new UserServices();
