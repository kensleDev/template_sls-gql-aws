
const { exec } = require('child_process');
const os = process.platform


interface TerminalCommand { command: string, output: any, errors: any }

const BashRunner = {
    send: (commands: string[]) => {
        const results: any = []

        commands.forEach((command: string) => {
            console.log(command)
            exec(command, (err: any, stdout: any, stderr: any) => {
                console.log(stderr)
                results.push({ command: command, output: stdout, errors: err })
            });
        })
        return results;
    }
}

var PSRunner = {
    send: function (commands: string[]) {
        var self: any = this;
        const results: [TerminalCommand] = [<TerminalCommand>{}]
        var spawn: any = require("child_process").spawn;
        var child: any = spawn("powershell.exe", ["-Command", "-"]);

        child.stdout.on("data", function (data: any) {
            self.out.push(data.toString());
        });
        child.stderr.on("data", function (data: any) {
            self.err.push(data.toString());
        });

        commands.forEach(function(cmd: string) {
            self.out = [];
            self.err = [];
            child.stdin.write(cmd + '\n');
            results.push({ command: cmd, output: self.out, errors: self.err });
        });
        child.stdin.end();
        return results;
    },
};


export const terminal = {
    send: (commands: string[]) => {
        if (os === 'win32') {
            const res = PSRunner.send(commands)
            console.log(res)
        } else if (os === 'linux') {
            const res = BashRunner.send(commands)
            console.log(res)
        }
    }
}


