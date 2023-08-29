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
    deleteDmById,
    createCampaign,
    getAllCampaigns,
    getCampaignById,
    updateCampaignById,
    deleteCampaignById 
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
    console.log("got dm: ", alsoBillyBob);
    const updatedBillyBob = await updateDmById(client, 1, "Billy Bob", 3);
    console.log("updated Billy Bob to: ", updatedBillyBob);
    await deleteDmById(client, 1);
    console.log("successfully deleted");
    const finalDms = await getAllDms(client);
    console.log(finalDms);

    // *** SEED CAMPAIGNS ***
    console.log("create campaigns");
    const campaigns = await getAllCampaigns(client);
    console.log(campaigns);
    console.log("Samantha.id is: ", samantha.id);
    const bridgeToNowhere = await createCampaign(client, "The Bridge to Nowhere", samantha.id);
    console.log("created ", bridgeToNowhere);    
    const dungeonWithStuff = await createCampaign(client, "A Dungeon with Stuff", samantha.id);
    console.log("created ", dungeonWithStuff);
    const campaignsAgain = await getAllCampaigns(client);
    console.log(campaignsAgain);
    const alsoBridgeToNowhere = await getCampaignById(client, 1);
    console.log("got campaign: ", alsoBridgeToNowhere);
    const bridgeToSomewhere = await updateCampaignById(client, 1, "The Bridge to Somewhere", samantha.id);
    console.log("updated Bridge to Nowhere to: ", bridgeToSomewhere);
    await deleteCampaignById(client, 1);
    console.log("successfully deleted");
    const finalCampaigns = await getAllCampaigns(client);
    console.log(finalCampaigns);

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