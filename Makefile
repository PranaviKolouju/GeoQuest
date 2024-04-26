CXX = em++
CXXFLAGS = -std=c++11

MODULE_NAME=src/GeoQuestWrapper
OUTPUT_JS=src/screens/geoquest_wasm.js
OUTPUT_WASM=src/screens/geoquest_wasm.wasm
DATASET=src/game_dataset.csv

all: $(OUTPUT_JS)

$(OUTPUT_JS): $(MODULE_NAME).cpp
	emcc ${MODULE_NAME}.cpp -o ${OUTPUT_JS} \
	-s EXPORT_ES6=1 \
	-s EXPORT_NAME='GeooQuestWrapper' \
	-s ENVIRONMENT="web"
	--preload-file $(DATASET)