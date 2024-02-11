import React, { useState } from "react";

import { Button, Modal } from 'flowbite-react';

import { TbPencil } from "react-icons/tb";
import { IoTrashOutline, IoCopyOutline, IoArrowForwardOutline } from "react-icons/io5";

import { NodeList } from "../../App";
import { customModalTheme, customCloseButtonTheme } from "../../themes/flowbite";
import { ContextMenu } from "../common/context-menu";

interface NodeItemProps {
    nodeId: number;
    nodeItemId: number;
    nodeList: NodeList;
    setNodeList: React.Dispatch<React.SetStateAction<NodeList>>;
}

const initialConextMenu = {
    show: false,
    x: 0,
    y: 0,
};

const NodeItem: React.FC<NodeItemProps> = ({ nodeId, nodeItemId, nodeList, setNodeList }) => {
    const [editModalOpened, setEditModalOpened] = useState(false);
    const [editModalInputValue, setEditModalInputValue] = useState<string>(nodeList[nodeId].nodeItems[nodeItemId]);
    const [moveModalOpened, setMoveModalOpened] = useState(false);
    const [moveModalInputValue, setMoveModalInputValue] = useState<number>(nodeItemId);
    const [contextMenu, setContextMenu] = useState(initialConextMenu);

    const name = nodeList[nodeId].nodeItems[nodeItemId];
    const nodeItems = nodeList[nodeId].nodeItems;
    const nodeName = nodeList[nodeId].name;

    const editNodeItem = () => {
        if (editModalInputValue.replaceAll(" ", "") !== "") {
            setEditModalOpened(false);

            setNodeList((prevNodeList) => {
                return { ...prevNodeList, [nodeId]: { name: nodeName, nodeItems: { ...nodeItems, [nodeItemId]: editModalInputValue} } };
            });
        }
    };

    const copyNodeItem = () => {
        setNodeList((prevNodeList) => {
            const newNodeItemsList: { [index: number]: string } = {};

            for (let index in nodeItems) {
                const idx = Number(index);
                const adjustedIndex = idx > nodeItemId ? idx + 1 : idx;
                newNodeItemsList[adjustedIndex] = nodeItems[idx];
            }

            newNodeItemsList[nodeItemId + 1] = nodeItems[nodeItemId];
            return { ...prevNodeList, [nodeId]: { name: nodeName, nodeItems: newNodeItemsList } };
        });
    };

    const moveNodeItem = () => {
        if (Object.keys(nodeItems).length - 1 >= moveModalInputValue || moveModalInputValue >= 0) {
            setMoveModalOpened(false);

            setNodeList((prevNodeList) => {
                return { ...prevNodeList, [nodeId]: { name: nodeName, nodeItems: { ...nodeItems, [nodeItemId]: nodeItems[moveModalInputValue], [moveModalInputValue]: nodeItems[nodeItemId] } } }
            });
        }
    };

    const deleteNodeItem = () => {
        setNodeList((prevNodeList) => {
            const { [nodeItemId]: _, ...strippedNodeItems } = nodeItems;
            const updatedNodeItems: { [index: number]: string } = {};

            for (let index in strippedNodeItems) {
                const idx = Number(index);
                const adjustedIndex = idx > nodeItemId ? idx - 1 : idx;

                updatedNodeItems[adjustedIndex] = nodeItems[idx];
            }

            return { ...prevNodeList, [nodeId]: { name: nodeName, nodeItems: updatedNodeItems } };
        });
    };

    const handleEditModalInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditModalInputValue(event.target.value);
    };

    const handleEditModalClose = () => {
        setEditModalOpened(false);
        setEditModalInputValue(name);
    };

    const handleMoveModalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMoveModalInputValue(Number(event.target.value));
    };

    const handleMoveModalClose = () => {
        setMoveModalOpened(false);
        setMoveModalInputValue(nodeItemId);
    };

    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();

        const { pageX, pageY } = event;
        setContextMenu({ show: true, x: pageX, y: pageY });
    };

    const closeContextMenu = () => setContextMenu(initialConextMenu);

    return (
        <>
            <div onContextMenu={handleContextMenu} className="group flex items-center break-all justify-between w-[280px] min-h-[45px] my-1 pl-4 pr-2 bg-slate-800 rounded-sm border-solid border-[1px] border-x-[1px] border-slate-700 hover:border-slate-400">
                {contextMenu.show && <ContextMenu x={contextMenu.x} y={contextMenu.y} closeContextMenu={closeContextMenu} content={[
                    <p className="text-[16px] text-slate-200 font-semibold mb-4">Card Actions</p>,
                    <button onClick={() => setEditModalOpened(true)} className="w-[300px] h-[40px] bg-slate-700 hover:bg-slate-600 flex items-center justify-between pl-4 pr-2">
                        <p className="text-slate-200 text-[14px]">Edit Card</p>
                        <TbPencil className="text-slate-200" size={20} />
                    </button>,
                    <button onClick={copyNodeItem} className="w-[300px] h-[40px] bg-slate-700 hover:bg-slate-600 flex items-center justify-between pl-4 pr-2">
                        <p className="text-slate-200 text-[14px]">Copy Card</p>
                        <IoCopyOutline className="text-slate-200" size={20} />
                    </button>,
                    <button onClick={() => setMoveModalOpened(true)} className="w-[300px] h-[40px] bg-slate-700 hover:bg-slate-600 flex items-center justify-between pl-4 pr-2">
                        <p className="text-slate-200 text-[14px]">Move Card</p>
                        <IoArrowForwardOutline className="text-slate-200" size={20} />
                    </button>,
                    <div className="w-full h-[1px] bg-slate-500 my-2" />,
                    <button onClick={deleteNodeItem} className="w-[300px] h-[40px] bg-slate-700 hover:bg-slate-600 flex items-center justify-between pl-4 pr-2">
                        <p className="text-red-500 text-[14px]">Delete Card</p>
                        <IoTrashOutline className="text-red-500" size={20} />
                    </button>,
                ]} />}
                
                <p className="text-slate-200 text-[14px] my-2 select-none">{name}</p>

                <button aria-label="edit node item button" onClick={() => setEditModalOpened(true)} className="ml-2 hidden group-hover:block p-2 rounded-lg hover:bg-slate-700 hover:active:bg-slate-600">
                    <TbPencil className="text-slate-200" size={18} />
                </button>

                <Modal theme={customModalTheme} dismissible show={editModalOpened} onClose={handleEditModalClose}>
      			    <Modal.Header className="bg-slate-800 border-slate-700">
				    	<p className="text-slate-200">Edit Card</p>
				    </Modal.Header>
      			    <Modal.Body className="bg-slate-800">
      			      	<textarea value={editModalInputValue} onChange={handleEditModalInputChange} spellCheck={false} className="p-4 w-full h-[200px] bg-transparent text-slate-200 rounded-sm border-solid border-[1px] border-slate-700 !outline-none resize-none focus:border-cyan-700" />
      			    </Modal.Body>
      			    <Modal.Footer className="bg-slate-800 border-slate-700">
      			      	<Button aria-label="submit new value button" onClick={editNodeItem}>Submit</Button>
      			      	<Button aria-label="cancel new value button" theme={customCloseButtonTheme} onClick={handleEditModalClose}>
			          		Cancel
      			      	</Button>
      			    </Modal.Footer>
      		    </Modal>
                <Modal size="sm" theme={customModalTheme} dismissible show={moveModalOpened} onClose={handleMoveModalClose}>
      			    <Modal.Header className="bg-slate-800 border-slate-700">
				    	<p className="text-slate-200">Move Card</p>
				    </Modal.Header>
      			    <Modal.Body className="bg-slate-800">
                        <input value={moveModalInputValue} onChange={handleMoveModalInputChange} className="w-full rounded-sm bg-transparent text-slate-200 border-solid border-[1px] border-slate-700" min={0} max={Object.keys(nodeItems).length - 1} type="number" />
      			    </Modal.Body>
      			    <Modal.Footer className="bg-slate-800 border-slate-700">
      			      	<Button aria-label="submit new value button" onClick={moveNodeItem}>Submit</Button>
      			      	<Button aria-label="cancel new value button" theme={customCloseButtonTheme} onClick={handleMoveModalClose}>
			          		Cancel
      			      	</Button>
      			    </Modal.Footer>
      		    </Modal>
            </div>
        </>
    );
};

export { NodeItem };
