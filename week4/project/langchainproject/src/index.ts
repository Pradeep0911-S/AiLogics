
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import { Command } from "@langchain/langgraph";

import { initializeApp } from "./app.js";

async function start() {
    const terminal = createInterface({
        input: stdin,
        output: stdout,
    });

    const agent = await initializeApp();

    const config = {
        configurable: {
            thread_id: "postgres-terminal-session",
        },
    };

    while (true) {
        const question = await terminal.question("\nYou: ");

        if (question.trim().toLowerCase() === "exit") {
            break;
        }

        if (!question.trim()) {
            continue;
        }

        let response = await agent.invoke(
            {
                messages: [
                    {
                        role: "user",
                        content: question,
                    },
                ],
            },
            config
        );

        while (response.__interrupt__?.length) {
            const interrupt = response.__interrupt__[0];
            if(!interrupt){
                break;
            }

            console.log("\nDatabase modification requires approval.");

            console.dir(interrupt.value, { depth: null });

            const decision = await terminal.question(
                "\nApprove this operation? (yes/no): "
            );

            if (decision.trim().toLowerCase() === "yes") {
                response = await agent.invoke(
                    new Command({
                        resume: {
                            decisions: [
                                {
                                    type: "approve",
                                },
                            ],
                        },
                    }),
                    config
                );
            } else {
                response = await agent.invoke(
                    new Command({
                        resume: {
                            decisions: [
                                {
                                    type: "reject",
                                    message: "The user rejected this database modification.",
                                },
                            ],
                        },
                    }),
                    config
                );
            }
        }

        const lastMessage =
            response.messages[response.messages.length - 1];

        console.log("\nAI:", lastMessage?.content, "\n");
    }

    terminal.close();
    console.log("PostgreSQL AI agent stopped.");
}

start();
