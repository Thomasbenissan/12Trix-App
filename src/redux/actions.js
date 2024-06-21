import {
  PUZZLE_QUIZ_PLATEONE,
  PUZZLE_QUIZ_PLATETWO,
  PUZZLE_QUIZ_PLATETHREE,
  PUZZLE_QUIZ_PLATEFOUR,
  PUZZLE_QUIZ_PLATEFIVE,
} from "./constants";

export const PlateOneAction = (isPlateOne) => (dispatch) => {
  dispatch({
    type: PUZZLE_QUIZ_PLATEONE,
    payload: isPlateOne,
  });
};

export const PlateTwoAction = (isPlateTwo) => (dispatch) => {
  dispatch({
    type: PUZZLE_QUIZ_PLATETWO,
    payload: isPlateTwo,
  });
};

export const PlateThreeAction = (isPlateThree) => (dispatch) => {
  dispatch({
    type: PUZZLE_QUIZ_PLATETHREE,
    payload: isPlateThree,
  });
};

export const PlateFourAction = (isPlateFour) => (dispatch) => {
  dispatch({
    type: PUZZLE_QUIZ_PLATEFOUR,
    payload: isPlateFour,
  });
};

export const PlateFiveAction = (isPlateFive) => (dispatch) => {
  dispatch({
    type: PUZZLE_QUIZ_PLATEFIVE,
    payload: isPlateFive,
  });
};
