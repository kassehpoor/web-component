const template = document.createElement('template');
template.innerHTML = `
<style>
.btn {
    border: 0;
    border-radius: 4px;
    color: white;
}
</style>
<h1>web component</h1>
<input type="button" class="btn" value="click me"></input>
`;

class ToggleButton extends HTMLElement {

    constructor() {
        super();

        var me = this;

        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._button = this._shadowRoot.querySelector('.btn');

        this._button.addEventListener('click', e => {
            var value = !JSON.parse(this.getAttribute('value'));
            this.setAttribute('value', value);

            if (this._valueChanged) {
                try {
                    eval(this._valueChanged);
                } catch{ }
            }
            this.dispatchEvent(new CustomEvent('valuechanged', {
                bubbles: true,
                cancelable: false,
                composed: true,
            }));
        });
    }

    static get observedAttributes() {
        return ['value', 'text', 'onvaluechanged'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                return (this._button.style.backgroundColor = JSON.parse(newValue) ? 'green' : 'gray');
            case 'text':
                return this._button.value = newValue;
            case 'onvaluechanged':
                return this._valueChanged = newValue;
        }
    }

    doSomething() {
        console.log(arguments);
        alert('you did something');
    }
}

window.customElements.define('toggle-btn', ToggleButton);
//=================================================================================

