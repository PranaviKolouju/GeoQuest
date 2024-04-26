#include <emscripten.h>
#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

using namespace std;

extern "C" {

    EMSCRIPTEN_KEEPALIVE

    int add5(int a) {
        return a+5;
    }

    // const char* readCSV(const char* filename) {
    //     // Use a string stream to avoid memory leaks and manual deallocation
    //     stringstream output;
        
    //     // Open the CSV file
    //     ifstream file(filename);
    //     if (!file.is_open()) {
    //         // Include the filename in the error message
    //         cerr << "Could not open file: " << filename << endl;
    //         return nullptr; // Return a null pointer to indicate an error
    //     }

    //     // Read the file line by line
    //     string line;
    //     while (getline(file, line)) {
    //         // Add each cell to the output stream, handling commas within quotes
    //         stringstream lineStream(line);
    //         string cell;
    //         bool firstCell = true;
    //         output << "[";

    //         while (lineStream.good()) {
    //             getline(lineStream, cell, ',');
    //             // Replace " with "" for valid JSON strings
    //             size_t startPos = 0;
    //             while ((startPos = cell.find("\"", startPos)) != string::npos) {
    //                 cell.replace(startPos, 1, "\"\"");
    //                 startPos += 2; // Move past the inserted characters
    //             }
    //             if (!firstCell) {
    //                 output << ",";
    //             }
    //             output << "\"" << cell << "\"";
    //             firstCell = false;
    //         }

    //         output << "],";
    //     }

    //     // Remove the last comma from the output
    //     if (!output.str().empty()) {
    //         output.seekp(-1, ios_base::end);
    //         output << "]";
    //     }

    //     // Convert the string stream into a string
    //     string outputString = output.str();
        
    //     // Allocate memory for the C-style string
    //     char* outputCStr = new char[outputString.size() + 1];
        
    //     // Copy the contents and return
    //     strcpy(outputCStr, outputString.c_str());
    //     return outputCStr;
    // }
}



    // GeoQuest* GeoQuest_new() {
    //     return new GeoQuest();
    // }

    // void setMode(GeoQuest* game, const char* mode) {
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

