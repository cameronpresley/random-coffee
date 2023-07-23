import { load } from "https://deno.land/std@0.195.0/dotenv/mod.ts";

export type Configuration = {
  GITHUB_BEARER_TOKEN: string;
  SLACK_WEBHOOK: string;
};

export async function loadEnvironment(): Promise<Configuration> {
  const env = await load();
  // console.log(env);
  const config = env as Configuration;
  console.log(config);
  return config;
  // return env as Configuration;
}
