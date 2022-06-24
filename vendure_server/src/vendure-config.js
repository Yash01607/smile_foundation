import {
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import ProductRatingPlugin from './plugins/rate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
  apiOptions: {
    port: 4000,
    adminApiPath: 'admin-api',
    adminApiPlayground: {
      settings: {
        'request.credentials': 'include',
      },
    }, // turn this off for production
    adminApiDebug: true, // turn this off for production
    shopApiPath: 'shop-api',
    shopApiPlayground: {
      settings: {
        'request.credentials': 'include',
      },
    }, // turn this off for production
    shopApiDebug: true, // turn this off for production
  },
  authOptions: {
    superadminCredentials: {
      identifier: 'superadmin',
      password: 'superadmin',
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET || 'cookie-secret',
    },
    requireVerification: true,
  },
  dbConnectionOptions: {
    type: 'mysql',
    synchronize: true, // turn this off for production
    logging: false,
    database: 'vendure',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Yash@meh01',
    migrations: [path.join(__dirname, '../migrations/*.ts')],
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  customFields: {
    Customer: [{ name: 'Favourite', type: 'string', list: true }],
  },
  plugins: [
    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, '../static/assets'),
    }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    EmailPlugin.init({
      devMode: true,
      outputPath: path.join(__dirname, '../static/email/test-emails'),
      route: 'mailbox',
      handlers: defaultEmailHandlers,
      templatePath: path.join(__dirname, '../static/email/templates'),
      globalTemplateVars: {
        // The following variables will change depending on your storefront implementation
        fromAddress: '"example" <noreply@example.com>',
        verifyEmailAddressUrl: 'http://localhost:8080/verify',
        passwordResetUrl: 'http://localhost:8080/password-reset',
        changeEmailAddressUrl:
          'http://localhost:8080/verify-email-address-change',
      },
    }),
    AdminUiPlugin.init({
      route: 'admin',
      port: 3002,
    }),
    ProductRatingPlugin,
  ],
};
