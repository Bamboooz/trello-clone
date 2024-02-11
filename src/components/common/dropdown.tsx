import React, { useState, useRef } from "react";

import { cn } from "../../utils/cn";
import { useOnClickOutside } from "../../utils/hooks/useOnClickOutside";

interface DropdownProps {
    trigger: React.ReactElement;
    content: React.ReactElement[];
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, content }) => {
    const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);
    const dropdownMenuRef = useRef<HTMLDivElement>(null);

    useOnClickOutside(dropdownMenuRef, () => setDropdownOpened(false));

    const handleDropdownContentClick = (index: number) => {
        content[index].props.onClick();
        setDropdownOpened(false);
    };

    return (
        <>
            <div ref={dropdownMenuRef} className="relative flex flex-col items-start justify-start">
                {React.cloneElement(trigger, { onClick: () => setDropdownOpened(!dropdownOpened), className: cn(trigger.props.className, "relative mb-2") })}
                {dropdownOpened ?
                    <div className="flex flex-col items-center justify-center absolute top-full z-50 shadow-2xl bg-slate-700 border-solid rounded-sm border-[1px] border-slate-600">
                        <p className="my-4 text-[16px] text-slate-200 font-semibold">List Actions</p>
                        {content.map((item, index) => {
                            if (item.type === "button") {
                                return React.cloneElement(item, { key: index, onClick: () => handleDropdownContentClick(index) });
                            } else {
                                return React.cloneElement(item, { key: index });
                            }
                        })}
                    </div>
                : null}
            </div>
        </>
    );
};

export { Dropdown };
