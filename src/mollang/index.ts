import parse from "./parse";
import run from "./runtime";

export default async function main(code: string, input: () => Promise<string>) {
    code = code
        .split("\n")
        .map((line: string) => line.trim())
        .join("\n");

    let [success, ...parsed] = parse(code);

    if (!success) {
        return [parsed[0] as string, parsed[1] as number, true];
    }
    
    let result = await run(...parsed as [[number, number, number][], number[]], input) as [string, number];

    return [...result, false];
}