import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

export type GetOrganizationMemberResponse = {
  login: string;
};

function createHeaders() {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${Deno.env.get("GITHUB_BEARER_TOKEN")}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function getMembersOfOrganization(
  orgName: string
): Promise<GetOrganizationMemberResponse[]> {
  const url = `https://api.github.com/orgs/${orgName}/members`;
  try {
    const resp = await axiod.get<GetOrganizationMemberResponse[]>(url, {
      headers: createHeaders(),
    });
    return resp.data;
  } catch (error) {
    if (error.response) {
      return Promise.reject(
        `Failed to get members: ${error.response.status}, ${error.response.statusText}`
      );
    }
    return Promise.reject(
      "Failed for non status reason " + JSON.stringify(error)
    );
  }
}

export { getMembersOfOrganization };
