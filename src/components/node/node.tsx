import React, { useRef, useState } from "react";

import { Button, Modal } from 'flowbite-react';

import { TbPencil } from "react-icons/tb";
import { IoIosMore, IoIosAdd } from "react-icons/io";
import { IoAddOutline, IoTrashOutline, IoCopyOutline, IoArrowForwardOutline } from "react-icons/io5";

import { NodeItem } from "../node-item/node-item";
import { Dropdown } from "../common/dropdown";
import { NodeList } from "../../App";
import { customModalTheme, customCloseButtonTheme } from "../../themes/flowbite";
import { cn } from "../../utils/cn";

interface NodeProps {
    nodeId: number;
    nodeList: NodeList;
    setNodeList: React.Dispatch<React.SetStateAction<NodeList>>;
}

const Node: React.FC<NodeProps> = ({ nodeId, nodeList, setNodeList }) => {
    const [moveModalOpened, setMoveModalOpened] = useState(false);
    const [moveModalInputValue, setMoveModalInputValue] = useState<number>(nodeId);
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [editModalInputValue, setEditModalInputValue] = useState<string>(nodeList[nodeId].name);
    const nodeScrollRef = useRef<HTMLDivElement>(null);

    const nodeItemClassName = "flex items-center w-[300px] h-[60px] bg-slate-800 border-solid border-x-[1px] border-slate-700";

    const nodeItems = nodeList[nodeId].nodeItems;
    const name = nodeList[nodeId].name;

    const scrollToBottom = () => {
        if (nodeScrollRef.current) {
            const scrollHeight = nodeScrollRef.current.scrollHeight;
            nodeScrollRef.current.scrollTop = scrollHeight ?? 0;
        }
    };

    const editNode = () => {
        if (editModalInputValue.replaceAll(" ", "") !== "") {
            setEditModalOpened(false);

            setNodeList((prevNodeList) => {
                return { ...prevNodeList, [nodeId]: { name: editModalInputValue, nodeItems: nodeItems } };
            });
        }
    };

    const addNodeItem = () => {
        setNodeList((prevNodeList) => {
            const max = Object.keys(nodeItems).length;
            return {
                ...prevNodeList,
                [nodeId]: {
                    name: name,
                    nodeItems: {
                        ...nodeItems,
                        [max]: "BOMBAKLAT"
                    }
                }
            };
        });

        scrollToBottom();
    };

    const removeNode = () => {
        setNodeList((prevNodeList) => {
            const { [nodeId]: removedNode, ...tempNodeList } = prevNodeList;
    
            const updatedNodeList: NodeList = Object.keys(tempNodeList).reduce((acc, id) => {
                const nid = Number(id);
                const newId = nid > nodeId ? nid - 1 : nid;
                acc[newId] = tempNodeList[nid];
                return acc;
            }, {} as NodeList);
    
            return updatedNodeList;
        });
    };

    const copyNode = () => {
        setNodeList((prevNodeList) => {
            const newNodeList = { ...prevNodeList };
    
            for (let newNodeId in newNodeList) {
                const currentId = Number(newNodeId);
                if (currentId > nodeId) {
                    newNodeList[currentId + 1] = newNodeList[currentId];
                }
            }
    
            newNodeList[nodeId + 1] = newNodeList[nodeId];
            return newNodeList;
        });
    };

    const moveNode = () => {
        if (Object.keys(nodeList).length - 1 >= moveModalInputValue && moveModalInputValue >= 0) {
            setMoveModalOpened(false);

            setNodeList((prevNodeList) => {
                return { ...prevNodeList, [nodeId]: nodeList[moveModalInputValue], [moveModalInputValue]: nodeList[nodeId] };
            });
        }
    };

    const handleMoveModalClose = () => {
        setMoveModalOpened(false);
        setMoveModalInputValue(nodeId);
    };

    const handleMoveModalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMoveModalInputValue(Number(event.target.value));
    };

    const handleEditModalClose = () => {
        setEditModalOpened(false);
        setEditModalInputValue(name)
    };

    const handleEditModalInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditModalInputValue(event.target.value);
    };

	return (
		<>
            <div className="flex flex-col justify-center items-center">
                <div className={cn(nodeItemClassName, "rounded-t-sm pl-4 pr-2 justify-between border-t-[1px]")}>
			    	<p className="text-slate-200 text-[14px] font-semibold select-none">{name}</p>
                    <Dropdown trigger={
                        <button aria-label="More button" className="rounded-lg h-[38px] w-[38px] flex items-center justify-center hover:bg-slate-700 hover:active:bg-slate-600">
			    	        <IoIosMore className="text-slate-200" size={20} />
                        </button>
                    } content={[
                        <button aria-label="edit node button" onClick={() => setEditModalOpened(true)} className="w-[300px] h-[40px] bg-slate-700 hover:bg-slate-600 flex items-center justify-between pl-4 pr-2">
                            <p className="text-slate-200 text-[14px]">Edit List</p>
                            <TbPencil className="text-slate-200" size={20} />
                        </button>,
                        <button aria-label="new node item button" onClick={addNodeItem} className="w-[300px] h-[40px] bg-slate-700 hover:bg-slate-600 flex items-center justify-between pl-4 pr-2">
                            <p className="text-slate-200 text-[14px]">Add Card</p>
                            <IoAddOutline className="text-slate-200" size={20} />
                        </button>,
                        <button aria-label="copy node item button" onClick={copyNode} className="w-[300px] h-[40px] bg-slate-700 hover:bg-slate-600 flex items-center justify-between pl-4 pr-2">
                            <p className="text-slate-200 text-[14px]">Copy List</p>
                            <IoCopyOutline className="text-slate-200" size={20} />
                        </button>,
                        <button aria-label="move node item button" onClick={() => setMoveModalOpened(true)} className="w-[300px] h-[40px] bg-slate-700 hover:bg-slate-600 flex items-center justify-between pl-4 pr-2">
                            <p className="text-slate-200 text-[14px]">Move List</p>
                            <IoArrowForwardOutline className="text-slate-200" size={20} />
                        </button>,
                        <div className="w-full h-[1px] bg-slate-500 my-2" />,
                        <button aria-label="delete node item button" onClick={removeNode} className="w-[300px] h-[40px] bg-slate-700 hover:bg-slate-600 flex items-center justify-between pl-4 pr-2 mb-2">
                            <p className="text-red-500 text-[14px]">Delete List</p>
                            <IoTrashOutline className="text-red-500" size={20} />
                        </button>,
                    ]} />
                    <Modal dismissible size="sm" theme={customModalTheme} show={moveModalOpened} onClose={handleMoveModalClose}>
      			        <Modal.Header className="bg-slate-800 border-slate-700">
				        	<p className="text-slate-200">Move List</p>
				        </Modal.Header>
      			        <Modal.Body className="bg-slate-800">
      			          	<input value={moveModalInputValue} onChange={handleMoveModalInputChange} className="w-full rounded-sm bg-transparent text-slate-200 border-solid border-[1px] border-slate-700" min={0} max={Object.keys(nodeList).length - 1} type="number" />
      			        </Modal.Body>
      			        <Modal.Footer className="bg-slate-800 border-slate-700">
      			          	<Button onClick={moveNode} aria-label="submit new value button">Submit</Button>
      			          	<Button theme={customCloseButtonTheme} onClick={handleMoveModalClose} aria-label="cancel new value button">
			              		Cancel
      			          	</Button>
      			        </Modal.Footer>
      		        </Modal>
                    <Modal dismissible theme={customModalTheme} show={editModalOpened} onClose={handleEditModalClose}>
      			        <Modal.Header className="bg-slate-800 border-slate-700">
				        	<p className="text-slate-200">Edit List</p>
				        </Modal.Header>
      			        <Modal.Body className="bg-slate-800">
                            <textarea value={editModalInputValue} onChange={handleEditModalInputChange} spellCheck={false} className="p-4 w-full h-[200px] bg-transparent text-slate-200 rounded-sm border-solid border-[1px] border-slate-700 !outline-none resize-none focus:border-cyan-700" />
      			        </Modal.Body>
      			        <Modal.Footer className="bg-slate-800 border-slate-700">
      			          	<Button onClick={editNode} aria-label="submit new value button">Submit</Button>
      			          	<Button theme={customCloseButtonTheme} onClick={handleEditModalClose} aria-label="cancel new value button">
			              		Cancel
      			          	</Button>
      			        </Modal.Footer>
      		        </Modal>
			    </div>

                {Object.keys(nodeItems).length !== 0 ?
                    <div ref={nodeScrollRef} className="px-4 py-2 overflow-x-hidden overflow-y-auto max-h-[60vh] w-full bg-slate-800 border-solid border-x-[1px] border-slate-700">
                        {Object.keys(nodeItems).map((index) => {
                            const idx = Number(index);
                            return <NodeItem key={idx} nodeId={nodeId} nodeItemId={idx} nodeList={nodeList} setNodeList={setNodeList} />
                        })}
                    </div>
                : null}
                
                <div className={cn(nodeItemClassName, "rounded-b-sm justify-start p-3 border-y-[1px]")}>
                    <button aria-label="Add card button" onClick={addNodeItem} className="rounded-lg h-full w-full flex items-center justify-start hover:bg-slate-700 hover:active:bg-slate-600">
			    	    <IoIosAdd className="text-slate-200 pl-1" size={28} />
                        <p className="text-slate-200 text-[14px] font-semibold select-none ml-2">Add card</p>
                    </button>
                </div>
            </div>
		</>
	);
};

export { Node };
