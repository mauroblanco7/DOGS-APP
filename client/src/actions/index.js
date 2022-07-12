import axios from "axios";

export function getDogs() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/dogs")
      .then((res) => {
        return dispatch({
          type: "GET_ALL_DOGS",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
}
export function searchDog(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/dogs?name=${name}`);
      return dispatch({ type: "SEARCH_DOG", payload: json.data });
    } catch (error) {
      return dispatch({ type: "NOT_SEARCH" });
    }
  };
}
export function postDog(payload) {
  return async function (dispatch) {
    try {
      const postdog = await axios.post("http://localhost:3001/create", payload);
      console.log("acca", postDog);
      return postdog;
    } catch (error) {
      console.log(error);
    }
  };
}
export function getDetail(id) {
  return function (dispatch) {
    axios
      .get(`/${id}`)
      .then((res) => {
        console.log(res.data);
        return dispatch({
          type: "GET_DETAILS",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
}

export function filterTypes(payload) {
  return { type: "FILTER_TYPES", payload };
}
export function getTemperaments() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/temperaments")
      .then((res) => {
        return dispatch({
          type: "GET_ALL_TEMPERAMENTS",
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
}
export function filterApiOrDb(payload) {
  return { type: "FILTER_API_OR_DB", payload };
}
export function sortName(payload) {
  return { type: "SORT_NAME", payload };
}
export function sortWeight(payload) {
  return { type: "SORT_WEIGHT", payload };
}
export function resState() {
  return {
    type: "RES_STATE",
  };
}
