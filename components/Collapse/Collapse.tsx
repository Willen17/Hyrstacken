import { PropsWithChildren, ReactNode, useState } from "react";
import Chevron from "/public/assets/chevron.svg";

type Props = {
    title: string;
    children: ReactNode;
    length: number;
    disabled: boolean;
};

const Collapse = ({ children, title, length, disabled }: Props) => {
    const [open, toggleOpen] = useState(false);
    return (
        <div className="flex flex-col items-center justify-between px-2 pb-5 mt-10 ">
            <div
                onClick={() => !disabled && toggleOpen(!open)}
                className={`flex items-center w-full pr-2 text-xl font-medium ${
                    !disabled && "cursor-pointer"
                }`}
            >
                <p className="mr-2 font-bold whitespace-nowrap">
                    {title}
                    <span>({length})</span>
                </p>
                <div className="bg-[#26324540]  flex-1 h-px" />
                {!disabled && (
                    <Chevron
                        className={`self-center  ${
                            open ? "-rotate-90" : "rotate-90"
                        } ml-3  fill-veryDarkBlue `}
                    />
                )}
            </div>

            {open && <>{children}</>}
        </div>
    );
};

export default Collapse;
