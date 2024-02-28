import {Arrow, Circle, Layer, Stage} from "react-konva";
import {useEffect, useRef, useState} from "react";
import {Current} from "../models/Current.ts";
import {Vector} from "../models/Vector.ts";
import {Point} from "framer-motion";
import {uid} from "uid";

export interface CanvasSectionProps {
    currents: Current[],
    updateCurrentByIndex: (index: number, current: Current) => void,
    addCurrent: (current: Current) => void,
    deleteCurrent: (id: string) => void,
}

export default function CanvasSection(props: CanvasSectionProps) {

    const divRef = useRef<HTMLDivElement | null>(null)
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    })

    const currentsDrawers = props.currents.map((current, index) => {
        return <Circle
            key={current.id}
            onDragEnd={(event) => {
                props.updateCurrentByIndex(index, {...current, x: event.target.x(), y: event.target.y()})
            }}
            onDragMove={(event) => {
                props.updateCurrentByIndex(index, {...current, x: event.target.x(), y: event.target.y()})
            }}
            stroke={"#ffffff"}
            x={current.x}
            y={current.y}
            radius={current.radius}
            fill={current.color}
            draggable/>
    })

    useEffect(() => {
        if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
            setDimensions({
                width: divRef.current.offsetWidth,
                height: divRef.current.offsetHeight
            })
        }
    }, []);

    const calcB = (position: Point, current: Current): Vector => {
        const distance = Math.sqrt((position.x - current.x) ** 2 + (position.y - current.y) ** 2);

        if (distance > 0) {
            const module = (10 ** -7) * Math.abs(current.currentValue) / (distance ** 2);
            const m = 11 ** 9;

            if (current.currentValue >= 0) {
                let B = (position.x - current.x) * module * m;

                let A = (position.y - current.y) * module * m;

                return new Vector(uid(), {x: 0, y: 0}, {x: A, y: -B})
            } else {
                let B = (current.x - position.x) * module * m;

                let A = (current.y - position.y) * module * m;
                return new Vector(uid(), {x: 0, y: 0}, {x: A, y: -B})
            }
        }

        return new Vector(uid(), {x: 0, y: 0}, {x: 0, y: 0})
    }

    const calcField = () => {
        const field: Vector[] = [];
        for (let i = 0; i < dimensions.width; i += 50) {
            for (let j = 0; j < dimensions.height; j += 50) {
                let fieldVector: Vector = new Vector(uid(), {x: i, y: j}, {x: i, y: j});
                props.currents.forEach(current => {
                    fieldVector = fieldVector.add(calcB({x: i, y: j}, current), fieldVector.id);
                })
                field.push(fieldVector);
            }
        }
        return field;
    }

    const field = calcField().map(vector => {
        return <Arrow
            key={vector.id}
            points={[vector.start.x, vector.start.y, vector.end.x, vector.end.y]}
            fill={"#999999"}
            stroke={"#999999"}/>
    })

    return (
        <div className={"flex box-border"} ref={divRef}>
            <Stage className={"bg-background h-full w-full"} width={dimensions.width} height={dimensions.height}>
                <Layer>
                    {field}
                    {currentsDrawers}
                </Layer>
            </Stage>
        </div>
    )
}