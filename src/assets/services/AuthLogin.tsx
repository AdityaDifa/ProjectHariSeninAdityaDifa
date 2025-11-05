import { Authentification } from "./FakeAPI";

type TAuthLogin = {
  email: string;
  password: string;
};

export default function AuthLogin({ email, password }: TAuthLogin) {
  return Authentification({ email, password });
}
