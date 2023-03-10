import axios from "axios";

const API_KEY = "AIzaSyDJsk41aOsa5AcEpCmYLVwZLhu-66WCpaQ";

function getUrl(mode) {
  return `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
}

async function authenticate(mode, email, password) {
  const response = await axios.post(getUrl(mode), {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = response.data.idToken;
  return token;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export async function getUserId(token) {
  console.log("token: ", token);
  const response = await axios.post(getUrl("lookup"), { idToken: token });
  console.log("response: ", response.data.users);
  const userId = response.data.users[0].localId;
  console.log("userid:", userId);
  return userId;
}
