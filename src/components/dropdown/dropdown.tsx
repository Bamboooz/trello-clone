import React, { useState, useRef, useEffect } from "react";

import { cn } from "../../lib/utils";

interface DropdownProps {
    trigger: React.ReactElement;
    content: React.ReactElement[];
    onSelect: (index: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, content }) => {
    const [dropdownOpened, setDropdownOpened] = useState<boolean>(false);
    const dropdownClickRef = useRef<HTMLDivElement>(null);

    const handleDropdownContentClick = (index: number) => {
        setDropdownOpened(false);
    };

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (dropdownClickRef.current && !dropdownClickRef.current.contains(event.target)) {
                setDropdownOpened(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownClickRef]);

    return (
        <>
            <div ref={dropdownClickRef} className="relative flex flex-col items-start justify-start">
                {React.cloneElement(trigger, { onClick: () => setDropdownOpened(!dropdownOpened), className: cn(trigger.props.className, "relative mb-2") })}
                <div className="flex flex-col items-center justify-center absolute top-full z-50">
                    {dropdownOpened ?
                        content.map((item, index) => {
                            return React.cloneElement(item, { key: index, onClick: () => handleDropdownContentClick(index) });
                        })
                    : null}
                </div>
            </div>
        </>
    );
};

export { Dropdown };
