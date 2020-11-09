import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';
import { actionHandlers } from './actionHandlers';

createCustomElement('x-550308-inc-list-filter', {
  renderer: { type: snabbdom },
  view,
  styles,
  initialState: {
    incidents: [],
    clicked: '',
    filtered: [],
    incidentItem: '',
    modalOpen: false,
    statesIncidentSet: '',
    input: ' ',
    radioBtnValue: 'All',
    showList: true,
  },
  actionHandlers: actionHandlers,
});
