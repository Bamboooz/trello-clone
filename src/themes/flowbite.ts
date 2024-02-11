import type { CustomFlowbiteTheme } from 'flowbite-react';

const customModalTheme: CustomFlowbiteTheme['modal'] = {
    header: {
        close: {
            base: "ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-slate-700",
        }
    },
};

const customCloseButtonTheme: CustomFlowbiteTheme['button'] = {
    color: {
        info: "text-white bg-transparent border border-transparent enabled:hover:bg-slate-700 focus:ring-4 focus:ring-cyan-300",
    }
};

export { customModalTheme, customCloseButtonTheme };
