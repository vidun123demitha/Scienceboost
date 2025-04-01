// Simulated user ID (in a real app, this would be generated by a backend)
const userId = "user123"; // Replace with a dynamic ID in a real app

// Handle Result Prediction Form Submission
const resultForm = document.getElementById('result-form');
if (resultForm) {
    resultForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userName = document.getElementById('user-name').value;
        const q1 = document.getElementById('q1').value;
        const q2 = document.getElementById('q2').value;
        const q3 = document.getElementById('q3').value;
        const q4 = document.getElementById('q4').value;
        const q5 = document.getElementById('q5').value;
        const q6 = document.getElementById('q6').value;
        const q7 = document.getElementById('q7').value;
        const q8 = document.getElementById('q8').value;

        // Hide form and show loading animation
        resultForm.style.display = 'none';
        document.getElementById('loading').style.display = 'block';

        // Simulate analysis delay
        setTimeout(() => {
            // Hide loading and show predicted result
            document.getElementById('loading').style.display = 'none';
            const resultDiv = document.getElementById('result');
            resultDiv.style.display = 'block';

            // Randomly assign A or B grade
            const grade = Math.random() > 0.5 ? 'A' : 'B';
            document.getElementById('predicted-grade').textContent = grade;

            // Store the entered data in localStorage (simulating a backend)
            const entries = JSON.parse(localStorage.getItem(`entries-${userId}`)) || [];
            entries.push({
                userName,
                q1,
                q2,
                q3,
                q4,
                q5,
                q6,
                q7,
                q8,
                happy: null, // Will be updated after they answer the "happy" question
                timestamp: new Date().toLocaleString()
            });
            localStorage.setItem(`entries-${userId}`, JSON.stringify(entries));
        }, 2000); // 2-second delay for effect
    });
}

// Handle "Are you happy?" Submission
const submitHappyBtn = document.getElementById('submit-happy');
if (submitHappyBtn) {
    submitHappyBtn.addEventListener('click', () => {
        const happyResult = document.getElementById('happy-result').value;
        if (!happyResult) {
            alert('Please select an option!');
            return;
        }

        // Update the entry with the "happy" response
        const entries = JSON.parse(localStorage.getItem(`entries-${userId}`)) || [];
        const latestEntry = entries[entries.length - 1];
        latestEntry.happy = happyResult;
        localStorage.setItem(`entries-${userId}`, JSON.stringify(entries));

        // Hide result and show prank reveal
        document.getElementById('result').style.display = 'none';
        document.getElementById('prank-reveal').style.display = 'block';
    });
}

// Handle Signup Form Submission
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;

        // Hide form and show prank link
        signupForm.style.display = 'none';
        const signupResult = document.getElementById('signup-result');
        signupResult.style.display = 'block';

        // Generate a fake prank link (in a real app, this would be a unique URL)
        const prankLink = `http://scienceresultboost.com/prank/${userId}`;
        document.getElementById('prank-link').href = prankLink;
        document.getElementById('prank-link').textContent = prankLink;

        // Set dashboard link
        document.getElementById('dashboard-link').href = `dashboard.html?user=${userId}`;
    });
}

// Display Entries on Dashboard
const entriesDiv = document.getElementById('entries');
if (entriesDiv) {
    const entries = JSON.parse(localStorage.getItem(`entries-${userId}`)) || [];
    if (entries.length === 0) {
        entriesDiv.innerHTML = '<p>No one has fallen for your prank yet!</p>';
    } else {
        entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('entry');
            entryDiv.innerHTML = `
                <strong>${entry.userName}</strong> answered:<br>
                - Felt ${entry.q1.replace('-', ' ')} for the Science paper.<br>
                - Found ${entry.q2} the hardest.<br>
                - Studied ${entry.q3.replace('-', ' ')} daily.<br>
                - Found ${entry.q4} harder.<br>
                - Was ${entry.q5.replace('-', ' ')} about their answers.<br>
                - ${entry.q6 === 'yes' ? 'Finished' : 'Did not finish'} the paper on time.<br>
                - Practiced ${entry.q7.replace('-', ' ')} past papers.<br>
                - ${entry.q8 === 'yes' ? 'Got' : 'Did not get'} enough sleep.<br>
                - Happy with result: ${entry.happy || 'Not answered yet'}<br>
                (Submitted on ${entry.timestamp})
            `;
            entriesDiv.appendChild(entryDiv);
        });
    }
}