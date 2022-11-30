import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const SecondaryButton = (props: Props) => {
    return (
        <div className="PrimaryButton">
            <button className="py-[1rem] px-[2rem] hover:bg-softRed hover:text-white transition-[250ms] rounded-[8px] border-[1px] border-softRed text-softRed flex items-center gap-10 font-medium text-lg font-nunito">
                {props.children}
            </button>
        </div>
    );
};

export default SecondaryButton;
