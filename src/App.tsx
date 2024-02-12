import React, { useState, useRef } from 'react';

import { FiMenu } from "react-icons/fi";

import { Node } from './components/node/node';
import { NewNode } from './components/new-node/new-node';

type NodeList = { [idx: number]: { name: string, nodeItems: { [idx: number]: string }}};

const App: React.FC = () => {
	const [nodeList, setNodeList] = useState<NodeList>({
		0: { name: "To-do", nodeItems: { 0: "0", 1: "1", 2: "2", 3: "3", 4: "4" } },
		1: { name: "Currently doing", nodeItems: {} },
		2: { name: "Done", nodeItems: {} },
	});
	const windowScrollRef = useRef<HTMLDivElement>(null);

	const scrollToRight = () => {
        if (windowScrollRef.current) {
            const scrollWidth = windowScrollRef.current.scrollWidth;
            windowScrollRef.current.scrollLeft = scrollWidth ?? 0;
        }
    };

	return (
		<>
			<div className="App flex flex-col justify-start items-start">
				<header className="flex items-center justify-between w-[100vw] sticky h-[60px] px-4 border-solid border-b-[1px] bg-slate-900 border-slate-700 shadow-2xl">
					<p className="text-[16px] text-slate-200 font-semibold ml-10">My Board</p>
					
					<button className="p-2 rounded-sm hover:bg-slate-800">
						<FiMenu className="text-slate-200" size={24} />
					</button>
				</header>

				<div ref={windowScrollRef} className="flex items-start justify-start p-10 gap-x-4 overflow-auto">
					{Object.keys(nodeList).map((index) => {
						const idx = Number(index);
						return <Node key={idx} nodeId={idx} nodeList={nodeList} setNodeList={setNodeList} />;
					})}

					<NewNode setNodeList={setNodeList} scrollToRight={scrollToRight} />
				</div>
			</div>
		</>
	);
};

export default App;
export type { NodeList };
