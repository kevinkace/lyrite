const MAX_TIMEOUT = 1000;

export default function(dom, className) {
    return new Promise((res, rej) => {
        let resd = false;

        setTimeout(() => {
            if(resd) {
                return;
            }

            resd = true;
            rej(false);
            console.log("anim resolve timeout");
        }, MAX_TIMEOUT);

        dom.addEventListener("animationend", () => {
            if(resd) {
                return;
            }

            resd = true;
            res(true);
        }, { once : true, passive : true });

        dom.className = className;
    });
}
