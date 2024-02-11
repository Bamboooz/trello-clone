import React, { useState } from "react";

import { Button, Modal } from 'flowbite-react';

import { IoIosAdd } from "react-icons/io";

import { NodeList } from "../../App";
import { customModalTheme, customCloseButtonTheme } from "../../themes/flowbite";

interface NewNodeProps {
    setNodeList: React.Dispatch<React.SetStateAction<NodeList>>;
    scrollToRight: () => void;
}

const NewNode: React.FC<NewNodeProps> = ({ setNodeList, scrollToRight }) => {
    const [nameModalOpened, setNameModalOpened] = useState(false);
    const [nameModalInputValue, setNameModalInputValue] = useState<string>("");

    const addNewNode = () => {
        if (nameModalInputValue.replaceAll(" ", "") !== "") {
            setNameModalOpened(false);

            setNodeList((prevNodeList) => {
                const max = Object.keys(prevNodeList).length;
                return { ...prevNodeList, [max]: { name: nameModalInputValue, nodeItems: {} } };
            });

            setNameModalInputValue(""); // revert to default for next new list

            scrollToRight();
        }
    };

    const handleNameModalClose = () => {
        setNameModalOpened(false);
        setNameModalInputValue("");
    };

    const handleNameModalInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNameModalInputValue(event.target.value);
    };

    return (
        <>
            <button aria-label="new node button" onClick={() => setNameModalOpened(true)} className="shrink-0 flex items-center justify-start w-[300px] h-[60px] px-2 rounded-sm bg-slate-700 hover:bg-slate-600 border-solid border-[1px] border-slate-600 hover:border-slate-500">
                <IoIosAdd className="text-slate-200" size={26} />
                <p className="text-slate-200 text-[14px] font-semibold">New List</p>
            </button>
            <Modal dismissible theme={customModalTheme} show={nameModalOpened} onClose={handleNameModalClose}>
      		    <Modal.Header className="bg-slate-800 border-slate-700">
			    	<p className="text-slate-200">New List</p>
			    </Modal.Header>
      		    <Modal.Body className="bg-slate-800">
                    <textarea value={nameModalInputValue} onChange={handleNameModalInputChange} spellCheck={false} className="p-4 w-full h-[200px] bg-transparent text-slate-200 rounded-sm border-solid border-[1px] border-slate-700 !outline-none resize-none focus:border-cyan-700" />
      		    </Modal.Body>
      		    <Modal.Footer className="bg-slate-800 border-slate-700">
      		      	<Button onClick={addNewNode} aria-label="submit new value button">Submit</Button>
      		      	<Button theme={customCloseButtonTheme} onClick={handleNameModalClose} aria-label="cancel new value button">
			      		Cancel
      		      	</Button>
      		    </Modal.Footer>
      		</Modal>
        </>
    );
};

export { NewNode };
