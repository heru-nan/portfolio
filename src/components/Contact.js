import React, { Component } from 'react';
import axios from 'axios';

class Contact extends Component {

    state = {
        name: '',
        message: '',
        email: '',
        sent: false,
        buttonText: 'Enviar Mensaje',
        isRequired: "",
        info: null,
    }

    requiredSubmit = () => {
        console.log("required")
        if(this.state.email != '') return true;
        else return false;
    }

    handleServerResponse = (ok, msg) => {
        if(ok){
            this.setState({ sent: true, info: {error: false, msg: msg} }, this.resetForm());
        }else{
            this.setState({ sent: false, info: {error: true, msg: msg}})
        }
    }

    formSubmit = (e) => {
      e.preventDefault()
    
      this.setState({
          buttonText: '...Enviando'
      })
    
      let data = {
          senderMail: this.state.email,
          name: this.state.name,
          content: this.state.message
      }

      axios({
        method: 'POST',
        url: 'https://formspree.io/f/xpzoojjp',
        data
      })
        .then((response) => {
          this.handleServerResponse(
            true,
            'Thank you, your message has been submitted.'
          )
        })
        .catch((error) => {
          this.handleServerResponse(false, error.response.data.error)
        })

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
            <form onSubmit={this.formSubmit}>

                <label htmlFor="message-email">Tu Email</label>
                <input onChange={(e) => {this.setState({ email: e.target.value});}} name="_replyto"  type="email" placeholder="your@email.com"  value={this.state.email} required/>

                <label htmlFor="message-name">Tu Nombre</label>
                <input onChange={e => this.setState({ name: e.target.value})} name="name" type="text" placeholder="Tu Nombre" value={this.state.name}/>
                
                <label htmlFor="message-input">Tu Mensaje</label>
                <textarea onChange={e => this.setState({ message: e.target.value})} name="message" type="text" placeholder="Por favor escriba su mensaje" value={this.state.message} required/>
                
                <div>
                    <button type="submit" >{ this.state.buttonText }</button>
                    {this.state.info && this.state.error ?<button className="contact_reaction green" disabled>Mensaje Enviado</button> : <button disabled className="contact_reaction red">Mensaje No Enviado</button>}
                </div>
            </form>
        </section>
        );
    }
}

export default Contact;