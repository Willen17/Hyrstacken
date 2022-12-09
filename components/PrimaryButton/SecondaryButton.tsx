import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick?: () => void;
    small?: boolean;
    white?: boolean;
}

const SecondaryButton = (props: Props) => {
    return (
        <div className="PrimaryButton" onClick={props.onClick}>
            <button
                className={` ${props.small ? "py-2 px-4" : "py-4 px-8"} ${
                    props.white
                        ? "text-white border-white hover:text-softRed hover:border-softRed "
                        : " text-softRed border-softRed hover:bg-softRed"
                }   hover:text-white transition-[250ms] rounded-md border flex items-center gap-10 font-medium text-lg font-nunito`}
            >
                {props.children}
            </button>
        </div>
    );
};

export default SecondaryButton;
