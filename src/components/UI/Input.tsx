interface InputProps {
	value: string;
	onChange: (value: string) => void;
	name: string;
	type: string;
	label: string;
}

const Input = ({ value, onChange, type, name, label }: InputProps) => {
	return (
		<p className="flex flex-col mb-3">
			<label htmlFor={name} className="mb-2">{label}</label>
			<input
				type={type}
				id={name}
				name={name}
				onChange={event => onChange(event.target.value)}
				value={value}
        className="w-[100%] block border-none h-[30px] outline-none pl-3 pb-1 mx-auto"
			/>
		</p>
	);
};

export default Input;
