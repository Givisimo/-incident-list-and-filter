import '@servicenow/now-template-card';
import '../custom-modal';
import '../filter';
import { INCIDENT_CARD_SELECTED } from './constants';

export default (
  {
    incidents,
    modalOpen,
    incidentItem,
    filtered,
    statesIncidentSet,
    input,
    showList,
    radioBtnValue,
  },
  { dispatch, updateState },
) => {
  if (filtered.length > 0) {
    updateState({ showList: true });
  }

  return (
    <div>
      {modalOpen ? (
        <custom-modal
          modalOpen={modalOpen}
          incidentItem={incidentItem}
          input={input}
        />
      ) : null}

      {statesIncidentSet && (
        <filter-component
          statesIncidentSet={statesIncidentSet}
          input={input}
          showList={showList}
          filtered={filtered}
          incidents={incidents}
          radioBtnValue={radioBtnValue}
        />
      )}

      {showList ? (
        <ul className="container">
          {filtered.map(item => {
            const {
              sys_id,
              short_description,
              sys_updated_on: updated_on,
              state,
              assignment_group,
              assigned_to,
              number,
            } = item;

            const { display_value } = assignment_group;
            const { display_value: display_name } = assigned_to;

            return (
              <li className="list-item" key={sys_id}>
                <now-template-card-assist
                  tagline={{
                    icon: 'tree-view-long-outline',
                    label: 'Incident',
                  }}
                  actions={[
                    { id: 'open', label: 'Open Record' },
                    { id: 'delete', label: 'Delete' },
                  ]}
                  heading={{ label: short_description }}
                  content={[
                    {
                      label: 'Number',
                      value: { type: 'string', value: number },
                    },
                    { label: 'State', value: { type: 'string', value: state } },
                    {
                      label: 'Assignment Group',
                      value: {
                        type: 'string',
                        value: display_value,
                      },
                    },
                    {
                      label: 'Assigned To',
                      value: { type: 'string', value: display_name },
                    },
                  ]}
                  contentItemMinWidth="300"
                  footerContent={{ label: 'Updated', value: updated_on }}
                  configAria={{}}
                  on-click={() => dispatch(INCIDENT_CARD_SELECTED, { sys_id })}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="no-data">
          <p>Sorry, no data to display</p>
        </div>
      )}
    </div>
  );
};
