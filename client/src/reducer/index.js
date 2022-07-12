const initialState = {
  dogs: [],
  dogsCopy: [],
  temperaments: [],
  dogsDetail: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_ALL_DOGS":
      return {
        ...state,
        dogs: payload,
        dogsCopy: payload,
      };
    case "SEARCH_DOG":
      return {
        ...state,
        dogs: payload,
      };
    case "GET_ALL_TEMPERAMENTS":
      return {
        ...state,
        temperaments: payload,
      };
    case "FILTER_TYPES":
      const all = state.dogsCopy;
      const { temperament } = payload;
      const cualquiera = all.filter((a) => {
        if (a.itsCreated) {
          return a;
        }
      });
      var arr = [];
      for (let i = 0; i < cualquiera.length; i++) {
        cualquiera[i].temperaments.map((a) => {
          if (a.name === temperament) {
            arr.push(cualquiera[i]);
          }
        });
      }
      const fil = all.forEach((d) => {
        if (d.temperaments.includes(temperament)) {
          arr.push(d);
        }
      });
      console.log(arr);
      return {
        ...state,
        dogs: arr,
      };
    case "FILTER_API_OR_DB":
      const dog = state.dogsCopy;
      const filter =
        payload === "created"
          ? dog.filter((a) => a.itsCreated === true)
          : dog.filter((b) => !b.itsCreated);
      console.log(filter);
      return {
        ...state,
        dogs: filter,
      };
    case "SORT_NAME":
      console.log(payload);
      const sort =
        payload === "A-Z"
          ? state.dogsCopy.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogsCopy.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sort,
      };
    case "SORT_WEIGHT":
      console.log(state.dogs);
      const sot =
        payload === "upward"
          ? state.dogsCopy.sort(function (a, b) {
              if (
                Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])
              ) {
                return 1;
              }
              if (
                Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])
              ) {
                return -1;
              }
              return 0;
            })
          : state.dogsCopy.sort(function (a, b) {
              if (
                Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])
              ) {
                return -1;
              }
              if (
                Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])
              ) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        dogs: sot,
      };
    case "GET_DETAILS":
      return {
        ...state,
        dogsDetail: payload,
      };
    case "RES_STATE":
      return {
        ...state,
        detail: [],
      };
    case "NOT_SEARCH":
      return {
        ...state,
        dogs: [],
      };
    default:
      return state;
  }
}
export default rootReducer;
