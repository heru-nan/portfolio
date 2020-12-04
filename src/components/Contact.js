import React, { Component, createRef } from 'react';
import axios from 'axios';

class Contact extends Component {

    state = {
        name: '',
        message: '',
        email: '',
        sent: false,
        buttonText: 'Enviar Mensaje',
        isRequired: "",
    }

    requiredSubmit = () => {
        console.log("required")
        if(this.state.email != '') return true;
        else return false;
    }

    formSubmit = (e) => {
      e.preventDefault()
    
      this.setState({
          buttonText: '...sending'
      })
    
      let data = {
          name: this.state.name,
          email: this.state.email,
          message: this.state.message
      }
      
    this.setState({sent: true}, this.resetForm());
/*
      axios.post('http://localhost:8080/contact', data)
      .then( res => {
          this.setState({ sent: true }, this.resetForm());
      })
      .catch( () => {
        console.log('Message not sent')
      })
*/
    }

    resetForm = () => {
      this.setState(()=> ({
          name: "",
          message: "",
          email: "",
          buttonText: 'Enviar Mensaje',
      }))
    }


    render() {
        return(
        <section className="contact_component">
            <h3>Contact Me</h3>
            <form onSubmit={(e) => this.formSubmit(e)}>

                <label htmlFor="message-email">Tu Email</label>
                <input onChange={(e) => {this.setState({ email: e.target.value});}} name="email"  type="email" placeholder="your@email.com"  value={this.state.email} required/>

                <label htmlFor="message-name">Tu Nombre</label>
                <input onChange={e => this.setState({ name: e.target.value})} name="name" type="text" placeholder="Tu Nombre" value={this.state.name}/>
                
                <label htmlFor="message-input">Tu Mensaje</label>
                <textarea onChange={e => this.setState({ message: e.target.value})} name="message" type="text" placeholder="Por favor escriba su mensaje" value={this.state.message} required/>
                
                <div>
                    <button type="submit" >{ this.state.buttonText }</button>
                </div>
            </form>
        </section>
        );
    }
}

export default Contact;