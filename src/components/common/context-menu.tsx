import React, { useRef } from "react";

import { useOnClickOutside } from "../../utils/hooks/useOnClickOutside";

interface ContextMenuProps {
    x: number;
    y: number;
    closeContextMenu: () => void;
    content: React.ReactElement[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, closeContextMenu, content }) => {
    const contextMenuRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(contextMenuRef, closeContextMenu);

    const handleContextMenuContentClick = (index: number) => {
        content[index].props.onClick();
        closeContextMenu();
    };

    return (
        <>
            <div ref={contextMenuRef} className="flex flex-col items-center justify-center absolute z-50 pt-4 pb-2 bg-slate-700 rounded-sm border-solid border-[1px] border-slate-600 shadow-2xl" style={{ top: `${y}px`, left: `${x}px` }}>
                {content.map((item, index) => {
                    if (item.type === "button") {
                        return React.cloneElement(item, { key: index, onClick: () => handleContextMenuContentClick(index) });
                    } else {
                        return React.cloneElement(item, { key: index });
                    }
                })}
            </div>
        </>
    );
};

export { ContextMenu };
