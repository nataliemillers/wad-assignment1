# Gym Portal Node Module

This Node module simulates a gym portal for personal trainers and members.

## Compatability

This Node module has been developed and tested with Node.js version 20.9.0 and 21.0.0.

## Setup

1. Install Node.js: [Node.js Download](https://nodejs.org/)

2. Clone the repository:
    ```bash
    git clone https://github.com/nataliemillers/wad-assignment1.git
    ```

3. Navigate to the project directory:
    ```
    cd wad-assignment1
    ```

4. Create an `app.js` file in the root folder of the project to call the functions

5. Require the node module in `app.js` by inserting this line of code at the top of the file:
    ```
    const gym = require("./natalie_webapi.js);
    ```

6. Install dependencies:
    ```
    npm install
    npm install nodemon
    ```

7. Run nodemon in a new terminal to start the module:
    ```
    nodemon app.js
    ```

<br>

## Usage
### Functions
1. addPersonalTrainer(name, specialty) <br>
Required parameters: **name**, **specialty** <br>
This function adds a personal trainer into the system. <br>
Sample usage:
    ```
    // Add three personal trainers into the system
    gym.addTrainer("Jack Bulldog", "endurance, and flexability");
    gym.addTrainer("Janice Whale", "strength training, and flexability");
    gym.addTrainer("Willy Wonka", "weight loss, strength training, flexability, and Horse kicking");
    ```
<br>

2. viewAllTrainers() <br>
No parameters required. This function displays all personal trainers with corresponding name and specialty. <br>
Call the function:
    ```
    // View details of all personal trainers
    const allTrainers = gymController.viewAllTrainers();

    console.log("Registered Personal Trainers (PT):");
    allTrainers.forEach(trainer => {
        console.log(`NAME: ${trainer.name}, SPECIALTY: ${trainer.specialty}`);
    });
    ```
    Expected Output:
    ```
    Registered Personal Trainers (PT):
    NAME: Jack Bulldog, SPECIALTY: endurance, and flexability
    NAME: Janice Whale, SPECIALTY: strength training, and flexability
    NAME: Willy Wonka, SPECIALTY: weight loss, strength training, flexability, and Horse kicking
    ```
<br>

3. trainerSelectSessions(name, ...selectedSessions) <br>
Required parameters: **name** (must be existing trainer), **time slot** (can provide more than 3) <br>
This function allows registered personal trainers in the system to select sessions to be on duty. <br>
Sample usage:
    ```
    // User must select at least 3 time slots
    gym.trainerSelectSessions('Jack Bulldog', '05:00 - 07:00', '07:00 - 09:00', '09:00 - 11:00');
    gym.trainerSelectSessions('Janice Whale', '05:00 - 07:00', '11:00 - 13:00','13:00 - 15:00', '15:00 - 17:00');
    gym.trainerSelectSessions('Willy Wonka', '17:00 - 19:00', '19:00 - 21:00', '21:00 - 23:00');
    ```
<br>

4. viewAvailablePTsessions() <br>
No parameters required. This function displays all available personal trainer sessions. <br>
Call the function:
    ```
    // View all available personal trainer sessions
    const availableSessions = gym.viewAvailablePTsessions();
    console.log("Available Personal Trainer Sessions:");
    availableSessions.forEach(session => {
        console.log(session);
    });
    ```
    Note: To view updated available sessions, move this function call after the bookGym function (bookGym booking must be successful to have an update). <br>

    Expected output:
    ```
    Available Personal Trainer Sessions:
    Jack Bulldog is available for session 05:00 - 07:00
    Jack Bulldog is available for session 07:00 - 09:00
    Jack Bulldog is available for session 09:00 - 11:00
    Janice Whale is available for session 05:00 - 07:00
    Janice Whale is available for session 11:00 - 13:00
    Janice Whale is available for session 13:00 - 15:00
    Janice Whale is available for session 15:00 - 17:00
    Willy Wonka is available for session 17:00 - 19:00
    Willy Wonka is available for session 19:00 - 21:00
    Willy Wonka is available for session 21:00 - 23:00
    ```
<br>

5. bookGym(name, contact, fitnessGoal, preferredSessionTime) <br>
Required parameters: **name**, **contact**(optional), **fitness goal**, **desired time slot** <br>
This function allows members to book gym sessions based on fitness goals and preferred timing or just book a general session with a PT. <br>
Sample usage:
    ```
    // User book a session with a PT based on fitness goals and preferred timing OR User book a general session with a PT
    const bookGym1 = gym.bookGym('Kacey More', '8123456', 'flexability', '09:00 - 11:00');
    console.log(bookGym1);

    // User book general session without specific fitness goal but with personal trainer
    const bookGym2 = gym.bookGym('Red Matt', '82593939', '', '21:00 - 23:00');
    console.log(bookGym2);
    ```

    Expected output:
    ```
    Hi Kacey More, your booking is successful! Jack Bulldog will be your personal trainer for your fitness goal: FLEXABILITY at 09:00 - 11:00.
    Hi Red Matt, your booking is successful! You have a general session at 21:00 - 23:00 with no targetted fitness goal with Willy Wonka.
    ```