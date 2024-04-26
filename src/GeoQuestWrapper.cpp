#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <emscripten.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE
const char* readCSV() {
    const char* filename = "src/game_dataset.csv";
    std::ifstream file(filename);
    if (!file.is_open()) {
        return "File not found";
    }

    std::vector<std::string> headers;
    std::string line;
    // Assume the first line is headers
    if (std::getline(file, line)) {
        std::istringstream headerStream(line);
        std::string header;
        while (std::getline(headerStream, header, ',')) {
            headers.push_back(header);
        }
    }

    // Read the rest of the data
    std::vector<std::string> rows;
    while (std::getline(file, line)) {
        std::istringstream lineStream(line);
        std::string cell;
        std::string rowResult = "{";
        int columnIndex = 0;
        while (std::getline(lineStream, cell, ',')) {
            if (columnIndex > 0) rowResult += ", ";
            rowResult += "\"" + headers[columnIndex] + "\": \"" + cell + "\"";
            columnIndex++;
        }
        rowResult += "}";
        rows.push_back(rowResult);
    }
    file.close();

    // Combine all rows into a single string
    std::string result = "[";
    for (size_t i = 0; i < rows.size(); ++i) {
        if (i > 0) result += ", ";
        result += rows[i];
    }
    result += "]";

    // Allocate memory on the heap that JavaScript can read
    char* output = new char[result.size() + 1];
    std::copy(result.begin(), result.end(), output);
    output[result.size()] = '\0';  // Null-terminate the string

    return output;
}
}
