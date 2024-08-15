import { Router } from "express";

export interface Route {
    path: string,
    auth: boolean,
    router: Router,
}