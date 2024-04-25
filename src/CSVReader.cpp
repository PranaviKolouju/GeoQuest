#include "CSVReader.h"
#include <sstream>

CSVReader::CSVReader(const std::string& filename) : m_filename(filename) {}

vector<vector<string>> CSVReader::readCSV() {
    vector<vector<string>> data;
    ifstream file(m_filename);

    if (!file.is_open()) {
        throw runtime_error("Could not open file: " + m_filename);
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

vector<vector<string>> CSVReader::filterData(
    const vector<vector<string>>& data,
    function<bool(const vector<string>& row)> filterCriteria) const {
    vector<vector<string>> filteredData;

    for (const auto& row : data) {
        if (filterCriteria(row)) {
            filteredData.push_back(row);
        }
    }

    return filteredData;
}
