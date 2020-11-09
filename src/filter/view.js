import '@servicenow/now-input';
import '@servicenow/now-radio-buttons';

export default ({ input, properties }) => {
  const { statesIncidentSet } = properties;
  let optionsArr = [];
  statesIncidentSet.forEach(i => optionsArr.push(i));
  const optionsObjArr = optionsArr.map(item => {
    let obj = {};
    obj.id = item;
    obj.label = item;
    return obj;
  });
  let defaultOption = {
    id: 'All',
    label: 'All',
    checked: true,
  };
  let optionsResult = [defaultOption, ...optionsObjArr];

  return (
    <div className="input-container">
      <now-input label="Search by description" placeholder={input} />
      <now-radio-buttons
        label="Status of Incident"
        layout="horizontal"
        options={optionsResult}
      />
    </div>
  );
};
