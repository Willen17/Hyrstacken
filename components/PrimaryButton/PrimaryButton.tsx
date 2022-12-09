import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    styled?: boolean;
    onClick?: () => void;
    small?: boolean;
}

const PrimaryButton = (props: Props) => {
    return (
        <div
            className={`PrimaryButton ${props.styled && "w-full"}`}
            onClick={props.onClick}
        >
            <button
                className={`${
                    props.small
                        ? "py-2 px-4 border-softRed border hover:border-hoverRed"
                        : "py-4 px-8"
                } flex justify-between items-center hover:bg-hoverRed transition-[250ms] rounded-md bg-softRed text-white gap-3 font-medium text-lg font-nunito ${
                    props.styled ? "w-full lg:w-auto" : ""
                }`}
            >
                {props.children}
            </button>
        </div>
    );
};

export default PrimaryButton;
