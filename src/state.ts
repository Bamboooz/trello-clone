interface State {
    theme: "dark" | "light";
}

const defaultState: State = {
    theme: "light",
};

const storedAppState = localStorage.getItem("appState");
const appState = storedAppState ? JSON.parse(storedAppState) : defaultState;

function getStorageItem(item: string) {
    return appState[item];
}

function setStorageItem(item: string, value: string) {
    appState[item] = value;
    localStorage.setItem("appState", JSON.stringify(appState));
}

export { getStorageItem, setStorageItem };
