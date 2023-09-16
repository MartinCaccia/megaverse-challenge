import { Coordinate } from "./coordinates.interface";

export interface BodyRequest extends Coordinate {
    candidateId: string;
}