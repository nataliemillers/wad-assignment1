// Gym Portal Node Module

// Simulate database using arrays
const trainerController = {
    trainers: [],
    PTsessions: [
        { time: '05:00 - 07:00', booked: false },
        { time: '07:00 - 09:00', booked: false },
        { time: '09:00 - 11:00', booked: false },
        { time: '11:00 - 13:00', booked: false },
        { time: '13:00 - 15:00', booked: false },
        { time: '15:00 - 17:00', booked: false },
        { time: '17:00 - 19:00', booked: false },
        { time: '19:00 - 21:00', booked: false },
        { time: '21:00 - 23:00', booked: false },
    ],
    bookedSessions: [],
};

const memberController = {
    members: [],
    timeslots: [
        { time: '05:00 - 07:00', booked: false },
        { time: '07:00 - 09:00', booked: false },
        { time: '09:00 - 11:00', booked: false },
        { time: '11:00 - 13:00', booked: false },
        { time: '13:00 - 15:00', booked: false },
        { time: '15:00 - 17:00', booked: false },
        { time: '17:00 - 19:00', booked: false },
        { time: '19:00 - 21:00', booked: false },
        { time: '21:00 - 23:00', booked: false },
    ],
}

// Function 1: Add newly hired trainer into the system
function addTrainer(name, specialty) {
    // create a new trainer object with an empty array for selected sessions
    const newTrainer = {
        name: name,
        specialty: specialty,
        selectedSessions: [],
    };
    // add the newly created trainer to the list of trainers in the simulated database
    trainerController.trainers.push(newTrainer);
}

// Function 2: Allow trainer to select at least 3 time slots to achieve minimum working hours
function trainerSelectSessions(name, ...selectedSessions) {
    // find the trainer in the list of registered trainers
    const trainer = trainerController.trainers.find(trainer => trainer.name === name);

    // check if trainer is found
    if (trainer) {
        // check if the trainer has selected at least 3 time slots
        if (selectedSessions.length >= 3) {
            // assign the selected time slots to the trainer
            trainer.selectedSessions = selectedSessions;
        } else {
            // display error message if trainer has not selected enough time slots
            console.log("You are required to select at least 3 time slots.");
        }
    } else {
        // display error message if the trainer is not registered
        console.log("You are not a registered trainer!");
    }
}

// Function 4: View all available personal trainer sessions
function viewAvailablePTsessions() {
    // array to store available sessions
    const availableSessions = [];

    // check if each trainer has selected sessions 
    trainerController.trainers.forEach(trainer => {
        if (trainer.selectedSessions && trainer.selectedSessions.length > 0) {
            trainer.selectedSessions.forEach(session => {
                // add the trainer and session to the available sessions array
                availableSessions.push({ trainer: trainer.name, session: session });
            });
        }
    });

    // format the output for readability
    const formatOutput = availableSessions.map(entry => {
        return `${entry.trainer} is available for session ${entry.session}`;
    });
    return formatOutput;
}

// Function 3: Users to view all personal trainers
function viewAllTrainers() {
    return trainerController.trainers;
}

// Function 5: Allow members to book PT sessions based on their fitness goal or desired session time
function bookGym(name, contact, fitnessGoal, preferredSessionTime) {
    // create a member object with provided details
    const member = {
        name: name,
        contact: contact,
        fitnessGoal: fitnessGoal,
        preferredSessionTime: preferredSessionTime,
    };

    // check if a preferred session time is provided
    if (preferredSessionTime) {
        // check if a fitness goal is provided
        if (fitnessGoal) {
            // filter available trainers based on the preferred session time and fitness goal
            const availableTrainers = trainerController.trainers.filter((trainer) =>
                trainer.selectedSessions.includes(preferredSessionTime) && trainer.specialty.toLowerCase().includes(fitnessGoal.toLowerCase())
            );

            // if available trainers are found
            if (availableTrainers.length > 0) {
                // find the booked session in the time slots
                const bookedSession = memberController.timeslots.find(
                    (session) => session.time === preferredSessionTime
                );

                // if the session is found
                if (bookedSession) {
                    // update session details and assigned trainer
                    bookedSession.booked = true;
                    bookedSession.bookedMembers = bookedSession.bookedMembers || [];
                    bookedSession.bookedMembers.push(member.name);

                    // assign the first available trainer and update selected sessions
                    const assignedTrainer = availableTrainers[0];
                    assignedTrainer.selectedSessions = assignedTrainer.selectedSessions.filter(
                        (session) => session !== preferredSessionTime
                    );

                    // return a success message
                    return `Hi ${member.name}, your booking is successful! ${assignedTrainer.name} will be your personal trainer for your fitness goal: ${fitnessGoal.toUpperCase()} at ${preferredSessionTime}.`;
                } else {
                    // return a message if the selected session in unavailable
                    return "Selected session is unavailable. Please choose another time.";
                }
            } else {
                // return a message if no available trainers are found
                return `Sorry ${name}, no available trainers for your preferred session tie or fitness goal. Please choose another time or specify a different fitness goal.`;
            }
        } else {
            // handle booking for a general session without a fitness goal
            // find the booked session index in the timeslots
            const bookedSessionIndex = memberController.timeslots.findIndex(
                (session) => session.time === preferredSessionTime
            );

            // if the session is found
            if (bookedSessionIndex !== -1) {
                // update session details and assigned trainer
                const bookedSession = memberController.timeslots[bookedSessionIndex];
                bookedSession.booked = true;
                bookedSession.bookedMembers = bookedSession.bookedMembers || [];
                bookedSession.bookedMembers.push(member.name);

                // find a trainer with the provided session time for a general session
                const assignedTrainer = trainerController.trainers.find(
                    (trainer) => trainer.selectedSessions.includes(preferredSessionTime)
                );

                // if an assigned trainer is found
                if (assignedTrainer) {
                    // update the selected sessions of the trainer
                    assignedTrainer.selectedSessions = assignedTrainer.selectedSessions.filter(
                        (session) => session !== preferredSessionTime
                    );
                }

                // return a success message
                return `Hi ${member.name}, your booking is successful! You have a general session at ${preferredSessionTime} with no targetted fitness goal with ${assignedTrainer.name}.`;
            } else {
                // return a message if the selected session is unavailable
                return "Selected session is unavailable. Please choose another time.";
            }
        }
    } else {
        // return a message if no preferred session time is provided
        return "Please provide your preferred session time.";
    }
}

// Function 6: Display members and their registered timing
function displayAllMemberSchedule() {
    // array to store members data
    const membersData = [];

    // check if the session is booked and booked members
    memberController.timeslots.forEach(session => {
        if (session.booked && session.bookedMembers && session.bookedMembers.length > 0) {
            session.bookedMembers.forEach(bookedMember => {
                membersData.push({
                    name: bookedMember,
                    registeredTiming: session.time,
                });
            });
        }
    });
    return membersData;
}



module.exports = {
    addTrainer,
    trainerSelectSessions,
    viewAvailablePTsessions,
    viewAllTrainers,
    bookGym,
    displayAllMemberSchedule
};