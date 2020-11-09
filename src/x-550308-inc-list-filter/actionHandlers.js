import { actionTypes } from '@servicenow/ui-core';
import {
  INCIDENT_FETCH_SUCCESS,
  FETCH_LATEST_INCIDENT,
  DROPDOWN_PANEL_ITEM_CLICKED,
  nowCardActionsId,
  OPEN_INCIDENT_CARD,
  DELETE_INCIDENT,
  CLOSE_INCIDENT_CARD,
  INCIDENT_DELETE_SUCCESS,
  MODAL_DISMISSED,
  FILTER_INCIDENTS,
  FILTER_NO_DATA,
} from './constants';
import { deleteIncident, getIncidents } from './httpEffects';
const { COMPONENT_BOOTSTRAPPED } = actionTypes;

export const actionHandlers = {
  [COMPONENT_BOOTSTRAPPED]: ({ dispatch }) => dispatch(FETCH_LATEST_INCIDENT),

  [FETCH_LATEST_INCIDENT]: getIncidents,

  [INCIDENT_FETCH_SUCCESS]: ({ action, updateState, state }) => {
    const { result } = action.payload;

    if (!state.getStatesIncidentSet) {
      const stateSet = new Set();
      result.forEach(item => stateSet.add(item.state));
      updateState({ statesIncidentSet: stateSet });
    }
    updateState({ incidents: result });
  },

  [DROPDOWN_PANEL_ITEM_CLICKED]: ({ action, state, dispatch, updateState }) => {
    const { incidents, clicked } = state;
    const { payload } = action;
    updateState({
      incidentItem: incidents.find(({ sys_id }) => sys_id === clicked),
    });
    payload.item.id === nowCardActionsId.open
      ? dispatch(OPEN_INCIDENT_CARD)
      : dispatch(DELETE_INCIDENT, { sys_id: clicked });
  },

  [OPEN_INCIDENT_CARD]: ({ updateState }) => updateState({ modalOpen: true }),

  [MODAL_DISMISSED]: ({ dispatch }) => dispatch(CLOSE_INCIDENT_CARD),

  [CLOSE_INCIDENT_CARD]: ({ updateState }) => updateState({ modalOpen: false }),

  [DELETE_INCIDENT]: deleteIncident,

  [INCIDENT_DELETE_SUCCESS]: ({ dispatch }) => dispatch(FETCH_LATEST_INCIDENT),

  [FILTER_INCIDENTS]: ({ state, action, updateState, dispatch }) => {
    const { input, radioBtnValue } = action.payload;

    let filterResult = state.incidents.filter(item => {
      if (radioBtnValue === 'All') {
        return item.short_description
          .toLowerCase()
          .includes(input.toLowerCase());
      }

      if (item.state === radioBtnValue) {
        return item.short_description
          .toLowerCase()
          .includes(input.toLowerCase());
      }
    });

    if (filterResult.length === 0) {
      dispatch(FILTER_NO_DATA);
    }

    updateState({ filtered: filterResult });
  },

  [FILTER_NO_DATA]: ({ updateState }) => updateState({ showList: false }),
};
