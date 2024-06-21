import {
  PUZZLE_QUIZ_PLATEONE,
  PUZZLE_QUIZ_PLATETWO,
  PUZZLE_QUIZ_PLATETHREE,
  PUZZLE_QUIZ_PLATEFOUR,
  PUZZLE_QUIZ_PLATEFIVE,
} from "./constants";

const initialState = {
  plateOne: null,
  plateTwo: null,
  plateThree: null,
  plateFour: null,
  plateFive: null,
};
function userReducer(state = initialState, action) {
  switch (action.type) {
    case PUZZLE_QUIZ_PLATEONE:
      return {
        ...state,
        plateOne: action.payload,
      };
    case PUZZLE_QUIZ_PLATETWO:
      return {
        ...state,
        plateTwo: action.payload,
      };

    case PUZZLE_QUIZ_PLATETHREE:
      return {
        ...state,
        plateThree: action.payload,
      };
    case PUZZLE_QUIZ_PLATEFOUR:
      return {
        ...state,
        plateFour: action.payload,
      };
    case PUZZLE_QUIZ_PLATEFIVE:
      return {
        ...state,
        plateFive: action.payload,
      };

    default:
      return state;
  }
}

export default userReducer;
