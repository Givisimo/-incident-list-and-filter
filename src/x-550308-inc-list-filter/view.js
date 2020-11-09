import '@servicenow/now-template-card';
import '../custom-modal';
import '../filter';

export default (
  {
    incidents,
    modalOpen,
    incidentItem,
    filtered,
    statesIncidentSet,
    input,
    radioBtnValue,
    showList,
  },
  { updateState },
) => {
  let resultArr = filtered.length > 0 ? filtered : incidents;

  return (
    <div>
      {modalOpen ? (
        <custom-modal
          modalOpen={modalOpen}
          incidentItem={incidentItem}
          input={input}
          radioBtnValue={radioBtnValue}
        />
      ) : null}

      {statesIncidentSet && (
        <filter-component
          statesIncidentSet={statesIncidentSet}
          input={input}
          radioBtnValue={radioBtnValue}
          showList={showList}
          filtered={filtered}
        />
      )}

      {showList ? (
        <ul className="container">
          {resultArr.map(item => {
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
                  on-click={() => updateState({ clicked: sys_id })}
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
