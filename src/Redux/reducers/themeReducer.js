const initialState = {
  mode: 'dark'
}
const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LIGHT_MODE':
      return {
        mode: 'light'
      };
    case 'SET_DARK_MODE':
      return {
        mode: 'dark'
      };
    default:
      return state;
  }
};

export default themeReducer;