let gameState = {
    hasCheckedSystem: false,
    hasHeardVoice: false,
    hasSeenTrapdoor: false,
    hasCheckedLog: false
};

document.getElementById('command').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        let command = this.value.toLowerCase().trim();
        let terminal = document.getElementById('terminal');
        
        terminal.innerHTML += `<p><span class="prompt">></span> ${this.value}</p>`;

        switch(command) {
            case 'help':
                terminal.innerHTML += `
                    <p>Available commands:</p>
                    <p>CHECK - Inspect the system status</p>
                    <p>PHONE - Listen to the phone line</p>
                    <p>LOOK - Examine your surroundings</p>
                    <p>LOG - View the system log</p>
                    ${gameState.hasCheckedSystem ? '<p>HOME - End your shift and go home</p>' : ''}
                    <p>EXIT - Shut down the terminal</p>
                `;
                break;
            case 'check':
                terminal.innerHTML += `
                    <p>Checking modem system...</p>
                    <p>Status: Modem active, but signal is erratic.</p>
                    <p>Hmm... maybe the phone line’s the issue?</p>
                `;
                gameState.hasCheckedSystem = true;
                terminal.innerHTML += `
                    <p>[Shift Progress: You’ve done your first task. Type HOME to clock out, or keep digging.]</p>
                `;
                break;
            case 'phone':
                terminal.innerHTML += `
                    <p>You pick up the receiver. Static crackles...</p>
                    <p>Wait—there’s a faint voice: "...help... basement..."</p>
                    <p>That didn’t sound like a client. Creepy.</p>
                `;
                gameState.hasHeardVoice = true;
                break;
            case 'look':
                terminal.innerHTML += `
                    <p>You glance around the office.</p>
                    <p>A flickering fluorescent light, a dusty desk, and a ModemTech manual.</p>
                    <p>There’s a trapdoor in the corner. Weird for an office...</p>
                `;
                gameState.hasSeenTrapdoor = true;
                break;
            case 'log':
                terminal.innerHTML += `
                    <p>Accessing system log...</p>
                    <p>03/08/95 23:14 - Unknown signal detected</p>
                    <p>03/09/95 07:02 - Modem reset by unknown user</p>
                    <p>Someone’s been messing with this system.</p>
                `;
                gameState.hasCheckedLog = true;
                break;
            case 'home':
                if (!gameState.hasCheckedSystem) {
                    terminal.innerHTML += `
                        <p>You haven’t done anything yet! Check the system first.</p>
                    `;
                } else {
                    terminal.innerHTML += `
                        <p>It’s 5:00 PM. You clock out and head home.</p>
                        <p>The boss nods: "Not bad for a first day. See you tomorrow."</p>
                    `;
                    if (gameState.hasHeardVoice || gameState.hasSeenTrapdoor || gameState.hasCheckedLog) {
                        terminal.innerHTML += `
                            <p>...But that voice, the trapdoor, the log—something’s nagging at you.</p>
                            <p>[Game Over - For now. Restart to investigate further?]</p>
                        `;
                    } else {
                        terminal.innerHTML += `
                            <p>A quiet first day. Nothing strange here.</p>
                            <p>[Game Over - Day 1 Complete]</p>
                        `;
                    }
                    setTimeout(() => terminal.innerHTML = '<p>Terminal offline. Thanks for playing!</p>', 2000);
                }
                break;
            case 'exit':
                terminal.innerHTML += `
                    <p>Shutting down terminal...</p>
                    <p>See you tomorrow, Jason—unless you’re curious about that basement...</p>
                `;
                setTimeout(() => terminal.innerHTML = '<p>Terminal offline.</p>', 1000);
                break;
            default:
                terminal.innerHTML += `
                    <p>ERROR: Command "${command}" not recognized.</p>
                    <p>Type <span class="blink">HELP</span> for options.</p>
                `;
        }

        terminal.scrollTop = terminal.scrollHeight;
        this.value = '';
    }
});