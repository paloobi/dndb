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
    await createTables();
    console.log("successfully created tables");
    console.log("create characters");
    const characters = await getAllCharacters();
    console.log(characters);
    const joe = await createCharacter("joe", "elf", "paladin");
    console.log("created ", joe);    
    const bo = await createCharacter("bo", "orc", "paladin");
    console.log("created ", bo);
    const charactersAgain = await getAllCharacters();
    console.log(charactersAgain);
    const alsoJoe = await getCharacterById(1);
    console.log("got character: ", alsoJoe);
    const updatedJoe = await updateCharacterById(1, "Bob", "half-orc", "bard");
    console.log("updated Joe to: ", updatedJoe);
    await deleteCharacterById(1);
    console.log("successfully deleted");
    const finalCharacters = await getAllCharacters();
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