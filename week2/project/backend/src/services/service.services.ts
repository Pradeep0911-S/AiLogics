
import { Op } from "sequelize";
import { Service } from "../models/services.model.js";
import { AppError } from "../error/appError.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import type {
  CreateServiceInput,
  UpdateServiceInput,
} from "../validation/service.schema.validation.js";
import { MESSAGES } from "../constants/messages.constant.js";

export const serviceService = {
  create: async (input: CreateServiceInput,currentUserId : string) => {
    const existingService = await Service.findOne({
      where: { name: input.name },
    });

    if (existingService) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.SERVICE_EXISTS
      );
    }

    const service = await Service.create({
      name: input.name,
      createdBy: currentUserId,
    });

    return service;
  },

  findAll: async () => {
    const services = await Service.findAll({
      order: [["createdAt", "DESC"]],
    });

    return services;
  },

  findById: async (id: string) => {
    const service = await Service.findByPk(id);

    if (!service) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        MESSAGES.SERVICE_NOT_FOUND
      );
    }

    return service;
  },

  update: async (id: string, input: UpdateServiceInput, currentUserId: string) => {
    const service = await Service.findByPk(id);

    if (!service) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        MESSAGES.SERVICE_NOT_FOUND
      );
    }

    const existingService = await Service.findOne({
      where: {
        name: input.name,
        id: { [Op.ne]: id },
      },
    });

    if (existingService) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        MESSAGES.SERVICE_EXISTS
      );
    }

    await service.update({
      name: input.name,
      updatedBy: currentUserId,
    });

    return service;
  },

  delete: async (id: string,currentUserId : string) => {
    const service = await Service.findByPk(id);

    if (!service) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        MESSAGES.SERVICE_NOT_FOUND
      );
    }
    await service.update({ updatedBy: currentUserId });
    await service.destroy();
    
  },
};
