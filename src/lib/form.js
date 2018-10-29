function pushError(errors, name, type) {
    errors[name] = errors[name] || [];
    errors[name].push(type);

    return errors;
}

function validateForm(form, errors) {
    // clear all errors
    for (let key in errors) {
        delete errors[key];
    }

    // form is valid
    if (form.checkValidity()) {
        return true;
    }

    // iterate through form elements
    [].forEach.call(form.elements, (el) => {
        // no name attr (required for displaying errors), or it's valid
        if (!el.name || el.validity.valid) {
            return;
        }

        for (let type in el.validity) {
            if (!el.validity[type]) {
                continue;
            }

            pushError(errors, el.name, type);
        }
    });

    return false;
}

export {
    pushError as pushError,
    validateForm as validateForm
};
