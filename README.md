# **GeoQuest**

**Setup:**

To compile the application, ensure that the GeoQuest repository is cloned onto your personal computer. Navigate to the directory of the cloned repository on a terminal. From there, navigate to the emsdk folder to pull the emsdk submodule using the following commands:

- git submodule init
- git submodule update

Navigate back to the root directory of the GeoQuest repository and run the following command which will install all required libraries using the npm package manager:

- npm install --legacy-peer-deps

**Preferred Way To Compile:**

Run the following command to compile the application and open the GeoQuest game in your web browser:

- npm start

**Compatible OSes:**

Windows Operating System and macOS.

**System Requirements:**
- The system needs to have a C++ compiler installed (either gcc or clang).

**Runtime Environment Requirement:**

- Node.js

**Package Manager Requirement:**

- npm

**Library Requirements:**
- @react-native-async-storage/async-storage@1.23.1
- @testing-library/jest-dom@5.17.0
- @testing-library/react@13.4.0
- @testing-library/user-event@13.5.0
- copy-files-from-to@3.9.1
- cors@2.8.5
- mime@4.0.1
- react-dom@18.3.1
- react-router-dom@5.3.4
- react-scripts@5.0.1
- react@18.3.1
- web-vitals@2.1.4

**Parent Repository:**
- https://github.com/oam67/Software_Engineering_Project.git

&ensp;
# **Instructions**

**Game Mode Selection:**
- Select "Easy Mode" to guess countries given their geographical context.
- Select "Hard Mode" to guess countries without geographical context.

**Continent Selection:**
- Select the continent you wish to guess countries from.

**Game:**
- When a country is displayed, type your guess into the textbox and click "Submit" or hit the "Enter" key.
- If your guess is correct, you will be awarded 10 points and will receive 5 extra seconds of time. 
- If your guess is incorrect, you will lose 10 seconds of time. If your guess is a valid country within the continent, you will receive a hint.
- If you guess all the countries in the continent or time runs out, the game will end and you will be shown your score board with all your high scores for that session. 
- You can choose to play again or quit the game.
