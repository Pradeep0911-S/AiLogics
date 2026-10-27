
import { Op } from "sequelize";
import { Service } from "../models/services.model.js";
import { AppError } from "../error/app-error.js";
import { HTTP_STATUS } from "../constants/httpStatus.constant.js";
import type {
  CreateServiceInput,
  UpdateServiceInput,
} from "../validation/service.schema.validation.js";

export const serviceService = {
  create: async (input: CreateServiceInput) => {
    const existingService = await Service.findOne({
      where: { name: input.name },
    });

    if (existingService) {
      throw new AppError(
        HTTP_STATUS.BAD_REQUEST,
        "A service with this name already exists"
      );
    }

    const service = await Service.create({
      name: input.name,
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
        "Service not found"
      );
    }

    return service;
  },

  update: async (id: string, input: UpdateServiceInput) => {
    const service = await Service.findByPk(id);

    if (!service) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        "Service not found"
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
        "A service with this name already exists"
      );
    }

    await service.update({
      name: input.name,
    });

    return service;
  },

  delete: async (id: string) => {
    const service = await Service.findByPk(id);

    if (!service) {
      throw new AppError(
        HTTP_STATUS.NOT_FOUND,
        "Service not found"
      );
    }

    await service.destroy();
  },
};
