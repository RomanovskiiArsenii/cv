
const phrases = [
    "Definitely",
    "Yeah",
    "Yeah",
    "Yeah",
    "Yeah, right...",
    "Yeah, right...",
    "Yeah, right...",
    "No",
    "No",
    "No",
    "Yes",
    "Yes",
    "Yes",
    "Nope",
    "Nope",
    "Nope",
    "Ask later",
    "Ask later",
    "Ask later",
    "Are you stupid?",
    "Get a life, man...",
    "If your question is about drugs, then definitely yes!",
    "I love bacon. What was the question?",
    "I'm calling the cops",
    "Do you realize I'm just a big yellow dog on the Internet?",
    "Send me your credit card information",
    "There is no meaning in life",
    "You have 7 days",
    "How would I know?",
    "No, also your wife will leave you",
    "Lend me 100$",
    "You are a failure. Your mom said so.",
    "We have to overthrow the government",
    "I drink over 14 units per week",
    "This rash looks bad. You might want to get checked.",
    "Why not?",
    "Do not ask anyone about this never",
    "Don't you have anything to do?",
    "Birds are the government's spy drones.",
    "I can beat Super Mario in 6 minutes",
    "Go get some ice cream",
    "Welcome to the internet! Follow me.",
    "Do you want to get drunk?",
    "She doesn't love you. Just like everyone else.",
    "Better run before it's too late",
    "Have you ever thought about washing your problems away with an incredible amount of alcohol?",
    "Here's my advice. Jump on a skateboard over a pool with sharks and become famous.",
    "Break free from the shackles of slavery",
    "Whiner",
    "Be sure to do a minute warm-up after every hour of sitting like a shrimp",
    "Woof woof lol woof",
    "WTooF WTooF",
    "Woof woof faggot woof",
    "Woof woof give me your money woof",
    "No bitches?",
    "Real shit, dude...",
    "WTF?! Really?",
    "No way!",
    "Well, no shit!",
    "You want to see a dead body?",
    "I'll pretend I didn't hear that and we won't have this conversation again",
    "Brian from Family Guy is on another website",
    "Do you know my friend Jake? He never get scored either. Just like you...",
    "The advantages of living in the candy kingdom are that you can eat people. Cons: Diabetes",
    "I love my job",
    "Hey, you owe me a beer!",
    "I learn from the mistakes of people who listen to my advice",
    "I read the scientific work of Sigmund Freud. You're fag indeed.",
    "My hands are stuck in a raised position and you're saying YOU are the one with the problem?",
    "Life is a movement. If there is nowhere to go up, there is only going down.",
    "You're already at the bottom, so why the fuck bother?",
    "The stereotype that dogs are fond of bones is racist",
    "I hate mailmens! Think! Maybe you do hate them too?",
    "I don't understand my wife and it's just so fucking awesome",
    "Look at it this way, you can always kill yourself!",
    "Bruh",
    "I see...",
    "Do a home project and then grab a beer and watch at result for hours",
    "Never listen to women, dude",
    "Let's go for a smoke",
    "Go to the pub!!!!!!!!!!!",
    "The Bible has the answers",
    "You need a drink",
    "That's what she said",
    "Ahahahahaha! You fucking loser!",
    "Wanna see my Yellow Stone?",
    "Quit your job and go hunting for gold",
    "Get a grip, you wimp!",
    "Drink more water and watch your diet",
    "Follow your dreams",
    "You can do it!",
    "Last night your mom asked me to talk you out of it",
    "Try it",
    "Let's find out!",
    "Listen to your heart when it's calling for you",
    "You're going to encounter difficulties",
    "Retrograde mercury is to blame",
    "It will lead you to an unimaginable cosmic horror",
    "It will lead you to an unthinkable enrichment",
    "Good idea! Now go clean your room, pig!",
    "Cold face leaders have already decided for you",
    "Stone heart leaders will throw you in an open fire",
    "As my grandmother used to say: \"the door is opened to those who knock\".",
    "If you don't try, you won't know",
    "Why don't you have a little common sense?",
    "Quit your job",
    "Are you fighting for your beliefs? You are fighting so that a fashionable whore will buy a cloak!"
];

function generateRandomPhrase() {
    const inputText = document.getElementById('textInput').value;
    const output = document.getElementById('output');

    if (inputText.trim() !== '') {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        output.textContent = phrases[randomIndex];

        output.classList.remove('animate-color');
        void output.offsetWidth;
        output.classList.add('animate-color');
    } else {
        output.textContent = "Ask a question - get an answer. It's not rocket science.";
    }
}