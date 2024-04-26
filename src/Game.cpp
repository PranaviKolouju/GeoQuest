#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

using namespace std;

vector<vector<string>> readCSV(const string& filename) {
    vector<vector<string>> data;
    ifstream file(filename);

    if (!file.is_open()) {
        throw runtime_error("Could not open file: " + filename);
    }

    string line;
    while (getline(file, line)) {
        vector<string> row;
        stringstream lineStream(line);
        string cell;

        while (getline(lineStream, cell, ',')) {
            row.push_back(cell);
        }

        data.push_back(row);
    }

    file.close();
    return data;
}

int main() {
    // Example usage:
    string filename = "game_dataset.csv";
    try {
        vector<vector<string>> csvData = readCSV(filename);

        // Print the read data
        for (const auto& row : csvData) {
            for (const auto& cell : row) {
                cout << cell << "\t";
            }
            cout << endl;
        }
    } catch (const runtime_error& e) {
        cerr << e.what() << endl;
    }

    return 0;
}