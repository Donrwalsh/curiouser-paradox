import { Octokit } from "octokit";

import { exec } from "child_process";

const octokit = new Octokit({
  auth: process.env.API_KEY,
});

const BLUE = "\u001b[31m";
const CYAN = "\u001b[36m";
const GREEN = "\u001b[32m";
const MAGENTA = "\u001b[35m";
const RED = "\u001b[31m";
const RESET = "\u001b[0m";
const WHITE = "\u001b[37m";
const YELLOW = "\u001b[33m";

async function main() {
  let localSha;

  exec("git rev-parse HEAD", (error, stdout, stderr) => {
    if (error) {
      console.error(`Failed: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return;
    }
    localSha = stdout;
    console.log(
      `Found local HEAD sha: "${YELLOW}${stdout.replace(
        /(\r\n|\n|\r)/gm,
        ""
      )}${RESET}"`
    );
  });

  const last30Commits = await octokit.request(
    "GET /repos/Donrwalsh/curiouser-paradox/commits",
    {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const result2 = await octokit.request(
    `GET /repos/Donrwalsh/curiouser-paradox/commits/${last30Commits.data[0].sha}/status`
  );
  const statusText =
    result2.data.state == "success"
      ? `${GREEN}SUCCESS${RESET}`
      : result2.data.state == "pending"
      ? `${YELLOW}PENDING${RESET}`
      : `${RED}${result2.data.state.toUpperCase()}${RESET}`;
  console.log(
    `-=[(Latest) status: ${statusText}]=-  ` +
      `@ "${CYAN}${last30Commits.data[0].html_url}${RESET}" ` +
      `-m "${YELLOW}${last30Commits.data[0].commit.message}${RESET}" ` +
      `-sha "${YELLOW}${last30Commits.data[0].sha}${RESET}" ` +
      `on "${YELLOW}${last30Commits.data[0].commit.committer.date}${RESET}" `
  );

  if (
    localSha.replace(/(\r\n|\n|\r)/gm, "") ==
    last30Commits.data[0].sha.replace(/(\r\n|\n|\r)/gm, "")
  ) {
    console.log(`${GREEN}Local matches Remote. Nothing to do here!`);
  } else {
    console.log(`${RED}Local doesn't match Remote. Time to pull and redeploy!`);
  }
}

await main();
