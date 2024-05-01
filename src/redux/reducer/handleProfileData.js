const initialState = {
    profileData: null,
  };
  
  const profileReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PROFILE_DATA':
        return {
          ...state,
          profileData: action.payload,
        };
      default:
        return state;
    }
  };

  export default profileReducer;