#ifndef CSVREADER_H
#define CSVREADER_H

#include <fstream>
#include <string>
#include <vector>
#include <functional>
using namespace std;

class CSVReader {
public:
    explicit CSVReader(const std::string& filename);
    vector<vector<string>> readCSV();
    vector<vector<string>> filterData(
        const vector<vector<string>>& data,
        function<bool(const vector<string>& row)> filterCriteria) const;

private:
    string m_filename;
};

#endif // CSVREADER_H
