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

function cmdFailure(msg, which) {
  let isError = which == "error";

  console.error(
    `${isError ? RED : YELLOW}-=[runCmd ${
      isError ? "Failed" : "Warning"
    }]=- ${RESET}${msg}`
  );
  isError && process.exit(1);
}

async function main() {
  let localSha;

  exec("git rev-parse HEAD", (error, stdout, stderr) => {
    error && cmdFailure(error.message, "error");
    stderr && cmdFailure(stderr, "stderr");

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

  let latestStatus = await octokit.request(
    `GET /repos/Donrwalsh/curiouser-paradox/commits/${last30Commits.data[0].sha}/status`
  );

  const statusText =
    latestStatus.data.state == "success"
      ? `${GREEN}SUCCESS${RESET}`
      : latestStatus.data.state == "pending"
      ? `${YELLOW}PENDING${RESET}`
      : `${RED}${latestStatus.data.state.toUpperCase()}${RESET}`;
  console.log(
    `-=[(Latest Remote) status: ${statusText}]=-  ` +
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
    return;
  } else {
    console.log(`${MAGENTA}Local doesn't match Remote.`);
    if (latestStatus.data.state != "success") {
      console.log(
        `${RED}Latest commit from remote is unstable. Nothing to do here!`
      );
      return;
    }

    console.log(`${MAGENTA}Latest commit is stable. Pulling.`);

    exec("git pull", (error, stdout, stderr) => {
      error && cmdFailure(error.message, "error");
      stderr && cmdFailure(stderr, "stderr");

      console.log(stdout);
    });

    exec("docker compose down -v", (error, stdout, stderr) => {
      error && cmdFailure(error.message, "error");
      stderr && cmdFailure(stderr, "stderr");

      console.log(stdout);
    });

    exec("docker compose up -d --build", (error, stdout, stderr) => {
      error && cmdFailure(error.message, "error");
      stderr && cmdFailure(stderr, "stderr");

      console.log(stdout);
    });
  }
}

await main();
