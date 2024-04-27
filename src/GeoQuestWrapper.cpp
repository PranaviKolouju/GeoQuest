#include <emscripten/bind.h>
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <stack>

using namespace emscripten;

class JsonStack {
private:
    std::vector<std::string> stack;

public:
    void push(const std::string& json) {
        stack.push_back(json);
    }

    std::string pop() {
        if (isEmpty()) {
            throw std::runtime_error("Stack is empty");
        }
        std::string top = stack.back();
        stack.pop_back();
        return top;
    }

    std::string top() const {
        if (isEmpty()) {
            throw std::runtime_error("Stack is empty");
        }
        return stack.back();
    }

    bool isEmpty() const {
        return stack.empty();
    }

    size_t size() const {
        return stack.size();
    }
};

// Emscripten bindings
EMSCRIPTEN_BINDINGS(my_module) {
    class_<JsonStack>("JsonStack")
        .constructor()
        .function("push", &JsonStack::push)
        .function("pop", &JsonStack::pop)
        .function("top", &JsonStack::top)
        .function("isEmpty", &JsonStack::isEmpty)
        .function("size", &JsonStack::size);
}


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
    if (std::getline(file, line)) {
        std::istringstream headerStream(line);
        std::string header;
        while (std::getline(headerStream, header, ',')) {
            headers.push_back(header);
        }
    }

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

    std::string result = "[";
    for (size_t i = 0; i < rows.size(); ++i) {
        if (i > 0) result += ", ";
        result += rows[i];
    }
    result += "]";

    char* output = new char[result.size() + 1];
    std::copy(result.begin(), result.end(), output);
    output[result.size()] = '\0';

    return output;
}

}