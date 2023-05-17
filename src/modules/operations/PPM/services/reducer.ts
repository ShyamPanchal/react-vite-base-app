import { PPMActions } from "./actions";

export type PPMState = {};

const initialState: PPMState = {};

const ppmReducer = (
  state: PPMState = initialState,
  action: PPMActions
): PPMState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ppmReducer;
