import { Result } from "./Result";

export interface Service {
    test(): Promise<Result>
}