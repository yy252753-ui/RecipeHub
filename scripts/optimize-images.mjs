import sharp from "sharp";
import { readdir } from "fs/promises";
import { join, basename, extname } from "path";

const INPUT_DIR = new URL("../public/recipe-images", import.meta.url).pathname.slice(1);
const OUTPUT_DIR = INPUT_DIR;

const HERO_NAMES = ["bulgogi", "doenjang-jjigae", "kimchi-jjigae", "gimbap", "japchae"];

async function run() {
  const files = (await readdir(INPUT_DIR)).filter((f) => /\.(png|jpe?g)$/i.test(f));

  for (const file of files) {
    const name = basename(file, extname(file));
    const isHero = HERO_NAMES.some((h) => name.includes(h));
    const [w, h] = isHero ? [1000, 750] : [534, 400];
    const input = join(INPUT_DIR, file);
    const output = join(OUTPUT_DIR, `${name}.webp`);

    await sharp(input)
      .resize(w, h, { fit: "cover" })
      .webp({ quality: 78 })
      .toFile(output);

    console.log(`✓ ${file} → ${name}.webp (${w}×${h})`);
  }
}

run().catch(console.error);
