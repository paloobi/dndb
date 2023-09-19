"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { pool, createTables, createCharacter, getAllCharacters, getCharacterById, updateCharacterById, deleteCharacterById, createDm, getAllDms, getDmById, updateDmById, deleteDmById, createCampaign, getAllCampaigns, getCampaignById, updateCampaignById, deleteCampaignById, getCampaignsByCharacterId, getCharactersByCampaignId, addCharacterToCampaign, removeCharacterFromCampaign } = require(".");
const seedDB = () => __awaiter(void 0, void 0, void 0, function* () {
    // *** BEGIN ***
    console.log("begin seeding db");
    console.log("creating tables");
    yield createTables();
    console.log("successfully created tables");
    // *** SEED CHARACTERS ***
    console.log("create characters");
    const characters = yield getAllCharacters();
    console.log(characters);
    const joe = yield createCharacter("joe", "elf", "paladin");
    console.log("created ", joe);
    const bo = yield createCharacter("bo", "orc", "paladin");
    console.log("created ", bo);
    const flo = yield createCharacter("flo", "human", "rogue");
    console.log("created ", flo);
    const charactersAgain = yield getAllCharacters();
    console.log(charactersAgain);
    const alsoJoe = yield getCharacterById(1);
    console.log("got character: ", alsoJoe);
    const updatedJoe = yield updateCharacterById(1, "Bob", "half-orc", "bard");
    console.log("updated Joe to: ", updatedJoe);
    yield deleteCharacterById(1);
    console.log("successfully deleted");
    const finalCharacters = yield getAllCharacters();
    console.log(finalCharacters);
    // *** SEED DMS ***
    console.log("create dms");
    const dms = yield getAllDms();
    console.log(dms);
    const billyBob = yield createDm("Billy Bob", 5);
    console.log("created ", billyBob);
    const samantha = yield createDm("Samantha", 4);
    console.log("created ", samantha);
    const dmsAgain = yield getAllDms();
    console.log(dmsAgain);
    const alsoBillyBob = yield getDmById(1);
    console.log("got dm: ", alsoBillyBob);
    const updatedBillyBob = yield updateDmById(1, "Billy Bob", 3);
    console.log("updated Billy Bob to: ", updatedBillyBob);
    yield deleteDmById(1);
    console.log("successfully deleted");
    const finalDms = yield getAllDms();
    console.log(finalDms);
    // *** SEED CAMPAIGNS ***
    console.log("create campaigns");
    const campaigns = yield getAllCampaigns();
    console.log(campaigns);
    console.log("Samantha.id is: ", samantha.id);
    const bridgeToNowhere = yield createCampaign("The Bridge to Nowhere", samantha.id);
    console.log("created ", bridgeToNowhere);
    const dungeonWithStuff = yield createCampaign("A Dungeon with Stuff", samantha.id);
    console.log("created ", dungeonWithStuff);
    const castleWithLoot = yield createCampaign("Castle with Loot", samantha.id);
    console.log("created ", dungeonWithStuff);
    const campaignsAgain = yield getAllCampaigns();
    console.log(campaignsAgain);
    const alsoBridgeToNowhere = yield getCampaignById(1);
    console.log("got campaign: ", alsoBridgeToNowhere);
    const bridgeToSomewhere = yield updateCampaignById(1, "The Bridge to Somewhere", samantha.id);
    console.log("updated Bridge to Nowhere to: ", bridgeToSomewhere);
    yield deleteCampaignById(1);
    console.log("successfully deleted");
    const finalCampaigns = yield getAllCampaigns();
    console.log(finalCampaigns);
    // *** ADD CHARACTERS TO CAMPAIGN ***
    yield addCharacterToCampaign(dungeonWithStuff.id, bo.id);
    yield addCharacterToCampaign(castleWithLoot.id, bo.id);
    yield addCharacterToCampaign(castleWithLoot.id, flo.id);
    const bosCampaigns = yield getCampaignsByCharacterId(bo.id);
    console.log("bosCampaigns: ", bosCampaigns);
    const castleWithLootCharacters = yield getCharactersByCampaignId(castleWithLoot.id);
    console.log("castleWithLootCharacters", castleWithLootCharacters);
    yield removeCharacterFromCampaign(castleWithLoot.id, flo.id);
    const castleWithLootCharactersUpdated = yield getCharactersByCampaignId(castleWithLoot.id);
    console.log("castleWithLootCharactersUpdate", castleWithLootCharactersUpdated);
    // *** END ***
    console.log("finished seeding db");
    return pool;
});
pool.connect()
    .then(() => {
    console.log("connected");
    return seedDB();
})
    .then((pool) => {
    process.exit();
})
    .catch((error) => console.error(error));
