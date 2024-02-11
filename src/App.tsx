import React, { useState, useRef, useEffect, MouseEvent } from 'react';

import { Node } from './components/node/node';
import { NewNode } from './components/new-node/new-node';

type NodeItems = { [idx: number]: string };
type NodeListItem = { name: string; nodeItems: NodeItems };
type NodeList = { [idx: number]: NodeListItem };

const App: React.FC = () => {
    const [nodeList, setNodeList] = useState<NodeList>({
        0: { name: "To-do", nodeItems: { 0: "0", 1: "1", 2: "2", 3: "3", 4: "4" } },
        1: { name: "Currently doing", nodeItems: {} },
        2: { name: "Done", nodeItems: {} },
    });

    const windowScrollRef = useRef<HTMLDivElement>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const mouseCoords = useRef({
        startX: 0,
        scrollLeft: 0,
    });

    const handleDragStart = (e: MouseEvent) => {
        if (!windowScrollRef.current) return;
        const slider = windowScrollRef.current.children[0] as HTMLDivElement;
        const startX = e.pageX - slider.offsetLeft;
        const scrollLeft = slider.scrollLeft;
        mouseCoords.current = { startX, scrollLeft };
        setIsMouseDown(true);
        document.body.style.cursor = "grabbing";
    };

    const handleDragEnd = () => {
        setIsMouseDown(false);
        if (!windowScrollRef.current) return;
        document.body.style.cursor = "default";
    };

    const handleDrag = (e: MouseEvent) => {
        if (!isMouseDown || !windowScrollRef.current) return;
        e.preventDefault();
        const slider = windowScrollRef.current.children[0] as HTMLDivElement;
        const x = e.pageX - slider.offsetLeft;
        const walkX = (x - mouseCoords.current.startX) * 1.5;
        slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    };

    const scrollToRight = () => {
        if (windowScrollRef.current) {
            const scrollWidth = windowScrollRef.current.scrollWidth;
            windowScrollRef.current.scrollLeft = scrollWidth ?? 0;
        }
    };

    return (
        <div
            ref={windowScrollRef}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseMove={handleDrag}
            className="App p-10 flex justify-start items-start gap-x-4"
        >
            {Object.keys(nodeList).map((index) => {
                const idx = Number(index);
                return <Node key={idx} nodeId={idx} nodeList={nodeList} setNodeList={setNodeList} />;
            })}

            <NewNode setNodeList={setNodeList} scrollToRight={scrollToRight} />
        </div>
    );
};

export default App;
export type { NodeList };
