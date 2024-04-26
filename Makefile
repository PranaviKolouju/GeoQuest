CXX = em++
CXXFLAGS = -std=c++11

MODULE_NAME = src/GeoQuestWrapper
OUTPUT_JS = src/screens/geoquest_wasm.js
OUTPUT_WASM = src/screens/geoquest_wasm.wasm
EMBED_FILE=src/game_dataset.csv

all: $(OUTPUT_JS)

$(OUTPUT_JS): $(MODULE_NAME).cpp
	emcc ${MODULE_NAME}.cpp -o ${OUTPUT_JS} \
	-s EXPORT_ES6=1 \
	-s EXPORT_NAME='GeoQuestWrapper' \
	-s EXPORTED_RUNTIME_METHODS='["UTF8ToString"]' \
	-s ENVIRONMENT="web" \
	-s FORCE_FILESYSTEM=1 \
	--embed-file $(EMBED_FILE)
