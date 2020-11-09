import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import view from './view';
import { actionHandlers } from './actionHandlers';
import styles from './styles.scss';

createCustomElement('filter-component', {
  renderer: { type: snabbdom },
  view,
  styles,
  actionHandlers: actionHandlers,
  properties: {
    statesIncidentSet: { default: '' },
    input: { default: ' ' },
    radioBtnValue: { default: 'All' },
    showList: { default: true },
    filtered: { default: [] },
  },
});
