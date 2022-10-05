import axios from "axios";
import errorHandling from "./Response";

const request = async (method, url, data, isAuthenticated = false) => {
  try {
    // if (method == "POST" || method == "PUT" || method == "PATCH") {
    // }

    let headers;

    if (isAuthenticated) {
      headers = {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };
    }

    const res = await axios({
      method: method,
      url: `http://todo.sns.ge/api/v1${url}`,
      data: data,
      headers: headers,
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    });

    if (res.status >= 200 && res.status < 300) {
      return res.data;
    } else {
      throw res.data;
    }
  } catch (error) {
    if (error.locale != "") {
      throw errorHandling(error.locale);
    } else {
      throw error;
    }
  }
};

export default request;
