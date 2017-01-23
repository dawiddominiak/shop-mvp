import { Container } from "inversify";
import "reflect-metadata";
import * as Sequelize from "sequelize";
import { ICartRepository } from "../domain/entity/ICartRepository";
import { IProductRepository } from "../domain/entity/IProductRepository";
import { ITransactionRepository } from "../domain/entity/ITransactionRepository";
import { IUserRepository } from "../domain/entity/IUserRepository";
import { ISequelizeRepository } from "../persistance/ISequelizeRepository";
import { SequelizeCartRepository } from "../persistance/SequelizeCartRepository";
import { SequelizeProductRepository } from "../persistance/SequelizeProductRepository";
import { SequelizeTransactionRepository } from "../persistance/SequelizeTransactionRepository";
import { SequelizeUserRepository } from "../persistance/SequelizeUserRepository";
import { sequelizeConfig } from "./../persistance/config";
import { Persistance } from "./Persistance";
import { TYPES } from "./types";

const shopContainer = new Container();

shopContainer.bind<Persistance>(TYPES.Persistance).to(Persistance);

shopContainer.bind<IUserRepository>(TYPES.IUserRepository).to(SequelizeUserRepository).inSingletonScope();
shopContainer.bind<IProductRepository>(TYPES.IProductRepository).to(SequelizeProductRepository).inSingletonScope();
shopContainer.bind<ICartRepository>(TYPES.ICartRepository).to(SequelizeCartRepository).inSingletonScope();
shopContainer
    .bind<ITransactionRepository>(TYPES.ITransactionRepository)
    .to(SequelizeTransactionRepository)
    .inSingletonScope()
;

shopContainer.bind<ISequelizeRepository>(TYPES.ISequelizeRepository).to(SequelizeUserRepository);
shopContainer.bind<ISequelizeRepository>(TYPES.ISequelizeRepository).to(SequelizeProductRepository);
shopContainer.bind<ISequelizeRepository>(TYPES.ISequelizeRepository).to(SequelizeCartRepository);
shopContainer.bind<ISequelizeRepository>(TYPES.ITransactionRepository).to(SequelizeTransactionRepository);

shopContainer.bind<Sequelize.Sequelize>(TYPES.Sequelize).toDynamicValue(() => {
    return sequelizeConfig;
});

export { shopContainer };
