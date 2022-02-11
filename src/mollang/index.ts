import parse from "./parse";
import run from "./runtime";

export default async function main(code: string) {
    code = code
        .split("\n")
        .map((line) => line.trim())
        .join("\n");
    return run(parse(code));
}