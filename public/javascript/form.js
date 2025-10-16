document.addEventListener('DOMContentLoaded', function () {
    console.log('Form validation script loaded');

    const form = document.querySelector('form');
    const successBanner = document.getElementById('successBanner');

    if (!form) {
        console.error('Form not found!');
        return;
    }

    // Check if we just submitted successfully (using sessionStorage)
    if (sessionStorage.getItem('formSubmitted') === 'true') {
        showSuccessBanner();
        sessionStorage.removeItem('formSubmitted');  
    }

    // Form submission handler
    form.addEventListener('submit', function (e) {
        console.log('Form submission intercepted');

        // Validate form first
        const isValid = validateForm();

        if (!isValid) {
            e.preventDefault();
            console.log('Form validation failed - preventing submission');

            // Scroll to first error
            const firstError = document.querySelector('.invalid');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        } else {
            console.log('Form is valid - allowing submission to MongoDB');
            // Set flag to show success banner after page reload
            sessionStorage.setItem('formSubmitted', 'true');
        }
    });

    // Add event listeners for real-time validation
    initializeEventListeners();

    function initializeEventListeners() {
        // Text fields - validate on input and blur
        const textFields = ['fname', 'lname', 'residence'];
        textFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('input', function () {
                    if (field.value.trim()) {
                        clearError(field);
                    }
                });
                field.addEventListener('blur', function () {
                    validateField(fieldId, 'This field is required');
                });
            }
        });

        // Select fields 
        const selectFields = ['course', 'entry', 'intake', 'sponsorship'];
        selectFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('change', function () {
                    validateSelect(fieldId, 'This field is required');
                });
            }
        });

        // Gender radio buttons
        const genderRadios = document.querySelectorAll('input[name="gender"]');
        genderRadios.forEach(radio => {
            radio.addEventListener('change', function () {
                validateGender();
            });
        });

        // Date of birth
        const dobField = document.getElementById('dob');
        if (dobField) {
            dobField.addEventListener('change', function () {
                validateDob();
            });
            dobField.addEventListener('input', function () {
                if (dobField.value) {
                    clearError(dobField);
                }
            });
        }
    }

    function validateForm() {
        resetErrors();

        const validations = [
            validateField('fname', 'This field is required'),
            validateField('lname', 'This field is required'),
            validateSelect('course', 'This field is required'),
            validateSelect('entry', 'This field is required'),
            validateSelect('intake', 'This field is required'),
            validateSelect('sponsorship', 'This field is required'),
            validateGender(),
            validateDob(),
            validateField('residence', 'This field is required')
        ];

        return validations.every(validation => validation === true);
    }

    function validateField(fieldId, errorMessage) {
        const field = document.getElementById(fieldId);
        if (!field) return false;

        const value = field.value.trim();
        if (!value) {
            showError(field, errorMessage);
            return false;
        }
        clearError(field);
        return true;
    }

    function validateSelect(selectId, errorMessage) {
        const select = document.getElementById(selectId);
        if (!select) return false;

        const value = select.value;
        if (!value || value === "") {
            showError(select, errorMessage);
            return false;
        }
        clearError(select);
        return true;
    }

    function validateGender() {
        const genderSelected = document.querySelector('input[name="gender"]:checked');
        const genderGroup = document.querySelector('.gender-group');

        if (!genderSelected) {
            let errorElement = genderGroup.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                // Insert after gender options
                genderGroup.querySelector('.gender-options').after(errorElement);
            }
            errorElement.textContent = 'This field is required';
            genderGroup.classList.add('invalid');
            return false;
        } else {
            const errorElement = genderGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
            genderGroup.classList.remove('invalid');
            return true;
        }
    }

    function validateDob() {
        const dobField = document.getElementById('dob');
        if (!dobField) return false;

        const dobValue = dobField.value;
        if (!dobValue) {
            showError(dobField, 'This field is required');
            return false;
        }

        const selectedDate = new Date(dobValue);
        const today = new Date();

        if (selectedDate > today) {
            showError(dobField, 'Date of Birth cannot be in the future');
            return false;
        }

        const minAgeDate = new Date();
        minAgeDate.setFullYear(today.getFullYear() - 16);

        if (selectedDate > minAgeDate) {
            showError(dobField, 'You must be at least 16 years old');
            return false;
        }

        clearError(dobField);
        return true;
    }

    function showError(field, message) {
        clearError(field);
        field.classList.add('invalid');

        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        errorElement.style.fontWeight = 'bold';

        field.parentNode.appendChild(errorElement);
    }

    function clearError(field) {
        field.classList.remove('invalid');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    function resetErrors() {
        document.querySelectorAll('input, select').forEach(field => {
            clearError(field);
        });

        const genderGroup = document.querySelector('.gender-group');
        if (genderGroup) {
            genderGroup.classList.remove('invalid');
            const genderError = genderGroup.querySelector('.error-message');
            if (genderError) {
                genderError.remove();
            }
        }
    }

    // Show success banner
    function showSuccessBanner() {
        if (successBanner) {
            successBanner.style.display = 'block';

            // Auto hide after 5 seconds
            setTimeout(() => {
                successBanner.style.display = 'none';
            }, 5000);

            // Scroll to top to show the banner
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});