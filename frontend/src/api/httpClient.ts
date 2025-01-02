import axios from "axios";

const baseURL = "https://backend.umarkhanfarooqe.workers.dev";

const client = axios.create({
  baseURL,
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});

export { client };
