/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
function Button({ type, color, onClick, small, verySmall, user }) {
  return (
    <div>
      <button
        className={`${color === 'green' ? 'bg-green-600' : ''} ${
          color === 'red' ? 'bg-red-600' : ''
        } ${
          small ? 'w-28' : verySmall ? 'w-16' : user ? 'w-20' : 'w-44'
        }  h-8 rounded-2xl text-white mt-4`}
        onClick={onClick}>
        {type}
      </button>
    </div>
  );
}

export default Button;
