import '@servicenow/now-input';
import '@servicenow/now-radio-buttons';

export default ({ input, properties }) => {
  const { statesIncidentSet, radioBtnValue } = properties;

  let optionsArr = [];

  statesIncidentSet.forEach(i => optionsArr.push(i));
  const optionsResult = optionsArr.map(item => {
    let obj = {};
    obj.id = item;
    obj.label = item;

    if (obj.label === radioBtnValue) {
      obj.checked = true;
    }
    return obj;
  });

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
