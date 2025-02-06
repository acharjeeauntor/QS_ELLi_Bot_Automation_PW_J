import {test} from "@playwright/test"
import jsonData from "../data.json"
import fs from "fs";

test("test", async ({page}) => {
    const dataFilePath = "./data.json";
    let data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
    var botMessages =[]

    const URL="https://qs.topuniversities.com/qs-student-apply-support?utm_source=toprightCTA&utm_medium=TU&utm_id=QSSA"
    await page.goto(URL)
    await page.waitForLoadState("load")
    const messageTextInput = page.frameLocator("#bp-web-widget").locator("#input-message")
    const messageSend = page.frameLocator("#bp-web-widget").locator('#btn-send')
    const botMessageText = page.frameLocator("#bp-web-widget").locator('[data-from="Virtual Assistant"] p')
    await messageTextInput.waitFor({state: "visible",timeout:15000})
    for(var i=0;i<jsonData.userMessages.length;i++){
        await messageTextInput.fill(jsonData.userMessages[i])
        await messageSend.click()
        await botMessageText.nth(i+1).waitFor({state: "visible",timeout:15000})
    }
    var botMessagesUI = await botMessageText.count()
    for(var j=0;j<botMessagesUI;j++){
        let text = await botMessageText.nth(j).textContent();
        botMessages.push(text);
    }
    data.botMessages = botMessages;
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 4), "utf8");
})