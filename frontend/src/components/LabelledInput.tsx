interface ILabelledInput {
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  htmlFor?: string;
}

export default function LabelledInput({
  name,
  type,
  value,
  onChange,
  placeholder,
  htmlFor = "",
  label,
}: ILabelledInput): React.ReactElement {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm  text-black font-semibold dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        id={htmlFor}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
