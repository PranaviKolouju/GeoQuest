// #include "CSVReader.h"
// #include "CSVReader.cpp"
#include "myStack.cpp"
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
#include <random>
#include <chrono>

using namespace std;

class GeoQuest {
private:
    // CSVReader reader;
    string currentCountry;
    string currentContinent;
    string gameMode;
    myStack<string, 100> countries;
    vector<string> guesses;
    vector<string> correctGuesses;
    vector<vector<string>> data;
    vector<vector<string>> filteredData;
    int score;
    double latitude;
    double longitude;

public:

    GeoQuest() {

    }

    // GeoQuest(const string& datasetFilename) : reader(datasetFilename) {
    //     score = 0;
    //     data = reader.readCSV();
    // }

    void setMode(const string& mode);

    void setContinent(const string& continent);

    string getMode() const;

    string getContinent() const;

    int getScore() const;

    void getGuess(string guess);

    string getCountry() const;

    double getLatitude();

    double getLongitude();

    vector<string> getCorrectGuesses();

    vector<string> getIncorrectGuesses();

    void printData();

    void printFilteredData();

    void loadCountries(const string& continent);

    void isCorrect(string guess);

    void computeHint(string guess);

    bool isGameOver();
};

void GeoQuest::setMode(const string& mode) {
    gameMode = mode;
}

// void GeoQuest::setContinent(const string& continent) {
//     currentContinent = continent;
// }

// string GeoQuest::getMode() const {
//     return gameMode;
// }

// string GeoQuest::getContinent() const {
//     return currentContinent;
// }

// int GeoQuest::getScore() const {
//     return score;
// }

// void GeoQuest::getGuess(string guess) {
//     transform(guess.begin(), guess.end(), guess.begin(),
//                    [](unsigned char c){ return tolower(c);});

//     bool alreadyGuessed = any_of(correctGuesses.begin(), correctGuesses.end(),
//                                   [guess](const string& correctGuess) {
//                                       string lowerCorrectGuess = correctGuess;
//                                       transform(lowerCorrectGuess.begin(), lowerCorrectGuess.end(), lowerCorrectGuess.begin(),
//                                                      [](unsigned char c){ return tolower(c); });
//                                       return lowerCorrectGuess == guess;
//                                   });

//     if (alreadyGuessed) {
//         cout << "The country you entered has already been shown." << endl;
//     } else {
//         isCorrect(guess);
//     }
// }

// string GeoQuest::getCountry() const {
//     return currentCountry;
// }

// double GeoQuest::getLatitude(){
//     return latitude;
// }

// double GeoQuest::getLongitude(){
//     return longitude;
// }

// vector<string> GeoQuest::getCorrectGuesses() {
//     return correctGuesses;
// }

// vector<string> GeoQuest::getIncorrectGuesses() {
//     return guesses;
// }

// void GeoQuest::printData() {
//     for (const auto &row : data) {
//         for (const auto &element : row) {
//             cout << element << " ";
//         }
//         cout << endl;
//     }
// }

// void GeoQuest::printFilteredData() {
//     countries.display();
// }

// void GeoQuest::loadCountries(const string& continent) {
//     filteredData = reader.filterData(data, [continent](const vector<string>& row) {
//         return row.size() > 2 && row[1] == continent;
//     });

//     unsigned seed = chrono::system_clock::now().time_since_epoch().count();
//     default_random_engine engine(seed);

//     shuffle(filteredData.begin(), filteredData.end(), engine);

//     for (const auto& row : filteredData) {
//         countries.push(row[3]);
//     }

//     currentCountry = countries.top();

//     auto it = find_if(filteredData.begin(), filteredData.end(), [this](const vector<string>& row) {
//         return row.size() > 3 && row[3] == this->currentCountry;
//     });

//     latitude = stod((*it)[4]);
//     longitude = stod((*it)[5]);
// }

// void GeoQuest::isCorrect(string guess) {
//     if (guess == currentCountry) {
//         score += 5;
//         correctGuesses.push_back(currentCountry);
//         countries.pop();
//         guesses.clear();
//         currentCountry = countries.top();
//         auto it = find_if(filteredData.begin(), filteredData.end(), [this](const vector<string>& row) {
//             return row.size() > 3 && row[3] == this->currentCountry;
//         });
//         latitude = stod((*it)[4]);
//         longitude = stod((*it)[5]);
//         isGameOver();
//     }
//     else {
//         guesses.push_back(guess);
//         computeHint(guess);
//     }
// }

// void GeoQuest::computeHint(string guess) {
//     transform(guess.begin(), guess.end(), guess.begin(), [](unsigned char c){ return tolower(c);});
//     auto it = find_if(filteredData.begin(), filteredData.end(), [guess](const vector<string>& row) {
//         return row.size() > 3 && row[3] == guess;
//     });

//     if (stod((*it)[4]) < latitude){
//         cout << "The correct country is further North!" << endl;
//     }

//     if (stod((*it)[4]) > latitude){
//         cout << "The correct country is further South!" << endl;
//     }

//     if (stod((*it)[5]) < longitude){
//         cout << "The correct country is further East!" << endl;
//     }

//     if (stod((*it)[5]) > longitude){
//         cout << "The correct country is further West!" << endl;
//     }

// }

// bool GeoQuest::isGameOver() {
//     if (countries.empty() == true){
//         return true;
//         cout << "Game over!" << endl;
//     }
//     else {
//         return false;
//     }
// }