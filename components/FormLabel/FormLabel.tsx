type Props = {
    children: string;
    required?: boolean;
};

const FormLabel = ({ children, required }: Props) => {
    return (
        <label
            className={`label-text ${
                required && "after:content-['*'] after:text-error after:ml-1"
            }`}
        >
            {children}
        </label>
    );
};

export default FormLabel;
