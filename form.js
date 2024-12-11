// CSS as a string
const formCSS = `
  form {
    font-family: Arial, sans-serif;
    max-width: 400px;
    margin: 20px auto;
    background: #f9f9f9;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  input, textarea, select {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    transition: border-color 0.3s;
  }

  input:focus, textarea:focus, select:focus {
    border-color: #007BFF;
    outline: none;
  }

  button {
    display: block;
    width: 100%;
    background: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s;
  }

  button:hover {
    background: #0056b3;
  }

  .input-error {
    border-color: #ff4d4d;
  }

  .error-message {
    color: #ff4d4d;
    font-size: 12px;
    margin-top: 5px;
  }
`;

// Inject CSS into the document
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = formCSS;
document.head.appendChild(styleSheet);

// Function to create a form dynamically
function createForm(formConfig, targetElement) {
  const form = document.createElement('form');
  formConfig.fields.forEach(field => {
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';

    const label = document.createElement('label');
    label.setAttribute('for', field.name);
    label.textContent = field.label;

    const input = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');
    input.setAttribute('type', field.type || 'text');
    input.setAttribute('name', field.name);
    input.setAttribute('placeholder', field.placeholder || '');
    input.required = field.required || false;

    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';

    formGroup.appendChild(label);
    formGroup.appendChild(input);
    formGroup.appendChild(errorMessage);
    form.appendChild(formGroup);
  });

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = formConfig.submitText || 'Submit';
  form.appendChild(submitButton);

  form.addEventListener('submit', validateForm);
  targetElement.appendChild(form);
}

// Basic Validation Example
function validateForm(event) {
  event.preventDefault();
  const form = event.target;
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let valid = true;

  inputs.forEach(input => {
    const errorMsg = input.nextElementSibling;
    if (input.value.trim() === '') {
      input.classList.add('input-error');
      errorMsg.textContent = `${input.placeholder} is required.`;
      valid = false;
    } else {
      input.classList.remove('input-error');
      errorMsg.textContent = '';
    }
  });

  if (valid) {
    alert('Form submitted successfully!');
    form.reset();
  }
}

// Fetch form configuration from API and render it
async function fetchAndRenderForm() {
  try {
    const response = await fetch('https://taxi.tools.thefusionapps.com/form');
    if (!response.ok) throw new Error('Failed to fetch form data');
    const formConfig = await response.json();

    const targetElement = document.getElementById('trs-form');
    await Array.from(targetElement.children).forEach(child => {
      child.style.display = 'none';
    });
    if (targetElement) {
      createForm(formConfig, targetElement);
    } else {
      console.error('Target element not found');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Example Usage: Fetch a form configuration and render it
// Uncomment and replace 'API_URL' and 'TARGET_ELEMENT_ID' with actual values
fetchAndRenderForm();
