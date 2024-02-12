import React, { useRef } from "react";

import { IoMdClose } from "react-icons/io";

import { useOnClickOutside } from "../../utils/hooks/useOnClickOutside";

interface NewItemProps {
    placeholder: string;
    setNameEditorOpened: React.Dispatch<React.SetStateAction<boolean>>;
    setNameEditorInputValue: React.Dispatch<React.SetStateAction<string>>;
    submitFunction: () => void;
}

const NewItem: React.FC<NewItemProps> = ({ placeholder, setNameEditorOpened, setNameEditorInputValue, submitFunction}) => {
    const newItemRef = useRef<HTMLDivElement>(null);

    const handleNewItemClose = () => {
        setNameEditorOpened(false);
        setNameEditorInputValue("");
    };

    const handleNewItemNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNameEditorInputValue(event.target.value);
    };

    useOnClickOutside(newItemRef, handleNewItemClose);

    return (
        <>
            <div ref={newItemRef} className="w-full flex flex-col items-center justify-center shrink-0 bg-slate-800">
                <input onChange={handleNewItemNameChange} type="text" placeholder={placeholder} spellCheck={false} className="rounded-sm text-[14px] w-full h-[45px] min-h-[45px] max-h-[160px] overflow-y-auto resize-none text-slate-200 bg-slate-800 outline-none border-solid border-[1px] border-slate-700 focus:border-cyan-700" />

                <div className="flex items-center justify-start w-full mt-2">
                    <button onClick={submitFunction} className="p-2 w-[80px] rounded-sm bg-cyan-700 hover:bg-cyan-600 hover:active:bg-cyan-500">
                        <p className="text-slate-200 text-[14px] font-semibold">Add card</p>
                    </button>
                    <button onClick={handleNewItemClose} className="ml-1 p-2 rounded-sm hover:bg-slate-700 hover:active:bg-slate-600">
                        <IoMdClose className="text-slate-200" size={22} />
                    </button>
                </div>
            </div>
        </>
    );
};

export { NewItem };
