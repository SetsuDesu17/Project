import PromptSync from "prompt-sync";

const prompt = PromptSync({}); 

const titleScreen = {
    appStart: () => {
        console.log("\nCode Blocks!\n");
        console.log("0 - New Game ");
        console.log("1 - Load Game ");
    }
}