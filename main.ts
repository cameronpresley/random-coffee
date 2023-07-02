import { config as loadEnv } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { GetTeamMemberResponse, getMembersOfOrganization } from "./github.ts";
import { Pair, createPairsFrom, shuffle } from "./utility.ts";

await loadEnv({ export: true });

const names = await getMembersOfOrganization("SmallBatchSoftware");
const pairs = createPairsFrom(shuffle(names));
const message = createMessage(pairs);
console.log(message);

function createMessage(pairs: Pair<GetTeamMemberResponse>[]): string {
  const mapper = (p: Pair<GetTeamMemberResponse>): string =>
    `${p.first.login} meets with ${p.second.login}${
      p.third ? ` and ${p.third.login}` : ""
    }`;

  return pairs.map(mapper).join("\n");
}
