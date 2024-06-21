
function Input(props) {
    return (
      <div>
        <label className="block text-sm text-black font-bold mb-4 mt-2">
          {props.Label}
        </label>
        <input
          id={props.id}
          name={props.name}
          type={props.Type}
          value={props.Value}
          onChange={props.onChange}
          placeholder={props.Placeholder}
         className={`mt-1 block w-[250px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${props.ClassName}`}
        />
      </div>
    );
  }
  
  export default Input;