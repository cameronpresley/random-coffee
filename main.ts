import { config as loadEnv } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import {
  GetOrganizationMemberResponse,
  getMembersOfOrganization,
} from "./github.ts";
import { Pair, createPairsFrom, shuffle } from "./utility.ts";

await loadEnv({ export: true });

// Replace this with your actual organization name
const organizationName = "JusticeLeague";
const names = await getMembersOfOrganization(organizationName);
const pairs = createPairsFrom(shuffle(names));
const message = createMessage(pairs);
console.log(message);

function createMessage(pairs: Pair<GetOrganizationMemberResponse>[]): string {
  const mapper = (p: Pair<GetOrganizationMemberResponse>): string =>
    `${p.first.login} meets with ${p.second.login}${
      p.third ? ` and ${p.third.login}` : ""
    }`;
  return pairs.map(mapper).join("\n");
}
