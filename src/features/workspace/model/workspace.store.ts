import { create } from 'zustand';

import { workspaceApi } from '../api/workspace.api';
import {
  IGetOrganizationSpacesRequest,
  IRemoveSpaceFromOrganizationRequest,
} from '../api/workspace.types';

import { TWorkspaceStore } from './workspace.types';

export const useWorkspaceStore = create<TWorkspaceStore>((set, get) => ({
  spaces: null,

  getOrganizationSpaces: async (spaceId: string) => {
    const response = await workspaceApi.getOrganizationSpaces(spaceId);
    set({ spaces: response });
  },

  addSpaceToOrganization: async (payload: IGetOrganizationSpacesRequest) => {
    const response = await workspaceApi.addSpaceToOrganization(payload);
    const currSpaces = get().spaces;

    set({ spaces: [...(currSpaces || []), response] });
  },

  removeSpaceFromOrganization: async (payload: IRemoveSpaceFromOrganizationRequest) => {
    const response = await workspaceApi.removeSpaceFromOrganization(payload);

    if (!response.success) {
      return;
    }

    const currSpaces = get().spaces;

    set({ spaces: currSpaces?.filter(space => space.id !== response.deletedSpaceId) });
  },
}));
