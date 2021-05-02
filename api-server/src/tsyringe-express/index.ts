/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { RequestHandler, Application, Router } from "express";
import { Logger } from "../helpers";
import { DependencyContainer, InjectionToken } from "tsyringe";

export enum HttpMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    PATCH = "patch",
    DELETE = "delete",
    ALL = "all"
}

const controllerRegistry = new Array<Function>();

export interface ControllerInfo {
    route?: string,
    middlewares?: RequestHandler[]
}

export interface ActionInfo {
    route: string,
    method?: HttpMethod,
    middlewares?: RequestHandler[]
}

export const EXPRESS_CONTROLLER = Symbol.for("express:controller");
export const EXPRESS_ACTION = Symbol.for("express:action");

function controller(info?: ControllerInfo): Function {
    return function (target: Function) {
        // injectable()(<any> target);
        Reflect.defineMetadata(EXPRESS_CONTROLLER, info, target)
        if (!controllerRegistry.includes(target)) {
            controllerRegistry.push(target);
        }
    }
}

function action(info: ActionInfo): Function {
    return function (target: any, propertyKey: string) {
        if (target.constructor) {
            Reflect.defineMetadata(EXPRESS_ACTION, info, target.constructor, propertyKey);
        }
    }
}

function attachControllers(app: Application | Router, di: DependencyContainer, controllers: Function[] = []): void {
    if (controllers.length == 0) {
        controllers = controllerRegistry;
    }

    controllers.forEach(controller => {
        const controllerInfo: ControllerInfo = Reflect.getMetadata(EXPRESS_CONTROLLER, controller);
        const instance = di.resolve(<InjectionToken<any>>controller);

        if (controllerInfo && controllerInfo.middlewares)
            attachMiddlewares(app, controllerInfo.middlewares);

        const controllerRoute = controllerInfo?.route ?? '/';
        Logger.debug(`Attaching controller route: ${controllerRoute}`);
        attachActions(app, controllerRoute, controller, instance);
    });
}

function attachMiddlewares(app: Application | Router, middlewares: RequestHandler[]): void {
    app.use(middlewares);
}

function attachActions(app: Application | Router, controllerRoute: string, controller: Function, controllerInstance: any): void {
    // Get all methods from the controller
    const controllerMethods = Object.getOwnPropertyNames(controller.prototype);
    controllerMethods.forEach(actionKey => {
        const actionInfo: ActionInfo = Reflect.getMetadata(EXPRESS_ACTION, controller, actionKey);
        if (actionInfo) {
            const route = joinRoutes(controllerRoute, actionInfo.route);
            Logger.debug(`Attach action route: ${route}`);
            const middlewares = actionInfo.middlewares ?? [];
            const action = actionHandler(controllerInstance, actionKey);

            app[actionInfo.method ?? HttpMethod.GET].call(app, route, ...middlewares, action);
        }
    });
}

function joinRoutes(...routes: string[]): string {
    const newRoute = routes
        .map(route => route.replace(/^[\\/\s]+|[\\/\s]+$/g, ''))
        .join('/');
    return `/${newRoute}`;
}

function actionHandler(controller: any, action: string): RequestHandler {
    return (req, res, next) => Promise
        .resolve(controller[action](req, res, next))
        .catch(next);
}

export { controller, action, attachControllers };