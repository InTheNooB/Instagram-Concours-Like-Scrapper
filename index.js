const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
// const credentials = { username: "nlisinsta", password: "instagram33" };
const credentials = { username: "gill2l4tourette", password: "emf12345" };
const jeunesses_urls = {
    saint_aubin: "CXGEyg3j6TG",
    forel: "CXtGfjyruk-",
    domdidier: "CXLhStqKtPq",
    delley_portalban: "CXGEl1mjoBl",
    cheyres_chables: "CXn2CVNKJZZ",
    vallon: "CXlRPZ0o5Pp",
    lechelles: "CXisdIlqZ2M",
    mannens_gransivaz: "CXgHp8sqa_H",
    font_chables_chatillon: "CXdi2xjKpfX",
    cheiry: "CW8EhlfKJMj",
    montet_frasses: "CW-pVJGqTv7",
    cugy: "CXGXtNoIYZ7",
    dompierre_russy: "CXI8gCmqSTT",
    boillon_seiry_lully: "CXOGFr_lwRj",
    vesin: "CXQq4gqKGpG",
    fetigny: "CXTPrc2K35S",
    surpierre: "CXUiE2YqPL7",
    murist: "CXYZRIpKBqS",
    gletterens: "CXa-EBxqqJo",
};

const login_url = "https://www.instagram.com/accounts/login/";
const redirected_url = "https://www.instagram.com/";
const instagram_account_name_regex = /@\w*/g;
const data_filename = "../data.json";
const check_interval_ms = 600000; // 600000 = 10min
const login_interval_ms = 600000;

(async function init() {

    console.log("==Starting Chrome Headless==");
    let driver = await new Builder().forBrowser('chrome')
        /*.setChromeOptions(new chrome.Options().headless())*/
        .build();

    while (true) {
        await login();
        await check();
        await sleep(check_interval_ms);
    }


    async function login() {
        return new Promise(async(resolve) => {
            let firstLogin = true;

            // Load login page
            await driver.get(login_url);
            await sleep(1500);

            while (await driver.getCurrentUrl() != redirected_url) {
                if (!firstLogin) {
                    await sleep(login_interval_ms);
                } else {
                    firstLogin = false;
                }
                console.log(getDateLog() + "TRYING TO LOG IN");
                // Login if not already logged in

                await driver.get(login_url);
                await sleep(1500);

                // Accept cookies
                try {
                    await driver.findElement(By.className('bIiDR')).click();
                } catch (e) {

                }

                await sleep(1500);

                // Set credentials
                await driver.findElement(By.name('username')).sendKeys(credentials.username);
                await driver.findElement(By.name('password')).sendKeys(credentials.password);
                await sleep(1500);

                // Login
                await driver.findElement(By.css('button[type="submit"]')).click();
                await sleep(9000);
            }
            resolve();
        });
    }

    async function check() {
        return new Promise(async(resolve) => {
            let likes, description;
            try {
                console.log(getDateLog() + "Start checking");
                // Open output file
                let rawData = fs.readFileSync(data_filename);
                let parsedData = JSON.parse(rawData);

                // Loop though the list of jeunesses
                for (const jeunesse of Object.keys(jeunesses_urls)) {
                    // Redirect to the jeunesse's post
                    await driver.get(`https://www.instagram.com/p/${jeunesses_urls[jeunesse]}/`);

                    // Get data
                    try {
                        likes = await getLikes();
                        description = await getDescription();
                    } catch (e) {
                        console.log(getDateLog() + "ERROR : " + e);
                        continue;
                    }
                    description = description.match(instagram_account_name_regex);

                    // Update output file
                    if (!parsedData[jeunesses_urls[jeunesse]]) {
                        parsedData[jeunesses_urls[jeunesse]] = {
                            "instagram_account": [],
                            "checks": []
                        };
                    }
                    if (parsedData[jeunesses_urls[jeunesse]].instagram_account.length == 0) {
                        parsedData[jeunesses_urls[jeunesse]].instagram_account = description;
                    }
                    parsedData[jeunesses_urls[jeunesse]].checks.push({
                        "timestamp": Date.now(),
                        "likes": likes
                    });
                    await sleep(250);
                }


                // Write in file
                fs.writeFileSync(data_filename, JSON.stringify(parsedData));

            } finally {
                console.log(getDateLog() + "Finished checking");
                resolve();
                // await driver.quit();
            }
        });
    }

    async function getDescription() {
        return driver.findElement(By.className('EtaWk'))
            .findElement(By.css('ul div'))
            .findElement(By.className('C4VMK'))
            .getText();
    }

    async function getLikes() {
        return driver.findElement(By.className('Nm9Fw')).findElement(By.className('zV_Nj')).findElement(By.css('span')).getText();
    }
})();

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function getDateLog() {
    dateNow = new Date();
    let date = (dateNow.getDate() < 10 ? '0' : '') + dateNow.getDate();
    let month = ((dateNow.getMonth() + 1) < 10 ? '0' : '') + (dateNow.getMonth() + 1);
    let hours = (dateNow.getHours() < 10 ? '0' : '') + dateNow.getHours();
    let min = (dateNow.getMinutes() < 10 ? '0' : '') + dateNow.getMinutes();
    let sec = (dateNow.getSeconds() < 10 ? '0' : '') + dateNow.getSeconds();
    return "[" + date + "." + month + "." + dateNow.getFullYear() + " " + hours + ":" + min + ":" + sec + "] ";
}