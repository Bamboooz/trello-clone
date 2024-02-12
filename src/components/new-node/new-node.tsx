import React, { useState } from "react";

import { IoIosAdd } from "react-icons/io";

import { NodeList } from "../../App";
import { NewItem } from "../new-item/new-item";

interface NewNodeProps {
    setNodeList: React.Dispatch<React.SetStateAction<NodeList>>;
    scrollToRight: () => void;
}

const NewNode: React.FC<NewNodeProps> = ({ setNodeList, scrollToRight }) => {
    const [nameEditorOpened, setNameEditorOpened] = useState(false);
    const [nameEditorInputValue, setNameEditorInputValue] = useState<string>("");

    const addNewNode = () => {
        if (nameEditorInputValue.replaceAll(" ", "") !== "") {
            setNameEditorOpened(false);

            setNodeList((prevNodeList) => {
                const max = Object.keys(prevNodeList).length;
                return { ...prevNodeList, [max]: { name: nameEditorInputValue, nodeItems: {} } };
            });

            setNameEditorInputValue(""); // revert to default for next new list

            scrollToRight();
        }
    };

    return (
        <>
            {!nameEditorOpened ?
                <button aria-label="new node button" onClick={() => setNameEditorOpened(true)} className="shrink-0 flex items-center justify-start w-[300px] h-[60px] px-2 rounded-sm bg-slate-700 hover:bg-slate-600 border-solid border-[1px] border-slate-600 hover:border-slate-500">
                    <IoIosAdd className="text-slate-200" size={26} />
                    <p className="text-slate-200 text-[14px] font-semibold">New List</p>
                </button>
            :
                <div className="w-[300px] rounded-sm p-3 border-solid border-[1px] shrink-0 bg-slate-800 border-slate-700">
                    <NewItem
                        placeholder="Enter title for this list..."
                        setNameEditorOpened={setNameEditorOpened}
                        setNameEditorInputValue={setNameEditorInputValue}
                        submitFunction={addNewNode}
                    />
                </div>
            }
        </>
    );
};

export { NewNode };
