export default (State) => ({
    "ADD ROUTE ANIMATION" : (dom, className) => {
        State.routeAnim = State.routeAnim || [];

        State.routeAnim.push({ dom, className});
    }
});
