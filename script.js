document.addEventListener('DOMContentLoaded', function() {
    // DBATU Grading System
    const gradePoints = {
        'AA': 10,
        'AB': 9,
        'BB': 8,
        'BC': 7,
        'CC': 6,
        'CD': 5,
        'DD': 4,
        'FF': 0
    };

    // Generate subject inputs in table format
    document.getElementById('generate-subjects').addEventListener('click', function() {
        const subjectCount = parseInt(document.getElementById('subject-count').value);
        const container = document.getElementById('subject-container');
        container.innerHTML = '';
        
        for (let i = 1; i <= subjectCount; i++) {
            const row = document.createElement('tr');
            
            // Subject name cell
            const subjectCell = document.createElement('td');
            subjectCell.textContent = `Subject ${i}`;
            row.appendChild(subjectCell);
            
            // Credits input cell
            const creditCell = document.createElement('td');
            const creditInput = document.createElement('input');
            creditInput.type = 'number';
            creditInput.min = '1';
            creditInput.value = '3';
            creditInput.className = 'credit-input';
            creditInput.dataset.subject = i;
            creditCell.appendChild(creditInput);
            row.appendChild(creditCell);
            
            // Grade select cell
            const gradeCell = document.createElement('td');
            const gradeSelect = document.createElement('select');
            gradeSelect.className = 'grade-select';
            gradeSelect.dataset.subject = i;
            
            // Add grade options
            for (const grade in gradePoints) {
                const option = document.createElement('option');
                option.value = grade;
                option.textContent = grade;
                gradeSelect.appendChild(option);
            }
            
            gradeCell.appendChild(gradeSelect);
            row.appendChild(gradeCell);
            
            container.appendChild(row);
        }
    });

    // Calculate SGPA
    document.getElementById('calculate-sgpa').addEventListener('click', function() {
        const creditInputs = document.querySelectorAll('.credit-input');
        const gradeSelects = document.querySelectorAll('.grade-select');
        
        if (creditInputs.length === 0) {
            alert('Please generate subjects first!');
            return;
        }
        
        let totalGradePoints = 0;
        let totalCredits = 0;
        let isValid = true;
        
        creditInputs.forEach((input, index) => {
            const credits = parseFloat(input.value);
            const grade = gradeSelects[index].value;
            
            if (isNaN(credits) || credits <= 0) {
                isValid = false;
                input.style.border = '1px solid red';
            } else {
                input.style.border = '1px solid var(--border-color)';
                totalGradePoints += credits * gradePoints[grade];
                totalCredits += credits;
            }
        });
        
        if (!isValid) {
            alert('Please enter valid credits for all subjects!');
            return;
        }
        
        const sgpa = totalGradePoints / totalCredits;
        document.getElementById('sgpa-result').innerHTML = `
            <h3>SGPA Result</h3>
            <div class="result-value">${sgpa.toFixed(2)}</div>
            <div class="result-details">
                <p>Total Grade Points: ${totalGradePoints.toFixed(2)}</p>
                <p>Total Credits: ${totalCredits}</p>
            </div>
        `;
    });

    // Generate semester inputs in table format
    document.getElementById('generate-semesters').addEventListener('click', function() {
        const semesterCount = parseInt(document.getElementById('semester-count').value);
        const container = document.getElementById('semester-container');
        container.innerHTML = '';
        
        for (let i = 1; i <= semesterCount; i++) {
            const row = document.createElement('tr');
            
            // Semester name cell
            const semesterCell = document.createElement('td');
            semesterCell.textContent = `Semester ${i}`;
            row.appendChild(semesterCell);
            
            // SGPA input cell
            const sgpaCell = document.createElement('td');
            const sgpaInput = document.createElement('input');
            sgpaInput.type = 'number';
            sgpaInput.step = '0.01';
            sgpaInput.min = '0';
            sgpaInput.max = '10';
            sgpaInput.value = '0';
            sgpaInput.className = 'sgpa-input';
            sgpaInput.dataset.semester = i;
            sgpaCell.appendChild(sgpaInput);
            row.appendChild(sgpaCell);
            
            // Credits input cell
            const creditCell = document.createElement('td');
            const creditInput = document.createElement('input');
            creditInput.type = 'number';
            creditInput.min = '1';
            creditInput.value = '0';
            creditInput.className = 'semester-credit-input';
            creditInput.dataset.semester = i;
            creditCell.appendChild(creditInput);
            row.appendChild(creditCell);
            
            container.appendChild(row);
        }
    });

    // Calculate CGPA
    document.getElementById('calculate-cgpa').addEventListener('click', function() {
        const sgpaInputs = document.querySelectorAll('.sgpa-input');
        const creditInputs = document.querySelectorAll('.semester-credit-input');
        
        if (sgpaInputs.length === 0) {
            alert('Please generate semesters first!');
            return;
        }
        
        let totalWeightedSgpa = 0;
        let totalCredits = 0;
        let isValid = true;
        
        sgpaInputs.forEach((input, index) => {
            const sgpa = parseFloat(input.value);
            const credits = parseFloat(creditInputs[index].value);
            
            if (isNaN(sgpa)) {
                isValid = false;
                input.style.border = '1px solid red';
            } else {
                input.style.border = '1px solid var(--border-color)';
            }
            
            if (isNaN(credits) || credits <= 0) {
                isValid = false;
                creditInputs[index].style.border = '1px solid red';
            } else {
                creditInputs[index].style.border = '1px solid var(--border-color)';
            }
            
            if (!isNaN(sgpa) && !isNaN(credits) && credits > 0) {
                totalWeightedSgpa += sgpa * credits;
                totalCredits += credits;
            }
        });
        
        if (!isValid) {
            alert('Please enter valid SGPA and credits for all semesters!');
            return;
        }
        
        const cgpa = totalWeightedSgpa / totalCredits;
        document.getElementById('cgpa-result').innerHTML = `
            <h3>CGPA Result</h3>
            <div class="result-value">${isNaN(cgpa) ? '0.00' : cgpa.toFixed(2)}</div>
            <div class="result-details">
                <p>Total Weighted SGPA: ${totalWeightedSgpa.toFixed(2)}</p>
                <p>Total Credits: ${totalCredits}</p>
            </div>
        `;
    });

    // Initialize with default subjects
    document.getElementById('generate-subjects').click();
    document.getElementById('generate-semesters').click();
});