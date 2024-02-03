import * as Joi from 'joi';

export interface EnvironmentVariables {
  PORT: number;
}

export const envValidationSchema = Joi.object<EnvironmentVariables, true>({
  PORT: Joi.number().required(),
});
