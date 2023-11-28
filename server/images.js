import * as fs from "fs";

function main() {
  const imageBuffer = fs.readFileSync(
    "C:\\Users\\Bigbrass\\Desktop\\curioser-paradox\\backend\\public\\kids-compressed.png"
  );
  const base64Image = imageBuffer.toString("base64");

  fs.writeFile("Output.txt", base64Image, (err) => {
    // In case of a error throw err.
    if (err) throw err;
  });
}

main();
