import { CommerceAPIOperations, registerCommercePlugin } from '@builder.io/commerce-plugin-tools';
import pkg from '../package.json';
import Medusa from '@medusajs/js-sdk';
import { Image, Resource } from '@builder.io/commerce-plugin-tools/dist/types/interfaces/resource';
import { Object } from 'ts-toolbelt';
import { appState } from './app-state';
import { getDataConfig } from './data-plugin';

console.log('Hello, world!');

const pluginId = pkg.name;

// registerDataPlugin({
//   id: pluginId,
//   name: pluginId,
//   settings: [
//
//   ],
//   ctaText: 'Hmmmm',
// }, async settings => {
//   return {
//     async getResourceTypes() {
//       return [];
//     }
//   };
// });
//


registerCommercePlugin({
  id: pluginId,
  name: pluginId,
  ctaText: '',
  settings: [
    {
      name: 'medusaEndpoint',
      type: "string",
      helperText: "The url of your medusa api",
      required: true,
    },
  ],
}, async (settings) => {
  const medusa = new Medusa({
    baseUrl: settings.get('medusaEndpoint'),
  });

  const medusaToBuilderProduct = (medusaProduct: {
    id: string;
    title: string;
    images: any[];
  }) => {
    const medusaImage = medusaProduct.images?.[0];
    const builderImage = (medusaImage ? {
      src: medusaImage.url,
    } : undefined) satisfies Image | undefined;

    return {
      id: medusaProduct.id,
      title: medusaProduct.title,
      image: builderImage,
    } satisfies Resource;
  };

  const service = {
    product: {
      async findById(id: string) {
        const { product } = await medusa.store.product.retrieve(id);
        if (!product.id || !product.title) {
          throw new Error(`Product with id: ${id} not found`);
        }
        return medusaToBuilderProduct({
          id: product.id,
          title: product.title,
          images: product.images,
        });
      },

      async search(query, offset) {
        const { hits } = await medusa.store.product.list({
          q: query,
          offset: offset,
        });

        // return hits;
        return [];
      },

      getRequestObject(id, resource) {
        return {
          "@type": "@builder.io/core:Request",
          request: {
            url: `${appState.config.apiRoot()}/api/v1/medusa/product/${id}?apiKey=${appState.user.apiKey}`,
          },
          options: {
            product: id,
          }
        }
      }
    },
  } satisfies CommerceAPIOperations;

  appState.registerDataPlugin(getDataConfig(service));

  return service;
});

