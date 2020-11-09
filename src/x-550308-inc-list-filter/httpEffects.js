import { createHttpEffect } from '@servicenow/ui-effect-http';
import {
  INCIDENT_FETCH_SUCCESS,
  URL_DELETE_INCIDENT,
  URL_INCIDENT_TABLE,
  INCIDENT_DELETE_SUCCESS,
} from './constants';

export const getIncidents = createHttpEffect(URL_INCIDENT_TABLE, {
  method: 'GET',
  successActionType: INCIDENT_FETCH_SUCCESS,
});

export const deleteIncident = createHttpEffect(URL_DELETE_INCIDENT, {
  method: 'DELETE',
  pathParams: ['sys_id'],
  successActionType: INCIDENT_DELETE_SUCCESS,
});
