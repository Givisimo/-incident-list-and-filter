import {
  FILTER_STARTED,
  RADIO_BUTTON_SET,
  INPUT_FIELD_SET,
  FILTER_SUCCEEDED,
} from '../x-550308-inc-list-filter/constants';

export const actionHandlers = {
  [RADIO_BUTTON_SET]: ({ action, dispatch, updateProperties }) => {
    updateProperties({ radioBtnValue: action.payload.value });
    dispatch(FILTER_STARTED);
  },

  [INPUT_FIELD_SET]: ({ action, dispatch, updateProperties }) => {
    updateProperties({ input: action.payload.fieldValue });
    dispatch(FILTER_STARTED);
  },

  [FILTER_STARTED]: ({ dispatch, state }) => {
    const { input, radioBtnValue } = state.properties;
    dispatch(FILTER_SUCCEEDED, { input, radioBtnValue });
  },
};
