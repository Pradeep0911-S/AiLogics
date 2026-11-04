import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { initializeApp } from "./app.js";

async function start() {
    const terminal = createInterface({
        input: stdin,
        output: stdout,
    });
    const agent = await initializeApp();

    while (true) {
        const question = await terminal.question("You: ");
        if (question.trim().toLowerCase() === "exit") {
            break;
        }
        if (!question.trim()) {
            continue;
        }
        const response = await agent.invoke({
            messages: [
                {
                    role: "user",
                    content: question,
                },
            ],
        });

        const lastMessage =
            response.messages[response.messages.length - 1];

        console.log("\nAI:", lastMessage?.content, "\n");
    }
    terminal.close();
}

start();