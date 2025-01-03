const formCSS = (primary, secondary) =>{
  return `

  #trs-form {
    font-family: 'Poppins', sans-serif !important;
    min-height: 20vh;
    background: linear-gradient(135deg, #4285f4, #34a5e5);
    margin: 0;
    padding: 20px;
    
    .container{
      width:fit-content;
      margin: 20px auto;
    }

    .tabs {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .hidden{
      display: none !important; 
    }

     button {
      display: block;
      max-width:200px;
      width:200px;
      background: ${secondary};
      color: white;
      border: none;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      font-size: 20px;
      cursor: pointer;
      transition: background 0.3s;
      font-weight: 600;
      margin: -1px;
      text-transform: uppercase;
    }

    button:hover {
      background: ${primary};
    }

    .tab-btn {
      cursor: pointer;
      float: left;
      font-size: 12px;
      margin: 0;
      padding: 4px;
      text-align: center;
      width: 100px;
      font-weight: 600;
      border-radius: 20px;
      margin-right: 1px;
      color: ${primary};
      opacity: 70%;
    }

    .tab-btn.active, .tab-btn:hover {
      background: ${secondary};
      color: ${primary};
      padding: 4px;
      opacity: 100%;
    }

    form {
      width:1375px;
      max-width: 1375px;
      background: #f9f9f9;
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      overflow: hidden;
    }
      
    .form-group {
      max-width: 100%;
      position: relative;
    }
    
    .form-group:not(first-child) {
      border-left: 1px solid #ddd;
    }
      
    .form-group.to::before {
      content: '\\f2f1';
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      position: absolute;
      top: 50%;
      left: -16px;
      transform: translateY(-50%);
      color: ${primary};
      background: ${secondary};
      border-radius: 100%;
      padding: 8px;
      font-size: 16px;
      z-index:100;
    }

    label {
      position: absolute;
      display: block;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 5px;
      opacity: 60%;
      padding: 20px 28px 20px 28px;
      text-transform: uppercase;
    }

    input,textarea,select {
      min-width: 250px;
      padding: 45px 28px 20px 28px;
      font-size: 20px;
      background: #f9f9f9;
      border-radius: 4px;
      border: none; 
      box-sizing: border-box;
      transition: border-color 0.3s;
    }

    input:focus,textarea:focus,select:focus {
      border: none; 
      outline: none; 
      background:#c9c9c9;
    }

    input::placeholder,textarea::placeholder,select::placeholder {
      color: ${primary};
    }
    input:focus:placeholder,textarea::placeholder:focus,select::placeholder:focus {
      background:#c9c9c9;
      color: ${secondary};
    }
    
    .fullValue{
      max-height:10px;
      font-size: 12px;
      padding: 0px 20px 10px 20px;
      overflow: hidden;
    }

    .input-error {
      border-color: #ff4d4d;
    }

    .error-message {
      color: #ff4d4d;
      font-size: 12px;
      margin-top: 5px;
      }
  }
`;
}

// Function to create a form dynamically
function createForm(formConfig, targetElement) {
  const form = document.createElement('form');
  const { fields, submitText, tabs } = formConfig
  const { primary, secondary } = formConfig.CSS
  console.log("formConfig",formConfig)
  const Container = document.createElement('div')
  Container.className = 'container'
  const poppinsFont = document.createElement('link');
  const fontAwesome = document.createElement('link');
  const TabGroup = document.createElement('div');
  TabGroup.className = 'tabs';

  // Set the attributes for the <link> element
  poppinsFont.rel = 'stylesheet';
  poppinsFont.href = 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
  fontAwesome.rel = 'stylesheet';
  fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"

  // Append the <link> element to the <head> of the document
  document.head.appendChild(poppinsFont);
  document.head.appendChild(fontAwesome);

  fields.forEach(field => {
    const formGroup = document.createElement('div');
    formGroup.className = `form-group ${field.name}`;

    const label = document.createElement('label');
    label.setAttribute('for', field.name);
    label.textContent = field.label;

    const input = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');
    input.setAttribute('type', field.type || 'text');
    input.setAttribute('name', field.name);
    input.setAttribute('placeholder', field.placeholder || '');
    input.required = field.required || false;

    // const fullValue = document.createElement('div');
    // fullValue.className = 'fullValue';
    // fullValue.innerHTML = 'fullValue';

    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message hidden';

    formGroup.appendChild(label);
    formGroup.appendChild(input);
    // formGroup.appendChild(fullValue);
    formGroup.appendChild(errorMessage);
    form.appendChild(formGroup);
  });

  
  if (tabs.length > 0) {


    const formGroup = document.createElement('div');
    formGroup.className = `form-group service hidden`;
    
    tabs.filter(tab => tab.trim() !== '').forEach((tab, index) => {
      const Tab = document.createElement('span');
      Tab.className = index === 0 ? 'tab-btn active' : 'tab-btn';
      Tab.textContent = tab;

      const input = document.createElement('input');
      input.setAttribute('type', 'radio');
      input.setAttribute('name', 'service');
      input.setAttribute('value', tab);
      input.required = false;

      input.checked = index === 0 ? true : false;

      formGroup.appendChild(input);

      Tab.addEventListener('click', () => {
        // Remove 'active' class from all tabs
        Array.from(TabGroup.children).forEach(otherTab => {
          otherTab.classList.remove('active');
          input.checked = false;
        });

        Array.from(form.children).forEach(formGroup => {
          if(formGroup.classList.contains("service") ||formGroup.classList.contains("domainName")||(formGroup.classList.contains("dropDate") && !tab.includes('Outstation')) ) formGroup.classList.add('hidden');
          else formGroup.classList.remove('hidden');
        });
        input.checked = true;
        // Add 'active' class to the clicked tab
        Tab.classList.add('active');
    });
      TabGroup.appendChild(Tab);
      form.appendChild(formGroup);
    });
  }

  const domainName = document.createElement('input');
  domainName.setAttribute('type', 'text');
  domainName.setAttribute('name', 'domainName');
  domainName.setAttribute('value', formConfig.Name);

  const formGroup = document.createElement('div');
  formGroup.className = `form-group domainName hidden`;
  formGroup.appendChild(domainName);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = submitText;

  form.appendChild(formGroup);
  form.appendChild(submitButton);

  form.addEventListener('submit', validateForm);  
  Container.appendChild(TabGroup);
  Container.appendChild(form);
  targetElement.appendChild(Container);

  // Inject CSS into the document
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = formCSS(primary, secondary);
  document.head.appendChild(styleSheet);
}

// Basic Validation Example
function validateForm(event) {
  event.preventDefault();
  const form = event.target;
  console.log("form",form)
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  let valid = true;
  let value = []
  let domainName = ''

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
    const AllInputs = form.querySelectorAll('input, textarea');
    AllInputs.forEach(input => {
      console.log("input.name",input.name)
      if((input.name!='domainName' && input.name!='service' )|| (input.name=='service' && input.checked)) value.push(`${input.name}=${input.value.trim()}`)
      else  if( input.name=='domainName') domainName = input.value.trim()
    })
    alert('Form submitted successfully!');
    window.location.href=`http://${String(domainName).toLowerCase()}.localhost:3000?${value.join('&')}`
    // window.location.href=`https://${String(domainName).toLowerCase()}.taxiengine360.tools.thefusionapps.com?${value.join('&')}`
    // form.reset();
  }
}

// Fetch form configuration from API and render it
async function fetchAndRenderForm() {
  try {
    const response = await fetch('http://localhost:3008/form');
    // const response = await fetch('https://taxi.tools.thefusionapps.com/form');
    if (!response.ok) throw new Error(`Failed to fetch form data: ${response.statusText}`);
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
