import { useQuery } from '@tanstack/react-query';
import { UserClaims, UserClaimsSchema } from '@features/settings/types/userClaims.ts';
import { FetchError } from '@errors/authenticationError.ts';
import { logger } from '@/lib/logger.ts';
import { getAuthenticatedApiClient } from '@/lib/apiClient.ts';

export async function getServerClaims(): Promise<UserClaims> {
  logger.logTrace('Fetching settings claims from server');
  const apiClient = await getAuthenticatedApiClient();
  const response = await apiClient.get('users/me');
  const data = await response.json();
  const validatedData = UserClaimsSchema.safeParse(data);
  if (!validatedData.success) {
    console.error(data);
    console.error(validatedData.error.errors);
    throw new FetchError('Failed to fetch settings claims');
  }
  return validatedData.data;
}

export const getServerClaimsQueryOptions = {
  queryKey: ['getServerClaims'],
  queryFn: () => getServerClaims()
};

export function useGetServerClaimsQuery() {
  return useQuery(getServerClaimsQueryOptions);
}
