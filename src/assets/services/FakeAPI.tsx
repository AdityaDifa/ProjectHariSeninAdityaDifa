import DB from "./fakeAccountDB.json";
type TAccounts = {
  email: string;
  password?: string;
  fullName?: string;
  phone?: string;
  gender?: string;
};

function GET_ALL(): TAccounts[] {
  if (!localStorage.getItem("accounts")) {
    localStorage.setItem("accounts", JSON.stringify(DB));
  }
  return JSON.parse(localStorage.getItem("accounts") || "[]");
}

function checkEmailExist({ email }: TAccounts) {
  const accounts: TAccounts[] = GET_ALL();
  const found: boolean = !!accounts.find((account) => account.email === email);
  return found ? true : false;
}

function Authentification({ email, password }: TAccounts) {
  const accounts: TAccounts[] = GET_ALL();
  const check: any = accounts.find(
    (account) => account.email === email && account.password === password
  );
  return Boolean(check);
}

function RegisterService({
  email,
  password,
  fullName,
  phone,
  gender,
}: TAccounts) {
  let accounts: Array<TAccounts> = GET_ALL();
  const account = {
    email: email,
    password: password,
    fullName: fullName,
    phone: phone,
    gender: gender,
  };

  if (checkEmailExist(account)) {
    return alert("account is exist, change to other email");
  } else {
    accounts.push(account);
    localStorage.setItem("accounts", JSON.stringify(accounts));
    return true;
  }
}

export { GET_ALL, Authentification, RegisterService };
