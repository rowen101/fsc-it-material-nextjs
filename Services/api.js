import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api"; //local development
// const accessToken = "1|mZbePy2T5hwjzGAFULTx79zEnLYuegCePyvzDmCL";

const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
    // Authorization: "Bearer <token_here>",
  },
  withCredentials: true,
});

// instance.interceptors.request.use(function (config) {
//   const userToken = localStorage.getItem("token");
//   //config.headers.Authorization = userToken;

//   return config;
// });
instance.interceptors.request.use(
  async (config) => {
    const userToken = await localStorage.getItem("token");

    if (userToken != null) {
      config.headers.token = userToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

function httpMsg(obj, statuscode, msg) {
  if (statuscode === 401) {
    obj.$store.dispatch("logout").then(() => {
      obj.$router.push("/login");
    });
  } else if (statuscode === 200) {
    console.log(msg);
  } else if (statuscode === undefined) {
    console.log("Please contact administrator!!!");
  } else {
    console.log(msg);
  }
}

export default {
  instance,
  baseURL,
  httpMsg,
};
