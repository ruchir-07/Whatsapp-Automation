const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode-terminal');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use saved value
const client = new Client({
    authStrategy: new LocalAuth({
        session: sessionData
    })
});


client.on('qr', (qr) => {
    // console.log('QR RECEIVED', qr);
    qrcode.generate(qr, { small: true });
});
console.log("I have a Scheduled msg to be sent after 20s")
client.on('ready', () => {
    console.log('Client is ready!');
    client.getChats().then(chats => {
        const myChat = chats.find(
            (chat) => chat.name === "Ruchir"
        );
        // console.log(myChat)
        setTimeout(() => {
            client.sendMessage(
                myChat.id._serialized,  //Serialised id is used to send message
                "Hey, I,m a BOT again"
            )
        }, 20000);
    });
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    if (sessionData === undefined) {
        console.log("error ocuured")
    }
    // else {

    //     sessionData = session;
    //     fs.writeFileSync(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    //         if (err) {
    //             console.error(err);
    //         }
    //         // else {
    //         //     ///--------------------


    //         //     const spinner = ora(`Cargando ${chalk.yellow('Validando session con Whatsapp...')}`);
    //         //     sessionData = require(SESSION_FILE_PATH);
    //         //     spinner.start();
    //         //     client = new Client({
    //         //         session: sessionData,
    //         //         puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-extensions'] }
    //         //     });

    //         //     client.on('ready', () => {
    //         //         console.log('Client is ready!');
    //         //         servicioReady()
    //         //         spinner.stop();

    //         //         listeMessages()
    //         //         // sendMessage();
    //         //         // sendMedia();

    //         //         //connectionReady();

    //         //     });
    //         //     client.initialize()
    //         // }
    //     });
    // }
});


client.initialize();