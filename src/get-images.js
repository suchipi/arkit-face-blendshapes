const fs = require("fs");
const path = require("path");
const axios = require("axios");
const chalk = require("chalk");
const makePypress = require("pypress");

function downloadFile(fileUrl, outputLocationPath) {
  const writer = fs.createWriteStream(outputLocationPath);

  return axios({
    method: "get",
    url: fileUrl,
    responseType: "stream",
  }).then((response) => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on("error", (err) => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on("close", () => {
        if (!error) {
          resolve(true);
        }
        //no need to call the reject here, as it will have been called in the
        //'error' stream;
      });
    });
  });
}

async function main() {
  const py = makePypress({
    log: (message) => {
      switch (message.type) {
        case "RUN": {
          if (message.command.name === "evaluate") {
            delete message.command.args;
          }

          console.log(chalk.blue("RUN:"), message.command);
          break;
        }
        case "ERROR": {
          console.log(
            chalk.red("ERROR:"),
            message.error && message.error.stack
              ? message.error.stack
              : message.error
          );
          break;
        }
      }
    },
  });

  py.launch({ headless: false });

  py.goto(
    "https://developer.apple.com/documentation/arkit/arfaceanchor/blendshapelocation"
  );

  const { els } = await py.get(".link.has-adjacent-elements");

  const stuffToGet = [];
  for (const el of els) {
    console.log(chalk.blue(`Scraping name for element...`));
    const { lastReturnValue: name } = await py.evaluate((el) => {
      const identifierChild = el.querySelector(".identifier");
      if (!identifierChild) return "unknown";

      return identifierChild.textContent;
    }, el);
    console.log(chalk.blue(`Identified name: ${name}`));

    console.log(chalk.blue(`Scraping link url for ${name}.`));
    const { lastReturnValue: url } = await py.evaluate((el) => {
      return "https://developer.apple.com" + el.getAttribute("href");
    }, el);

    stuffToGet.push({ name, url });
  }

  for (const { name, url } of stuffToGet) {
    console.log(chalk.blue(`Navigating to page for ${name}...`));

    await py.goto(url);
    const { el } = await py.get("figure img");
    if (!el) {
      console.log(chalk.yellow(`Skipping ${name}: "No image found"`));
      continue;
    }

    console.log(chalk.blue(`Scraping img src for ${name}...`));
    const { lastReturnValue: imgurl } = await py.evaluate((el) => {
      return el.getAttribute("src");
    }, el);

    await downloadFile(imgurl, path.join(__dirname, "images", name + ".png"));
    console.log(chalk.green(`Wrote images/${name}.png`));
  }

  await py.asPromise();
}

main().catch((err) => {
  process.exitCode = 1;
  console.error(err);
});
