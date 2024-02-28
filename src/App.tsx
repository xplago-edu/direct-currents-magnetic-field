import './App.css'
import CanvasSection from "./components/CanvasSection.tsx";
import ActionsSection from "./components/ActionsSection.tsx";
import {useState} from "react";
import {Current} from "./models/Current.ts";

function App() {

    const [currents, setCurrents] = useState<Current[]>([]);

    const updateCurrentByIndex = (index: number, current: Current) => {
        const newCurrents = [...currents];
        newCurrents[index] = current;
        setCurrents(newCurrents);
    };

    const deleteCurrent = (id: string) => {
        const newCurrents = [...currents];
        setCurrents(newCurrents.filter(current => current.id !== id));
    };

    const addCurrent = (current: Current) => {
        const newCurrents = [...currents, current];
        setCurrents(newCurrents);
    };

    return (
        <div
            className={"dark bg-background w-full h-full"}
            style={{
                display: "grid",
                gridTemplateColumns: "350px 1fr",
                padding: 0,
            }}>
            <ActionsSection currents={currents}
                            updateCurrentByIndex={updateCurrentByIndex}
                            addCurrent={addCurrent}
                            deleteCurrent={deleteCurrent}/>
            <CanvasSection currents={currents}
                           updateCurrentByIndex={updateCurrentByIndex}
                           addCurrent={addCurrent}
                           deleteCurrent={deleteCurrent}/>
        </div>
    )
}

export default App
