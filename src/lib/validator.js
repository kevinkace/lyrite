const checks = {
    type(data, type) {
        return typeof data === type;
    },

    minLength(data, minLength) {
        return data && data.length >= minLength;
    }
};


export default function validator(data, schema) {
    return function validate() {
        let errors = {};

        for(let key in schema) {
            const oneSchema = schema[key];

            for(let check in oneSchema) {
                if(!checks[check](data[key], oneSchema[check])) {
                    errors[key] = errors[key] || [];

                    errors[key].push(check);
                }
            }
        }

        if(Object.keys(errors).length > 0) {
            console.log("invalid");
            return { errors };
        }

        console.log("valid");

        return {};
    };
}
