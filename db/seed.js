const {
    pool,
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
    deleteCampaignById,
    getCampaignsByCharacterId,
    getCharactersByCampaignId,
    addCharacterToCampaign,
    removeCharacterFromCampaign
} = require(".");

const seedDB = async () => {
    // *** BEGIN ***
    console.log("begin seeding db");
    console.log("creating tables");
    await createTables();
    console.log("successfully created tables");

    // *** SEED CHARACTERS ***
    console.log("create characters");
    const characters = await getAllCharacters();
    console.log(characters);
    const joe = await createCharacter("joe", "elf", "paladin");
    console.log("created ", joe);    
    const bo = await createCharacter("bo", "orc", "paladin");
    console.log("created ", bo);
    const flo = await createCharacter("flo", "human", "rogue");
    console.log("created ", flo);
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

    // *** SEED DMS ***
    console.log("create dms");
    const dms = await getAllDms();
    console.log(dms);
    const billyBob = await createDm("Billy Bob", 5);
    console.log("created ", billyBob);    
    const samantha = await createDm("Samantha", 4);
    console.log("created ", samantha);
    const dmsAgain = await getAllDms();
    console.log(dmsAgain);
    const alsoBillyBob = await getDmById(1);
    console.log("got dm: ", alsoBillyBob);
    const updatedBillyBob = await updateDmById(1, "Billy Bob", 3);
    console.log("updated Billy Bob to: ", updatedBillyBob);
    await deleteDmById(1);
    console.log("successfully deleted");
    const finalDms = await getAllDms();
    console.log(finalDms);

    // *** SEED CAMPAIGNS ***
    console.log("create campaigns");
    const campaigns = await getAllCampaigns();
    console.log(campaigns);
    console.log("Samantha.id is: ", samantha.id);
    const bridgeToNowhere = await createCampaign("The Bridge to Nowhere", samantha.id);
    console.log("created ", bridgeToNowhere);    
    const dungeonWithStuff = await createCampaign("A Dungeon with Stuff", samantha.id);
    console.log("created ", dungeonWithStuff);
    const castleWithLoot = await createCampaign("Castle with Loot", samantha.id);
    console.log("created ", dungeonWithStuff);
    const campaignsAgain = await getAllCampaigns();
    console.log(campaignsAgain);
    const alsoBridgeToNowhere = await getCampaignById(1);
    console.log("got campaign: ", alsoBridgeToNowhere);
    const bridgeToSomewhere = await updateCampaignById(1, "The Bridge to Somewhere", samantha.id);
    console.log("updated Bridge to Nowhere to: ", bridgeToSomewhere);
    await deleteCampaignById(1);
    console.log("successfully deleted");
    const finalCampaigns = await getAllCampaigns();
    console.log(finalCampaigns);

    // *** ADD CHARACTERS TO CAMPAIGN ***
    await addCharacterToCampaign(dungeonWithStuff.id, bo.id);
    await addCharacterToCampaign(castleWithLoot.id, bo.id);
    await addCharacterToCampaign(castleWithLoot.id, flo.id);

    const bosCampaigns = await getCampaignsByCharacterId(bo.id);
    console.log("bosCampaigns: ", bosCampaigns);
    const castleWithLootCharacters = await getCharactersByCampaignId(castleWithLoot.id);
    console.log("castleWithLootCharacters", castleWithLootCharacters);

    await removeCharacterFromCampaign(castleWithLoot.id, flo.id);

    const castleWithLootCharactersUpdated = await getCharactersByCampaignId(castleWithLoot.id);
    console.log("castleWithLootCharactersUpdate", castleWithLootCharactersUpdated);

    // *** END ***
    console.log("finished seeding db");
    return pool;
}

pool.connect()
    .then(() => {
        console.log("connected");

        return seedDB();
    })
    .then((pool) => {
        process.exit();
    })
    .catch((error) => console.error(error));