import {uid} from "uid";

export class Vector {
    public id: string;
    public start: Point = {x: 0, y: 0};
    public end: Point = {x: 0, y: 0};

    constructor(id: string, start: Point, end: Point) {
        this.id = id;
        this.start = start;
        this.end = end;
    }

    public module(): number {
        const dx = this.end.x - this.start.x;
        const dy = this.end.y - this.start.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }

    public add(other: Vector, id: string = uid()): Vector {
        const newX = this.start.x + other.start.x;
        const newY = this.start.y + other.start.y;
        const newEndX = this.end.x + other.end.x;
        const newEndY = this.end.y + other.end.y;

        return new Vector(id, { x: newX, y: newY }, { x: newEndX, y: newEndY });
    }
}

export type Point = {
    x: number;
    y: number;
}