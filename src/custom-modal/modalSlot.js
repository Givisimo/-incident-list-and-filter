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
    <div className="modal-container">
      {fieldsArr.map(({ name, value }) => {
        return (
          <div className="modal-item">
            <div className="modal-item-upper">{name}</div>
            <div className="modal-item-lower">{value}</div>
          </div>
        );
      })}
    </div>
  );
};
