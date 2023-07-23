# Random Coffee Bot

This bot accompanies the [Having Coffee with Deno](https://blog.thesoftwarementor.com/articles/2023/06/26/having-coffee-with-deno-inspiration/) blog post series by Cameron Presley.

## Using this Repository

### Prerequisites
- Make sure to have the latest version of [Deno](https://deno.land/manual@v1.35.2/getting_started/installation) installed.

### Setup
1. Create your `.env` file by copying the `.env.example` file and following the links in the `.env` for generating your secrets
1. Update the `GITHUB_ORGANIZATION_NAME` to be the name of the organization to get members from

### Running the script
1. Navigate to the root of the repo
1. Run `deno run --allow-read --allow-env --allow-net ./index.ts`
