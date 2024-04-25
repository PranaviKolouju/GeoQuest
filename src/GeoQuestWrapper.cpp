#include <emscripten.h>
#include "GeoQuest.cpp"

extern "C" {

    EMSCRIPTEN_KEEPALIVE

    GeoQuest* GeoQuest_new() {
        return new GeoQuest();
    }

    // void GeoQuest_setMode(GeoQuest* game, const char* mode) {
    //     if (game) {
    //         game->setMode(std::string(mode));
    //     }
    // }

    // void GeoQuest_setContinent(GeoQuest* game, const char* continent) {
    //     if (game) {
    //         game->setContinent(std::string(continent));
    //     }
    // }

    // const char* GeoQuest_getMode(GeoQuest* game) {
    //     static std::string lastMode;
    //     if (game) {
    //         lastMode = game->getMode();
    //         return lastMode.c_str();
    //     }
    //     return "";
    // }

    // const char* GeoQuest_getContinent(GeoQuest* game) {
    //     static std::string lastContinent;
    //     if (game) {
    //         lastContinent = game->getContinent();
    //         return lastContinent.c_str();
    //     }
    //     return "";
    // }

    // int GeoQuest_getScore(GeoQuest* game) {
    //     if (game) {
    //         return game->getScore();
    //     }
    //     return 0;
    // }

}

