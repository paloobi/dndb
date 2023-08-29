const {
    client,
    createTables,
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacterById,
    deleteCharacterById,
    createDm,
    getAllDms,
    getDmById,
    updateDmById, 
    deleteDmById 
} = require(".");

const seedDB = async () => {
    // *** BEGIN ***
    console.log("begin seeding db");
    console.log("creating tables");
    await createTables(client);
    console.log("successfully created tables");

    // *** SEED CHARACTERS ***
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

    // *** SEED DMS ***
    console.log("create dms");
    const dms = await getAllDms(client);
    console.log(dms);
    const billyBob = await createDm(client, "Billy Bob", 5);
    console.log("created ", billyBob);    
    const samantha = await createDm(client, "Samantha", 4);
    console.log("created ", samantha);
    const dmsAgain = await getAllDms(client);
    console.log(dmsAgain);
    const alsoBillyBob = await getDmById(client, 1);
    console.log("got character: ", alsoBillyBob);
    const updatedBillyBob = await updateDmById(client, 1, "Billy Bob", 3);
    console.log("updated Billy Bob to: ", updatedBillyBob);
    await deleteDmById(client, 1);
    console.log("successfully deleted");
    const finalDms = await getAllDms(client);
    console.log(finalDms);

    // *** END ***
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