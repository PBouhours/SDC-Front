/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/prop-types */
function Select({ value, title, tab, name, onChange }) {
  return (
    <div className="mt-8">
      <form>
        <label className="text-white">{title} </label>
        <select
          name={title}
          id={title}
          className="rounded-xl w-24 h-8 mt-2 text-black"
          value={value}
          name={name}
          onChange={onChange}>
          {tab.map((el) => (
            <option value={el} key={el}>
              {el}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default Select;
