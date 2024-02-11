import React, { useState } from "react";

import { Button, Modal } from 'flowbite-react';

import { TbPencil } from "react-icons/tb";

import { NodeList } from "../../App";

interface NodeItemProps {
    nodeId: number;
    nodeItemId: number;
    nodeList: NodeList;
    setNodeList: React.Dispatch<React.SetStateAction<NodeList>>;
}

const NodeItem: React.FC<NodeItemProps> = ({ nodeId, nodeItemId, nodeList, setNodeList }) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalTextareaValue, setModalTextareaValue] = useState<string>(nodeList[nodeId].nodeItems[nodeItemId]);

    const name = nodeList[nodeId].nodeItems[nodeItemId];

    const handleModalTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setModalTextareaValue(event.target.value);
    };

    const handleModalClose = () => {
        setOpenModal(false);
        setModalTextareaValue(name);
    };

    const handleNodeTextChange = () => {
        setOpenModal(false);

        setNodeList((prevNodeList) => {
            const nds = prevNodeList;
            nds[nodeId].nodeItems[nodeItemId] = modalTextareaValue;
            return nds
        });
    };

    return (
        <>
            <div className="group flex items-center justify-between w-full h-[45px] my-2 pl-4 pr-2 bg-slate-800 rounded-sm border-solid border-[1px] border-x-[1px] border-slate-700 hover:border-slate-400">
                <p className="text-slate-200 text-[14px] select-none">{name}</p>

                <button onClick={() => setOpenModal(true)} className="hidden group-hover:block p-2 rounded-lg hover:bg-slate-700 hover:active:bg-slate-600">
                    <TbPencil className="text-slate-200" size={18} />
                </button>
                <Modal dismissible show={openModal} onClose={handleModalClose}>
      			    <Modal.Header className="bg-slate-800 border-slate-700">
				    	<p className="text-slate-200">Edit Card</p>
				    </Modal.Header>
      			    <Modal.Body className="bg-slate-800">
      			      	<textarea value={modalTextareaValue} onChange={handleModalTextareaChange} spellCheck={false} className="w-full h-[200px] bg-transparent text-slate-200 rounded-sm border-solid border-[1px] border-slate-700 !outline-none resize-none focus:border-cyan-700" />
      			    </Modal.Body>
      			    <Modal.Footer className="bg-slate-800 border-slate-700">
      			      	<Button onClick={handleNodeTextChange}>Submit</Button>
      			      	<Button className="bg-transparent hover:bg-slate-700" onClick={handleModalClose}>
			          		Cancel
      			      	</Button>
      			    </Modal.Footer>
      		    </Modal>
            </div>
            
        </>
    );
};

export { NodeItem };
