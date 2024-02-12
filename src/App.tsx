import React, { useState, useRef, useEffect } from 'react';

import { IoIosMore } from "react-icons/io";
import { TbPencil } from "react-icons/tb";

import { getStorageItem, setStorageItem } from './state';
import { cn } from './utils/cn';

import { Node } from './components/node/node';
import { NewNode } from './components/new-node/new-node';

type NodeList = { [idx: number]: { name: string, nodeItems: { [idx: number]: string }}};

const App: React.FC = () => {
    const [nodeList, setNodeList] = useState<NodeList>({
        0: { name: "To-do", nodeItems: { 0: "0", 1: "1", 2: "2", 3: "3", 4: "4" } },
        1: { name: "Currently doing", nodeItems: {} },
        2: { name: "Done", nodeItems: {} },
        3: { name: "To-do", nodeItems: { 0: "0", 1: "1", 2: "2", 3: "3", 4: "4" } },
        4: { name: "Currently doing", nodeItems: {} },
        5: { name: "Done", nodeItems: {} },
    });
    const [theme, setTheme] = useState<string>(getStorageItem("theme"));

    const handleThemeSwitch = () => {
        setTheme((lastTheme) => lastTheme === "light" ? "dark" : "light");
        setStorageItem("theme", theme);
    };

    const className = theme === "dark" ? "dark" : "";

    const sliderRef = useRef<HTMLDivElement | null>(null);
 	const [isDown, setIsDown] = useState<boolean>(false);
 	const [startX, setStartX] = useState<number>(0);
 	const [scrollLeft, setScrollLeft] = useState<number>(0);

 	useEffect(() => {
 	  	const handleMouseMove = (e: MouseEvent) => {
 	  	  	if (!isDown || !sliderRef.current) return;

 	  	  	e.preventDefault();
 	  	  	const x = e.pageX - (sliderRef.current.offsetLeft || 0);
 	  	  	const walk = (x - startX) * 1;
 	  	  	sliderRef.current.scrollLeft = scrollLeft - walk;
 	  	};

 	  	const handleMouseUp = () => {
 	  	  	setIsDown(false);
 	  	  	if (sliderRef.current) {
 	  	    	sliderRef.current.classList.remove('active');
 	  	  	}
 	  	};

 	  	if (isDown) {
 	  	  	document.addEventListener('mousemove', handleMouseMove);
 	  	  	document.addEventListener('mouseup', handleMouseUp);
 	  	}

 	  	return () => {
 	  	  	document.removeEventListener('mousemove', handleMouseMove);
 	  	  	document.removeEventListener('mouseup', handleMouseUp);
 	  	};
 	}, [isDown, startX, scrollLeft]);

 	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
 	  	setIsDown(true);
 	  	setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
 	  	setScrollLeft(sliderRef.current?.scrollLeft || 0);
 	  	if (sliderRef.current) {
 	    	sliderRef.current.classList.add('active');
 	  	}
 	};

 	const handleMouseLeave = () => {
 	  	setIsDown(false);
 	  	if (sliderRef.current) {
 	    	sliderRef.current.classList.remove('active');
 	  	}
 	};

	  return (
		<>
			<div className={cn("App flex flex-col justify-start items-start pb-2", className)}>
				<header className="flex items-center justify-between w-[100vw] sticky h-[60px] px-4 border-solid border-b-[1px] bg-slate-900 border-slate-700 shadow-2xl">
					<div className="flex items-center justify-start">
						<TbPencil className="ml-6 text-slate-200" size={24} />

						<p className="text-[16px] text-slate-200 font-semibold ml-2">My Board</p>
					</div>

					<div className="flex items-center justify-end">
						<label className="relative inline-flex items-center cursor-pointer mr-4">
							  <input onClick={handleThemeSwitch} type="checkbox" value="" className="sr-only peer" defaultChecked={theme === "light"} />
							  <div className="w-9 h-5 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
						</label>

						<button className="p-2 rounded-sm hover:bg-slate-800">
							<IoIosMore className="text-slate-200" size={24} />
						</button>
					</div>
				</header>

				<div
	        		ref={sliderRef}
	        		className="bomboklat flex items-start justify-start w-[100vw] h-full p-10 gap-x-4 overflow-x-scroll"
	        		onMouseDown={handleMouseDown}
	        		onMouseLeave={handleMouseLeave}
	      		> {/*scroll on drag horizontally here*/}
					{Object.keys(nodeList).map((index) => {
						const idx = Number(index);
						return <Node key={idx} nodeId={idx} nodeList={nodeList} setNodeList={setNodeList} />;
					})}

					<NewNode setNodeList={setNodeList} scrollToRight={() => {}} /> {/* implement scroll to right later */}
				</div>
			</div>
		</>
	);
};

export default App;
export type { NodeList };
