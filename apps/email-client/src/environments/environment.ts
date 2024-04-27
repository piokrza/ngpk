import { Environment } from '.';

class EnvironmentImpl implements Environment {
  production = false;
  baseUrl = 'https://api.angular-email.com';
}

export const environment = new EnvironmentImpl();
