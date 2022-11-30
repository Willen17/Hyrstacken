import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    styled?: boolean;
    onClick?: () => void;
}

const PrimaryButton = (props: Props) => {
    return (
        <div
            className={`PrimaryButton ${props.styled ? "w-[100%]" : ""}`}
            onClick={props.onClick}
        >
            <button
                className={`py-[1rem] px-[2rem] flex justify-between items-center hover:bg-hoverRed transition-[250ms] rounded-[8px] bg-softRed text-white gap-10 font-medium text-lg font-nunito ${
                    props.styled ? "w-[100%] lg:w-auto" : ""
                }`}
            >
                {props.children}
            </button>
        </div>
    );
};

export default PrimaryButton;
