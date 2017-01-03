/**
 * Saves & loads values of form elements in localStorage on each keyup&change
 * @param {String} selector the form which should be saved
 */
function Formsaver(selector) {
    this.localStoragePrefix = 'FS_';
    this.selector           = selector;
    this.form               = document.querySelector(this.selector);
    this.selectableElements = [
        'input:not([type="submit"]):not([type="reset"])',
        'textarea',
        'select'
    ];
    
    this.selectableElements.map(function(val, index) {
        this.selectableElements[index] = this.selector + ' ' + val;
    }, this);
    
    this.formElements = document.querySelectorAll(this.selectableElements.join(', '));

    /**
     * saves all selectableElements values in localStorage with localStoragePrefix
     * @param  {Event} e EventListener-Event
     * @return {void}
     */
    Formsaver.prototype.saveForm = function(e) {
        if (e.target.type === 'password') {
            return; // don't save passwords!
        }
        localStorage.setItem('FS_' + e.target.name, e.target.value);
        if (e.target.type === 'checkbox' || e.target.type === 'radio') {
            if (!e.target.checked) {
                localStorage.removeItem(this.localStoragePrefix + e.target.name);
            }
        }
    };

    /**
     * runs through all elements and sets values if it exists (in localStorage)
     * @return {void}
     */
    Formsaver.prototype.loadForm = function() {
        [].forEach.call(this.formElements, function(node) {
            if (node.type === 'checkbox' || node.type === 'radio') {
                if (this.localStoragePrefix + node.name in localStorage) {
                    node.checked = true;
                }
            } else {
                node.value = localStorage.getItem(this.localStoragePrefix + node.name);
            }
        }, this);
    };

    /**
     * clears saved form values in localStorage
     * @return {void}
     */
    Formsaver.prototype.clear = function() {
        Object.keys(localStorage).forEach(function(item) {
            if (item.substring(0, this.localStoragePrefix.length) === this.localStoragePrefix) {
                localStorage.removeItem(item);
            }
        }, this);
    };

    /**
     * Adds Eventlisteners to all formElements (onchange, onkeyup)
     */
    [].forEach.call(this.formElements, function(node) {
        ['change', 'keyup'].forEach(function(event) {
            node.addEventListener(event, this.saveForm.bind(this), true);
        }, this);
    }, this);

    // loads the form (onpageload)
    this.loadForm();
}