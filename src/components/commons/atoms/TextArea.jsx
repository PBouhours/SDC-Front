/* eslint-disable react/prop-types */
function TextArea({
  value,
  type,
  placeOrder,
  min,
  max,
  step,
  onChange,
  name,
  grey,
  small,
  verySmall
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeOrder}
      min={min}
      max={max}
      step={step}
      className={`rounded-xl h-8 mb-4 mt-4 text-center text-black ${
        small ? 'w-28' : verySmall ? 'w-16' : 'w-56'
      } ${grey ? 'bg-gray-300' : ''}`}
      onChange={onChange}
      value={value}
    />
  );
}

export default TextArea;
