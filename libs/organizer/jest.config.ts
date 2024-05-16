/* eslint-disable */
import { getJestConfig } from '../../jest.config.base';
import { Config } from 'jest';

const projectName = 'organizer';

const config: Config = {
  ...getJestConfig(projectName),
};

export default config;
