export default ({
  short_description,
  opened_at,
  state,
  assignment_group,
  assigned_to,
  number,
}) => {
  const { display_value } = assignment_group;
  const { display_value: display_name } = assigned_to;

  const fieldsArr = [
    {
      name: 'Number',
      value: number,
    },
    {
      name: 'State',
      value: state,
    },
    {
      name: 'Opened',
      value: opened_at,
    },
    {
      name: 'Short Description',
      value: short_description,
    },
    {
      name: 'Assignment group',
      value: display_value,
    },
    {
      name: 'Assigned to',
      value: display_name,
    },
  ];

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      }}
    >
      {fieldsArr.map(({ name, value }) => {
        return (
          <div
            style={{
              flexBasis: ' 48%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                color: 'grey',
                marginBottom: '10px',
                fontSize: '0.75rem',
              }}
            >
              {name}
            </div>

            <div style={{ borderBottom: '1px solid black' }}>{value}</div>
          </div>
        );
      })}
    </div>
  );
};
