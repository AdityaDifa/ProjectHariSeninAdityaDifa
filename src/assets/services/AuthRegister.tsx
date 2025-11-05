import { RegisterService } from "./FakeAPI";

type TAuthRegister = {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  gender: string;
};
export default function AuthRegister({
  email,
  password,
  fullName,
  phone,
  gender,
}: TAuthRegister) {
  return RegisterService({ email, password, fullName, phone, gender });
}
