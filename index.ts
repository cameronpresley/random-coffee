import dayjs from "https://cdn.skypack.dev/dayjs@1.10.4";
import { load } from "https://deno.land/std@0.195.0/dotenv/mod.ts";

import {
  GetOrganizationMemberResponse,
  getMembersOfOrganization,
} from "./libraries/github.ts";
import { MessageFacade, sendMessage } from "./libraries/slack.ts";
import { Pair, createPairsFrom, shuffle } from "./libraries/utility.ts";

await load({ export: true });

const organizationName = Deno.env.get("GITHUB_ORGANIZATION_NAME")!;
const names = await getMembersOfOrganization(organizationName);
const pairs = createPairsFrom(shuffle(names));

const formattedPairs = formatPairs(pairs);

const now = dayjs();
const message = new MessageFacade()
  .setTitle(`☕ Random Coffee for ${now.format("MMM DD, YYYY")} ☕`)
  .addLineToMessage(formattedPairs)
  .build();

await sendMessage(message);

function formatPairs(pairs: Pair<GetOrganizationMemberResponse>[]): string {
  const formatName = (s: string) => `_${s}_`;
  const mapper = (p: Pair<GetOrganizationMemberResponse>): string =>
    `- ${formatName(p.first.login)} meets with ${formatName(p.second.login)}${
      p.third ? ` and ${formatName(p.third.login)}` : ""
    }`;
  return pairs.map(mapper).join("\n");
}
