function swing(target) {
    // the values in vars can (and should) be tweaked to modify the way the swing works
    // * = affected by power
    var vars = {
        origin: 'top center',   // transformOrigin
        perspective: 600,       // transformPerspective
        ease: Power1.easeInOut, // an easeInOut should really be used here...
        power: 1,               // multiplier for the effect that is reduced to 0 over the duration
        duration: 5,            // total length of the effect (well, it can be up to vars.speed longer than this)
        rotation: -90,          // start rotation, also stores target rotations during tween
        maxrotation: 60,        // * max rotation after starting
        speed: 0.5,             // minimum duration for each swing
        maxspeed: 0.2           // * extra duration to add to the larger swings (any sort of real physics seems like overkill)
    };

    // target could be a string selector (it will be selected each swing though...), or a DOM or jQuery object
    vars.target = target;

    // starting position
    TweenMax.set(vars.target, { rotationX: vars.rotation, transformOrigin: vars.origin, transformPerspective: vars.perspective });

    TweenMax.to(vars, vars.duration, { power: 0, delay: 0, onStart: nextSwing, onStartParams: [vars] });
}

function nextSwing(vars) {
    if (vars.power > 0) {
        vars.rotation = (vars.rotation > 0 ? -1 : 1) * vars.maxrotation * vars.power;
        TweenMax.to(vars.target, vars.speed + vars.maxspeed * vars.power, { rotationX: vars.rotation, ease: vars.ease, onComplete: nextSwing, onCompleteParams: [vars] });
    } else {
        TweenMax.to(vars.target, vars.speed, { rotationX: 0, ease: vars.ease, clearProps: 'all' });
    }
}
