import React from "react";

import { IoIosAdd } from "react-icons/io";

import { NodeList } from "../../App";

interface NewNodeProps {
    setNodeList: React.Dispatch<React.SetStateAction<NodeList>>;
}

const NewNode: React.FC<NewNodeProps> = ({ setNodeList }) => {
    const addNewNode = () => {
        setNodeList((prevNodeList) => {
            const max = Object.keys(prevNodeList).length;
            return { ...prevNodeList, [max]: { name: "BOMBAKLAT", nodeItems: {} } };
        });
    };

    return (
        <>
            <button aria-label="new node button" onClick={addNewNode} className="flex items-center justify-start w-[300px] h-[60px] px-2 rounded-sm bg-slate-700 hover:bg-slate-600 border-solid border-[1px] border-slate-600 hover:border-slate-500">
                <IoIosAdd className="text-slate-200" size={26} />
                <p className="text-slate-200 text-[14px] font-semibold">New List</p>
            </button>
        </>
    );
};

export { NewNode };
