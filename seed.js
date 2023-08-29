const {
    client,
    createTables,
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacterById,
    deleteCharacterById 
} = require(".");

const seedDB = async () => {
    console.log("begin seeding db");
    console.log("creating tables");
    await createTables(client);
    console.log("successfully created tables");
    console.log("create characters");
    const characters = await getAllCharacters(client);
    console.log(characters);
    const joe = await createCharacter(client, "joe", "elf", "paladin");
    console.log("created ", joe);    
    const bo = await createCharacter(client, "bo", "orc", "paladin");
    console.log("created ", bo);
    const charactersAgain = await getAllCharacters(client);
    console.log(charactersAgain);
    const alsoJoe = await getCharacterById(client, 1);
    console.log("got character: ", alsoJoe);
    const updatedJoe = await updateCharacterById(client, 1, "Bob", "half-orc", "bard");
    console.log("updated Joe to: ", updatedJoe);
    await deleteCharacterById(client, 1);
    console.log("successfully deleted");
    const finalCharacters = await getAllCharacters(client);
    console.log(finalCharacters);
    console.log("finished seeding db");
}

client.connect()
    .then(() => {
        console.log("connected");

        return seedDB();
    })
    .then(() => {
        return client.end();
    })
    .then(() => console.log("connection closed"))
    .catch((error) => console.error(error));