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
        //this.$button.addEventListener('click', this.doToggle.bind(this));

        this._button.addEventListener('click', e => {
            var value = !JSON.parse(this.getAttribute('value'));
            this.setAttribute('value', value);
            var text = this.getAttribute('text');
            this.setAttribute('text', value ? text.replace('not ', '') : 'not ' + text);

            this.dispatchEvent(new CustomEvent('valueChanged', {
                bubbles: true,
                cancelable: false,
                composed: true
            }));
        });
    }

    static get observedAttributes() {
        return ['value', 'text'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                return (this._button.style.backgroundColor = JSON.parse(newValue) ? 'green' : 'gray');
            case 'text':
                return this._button.value = newValue;
        }
    }
}

window.customElements.define('toggle-btn', ToggleButton);
//=================================================================================
