import { APIOperations, ResourceType } from "@builder.io/data-plugin-tools";
import { CommerceAPIOperations } from "@builder.io/commerce-plugin-tools";

type MedusaResourceType = {
  name: string;
  id: string;
  description: string;
};

const RESOURCE_TYPES = [
  {
    id: 'product',
    name: 'Product',
    description: 'All products in medusa',
  }
] as const satisfies MedusaResourceType[];

interface DataPluginConfig extends APIOperations {
  name: string;
  icon: string;
}

export const getDataConfig = (api: CommerceAPIOperations): DataPluginConfig => {
  return {
    name: 'Medusa',
    icon: '',

    getResourceTypes: async () => RESOURCE_TYPES.map((model): ResourceType => ({
      ...model,
      toUrl: () => ``,
    })),

    getEntriesByResourceType: async (resourceType, options) => {
      // const { product } = api;
      // const { data } = await product.list();
      // return data.map(medusaToBuilderProduct);
      return [];
    },
  }
}
