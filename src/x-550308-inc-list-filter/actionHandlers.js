import { actionTypes } from '@servicenow/ui-core';
import {
  INCIDENT_FETCH_SUCCEEDED,
  FETCH_LATEST_INCIDENT_STARTED,
  DROPDOWN_PANEL_ITEM_CLICKED,
  nowCardActionsId,
  INCIDENT_CARD_OPENED,
  INCIDENT_DELETE_STARTED,
  INCIDENT_CARD_CLOSED,
  INCIDENT_DELETE_SUCCEEDED,
  MODAL_DISMISSED,
  INCIDENTS_FILTER_STARTED,
  INCIDENTS_FILTER_FAILED,
  FILTER_SUCCEEDED,
  INCIDENT_CARD_SELECTED,
} from './constants';
import { deleteIncident, getIncidents } from './httpEffects';
const { COMPONENT_BOOTSTRAPPED } = actionTypes;

export const actionHandlers = {
  [COMPONENT_BOOTSTRAPPED]: ({ dispatch }) =>
    dispatch(FETCH_LATEST_INCIDENT_STARTED),

  [FETCH_LATEST_INCIDENT_STARTED]: getIncidents,

  [FILTER_SUCCEEDED]: ({ dispatch, action, updateState }) => {
    const { input, radioBtnValue } = action.payload;

    updateState({
      input,
      radioBtnValue,
    });
    dispatch(INCIDENTS_FILTER_STARTED);
  },

  [INCIDENT_FETCH_SUCCEEDED]: ({ action, updateState, state, dispatch }) => {
    const { result } = action.payload;

    if (!state.getStatesIncidentSet) {
      const stateSet = new Set();
      stateSet.add('All');
      result.forEach(item => stateSet.add(item.state));
      updateState({ statesIncidentSet: stateSet });
    }
    updateState({ incidents: result, filtered: result });
    dispatch(INCIDENTS_FILTER_STARTED);
  },

  [DROPDOWN_PANEL_ITEM_CLICKED]: ({ action, state, dispatch, updateState }) => {
    const { incidents, clicked } = state;
    const { payload } = action;
    updateState({
      incidentItem: incidents.find(({ sys_id }) => sys_id === clicked),
    });
    payload.item.id === nowCardActionsId.open
      ? dispatch(INCIDENT_CARD_OPENED)
      : dispatch(INCIDENT_DELETE_STARTED, { sys_id: clicked });
  },

  [INCIDENT_CARD_SELECTED]: ({ dispatch, action, updateState, state }) => {
    const { incidents } = state;
    const { payload } = action;

    updateState({
      clicked: payload.sys_id,
      incidentItem: incidents.find(({ sys_id }) => sys_id === payload.sys_id),
    });
    if (action.meta.event.target !== action.meta.event.currentTarget) {
      return;
    }
    dispatch(INCIDENT_CARD_OPENED);
  },

  [INCIDENT_CARD_OPENED]: ({ updateState }) => {
    updateState({ modalOpen: true });
  },

  [MODAL_DISMISSED]: ({ dispatch }) => dispatch(INCIDENT_CARD_CLOSED),

  [INCIDENT_CARD_CLOSED]: ({ updateState }) =>
    updateState({ modalOpen: false }),

  [INCIDENT_DELETE_STARTED]: deleteIncident,

  [INCIDENT_DELETE_SUCCEEDED]: ({ dispatch }) =>
    dispatch(FETCH_LATEST_INCIDENT_STARTED),

  [INCIDENTS_FILTER_STARTED]: ({ state, updateState, dispatch }) => {
    const { input, radioBtnValue, incidents } = state;

    let filterResult = incidents.filter(
      ({ short_description, state: itemState }) => {
        if (radioBtnValue === 'All') {
          return short_description.toLowerCase().includes(input.toLowerCase());
        }

        if (itemState === radioBtnValue) {
          return short_description.toLowerCase().includes(input.toLowerCase());
        }
      },
    );

    if (filterResult.length === 0) {
      dispatch(INCIDENTS_FILTER_FAILED);
    }

    updateState({ filtered: filterResult });
  },

  [INCIDENTS_FILTER_FAILED]: ({ updateState }) => {
    updateState({ showList: false });
  },
};
