import axios from "axios";

export default axios.create({
  baseURL: "https://back-skjx.onrender.com/api/todos",
  headers: {
    "Content-type": "application/json"
  }
});
