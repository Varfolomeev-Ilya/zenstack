import { delay, mockDB } from './mocks';
import { ICreateOrganizationSpaceRequest, IUpdateOrganizationRequest } from './organization.types';

export const organizationApi = {
  getOrganization: async (orgId: string) => {
    const org = mockDB.getFullOrganization(orgId);
    if (!org) {
      throw new Error('Organization not found');
    }
    return delay(org);
  },

  createSpace: async (payload: ICreateOrganizationSpaceRequest) => {
    const newSpace = mockDB.createSpace({
      name: payload.name,
      description: payload.description,
      organization_id: payload.orgId,
      projects: [],
    });
    return delay(newSpace);
  },

  updateOrganization: async (payload: IUpdateOrganizationRequest) => {
    const org = mockDB.getFullOrganization(payload.organizationId);

    if (!org) {
      throw new Error(`Organization with id ${payload.organizationId} not found`);
    }

    const updatedOrg = mockDB.updateOrganization({
      id: payload.organizationId,
      name: org.name ?? payload?.name,
      description: org.description ?? payload?.description,
    });

    return delay(updatedOrg);
  },
};
