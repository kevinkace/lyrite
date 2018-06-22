const checks = {
    type(data, type) {
        return typeof data === type ? null : {
            type  : "type",
            label : `must be a ${type}`
        };
    },

    minLength(data, minLength) {
        return data && data.length >= minLength ? null : {
            type : "minLength",
            label : `must be at least ${minLength} characters`
        };
    }
};


export default function validator(data, schema) {
    return function validate() {
        let errors = {};

        for(let key in schema) {
            const oneSchema = schema[key];

            for(let check in oneSchema) {
                const error = checks[check](data[key], oneSchema[check]);

                if(error) {
                    errors[key] = errors[key] || [];

                    errors[key].push(error);
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
