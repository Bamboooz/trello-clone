import React, { useState } from "react";

import { IoIosMore, IoIosAdd } from "react-icons/io";

import { NodeItem } from "../node-item/node-item";
import { Dropdown } from "../dropdown/dropdown";
import { NodeList } from "../../App";
import { cn } from "../../lib/utils";

interface NodeProps {
    nodeId: number;
    nodeList: NodeList;
    setNodeList: React.Dispatch<React.SetStateAction<NodeList>>;
}

const Node: React.FC<NodeProps> = ({ nodeId, nodeList, setNodeList }) => {
    const nodeItemClassName = "flex items-center w-[300px] h-[60px] bg-slate-800 border-solid border-x-[1px] border-slate-700";

    const nodes = nodeList[nodeId].nodeItems;
    const name = nodeList[nodeId].name;

    const addNodeItem = () => {
        setNodeList((prevNodeList) => {
            const max = Object.keys(prevNodeList).length;
            return {
                ...prevNodeList,
                [nodeId]: {
                    name: prevNodeList[nodeId].name,
                    nodeItems: {
                        ...prevNodeList[nodeId].nodeItems,
                        [max]: "BOMBAKLAT"
                    }
                }
            };
        });
    };

	return (
		<>
            <div className="flex flex-col justify-center items-center">
                <div className={cn(nodeItemClassName, "rounded-t-sm pl-4 pr-2 justify-between border-t-[1px]")}>
			    	<p className="text-slate-200 text-[14px] font-semibold select-none">{name}</p>
                    <Dropdown onSelect={(index: number) => {}} trigger={
                        <button className="rounded-lg h-[38px] w-[38px] flex items-center justify-center hover:bg-slate-700 hover:active:bg-slate-600">
			    	        <IoIosMore className="text-slate-200" size={20} />
                        </button>
                    } content={[
                        <button className="w-[300px] h-[60px] bg-slate-700 border-solid border-x-[1px] border-t-[1px] border-slate-600 rounded-t-sm">

                        </button>,
                        <button className="w-[300px] h-[60px] bg-slate-700 border-solid border-x-[1px] border-slate-600 rounded-t-sm">

                        </button>,
                        <button className="w-[300px] h-[60px] bg-slate-700 border-solid border-x-[1px] border-b-[1px] border-slate-600 rounded-t-sm">

                        </button>,
                    ]} />
			    </div>
                {Object.keys(nodeList).length !== 0 ?
                    <div className="px-4 py-2 overflow-x-hidden overflow-y-auto max-h-[60vh] w-full bg-slate-800 border-solid border-x-[1px] border-slate-700">
                        {Object.keys(nodes).map((index) => {
                            const idx = Number(index);
                            return <NodeItem key={idx} nodeId={nodeId} nodeItemId={idx} nodeList={nodeList} setNodeList={setNodeList} />
                        })}
                    </div>
                : null}
                <div className={cn(nodeItemClassName, "rounded-b-sm justify-start p-3 border-y-[1px]")}>
                    <button onClick={addNodeItem} className="rounded-lg h-full w-full flex items-center justify-start hover:bg-slate-700 hover:active:bg-slate-600">
			    	    <IoIosAdd className="text-slate-200 pl-1" size={28} />
                        <p className="text-slate-200 text-[14px] font-semibold select-none ml-2">Add card</p>
                    </button>
                </div>
            </div>
		</>
	);
};

export { Node };
