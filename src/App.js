import React from 'react';
import axios from 'axios';
import './App.css';

const INITIAL_PARTNER_FORM_CONTROLS = {
  name: {
    value: '',
    placeholder: 'aviatrix',
    required: true
  },
  action: {
    value: '',
    placeholder: 'create',
    required: true
  },
  domain: {
    value: '',
    placeholder: 'aviatrix.com',
    required: true
  },
  email: {
    value: '',
    placeholder: 'samg@aviatrix.com',
    required: true
  }
};

const INITIAL_USER_FORM_CONTROLS = {
  action: {
    value: '',
    placeholder: 'create',
    required: true
  },
  domain: {
    value: '',
    placeholder: 'jelecos.com',
    required: true
  },
  customer_name: {
    value: '',
    placeholder: 'Aviatrix IO',
    required: true
  },
  customer_domain: {
    value: '',
    placeholder: 'aviatrix.io',
    required: true
  },
  customer_email: {
    value: '',
    placeholder: 'samg@aviatrix.com',
    required: true
  }
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      displayPartnerForm: true,
      displayUserForm: true,
      displayOkPartnerStatus: true,
      displayOkUserStatus: true,
      partnerFormControl: INITIAL_PARTNER_FORM_CONTROLS,
      userFormControl: INITIAL_USER_FORM_CONTROLS,
      checkedOne: true,
      partnerErrorMessage: '',
      userErrorMessage: '',
    };

    this.axiosInstance = axios.create({
      baseURL: 'https://api-dev.aviatrix.io/dev/',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.partnerHandleSubmit = this.partnerHandleSubmit.bind(this);
    this.partnerHandleChange = this.partnerHandleChange.bind(this);
    this.userHandleSubmit = this.userHandleSubmit.bind(this);
    this.userHandleChange = this.userHandleChange.bind(this);
    this.handlePartnerButtonClick = this.handlePartnerButtonClick.bind(this);
    this.handleUserButtonClick = this.handleUserButtonClick.bind(this);
    this.radioOnChange = this.radioOnChange.bind(this);
  }

  async partnerHandleSubmit(event) {
    event.preventDefault(); 
    const {action, name, domain, email} = this.state.partnerFormControl;
    const response = await this.axiosInstance.post('partner_acct', {
      action: action.value,
      name: name.value,
      domain:domain.value,
      email: email.value
    });
    let okay = true;
    let errorMessage = '';

    if(response.data.Status !== 'Success') {
      okay = false;
      errorMessage = response.data.Reason;
    }

    this.setState({
      displayPartnerForm: false,
      displayOkPartnerStatus: okay,
      partnerErrorMessage: errorMessage
    });
  }

  async userHandleSubmit(event) {
    event.preventDefault(); 
    const {action, domain, customer_name, customer_domain, customer_email} = this.state.userFormControl;
    const response = await this.axiosInstance.post('partner_acct_user', {
      action: action.value,
      domain:domain.value,
      customer_name: customer_name.value,
      customer_domain: customer_domain.value,
      customer_email: customer_email.value
    });
    let okay = true;
    let errorMessage = '';

    if(response.data.Status !== 'Success') {
      okay = false;
      errorMessage = response.data.Reason;
    }

    this.setState({
      displayUserForm: false,
      displayOkUserStatus: okay,
      userErrorMessage: errorMessage
    });
  }

  partnerHandleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      partnerFormControl: {
        ...this.state.partnerFormControl,
        [name]: {
          ...this.state.partnerFormControl[name],
          value
        }
      }
    });
  }

  userHandleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      userFormControl: {
        ...this.state.userFormControl,
        [name]: {
          ...this.state.userFormControl[name],
          value
        }
      }
    });
  }

  radioOnChange() {
    this.setState({
      checkedOne: !this.state.checkedOne
    });
  }

  handlePartnerButtonClick() {
    this.setState({
      displayPartnerForm: true,
      partnerFormControl: INITIAL_PARTNER_FORM_CONTROLS
    })
  }

  handleUserButtonClick() {
    this.setState({
      displayUserForm: true,
      userFormControl: INITIAL_USER_FORM_CONTROLS
    })
  }

  get partnerForm() {
    return(
      <form className='form' onSubmit={this.partnerHandleSubmit}>
      <ul>
        <li>
          <label htmlFor='name'>Name</label>
          <input 
            type='text' 
            name='name'
            value={this.state.partnerFormControl.name.value}
            placeholder={this.state.partnerFormControl.name.placeholder}
            required={this.state.partnerFormControl.name.required}
            onChange={this.partnerHandleChange}  />
          <span> Name here</span>
        </li>
        <li>
          <label htmlFor='action'>Action</label>
          <input 
            type='text' 
            name='action'
            value={this.state.partnerFormControl.action.value}
            placeholder={this.state.partnerFormControl.action.placeholder}
            required={this.state.partnerFormControl.action.required}
            onChange={this.partnerHandleChange} />
          <span>Action here</span>
        </li>
        <li>
          <label htmlFor='domain'>Domain</label>
          <input 
            type='text' 
            name='domain' 
            value={this.state.partnerFormControl.domain.value}
            placeholder={this.state.partnerFormControl.domain.placeholder}
            required={this.state.partnerFormControl.domain.required}
            onChange={this.partnerHandleChange} />
          <span>Domain here</span>
        </li>
        <li>
          <label htmlFor='email'>Email</label>
          <input 
            type='email' 
            name='email' 
            value={this.state.partnerFormControl.email.value}
            placeholder={this.state.partnerFormControl.email.placeholder}
            required={this.state.partnerFormControl.email.required}
            onChange={this.partnerHandleChange} />
          <span>Email here</span>
        </li>
        <li>
          <input type='submit' />
        </li>
      </ul>
    </form>
    );
  } 

  get userForm() {
    return(
      <form className='form' onSubmit={this.userHandleSubmit}>
      <ul>
        <li>
          <label htmlFor='action'>Action</label>
          <input 
            type='text' 
            name='action'
            value={this.state.userFormControl.action.value}
            placeholder={this.state.userFormControl.action.placeholder}
            required={this.state.userFormControl.action.required}
            onChange={this.userHandleChange}  />
          <span> Action here</span>
        </li>
        <li>
          <label htmlFor='domain'>Domain</label>
          <input 
            type='text' 
            name='domain'
            value={this.state.userFormControl.domain.value}
            placeholder={this.state.userFormControl.domain.placeholder}
            required={this.state.userFormControl.domain.required}
            onChange={this.userHandleChange} />
          <span>Domain here</span>
        </li>
        <li>
          <label htmlFor='customer_name'>Customer Name</label>
          <input 
            type='text' 
            name='customer_name' 
            value={this.state.userFormControl.customer_name.value}
            placeholder={this.state.userFormControl.customer_name.placeholder}
            required={this.state.userFormControl.customer_name.required}
            onChange={this.userHandleChange} />
          <span>Customer Name here</span>
        </li>
        <li>
          <label htmlFor='customer_domain'>Customer Domain</label>
          <input 
            type='text' 
            name='customer_domain' 
            value={this.state.userFormControl.customer_domain.value}
            placeholder={this.state.userFormControl.customer_domain.placeholder}
            required={this.state.userFormControl.customer_domain.required}
            onChange={this.userHandleChange} />
          <span>Customer Domain here</span>
        </li>
        <li>
          <label htmlFor='customer_email'>Customer Email</label>
          <input 
            type='email' 
            name='customer_email' 
            value={this.state.userFormControl.customer_email.value}
            placeholder={this.state.userFormControl.customer_email.placeholder}
            required={this.state.userFormControl.customer_email.required}
            onChange={this.userHandleChange} />
          <span>Customer Email here</span>
        </li>
        <li>
          <input type='submit' />
        </li>
      </ul>
    </form>
    );
  } 

  get partnerOkayStatus() {
    return (
      <div className="response">
        New Entry Registered.
        <button onClick={this.handlePartnerButtonClick}>Return </button>
      </div>
    )
  }

  get userOkayStatus() {
    return (
      <div className="response">
        New Entry Registered.
        <button onClick={this.handleUserButtonClick}>Return </button>
      </div>
    )
  }

  get partnerErrorStatus() {
    return (
      <div className="response">
        <h3>Error</h3>
        {this.state.partnerErrorMessage}
      <button onClick={this.handlePartnerButtonClick}>Return </button>
    </div>
    )
  }

  get userErrorStatus() {
    return (
      <div className="response">
        <h3>Error</h3>
        {this.state.userErrorMessage}
      <button onClick={this.handleUserButtonClick}>Return </button>
    </div>
    )
  }

  get partnerTab() {
    return(
      <div className="page">
        { 
          this.state.displayPartnerForm ? 
          this.partnerForm :
          this.state.displayOkPartnerStatus ? this.partnerOkayStatus : this.partnerErrorStatus
        }
      </div>
    )
  }

  get userTab() {
    return(
      <div className="page">
        { 
          this.state.displayUserForm ? 
          this.userForm :
          this.state.displayOkUserStatus ? this.userOkayStatus : this.userErrorStatus
        }
      </div>
    )
  }
  
  render() {
    return (
      <div className='app'>
        <div className="tabs">
          <div className="tab-2">
            <label className= "label" htmlFor="tab2-1">Create User</label>
            <input 
              id="tab2-1" 
              name="tabs-two" 
              type="radio" 
              checked={this.state.checkedOne} 
              onChange={this.radioOnChange} 
            />
            <div>
              {this.userTab}
            </div>
          </div>
          <div className="tab-2">
            <label className="label" htmlFor="tab2-2">Create Partner</label>
            <input 
              id="tab2-2" 
              name="tabs-two" 
              type="radio" 
              checked={!this.state.checkedOne}
              onChange={this.radioOnChange}  
            />
            <div>
                {this.partnerTab}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
