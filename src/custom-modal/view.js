import '@servicenow/now-modal';
import { MODAL_DELETE_BUTTON_CLICKED } from '../x-550308-inc-list-filter/constants';
import modalSlot from './modalSlot';

export default ({ properties }) => {
  const { modalOpen, incidentItem } = properties;
  return (
    <now-modal
      opened={modalOpen}
      size="lg"
      defaultSlot={true}
      footer-actions={[
        {
          variant: 'primary-negative',
          label: 'Delete',
          clickActionType: MODAL_DELETE_BUTTON_CLICKED,
        },
      ]}
    >
      <slot name="defaultSlot">{modalSlot(incidentItem)}</slot>
    </now-modal>
  );
};
