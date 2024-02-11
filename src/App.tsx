import React, { useState } from 'react';

import { Node } from './components/node/node';
import { NewNode } from './components/new-node/new-node';

type NodeList = { [idx: number]: { name: string, nodeItems: { [idx: number]: string }}};

const App: React.FC = () => {
	const [nodeList, setNodeList] = useState<NodeList>({
		0: { name: "To-do", nodeItems: {0: "Implement stream rendering"} },
		1: { name: "Currently doing", nodeItems: {} },
		2: { name: "Done", nodeItems: {} },
	});

	console.log(nodeList)

	return (
		<div className="App p-10 flex justify-start items-start gap-x-4">
			{Object.keys(nodeList).map((index) => {
				const idx = Number(index);
				return <Node key={idx} nodeId={idx} nodeList={nodeList} setNodeList={setNodeList} />;
			})}

			<NewNode setNodeList={setNodeList} />
		</div>
	);
};

export default App;
export type { NodeList };
