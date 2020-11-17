import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import view from './view';
import { actionHandlers } from './actionHandlers';
import styles from './styles.scss';

createCustomElement('custom-modal', {
  renderer: { type: snabbdom },
  view,
  styles,
  actionHandlers: actionHandlers,
  properties: {
    modalOpen: { default: false },
    incidentItem: { default: '' },
    input: { default: '' },
  },
});
