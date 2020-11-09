import {
  FILTER_INCIDENTS,
  FILTER_START,
  RADIO_BUTTON_SET,
  INPUT_FIELD_SET,
} from '../x-550308-inc-list-filter/constants';

export const actionHandlers = {
  [RADIO_BUTTON_SET]: ({ action, dispatch, updateProperties }) => {
    updateProperties({ radioBtnValue: action.payload.value });
    dispatch(FILTER_START);
  },

  [INPUT_FIELD_SET]: ({ action, dispatch, updateProperties }) => {
    updateProperties({ input: action.payload.fieldValue });
    dispatch(FILTER_START);
  },

  [FILTER_START]: ({ dispatch, properties, updateProperties }) => {
    const { input, radioBtnValue, filtered } = properties;
    if (filtered.length > 0) {
      updateProperties({ showList: true });
    }

    dispatch(FILTER_INCIDENTS, { input, radioBtnValue });
  },
};
