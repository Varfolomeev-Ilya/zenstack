import { create } from 'zustand';

import { organizationApi } from '../api/organization.api';
import {
  ICreateOrganizationSpaceRequest,
  IUpdateOrganizationRequest,
} from '../api/organization.types';

import { TOrganizationStore } from './organization.types';

export const useOrganizationStore = create<TOrganizationStore>((set, get) => ({
  organization: null,

  getOrganization: async (organizationId: string) => {
    const response = await organizationApi.getOrganization(organizationId);
    set({ organization: response });
  },

  updataOrganization: async (payload: IUpdateOrganizationRequest) => {
    const response = await organizationApi.updateOrganization(payload);
    set({ organization: response });
  },

  createOrganizationSpace: async (payload: ICreateOrganizationSpaceRequest) => {
    const response = await organizationApi.createSpace(payload);

    const currentOrg = get().organization;

    if (!currentOrg) {
      throw new Error('Organization not found');
    }

    set({
      organization: {
        ...currentOrg,
        spaces: [...currentOrg.spaces, response],
        updated_at: new Date().toISOString(),
      },
    });
  },
}));
