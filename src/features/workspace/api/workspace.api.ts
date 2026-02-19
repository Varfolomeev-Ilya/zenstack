import { delay, mockDB } from './mocks';
import {
  IGetOrganizationSpacesRequest,
  IRemoveSpaceFromOrganizationRequest,
} from './workspace.types';

export const workspaceApi = {
  getOrganizationSpaces: async (organizationId: string) => {
    const spaces = mockDB.getSpacesByOrganization(organizationId);

    if (!spaces.length) {
      return delay([]);
    }

    return delay(spaces);
  },
  addSpaceToOrganization: async (payload: IGetOrganizationSpacesRequest) => {
    const org = mockDB.getFullOrganization(payload.organizationId);
    if (!org) {
      throw new Error(`Organization with id ${payload.organizationId} not found`);
    }

    const newSpace = mockDB.createSpace({
      name: payload.name,
      description: payload.description || '',
      organization_id: payload.organizationId,
      projects: [],
    });

    return delay(newSpace);
  },
  removeSpaceFromOrganization: async (payload: IRemoveSpaceFromOrganizationRequest) => {
    const org = mockDB.getFullOrganization(payload.organizationId);
    if (!org) {
      throw new Error(`Organization with id ${payload.organizationId} not found`);
    }

    const space = mockDB.getFullSpace(payload.spaceId);
    if (!space || space.organization_id !== payload.organizationId) {
      throw new Error(
        `Space with id ${payload.spaceId} not found in organization ${payload.organizationId}`,
      );
    }

    const deleted = mockDB.deleteSpace(payload.spaceId);

    if (!deleted) {
      throw new Error(`Failed to delete space ${payload.spaceId}`);
    }

    return delay({ success: true, deletedSpaceId: payload.spaceId });
  },
};
