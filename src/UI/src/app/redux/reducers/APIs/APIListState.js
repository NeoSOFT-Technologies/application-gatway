const data = {
  list: null,
  count: 0,
};
const initialState = {
  list: data,
  loading: false,
};
const setAPIList = (state = initialState, action) => {
  switch (action.type) {
    case "getAPIs": {
      //return { list: [...state.list, action.payload.Data.Apis] };
      //return action.payload.Data.Apis;
      return {
        list: action.payload.Data.Apis,
        loading: false,
      };
    }
    case "API_LOADING": {
      console.log("loading");
      return {
        ...state.initialState,
        loading: true,
      };
    }
    default:
      return state;
  }
};
export default setAPIList;
