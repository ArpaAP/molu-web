import exitMessage from "./exit";

export default async function run(
    tokens: [number, number, number][],
    line_backpoint: number[],
    input: () => Promise<string>
) {
    let runtime = [];
    let vars: number[] = [];
    let characterPrint = false;
    let result = '';

    for (let i = 0; i < tokens.length; i++) {
        let cur = tokens[i];
        let f = cur[0];
        let s = cur[1];
        let t = cur[2];

        if (f === 1) {
            runtime.push(s);
        } else if (f === 2) {
            if (vars[s] !== undefined) {
                vars[s] += t;
            } else {
                vars[s] = t;
            }
        } else if (f === 3) {
            if (!runtime) {
                return [exitMessage(3, "", []), 3];
            }
            if (characterPrint) {
                result += String.fromCharCode(runtime[runtime.length - 1]);
            } else {
                result += String(runtime[runtime.length - 1]);
            }
            runtime.pop();
            characterPrint = false;
        } else if (f === 4) {
            let tmp = Number(await input());
            vars[s] = tmp;
        } else if (f === 5) {
            characterPrint = true;
        } else if (f === 7) {
            if (!runtime) {
                return [exitMessage(3, "", []), 3];
            }
            i = line_backpoint[runtime[0] - 1] - 1;
            runtime.pop();
        } else if (f === 8) {
            if (vars[s] !== undefined) {
                runtime.push(vars[s]);
            } else {
                vars[s] = 0;
            }
        } else if (f === 9) {
            if (!runtime) {
                return [exitMessage(3, "", []), 3];
            }
            if (runtime[0] !== 0) {
                i = s - 1;
            }
            runtime.pop();
        } else if (f === 10) {
            if (s === 0) {
                return [null, t];
            } else {
                return [null, vars[t]];
            }
        }
    }

    return [result, 0];
}
