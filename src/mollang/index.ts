import parse from "./parse";
import run from "./runtime";

export default async function main(code: string) {
    code = code
        .split("\n")
        .map((line) => line.trim())
        .join("\n");

    let parsed = parse(code);

    if (!parsed[1]) return [parsed[0], null];
    
    return run(parsed[0]);
}