import {
  INCIDENT_CARD_CLOSED,
  INCIDENT_DELETE_STARTED,
  MODAL_DELETE_BUTTON_CLICKED,
} from '../x-550308-inc-list-filter/constants';

export const actionHandlers = {
  [MODAL_DELETE_BUTTON_CLICKED]: ({ dispatch, state }) => {
    const { sys_id } = state.properties.incidentItem;
    dispatch(INCIDENT_DELETE_STARTED, { sys_id });
    dispatch(INCIDENT_CARD_CLOSED);
  },
};
